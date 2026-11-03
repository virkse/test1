"use client";

import { useQuery } from "@tanstack/react-query";
import { COMPANY_STATUSES, isCompanyStatus, type CompanySort } from "@/lib/db";
import { listCompaniesOptions } from "@/lib/api/companies-query";
import {
  COMPANIES_PAGE_SIZE,
  listParamsFromUrl,
  type CompaniesUrlState,
} from "@/lib/companies-url";
import { useAuth } from "@/lib/auth-context";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";
import { CompanyDrawer } from "@/components/companies/company-drawer";
import { CompanyTable } from "@/components/companies/company-table";

type CompaniesAppProps = {
  url: CompaniesUrlState;
  onUrlChange: (next: CompaniesUrlState) => void;
};

export function CompaniesApp({ url, onUrlChange }: CompaniesAppProps) {
  const { signOut } = useAuth();
  const { t, statusLabel } = useI18n();
  const listQuery = useQuery(listCompaniesOptions(listParamsFromUrl(url)));
  const items = listQuery.data?.items ?? [];
  const total = listQuery.data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / COMPANIES_PAGE_SIZE));
  const showEmpty = listQuery.isSuccess && items.length === 0;
  const showError = listQuery.isError && !listQuery.data;

  function update(patch: Partial<CompaniesUrlState>) {
    const next = { ...url, ...patch };
    onUrlChange(next);
  }

  function toggleSort(field: "name" | "created_at") {
    const current = url.sort;
    let next: CompanySort;

    if (current === field) {
      next = `-${field}`;
    } else if (current === `-${field}`) {
      next = field;
    } else {
      next = field;
    }

    update({ sort: next, page: 1 });
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {t("title")}
          </h1>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
              onClick={signOut}
            >
              {t("signOut")}
            </button>
            <button
              type="button"
              className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
              onClick={() => update({ create: true, companyId: null })}
            >
              {t("create")}
            </button>
          </div>
        </header>

        <div className="flex flex-wrap gap-3">
          <div className="flex min-w-64 flex-1 flex-col gap-1.5">
            <label htmlFor="company-search" className="text-sm font-medium">
              {t("search")}
            </label>
            <input
              id="company-search"
              value={url.q}
              placeholder={t("searchPlaceholder")}
              onChange={(event) =>
                update({ q: event.target.value, page: 1 })
              }
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
          <div className="flex w-48 flex-col gap-1.5">
            <label htmlFor="company-status-filter" className="text-sm font-medium">
              {t("status")}
            </label>
            <select
              id="company-status-filter"
              value={url.status ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                update({
                  status: isCompanyStatus(value) ? value : null,
                  page: 1,
                });
              }}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <option value="">{t("allStatuses")}</option>
              {COMPANY_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {statusLabel(status)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showError ? (
          <div className="flex items-center justify-between rounded-xl border border-rose-200 bg-white p-4 text-sm text-rose-700 dark:border-rose-900 dark:bg-zinc-950 dark:text-rose-300">
            <p role="alert">{t("listError")}</p>
            <button
              type="button"
              className="rounded-md border border-rose-300 px-3 py-1.5 dark:border-rose-800"
              onClick={() => void listQuery.refetch()}
            >
              {t("retry")}
            </button>
          </div>
        ) : (
          <CompanyTable
            items={items}
            sort={url.sort}
            loading={listQuery.isLoading && !listQuery.data}
            fetching={listQuery.isFetching}
            empty={showEmpty}
            onSort={toggleSort}
            onOpen={(id) => update({ companyId: id, create: false })}
          />
        )}

        <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            {t("page")} {url.page} {t("of")} {pageCount}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={url.page <= 1}
              className="rounded-md border border-zinc-300 px-3 py-1.5 disabled:opacity-40 dark:border-zinc-700"
              onClick={() => update({ page: url.page - 1 })}
            >
              {t("previous")}
            </button>
            <button
              type="button"
              disabled={url.page >= pageCount}
              className="rounded-md border border-zinc-300 px-3 py-1.5 disabled:opacity-40 dark:border-zinc-700"
              onClick={() => update({ page: url.page + 1 })}
            >
              {t("next")}
            </button>
          </div>
        </div>
      </main>

      <CompanyDrawer
        companyId={url.companyId}
        create={url.create}
        onClose={() => update({ companyId: null, create: false })}
        onCreated={(company) =>
          update({ companyId: company.id, create: false })
        }
      />
    </div>
  );
}
