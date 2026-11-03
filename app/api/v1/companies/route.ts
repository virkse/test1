import { companies } from "@/lib/db";

export async function GET() {
  return Response.json({ companies });
}
