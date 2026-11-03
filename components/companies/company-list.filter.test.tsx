import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CompaniesApp } from "@/components/companies/companies-app";
import { TOKEN_STORAGE_KEY } from "@/lib/api/companies";
import { AuthProvider } from "@/lib/auth-context";
import type { Company } from "@/lib/db";
import { I18nProvider } from "@/lib/i18n";
import { makeQueryClient } from "@/lib/query-client";
import {
  parseCompaniesUrl,
  type CompaniesUrlState,
} from "@/lib/companies-url";

const companies: Company[] = [
  {
    id: "cmp_001",
    name: "Northwind Analytics",
    domain: "northwindanalytics.com",
    status: "qualified",
    version: 1,
    created_at: "2025-01-08T14:22:00.000Z",
    updated_at: "2025-01-08T14:22:00.000Z",
  },
  {
    id: "cmp_002",
    name: "Harbor & Pine",
    domain: "harborandpine.com",
    status: "contacted",
    version: 1,
    created_at: "2025-02-14T11:05:00.000Z",
    updated_at: "2025-02-14T11:05:00.000Z",
  },
];

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function Harness() {
  const [url, setUrl] = useState<CompaniesUrlState>(
    parseCompaniesUrl(new URLSearchParams()),
  );

  return <CompaniesApp url={url} onUrlChange={setUrl} />;
}

function renderList() {
  const client = makeQueryClient();

  return render(
    <QueryClientProvider client={client}>
      <I18nProvider>
        <AuthProvider>
          <Harness />
        </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>,
  );
}

describe("company list filtering", () => {
  beforeEach(() => {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, "test-token");

    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url = new URL(
          typeof input === "string"
            ? input
            : input instanceof URL
              ? input.toString()
              : input.url,
          "http://localhost",
        );
        const query = url.searchParams.get("q")?.toLowerCase() ?? "";
        const status = url.searchParams.get("status");
        const items = companies.filter((company) => {
          const matchesQuery =
            query.length === 0 ||
            company.name.toLowerCase().includes(query) ||
            (company.domain?.toLowerCase().includes(query) ?? false);
          const matchesStatus = !status || company.status === status;
          return matchesQuery && matchesStatus;
        });

        return Promise.resolve(
          json({ items, total: items.length, limit: 20, offset: 0 }),
        );
      }),
    );
  });

  it("filters the table from the search box and status control", async () => {
    const user = userEvent.setup();
    renderList();

    expect(await screen.findByText("Northwind Analytics")).toBeInTheDocument();
    expect(screen.getByText("Harbor & Pine")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search"), "Harbor");

    await waitFor(() => {
      expect(screen.getByText("Harbor & Pine")).toBeInTheDocument();
      expect(screen.queryByText("Northwind Analytics")).not.toBeInTheDocument();
    });

    await user.clear(screen.getByLabelText("Search"));
    await user.selectOptions(screen.getByLabelText("Status"), "qualified");

    await waitFor(() => {
      expect(screen.getByText("Northwind Analytics")).toBeInTheDocument();
      expect(screen.queryByText("Harbor & Pine")).not.toBeInTheDocument();
    });
  });
});
