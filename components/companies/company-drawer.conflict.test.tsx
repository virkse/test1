import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CompanyDrawer } from "@/components/companies/company-drawer";
import { TOKEN_STORAGE_KEY } from "@/lib/api/companies";
import type { Company } from "@/lib/db";
import { I18nProvider } from "@/lib/i18n";
import { makeQueryClient } from "@/lib/query-client";

const original: Company = {
  id: "cmp_001",
  name: "Old Co",
  domain: "old.co",
  status: "new",
  version: 1,
  created_at: "2025-01-08T14:22:00.000Z",
  updated_at: "2025-01-08T14:22:00.000Z",
};

const latest: Company = {
  ...original,
  name: "Server Co",
  version: 2,
  updated_at: "2026-01-08T14:22:00.000Z",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function renderDrawer() {
  const client = makeQueryClient();

  return render(
    <QueryClientProvider client={client}>
      <I18nProvider>
        <CompanyDrawer
          companyId="cmp_001"
          create={false}
          onClose={() => undefined}
          onCreated={() => undefined}
        />
      </I18nProvider>
    </QueryClientProvider>,
  );
}

describe("company drawer 409 flow", () => {
  beforeEach(() => {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, "test-token");
  });

  it("keeps typed values after a version conflict and reload", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const url = new URL(
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url,
        "http://localhost",
      );
      const method = (init?.method ?? "GET").toUpperCase();

      if (url.pathname === "/api/v1/companies/cmp_001" && method === "GET") {
        const body =
          fetchMock.mock.calls.filter((call) => {
            const callInit = call[1];
            return (callInit?.method ?? "GET").toUpperCase() === "PATCH";
          }).length > 0
            ? latest
            : original;

        return Promise.resolve(json({ company: body }));
      }

      if (url.pathname === "/api/v1/companies/cmp_001" && method === "PATCH") {
        const payload = JSON.parse(String(init?.body)) as { version: number };

        if (payload.version === 1) {
          return Promise.resolve(
            json({ error: "Version conflict", company: latest }, 409),
          );
        }

        return Promise.resolve(json({ company: { ...latest, ...payload, version: 3 } }));
      }

      return Promise.resolve(json({ error: "Not found" }, 404));
    });

    vi.stubGlobal("fetch", fetchMock);
    renderDrawer();

    const nameInput = await screen.findByLabelText("Name");
    expect(nameInput).toHaveValue("Old Co");

    await user.clear(nameInput);
    await user.type(nameInput, "Draft Co");
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(
      await screen.findByText(/changed by someone else/i),
    ).toBeInTheDocument();
    expect(nameInput).toHaveValue("Draft Co");

    await user.click(screen.getByRole("button", { name: "Reload latest version" }));

    await waitFor(() => {
      const patchCalls = fetchMock.mock.calls.filter(
        (call) => (call[1]?.method ?? "GET").toUpperCase() === "PATCH",
      );
      expect(patchCalls).toHaveLength(1);
    });

    expect(nameInput).toHaveValue("Draft Co");

    await user.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      const patchCalls = fetchMock.mock.calls.filter(
        (call) => (call[1]?.method ?? "GET").toUpperCase() === "PATCH",
      );
      expect(patchCalls).toHaveLength(2);
      const secondBody = JSON.parse(String(patchCalls[1]?.[1]?.body)) as {
        version: number;
        name: string;
      };
      expect(secondBody.version).toBe(2);
      expect(secondBody.name).toBe("Draft Co");
    });
  });
});
