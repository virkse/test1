import {
  isCompanySort,
  isCompanyStatus,
  type CompanySort,
  type CompanyStatus,
} from "@/lib/db";

export const COMPANIES_PAGE_SIZE = 20;
export const DEFAULT_COMPANY_SORT: CompanySort = "name";

export type CompaniesUrlState = {
  q: string;
  status: CompanyStatus | null;
  sort: CompanySort;
  page: number;
  companyId: string | null;
  create: boolean;
};

export function parseCompaniesUrl(
  searchParams: Pick<URLSearchParams, "get">,
): CompaniesUrlState {
  const q = searchParams.get("q") ?? "";
  const statusValue = searchParams.get("status");
  const sortValue = searchParams.get("sort");
  const pageValue = searchParams.get("page");
  const parsedPage = pageValue ? Number(pageValue) : 1;

  return {
    q,
    status:
      statusValue && isCompanyStatus(statusValue) ? statusValue : null,
    sort: sortValue && isCompanySort(sortValue) ? sortValue : DEFAULT_COMPANY_SORT,
    page: Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1,
    companyId: searchParams.get("company"),
    create: searchParams.get("create") === "1",
  };
}

export function serializeCompaniesUrl(state: CompaniesUrlState): URLSearchParams {
  const params = new URLSearchParams();

  if (state.q) {
    params.set("q", state.q);
  }

  if (state.status) {
    params.set("status", state.status);
  }

  if (state.sort !== DEFAULT_COMPANY_SORT) {
    params.set("sort", state.sort);
  }

  if (state.page > 1) {
    params.set("page", String(state.page));
  }

  if (state.create) {
    params.set("create", "1");
  } else if (state.companyId) {
    params.set("company", state.companyId);
  }

  return params;
}

export function listParamsFromUrl(state: CompaniesUrlState) {
  return {
    q: state.q || undefined,
    status: state.status ?? undefined,
    sort: state.sort,
    limit: COMPANIES_PAGE_SIZE,
    offset: (state.page - 1) * COMPANIES_PAGE_SIZE,
  };
}
