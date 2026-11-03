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
