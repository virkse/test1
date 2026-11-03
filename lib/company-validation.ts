import {
  COMPANY_STATUSES,
  isCompanyStatus,
  type CompanyStatus,
  type CompanyWriteInput,
} from "@/lib/db";

export type FieldName = "name" | "domain" | "status" | "version";

export type ValidationCode =
  | "name_required"
  | "name_too_long"
  | "domain_invalid"
  | "status_invalid"
  | "version_required"
  | "version_invalid";

export type FieldIssue = {
  field: FieldName;
  code: ValidationCode;
  message: string;
};

export const VALIDATION_MESSAGES: Record<ValidationCode, string> = {
  name_required: "Name is required",
  name_too_long: "Name must be at most 100 characters",
  domain_invalid: "Domain must be a valid hostname without a protocol",
  status_invalid: "Status is not valid",
  version_required: "Version is required",
  version_invalid: "Version must be a positive integer",
};

const DOMAIN_PATTERN =
  /^(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

function issue(field: FieldName, code: ValidationCode): FieldIssue {
  return { field, code, message: VALIDATION_MESSAGES[code] };
}

function parseName(value: unknown, issues: FieldIssue[]): string | undefined {
  if (typeof value !== "string") {
    issues.push(issue("name", "name_required"));
    return undefined;
  }

  const name = value.trim();

  if (name.length === 0) {
    issues.push(issue("name", "name_required"));
    return undefined;
  }

  if (name.length > 100) {
    issues.push(issue("name", "name_too_long"));
    return undefined;
  }

  return name;
}

function parseDomain(
  value: unknown,
  issues: FieldIssue[],
): string | null | undefined {
  if (value == null) {
    return null;
  }

  if (typeof value !== "string") {
    issues.push(issue("domain", "domain_invalid"));
    return undefined;
  }

  const domain = value.trim();

  if (domain.length === 0) {
    return null;
  }

  if (DOMAIN_PATTERN.test(domain)) {
    return domain.toLowerCase();
  }

  issues.push(issue("domain", "domain_invalid"));
  return undefined;
}

function parseStatus(
  value: unknown,
  issues: FieldIssue[],
  fallback: CompanyStatus,
): CompanyStatus | undefined {
  if (value == null || value === "") {
    return fallback;
  }

  if (typeof value !== "string" || !isCompanyStatus(value)) {
    issues.push(issue("status", "status_invalid"));
    return undefined;
  }

  return value;
}

export function validateCompanyWrite(
  input: unknown,
  options: { statusFallback?: CompanyStatus } = { statusFallback: "new" },
): { ok: true; value: CompanyWriteInput } | { ok: false; details: FieldIssue[] } {
  if (typeof input !== "object" || input == null) {
    return {
      ok: false,
      details: [issue("name", "name_required")],
    };
  }

  const body = input as Record<string, unknown>;
  const issues: FieldIssue[] = [];
  const name = parseName(body.name, issues);
  const domain = parseDomain(body.domain, issues);
  let status: CompanyStatus | undefined;

  if (options.statusFallback === undefined && (body.status == null || body.status === "")) {
    issues.push(issue("status", "status_invalid"));
  } else {
    status = parseStatus(body.status, issues, options.statusFallback ?? "new");
  }

  if (issues.length > 0 || name === undefined || domain === undefined || status === undefined) {
    return { ok: false, details: issues };
  }

  return { ok: true, value: { name, domain, status } };
}

export function validatePatchCompany(
  input: unknown,
):
  | { ok: true; value: CompanyWriteInput & { version: number } }
  | { ok: false; details: FieldIssue[] } {
  const write = validateCompanyWrite(input, { statusFallback: undefined });
  const issues: FieldIssue[] = write.ok ? [] : [...write.details];

  if (typeof input !== "object" || input == null) {
    issues.push(issue("version", "version_required"));
    return { ok: false, details: issues };
  }

  const versionValue = (input as Record<string, unknown>).version;

  if (versionValue == null || versionValue === "") {
    issues.push(issue("version", "version_required"));
  } else if (
    typeof versionValue !== "number" ||
    !Number.isInteger(versionValue) ||
    versionValue < 1
  ) {
    issues.push(issue("version", "version_invalid"));
  }

  if (
    issues.length > 0 ||
    !write.ok ||
    typeof versionValue !== "number" ||
    !Number.isInteger(versionValue) ||
    versionValue < 1
  ) {
    return { ok: false, details: issues };
  }

  return {
    ok: true,
    value: { ...write.value, version: versionValue },
  };
}

export function validateCompanyForm(input: {
  name: string;
  domain: string;
  status: string;
}): { ok: true; value: CompanyWriteInput } | { ok: false; details: FieldIssue[] } {
  return validateCompanyWrite({
    name: input.name,
    domain: input.domain,
    status: input.status,
  });
}

export { COMPANY_STATUSES };
