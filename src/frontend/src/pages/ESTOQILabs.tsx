import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Lock } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import EmailGateModal from "../components/EmailGateModal";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";
import { REPORTS } from "../reports/data";

/* =====================================================================
   ESTOQI · Labs (Feb 2026 brand brief, 5 segments)
     1 Pesticide Reduction Stats (60+ produce types tested)
     2 Beyond Pesticides intro
     3 The Reports (email-gated, 4 filterable categories)
     4 Case Studies (shelf-life, nutrient enrichment, microbial reduction)
     5 Comparative Studies (visible summary, detailed report gated)
   ===================================================================== */

type Category =
  | "pesticide"
  | "shelf-life"
  | "nutrient"
  | "microbial";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "pesticide",  label: "Pesticide reduction" },
  { id: "shelf-life", label: "Shelf-life study" },
  { id: "nutrient",   label: "Nutrient enrichment" },
  { id: "microbial",  label: "Microbial load reduction" },
];

interface Specimen {
  slug: string;
  name: string;
  scientific: string;
  image: string;
  inCategories: Category[];
  /* When a real Envirocare report exists for this specimen+category combo,
     reportSlug points to the entry in /reports/data.ts. The card then
     becomes a "View Report" CTA after email gate. Specimens without a
     reportSlug for a category still appear in the grid but the gate
     simply emails the (forthcoming) report once it lands. */
  reports?: Partial<Record<Category, string>>;
}

const SPECIMENS: Specimen[] = [
  { slug: "tomato",      name: "Tomato",       scientific: "Solanum lycopersicum",  image: "/concepts/canon_stilllife.webp",  inCategories: ["pesticide", "shelf-life", "nutrient", "microbial"],
    reports: { pesticide: "tomato-pesticide-reduction", "shelf-life": "tomato-shelf-life" } },
  { slug: "okra",        name: "Okra",         scientific: "Abelmoschus esculentus", image: "/concepts/r2_process_water.webp", inCategories: ["pesticide", "shelf-life", "microbial"],
    reports: { pesticide: "okra-pesticide-reduction" } },
  { slug: "white-rice",  name: "White Rice",   scientific: "Oryza sativa",           image: "/concepts/canon_stilllife.webp",  inCategories: ["pesticide"],
    reports: { pesticide: "white-rice-pesticide-reduction" } },
  { slug: "spinach",     name: "Spinach",      scientific: "Spinacia oleracea",      image: "/concepts/r2_process_water.webp", inCategories: ["microbial", "shelf-life", "nutrient"],
    reports: { microbial: "spinach-microbial-reduction" } },
  { slug: "broccoli",    name: "Broccoli",     scientific: "Brassica oleracea",      image: "/concepts/r2_process_water.webp", inCategories: ["nutrient", "pesticide"],
    reports: { nutrient: "broccoli-nutrition-enrichment" } },
  { slug: "red-capsicum", name: "Red Capsicum", scientific: "Capsicum annuum",       image: "/concepts/canon_stilllife.webp",  inCategories: ["nutrient", "shelf-life", "microbial"],
    reports: { nutrient: "red-capsicum-nutrition-enrichment" } },
  { slug: "grapes",      name: "Grapes",       scientific: "Vitis vinifera",         image: "/concepts/signature_hero.webp",   inCategories: ["pesticide", "nutrient", "microbial"] },
  { slug: "apple",       name: "Apple",        scientific: "Malus domestica",        image: "/concepts/canon_stilllife.webp",  inCategories: ["pesticide"] },
  { slug: "coriander",   name: "Coriander",    scientific: "Coriandrum sativum",     image: "/concepts/ch06_the_return.webp",  inCategories: ["pesticide", "nutrient", "microbial"] },
  { slug: "cucumber",    name: "Cucumber",     scientific: "Cucumis sativus",        image: "/concepts/r2_process_water.webp", inCategories: ["pesticide", "shelf-life", "nutrient", "microbial"] },
  { slug: "brinjal",     name: "Brinjal",      scientific: "Solanum melongena",      image: "/concepts/canon_stilllife.webp",  inCategories: ["pesticide", "shelf-life"] },
  { slug: "mango",       name: "Mango",        scientific: "Mangifera indica",       image: "/concepts/ch06_the_return.webp",  inCategories: ["pesticide", "shelf-life", "nutrient", "microbial"] },
  { slug: "fenugreek",   name: "Fenugreek",    scientific: "Trigonella foenum",      image: "/concepts/ch06_the_return.webp",  inCategories: ["shelf-life", "nutrient"] },
  { slug: "banana",      name: "Banana",       scientific: "Musa acuminata",         image: "/concepts/canon_stilllife.webp",  inCategories: ["shelf-life", "nutrient", "microbial"] },
];

const CASE_STUDIES = [
  {
    n: "01",
    title: "Shelf-life · tomato",
    body: "Tomatoes washed with Estoqi pH 11.5 retained marketable firmness for 9.4 days at room temperature, versus 4.1 days for the tap-water control. A 2.3× extension across the test batch, observable to the eye.",
    metric: "2.3×",
    metricLabel: "shelf-life extension",
    image: "/concepts/canon_stilllife.webp",
  },
  {
    n: "02",
    title: "Microbial reduction · lettuce",
    body: "Lettuce inoculated with E. coli at 10⁶ CFU/g showed an 89% reduction in viable counts after a single five-minute Estoqi wash. Saline-water control showed less than 4% reduction across the same window.",
    metric: "89%",
    metricLabel: "E. coli reduction",
    image: "/concepts/r2_process_water.webp",
  },
  {
    n: "03",
    title: "Nutrient retention · spinach",
    body: "Spinach washed with Estoqi water retained 96% of measured vitamin C and 98% of folate, comparable to a brief tap rinse, with no oxidative loss attributable to the ionization process.",
    metric: "96%",
    metricLabel: "vitamin C retained",
    image: "/concepts/ch06_the_return.webp",
  },
];

const COMPARISON = [
  { method: "Plain water rinse",       value: 28, result: "Insufficient" },
  { method: "Vinegar soak (5%)",       value: 61, result: "Partial" },
  { method: "Commercial produce wash", value: 74, result: "Good" },
  { method: "Estoqi pH 11.5",          value: 94, result: "Best" },
];

const ESTOQILabs: React.FC = () => {
  useScrollAnimation();
  const [activeCat, setActiveCat] = useState<Category>("pesticide");
  const [gate, setGate] = useState<{
    slug: string;
    title: string;
    category: string;
    viewPath?: string;
  } | null>(null);

  const visibleSpecimens = useMemo(
    () => SPECIMENS.filter((s) => s.inCategories.includes(activeCat)),
    [activeCat],
  );

  const openGateForSpecimen = (s: Specimen) => {
    const categoryLabel = CATEGORIES.find((c) => c.id === activeCat)?.label ?? "";
    const reportSlug = s.reports?.[activeCat];
    const meta = reportSlug ? REPORTS[reportSlug]?.meta : undefined;
    setGate({
      slug: meta?.slug ?? `${s.slug}-${activeCat}`,
      title: meta ? `${meta.produce} · ${meta.kindLabel}` : `${s.name} · ${categoryLabel}`,
      category: categoryLabel,
      viewPath: reportSlug ? `/labs/reports/${reportSlug}` : undefined,
    });
  };

  return (
    <main className="bg-bone text-ink">
      {/* ─── 1 · STATS BANNER ─────────────────────────────────── */}
      <section className="relative min-h-[50vh] overflow-hidden border-b border-stone">
        <img
          src="/concepts/labs_lab_interior.webp"
          alt="A working chemistry laboratory interior."
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,40,89,0.4) 0%, rgba(2,40,89,0.0) 40%, rgba(2,40,89,0.0) 60%, rgba(2,40,89,0.7) 100%), linear-gradient(90deg, rgba(2,40,89,0.55) 0%, rgba(2,40,89,0.0) 50%)",
          }}
        />
        <div className="relative z-10 px-6 lg:px-14 pt-24 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="label-eyebrow text-bone mb-7">
              <span style={{ background: "var(--bone)" }} className="inline-block w-7 h-px" />
              Estoqi Labs
            </div>
            <h1 className="h-display-xl text-bone mb-7 max-w-[18ch]">
              Pesticide reduction, <em>specimen by specimen.</em>
            </h1>
            <div className="grid grid-cols-2 gap-x-10 max-w-[640px] mt-10 pt-10 border-t border-bone/20">
              <div>
                <div
                  className="font-display text-bone text-[56px] lg:text-[72px] leading-none"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                >
                  <em>60+</em>
                </div>
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-bone/65 mt-2">
                  Produce types tested
                </div>
              </div>
              <div>
                <div
                  className="font-display text-bone text-[56px] lg:text-[72px] leading-none"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                >
                  <em>99%</em>
                </div>
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-bone/65 mt-2">
                  Surface pesticide residue reduction
                </div>
              </div>
            </div>
            <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-bone/70 mt-10">
              Click any produce below to view its lab report.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2 · BEYOND PESTICIDES INTRO ──────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-bone border-b border-stone-soft">
        <div className="max-w-4xl mx-auto reveal">
          <div className="label-eyebrow mb-6">Beyond pesticides</div>
          <h2 className="h-display-l text-ink max-w-[26ch]">
            Pesticide removal is what Estoqi set out to prove. <em>What the labs found beyond that was unexpected.</em>
          </h2>
        </div>
      </section>

      {/* ─── 3 · THE REPORTS (email-gated) ────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-bone">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">The reports</div>
            <h2 className="h-display-l text-ink mb-4 max-w-[22ch]">
              Organized by test, <em>then by produce.</em>
            </h2>
            <p className="text-graphite text-[16.5px] leading-[1.6]">
              Filter by test type. Each card emails you the full lab report
              after a single email capture.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCat(c.id)}
                className={`px-5 py-2 font-mono text-[10.5px] tracking-[0.16em] uppercase border transition-colors ${
                  activeCat === c.id
                    ? "bg-ink text-bone border-ink"
                    : "border-stone text-graphite hover:border-ink hover:text-ink"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Specimen grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {visibleSpecimens.map((s) => {
              const hasReport = Boolean(s.reports?.[activeCat]);
              return (
                <button
                  key={s.slug + activeCat}
                  type="button"
                  onClick={() => openGateForSpecimen(s)}
                  className="group relative bg-paper border border-stone hover:border-ink overflow-hidden text-left transition-colors"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(2,40,89,0.0) 0%, rgba(2,40,89,0.0) 45%, rgba(2,40,89,0.78) 100%)",
                      }}
                    />
                    <div
                      className={`absolute top-3 right-3 inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.16em] uppercase px-2 py-1 ${
                        hasReport
                          ? "text-bone bg-vermillion"
                          : "text-bone/85 bg-ink/55"
                      }`}
                    >
                      {hasReport ? <FileText size={10} /> : <Lock size={10} />}
                      {hasReport ? "Report ready" : "Gated"}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="label-mono text-vermillion mb-1">{CATEGORIES.find((c) => c.id === activeCat)?.label}</div>
                    <h3 className="font-display text-ink text-[24px] leading-none">{s.name}</h3>
                    <p className="font-italic-display text-graphite text-[13px] mt-1">{s.scientific}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] uppercase text-vermillion group-hover:gap-3 transition-all">
                      {hasReport ? "Unlock & view report" : "Notify me when ready"} <ArrowRight size={13} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4 · CASE STUDIES ─────────────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-paper border-y border-stone">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">Case studies</div>
            <h2 className="h-display-l text-ink mb-4 max-w-[22ch]">
              Three findings, <em>told as stories.</em>
            </h2>
            <p className="text-graphite text-[16.5px] leading-[1.6]">
              Short visual takes on three of our most-cited results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {CASE_STUDIES.map((s, i) => (
              <article
                key={s.n}
                className={`reveal reveal-stagger-${(i % 4) + 1} bg-bone border border-stone overflow-hidden flex flex-col`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-7 lg:p-8 flex flex-col flex-1">
                  <span
                    className="font-display text-vermillion text-[28px] leading-none block mb-3"
                    style={{ fontVariationSettings: "'opsz' 48" }}
                  >
                    {s.n}
                  </span>
                  <h3 className="font-display text-ink text-[22px] mb-3">{s.title}</h3>
                  <p className="text-graphite text-[14.5px] leading-[1.6] mb-7 flex-1">{s.body}</p>
                  <div className="border-t border-stone-soft pt-4">
                    <div
                      className="font-display text-ink text-[42px] leading-none mb-1"
                      style={{ fontVariationSettings: "'opsz' 72" }}
                    >
                      {s.metric}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-graphite">
                      {s.metricLabel}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5 · COMPARATIVE STUDIES ──────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-bone">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">Comparative studies</div>
            <h2 className="h-display-l text-ink mb-4 max-w-[22ch]">
              Estoqi vs. <em>the alternatives.</em>
            </h2>
            <p className="text-graphite text-[16.5px] leading-[1.6]">
              Pesticide residue reduction across four common washing methods,
              tested on the same batch. Detailed methodology is email-gated.
            </p>
          </div>

          <div className="bg-paper border border-stone p-6 lg:p-10 reveal">
            {COMPARISON.map((row) => {
              const best = row.method.toLowerCase().startsWith("estoqi");
              return (
                <div
                  key={row.method}
                  className="grid grid-cols-[1fr_64px] sm:grid-cols-[200px_1fr_64px] items-center gap-4 py-4 border-b border-stone-soft last:border-b-0"
                >
                  <div className={`text-[14px] sm:text-[15px] ${best ? "font-semibold text-ink" : "text-graphite"}`}>
                    {row.method}
                  </div>
                  <div className="hidden sm:block">
                    <div className="h-2 w-full bg-stone-soft rounded-sm overflow-hidden">
                      <div
                        className={`h-full ${best ? "bg-ink" : "bg-graphite"}`}
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                  </div>
                  <div className={`text-right font-mono text-[14px] tabular-nums ${best ? "text-ink font-semibold" : "text-graphite"}`}>
                    {row.value}%
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 reveal">
            <button
              type="button"
              onClick={() =>
                setGate({
                  slug: "comparative-summary",
                  title: "Comparative study, full methodology",
                  category: "Comparative",
                })
              }
              className="btn-ink"
            >
              Get the full comparative report <ArrowRight size={13} />
            </button>
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-graphite mt-3">
              Methodology, statistical analysis, per-compound breakdown · email-gated
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────── */}
      <section className="bg-ink text-bone py-20 lg:py-24 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto text-center reveal">
          <span className="rule-vermillion mx-auto mb-8 block" />
          <h2 className="h-display-l text-bone mb-6 max-w-[22ch] mx-auto">
            Want a custom test <em>on your produce?</em>
          </h2>
          <p className="text-bone/65 text-[16px] leading-[1.6] mb-10 max-w-[56ch] mx-auto font-light">
            Talk to us. We commission targeted NABL tests for procurement
            heads, sustainability teams, and food exporters.
          </p>
          <Link to="/book-consultation" className="btn-bone">
            Request a custom test <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <EmailGateModal
        open={gate !== null}
        onClose={() => setGate(null)}
        reportSlug={gate?.slug ?? ""}
        reportTitle={gate?.title ?? ""}
        category={gate?.category}
        viewPath={gate?.viewPath}
      />
    </main>
  );
};

export default ESTOQILabs;
