import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import {
  getCompany,
  listCompanies,
  type ListCompaniesQuery,
} from "@/lib/api/companies";

export const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (params: ListCompaniesQuery) =>
    [...companyKeys.lists(), params] as const,
  details: () => [...companyKeys.all, "detail"] as const,
  detail: (id: string) => [...companyKeys.details(), id] as const,
};

export function listCompaniesOptions(params: ListCompaniesQuery) {
  return queryOptions({
    queryKey: companyKeys.list(params),
    queryFn: () => listCompanies(params),
    placeholderData: keepPreviousData,
  });
}

export function getCompanyOptions(id: string) {
  return queryOptions({
    queryKey: companyKeys.detail(id),
    queryFn: () => getCompany(id),
  });
}
