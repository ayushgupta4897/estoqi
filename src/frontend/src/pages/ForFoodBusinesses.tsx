import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  Droplets,
  Hotel,
  Scale,
  ShoppingBag,
  TrendingDown,
  UtensilsCrossed,
  Warehouse,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

const payPerKgSteps = [
  {
    icon: <Scale size={28} />,
    title: "Measure Your Volume",
    description:
      "Track daily produce throughput in kg. ESTOQI meters water usage per kg of produce processed.",
    color: "text-estoqi-green",
    bg: "bg-estoqi-green/10",
  },
  {
    icon: <Droplets size={28} />,
    title: "Ionize at Scale",
    description:
      "Industrial ESTOQI units produce continuous 11.5 pH streams calibrated for high-volume produce cleansing.",
    color: "text-estoqi-blue",
    bg: "bg-estoqi-blue/10",
  },
  {
    icon: <TrendingDown size={28} />,
    title: "Pay Per Kg Processed",
    description:
      "No upfront capital expenditure. Pay only for what you use - a transparent, usage-based model aligned with your operations.",
    color: "text-estoqi-green",
    bg: "bg-estoqi-green/10",
  },
];

const whyEstoqiCards = [
  {
    title: "Cut Spoilage by Up to 50%",
    body: "2× shelf life on fresh produce means fewer write-offs, fewer returns, longer in-store sellability. NABL-tested. Directly hits EBITDA.",
    accent: "text-estoqi-green",
    borderAccent: "border-estoqi-green/30",
  },
  {
    title: "Audit-Ready Food Safety",
    body: "Up to 99% pesticide removal, 89% microbial reduction - independently verified. Walk into a food safety audit with documented, defensible proof.",
    accent: "text-estoqi-blue",
    borderAccent: "border-estoqi-blue/30",
  },
  {
    title: "A BRSR line item that pays for itself",
    body: "Water-only process. No effluent. Reduced food waste. Estoqi delivers a documented Scope 3 reduction your sustainability team can put directly into BRSR disclosures.",
    accent: "text-estoqi-green",
    borderAccent: "border-estoqi-green/30",
  },
  {
    title: "Zero Capital Expenditure",
    body: "No upfront machine cost. Estoqi installs the unit, you pay per kg of produce processed. Scale up or down with your demand.",
    accent: "text-estoqi-blue",
    borderAccent: "border-estoqi-blue/30",
  },
];

const faqItems = [
  {
    question: "How long does installation take?",
    answer:
      "Typically 1–2 days. Our team handles site assessment, installation, and calibration at your facility.",
  },
  {
    question: "What throughput can the system handle?",
    answer:
      "Commercial units are calibrated for 500–5,000 kg/day. We size the unit to your volume.",
  },
  {
    question: "What are the electricity and water source requirements?",
    answer:
      "Standard 3-phase power. Compatible with municipal and borewell water sources - pre-filtration included in setup.",
  },
  {
    question: "What does the AMC cover for commercial units?",
    answer:
      "Annual maintenance covers all filters, electrodes, calibration checks, and on-site servicing - included in the commercial plan.",
  },
  {
    question: "What are the exit terms for the pilot?",
    answer:
      "The 90-day pilot has no lock-in. After the pilot, continuation is on a month-to-month pay-per-kg basis.",
  },
];

const ForFoodBusinesses: React.FC = () => {
  const [volumeKg, setVolumeKg] = useState<string>("500");
  const [period, setPeriod] = useState<"day" | "month">("day");

  useScrollAnimation();

  const volume = Number.parseFloat(volumeKg) || 0;
  const dailyVolume = period === "day" ? volume : volume / 30;
  const monthlyVolume = period === "month" ? volume : volume * 30;
  const waterUsageLiters = dailyVolume * 2.5;
  const spoilageSaved = monthlyVolume * 0.09 * 40;
  const cleansingCapacity = dailyVolume;

  return (
    <main className="bg-estoqi-off-white">
      {/* Solutions Sub-Navigation */}
      <div className="sticky top-16 z-40 bg-estoqi-dark border-b border-white/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-1 py-2">
            <Link
              to="/for-homes"
              data-ocid="solutions.subnav.for_homes_link"
              className="px-5 py-2 rounded-sm label-caps text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              For Homes
            </Link>
            <Link
              to="/for-food-businesses"
              data-ocid="solutions.subnav.for_businesses_link"
              className="px-5 py-2 rounded-sm label-caps text-sm font-semibold bg-white text-estoqi-dark transition-all"
            >
              For Commercial Systems
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.15_0.04_230)] to-estoqi-dark">
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
          <p className="label-caps text-estoqi-blue mb-6 animate-slide-up">
            For Commercial Systems
          </p>
          <h1
            className="heading-display text-white text-5xl md:text-7xl mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
              Cleaner produce.
            </span>
            <br />
            Lower spoilage.
            <br />
            Defensible food safety.
          </h1>
          <p
            className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Estoqi installs the technology at your facility and processes the
            produce - using only water. No capital expenditure. Pay only for
            what you cleanse. Built for cold chains, cloud kitchens, quick
            commerce, institutional catering, and any food business where what
            touches the produce defines the brand.
          </p>
          <Link
            to="/book-consultation"
            data-ocid="commercial.hero.primary_button"
            className="btn-primary-estoqi animate-slide-up"
            style={{
              animationDelay: "0.3s",
              background: "oklch(0.55 0.12 230)",
              borderColor: "oklch(0.55 0.12 230)",
            }}
          >
            Request A Pilot <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Why ESTOQI */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-blue mb-4">Why ESTOQI</p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              Built for the food businesses
              <br />
              that can't afford to compromise.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyEstoqiCards.map((card, i) => (
              <div
                key={card.title}
                data-ocid={`commercial.why.item.${i + 1}`}
                className={`fade-up stagger-${i + 1} glass rounded-sm p-8 border ${card.borderAccent} bg-white/90 backdrop-blur-lg`}
              >
                <div
                  className={`w-8 h-0.5 ${card.accent.replace("text-", "bg-")} mb-5`}
                />
                <h3 className={`font-semibold text-xl mb-3 ${card.accent}`}>
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pay Per Kg */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-blue mb-4">Business Model</p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              Pay{" "}
              <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                per kg.
              </span>
              <br />
              Scale without limits.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {payPerKgSteps.map((step, i) => (
              <div
                key={step.title}
                className={`fade-up stagger-${i + 1} text-center`}
              >
                <div
                  className={`w-20 h-20 rounded-full ${step.bg} flex items-center justify-center mx-auto mb-6 ${step.color}`}
                >
                  {step.icon}
                </div>
                <h3 className="font-semibold text-foreground text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Flow diagram */}
          <div className="fade-up stagger-4 bg-estoqi-off-white rounded-sm p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Step 1 - Produce Arrives */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white border border-estoqi-green/20 flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <span className="text-2xl">🥬</span>
                </div>
                <p className="text-sm font-medium text-foreground">
                  Produce Arrives
                </p>
              </div>
              <span className="text-estoqi-green text-2xl font-light hidden md:block">
                →
              </span>
              {/* Step 2 - ESTOQI Cleanse */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white border border-estoqi-green/20 flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <span className="text-2xl">💧</span>
                </div>
                <p className="text-sm font-medium text-foreground">
                  ESTOQI Cleanse
                </p>
              </div>
              <span className="text-estoqi-green text-2xl font-light hidden md:block">
                →
              </span>
              {/* Step 3 - Verified Clean */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white border border-estoqi-green/20 flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-sm font-medium text-foreground">
                  Verified Clean
                </p>
              </div>
              <span className="text-estoqi-green text-2xl font-light hidden md:block">
                →
              </span>
              {/* Step 4 - To Your Operation */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white border border-estoqi-green/20 flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <CheckCircle size={24} className="text-estoqi-green" />
                </div>
                <p className="text-sm font-medium text-foreground mb-3">
                  To Your Operation
                </p>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Warehouse size={14} />
                  <Hotel size={14} />
                  <ShoppingBag size={14} />
                  <UtensilsCrossed size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expense Estimator */}
      <section className="py-24 lg:py-32 bg-estoqi-dark">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-blue mb-4">
              Expense Estimator
            </p>
            <h2 className="heading-display text-white text-4xl md:text-5xl">
              Estimate your
              <br />
              Estoqi cost
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Input */}
            <div className="fade-up glass rounded-sm p-8">
              <h3 className="text-white font-semibold text-xl mb-6">
                Your Produce Volume
              </h3>

              <div className="mb-6">
                <p className="label-caps text-white/50 block mb-3">Period</p>
                <div className="flex gap-3">
                  {(["day", "month"] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      data-ocid={`commercial.estimator.${p}_toggle`}
                      onClick={() => setPeriod(p)}
                      className={`flex-1 py-3 rounded-sm label-caps transition-all ${
                        period === p
                          ? "bg-estoqi-blue text-white"
                          : "border border-white/20 text-white/60 hover:border-white/40"
                      }`}
                    >
                      Per {p === "day" ? "Day" : "Month"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="volume-input"
                  className="label-caps text-white/50 block mb-3"
                >
                  Volume (kg / {period})
                </label>
                <input
                  id="volume-input"
                  data-ocid="commercial.estimator.volume_input"
                  type="number"
                  value={volumeKg}
                  onChange={(e) => setVolumeKg(e.target.value)}
                  min="0"
                  placeholder="Enter kg..."
                  className="w-full bg-white/10 border border-white/20 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-estoqi-blue transition-colors text-2xl font-light"
                />
              </div>

              <div className="text-white/40 text-sm">
                Adjust the volume to see your estimated Estoqi cost in real
                time.
              </div>
            </div>

            {/* Results */}
            <div className="fade-up stagger-2 space-y-4">
              {[
                {
                  label: "Daily Cleansing Capacity",
                  value: `${cleansingCapacity.toLocaleString()} kg`,
                  sub: "produce processed per day",
                  color: "text-estoqi-green",
                  bg: "bg-estoqi-green/10",
                },
                {
                  label: "Water Usage",
                  value: `${waterUsageLiters.toLocaleString()} L`,
                  sub: "ionized water per day",
                  color: "text-estoqi-blue",
                  bg: "bg-estoqi-blue/10",
                },
                {
                  label: "Monthly Volume",
                  value: `${monthlyVolume.toLocaleString()} kg`,
                  sub: "total monthly throughput",
                  color: "text-white",
                  bg: "bg-white/5",
                },
                {
                  label: "Estimated Monthly Spoilage Saved",
                  value: `₹${spoilageSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                  sub: "based on 2× shelf life + 9% avg spoilage rate at ₹40/kg",
                  color: "text-estoqi-green",
                  bg: "bg-estoqi-green/10",
                },
              ].map((result) => (
                <div
                  key={result.label}
                  className={`${result.bg} rounded-sm p-6 border border-white/10`}
                >
                  <p className="label-caps text-white/40 mb-2">
                    {result.label}
                  </p>
                  <p className={`text-3xl font-light ${result.color} mb-1`}>
                    {result.value}
                  </p>
                  <p className="text-white/40 text-xs">{result.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Pilot CTA */}
      <section className="py-24 lg:py-32 bg-estoqi-blue">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center fade-up">
          <h2 className="heading-display text-white text-4xl md:text-5xl mb-6">
            Ready to pilot
            <br />
            ESTOQI?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Run a 90-day pilot at your facility. We install, you process, we
            measure together. Pay only for what we cleanse.
          </p>
          <Link
            to="/book-consultation"
            data-ocid="commercial.pilot.primary_button"
            className="inline-flex items-center gap-3 bg-white text-estoqi-blue px-8 py-4 rounded-sm label-caps hover:bg-white/90 transition-all hover:-translate-y-0.5"
          >
            Request Pilot Program <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* In Conversation With - Pilot Logos */}
      <section className="py-16 bg-estoqi-off-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="label-caps text-center text-muted-foreground mb-10 fade-up">
            In Conversation With:
          </p>
          <div className="fade-up flex flex-wrap items-center justify-center gap-6">
            {["a", "b", "c", "d", "e", "f"].map((id) => (
              <div
                key={`logo-placeholder-${id}`}
                className="w-24 h-12 rounded-lg bg-muted/60 border border-border"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div
            data-ocid="commercial.case_study.card"
            className="fade-up bg-estoqi-dark rounded-sm p-10 md:p-14 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-estoqi-green" />
            <p className="label-caps text-estoqi-blue mb-4">Pilot Results</p>
            <h3 className="heading-display text-white text-2xl md:text-3xl mb-8">
              Cold Chain Partner, Mumbai
            </h3>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { stat: "2,400 kg", label: "Processed" },
                { stat: "47%", label: "Spoilage Reduction" },
                { stat: "30 days", label: "Pilot Duration" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-light text-estoqi-green mb-2">
                    {item.stat}
                  </p>
                  <p className="text-white/50 text-xs label-caps">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              2,400 kg processed over 30 days. 47% reduction in spoilage
              write-offs. Zero chemical inputs. NABL-documented results
              submitted to FSSAI compliance team.
            </p>
          </div>
        </div>
      </section>

      {/* B2B FAQ */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-blue mb-4">Common Questions</p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              Everything you need to evaluate
              <br />
              Estoqi for your operation.
            </h2>
          </div>

          <div className="fade-up stagger-2">
            <Accordion
              type="single"
              collapsible
              data-ocid="commercial.faq.accordion"
            >
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  value={item.question}
                  data-ocid={`commercial.faq.item.${i + 1}`}
                  className="border-b border-border/60"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-estoqi-green hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForFoodBusinesses;
