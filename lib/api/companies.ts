import type {
  Company,
  CompanySort,
  CompanyStatus,
  CompanyWriteInput,
  ListCompaniesResult,
} from "@/lib/db";
import type { FieldIssue } from "@/lib/company-validation";

export type ListCompaniesQuery = {
  q?: string;
  status?: CompanyStatus;
  sort?: CompanySort;
  limit: number;
  offset: number;
};

export type CompanyResponse = {
  company: Company;
};

export type ValidationErrorBody = {
  error: string;
  details: FieldIssue[];
};

export type ConflictErrorBody = {
  error: string;
  company: Company;
};

export type ApiErrorBody = {
  error: string;
  details?: FieldIssue[];
  company?: Company;
};

export class CompaniesApiError extends Error {
  readonly status: number;
  readonly details: FieldIssue[];
  readonly company: Company | undefined;

  constructor(status: number, body: ApiErrorBody) {
    super(body.error);
    this.name = "CompaniesApiError";
    this.status = status;
    this.details = body.details ?? [];
    this.company = body.company;
  }
}

export const TOKEN_STORAGE_KEY = "companies.authToken";

const authListeners = new Set<() => void>();

export function subscribeAuth(listener: () => void): () => void {
  authListeners.add(listener);
  return () => {
    authListeners.delete(listener);
  };
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function getServerToken(): string | null {
  return null;
}

export function setStoredToken(token: string | null): void {
  if (typeof window !== "undefined") {
    if (token) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }

  authListeners.forEach((listener) => listener());
}

let unauthorizedHandler: () => void = () => {};

export function setUnauthorizedHandler(handler: () => void): void {
  unauthorizedHandler = handler;
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { error: text };
  }
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as { error: unknown }).error === "string"
  );
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(init?.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(path, { ...init, headers });
  const body = await parseBody(response);

  if (response.status === 401) {
    unauthorizedHandler();
  }

  if (!response.ok) {
    throw new CompaniesApiError(
      response.status,
      isApiErrorBody(body) ? body : { error: "Request failed" },
    );
  }

  return body as T;
}

export function listCompanies(
  params: ListCompaniesQuery,
): Promise<ListCompaniesResult> {
  const search = new URLSearchParams({
    limit: String(params.limit),
    offset: String(params.offset),
  });

  if (params.q) {
    search.set("q", params.q);
  }

  if (params.status) {
    search.set("status", params.status);
  }

  if (params.sort) {
    search.set("sort", params.sort);
  }

  return requestJson<ListCompaniesResult>(`/api/v1/companies?${search}`);
}

export function getCompany(id: string): Promise<CompanyResponse> {
  return requestJson<CompanyResponse>(`/api/v1/companies/${id}`);
}

export function createCompany(
  input: CompanyWriteInput,
): Promise<CompanyResponse> {
  return requestJson<CompanyResponse>("/api/v1/companies", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export type PatchCompanyInput = CompanyWriteInput & { version: number };

export function patchCompany(
  id: string,
  input: PatchCompanyInput,
): Promise<CompanyResponse> {
  return requestJson<CompanyResponse>(`/api/v1/companies/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}
