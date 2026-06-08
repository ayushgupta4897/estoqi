import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · For Commercial Systems (Feb 2026 brief)
   Title: "Cleaner Produce. Defensible food safety."
   Sections:
     1 Banner
     2 Built for (9 segments)
     3 Why Estoqi (4 reasons)
     4 FAQs
     5 End Banner
   Pay-per-kg + Expense estimator sections REMOVED per brief.
   ===================================================================== */

const SEGMENTS = [
  { label: "Commercial Kitchens",  body: "Centralized prep where every batch passes through a single wash point.",      image: "/concepts/biz_cloud_kitchen.webp" },
  { label: "Cloud Kitchens",       body: "High-volume D2C prep stations where consistency drives the customer review.",  image: "/concepts/business_scale.webp" },
  { label: "Quick Commerce",       body: "Last-mile dark stores with high produce turnover and zero spoilage tolerance.", image: "/concepts/r2_process_water.webp" },
  { label: "Restaurants and Hotels", body: "Front-of-house claim, back-of-house consistency.",                            image: "/concepts/ch06_the_return.webp" },
  { label: "Hospitals",            body: "Hospital kitchens with documented food-safety protocols.",                     image: "/concepts/biz_audit_clipboard.webp" },
  { label: "Food Importers",       body: "Import-side wash points to meet domestic MRL compliance.",                     image: "/concepts/signature_hero.webp" },
  { label: "Food Exporters",       body: "MRL-compliant produce for international shipment.",                            image: "/concepts/canon_stilllife.webp" },
  { label: "Food Manufacturers",   body: "Inline pre-processing for packaged food and ready-to-eat lines.",              image: "/concepts/sci_lab_bench.webp" },
  { label: "Retail Stores",        body: "In-store wash for visibly cleaner produce on the shelf, longer.",              image: "/concepts/hydration_moment.webp" },
];

const WHY_CARDS = [
  {
    n: "01",
    title: "Cut spoilage by up to 50%",
    body: "Up to 2× shelf-life extension on fresh produce means fewer write-offs, fewer returns, longer in-store sellability. NABL-tested, directly visible on EBITDA.",
  },
  {
    n: "02",
    title: "Audit-ready food safety",
    body: "Up to 99% pesticide removal and 89% microbial reduction, independently verified. Walk into a food-safety audit with documented, defensible proof.",
  },
  {
    n: "03",
    title: "A BRSR line item that pays for itself",
    body: "Water-only process, no effluent, reduced food waste. Estoqi delivers a documented Scope 3 reduction your sustainability team can put directly into BRSR disclosures.",
  },
  {
    n: "04",
    title: "Zero capital expenditure",
    body: "No upfront machine cost. Estoqi installs the unit, you pay per kilogram processed. Scale up or down with demand. No lock-in beyond the pilot.",
  },
];

const FAQS = [
  {
    q: "How long does installation take?",
    a: "Typically one to two days. Our team handles site assessment, installation, and calibration at your facility.",
  },
  {
    q: "What throughput can the system handle?",
    a: "Commercial units are calibrated for 500 to 5,000 kg per day. We size the unit to your volume.",
  },
  {
    q: "What are the electricity and water source requirements?",
    a: "Standard 3-phase power. Compatible with municipal and borewell water sources. Pre-filtration is included in setup.",
  },
  {
    q: "What does the AMC cover for commercial units?",
    a: "Annual maintenance covers all filters, electrodes, calibration checks, and on-site servicing.",
  },
  {
    q: "What are the exit terms for the pilot?",
    a: "The 90-day pilot has no lock-in. After the pilot, continuation is on a month-to-month pay-per-kg basis.",
  },
];

const ForFoodBusinesses: React.FC = () => {
  useScrollAnimation();

  return (
    <main className="bg-bone text-ink">
      {/* ─── 1 · BANNER ──────────────────────────────────────── */}
      <section className="relative min-h-[60vh] overflow-hidden border-b border-stone">
        <img
          src="/concepts/biz_cloud_kitchen.webp"
          alt="A working commercial kitchen prep area."
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,13,13,0.35) 0%, rgba(13,13,13,0.0) 35%, rgba(13,13,13,0.0) 55%, rgba(13,13,13,0.6) 100%), linear-gradient(90deg, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.0) 50%)",
          }}
        />
        <div className="relative z-10 px-6 lg:px-14 pt-24 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="label-eyebrow text-bone mb-6">
              <span style={{ background: "var(--bone)" }} className="inline-block w-7 h-px" />
              For Commercial Systems
            </div>
            <h1 className="h-display-xl text-bone mb-7 max-w-[20ch]">
              Cleaner Produce. <em>Defensible food safety.</em>
            </h1>
            <p className="font-display text-bone/80 text-[20px] lg:text-[24px] leading-[1.45] max-w-[58ch] font-light mb-8">
              Estoqi installs the technology at your facility and processes
              produce using only water. No capital expenditure. Pay only for
              what we cleanse.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/book-consultation" className="btn-bone">
                Request a Pilot <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2 · BUILT FOR ───────────────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-bone">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">Built for</div>
            <h2 className="h-display-l text-ink mb-6">
              Wherever produce <em>touches the brand.</em>
            </h2>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
            {SEGMENTS.map((s, i) => (
              <li
                key={s.label}
                className={`reveal reveal-stagger-${(i % 4) + 1} bg-paper border border-stone overflow-hidden flex flex-col`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                  <img
                    src={s.image}
                    alt={s.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="label-mono text-ink mb-2">{s.label}</div>
                  <p className="text-graphite text-[13.5px] leading-[1.55]">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── 3 · WHY ESTOQI ──────────────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-paper border-y border-stone">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">Why Estoqi</div>
            <h2 className="h-display-l text-ink mb-6">
              Four reasons the procurement <em>head signs off.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
            {WHY_CARDS.map((c, i) => (
              <article
                key={c.n}
                className={`reveal reveal-stagger-${(i % 4) + 1} border-t border-ink pt-5`}
              >
                <div className="flex items-baseline gap-5 mb-3">
                  <span
                    className="font-display text-vermillion text-[36px] leading-none"
                    style={{ fontVariationSettings: "'opsz' 64" }}
                  >
                    {c.n}
                  </span>
                  <h3 className="font-display text-ink text-[22px] leading-[1.2] flex-1">{c.title}</h3>
                </div>
                <p className="text-graphite text-[15px] leading-[1.6] max-w-[52ch]">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4 · FAQ ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-bone">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 reveal">
            <div className="label-eyebrow mb-6">B2B questions</div>
            <h2 className="h-display-l text-ink">
              Questions about <em>commercial systems.</em>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ─── 5 · END BANNER ─────────────────────────────────── */}
      <section className="bg-ink text-bone py-20 lg:py-24 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto text-center reveal">
          <span className="rule-vermillion mx-auto mb-8 block" />
          <h2 className="h-display-l text-bone mb-6 max-w-[20ch] mx-auto">
            Ready to pilot <em>Estoqi?</em>
          </h2>
          <p className="text-bone/65 text-[16.5px] leading-[1.6] mb-10 max-w-[56ch] mx-auto font-light">
            Run a 90-day pilot at your facility. We install, you process, we
            measure together.
          </p>
          <Link to="/book-consultation" className="btn-bone">
            Talk to our B2B team <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </main>
  );
};

interface FAQItemProps {
  q: string;
  a: string;
}
const FAQItem: React.FC<FAQItemProps> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <article className={`bg-bone border transition-colors ${open ? "border-ink" : "border-stone"}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-ink text-[17px] md:text-[19px] leading-[1.3]">{q}</span>
        <span className="text-graphite" aria-hidden="true">
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6 text-graphite text-[15px] leading-[1.6] max-w-[64ch]">{a}</div>
      )}
    </article>
  );
};

export default ForFoodBusinesses;
