export function unauthorizedResponse(request: Request): Response | null {
  const header = request.headers.get("authorization");

  if (!header) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token || token.trim() === "") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
