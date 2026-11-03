import { companies } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const company = companies.find((item) => item.id === id);

  if (!company) {
    return Response.json({ error: "Company not found" }, { status: 404 });
  }

  return Response.json({ company });
}
