import { unauthorizedResponse } from "@/lib/api-auth";
import { validatePatchCompany } from "@/lib/company-validation";
import { getCompany, updateCompany } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = unauthorizedResponse(request);
  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await params;
  const company = getCompany(id);

  if (!company) {
    return Response.json({ error: "Company not found" }, { status: 404 });
  }

  return Response.json({ company });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = unauthorizedResponse(request);
  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await params;
  const body: unknown = await request.json().catch(() => null);
  const parsed = validatePatchCompany(body);

  if (!parsed.ok) {
    return Response.json(
      { error: "Unprocessable Entity", details: parsed.details },
      { status: 422 },
    );
  }

  const result = updateCompany(id, parsed.value);

  if (!result.ok && result.status === 404) {
    return Response.json({ error: "Company not found" }, { status: 404 });
  }

  if (!result.ok && result.status === 409) {
    return Response.json(
      { error: "Version conflict", company: result.company },
      { status: 409 },
    );
  }

  if (!result.ok) {
    return Response.json({ error: "Company not found" }, { status: 404 });
  }

  return Response.json({ company: result.company });
}
