"use client";

import type { Company, CompanySort } from "@/lib/db";
import { useI18n } from "@/lib/i18n";

type CompanyTableProps = {
  items: Company[];
  sort: CompanySort;
  loading: boolean;
  fetching: boolean;
  empty: boolean;
  onSort: (field: "name" | "created_at") => void;
  onOpen: (id: string) => void;
};

const statusStyles: Record<Company["status"], string> = {
  new: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  researching: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  contacted:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  qualified:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  rejected: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
};

function sortState(
  sort: CompanySort,
  field: "name" | "created_at",
): "ascending" | "descending" | "none" {
  if (sort === field) {
    return "ascending";
  }

  if (sort === `-${field}`) {
    return "descending";
  }

  return "none";
}

function SortButton({
  label,
  field,
  sort,
  onSort,
}: {
  label: string;
  field: "name" | "created_at";
  sort: CompanySort;
  onSort: (field: "name" | "created_at") => void;
}) {
  const state = sortState(sort, field);
  const indicator = state === "ascending" ? " ↑" : state === "descending" ? " ↓" : "";

  return (
    <button
      type="button"
      className="font-medium"
      onClick={() => onSort(field)}
    >
      {label}
      {indicator}
    </button>
  );
}

export function CompanyTable({
  items,
  sort,
  loading,
  fetching,
  empty,
  onSort,
  onOpen,
}: CompanyTableProps) {
  const { t, statusLabel, formatDate } = useI18n();

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table
        className="w-full text-left text-sm"
        aria-busy={fetching}
        aria-rowcount={items.length}
      >
        <caption className="sr-only">{t("title")}</caption>
        <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3" aria-sort={sortState(sort, "name")}>
              <SortButton label={t("name")} field="name" sort={sort} onSort={onSort} />
            </th>
            <th className="px-4 py-3 font-medium">{t("domain")}</th>
            <th className="px-4 py-3 font-medium">{t("status")}</th>
            <th className="px-4 py-3" aria-sort={sortState(sort, "created_at")}>
              <SortButton
                label={t("created")}
                field="created_at"
                sort={sort}
                onSort={onSort}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 6 }, (_, index) => (
                <tr key={`skeleton-${index}`} className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="px-4 py-3" colSpan={4}>
                    <span className="block h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  </td>
                </tr>
              ))
            : null}

          {!loading && empty ? (
            <tr>
              <td className="px-4 py-10 text-center text-zinc-500" colSpan={4}>
                {t("empty")}
              </td>
            </tr>
          ) : null}

          {!loading &&
            items.map((company) => (
              <tr
                key={company.id}
                className="cursor-pointer border-b border-zinc-100 last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                onClick={() => onOpen(company.id)}
              >
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                  <button
                    type="button"
                    className="text-left"
                    onClick={(event) => {
                      event.stopPropagation();
                      onOpen(company.id);
                    }}
                  >
                    {company.name}
                  </button>
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {company.domain ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[company.status]}`}
                  >
                    {statusLabel(company.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {formatDate(company.created_at)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
