"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  CompaniesApiError,
  createCompany,
  patchCompany,
} from "@/lib/api/companies";
import {
  companyKeys,
  getCompanyOptions,
} from "@/lib/api/companies-query";
import { COMPANY_STATUSES } from "@/lib/db";
import type { Company, CompanyStatus } from "@/lib/db";
import type { FieldIssue, FieldName, ValidationCode } from "@/lib/company-validation";
import { validateCompanyForm } from "@/lib/company-validation";
import { useI18n } from "@/lib/i18n";

type CompanyDrawerProps = {
  companyId: string | null;
  create: boolean;
  onClose: () => void;
  onCreated: (company: Company) => void;
};

type FormState = {
  name: string;
  domain: string;
  status: CompanyStatus;
};

const emptyForm: FormState = {
  name: "",
  domain: "",
  status: "new",
};

function formFromCompany(company: Company): FormState {
  return {
    name: company.name,
    domain: company.domain ?? "",
    status: company.status,
  };
}

function focusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("disabled"));
}

export function CompanyDrawer({
  companyId,
  create,
  onClose,
  onCreated,
}: CompanyDrawerProps) {
  const open = create || Boolean(companyId);
  const { t, statusLabel, validationLabel } = useI18n();
  const queryClient = useQueryClient();
  const titleId = useId();
  const panelRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [version, setVersion] = useState<number | null>(null);
  const [clientIssues, setClientIssues] = useState<FieldIssue[]>([]);
  const [serverIssues, setServerIssues] = useState<FieldIssue[]>([]);
  const [conflict, setConflict] = useState(false);
  const [formReadyFor, setFormReadyFor] = useState<string | null>(null);

  const companyQuery = useQuery({
    ...getCompanyOptions(companyId ?? ""),
    enabled: open && !create && Boolean(companyId),
  });

  const loadedCompany = companyQuery.data?.company;
  const formKey = create ? "create" : (companyId ?? "");

  if (open && formReadyFor !== formKey) {
    setFormReadyFor(formKey);
    setClientIssues([]);
    setServerIssues([]);
    setConflict(false);

    if (create) {
      setForm(emptyForm);
      setVersion(null);
    } else if (loadedCompany && loadedCompany.id === companyId) {
      setForm(formFromCompany(loadedCompany));
      setVersion(loadedCompany.version);
    } else {
      setForm(emptyForm);
      setVersion(null);
    }
  }

  if (
    !create &&
    loadedCompany &&
    loadedCompany.id === companyId &&
    version === null &&
    formReadyFor === formKey
  ) {
    setForm(formFromCompany(loadedCompany));
    setVersion(loadedCompany.version);
  }

  const createMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({ queryKey: companyKeys.all });
      onCreated(result.company);
    },
    onError: (error) => {
      if (error instanceof CompaniesApiError && error.status === 422) {
        setServerIssues(error.details);
      }
    },
  });

  const patchMutation = useMutation({
    mutationFn: (input: FormState & { version: number }) => {
      if (!companyId) {
        throw new Error("Missing company id");
      }

      return patchCompany(companyId, {
        name: input.name,
        domain: input.domain.trim() === "" ? null : input.domain.trim(),
        status: input.status,
        version: input.version,
      });
    },
    onSuccess: async (result) => {
      setConflict(false);
      setServerIssues([]);
      setVersion(result.company.version);
      setForm(formFromCompany(result.company));
      await queryClient.invalidateQueries({ queryKey: companyKeys.all });
      queryClient.setQueryData(companyKeys.detail(result.company.id), {
        company: result.company,
      });
    },
    onError: (error) => {
      if (!(error instanceof CompaniesApiError)) {
        return;
      }

      if (error.status === 422) {
        setServerIssues(error.details);
      }

      if (error.status === 409) {
        setConflict(true);
        if (error.company) {
          queryClient.setQueryData(companyKeys.detail(error.company.id), {
            company: error.company,
          });
        }
      }
    },
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const elements = focusableElements(panelRef.current);

      if (elements.length === 0) {
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  function fieldError(field: FieldName): string | undefined {
    const issue = [...clientIssues, ...serverIssues].find((item) => item.field === field);

    if (!issue) {
      return undefined;
    }

    return validationLabel(issue.code as ValidationCode, issue.message);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerIssues([]);

    const parsed = validateCompanyForm(form);

    if (!parsed.ok) {
      setClientIssues(parsed.details);
      return;
    }

    setClientIssues([]);

    if (create) {
      createMutation.mutate(parsed.value);
      return;
    }

    if (version == null) {
      return;
    }

    patchMutation.mutate({ ...parsed.value, domain: parsed.value.domain ?? "", version });
  }

  async function reloadLatest() {
    const result = await companyQuery.refetch();
    const latest = result.data?.company;

    if (!latest) {
      return;
    }

    setVersion(latest.version);
    setConflict(false);
  }

  const busy = createMutation.isPending || patchMutation.isPending;
  const title = create ? t("createCompany") : t("editCompany");
  const showLoading = !create && companyQuery.isLoading && !loadedCompany;
  const showError = !create && companyQuery.isError && !loadedCompany;

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h2 id={titleId} className="text-lg font-semibold">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="rounded-md px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            onClick={onClose}
          >
            {t("close")}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {showLoading ? (
            <p className="text-sm text-zinc-500">{t("loading")}</p>
          ) : null}

          {showError ? (
            <div className="flex flex-col gap-3 text-sm">
              <p role="alert">{t("drawerError")}</p>
              <button
                type="button"
                className="self-start rounded-md border border-zinc-300 px-3 py-1.5 dark:border-zinc-700"
                onClick={() => void companyQuery.refetch()}
              >
                {t("retry")}
              </button>
            </div>
          ) : null}

          {!showLoading && !showError ? (
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              {conflict ? (
                <div
                  role="alert"
                  className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"
                >
                  <p>{t("conflict")}</p>
                  <button
                    type="button"
                    className="mt-2 rounded-md bg-amber-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-amber-200 dark:text-amber-950"
                    onClick={() => void reloadLatest()}
                  >
                    {t("reloadLatest")}
                  </button>
                </div>
              ) : null}

              <Field
                id="company-name"
                label={t("name")}
                error={fieldError("name")}
              >
                <input
                  id="company-name"
                  name="name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  aria-invalid={Boolean(fieldError("name"))}
                  aria-describedby={fieldError("name") ? "company-name-error" : undefined}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900"
                />
              </Field>

              <Field
                id="company-domain"
                label={`${t("domain")} (${t("optional")})`}
                error={fieldError("domain")}
              >
                <input
                  id="company-domain"
                  name="domain"
                  value={form.domain}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      domain: event.target.value,
                    }))
                  }
                  aria-invalid={Boolean(fieldError("domain"))}
                  aria-describedby={fieldError("domain") ? "company-domain-error" : undefined}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900"
                />
              </Field>

              <Field
                id="company-status"
                label={t("status")}
                error={fieldError("status")}
              >
                <select
                  id="company-status"
                  name="status"
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value as CompanyStatus,
                    }))
                  }
                  aria-invalid={Boolean(fieldError("status"))}
                  aria-describedby={fieldError("status") ? "company-status-error" : undefined}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900"
                >
                  {COMPANY_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {statusLabel(status)}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={busy || (!create && version == null)}
                  className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
                >
                  {busy ? t("saving") : t("save")}
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
                  onClick={onClose}
                >
                  {t("cancel")}
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-rose-700 dark:text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
