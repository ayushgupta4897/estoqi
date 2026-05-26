import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

type ProduceId = "tomato" | "spinach" | "okra" | "rice" | "dal";

interface ProduceItem {
  id: ProduceId;
  name: string;
  gradient: string;
  icon: string;
  keyFinding: string;
  style: React.CSSProperties;
  floatAnim: string;
}

const PRODUCE_ITEMS: ProduceItem[] = [
  {
    id: "rice",
    name: "Rice",
    gradient: "linear-gradient(135deg, #d4a96a 0%, #e8c99a 50%, #c89050 100%)",
    icon: "🌾",
    keyFinding: "71% greater pesticide reduction than chlorine wash",
    style: { top: 10, left: 40, zIndex: 1 },
    floatAnim: "labsFloatA 3.2s ease-in-out infinite alternate",
  },
  {
    id: "dal",
    name: "Dal",
    gradient: "linear-gradient(135deg, #c47c2b 0%, #e09040 50%, #a8621a 100%)",
    icon: "🫘",
    keyFinding: "Pesticide residue significantly reduced vs untreated control",
    style: { top: 10, right: 40, zIndex: 1 },
    floatAnim: "labsFloatB 3.8s ease-in-out 0.5s infinite alternate",
  },
  {
    id: "tomato",
    name: "Tomato",
    gradient: "linear-gradient(135deg, #c0392b 0%, #e74c3c 50%, #922b21 100%)",
    icon: "🍅",
    keyFinding: "89-100% pesticide reduction vs chlorine wash - NABL certified",
    style: { bottom: 20, left: 10, zIndex: 2 },
    floatAnim: "labsFloatC 3.5s ease-in-out 0.2s infinite alternate",
  },
  {
    id: "spinach",
    name: "Spinach",
    gradient: "linear-gradient(135deg, #1a5c2a 0%, #27ae60 50%, #145a20 100%)",
    icon: "🥬",
    keyFinding: "85-98.5% microbial reduction incl. E. coli - FSSAI compliant",
    style: {
      bottom: 10,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 2,
    },
    floatAnim: "labsFloatD 4.1s ease-in-out 0.8s infinite alternate",
  },
  {
    id: "okra",
    name: "Okra",
    gradient: "linear-gradient(135deg, #4a7c2f 0%, #6aab3f 50%, #3a6020 100%)",
    icon: "🫛",
    keyFinding:
      "Surface biofilm and pesticide residue reduced in controlled testing",
    style: { bottom: 20, right: 10, zIndex: 2 },
    floatAnim: "labsFloatE 3.7s ease-in-out 0.4s infinite alternate",
  },
];

const COMPARISON_ROWS = [
  {
    method: "Plain Water Rinse",
    pesticide: 28,
    microbial: 22,
    wax: 15,
    result: "Insufficient",
    resultClass: "text-red-400 bg-red-900/20",
    highlight: false,
  },
  {
    method: "Vinegar Soak (5%)",
    pesticide: 61,
    microbial: 55,
    wax: 38,
    result: "Partial",
    resultClass: "text-amber-400 bg-amber-900/20",
    highlight: false,
  },
  {
    method: "Commercial Produce Wash",
    pesticide: 74,
    microbial: 68,
    wax: 52,
    result: "Good",
    resultClass: "text-teal-400 bg-teal-900/20",
    highlight: false,
  },
  {
    method: "Estoqi 11.5 pH",
    pesticide: 94,
    microbial: 89,
    wax: 91,
    result: "Best",
    resultClass: "text-[#60a5fa] font-bold bg-[#2563eb]/20",
    highlight: true,
  },
] as const;

const NAV_SECTIONS = [
  { id: "philosophy", label: "Philosophy" },
  { id: "produce-reports", label: "Produce Reports" },
  { id: "studies", label: "Studies" },
  { id: "comparison", label: "Comparison" },
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function AnimatedBar({
  targetPct,
  color,
  visible,
  delay = 0,
}: {
  targetPct: number;
  color: string;
  visible: boolean;
  delay?: number;
}) {
  return (
    <div className="h-0.5 bg-white/10 rounded-full w-full mt-1">
      <div
        className="h-full rounded-full ease-out"
        style={{
          width: visible ? `${targetPct}%` : "0%",
          backgroundColor: color,
          transition: "width 1s ease",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

const ESTOQILabs: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ProduceId | null>(null);
  const [mobileTapped, setMobileTapped] = useState<ProduceId | null>(null);
  const [shelfBarsVisible, setShelfBarsVisible] = useState(false);
  const [nutrientVisible, setNutrientVisible] = useState(false);
  const [compareBarsVisible, setCompareBarsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("philosophy");

  const shelfRef = useRef<HTMLDivElement>(null);
  const nutrientRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();

  const observeOnce = useCallback(
    (
      ref: React.RefObject<HTMLDivElement | null>,
      setter: (v: boolean) => void,
    ) => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
            obs.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      obs.observe(el);
      return () => obs.disconnect();
    },
    [],
  );

  useEffect(() => observeOnce(shelfRef, setShelfBarsVisible), [observeOnce]);
  useEffect(() => observeOnce(nutrientRef, setNutrientVisible), [observeOnce]);
  useEffect(
    () => observeOnce(compareRef, setCompareBarsVisible),
    [observeOnce],
  );

  // Track active nav section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const sec of NAV_SECTIONS) {
      const el = document.getElementById(sec.id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sec.id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="pt-16" style={{ background: "#07111f" }}>
      <style>{`
        @keyframes labsRadarPulse {
          0%   { transform: scale(0); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes labsFloatA {
          from { transform: translateY(0px); }
          to   { transform: translateY(-10px); }
        }
        @keyframes labsFloatB {
          from { transform: translateY(0px); }
          to   { transform: translateY(-9px); }
        }
        @keyframes labsFloatC {
          from { transform: translateY(0px); }
          to   { transform: translateY(-11px); }
        }
        @keyframes labsFloatD {
          from { transform: translateX(-50%) translateY(0px); }
          to   { transform: translateX(-50%) translateY(-8px); }
        }
        @keyframes labsFloatE {
          from { transform: translateY(0px); }
          to   { transform: translateY(-10px); }
        }
        @keyframes labsCircleGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
          70%      { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
        }
        @keyframes labsLinePulse {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
        @keyframes labsPopupIn {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes bounceX {
          from { transform: translateX(-6px); }
          to   { transform: translateX(6px); }
        }
        .labs-step-circle {
          animation: labsCircleGlow 2s ease-in-out infinite;
        }
        .labs-step-circle:hover {
          transform: translateY(-2px);
          border-color: #60a5fa !important;
        }
        .labs-card {
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .labs-card:hover {
          transform: translateY(-4px);
          background: #162d45 !important;
        }
        .labs-accent-bar {
          width: 0;
          transition: width 0.4s ease;
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(to right, #2563eb, #60a5fa);
        }
        .labs-card:hover .labs-accent-bar {
          width: 100%;
        }
        .produce-img {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .produce-img:hover {
          transform: scale(1.12) translateY(-6px);
          box-shadow: 0 0 24px rgba(37,99,235,0.5);
        }
        .labs-nav-pill {
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
      `}</style>

      {/* ── HERO SECTION ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "#07111f" }}
        data-ocid="labs.hero.section"
      >
        {/* Graph-paper grid with radial fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M 48 0 L 0 0 0 48' fill='none' stroke='rgba(37,99,235,0.07)' stroke-width='1'/%3E%3C/svg%3E")`,
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
          }}
        />

        {/* Radar pulse rings */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 400,
              height: 400,
              top: "50%",
              left: "50%",
              marginTop: -200,
              marginLeft: -200,
              border: "1px solid #2563eb",
              opacity: 0,
              animation: `labsRadarPulse 6s ease-out infinite ${i * 1.5}s`,
            }}
          />
        ))}

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto py-24">
          <p
            className="text-xs tracking-widest uppercase font-medium mb-8"
            style={{ color: "#2563eb" }}
          >
            ESTOQI LABS
          </p>

          <h1
            className="mb-8 font-serif"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              lineHeight: 1.1,
              color: "#fff",
            }}
          >
            <span className="block">Measured.</span>
            <em
              className="block"
              style={{ color: "#60a5fa", fontStyle: "italic" }}
            >
              Verified.
            </em>
            <span className="block">Transparent.</span>
          </h1>

          <p
            className="text-base md:text-lg leading-relaxed mx-auto mb-8"
            style={{ color: "rgba(255,255,255,0.52)", maxWidth: 520 }}
          >
            We test before we tell. Every claim - pesticide removal, shelf life,
            microbial reduction, nutrient retention - comes from NABL-accredited
            laboratory work. The numbers we publish are the numbers we measured.
          </p>

          {/* Dot-separated plain text labels */}
          <p
            className="mb-12 text-xs tracking-widest uppercase"
            style={{ color: "rgba(96,165,250,0.65)", letterSpacing: "0.12em" }}
          >
            Independent Testing
            <span className="mx-2" style={{ color: "rgba(37,99,235,0.5)" }}>
              ·
            </span>
            Quantified Results
            <span className="mx-2" style={{ color: "rgba(37,99,235,0.5)" }}>
              ·
            </span>
            Reproducible
            <span className="mx-2" style={{ color: "rgba(37,99,235,0.5)" }}>
              ·
            </span>
            Full Methodology Disclosed
          </p>

          {/* Scroll cue */}
          <div className="flex flex-col items-center gap-2">
            <div
              style={{
                width: 2,
                height: 60,
                background: "#2563eb",
                animation: "labsLinePulse 1.8s ease-in-out infinite",
              }}
            />
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              EXPLORE THE EVIDENCE
            </p>
          </div>
        </div>
      </section>

      {/* ── STICKY SECTION NAV ── */}
      <div
        className="sticky z-40 border-b"
        style={{
          top: 64,
          background: "#07111f",
          borderColor: "rgba(20,37,64,0.8)",
        }}
        data-ocid="labs.section_nav"
      >
        <div
          className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto"
          style={{ scrollbarWidth: "none", justifyContent: "center" }}
        >
          {NAV_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className="labs-nav-pill flex-shrink-0 rounded-full text-sm font-medium cursor-pointer px-4 py-1.5"
              style={{
                border:
                  activeSection === sec.id
                    ? "1px solid #2563eb"
                    : "1px solid rgba(37,99,235,0.4)",
                background:
                  activeSection === sec.id ? "#2563eb" : "transparent",
                color:
                  activeSection === sec.id ? "#fff" : "rgba(96,165,250,0.8)",
              }}
              onClick={() => scrollToSection(sec.id)}
              data-ocid={`labs.nav.${sec.id}.tab`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: TESTING PHILOSOPHY ── */}
      <section
        id="philosophy"
        className="py-24"
        style={{ background: "#07111f" }}
        data-ocid="labs.testing_philosophy.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Two-col header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="fade-up">
              <p
                className="text-xs tracking-widest uppercase font-medium mb-4"
                style={{ color: "#2563eb" }}
              >
                TESTING PHILOSOPHY
              </p>
              <h2
                className="font-serif"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 4vw, 2.5rem)",
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.15,
                }}
              >
                How we{" "}
                <em style={{ color: "#60a5fa", fontStyle: "italic" }}>test.</em>
              </h2>
            </div>
            <div
              className="fade-up stagger-2"
              style={{
                borderTop: "1px solid rgba(37,99,235,0.2)",
                paddingTop: "2rem",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.52)", lineHeight: 1.7 }}>
                Our testing protocol is built on internationally recognised
                standards. Every experiment is designed for reproducibility -
                controlled variables, same-batch sourcing, and independent
                laboratory verification at every stage.
              </p>
            </div>
          </div>

          {/* Three-step horizontal flow */}
          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute hidden md:block"
              style={{
                top: 24,
                left: "calc(16.666% + 24px)",
                right: "calc(16.666% + 24px)",
                height: 1,
                background: "rgba(37,99,235,0.3)",
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: "01",
                  label: "SAMPLE PREP",
                  title: "We start with the same source.",
                  body: "Every test begins with produce from the exact same batch - same farm, same delivery, split at our lab. Half gets the Estoqi wash. Half doesn't. That's the only variable. No staging. No selection. The same tomatoes, compared fairly.",
                },
                {
                  num: "02",
                  label: "TREATMENT",
                  title: "Five minutes. That's it.",
                  body: "The produce is fully submerged in Estoqi-generated pH 11.5 ionized water for exactly five minutes at room temperature - the same way you'd wash vegetables at home or in a commercial kitchen. Nothing else is added. No heat, no additives, no pressure.",
                },
                {
                  num: "03",
                  label: "ANALYSIS",
                  title: "An independent lab reads the results. Not us.",
                  body: "Both halves - the Estoqi-washed and the unwashed - go to an NABL-accredited third-party laboratory. We don't conduct the testing ourselves. The lab runs a full residue panel and reports back what's present, what's gone, and by how much. We publish those numbers exactly as received.",
                },
              ].map((step, idx) => (
                <div
                  key={step.num}
                  className={`fade-up stagger-${idx + 1} flex flex-col items-center text-center`}
                >
                  <div
                    className="relative flex items-center justify-center rounded-full w-12 h-12 mb-4 labs-step-circle"
                    style={{
                      border: "2px solid #2563eb",
                      background: "#0b1929",
                    }}
                  >
                    <span
                      style={{
                        color: "#60a5fa",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      className="absolute w-2 h-2 rounded-full animate-pulse"
                      style={{ background: "#2563eb", bottom: 3, right: 3 }}
                    />
                  </div>

                  <p
                    className="text-xs tracking-widest uppercase mb-3"
                    style={{ color: "rgba(96,165,250,0.6)" }}
                  >
                    {step.label}
                  </p>
                  <h3
                    className="mb-2 font-serif"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      color: "#fff",
                      fontSize: "1.1rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.52)" }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PRODUCE TEST REPORTS ── */}
      <section
        id="produce-reports"
        className="py-24"
        style={{ background: "#0b1929" }}
        data-ocid="labs.produce_reports.section"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 fade-up">
            <p
              className="text-xs tracking-widest uppercase font-medium mb-4"
              style={{ color: "#2563eb" }}
            >
              PRODUCE TEST REPORTS
            </p>
            <h2
              className="mb-4 font-serif"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                color: "#fff",
                lineHeight: 1.15,
              }}
            >
              See what we tested{" "}
              <em style={{ color: "#60a5fa", fontStyle: "italic" }}>
                and found
              </em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.52)" }}>
              Each report compares treated samples against untreated controls
              from the same batch. Click any produce to explore.
            </p>
          </div>

          {/* Fixed-center popup overlay - renders above everything */}
          {activeItem &&
            (() => {
              const popupItem = PRODUCE_ITEMS.find((p) => p.id === activeItem);
              if (!popupItem) return null;
              return (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-50"
                    style={{
                      background: "rgba(7,17,31,0.75)",
                      backdropFilter: "blur(2px)",
                    }}
                    onClick={() => setActiveItem(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setActiveItem(null);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Close produce popup"
                  />
                  {/* Card - fixed center on screen */}
                  <div
                    className="fixed z-50 rounded-2xl"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 300,
                      maxWidth: "90vw",
                      background: "#0b1929",
                      border: "1px solid rgba(37,99,235,0.7)",
                      padding: "20px",
                      boxShadow:
                        "0 0 40px rgba(37,99,235,0.35), 0 20px 60px rgba(0,0,0,0.7)",
                      animation: "labsPopupIn 0.22s ease",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    data-ocid="labs.produce.popup.dialog"
                  >
                    <button
                      type="button"
                      className="absolute top-3 right-4 text-xl font-bold cursor-pointer transition-colors"
                      style={{
                        color: "#60a5fa",
                        background: "none",
                        border: "none",
                        lineHeight: 1,
                      }}
                      onClick={() => setActiveItem(null)}
                      data-ocid="labs.produce.popup.close_button"
                    >
                      ×
                    </button>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 52,
                          height: 52,
                          background: popupItem.gradient,
                        }}
                      >
                        <span style={{ fontSize: 26 }}>{popupItem.icon}</span>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: 9,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                            color: "#2563eb",
                            marginBottom: 2,
                          }}
                        >
                          LAB REPORT
                        </p>
                        <h4
                          className="font-serif"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 600,
                            fontSize: 17,
                            color: "#fff",
                            lineHeight: 1.2,
                          }}
                        >
                          {popupItem.name}
                        </h4>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#93c5fd",
                        lineHeight: 1.65,
                        marginBottom: 16,
                      }}
                    >
                      {popupItem.keyFinding}
                    </p>
                    <button
                      type="button"
                      className="w-full text-xs rounded-lg px-3 py-2 transition-colors cursor-pointer"
                      style={{
                        border: "1px solid rgba(37,99,235,0.6)",
                        color: "#60a5fa",
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "#2563eb";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "#fff";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "#60a5fa";
                      }}
                      data-ocid={`labs.produce.${popupItem.id}.download_button`}
                    >
                      Download Report →
                    </button>
                  </div>
                </>
              );
            })()}

          {/* ── Desktop basket ── */}
          <div className="hidden sm:block">
            {/* Basket container */}
            <div
              className="relative mx-auto mb-8"
              style={{ width: 320, height: 240 }}
            >
              {PRODUCE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="absolute bg-transparent border-0 p-0 cursor-pointer"
                  style={{
                    ...item.style,
                    animation: activeItem === item.id ? "none" : item.floatAnim,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveItem(activeItem === item.id ? null : item.id);
                  }}
                  aria-label={`View ${item.name} lab report`}
                  data-ocid={`labs.produce.${item.id}`}
                >
                  {/* CSS gradient circle - no external image dependency */}
                  <div
                    className="produce-img rounded-full flex flex-col items-center justify-center"
                    style={{
                      width: 88,
                      height: 88,
                      background: item.gradient,
                      boxShadow:
                        activeItem === item.id
                          ? "0 0 24px rgba(37,99,235,0.7), 0 8px 20px rgba(0,0,0,0.4)"
                          : "0 8px 20px rgba(0,0,20,0.5)",
                      outline:
                        activeItem === item.id ? "2px solid #2563eb" : "none",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 32, lineHeight: 1 }}>
                      {item.icon}
                    </span>
                  </div>
                  <p
                    className="text-xs text-center mt-1.5 font-medium"
                    style={{ color: "#60a5fa" }}
                  >
                    {item.name}
                  </p>
                </button>
              ))}

              {/* Bowl arc */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: 0,
                  left: "8%",
                  width: "84%",
                  height: 40,
                  border: "1px solid rgba(37,99,235,0.15)",
                  borderTop: "none",
                  borderRadius: "0 0 50% 50%",
                }}
              />
            </div>
          </div>

          {/* Mobile 2-col grid */}
          <div className="grid grid-cols-2 gap-4 mb-12 sm:hidden">
            {PRODUCE_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="relative flex flex-col items-center justify-center rounded-xl p-4"
                style={{
                  background: "#0b1929",
                  border:
                    mobileTapped === item.id
                      ? "1px solid rgba(37,99,235,0.6)"
                      : "1px solid rgba(37,99,235,0.2)",
                  minHeight: 120,
                  cursor: "pointer",
                }}
                onClick={() =>
                  setMobileTapped(mobileTapped === item.id ? null : item.id)
                }
                data-ocid={`labs.produce.${item.id}.mobile`}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 60,
                    height: 60,
                    background: item.gradient,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  <span style={{ fontSize: 26 }}>{item.icon}</span>
                </div>
                <p
                  className="text-xs mt-2 font-medium text-center"
                  style={{ color: "#60a5fa" }}
                >
                  {item.name}
                </p>
                {mobileTapped === item.id && (
                  <div
                    className="mt-3 text-center"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 11,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.keyFinding}
                    <button
                      type="button"
                      className="block mx-auto mt-2 text-white text-xs px-3 py-1 rounded-lg"
                      style={{ background: "#2563eb" }}
                      data-ocid={`labs.produce.${item.id}.mobile_download`}
                    >
                      Download Report
                    </button>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Hint line */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              CLICK ANY PRODUCE TO VIEW ITS LAB REPORT
            </p>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.08)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: THREE STUDIES ── */}
      <section
        id="studies"
        className="py-24"
        style={{ background: "#07111f" }}
        data-ocid="labs.three_studies.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 fade-up">
            <p
              className="text-xs tracking-widest uppercase font-medium mb-4"
              style={{ color: "#2563eb" }}
            >
              BEYOND PESTICIDES
            </p>
            <h2
              className="mb-4 font-serif"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                color: "#fff",
                lineHeight: 1.15,
              }}
            >
              Three studies.{" "}
              <em style={{ color: "#60a5fa", fontStyle: "italic" }}>
                Three findings.
              </em>
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              Pesticide removal is what Estoqi set out to prove. What the labs
              found beyond that was unexpected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Shelf Life */}
            <div
              ref={shelfRef}
              className="labs-card rounded-2xl overflow-hidden p-6 flex flex-col"
              style={{ background: "#0b1929" }}
              data-ocid="labs.shelf_life.card"
            >
              <div className="h-0.5 mb-6 overflow-hidden rounded-full">
                <div className="labs-accent-bar" />
              </div>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "#60a5fa" }}
              >
                STUDY 01 - SHELF LIFE
              </p>
              <h3
                className="mb-1 font-serif"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                  color: "#fff",
                  fontSize: "1.2rem",
                }}
              >
                2x shelf life - Tomato study
              </h3>
              <p
                className="text-xs mb-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Same batch - Controlled conditions - NABL
              </p>

              {/* Plain-English callout */}
              <div
                className="rounded-lg p-3 text-sm mb-4"
                style={{
                  background: "rgba(37,99,235,0.08)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Estoqi-treated produce stays fresh{" "}
                <strong style={{ color: "#fff" }}>twice as long.</strong>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Estoqi Treated - Fresh to Day 8+
                  </p>
                  <AnimatedBar
                    targetPct={85}
                    color="#2563eb"
                    visible={shelfBarsVisible}
                  />
                </div>
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Untreated Control - Spoiled by Day 4
                  </p>
                  <AnimatedBar
                    targetPct={33}
                    color="rgba(239,68,68,0.6)"
                    visible={shelfBarsVisible}
                    delay={200}
                  />
                </div>
              </div>

              <div
                className="flex justify-between text-xs mb-4"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {["Day 1", "Day 4", "Day 8", "Day 12"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              <p
                className="text-xs mb-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Mechanism: Estoqi's negative ORP slows surface oxidation.
              </p>

              <div className="mt-auto">
                <button
                  type="button"
                  className="text-xs rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
                  style={{
                    border: "1px solid rgba(37,99,235,0.6)",
                    color: "#60a5fa",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "#2563eb";
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#60a5fa";
                  }}
                  data-ocid="labs.shelf_life.download_button"
                >
                  Download Full Report →
                </button>
              </div>
            </div>

            {/* Card 2: Nutrient Enrichment */}
            <div
              ref={nutrientRef}
              className="labs-card rounded-2xl overflow-hidden p-6 flex flex-col"
              style={{ background: "#0b1929" }}
              data-ocid="labs.nutrient.card"
            >
              <div className="h-0.5 mb-6 overflow-hidden rounded-full">
                <div className="labs-accent-bar" />
              </div>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "#60a5fa" }}
              >
                STUDY 02 - NUTRIENT ENRICHMENT
              </p>
              <h3
                className="mb-1 font-serif"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                  color: "#fff",
                  fontSize: "1.2rem",
                }}
              >
                What Estoqi leaves behind
              </h3>
              <p
                className="text-xs mb-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Capsicum &amp; Tomato - Environcare - NABL
              </p>

              {/* Plain-English callout */}
              <div
                className="rounded-lg p-3 text-sm mb-4"
                style={{
                  background: "rgba(37,99,235,0.08)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Estoqi water keeps nutrients intact -{" "}
                <strong style={{ color: "#fff" }}>
                  and in some cases, increases them.
                </strong>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {(
                  [
                    {
                      val: "98%",
                      label: "Vitamin C Retained",
                      sub: "Capsicum",
                      i: 0,
                    },
                    {
                      val: "107%",
                      label: "Lycopene Enriched",
                      sub: "Tomato",
                      i: 1,
                    },
                    {
                      val: "96%",
                      label: "Beta-Carotene Retained",
                      sub: "Capsicum",
                      i: 2,
                    },
                    {
                      val: "94%",
                      label: "Polyphenols Retained",
                      sub: "Tomato",
                      i: 3,
                    },
                  ] as const
                ).map((s) => (
                  <div
                    key={s.label}
                    style={{
                      opacity: nutrientVisible ? 1 : 0,
                      transform: nutrientVisible ? "scale(1)" : "scale(0.8)",
                      transition: `opacity 0.5s ease ${s.i * 120}ms, transform 0.5s ease ${s.i * 120}ms`,
                    }}
                  >
                    <p
                      className="font-serif"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: "1.75rem",
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      {s.val}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "rgba(255,255,255,0.52)" }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(96,165,250,0.6)" }}
                    >
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>

              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "rgba(255,255,255,0.52)" }}
              >
                Most washing methods strip nutrients. Estoqi does the opposite.
              </p>

              <div className="mt-auto">
                <button
                  type="button"
                  className="text-xs rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
                  style={{
                    border: "1px solid rgba(37,99,235,0.6)",
                    color: "#60a5fa",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "#2563eb";
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#60a5fa";
                  }}
                  data-ocid="labs.nutrient.download_button"
                >
                  Download Full Report →
                </button>
              </div>
            </div>

            {/* Card 3: Microbial */}
            <div
              className="labs-card rounded-2xl overflow-hidden p-6 flex flex-col"
              style={{ background: "#0b1929" }}
              data-ocid="labs.microbial.card"
            >
              <div className="h-0.5 mb-6 overflow-hidden rounded-full">
                <div className="labs-accent-bar" />
              </div>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "#60a5fa" }}
              >
                STUDY 03 - MICROBIAL REDUCTION
              </p>
              <h3
                className="mb-1 font-serif"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                  color: "#fff",
                  fontSize: "1.2rem",
                }}
              >
                Spinach microbial load study
              </h3>
              <p
                className="text-xs mb-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                SGS India - NABL-Certified
              </p>

              {/* Plain-English callout */}
              <div
                className="rounded-lg p-3 text-sm mb-4"
                style={{
                  background: "rgba(37,99,235,0.08)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Estoqi water{" "}
                <strong style={{ color: "#fff" }}>
                  eliminated detectable E. coli
                </strong>{" "}
                and reduced microbial load to near-zero.
              </div>

              {/* Simplified 3-row table */}
              <div className="rounded-lg overflow-hidden mb-4">
                <div
                  className="grid text-xs font-medium px-3 py-2"
                  style={{
                    gridTemplateColumns: "1fr auto auto",
                    background: "#162d45",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <span>Measure</span>
                  <span className="mr-3">Before</span>
                  <span>After</span>
                </div>
                {[
                  {
                    marker: "Microbial Count",
                    before: "High",
                    after: "Reduced -3 log",
                    even: true,
                  },
                  {
                    marker: "E. coli / Coliforms",
                    before: "Detected",
                    after: "Not detected",
                    even: false,
                  },
                  {
                    marker: "Surface Biofilm",
                    before: "Visible",
                    after: "Eliminated",
                    even: true,
                  },
                ].map((row) => (
                  <div
                    key={row.marker}
                    className="grid items-center text-xs px-3 py-2"
                    style={{
                      gridTemplateColumns: "1fr auto auto",
                      background: row.even
                        ? "rgba(11,25,41,1)"
                        : "rgba(22,45,69,0.3)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <span className="pr-2" style={{ fontSize: 10 }}>
                      {row.marker}
                    </span>
                    <span
                      className="mr-2 rounded-full px-2 py-0.5"
                      style={{
                        background: "rgba(127,29,29,0.3)",
                        color: "#fca5a5",
                        border: "1px solid rgba(239,68,68,0.3)",
                        fontSize: 10,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.before}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5"
                      style={{
                        background: "rgba(30,58,138,0.3)",
                        color: "#60a5fa",
                        border: "1px solid rgba(37,99,235,0.4)",
                        fontSize: 10,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.after}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <button
                  type="button"
                  className="text-xs rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
                  style={{
                    border: "1px solid rgba(37,99,235,0.6)",
                    color: "#60a5fa",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "#2563eb";
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#60a5fa";
                  }}
                  data-ocid="labs.microbial.download_button"
                >
                  Download Full Report →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: COMPARATIVE STUDY ── */}
      <section
        id="comparison"
        className="py-24"
        style={{ background: "#0b1929" }}
        data-ocid="labs.comparative.section"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 fade-up">
            <p
              className="text-xs tracking-widest uppercase font-medium mb-4"
              style={{ color: "#2563eb" }}
            >
              COMPARATIVE STUDIES
            </p>
            <h2
              className="mb-4 font-serif"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                color: "#fff",
                lineHeight: 1.15,
              }}
            >
              Estoqi vs.{" "}
              <em style={{ color: "#60a5fa", fontStyle: "italic" }}>
                everything else.
              </em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.52)" }}>
              Average % reduction across tested markers. Full methodology in
              downloadable reports.
            </p>
          </div>

          <div ref={compareRef} className="overflow-x-auto fade-up">
            <table
              className="w-full text-sm min-w-[600px]"
              style={{
                background: "#07111f",
                borderRadius: 16,
                border: "1px solid rgba(37,99,235,0.2)",
                overflow: "hidden",
                borderCollapse: "separate",
                borderSpacing: 0,
              }}
            >
              <thead>
                <tr style={{ background: "#0b1929" }}>
                  {[
                    { label: "Method", blue: false },
                    { label: "Pesticide Reduction", blue: false },
                    { label: "Microbial Reduction", blue: false },
                    { label: "Wax & Film Removal", blue: false },
                    { label: "Result", blue: true },
                  ].map((h) => (
                    <th
                      key={h.label}
                      className="text-xs uppercase tracking-widest px-4 py-4 text-left font-medium"
                      style={{
                        color: h.blue ? "#60a5fa" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, ri) => (
                  <tr
                    key={row.method}
                    style={{
                      background: row.highlight
                        ? "rgba(37,99,235,0.05)"
                        : "transparent",
                    }}
                  >
                    <td
                      className="px-4 py-4 font-medium"
                      style={{
                        color: row.highlight ? "#60a5fa" : "#fff",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {row.method}
                    </td>
                    {(["pesticide", "microbial", "wax"] as const).map(
                      (key, ki) => (
                        <td
                          key={key}
                          className="px-4 py-4"
                          style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <div
                            className="font-semibold text-sm"
                            style={{ color: "#fff" }}
                          >
                            {row[key]}%
                          </div>
                          <div className="h-0.5 bg-white/10 rounded-full mt-1 w-full">
                            <div
                              className="h-full rounded-full ease-out"
                              style={{
                                width: compareBarsVisible
                                  ? `${row[key]}%`
                                  : "0%",
                                transition: "width 1s ease",
                                background: row.highlight
                                  ? "#60a5fa"
                                  : "#2563eb",
                                transitionDelay: `${(ri * 3 + ki) * 80}ms`,
                              }}
                            />
                          </div>
                        </td>
                      ),
                    )}
                    <td
                      className="px-4 py-4"
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        className={`rounded px-2 py-0.5 text-xs ${row.resultClass}`}
                      >
                        {row.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Comparison download button */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="text-sm rounded-xl px-5 py-2 transition-colors cursor-pointer"
              style={{
                border: "1px solid rgba(37,99,235,0.6)",
                color: "#60a5fa",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#2563eb";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#60a5fa";
              }}
              data-ocid="labs.comparison.download_button"
            >
              Download Comparison Report →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ESTOQILabs;
