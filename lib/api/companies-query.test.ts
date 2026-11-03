import { describe, expect, it } from "vitest";
import {
  companyKeys,
  getCompanyOptions,
  listCompaniesOptions,
} from "@/lib/api/companies-query";
import {
  parseCompaniesUrl,
  serializeCompaniesUrl,
  listParamsFromUrl,
  COMPANIES_PAGE_SIZE,
} from "@/lib/companies-url";

describe("company query keys", () => {
  it("keeps list keys stable and unique per params", () => {
    const first = listCompaniesOptions({
      q: "north",
      limit: COMPANIES_PAGE_SIZE,
      offset: 0,
    });
    const same = listCompaniesOptions({
      q: "north",
      limit: COMPANIES_PAGE_SIZE,
      offset: 0,
    });
    const pageTwo = listCompaniesOptions({
      q: "north",
      limit: COMPANIES_PAGE_SIZE,
      offset: COMPANIES_PAGE_SIZE,
    });

    expect(first.queryKey).toEqual(same.queryKey);
    expect(first.queryKey).toEqual(
      companyKeys.list({
        q: "north",
        limit: COMPANIES_PAGE_SIZE,
        offset: 0,
      }),
    );
    expect(pageTwo.queryKey).not.toEqual(first.queryKey);
  });

  it("scopes detail keys by company id", () => {
    expect(getCompanyOptions("cmp_001").queryKey).toEqual(
      companyKeys.detail("cmp_001"),
    );
    expect(getCompanyOptions("cmp_001").queryKey).not.toEqual(
      getCompanyOptions("cmp_002").queryKey,
    );
  });
});

describe("companies URL state", () => {
  it("round-trips filter, sort, page and drawer state", () => {
    const parsed = parseCompaniesUrl(
      new URLSearchParams(
        "q=harbor&status=contacted&sort=-created_at&page=2&company=cmp_002",
      ),
    );

    expect(parsed).toEqual({
      q: "harbor",
      status: "contacted",
      sort: "-created_at",
      page: 2,
      companyId: "cmp_002",
      create: false,
    });

    expect(serializeCompaniesUrl(parsed).toString()).toBe(
      "q=harbor&status=contacted&sort=-created_at&page=2&company=cmp_002",
    );
    expect(listParamsFromUrl(parsed)).toEqual({
      q: "harbor",
      status: "contacted",
      sort: "-created_at",
      limit: 20,
      offset: 20,
    });
  });
});
