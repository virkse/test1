export type CompanyStatus =
  | "new"
  | "researching"
  | "contacted"
  | "qualified"
  | "rejected";

export type Company = {
  id: string;
  name: string;
  domain: string | null;
  status: CompanyStatus;
  version: number;
  created_at: string;
  updated_at: string;
};

type Seed = {
  name: string;
  domain: string | null;
  status: CompanyStatus;
  created_at: string;
  updated_at: string;
  version?: number;
};

const seeds: Seed[] = [
  {
    name: "Northwind Analytics",
    domain: "northwindanalytics.com",
    status: "qualified",
    created_at: "2025-01-08T14:22:00.000Z",
    updated_at: "2026-03-12T09:41:00.000Z",
    version: 4,
  },
  {
    name: "Harbor & Pine",
    domain: "harborandpine.com",
    status: "contacted",
    created_at: "2025-02-14T11:05:00.000Z",
    updated_at: "2026-01-19T16:30:00.000Z",
    version: 2,
  },
  {
    name: "LumenForge",
    domain: "lumenforge.io",
    status: "researching",
    created_at: "2025-03-02T08:15:00.000Z",
    updated_at: "2025-12-04T10:02:00.000Z",
  },
  {
    name: "Cedarline Logistics",
    domain: "cedarline.com",
    status: "new",
    created_at: "2026-09-18T13:40:00.000Z",
    updated_at: "2026-09-18T13:40:00.000Z",
  },
  {
    name: "Brightoak Health",
    domain: "brightoak.health",
    status: "qualified",
    created_at: "2025-04-21T09:00:00.000Z",
    updated_at: "2026-06-11T15:18:00.000Z",
    version: 6,
  },
  {
    name: "Kite & Co.",
    domain: null,
    status: "rejected",
    created_at: "2025-05-09T17:22:00.000Z",
    updated_at: "2025-07-01T12:00:00.000Z",
    version: 2,
  },
  {
    name: "Orbital Payments",
    domain: "orbitalpay.com",
    status: "contacted",
    created_at: "2025-06-03T10:11:00.000Z",
    updated_at: "2026-02-28T08:45:00.000Z",
    version: 3,
  },
  {
    name: "Maple Street Labs",
    domain: "maplestreetlabs.com",
    status: "researching",
    created_at: "2025-06-16T19:30:00.000Z",
    updated_at: "2026-04-02T14:09:00.000Z",
  },
  {
    name: "Vesper Retail",
    domain: "vesperretail.com",
    status: "new",
    created_at: "2026-10-02T07:55:00.000Z",
    updated_at: "2026-10-02T07:55:00.000Z",
  },
  {
    name: "Ironclad Safety",
    domain: "ironcladsafety.com",
    status: "qualified",
    created_at: "2025-07-22T12:40:00.000Z",
    updated_at: "2026-08-15T11:20:00.000Z",
    version: 5,
  },
  {
    name: "Nimbus Cloud Kitchen",
    domain: null,
    status: "contacted",
    created_at: "2025-08-01T15:00:00.000Z",
    updated_at: "2026-01-08T09:12:00.000Z",
    version: 2,
  },
  {
    name: "Redwood Civic",
    domain: "redwoodcivic.org",
    status: "researching",
    created_at: "2025-08-19T08:05:00.000Z",
    updated_at: "2025-11-30T16:44:00.000Z",
  },
  {
    name: "Atlas Freightways",
    domain: "atlasfreightways.com",
    status: "rejected",
    created_at: "2025-01-29T21:10:00.000Z",
    updated_at: "2025-03-14T13:27:00.000Z",
    version: 3,
  },
  {
    name: "Solara Energy",
    domain: "solara.energy",
    status: "qualified",
    created_at: "2025-09-04T06:18:00.000Z",
    updated_at: "2026-09-21T18:03:00.000Z",
    version: 7,
  },
  {
    name: "Fieldnote Software",
    domain: "fieldnote.app",
    status: "new",
    created_at: "2026-10-19T12:00:00.000Z",
    updated_at: "2026-10-19T12:00:00.000Z",
  },
  {
    name: "Copperline Bank",
    domain: "copperline.bank",
    status: "contacted",
    created_at: "2025-10-11T14:25:00.000Z",
    updated_at: "2026-05-06T10:50:00.000Z",
    version: 4,
  },
  {
    name: "Nightingale Clinics",
    domain: "nightingale.clinic",
    status: "researching",
    created_at: "2025-11-02T09:33:00.000Z",
    updated_at: "2026-07-22T08:16:00.000Z",
    version: 2,
  },
  {
    name: "Quarry & Stone",
    domain: null,
    status: "new",
    created_at: "2026-08-27T16:42:00.000Z",
    updated_at: "2026-08-27T16:42:00.000Z",
  },
  {
    name: "Helix BioWorks",
    domain: "helixbioworks.com",
    status: "qualified",
    created_at: "2025-02-28T11:47:00.000Z",
    updated_at: "2026-04-18T19:05:00.000Z",
    version: 8,
  },
  {
    name: "Pinnacle Roofing",
    domain: "pinnacleroofing.com",
    status: "rejected",
    created_at: "2025-12-08T13:12:00.000Z",
    updated_at: "2026-02-01T15:40:00.000Z",
    version: 2,
  },
  {
    name: "Blue Harbor Insurance",
    domain: "blueharborins.com",
    status: "contacted",
    created_at: "2026-01-15T10:08:00.000Z",
    updated_at: "2026-06-30T12:22:00.000Z",
    version: 3,
  },
  {
    name: "Evergreen Parks Co",
    domain: "evergreenparks.co",
    status: "researching",
    created_at: "2026-02-03T07:29:00.000Z",
    updated_at: "2026-08-09T09:55:00.000Z",
  },
  {
    name: "Stackyard Media",
    domain: "stackyard.media",
    status: "new",
    created_at: "2026-10-28T18:14:00.000Z",
    updated_at: "2026-10-28T18:14:00.000Z",
  },
  {
    name: "Aurora Transit",
    domain: "auroratransit.com",
    status: "qualified",
    created_at: "2025-03-18T12:36:00.000Z",
    updated_at: "2026-09-04T14:47:00.000Z",
    version: 5,
  },
  {
    name: "Wren Legal",
    domain: "wrenlegal.com",
    status: "contacted",
    created_at: "2026-03-11T15:51:00.000Z",
    updated_at: "2026-07-17T11:03:00.000Z",
    version: 2,
  },
  {
    name: "Tidal Markets",
    domain: "tidalmarkets.com",
    status: "researching",
    created_at: "2026-03-27T08:20:00.000Z",
    updated_at: "2026-09-12T16:28:00.000Z",
  },
  {
    name: "Oak & Ember Foods",
    domain: null,
    status: "rejected",
    created_at: "2026-04-05T19:00:00.000Z",
    updated_at: "2026-05-21T10:11:00.000Z",
    version: 2,
  },
  {
    name: "Summit Robotics",
    domain: "summitrobotics.com",
    status: "qualified",
    created_at: "2025-09-29T06:44:00.000Z",
    updated_at: "2026-10-08T13:39:00.000Z",
    version: 9,
  },
  {
    name: "Cinderpath Apparel",
    domain: "cinderpath.com",
    status: "new",
    created_at: "2026-09-30T09:17:00.000Z",
    updated_at: "2026-09-30T09:17:00.000Z",
  },
  {
    name: "Lattice Education",
    domain: "lattice.education",
    status: "contacted",
    created_at: "2026-05-13T14:02:00.000Z",
    updated_at: "2026-08-26T08:58:00.000Z",
    version: 3,
  },
  {
    name: "Foghorn Maritime",
    domain: "foghornmaritime.com",
    status: "researching",
    created_at: "2026-05-26T11:26:00.000Z",
    updated_at: "2026-10-01T17:45:00.000Z",
    version: 2,
  },
  {
    name: "Silverline Hotels",
    domain: "silverlinehotels.com",
    status: "qualified",
    created_at: "2025-11-20T16:09:00.000Z",
    updated_at: "2026-06-14T12:33:00.000Z",
    version: 4,
  },
  {
    name: "Driftwood Design",
    domain: null,
    status: "new",
    created_at: "2026-10-11T20:05:00.000Z",
    updated_at: "2026-10-11T20:05:00.000Z",
  },
  {
    name: "Peakline Capital",
    domain: "peakline.capital",
    status: "contacted",
    created_at: "2026-06-08T09:48:00.000Z",
    updated_at: "2026-09-19T15:21:00.000Z",
    version: 2,
  },
  {
    name: "Canopy Agriculture",
    domain: "canopyag.com",
    status: "researching",
    created_at: "2026-06-21T13:13:00.000Z",
    updated_at: "2026-10-15T10:07:00.000Z",
  },
  {
    name: "Beacon Civic Tech",
    domain: "beaconcivic.tech",
    status: "rejected",
    created_at: "2026-07-04T08:30:00.000Z",
    updated_at: "2026-08-02T14:19:00.000Z",
    version: 2,
  },
  {
    name: "Meridian Optics",
    domain: "meridianoptics.com",
    status: "qualified",
    created_at: "2025-12-19T10:54:00.000Z",
    updated_at: "2026-10-22T09:26:00.000Z",
    version: 6,
  },
  {
    name: "Lowland Brewing",
    domain: "lowlandbrewing.com",
    status: "contacted",
    created_at: "2026-07-19T17:41:00.000Z",
    updated_at: "2026-09-08T11:14:00.000Z",
  },
  {
    name: "Arcadian Motors",
    domain: "arcadianmotors.com",
    status: "researching",
    created_at: "2026-08-06T12:07:00.000Z",
    updated_at: "2026-10-26T16:52:00.000Z",
    version: 2,
  },
  {
    name: "Willowbyte",
    domain: "willowbyte.io",
    status: "new",
    created_at: "2026-10-30T08:00:00.000Z",
    updated_at: "2026-10-30T08:00:00.000Z",
  },
];

function createSeededCompanies(): Company[] {
  return seeds.map((seed, index) => ({
    id: `cmp_${String(index + 1).padStart(3, "0")}`,
    name: seed.name,
    domain: seed.domain,
    status: seed.status,
    version: seed.version ?? 1,
    created_at: seed.created_at,
    updated_at: seed.updated_at,
  }));
}

const globalForDb = globalThis as typeof globalThis & {
  companies?: Company[];
};

if (!globalForDb.companies) {
  globalForDb.companies = createSeededCompanies();
}

export const companies = globalForDb.companies;

export const COMPANY_STATUSES = [
  "new",
  "researching",
  "contacted",
  "qualified",
  "rejected",
] as const;

export const COMPANY_SORTS = [
  "name",
  "-name",
  "created_at",
  "-created_at",
] as const;

export type CompanySort = (typeof COMPANY_SORTS)[number];

export type ListCompaniesParams = {
  q?: string;
  status?: CompanyStatus;
  sort?: CompanySort;
  limit?: number;
  offset?: number;
};

export type ListCompaniesResult = {
  items: Company[];
  total: number;
  limit: number;
  offset: number;
};

export const DEFAULT_COMPANY_LIMIT = 50;
export const MAX_COMPANY_LIMIT = 100;

export function isCompanyStatus(value: string): value is CompanyStatus {
  return (COMPANY_STATUSES as readonly string[]).includes(value);
}

export function isCompanySort(value: string): value is CompanySort {
  return (COMPANY_SORTS as readonly string[]).includes(value);
}

export type CompanyWriteInput = {
  name: string;
  domain: string | null;
  status: CompanyStatus;
};

export function getCompany(id: string): Company | undefined {
  return companies.find((item) => item.id === id);
}

function nextCompanyId(): string {
  const max = companies.reduce((highest, company) => {
    const numeric = Number(company.id.replace(/^cmp_/, ""));
    return Number.isFinite(numeric) ? Math.max(highest, numeric) : highest;
  }, 0);

  return `cmp_${String(max + 1).padStart(3, "0")}`;
}

export function createCompany(input: CompanyWriteInput): Company {
  const now = new Date().toISOString();
  const company: Company = {
    id: nextCompanyId(),
    name: input.name,
    domain: input.domain,
    status: input.status,
    version: 1,
    created_at: now,
    updated_at: now,
  };

  companies.unshift(company);
  return company;
}

export type UpdateCompanyResult =
  | { ok: true; company: Company }
  | { ok: false; status: 404 }
  | { ok: false; status: 409; company: Company };

export function updateCompany(
  id: string,
  input: CompanyWriteInput & { version: number },
): UpdateCompanyResult {
  const index = companies.findIndex((item) => item.id === id);

  if (index < 0) {
    return { ok: false, status: 404 };
  }

  const current = companies[index];

  if (current.version !== input.version) {
    return { ok: false, status: 409, company: current };
  }

  const updated: Company = {
    ...current,
    name: input.name,
    domain: input.domain,
    status: input.status,
    version: current.version + 1,
    updated_at: new Date().toISOString(),
  };

  companies[index] = updated;
  return { ok: true, company: updated };
}

export function listCompanies(
  params: ListCompaniesParams = {},
): ListCompaniesResult {
  const limit = params.limit ?? DEFAULT_COMPANY_LIMIT;
  const offset = params.offset ?? 0;
  const query = params.q?.trim().toLowerCase();

  let items = companies.slice();

  if (query) {
    items = items.filter((company) => {
      const nameMatch = company.name.toLowerCase().includes(query);
      const domainMatch = company.domain?.toLowerCase().includes(query) ?? false;
      return nameMatch || domainMatch;
    });
  }

  if (params.status) {
    items = items.filter((company) => company.status === params.status);
  }

  if (params.sort) {
    const descending = params.sort.startsWith("-");
    const field = descending ? params.sort.slice(1) : params.sort;
    items.sort((a, b) => {
      const left = a[field as "name" | "created_at"];
      const right = b[field as "name" | "created_at"];
      const comparison = left.localeCompare(right, undefined, {
        sensitivity: "base",
      });
      return descending ? -comparison : comparison;
    });
  }

  const total = items.length;

  return {
    items: items.slice(offset, offset + limit),
    total,
    limit,
    offset,
  };
}
