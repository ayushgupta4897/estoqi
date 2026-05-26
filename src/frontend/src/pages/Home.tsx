import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import type React from "react";
import { useState } from "react";
import VideoModal from "../components/VideoModal";
import VideoPlaceholder from "../components/VideoPlaceholder";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

const journalPosts = [
  {
    id: 1,
    category: "Water Science",
    title: "The Science of Ionized Water: What pH Really Means",
    excerpt:
      "Understanding the molecular difference between 9.5 pH drinking water and conventional tap water.",
    date: "Feb 12, 2026",
  },
  {
    id: 2,
    category: "Nutrition",
    title: "How 11.5 pH Water Transforms Produce Cleansing",
    excerpt:
      "A deep dive into how alkaline ionized water removes pesticide residues at the molecular level.",
    date: "Feb 5, 2026",
  },
  {
    id: 3,
    category: "Wellness",
    title: "Hydration Intelligence: Drinking Smarter, Not More",
    excerpt:
      "Why the quality of your water matters as much as the quantity you consume each day.",
    date: "Jan 28, 2026",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Priya M.",
    quote: "Changed how our family thinks about food and water.",
  },
  {
    id: 2,
    name: "Arjun K.",
    quote: "The produce cleansing system is remarkable.",
  },
  { id: 3, name: "Sunita R.", quote: "ESTOQI is the future of home wellness." },
  {
    id: 4,
    name: "Vikram S.",
    quote: "Our restaurant kitchen transformed overnight.",
  },
];

const Home: React.FC = () => {
  const [filmModalOpen, setFilmModalOpen] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<
    "produce" | "hydration" | null
  >(null);

  useScrollAnimation();

  return (
    <main>
      {/* ── 1. HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Video BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-estoqi-dark via-[oklch(0.20_0.07_255)] to-[oklch(0.16_0.05_230)]">
          <img
            src="/assets/generated/hero-vegetables-water.dim_1920x1080.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-estoqi-dark/40 via-estoqi-dark/20 to-estoqi-dark/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
          <p className="label-caps text-white/50 mb-8 animate-slide-up">
            India's First Dual-Stream Water Ionization System
          </p>
          <h1
            className="heading-display text-white text-4xl md:text-6xl lg:text-7xl mb-6 animate-slide-up leading-tight"
            style={{ animationDelay: "0.1s" }}
          >
            The Water That Actually Removes{" "}
            <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
              Pesticides
            </span>
            <br />
            From Your Food.
          </h1>
          <p
            className="text-white/70 text-base md:text-lg font-light tracking-wide mb-10 animate-slide-up max-w-2xl mx-auto leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            Estoqi's ionization technology removes up to 99% of pesticide
            residues from fresh produce, using only water. No compromises.
            NABL-verified by SGS India and Environcare Laboratories.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up mb-10"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              type="button"
              className="btn-primary-estoqi"
              onClick={() => {
                document
                  .getElementById("brand-film")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid="hero.watch_demo_button"
            >
              Watch The Demo
              <Play size={16} fill="white" />
            </button>
          </div>
          {/* Audience Fork Cards */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/for-homes"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-white/8 backdrop-blur-md border border-white/15 text-white/85 hover:bg-white/15 hover:border-white/25 hover:text-white transition-all duration-300 text-[11px] font-medium tracking-[0.14em] uppercase"
              data-ocid="hero.for_homes_link"
            >
              For Homes <ArrowRight size={13} />
            </Link>
            <Link
              to="/for-food-businesses"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-white/8 backdrop-blur-md border border-white/15 text-white/85 hover:bg-white/15 hover:border-white/25 hover:text-white transition-all duration-300 text-[11px] font-medium tracking-[0.14em] uppercase"
              data-ocid="hero.for_businesses_link"
            >
              For Businesses <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section
        className="bg-estoqi-dark border-b border-white/8"
        data-ocid="stats.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {(
              [
                { num: "Up to 99%", label: "Pesticide reduction" },
                { num: "2.2×", label: "Shelf life extension" },
                { num: "100+", label: "Independent lab tests" },
                { num: "1,200 ppb", label: "Molecular hydrogen" },
                { num: "NABL", label: "Certified" },
              ] as { num: string; label: string }[]
            ).map((stat, i) => (
              <div
                key={`${stat.num}-${stat.label}`}
                className="flex flex-col items-center text-center"
                data-ocid={`stats.item.${i + 1}`}
              >
                <span className="font-sans text-white font-extrabold text-4xl sm:text-5xl leading-none tracking-normal mb-2">
                  {stat.num}
                </span>
                <span className="text-white/50 text-xs tracking-[0.15em] uppercase font-semibold leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. BRAND FILM ── */}
      <section id="brand-film" className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <p className="label-caps text-estoqi-green mb-4">
              The ESTOQI Story
            </p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-6">
              Your produce is clean-looking.
              <br />
              That doesn't make it safe.
            </h2>
          </div>
          <div className="fade-up stagger-2">
            <VideoPlaceholder
              label="The ESTOQI Brand Film - 90 Seconds"
              overlayText="Brand Film"
              onClick={() => setFilmModalOpen(true)}
              className="max-w-4xl mx-auto rounded-sm"
            />
          </div>
        </div>
      </section>

      {/* ── 3. DUAL STREAM SPLIT ── */}
      <section className="pt-8 pb-24 lg:pb-32 bg-estoqi-off-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-green mb-4">The Dual Stream</p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-6">
              A new standard for what{" "}
              <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                clean food
              </span>{" "}
              means.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Estoqi's electrolysis chamber passes a controlled electrical
              current through surgical-grade titanium electrode plates —
              transforming ordinary tap water into ionized water at two distinct
              pH levels, each serving a different purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fade-up stagger-2">
            {/* Stream 1 - pH 9.5 Drinking Water */}
            <div
              className={`relative rounded-sm overflow-hidden cursor-pointer transition-all duration-700 ${
                hoveredSide === "hydration" ? "md:flex-[1.4]" : ""
              }`}
              style={{ minHeight: "480px" }}
              onMouseEnter={() => setHoveredSide("hydration")}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.35_0.12_230)] to-estoqi-blue">
                <img
                  src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80"
                  alt="Glass of clean drinking water"
                  className="absolute inset-0 w-full h-full object-cover object-right opacity-30"
                />
              </div>
              <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white label-caps text-xs mb-4">
                    Stream 1 - pH 9.5 Drinking Water
                  </span>
                  <h3 className="heading-display text-white text-3xl md:text-4xl mb-3">
                    Hydrogen-rich water
                    <br />
                    for daily hydration.
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                    1,200 ppb molecular hydrogen. Negative ORP. Micro-clustered
                    water molecules for better absorption. Every glass you
                    drink, every cup of chai you brew - made with water that
                    works better for you than the usual.
                  </p>
                </div>
                <Link
                  to="/science"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white label-caps transition-colors mt-4"
                >
                  See the science <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Stream 2 - pH 11.5 Wash Water */}
            <div
              className="relative rounded-sm overflow-hidden cursor-pointer transition-all duration-700"
              style={{ minHeight: "480px" }}
              onMouseEnter={() => setHoveredSide("produce")}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-estoqi-green to-[oklch(0.45_0.1_255)]">
                <img
                  src="/assets/generated/dual-stream-split.dim_1200x600.png"
                  alt="Produce cleansing"
                  className="absolute inset-0 w-full h-full object-cover object-left opacity-30"
                />
              </div>
              <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white label-caps text-xs mb-4">
                    Stream 2 - pH 11.5 Wash Water
                  </span>
                  <h3 className="heading-display text-white text-3xl md:text-4xl mb-3">
                    Lifts pesticides
                    <br />
                    off your produce.
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                    Ionized alkaline water at pH 11.5 has shown up to 99%
                    pesticide residue removal in NABL-accredited lab tests - the
                    highest efficacy recorded in our testing program. Used to
                    wash vegetable, fruit, and grain before it reaches your
                    plate.
                  </p>
                </div>
                <Link
                  to="/science"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white label-caps transition-colors mt-4"
                >
                  See the science <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 & 6. FOR HOMES + BUSINESSES ── */}
      <section className="pt-8 pb-24 lg:pb-32 bg-estoqi-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-green mb-4">ESTOQI For You</p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              Whether it's your kitchen or your cold chain -
              <br />
              <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                the science is the same.
              </span>
            </h2>
            <div className="mt-8">
              <Link
                to="/science"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-estoqi-green/40 text-estoqi-green hover:bg-estoqi-green hover:text-white transition-all duration-250 label-caps text-xs tracking-[0.12em] hover:scale-[1.02]"
                data-ocid="kitchen_coldchain.science_cta_link"
              >
                Understand the Science <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* For Homes */}
            <div className="fade-up stagger-1">
              <div className="relative bg-white/95 rounded-2xl p-10 h-full flex flex-col border-2 border-estoqi-dark/15 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-estoqi-green rounded-t-2xl" />
                <p className="label-caps text-estoqi-green mb-2 text-xs">
                  For Homes
                </p>
                <h3 className="heading-display text-foreground text-2xl md:text-3xl mb-3">
                  Clean food starts at your kitchen counter.
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  You wash your family's food every day. Now that wash can
                  actually do something. Estoqi's home ionizer fits under the
                  counter, connects to your existing tap, and produces
                  pesticide-removal wash water and drinking water - every meal,
                  every day.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8 flex-1">
                  <div className="rounded-xl border-2 border-estoqi-green/20 bg-estoqi-green/5 px-4 py-4 flex flex-col gap-1">
                    <span className="heading-display text-estoqi-green text-3xl font-extrabold leading-none">
                      99%
                    </span>
                    <span className="text-[11px] text-foreground/70 leading-snug font-medium">
                      Pesticide reduction on fruits &amp; vegetables
                    </span>
                  </div>
                  <div className="rounded-xl border-2 border-estoqi-green/20 bg-estoqi-green/5 px-4 py-4 flex flex-col gap-1">
                    <span className="heading-display text-estoqi-green text-3xl font-extrabold leading-none">
                      2.2×
                    </span>
                    <span className="text-[11px] text-foreground/70 leading-snug font-medium">
                      Longer shelf life on fresh produce
                    </span>
                  </div>
                  <div className="rounded-xl border-2 border-estoqi-green/20 bg-estoqi-green/5 px-4 py-4 flex flex-col gap-1">
                    <span className="heading-display text-estoqi-green text-2xl font-extrabold leading-none">
                      1,200 ppb
                    </span>
                    <span className="text-[11px] text-foreground/70 leading-snug font-medium">
                      Molecular hydrogen in drinking water
                    </span>
                  </div>
                  <div className="rounded-xl border-2 border-estoqi-green/20 bg-estoqi-green/5 px-4 py-4 flex flex-col gap-1">
                    <span className="heading-display text-estoqi-green text-2xl font-extrabold leading-none">
                      Simple
                    </span>
                    <span className="text-[11px] text-foreground/70 leading-snug font-medium">
                      No plumber needed. No ongoing consumables beyond annual
                      service.
                    </span>
                  </div>
                </div>
                <Link
                  to="/for-homes"
                  className="inline-flex items-center gap-2 label-caps text-estoqi-green text-xs hover:gap-3 transition-all mt-auto"
                  data-ocid="audience.homes_cta_link"
                >
                  Explore Home Ionizers <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* For Businesses */}
            <div className="fade-up stagger-2">
              <div className="relative bg-white/95 rounded-2xl p-10 h-full flex flex-col border-2 border-estoqi-dark/15 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-estoqi-blue rounded-t-2xl" />
                <p className="label-caps text-estoqi-blue mb-2 text-xs">
                  For Businesses
                </p>
                <h3 className="heading-display text-foreground text-2xl md:text-3xl mb-3">
                  Cleaner produce. Lower spoilage. Defensible food safety.
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Estoqi installs and owns the equipment. You pay per kg of
                  produce processed - no capex, no commitment. Scale up or down
                  as your volume demands. Built for cold chains, cloud kitchens,
                  quick-commerce, hospitals, and food exporters.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6 flex-1">
                  <div className="rounded-xl border-2 border-[#2563eb]/20 bg-[#2563eb]/5 px-4 py-4 flex flex-col gap-1">
                    <span className="heading-display text-[#2563eb] text-3xl font-extrabold leading-none">
                      Zero
                    </span>
                    <span className="text-[11px] text-foreground/70 leading-snug font-medium">
                      Upfront investment - per-kg pricing model
                    </span>
                  </div>
                  <div className="rounded-xl border-2 border-[#2563eb]/20 bg-[#2563eb]/5 px-4 py-4 flex flex-col gap-1">
                    <span className="heading-display text-[#2563eb] text-3xl font-extrabold leading-none">
                      2.2×
                    </span>
                    <span className="text-[11px] text-foreground/70 leading-snug font-medium">
                      Shelf life extension - fewer write-offs, better margins
                    </span>
                  </div>
                  <div className="rounded-xl border-2 border-[#2563eb]/20 bg-[#2563eb]/5 px-4 py-4 flex flex-col gap-1">
                    <span className="heading-display text-[#2563eb] text-xl font-extrabold leading-none">
                      IoT
                    </span>
                    <span className="text-[11px] text-foreground/70 leading-snug font-medium">
                      Real-time, auditable per-kg billing metering
                    </span>
                  </div>
                  <div className="rounded-xl border-2 border-[#2563eb]/20 bg-[#2563eb]/5 px-4 py-4 flex flex-col gap-1">
                    <span className="heading-display text-[#2563eb] text-xl font-extrabold leading-none">
                      NABL
                    </span>
                    <span className="text-[11px] text-foreground/70 leading-snug font-medium">
                      Certified data for food safety audits &amp; BRSR/ESG
                    </span>
                  </div>
                </div>
                <Link
                  to="/book-consultation"
                  className="inline-flex items-center gap-2 label-caps text-estoqi-blue text-xs hover:gap-3 transition-all mt-auto"
                  data-ocid="audience.businesses_cta_link"
                >
                  Talk to Our B2B Team <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section
        className="w-full py-10 lg:py-12 bg-estoqi-dark"
        data-ocid="closing_cta.section"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-up">
            <h2 className="heading-display text-white text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              Every meal.
              <br />
              Every plate.{" "}
              <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                Every kg.
              </span>
            </h2>
            <p className="text-white/65 text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-light">
              Whether you're a parent washing tonight's vegetables or a
              procurement head responsible for 10 tonnes a day - the science
              behind Estoqi is the same. The standard is the same. And the proof
              is the same: independently verified, NABL-accredited, published
              without caveats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/book-consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-white text-estoqi-dark hover:bg-estoqi-cream label-caps text-[11px] tracking-[0.14em] transition-all duration-250 hover:scale-[1.02] font-semibold"
                data-ocid="closing_cta.b2b_demo_link"
              >
                Book a B2B Demo <ArrowRight size={13} />
              </Link>
              <Link
                to="/for-homes"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm border-2 border-white text-white hover:bg-white/10 label-caps text-[11px] tracking-[0.14em] transition-all duration-250 hover:scale-[1.02]"
                data-ocid="closing_cta.shop_now_link"
              >
                Shop Now <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. JOURNAL PREVIEW ── */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16 fade-up">
            <div>
              <p className="label-caps text-estoqi-green mb-4">Journal</p>
              <h2 className="heading-display text-4xl md:text-5xl text-foreground">
                Intelligence
                <br />
                Dispatches
              </h2>
            </div>
            <Link
              to="/journal"
              className="hidden md:inline-flex items-center gap-2 label-caps text-estoqi-green hover:gap-3 transition-all"
            >
              All Articles <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journalPosts.map((post, i) => (
              <JournalCard key={post.id} post={post} delay={i + 1} />
            ))}
          </div>

          <div className="text-center mt-12 md:hidden fade-up">
            <Link to="/journal" className="btn-primary-estoqi">
              All Articles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. COMMUNITY PREVIEW ── */}
      <section className="py-24 lg:py-32 bg-estoqi-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-green mb-4">The Collective</p>
            <h2 className="heading-display text-white text-4xl md:text-5xl">
              Voices of the
              <br />
              ESTOQI Community
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`fade-up stagger-${i + 1} glass rounded-sm p-6 cursor-pointer hover:bg-white/15 transition-all duration-300`}
              >
                <div
                  className="video-placeholder rounded-sm mb-4"
                  style={{ aspectRatio: "1/1" }}
                >
                  <div className="play-icon" style={{ width: 40, height: 40 }}>
                    <Play
                      size={16}
                      className="text-white ml-0.5"
                      fill="white"
                    />
                  </div>
                </div>
                <p className="text-white font-medium text-sm mb-1">{t.name}</p>
                <p className="text-white/50 text-xs leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>

          <div className="text-center fade-up">
            <Link to="/collective" className="btn-outline-estoqi">
              Join The Collective <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BUILT WITH INTENT ── */}
      <section className="py-16 bg-estoqi-cream border-t border-estoqi-dark/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center fade-up">
          <div className="inline-flex items-center gap-2 mb-6 justify-center">
            <div className="w-6 h-px bg-estoqi-green/50" />
            <span className="label-caps text-estoqi-green text-xs">
              Built with Intent
            </span>
            <div className="w-6 h-px bg-estoqi-green/50" />
          </div>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
            ESTOQI is a system guided by the alignment of science, purpose, and
            everyday living. Every stream, every pH output, every interaction is
            deliberate.
          </p>
        </div>
      </section>

      {/* Modals */}
      <VideoModal
        isOpen={filmModalOpen}
        onClose={() => setFilmModalOpen(false)}
        title="ESTOQI Brand Film"
      />
    </main>
  );
};

interface JournalCardProps {
  post: {
    id: number;
    category: string;
    title: string;
    excerpt: string;
    date: string;
  };
  delay: number;
}

const JournalCard: React.FC<JournalCardProps> = ({ post, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={`fade-up stagger-${delay} group cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`video-placeholder rounded-sm mb-6 transition-all duration-500 ${hovered ? "opacity-90" : ""}`}
      >
        <div className="play-icon">
          <Play size={20} className="text-white ml-0.5" fill="white" />
        </div>
      </div>
      <div>
        <p className="label-caps text-estoqi-green text-xs mb-3">
          {post.category}
        </p>
        <h3 className="heading-display text-foreground text-xl mb-3 group-hover:text-estoqi-green transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <time className="label-caps text-muted-foreground text-xs">
            {post.date}
          </time>
          <span
            className={`label-caps text-estoqi-green text-xs flex items-center gap-1 transition-all ${hovered ? "gap-2" : ""}`}
          >
            Read <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </article>
  );
};

export default Home;
