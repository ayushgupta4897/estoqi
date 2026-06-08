/* =====================================================================
   ESTOQI · Lab reports · structured data
   Pulled directly from the seven PDFs Envirocare Labs returned.
   Numbers are verbatim. Adding a new report = add an entry below + a
   matching body component in ./bodies.tsx.
   ===================================================================== */

export type ReportKind =
  | "pesticide-reduction"
  | "microbial-reduction"
  | "shelf-life"
  | "nutrition-enrichment";

export interface ReportMeta {
  slug: string;
  produce: string;
  produceLatin?: string;
  produceImage: string;
  kind: ReportKind;
  kindLabel: string;
  description: string;
  testedBy: string;
  testingMethod: string;
  reportDate: string;
  reportNo: string;
}

export interface ResidueRow {
  compound: string;
  family: string;
  values: (string | "Eliminated" | "BLQ")[];
}

/* PESTICIDE — Tomato (4-column table) */
export const TOMATO_PESTICIDE = {
  meta: {
    slug: "tomato-pesticide-reduction",
    produce: "Tomato",
    produceLatin: "Solanum lycopersicum",
    produceImage: "/concepts/canon_stilllife.webp",
    kind: "pesticide-reduction" as ReportKind,
    kindLabel: "Pesticide Residue Reduction",
    description:
      "256 pesticide parameters screened across 4 samples — unwashed, mineral water, baking soda, and Estoqi Wash — from the same produce batch.",
    testedBy: "Envirocare Labs",
    testingMethod: "EL/SOP/520",
    reportDate: "11 October 2025",
    reportNo: "EST/2025/TOM/P-01",
  } as ReportMeta,
  columns: ["No Wash", "Mineral Water", "Baking Soda", "Estoqi Wash"],
  rows: [
    { compound: "Profenofos",       family: "Organophosphate",       values: ["7.936 mg/kg", "7.801 mg/kg", "7.633 mg/kg", "4.896 mg/kg"] },
    { compound: "Lambda Cyhalothrin", family: "Pyrethroid insecticide", values: ["2.786 mg/kg", "2.732 mg/kg", "1.359 mg/kg", "1.299 mg/kg"] },
    { compound: "Propargite",       family: "Acaricide",             values: ["0.900 mg/kg", "0.890 mg/kg", "0.883 mg/kg", "0.656 mg/kg"] },
    { compound: "Paclobutrazole",   family: "Fungicide · PGR",       values: ["0.379 mg/kg", "0.373 mg/kg", "0.328 mg/kg", "0.234 mg/kg"] },
    { compound: "Tebuconazole",     family: "Triazole fungicide",    values: ["0.067 mg/kg", "0.059 mg/kg", "0.058 mg/kg", "Eliminated"] },
    { compound: "Tolfenpyrad",      family: "Pyrazole insecticide",  values: ["0.036 mg/kg", "0.033 mg/kg", "0.028 mg/kg", "Eliminated"] },
    { compound: "Thiamethoxam",     family: "Neonicotinoid",         values: ["0.019 mg/kg", "0.014 mg/kg", "0.013 mg/kg", "Eliminated"] },
    { compound: "Imidacloprid",     family: "Neonicotinoid",         values: ["0.033 mg/kg", "0.025 mg/kg", "0.025 mg/kg", "Eliminated"] },
    { compound: "Monocrotophos",    family: "Organophosphate",       values: ["0.021 mg/kg", "0.012 mg/kg", "0.012 mg/kg", "Eliminated"] },
    { compound: "Copper compounds", family: "Fungicide · inorganic", values: ["1.090 mg/kg", "0.910 mg/kg", "0.700 mg/kg", "0.680 mg/kg"] },
  ] as ResidueRow[],
  takeaway:
    "Estoqi outperforms baking soda — the most widely recommended home alternative. Systemic pesticides absorbed into plant tissue are not addressed by surface washing.",
};

/* PESTICIDE — Okra (KPI tiles + eliminated/reduced) */
export const OKRA_PESTICIDE = {
  meta: {
    slug: "okra-pesticide-reduction",
    produce: "Okra",
    produceLatin: "Abelmoschus esculentus",
    produceImage: "/concepts/specimen_okra.webp",
    kind: "pesticide-reduction" as ReportKind,
    kindLabel: "Pesticide Residue Reduction",
    description:
      "256 pesticide parameters screened across both samples. Results show the number and level of detectable residues before and after Estoqi Wash versus normal water washing.",
    testedBy: "Envirocare Labs",
    testingMethod:
      "IS 5402 (Part 1): 2021, IS 5401 (Part 1): 2012, RA 2022, ISO 21528 (Part 2): 2017",
    reportDate: "15 November 2025",
    reportNo: "EST/2025/OKR/P-01",
  } as ReportMeta,
  tiles: [
    { value: "256", label: "Parameters screened" },
    { value: "7",   label: "Detected, Normal Water" },
    { value: "3",   label: "Detected, Estoqi Wash" },
    { value: "246", label: "BLQ in both samples" },
  ],
  hero: [
    { value: "4",      label: "pesticides fully eliminated to below detection", chip: "Completely Removed" },
    { value: "7 → 3",  label: "detectable residues reduced from 7 to 3",         chip: "57% Fewer Detections" },
    { value: "60%",    label: "reduction in Chlorantraniliprole — the highest residue", chip: "0.118 → 0.047 mg/kg" },
  ],
  eliminated: [
    { name: "Azoxystrobin",      kind: "fungicide" },
    { name: "Lambda cyhalothrin", kind: "insecticide" },
    { name: "Bifenthrin",        kind: "insecticide" },
    { name: "Dinotefuran",       kind: "insecticide" },
  ],
  reduced: [
    { name: "Chlorantraniliprole", normal: "0.118 mg/kg", estoqi: "0.047 mg/kg", delta: "60.2% reduction" },
    { name: "Propargite",          normal: "0.027 mg/kg", estoqi: "0.025 mg/kg", delta: "7.4% reduction"  },
    { name: "Copper compounds",    normal: "0.29 mg/kg",  estoqi: "0.27 mg/kg",  delta: "6.9% reduction"  },
  ],
};

/* PESTICIDE — White Rice (3-column table + hero stats) */
export const RICE_PESTICIDE = {
  meta: {
    slug: "white-rice-pesticide-reduction",
    produce: "White Rice",
    produceLatin: "Oryza sativa",
    produceImage: "/concepts/specimen_white_rice.webp",
    kind: "pesticide-reduction" as ReportKind,
    kindLabel: "Pesticide Residue Reduction",
    description:
      "251 parameters screened across three samples — Unwashed, CPU Kitchen Washed, and Estoqi Washed — tested as per FSSR 2011 specification.",
    testedBy: "Envirocare Labs",
    testingMethod: "EL/SOP/520",
    reportDate: "24 December 2025",
    reportNo: "EST/2025/RIC/P-01",
  } as ReportMeta,
  hero: [
    { value: "5",     label: "pesticides eliminated by both washing methods equally", chip: "Fungicides & Neonicotinoid Removed" },
    { value: "+43%",  label: "Copper increase after conventional kitchen wash",        chip: "Likely from copper plumbing" },
    { value: "-44%",  label: "Copper reduction from Estoqi Wash vs unwashed",          chip: "Below unwashed baseline" },
  ],
  columns: ["Normal water", "CPU Wash", "Estoqi Wash"],
  rows: [
    { compound: "Isoprothiolane", family: "Fungicide · rice-specific",            values: ["0.030 mg/kg", "Eliminated", "Eliminated"] },
    { compound: "Tebuconazole",   family: "Fungicide · triazole",                 values: ["0.028 mg/kg", "Eliminated", "Eliminated"] },
    { compound: "Thiamethoxam",   family: "Neonicotinoid · insecticide",          values: ["0.029 mg/kg", "Eliminated", "Eliminated"] },
    { compound: "Azoxystrobin",   family: "Fungicide · strobilurin",              values: ["0.015 mg/kg", "Eliminated", "Eliminated"] },
    { compound: "Tricyclazole",   family: "Fungicide · rice blast",               values: ["0.019 mg/kg", "Eliminated", "Eliminated"] },
    { compound: "Copper compounds", family: "Fungicide · inorganic · EL/SOP/534", values: ["2.95 mg/kg",   "4.21 mg/kg", "1.64 mg/kg"]   },
  ] as ResidueRow[],
  takeaway:
    "Conventional kitchen washing added 43% more copper to rice. Estoqi Wash reduced it by 44%.",
};

/* MICROBIAL — Spinach */
export const SPINACH_MICROBIAL = {
  meta: {
    slug: "spinach-microbial-reduction",
    produce: "Spinach",
    produceLatin: "Spinacia oleracea",
    produceImage: "/concepts/r2_process_water.webp",
    kind: "microbial-reduction" as ReportKind,
    kindLabel: "Microbial Load Reduction",
    description:
      "Microbiological analysis comparing Estoqi Wash against conventional CPU kitchen washing on spinach samples. Lower counts indicate safer, cleaner produce.",
    testedBy: "Envirocare Labs",
    testingMethod:
      "IS 5402 (Part 1): 2021, IS 5401 (Part 1): 2012, RA 2022, ISO 21528 (Part 2): 2017",
    reportDate: "17 December 2025",
    reportNo: "EST/2025/SPI/M-01",
  } as ReportMeta,
  rows: [
    {
      name: "Aerobic Plant Count after",
      kitchen: { display: "2.5 × 10⁵", numeric: 250000, unit: "cfu/g" },
      estoqi:  { display: "3.8 × 10⁴", numeric: 38000,  unit: "cfu/g" },
      chip: "84.8% with Estoqi",
    },
    {
      name: "Coliform Count after",
      kitchen: { display: "1.6 × 10³", numeric: 1600, unit: "cfu/g" },
      estoqi:  { display: "2.3 × 10²", numeric: 230,  unit: "cfu/g" },
      chip: "85.6% with Estoqi",
    },
    {
      name: "Enterobacteriaceae after",
      kitchen: { display: "2.0 × 10³", numeric: 2000, unit: "cfu/g" },
      estoqi:  { display: "2.7 × 10²", numeric: 270,  unit: "cfu/g" },
      chip: "86.5% with Estoqi",
    },
  ],
  hero: [
    { value: "84.8%", label: "fewer total bacteria (Aerobic Plate Count)", chip: "250,000 → 38,000 cfu/g" },
    { value: "85.6%", label: "fewer coliforms detected",                   chip: "1,600 → 230 cfu/g" },
    { value: "86.5%", label: "fewer Enterobacteriaceae",                   chip: "2,000 → 270 cfu/g" },
  ],
  tags: ["Microbial reduction efficiency", "Shelf life and safer consumption"],
};

/* SHELF LIFE — Tomato */
export const TOMATO_SHELF_LIFE = {
  meta: {
    slug: "tomato-shelf-life",
    produce: "Tomato",
    produceLatin: "Solanum lycopersicum",
    produceImage: "/concepts/canon_stilllife.webp",
    kind: "shelf-life" as ReportKind,
    kindLabel: "Longer Shelf life",
    description:
      "A controlled 6-day observation study on tomatoes sourced from a leading quick commerce partner — comparing Estoqi-treated samples against untreated controls across firmness, texture, colour progression, and Brix stability.",
    testedBy: "Envirocare Labs",
    testingMethod: "Indian Standards / AOAC",
    reportDate: "11 November 2025",
    reportNo: "EST/2025/TOM/S-01",
  } as ReportMeta,
  pills: ["12 Sample groups", "3 Ripeness stages", "2 storage conditions"],
  hero: [
    { value: "+3 days", label: "Marketable window extended", body: "Estoqi-treated tomatoes remained sellable up to Day 5–6 vs Day 3 cutoff for controls." },
    { value: "50%",     label: "Better firmness retention", body: "Pulp pressure readings on Day 6 showed 35–50% better retention in Estoqi-treated samples." },
    { value: "Zero",    label: "Additional inputs required", body: "No cold chain upgrades. No packaging changes. No chemical coatings. The Estoqi wash alone, pH 11.5 ionised water, within 3–4 minutes." },
  ],
  observed: {
    summary: "Summary across all 12 sample groups, Days 1–6",
    rows: [
      { parameter: "Skin Cracking",   without: "Moderate–High",     estoqi: "Minimal" },
      { parameter: "Shrivelling",     without: "Visible by Day 3–4", estoqi: "Delayed past Day 5" },
      { parameter: "Colour Ripening", without: "Faster, uneven",     estoqi: "Gradual, uniform" },
      { parameter: "Brix Stability",  without: "Early spike → drop", estoqi: "Controlled, stable" },
    ],
  },
};

/* NUTRITION — Broccoli */
export const BROCCOLI_NUTRITION = {
  meta: {
    slug: "broccoli-nutrition-enrichment",
    produce: "Broccoli",
    produceLatin: "Brassica oleracea",
    produceImage: "/concepts/specimen_broccoli.webp",
    kind: "nutrition-enrichment" as ReportKind,
    kindLabel: "Nutrition Enrichment",
    description:
      "A laboratory analysis was conducted to evaluate the effect of two different washing methods on the Vitamin content of broccoli samples.",
    testedBy: "Envirocare Labs",
    testingMethod: "IS 5838:1970, RA 2020",
    reportDate: "13 October 2025",
    reportNo: "EST/2025/BRO/N-01",
  } as ReportMeta,
  metrics: [
    {
      title: "Vitamin-C",
      subtitle: "Ascorbic Acid",
      chip: "CHANGE DETECTED",
      tone: "positive" as const,
      normal: "16.4 mg/100g",
      estoqi: "32.2 mg/100g",
      headline: "96%",
      headlineNote: "Higher Vitamin C retention with Estoqi Wash.",
      caption: "VITAMIN-C — SIGNIFICANT",
    },
    {
      title: "Vitamin-B9",
      subtitle: "Folate",
      chip: "NO CHANGE",
      tone: "neutral" as const,
      normal: "BLQ",
      estoqi: "BLQ",
      headline: "No diff.",
      headlineNote: "Both samples below limit of quantification (< 0.05 mg/kg). No measurable difference between methods.",
      caption: "VITAMIN B9 — BLQ BOTH",
    },
  ],
  tags: [
    "Freshness retention",
    "Reduced nutrient degradation",
    "Antioxidant stability",
    "Nutrient preservation",
  ],
};

/* NUTRITION — Red Capsicum */
export const RED_CAPSICUM_NUTRITION = {
  meta: {
    slug: "red-capsicum-nutrition-enrichment",
    produce: "Red Capsicum",
    produceLatin: "Capsicum annuum",
    produceImage: "/concepts/specimen_bell_pepper.webp",
    kind: "nutrition-enrichment" as ReportKind,
    kindLabel: "Nutrition Enrichment",
    description:
      "A laboratory analysis evaluating the effect of two washing methods on Vitamin-A and Beta-Carotene content across matched red capsicum samples.",
    testedBy: "Envirocare Labs",
    testingMethod: "AOAC 974.29, 22nd Edition: 2023",
    reportDate: "13 October 2025",
    reportNo: "EST/2025/CAP/N-01",
  } as ReportMeta,
  metric: {
    title: "Vitamin-A & Beta-Carotene",
    normal: "95.8 µg/100g",
    estoqi: "280.7 µg/100g",
    normalRatio: 95.8 / 280.7,
    estoqiRatio: 1,
    caption:
      "At these levels, normal water washing left Beta-Carotene retention significantly lower than the standard quantification threshold, while Estoqi Wash preserved measurable levels nearly 3× above it.",
  },
  hero: [
    { value: "193%", label: "higher Vitamin A & Beta-Carotene retention with Estoqi Wash." },
    { value: "LOQ",  label: "Normal water sample fell below limit of quantification (100 µg/100g)" },
  ],
  tags: ["Beta-Carotene Preservation", "Vitamin-A retention", "Antioxidant stability"],
};

/* ─── Registry ───────────────────────────────────────────── */
export const REPORTS = {
  [TOMATO_PESTICIDE.meta.slug]:        TOMATO_PESTICIDE,
  [OKRA_PESTICIDE.meta.slug]:          OKRA_PESTICIDE,
  [RICE_PESTICIDE.meta.slug]:          RICE_PESTICIDE,
  [SPINACH_MICROBIAL.meta.slug]:       SPINACH_MICROBIAL,
  [TOMATO_SHELF_LIFE.meta.slug]:       TOMATO_SHELF_LIFE,
  [BROCCOLI_NUTRITION.meta.slug]:      BROCCOLI_NUTRITION,
  [RED_CAPSICUM_NUTRITION.meta.slug]:  RED_CAPSICUM_NUTRITION,
};

export const REPORT_INDEX = Object.values(REPORTS).map((r) => r.meta);
export type ReportSlug = keyof typeof REPORTS;
