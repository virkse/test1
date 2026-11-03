import { NextRequest } from "next/server";
import { unauthorizedResponse } from "@/lib/api-auth";
import { validateCompanyWrite } from "@/lib/company-validation";
import {
  DEFAULT_COMPANY_LIMIT,
  MAX_COMPANY_LIMIT,
  createCompany,
  isCompanySort,
  isCompanyStatus,
  listCompanies,
} from "@/lib/db";

function parseNonNegativeInt(value: string | null, fallback: number) {
  if (value == null || value === "") {
    return fallback;
  }

  if (!/^\d+$/.test(value)) {
    return null;
  }

  return Number(value);
}

export async function GET(request: NextRequest) {
  const unauthorized = unauthorizedResponse(request);
  if (unauthorized) {
    return unauthorized;
  }

  const searchParams = request.nextUrl.searchParams;
  const limit = parseNonNegativeInt(
    searchParams.get("limit"),
    DEFAULT_COMPANY_LIMIT,
  );
  const offset = parseNonNegativeInt(searchParams.get("offset"), 0);

  if (limit == null || offset == null) {
    return Response.json(
      { error: "limit and offset must be non-negative integers" },
      { status: 400 },
    );
  }

  if (limit > MAX_COMPANY_LIMIT) {
    return Response.json(
      { error: `limit must be at most ${MAX_COMPANY_LIMIT}` },
      { status: 400 },
    );
  }

  const q = searchParams.get("q") ?? undefined;
  const status = searchParams.get("status");
  const sort = searchParams.get("sort");

  if (status && !isCompanyStatus(status)) {
    return Response.json({ error: "invalid status" }, { status: 400 });
  }

  if (sort && !isCompanySort(sort)) {
    return Response.json({ error: "invalid sort" }, { status: 400 });
  }

  return Response.json(
    listCompanies({
      q,
      status: status && isCompanyStatus(status) ? status : undefined,
      sort: sort && isCompanySort(sort) ? sort : undefined,
      limit,
      offset,
    }),
  );
}

export async function POST(request: NextRequest) {
  const unauthorized = unauthorizedResponse(request);
  if (unauthorized) {
    return unauthorized;
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = validateCompanyWrite(body);

  if (!parsed.ok) {
    return Response.json(
      { error: "Unprocessable Entity", details: parsed.details },
      { status: 422 },
    );
  }

  const company = createCompany(parsed.value);
  return Response.json({ company }, { status: 201 });
}
