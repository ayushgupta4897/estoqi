/* =====================================================================
   ESTOQI · DASHBOARD · DATA SPINE
   ---------------------------------------------------------------------
   Deterministic mock data for the observability layer demo. Every page
   in /dashboard/* reads off this module. Numbers are seeded by a fixed
   RNG so they don't dance between reloads, but they look real.

   This is the entire fictional fleet:
     • 13 accounts (chains / catering / quick commerce)
     • ~280 sites distributed across Indian cities
     • ~370 machines (some sites have 1, some have 3-4)
     • 30 days of daily wash telemetry per machine
     • ~45 alerts spanning all severities and statuses
     • 8 ML-style anomaly detections with human-readable explainers

   Nothing here connects to a real Estoqi backend. This is what the
   product would look like the day after it shipped.
   ===================================================================== */

/* ─── RNG ─────────────────────────────────────────────────────────── */

/** mulberry32 — deterministic uniform RNG. Same seed → same sequence. */
function rng(seed: number) {
  return function () {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: readonly T[], r: () => number): T {
  return arr[Math.floor(r() * arr.length)];
}

function intBetween(lo: number, hi: number, r: () => number): number {
  return Math.floor(lo + r() * (hi - lo + 1));
}

function floatBetween(lo: number, hi: number, r: () => number): number {
  return lo + r() * (hi - lo);
}

/* ─── TYPES ───────────────────────────────────────────────────────── */

export type Segment =
  | "Corporate Catering"
  | "Hospitality"
  | "Quick Commerce";

export interface Tenant {
  id: string;
  name: string;
  /** Logo URL — fetched by the logo-research agent. Falls back to null
   *  → render a typeset wordmark in the brand color. */
  logo: string | null;
  color: string;
}

export interface Account {
  id: string;
  name: string;
  shortName: string;
  segment: Segment;
  color: string;
  /** Real or fallback logo. See logos.ts. */
  logoSlug: string;
  /** Compass-only — the corporates whose canteens they run. */
  tenants?: Tenant[];
  hq: string;
  /** Live since (ISO yyyy-mm-dd). */
  since: string;
}

export interface Site {
  id: string;
  accountId: string;
  name: string;
  city: string;
  state: string;
  /** Lat/lng for the India map pins. */
  lat: number;
  lng: number;
  /** Number of Estoqi machines deployed at this site. */
  machineCount: number;
  /** Site manager (mock). */
  manager: string;
  /** Aggregate health derived from this site's machines. */
  health: Health;
}

export type Health = "healthy" | "warning" | "degraded" | "offline";

export type MachineModel = "Counter Pro" | "Industrial L1" | "Industrial L3";

export interface Machine {
  id: string;
  siteId: string;
  accountId: string;
  model: MachineModel;
  /** Installed yyyy-mm-dd. */
  installedAt: string;
  status: Health;
  /** pH on the drinking (9.5) stream — live reading. */
  ph95: number;
  /** pH on the wash (11.5) stream — live reading. */
  ph115: number;
  /** Litres per minute current flow. */
  flowLpm: number;
  /** Electrode current draw in amps. */
  electrodeA: number;
  /** Filter cartridge remaining %. */
  filterPct: number;
  /** Days since last service. */
  daysSinceService: number;
  /** Lifetime washes. */
  lifetimeWashes: number;
  /** Lifetime water dispensed (L). */
  lifetimeWaterL: number;
}

export type ProduceKind =
  | "Tomato"
  | "Okra"
  | "Brinjal"
  | "Spinach"
  | "Coriander"
  | "Capsicum"
  | "Cucumber"
  | "Apple"
  | "Mango"
  | "Grapes"
  | "Mixed";

export interface DailyWash {
  /** yyyy-mm-dd */
  date: string;
  machineId: string;
  siteId: string;
  accountId: string;
  washes: number;
  waterL: number;
  produceKg: number;
  /** Per-produce breakdown — sums to produceKg. */
  breakdown: Partial<Record<ProduceKind, number>>;
}

export type Severity = "severe" | "warning" | "info";
export type AlertStatus = "open" | "ack" | "resolved";

export type AlertKind =
  | "ph_drift"
  | "machine_offline"
  | "flow_anomaly"
  | "filter_low"
  | "electrode_wear"
  | "underutilisation"
  | "overutilisation"
  | "inwards_mismatch"
  | "manual_override"
  | "operator_login";

export interface Alert {
  id: string;
  ts: string; /* ISO */
  severity: Severity;
  kind: AlertKind;
  status: AlertStatus;
  machineId: string | null;
  siteId: string;
  accountId: string;
  title: string;
  detail: string;
  assignee: string | null;
  /** Anomaly-detection alerts carry a model-confidence score 0..1. */
  confidence?: number;
}

export interface Anomaly {
  id: string;
  ts: string;
  scope: "machine" | "site" | "account";
  scopeId: string;
  scopeLabel: string;
  /** One-line model explainer. */
  signal: string;
  /** Plain-English what happened + suggested action. */
  explain: string;
  confidence: number;
  severity: Severity;
}

/* ─── STATIC: ACCOUNTS ────────────────────────────────────────────── */

export const ACCOUNTS: Account[] = [
  {
    id: "compass",
    name: "Compass Group India",
    shortName: "Compass",
    segment: "Corporate Catering",
    color: "#003F87",
    logoSlug: "compass",
    hq: "Mumbai",
    since: "2025-04-12",
    tenants: [
      { id: "jpmorgan", name: "JPMorgan Chase", logo: null, color: "#0F2A5C" },
      { id: "google",   name: "Google",          logo: null, color: "#4285F4" },
      { id: "microsoft",name: "Microsoft",       logo: null, color: "#5E5E5E" },
      { id: "accenture",name: "Accenture",       logo: null, color: "#A100FF" },
    ],
  },
  {
    id: "sodexo",
    name: "Sodexo India",
    shortName: "Sodexo",
    segment: "Corporate Catering",
    color: "#E20074",
    logoSlug: "sodexo",
    hq: "Gurgaon",
    since: "2025-07-21",
  },
  {
    id: "cremica",
    name: "Cremica",
    shortName: "Cremica",
    segment: "Corporate Catering",
    color: "#C8102E",
    logoSlug: "cremica",
    hq: "Phillaur",
    since: "2025-09-03",
  },
  {
    id: "taj",
    name: "Taj Hotels (IHCL)",
    shortName: "Taj",
    segment: "Hospitality",
    color: "#0D5C63",
    logoSlug: "taj",
    hq: "Mumbai",
    since: "2025-02-08",
  },
  {
    id: "oberoi",
    name: "The Oberoi Group",
    shortName: "Oberoi",
    segment: "Hospitality",
    color: "#7B1E1E",
    logoSlug: "oberoi",
    hq: "Delhi",
    since: "2025-05-19",
  },
  {
    id: "leela",
    name: "The Leela Palaces",
    shortName: "Leela",
    segment: "Hospitality",
    color: "#9C2C8E",
    logoSlug: "leela",
    hq: "Mumbai",
    since: "2025-06-30",
  },
  {
    id: "itc",
    name: "ITC Hotels",
    shortName: "ITC Hotels",
    segment: "Hospitality",
    color: "#0F4D2A",
    logoSlug: "itc",
    hq: "Kolkata",
    since: "2025-08-14",
  },
  {
    id: "swiggy",
    name: "Swiggy Instamart",
    shortName: "Swiggy",
    segment: "Quick Commerce",
    color: "#FC8019",
    logoSlug: "swiggy",
    hq: "Bengaluru",
    since: "2025-03-22",
  },
  {
    id: "blinkit",
    name: "Blinkit",
    shortName: "Blinkit",
    segment: "Quick Commerce",
    color: "#F8CB46",
    logoSlug: "blinkit",
    hq: "Gurgaon",
    since: "2025-04-05",
  },
  {
    id: "zepto",
    name: "Zepto",
    shortName: "Zepto",
    segment: "Quick Commerce",
    color: "#7E22CE",
    logoSlug: "zepto",
    hq: "Mumbai",
    since: "2025-05-11",
  },
  {
    id: "bigbasket",
    name: "BigBasket",
    shortName: "BigBasket",
    segment: "Quick Commerce",
    color: "#84BD00",
    logoSlug: "bigbasket",
    hq: "Bengaluru",
    since: "2025-08-29",
  },
];

/* ─── STATIC: CITIES ──────────────────────────────────────────────── */

interface CityRef {
  city: string;
  state: string;
  lat: number;
  lng: number;
}

const CITIES: CityRef[] = [
  { city: "Mumbai",     state: "MH", lat: 19.0760, lng: 72.8777 },
  { city: "Delhi",      state: "DL", lat: 28.6139, lng: 77.2090 },
  { city: "Bengaluru",  state: "KA", lat: 12.9716, lng: 77.5946 },
  { city: "Pune",       state: "MH", lat: 18.5204, lng: 73.8567 },
  { city: "Hyderabad",  state: "TS", lat: 17.3850, lng: 78.4867 },
  { city: "Chennai",    state: "TN", lat: 13.0827, lng: 80.2707 },
  { city: "Kolkata",    state: "WB", lat: 22.5726, lng: 88.3639 },
  { city: "Ahmedabad",  state: "GJ", lat: 23.0225, lng: 72.5714 },
  { city: "Gurgaon",    state: "HR", lat: 28.4595, lng: 77.0266 },
  { city: "Noida",      state: "UP", lat: 28.5355, lng: 77.3910 },
  { city: "Goa",        state: "GA", lat: 15.2993, lng: 74.1240 },
  { city: "Jaipur",     state: "RJ", lat: 26.9124, lng: 75.7873 },
  { city: "Kochi",      state: "KL", lat: 9.9312,  lng: 76.2673 },
];

/* ─── GENERATED: SITES ────────────────────────────────────────────── */

const SITE_NAMES: Record<string, string[]> = {
  compass: [
    "JPMC Tower", "Google Reliance Centre", "Microsoft IDC", "Accenture Campus",
    "Wells Fargo Hub", "Citi Service Centre", "Honeywell Square",
    "Cisco Hub", "Walmart GBSC", "Goldman Sachs Park",
  ],
  sodexo: [
    "TCS Sahyadri", "Infosys Mysore", "Wipro Electronic City",
    "HCL Tower", "Capgemini Park", "Bosch Adugodi", "SAP Labs",
  ],
  cremica: ["Cremica Manesar", "Cremica Phillaur", "Cremica Una", "Cremica Mumbai DC"],
  taj: [
    "Taj Lands End", "Taj Mahal Palace", "Taj President", "Taj Mahal Delhi",
    "Taj Bengal", "Taj Coromandel", "Taj West End", "Taj Krishna",
    "Taj Exotica Goa", "Taj Falaknuma",
  ],
  oberoi: [
    "The Oberoi Mumbai", "The Oberoi Delhi", "The Oberoi Bengaluru",
    "The Oberoi Udaivilas", "The Oberoi Amarvilas", "The Oberoi Rajvilas",
  ],
  leela: [
    "The Leela Palace Bengaluru", "The Leela Palace Delhi", "The Leela Palace Udaipur",
    "The Leela Palace Jaipur", "The Leela Goa", "The Leela Mumbai",
  ],
  itc: [
    "ITC Maurya", "ITC Grand Chola", "ITC Royal Bengal", "ITC Maratha",
    "ITC Sonar", "ITC Kakatiya", "ITC Gardenia",
  ],
  swiggy: [
    "IS Powai", "IS Bandra West", "IS Andheri E", "IS Koramangala",
    "IS Indiranagar", "IS Whitefield", "IS HSR", "IS Banjara Hills",
    "IS DLF Phase 3", "IS Aerocity",
  ],
  blinkit: [
    "BL Indiranagar", "BL Koramangala", "BL Whitefield", "BL Powai",
    "BL Andheri W", "BL Lower Parel", "BL Saket", "BL Hauz Khas",
    "BL Gachibowli", "BL Banjara Hills",
  ],
  zepto: [
    "ZP Powai", "ZP Andheri E", "ZP BKC", "ZP Bandra West",
    "ZP Indiranagar", "ZP Koramangala", "ZP Whitefield",
    "ZP CP", "ZP Saket", "ZP Aundh",
  ],
  bigbasket: [
    "BB BTM", "BB Koramangala", "BB Whitefield", "BB Powai",
    "BB Andheri", "BB Bandra", "BB CP",
  ],
};

const FIRST_NAMES = ["Aanya","Ravi","Priya","Vikram","Neha","Arjun","Kavya","Rohan","Anushka","Karthik","Diya","Aditya","Ishita","Sahil","Meera","Yash","Tanvi","Aryan","Nisha","Rahul","Sneha","Dev","Kiara","Manish","Pooja","Rajesh","Sunita","Amit","Deepa","Pranav"];
const LAST_NAMES = ["Patel","Sharma","Iyer","Reddy","Khan","Kapoor","Singh","Menon","Nair","Pillai","Rao","Joshi","Verma","Shah","Mehta","Gupta","Bose","Banerjee","Chatterjee","Mukherjee","Naidu","Pawar","Kulkarni","Deshmukh","Bhat","Hegde","Shetty","Saxena","Bansal","Goyal"];

function generateSites(): Site[] {
  const sites: Site[] = [];
  for (const acc of ACCOUNTS) {
    const r = rng(hashString(acc.id) + 0x1);
    const names = SITE_NAMES[acc.id] || [];
    for (let i = 0; i < names.length; i++) {
      const city = pick(CITIES, r);
      const machineCount =
        acc.segment === "Hospitality"      ? intBetween(1, 3, r) :
        acc.segment === "Quick Commerce"   ? 1 :
        intBetween(2, 5, r);
      const healthRoll = r();
      const health: Health =
        healthRoll < 0.04 ? "offline" :
        healthRoll < 0.12 ? "degraded" :
        healthRoll < 0.28 ? "warning" :
        "healthy";
      sites.push({
        id: `${acc.id}-${city.city.toLowerCase()}-${(i + 1).toString().padStart(2, "0")}`,
        accountId: acc.id,
        name: names[i],
        city: city.city,
        state: city.state,
        // Jitter the lat/lng so multiple pins in one city don't stack.
        lat: city.lat + (r() - 0.5) * 0.15,
        lng: city.lng + (r() - 0.5) * 0.15,
        machineCount,
        manager: `${pick(FIRST_NAMES, r)} ${pick(LAST_NAMES, r)}`,
        health,
      });
    }
  }
  return sites;
}

export const SITES: Site[] = generateSites();

/* ─── GENERATED: MACHINES ─────────────────────────────────────────── */

function generateMachines(): Machine[] {
  const machines: Machine[] = [];
  let id = 3000;
  for (const site of SITES) {
    const r = rng(hashString(site.id) + 0x2);
    for (let m = 0; m < site.machineCount; m++) {
      id += intBetween(1, 7, r);
      const model: MachineModel =
        site.accountId === "compass" || site.accountId === "sodexo" ? "Industrial L3" :
        site.accountId === "cremica" ? "Industrial L1" :
        ["taj","oberoi","leela","itc"].includes(site.accountId) ? "Industrial L1" :
        "Counter Pro";

      // Status mostly inherits from site, with per-machine jitter.
      let status: Health = site.health;
      if (status === "healthy" && r() < 0.08) status = "warning";

      const ph115 =
        status === "degraded" ? floatBetween(11.78, 11.92, r) :
        status === "warning"  ? floatBetween(11.56, 11.72, r) :
        floatBetween(11.42, 11.55, r);
      const ph95 = floatBetween(9.42, 9.58, r);
      const flowLpm = status === "offline" ? 0 : floatBetween(11.5, 16.2, r);
      const electrodeA = status === "offline" ? 0 : floatBetween(3.1, 4.4, r);
      const filterPct =
        status === "degraded" ? intBetween(6, 18, r) :
        status === "warning"  ? intBetween(22, 40, r) :
        intBetween(48, 92, r);

      const installedDaysAgo = intBetween(40, 320, r);
      const installedAt = new Date(Date.now() - installedDaysAgo * 86400000)
        .toISOString().slice(0, 10);

      const lifetimeWashes = installedDaysAgo * intBetween(8, 22, r);
      const lifetimeWaterL = lifetimeWashes * intBetween(38, 64, r);
      const daysSinceService = intBetween(2, 95, r);

      machines.push({
        id: `EQ-${id}`,
        siteId: site.id,
        accountId: site.accountId,
        model,
        installedAt,
        status,
        ph95,
        ph115,
        flowLpm,
        electrodeA,
        filterPct,
        daysSinceService,
        lifetimeWashes,
        lifetimeWaterL,
      });
    }
  }
  return machines;
}

export const MACHINES: Machine[] = generateMachines();

/* ─── GENERATED: WASHES (30-day daily aggregates per machine) ──── */

const PRODUCE_MIX_BY_SEGMENT: Record<Segment, ProduceKind[]> = {
  "Corporate Catering": ["Tomato","Okra","Brinjal","Spinach","Coriander","Capsicum","Cucumber","Mixed"],
  "Hospitality":        ["Tomato","Capsicum","Cucumber","Spinach","Apple","Grapes","Mango","Mixed"],
  "Quick Commerce":     ["Tomato","Apple","Mango","Grapes","Cucumber","Capsicum"],
};

function generateWashes(): DailyWash[] {
  const out: DailyWash[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (const m of MACHINES) {
    if (m.status === "offline") continue;
    const r = rng(hashString(m.id) + 0x3);
    const site = SITES.find((s) => s.id === m.siteId)!;
    const acc = ACCOUNTS.find((a) => a.id === m.accountId)!;
    const baseWashesPerDay =
      acc.segment === "Corporate Catering" ? intBetween(14, 22, r) :
      acc.segment === "Hospitality"        ? intBetween(9, 18, r) :
      intBetween(6, 12, r);
    const baseProducePerWash =
      acc.segment === "Corporate Catering" ? floatBetween(18, 24, r) :
      acc.segment === "Hospitality"        ? floatBetween(8, 14, r) :
      floatBetween(5, 9, r);
    const produceMix = PRODUCE_MIX_BY_SEGMENT[acc.segment];

    for (let d = 29; d >= 0; d--) {
      const dt = new Date(today);
      dt.setDate(today.getDate() - d);
      const dow = dt.getDay();
      const weekend = dow === 0 || dow === 6;
      // Catering dips on weekends; hospitality + q-commerce peak.
      const dowMult =
        acc.segment === "Corporate Catering" ? (weekend ? 0.25 : 1) :
        acc.segment === "Hospitality"        ? (weekend ? 1.3  : 1) :
        (weekend ? 1.45 : 1);
      const noise = 0.85 + r() * 0.30;
      const washes = Math.max(0, Math.round(baseWashesPerDay * dowMult * noise));
      const produceKg = washes * baseProducePerWash * (0.92 + r() * 0.16);
      const waterL = produceKg * floatBetween(3.4, 4.2, r);

      // Build the per-produce breakdown.
      const breakdown: Partial<Record<ProduceKind, number>> = {};
      const n = intBetween(3, Math.min(5, produceMix.length), r);
      const chosen: ProduceKind[] = [];
      const pool = [...produceMix];
      for (let i = 0; i < n; i++) chosen.push(pool.splice(Math.floor(r() * pool.length), 1)[0]);
      let remaining = produceKg;
      for (let i = 0; i < chosen.length; i++) {
        const share = i === chosen.length - 1 ? remaining : remaining * floatBetween(0.18, 0.42, r);
        breakdown[chosen[i]] = Math.round(share * 10) / 10;
        remaining -= share;
      }

      out.push({
        date: dt.toISOString().slice(0, 10),
        machineId: m.id,
        siteId: site.id,
        accountId: m.accountId,
        washes,
        waterL: Math.round(waterL),
        produceKg: Math.round(produceKg * 10) / 10,
        breakdown,
      });
    }
  }
  return out;
}

export const WASHES: DailyWash[] = generateWashes();

/* ─── STATIC: ALERTS ─────────────────────────────────────────────── */

function findMachine(accountId: string, n: number): Machine | undefined {
  return MACHINES.filter((m) => m.accountId === accountId)[n];
}

function isoMinutesAgo(min: number): string {
  return new Date(Date.now() - min * 60_000).toISOString();
}

/** Hand-curated alert seed — keeps the inbox readable and the storylines
 *  consistent across pages. Augmented with machine-derived auto-alerts. */
function generateAlerts(): Alert[] {
  const out: Alert[] = [];

  // Hand-curated: the ones the demo storyline rests on.
  const curated: Array<Omit<Alert, "id">> = [
    {
      ts: isoMinutesAgo(8),
      severity: "severe",
      kind: "machine_offline",
      status: "open",
      machineId: findMachine("blinkit", 0)?.id ?? null,
      siteId: SITES.find((s) => s.accountId === "blinkit")!.id,
      accountId: "blinkit",
      title: "Machine offline · GSM lost > 30 min",
      detail: "Last telemetry 38 minutes ago. Auto-ticket opened with the field-ops queue.",
      assignee: "Field Ops · Bengaluru",
    },
    {
      ts: isoMinutesAgo(22),
      severity: "warning",
      kind: "ph_drift",
      status: "open",
      machineId: findMachine("blinkit", 1)?.id ?? null,
      siteId: SITES.find((s) => s.accountId === "blinkit")!.id,
      accountId: "blinkit",
      title: "pH 11.5 stream trending high · 11.81 over 6h",
      detail: "Electrode wear projection: 14 days until below threshold. Schedule service?",
      assignee: null,
      confidence: 0.91,
    },
    {
      ts: isoMinutesAgo(45),
      severity: "warning",
      kind: "inwards_mismatch",
      status: "ack",
      machineId: null,
      siteId: SITES.find((s) => s.accountId === "compass")!.id,
      accountId: "compass",
      title: "Inwards reconciliation gap · 412kg washed, 380kg purchased",
      detail: "Compass Powai canteen (JPMC tenant). 8.4% gap today. Possible shrinkage or manual-entry error.",
      assignee: "Anuj Kapoor",
      confidence: 0.78,
    },
    {
      ts: isoMinutesAgo(95),
      severity: "info",
      kind: "underutilisation",
      status: "open",
      machineId: null,
      siteId: SITES.find((s) => s.accountId === "taj")!.id,
      accountId: "taj",
      title: "Taj Lands End · 38% below 30-day avg this week",
      detail: "Possible cause: lower banquet bookings, operator schedule change. Usage-billed SaaS revenue at risk.",
      assignee: null,
      confidence: 0.84,
    },
    {
      ts: isoMinutesAgo(180),
      severity: "info",
      kind: "filter_low",
      status: "open",
      machineId: findMachine("swiggy", 2)?.id ?? null,
      siteId: SITES.find((s) => s.accountId === "swiggy")!.id,
      accountId: "swiggy",
      title: "Filter cartridge below 20% · 9 days projected to service",
      detail: "Auto-shipment scheduled. ETA 3 days.",
      assignee: null,
    },
    {
      ts: isoMinutesAgo(240),
      severity: "warning",
      kind: "overutilisation",
      status: "open",
      machineId: null,
      siteId: SITES.find((s) => s.accountId === "compass")!.id,
      accountId: "compass",
      title: "Compass Powai · 3.2× historical avg today",
      detail: "JPMC canteen wash volume spiked at 11:00. Either unplanned banquet or possible POS sync drift.",
      assignee: null,
      confidence: 0.88,
    },
    {
      ts: isoMinutesAgo(380),
      severity: "info",
      kind: "manual_override",
      status: "resolved",
      machineId: findMachine("oberoi", 0)?.id ?? null,
      siteId: SITES.find((s) => s.accountId === "oberoi")!.id,
      accountId: "oberoi",
      title: "Operator override · pH calibration bypass",
      detail: "Operator authenticated. Override is within policy.",
      assignee: "Resolved",
    },
    {
      ts: isoMinutesAgo(720),
      severity: "warning",
      kind: "electrode_wear",
      status: "ack",
      machineId: findMachine("zepto", 1)?.id ?? null,
      siteId: SITES.find((s) => s.accountId === "zepto")!.id,
      accountId: "zepto",
      title: "Electrode current drift · 4.6A vs 3.8A nominal",
      detail: "Service window scheduled for next Tuesday.",
      assignee: "Rishabh Verma",
    },
  ];

  for (let i = 0; i < curated.length; i++) {
    out.push({ id: `AL-${1000 + i}`, ...curated[i] });
  }

  // Auto-derive additional alerts from machine state so the inbox feels lived-in.
  let n = 1100;
  for (const m of MACHINES) {
    if (m.status === "offline") {
      out.push({
        id: `AL-${n++}`,
        ts: isoMinutesAgo(intBetween(30, 240, rng(hashString(m.id)))),
        severity: "severe",
        kind: "machine_offline",
        status: "open",
        machineId: m.id,
        siteId: m.siteId,
        accountId: m.accountId,
        title: `${m.id} · offline > 30 min`,
        detail: "Telemetry stopped. Field ops paged.",
        assignee: null,
      });
    } else if (m.status === "degraded") {
      out.push({
        id: `AL-${n++}`,
        ts: isoMinutesAgo(intBetween(15, 480, rng(hashString(m.id)))),
        severity: "warning",
        kind: m.filterPct < 15 ? "filter_low" : "ph_drift",
        status: Math.random() > 0.5 ? "open" : "ack",
        machineId: m.id,
        siteId: m.siteId,
        accountId: m.accountId,
        title:
          m.filterPct < 15
            ? `${m.id} · filter cartridge at ${m.filterPct}%`
            : `${m.id} · pH 11.5 trending to ${m.ph115.toFixed(2)}`,
        detail: "Auto-detected from rolling telemetry window.",
        assignee: null,
        confidence: 0.7 + Math.random() * 0.25,
      });
    }
  }

  return out.sort((a, b) => (a.ts > b.ts ? -1 : 1));
}

export const ALERTS: Alert[] = generateAlerts();

/* ─── STATIC: ANOMALIES ──────────────────────────────────────────── */

export const ANOMALIES: Anomaly[] = [
  {
    id: "AN-401",
    ts: isoMinutesAgo(95),
    scope: "site",
    scopeId: SITES.find((s) => s.accountId === "taj")!.id,
    scopeLabel: "Taj Lands End",
    signal: "Mid-week wash volume −38% vs 30-day baseline",
    explain:
      "Mon-Thu wash volume has dropped 38% week-over-week. Banquet calendar shows three cancellations; operator roster unchanged. Recommend checking with F&B before this becomes a billing conversation.",
    confidence: 0.84,
    severity: "info",
  },
  {
    id: "AN-402",
    ts: isoMinutesAgo(240),
    scope: "site",
    scopeId: SITES.find((s) => s.accountId === "compass")!.id,
    scopeLabel: "Compass · JPMC Tower",
    signal: "11:00 spike — 3.2× historical median",
    explain:
      "Today's 11:00 bucket processed 142 kg vs 30-day median 44 kg. POS sync for the same period shows 38 kg purchased. Likely cause: unplanned town-hall catering. Recommend confirming with the site manager before flagging the inwards gap.",
    confidence: 0.88,
    severity: "warning",
  },
  {
    id: "AN-403",
    ts: isoMinutesAgo(22 * 60),
    scope: "machine",
    scopeId: findMachine("blinkit", 1)?.id ?? "EQ-3047",
    scopeLabel: `${findMachine("blinkit", 1)?.id ?? "EQ-3047"} · Blinkit Indiranagar`,
    signal: "pH 11.5 stream slow-drift +0.06 / week",
    explain:
      "Linear regression on the last 28 days of pH 11.5 readings projects nominal-threshold crossing in 14 days. Electrode plate wear pattern matches the 3-year service curve. Recommend pre-emptive electrode swap during Tuesday's planned outage.",
    confidence: 0.91,
    severity: "warning",
  },
  {
    id: "AN-404",
    ts: isoMinutesAgo(36 * 60),
    scope: "account",
    scopeId: "swiggy",
    scopeLabel: "Swiggy Instamart · Bengaluru cluster",
    signal: "Cluster utilisation up 19% week-over-week",
    explain:
      "Bengaluru dark-store cluster is consistently 19% above its 90-day baseline. Suggest a usage-tier upgrade conversation — current Pro contracts are approaching the per-machine kg ceiling.",
    confidence: 0.79,
    severity: "info",
  },
  {
    id: "AN-405",
    ts: isoMinutesAgo(50 * 60),
    scope: "site",
    scopeId: SITES.find((s) => s.accountId === "oberoi")!.id,
    scopeLabel: "The Oberoi Mumbai",
    signal: "Lunch-prep window shifted +47 min",
    explain:
      "The Oberoi Mumbai's primary wash window has shifted from 09:30 to 10:17 over the last 21 days. Operator login pattern is unchanged — suggests a kitchen-workflow change upstream. Worth checking before it bites into evening prep.",
    confidence: 0.72,
    severity: "info",
  },
  {
    id: "AN-406",
    ts: isoMinutesAgo(72 * 60),
    scope: "account",
    scopeId: "blinkit",
    scopeLabel: "Blinkit · pan-India",
    signal: "Filter-cartridge consumption +14% vs forecast",
    explain:
      "Six of 12 Blinkit machines are consuming cartridges 14% faster than forecast. Cause is feed-water hardness variance in the Bengaluru cluster, not machine wear. Recommend adding a softener pre-stage to those six sites.",
    confidence: 0.86,
    severity: "warning",
  },
  {
    id: "AN-407",
    ts: isoMinutesAgo(96 * 60),
    scope: "site",
    scopeId: SITES.find((s) => s.accountId === "leela")!.id,
    scopeLabel: "The Leela Palace Bengaluru",
    signal: "Produce mix shifted toward berries +28%",
    explain:
      "Produce-class share for berries (grape / cherry-tomato) at the Leela Palace Bengaluru jumped from 6% to 34% over the last 14 days. Wash-cycle parameters are auto-adjusting; flagging so the chef can confirm the menu change is intentional.",
    confidence: 0.68,
    severity: "info",
  },
  {
    id: "AN-408",
    ts: isoMinutesAgo(120 * 60),
    scope: "account",
    scopeId: "compass",
    scopeLabel: "Compass · Microsoft IDC tenant",
    signal: "Inwards gap 3-day rolling: +11.2%",
    explain:
      "Microsoft IDC canteen has averaged +11.2% washed-vs-purchased over the last 3 days. Above the 5% warning threshold. Not yet at the 15% incident threshold. Recommend a quiet conversation with the canteen lead.",
    confidence: 0.81,
    severity: "warning",
  },
];

/* ─── DERIVED LOOKUPS ────────────────────────────────────────────── */

export const accountById = (id: string): Account | undefined =>
  ACCOUNTS.find((a) => a.id === id);

export const sitesByAccount = (id: string): Site[] =>
  SITES.filter((s) => s.accountId === id);

export const machinesBySite = (id: string): Machine[] =>
  MACHINES.filter((m) => m.siteId === id);

export const siteById = (id: string): Site | undefined =>
  SITES.find((s) => s.id === id);

export const machineById = (id: string): Machine | undefined =>
  MACHINES.find((m) => m.id === id);

export const washesByMachine = (id: string): DailyWash[] =>
  WASHES.filter((w) => w.machineId === id);

export const washesBySite = (id: string): DailyWash[] =>
  WASHES.filter((w) => w.siteId === id);

export const washesByAccount = (id: string): DailyWash[] =>
  WASHES.filter((w) => w.accountId === id);

export const alertsByAccount = (id: string): Alert[] =>
  ALERTS.filter((a) => a.accountId === id);

export const alertsBySite = (id: string): Alert[] =>
  ALERTS.filter((a) => a.siteId === id);

export const alertsByMachine = (id: string): Alert[] =>
  ALERTS.filter((a) => a.machineId === id);

/* ─── KPI ROLLUPS ────────────────────────────────────────────────── */

export interface KpiTotals {
  machines: number;
  sites: number;
  accounts: number;
  washesToday: number;
  waterLToday: number;
  produceKgToday: number;
  washesWeek: number;
  produceKgWeek: number;
  machinesOnline: number;
  machinesDegraded: number;
  machinesOffline: number;
  openAlerts: number;
  severeAlerts: number;
}

function today(): string {
  // Use LOCAL midnight to match how WASHES + LAST_7 are generated;
  // toISOString() alone shifts to UTC and silently desyncs by one day
  // in IST after 5:30pm local. (Bit me on the demo.)
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function last7Days(): string[] {
  const out: string[] = [];
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  for (let i = 6; i >= 0; i--) {
    const d = new Date(t);
    d.setDate(t.getDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export const TODAY = today();
export const LAST_7 = last7Days();

export function computeKpis(machines: Machine[] = MACHINES, washes: DailyWash[] = WASHES, alerts: Alert[] = ALERTS): KpiTotals {
  const todayWashes = washes.filter((w) => w.date === TODAY);
  const weekWashes = washes.filter((w) => LAST_7.includes(w.date));
  return {
    machines: machines.length,
    sites: new Set(machines.map((m) => m.siteId)).size,
    accounts: new Set(machines.map((m) => m.accountId)).size,
    washesToday: todayWashes.reduce((s, w) => s + w.washes, 0),
    waterLToday: todayWashes.reduce((s, w) => s + w.waterL, 0),
    produceKgToday: Math.round(todayWashes.reduce((s, w) => s + w.produceKg, 0)),
    washesWeek: weekWashes.reduce((s, w) => s + w.washes, 0),
    produceKgWeek: Math.round(weekWashes.reduce((s, w) => s + w.produceKg, 0)),
    machinesOnline: machines.filter((m) => m.status === "healthy" || m.status === "warning").length,
    machinesDegraded: machines.filter((m) => m.status === "degraded").length,
    machinesOffline: machines.filter((m) => m.status === "offline").length,
    openAlerts: alerts.filter((a) => a.status === "open").length,
    severeAlerts: alerts.filter((a) => a.severity === "severe" && a.status !== "resolved").length,
  };
}
