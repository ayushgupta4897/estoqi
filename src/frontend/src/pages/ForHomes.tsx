import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import VideoPlaceholder from "../components/VideoPlaceholder";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · For Homes (Feb 2026 brief)
   Section order:
     1 Banner
     2 Machine block (image + 3-4 lines)
     3 Choose Your Estoqi (3 plans)
     4 Virtual demo video
     5 Installation (4 steps, condensed)
     6 Testimonials
     7 FAQ
     8 End Banner
   ===================================================================== */

interface Plan {
  eyebrow: string;
  name: string;
  description: string;
  price: string;
  amc: string;
  features: string[];
  featured?: boolean;
}
const PLANS: Plan[] = [
  {
    eyebrow: "Drinking only",
    name: "Estoqi Aqua",
    description:
      "pH 9.5 hydrogen-rich drinking water at every tap. For families who want better water at the source.",
    price: "₹49,999",
    amc: "+ ₹4,500/yr AMC · ₹99/mo consumables",
    features: [
      "pH 9.5 drinking stream",
      "1,200 ppb dissolved hydrogen",
      "At-counter install",
      "12-month warranty",
    ],
  },
  {
    eyebrow: "Pesticide removal only",
    name: "Estoqi Clean",
    description:
      "pH 11.5 produce wash at the kitchen sink. Designed for every fruit, vegetable, and grain.",
    price: "₹49,999",
    amc: "+ ₹4,500/yr AMC · ₹99/mo consumables",
    features: [
      "pH 11.5 wash stream",
      "Up to 99% pesticide reduction",
      "At-counter install",
      "12-month warranty",
    ],
  },
  {
    eyebrow: "Both streams · most chosen",
    name: "Estoqi Dual",
    description:
      "Both outputs from a single counter-side unit. The full Estoqi experience, every meal, every day.",
    price: "₹89,999",
    amc: "+ ₹4,500/yr AMC · ₹99/mo consumables",
    features: [
      "pH 9.5 drinking + pH 11.5 wash",
      "Two dedicated outlets",
      "At-counter install",
      "12-month warranty",
    ],
    featured: true,
  },
];

const INSTALL_STEPS = [
  {
    n: "01",
    title: "Site assessment",
    body: "A certified Estoqi technician visits your home to assess the kitchen, plumbing, and water source.",
  },
  {
    n: "02",
    title: "Installation",
    body: "Mounted at your kitchen counter, connected to the existing water line with food-grade tubing. 60 to 90 minutes.",
  },
  {
    n: "03",
    title: "Output setup",
    body: "Dedicated produce-wash tap, drinking-water outlet, or both, configured for your kitchen.",
  },
  {
    n: "04",
    title: "Calibration",
    body: "pH, ORP, and dissolved hydrogen verified with precision instruments before handover.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We have been using Estoqi for six months. The difference in how our vegetables look after washing is remarkable, and my family actually enjoys drinking water again.",
    name: "Priya S.",
    location: "Bengaluru",
  },
  {
    quote:
      "I was sceptical about ionized water, but the NABL-certified test results convinced me. Installation was seamless, and the team was professional throughout.",
    name: "Rahul M.",
    location: "Mumbai",
  },
  {
    quote:
      "The dual-stream system is elegant in its simplicity. One machine, two purposes. It fits at our counter and requires almost no maintenance.",
    name: "Ananya K.",
    location: "Hyderabad",
  },
];

const FAQS = [
  {
    q: "How long does installation take?",
    a: "A standard Estoqi installation takes 60 to 90 minutes. Our certified technicians handle everything from fitting to calibration, leaving your kitchen exactly as they found it.",
  },
  {
    q: "Is Estoqi compatible with my water TDS levels?",
    a: "Estoqi is engineered to work across a wide range of TDS levels common in Indian municipal and borewell water. Our team conducts a site assessment before installation to confirm compatibility.",
  },
  {
    q: "What is the warranty on the system?",
    a: "Estoqi systems come with a standard one-year warranty covering parts and service. Extended coverage is available through our AMC plans.",
  },
  {
    q: "What happens if I move homes?",
    a: "Our team can uninstall and reinstall the system at your new address. Relocation assistance is included in the Dual plan and available as a service add-on for the others.",
  },
  {
    q: "How much electricity does the system consume?",
    a: "Estoqi operates on a low-power cycle, drawing current only during active ionization. Monthly impact on your electricity bill is negligible.",
  },
];

const ForHomes: React.FC = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  useScrollAnimation();

  return (
    <main className="bg-bone text-ink">
      {/* ─── 1 · BANNER ──────────────────────────────────────── */}
      <section className="relative min-h-[60vh] overflow-hidden border-b border-stone">
        <img
          src="/concepts/home_morning_kitchen.webp"
          alt="Soft morning light in an ordinary Indian kitchen."
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,40,89,0.35) 0%, rgba(2,40,89,0.0) 35%, rgba(2,40,89,0.0) 55%, rgba(2,40,89,0.6) 100%), linear-gradient(90deg, rgba(2,40,89,0.55) 0%, rgba(2,40,89,0.0) 50%)",
          }}
        />
        <div className="relative z-10 px-6 lg:px-14 pt-24 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="label-eyebrow text-bone mb-6">
              <span style={{ background: "var(--bone)" }} className="inline-block w-7 h-px" />
              For Homes
            </div>
            <h1 className="h-display-xl text-bone mb-7 max-w-[16ch]">
              Your home. <em>Elevated.</em>
            </h1>
            <p className="font-display text-bone/80 text-[20px] lg:text-[24px] leading-[1.45] max-w-[58ch] font-light mb-8">
              Estoqi installs at your kitchen counter. Two outlets, two
              streams. One for washing your family's food, one for drinking.
              Used by every family member, every meal.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/book-consultation" className="btn-bone">
                Request a Demo <ArrowRight size={13} />
              </Link>
              <a href="#plans" className="btn-ghost text-bone">
                See plans <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2 · MACHINE BLOCK ───────────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-bone">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 reveal">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <img
                src="/concepts/ch04_the_water.webp"
                alt="The Estoqi countertop machine, photographed against soft daylight."
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 reveal reveal-stagger-2">
            <div className="label-eyebrow mb-6">The machine</div>
            <h2 className="h-display-l text-ink mb-6">
              Countertop sized. <em>Lab-grade inside.</em>
            </h2>
            <p className="text-graphite text-[16.5px] leading-[1.65] mb-4 max-w-[48ch]">
              Surgical-grade titanium electrodes, food-grade tubing, a single
              compact chamber. Sized to fit at your kitchen counter without
              taking it over.
            </p>
            <p className="text-graphite text-[16.5px] leading-[1.65] mb-4 max-w-[48ch]">
              One unit produces both streams in parallel. There are no
              consumable filters in the water path, only annual servicing.
            </p>
            <p className="text-graphite text-[16.5px] leading-[1.65] max-w-[48ch]">
              You turn one tap and you get drinking water. You turn the other
              and you get the wash.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 3 · PLANS ───────────────────────────────────────── */}
      <section id="plans" className="py-24 lg:py-32 px-6 lg:px-14 bg-paper border-y border-stone">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">Choose your Estoqi</div>
            <h2 className="h-display-l text-ink mb-6">
              Three plans. <em>One counter-side unit.</em>
            </h2>
            <p className="text-graphite text-[17px] leading-[1.6]">
              All plans use the same surgical-grade titanium chamber. The
              difference is what outputs you connect.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
            {PLANS.map((p, i) => (
              <PlanCard key={p.name} plan={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4 · VIRTUAL DEMO ────────────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-14 bg-bone">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="label-eyebrow mb-6">Virtual demo</div>
            <h2 className="h-display-l text-ink mb-6">
              See it before <em>you install it.</em>
            </h2>
            <p className="text-graphite text-[17px] leading-[1.6] mb-8">
              A guided ninety-second walkthrough of an Estoqi home install,
              from site assessment to first wash. Watch it once and decide.
            </p>
            <button type="button" onClick={() => setDemoOpen(true)} className="btn-ink">
              Watch the demo <ArrowRight size={13} />
            </button>
          </div>
          <div className="lg:col-span-7 reveal reveal-stagger-2">
            <VideoPlaceholder
              label="Estoqi · Home install walkthrough"
              overlayText="90 seconds"
              onClick={() => setDemoOpen(true)}
              className="rounded-sm"
            />
          </div>
        </div>
      </section>

      {/* ─── 5 · INSTALLATION ───────────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-paper border-y border-stone">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-[640px] reveal">
            <div className="label-eyebrow mb-6">Installation</div>
            <h2 className="h-display-l text-ink mb-6">
              Simple. <em>Seamless.</em>
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {INSTALL_STEPS.map((s, i) => (
              <li
                key={s.n}
                className={`reveal reveal-stagger-${(i % 4) + 1} border-t border-ink pt-5`}
              >
                <span
                  className="font-display text-vermillion text-[32px] leading-none block mb-3"
                  style={{ fontVariationSettings: "'opsz' 48" }}
                >
                  {s.n}
                </span>
                <h3 className="font-display text-ink text-[19px] mb-2">{s.title}</h3>
                <p className="text-graphite text-[14px] leading-[1.6]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 6 · TESTIMONIALS ───────────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-bone">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">Families using Estoqi</div>
            <h2 className="h-display-l text-ink">
              The kitchen, <em>recalibrated.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                className={`reveal reveal-stagger-${(i % 4) + 1}`}
              >
                <blockquote className="font-display text-ink text-[20px] leading-[1.4] mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-stone-soft pt-4">
                  <div className="label-mono text-ink">{t.name}</div>
                  <div className="font-mono text-[10.5px] text-graphite mt-1">{t.location}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7 · FAQ ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-paper border-y border-stone">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 reveal">
            <div className="label-eyebrow mb-6">Common questions</div>
            <h2 className="h-display-l text-ink">
              Questions about <em>Estoqi.</em>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ─── 8 · END BANNER ─────────────────────────────────── */}
      <section className="bg-ink text-bone py-20 lg:py-24 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto text-center reveal">
          <span className="rule-vermillion mx-auto mb-8 block" />
          <h2 className="h-display-l text-bone mb-6 max-w-[20ch] mx-auto">
            Ready to transform <em>your home?</em>
          </h2>
          <p className="text-bone/65 text-[16.5px] leading-[1.6] mb-10 max-w-[56ch] mx-auto font-light">
            Talk to an Estoqi specialist about your kitchen. Site assessment is free.
          </p>
          <Link to="/book-consultation" className="btn-bone">
            Book a consultation <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {demoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-6"
          onClick={() => setDemoOpen(false)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-bone label-mono"
            onClick={() => setDemoOpen(false)}
          >
            Close ×
          </button>
          <div className="max-w-4xl w-full bg-paper p-12 text-center">
            <p className="label-mono text-graphite mb-4">Video forthcoming</p>
            <h3 className="font-display text-ink text-[28px] mb-3">
              The home install walkthrough is in production.
            </h3>
            <p className="text-graphite text-[15px]">
              Leave us your number on the consultation form and we will send
              the walkthrough as soon as it ships.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

interface PlanCardProps {
  plan: Plan;
  index: number;
}
const PlanCard: React.FC<PlanCardProps> = ({ plan, index }) => (
  <article
    className={`reveal reveal-stagger-${(index % 4) + 1} border p-8 lg:p-10 flex flex-col ${
      plan.featured ? "border-ink bg-ink text-bone" : "border-stone bg-bone text-ink"
    }`}
  >
    <div className={`label-mono mb-3 ${plan.featured ? "text-bone/65" : "text-vermillion"}`}>
      {plan.eyebrow}
    </div>
    <h3
      className={`font-display text-[28px] lg:text-[32px] leading-[1.1] mb-4 ${plan.featured ? "text-bone" : "text-ink"}`}
      style={{ fontVariationSettings: "'opsz' 48" }}
    >
      {plan.name}
    </h3>
    <p className={`text-[14.5px] leading-[1.6] mb-7 ${plan.featured ? "text-bone/75" : "text-graphite"}`}>
      {plan.description}
    </p>
    <div
      className={`font-display text-[44px] leading-none mb-1 ${plan.featured ? "text-bone" : "text-ink"}`}
      style={{ fontVariationSettings: "'opsz' 72" }}
    >
      {plan.price}
    </div>
    <div className={`font-mono text-[10.5px] mb-7 ${plan.featured ? "text-bone/60" : "text-graphite"}`}>
      {plan.amc}
    </div>
    <ul className={`space-y-2 mb-8 ${plan.featured ? "text-bone/80" : "text-graphite"}`}>
      {plan.features.map((f) => (
        <li key={f} className="text-[14px] leading-[1.5] flex gap-2 items-baseline">
          <span className={`font-mono text-[10px] mt-0.5 ${plan.featured ? "text-bone/55" : "text-vermillion"}`}>
            ●
          </span>
          {f}
        </li>
      ))}
    </ul>
    <Link
      to="/book-consultation"
      className={`mt-auto ${plan.featured ? "btn-bone" : "btn-ink"}`}
    >
      Choose this plan <ArrowRight size={13} />
    </Link>
  </article>
);

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

export default ForHomes;
