import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

// --- Journey of Water - stage definitions ---
interface JourneyStage {
  number: string;
  side: "left" | "right";
  label: string;
  title: React.ReactNode;
  body: string;
  chips: string[];
}

const journeyStages: JourneyStage[] = [
  {
    number: "01",
    side: "left",
    label: "WHERE IT BEGINS",
    title: "Ordinary tap water. Nothing added.",
    body: "The process starts with the water already in your pipes - municipal, filtered, whatever you have. No pre-treatment required. The water enters exactly as it is.",
    chips: ["pH 7 - neutral", "Untreated tap water"],
  },
  {
    number: "02",
    side: "right",
    label: "THE PROCESS",
    title: "The Electrolysis Chamber.",
    body: "Water flows through a chamber containing surgical-grade titanium electrode plates. A controlled electrical current passes through - this is electrolysis. No heat. No additives. Just electricity and water, and the laws of electrochemistry doing what they've always done.",
    chips: [
      "Surgical-grade titanium",
      "Electrical current only",
      "Zero additives",
    ],
  },
  {
    number: "03",
    side: "left",
    label: "THE SCIENCE",
    title: (
      <>
        Water molecules change{" "}
        <span style={{ fontStyle: "italic", color: "#60a5fa" }}>charge.</span>
      </>
    ),
    body: "As the electrical current passes through, water molecules separate into distinct ionic states. This is not filtration.",
    chips: ["Ionic transformation", "Not filtration"],
  },
  {
    number: "04",
    side: "right",
    label: "THE TRANSFORMATION",
    title: (
      <>
        Water that can do{" "}
        <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
          what water couldn't.
        </span>
      </>
    ),
    body: "At high alkalinity, the water emulsifies oil-based compounds on contact - the same electrochemical principle that makes industrial degreasers work, but produced from plain tap water. Pesticide residues that were engineered to survive neutral water cannot survive this. The mildly alkaline output carries dissolved molecular hydrogen - the smallest molecule in existence, small enough to pass through cell membranes.",
    chips: [
      "pH 11.5 - emulsifies oil-based pesticides",
      "pH 9.5 - molecular hydrogen",
    ],
  },
];

const TheSystem: React.FC = () => {
  // Journey of Water - refs for dynamic centre-line measurement
  const journeyFlowRef = useRef<HTMLDivElement | null>(null);
  const resultSectionRef = useRef<HTMLDivElement | null>(null);
  const centreLineRef = useRef<HTMLDivElement | null>(null);
  const dropletContainerRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeight, setLineHeight] = useState<number>(0);

  // Hero ref
  const heroRef = useRef<HTMLElement | null>(null);

  useScrollAnimation();

  // Journey of Water - measure centre-line height dynamically
  useEffect(() => {
    const measureLine = () => {
      if (!journeyFlowRef.current || !resultSectionRef.current) return;
      const flowTop =
        journeyFlowRef.current.getBoundingClientRect().top + window.scrollY;
      const resultTop =
        resultSectionRef.current.getBoundingClientRect().top + window.scrollY;
      const newHeight = Math.max(0, resultTop - flowTop);
      setLineHeight(newHeight);
    };

    measureLine();
    const ro = new ResizeObserver(measureLine);
    if (journeyFlowRef.current) ro.observe(journeyFlowRef.current);
    if (resultSectionRef.current) ro.observe(resultSectionRef.current);
    window.addEventListener("resize", measureLine);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureLine);
    };
  }, []);

  // Journey stage scroll-trigger animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const ref of stageRefs.current) {
      if (!ref) continue;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).style.opacity = "1";
              (entry.target as HTMLElement).style.transform = "translateY(0)";
              obs.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15 },
      );
      obs.observe(ref);
      observers.push(obs);
    }
    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom, #080f1e 0%, #0a1628 60%, #050c18 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Underwater caustic shimmer overlay - full page background */}
      <div
        className="journey-caustic-bg"
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
           HERO - condensed, no "Journey of Water" heading
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          paddingTop: "5rem",
          paddingBottom: "1.5rem",
          minHeight: "auto",
          zIndex: 1,
        }}
        data-ocid="journey.hero.section"
      >
        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p
            className="label-caps mb-5"
            style={{
              color: "#2563eb",
              letterSpacing: "0.2em",
              fontSize: "0.75rem",
            }}
          >
            THE ESTOQI SYSTEM
          </p>
          <h1
            className="heading-display mb-5"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              color: "white",
              fontWeight: 500,
              lineHeight: 1.08,
            }}
          >
            The machine that makes{" "}
            <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
              two waters.
            </span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.62)",
              maxWidth: "520px",
              margin: "0 auto 1rem",
              lineHeight: 1.6,
              fontSize: "1rem",
            }}
          >
            One countertop unit. One electrolysis chamber. Two dedicated outlets
            - one for pH 11.5 wash water, one for pH 9.5 hydrogen-rich drinking
            water. Both produced simultaneously, on demand.
          </p>
          {/* Scroll indicator - line only, no circle */}
          <div className="flex flex-col items-center gap-1 mt-3">
            <div className="journey-scroll-line" aria-hidden="true" />
            <p
              className="label-caps"
              style={{
                color: "#2563eb",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
              }}
            >
              FOLLOW THE WATER
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           JOURNEY OF WATER - Section 2: The Flow
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-8 lg:py-10"
        style={{ zIndex: 1 }}
        ref={journeyFlowRef}
        data-ocid="journey.flow.section"
      >
        {/* ── Centre line + droplets (desktop only) ── */}
        <div
          className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"
          aria-hidden="true"
          style={{
            width: "2px",
            height: lineHeight > 0 ? `${lineHeight}px` : "100%",
            overflow: "hidden",
          }}
        >
          {/* The line itself */}
          <div
            ref={centreLineRef}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, #2563eb, #93c5fd)",
              opacity: 0.6,
            }}
          />
          {/* Falling droplets - clipped by overflow:hidden on parent */}
          <div
            ref={dropletContainerRef}
            style={{ position: "absolute", inset: 0 }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="journey-droplet"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Desktop alternating layout */}
          <div className="hidden sm:block space-y-8">
            {journeyStages.map((stage, idx) => (
              <div
                key={stage.number}
                ref={(el) => {
                  stageRefs.current[idx] = el;
                }}
                className="relative flex items-start"
                style={{
                  opacity: 0,
                  transform: "translateY(36px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  justifyContent:
                    stage.side === "left" ? "flex-start" : "flex-end",
                }}
                data-ocid={`journey.flow.stage.${stage.number}`}
              >
                {/* Content block */}
                <div
                  style={{
                    maxWidth: "380px",
                    width: "100%",
                    marginRight: stage.side === "left" ? undefined : "0",
                  }}
                >
                  {/* Connector line from content to centre node */}
                  <div
                    className="hidden sm:flex items-center mb-4"
                    aria-hidden="true"
                    style={{
                      flexDirection:
                        stage.side === "left" ? "row-reverse" : "row",
                    }}
                  >
                    <div
                      style={{
                        height: "1px",
                        flex: 1,
                        background: "#2563eb",
                        opacity: 0.35,
                        maxWidth: "80px",
                      }}
                    />
                    {/* Node */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        border: "2px solid #2563eb",
                        background: "#142540",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        zIndex: 10,
                      }}
                    >
                      {stage.number}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      background: "#142540",
                      border: "1px solid rgba(37,99,235,0.25)",
                      borderRadius: "12px",
                      padding: "24px",
                    }}
                  >
                    <p
                      className="label-caps mb-3"
                      style={{
                        color: "#2563eb",
                        letterSpacing: "0.15em",
                        fontSize: "0.7rem",
                      }}
                    >
                      {stage.label}
                    </p>
                    <h3
                      className="heading-display mb-3"
                      style={{
                        color: "white",
                        fontSize: "1.3rem",
                        fontWeight: 500,
                      }}
                    >
                      {stage.title}
                    </h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.68)",
                        fontSize: "0.88rem",
                        lineHeight: 1.65,
                        marginBottom: "14px",
                      }}
                    >
                      {stage.body}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {stage.chips.map((chip) => (
                        <span
                          key={chip}
                          style={{
                            background: "#0d1e38",
                            border: "1px solid rgba(37,99,235,0.3)",
                            color: "#93c5fd",
                            fontSize: "0.7rem",
                            padding: "4px 12px",
                            borderRadius: "9999px",
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile single-column layout */}
          <div className="sm:hidden space-y-8">
            {journeyStages.map((stage, idx) => (
              <div
                key={stage.number}
                ref={(el) => {
                  if (!stageRefs.current[idx]) stageRefs.current[idx] = el;
                }}
                className="flex items-start gap-4"
                style={{
                  opacity: 0,
                  transform: "translateY(36px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
                data-ocid={`journey.flow.stage-mobile.${stage.number}`}
              >
                {/* Node */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "2px solid #2563eb",
                    background: "#142540",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    marginTop: "4px",
                  }}
                >
                  {stage.number}
                </div>
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <p
                    className="label-caps mb-2"
                    style={{
                      color: "#2563eb",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {stage.label}
                  </p>
                  <h3
                    className="heading-display mb-2"
                    style={{
                      color: "white",
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  >
                    {stage.title}
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                      marginBottom: "12px",
                    }}
                  >
                    {stage.body}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {stage.chips.map((chip) => (
                      <span
                        key={chip}
                        style={{
                          background: "#0d1e38",
                          border: "1px solid rgba(37,99,235,0.3)",
                          color: "#93c5fd",
                          fontSize: "0.65rem",
                          padding: "3px 10px",
                          borderRadius: "9999px",
                        }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           JOURNEY OF WATER - Section 3: The Result
           (Centre line terminates here - ref on this section)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={resultSectionRef}
        className="relative py-8 lg:py-10 px-6"
        style={{ zIndex: 1 }}
        data-ocid="journey.result.section"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span
              style={{
                display: "inline-block",
                border: "1px solid #2563eb",
                color: "#2563eb",
                background: "transparent",
                borderRadius: "9999px",
                padding: "4px 16px",
                letterSpacing: "0.1em",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              THE RESULT
            </span>
          </div>

          <h2
            className="heading-display mb-5"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
              color: "white",
              fontWeight: 500,
            }}
          >
            The same water source.{" "}
            <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
              A completely different outcome.
            </span>
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.58)",
              maxWidth: "520px",
              margin: "0 auto 1.5rem",
              fontSize: "0.95rem",
              lineHeight: 1.65,
            }}
          >
            Depending on how the ionized water is used - it becomes either a
            powerful, chemical-free cleansing agent, or a hydrogen-rich water
            for daily consumption.
          </p>

          {/* Two output cards */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {/* Left card - blue (wash water) */}
            <div
              style={{
                flex: 1,
                maxWidth: "420px",
                background: "#142540",
                border: "1px solid rgba(37,99,235,0.3)",
                borderRadius: "16px",
                padding: "28px",
                textAlign: "left",
              }}
              data-ocid="journey.result.card.wash"
            >
              <p
                className="label-caps mb-3"
                style={{
                  color: "#2563eb",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                }}
              >
                OUTPUT ONE
              </p>
              <p
                className="heading-display"
                style={{
                  fontSize: "4.5rem",
                  color: "#2563eb",
                  fontWeight: 300,
                  lineHeight: 1,
                  marginBottom: "10px",
                }}
              >
                11.5
              </p>
              <h3
                style={{
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 500,
                  marginBottom: "10px",
                }}
              >
                High-alkaline{" "}
                <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                  wash water
                </span>
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.62)",
                  fontSize: "0.84rem",
                  lineHeight: 1.65,
                }}
              >
                Ionized water at pH 11.5 emulsifies oil-based pesticide residues
                - lifting them cleanly off produce surfaces without a single
                chemical added. Used wherever produce is washed, at any scale.
              </p>
            </div>

            {/* Right card - gold (drinking water) */}
            <div
              style={{
                flex: 1,
                maxWidth: "420px",
                background: "#142540",
                border: "1px solid rgba(201,146,42,0.4)",
                borderRadius: "16px",
                padding: "28px",
                textAlign: "left",
              }}
              data-ocid="journey.result.card.drink"
            >
              <p
                className="label-caps mb-3"
                style={{
                  color: "#e8b84b",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                }}
              >
                OUTPUT TWO
              </p>
              <p
                className="heading-display"
                style={{
                  fontSize: "4.5rem",
                  color: "#e8b84b",
                  fontWeight: 300,
                  lineHeight: 1,
                  marginBottom: "10px",
                }}
              >
                9.5
              </p>
              <h3
                style={{
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 500,
                  marginBottom: "10px",
                }}
              >
                Hydrogen-rich{" "}
                <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                  drinking water
                </span>
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.62)",
                  fontSize: "0.84rem",
                  lineHeight: 1.65,
                }}
              >
                The same process produces mildly alkaline water carrying
                dissolved molecular hydrogen - 1,200 ppb H&#8322;, with a
                negative ORP. For daily drinking, cooking, and hydration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           JOURNEY OF WATER - Section 4: Closing
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-6 lg:py-8 px-6"
        style={{ zIndex: 1 }}
        data-ocid="journey.closing.section"
      >
        {/* Thin horizontal rule */}
        <div
          style={{
            height: "1px",
            background: "rgba(147,197,253,0.15)",
            maxWidth: "640px",
            margin: "0 auto 1.5rem",
          }}
          aria-hidden="true"
        />
        <div className="max-w-2xl mx-auto text-center">
          <blockquote
            style={{
              fontStyle: "normal",
              fontFamily: "inherit",
              fontWeight: 400,
              fontSize: "clamp(1.25rem, 2.8vw, 1.8rem)",
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.55,
              marginBottom: "1.5rem",
            }}
          >
            Just electricity. Just water. And three years of R&D to get it{" "}
            <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
              exactly right.
            </span>
          </blockquote>
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.32)",
              letterSpacing: "0.05em",
            }}
          >
            60+ NABL-accredited lab tests &middot; Made in India
          </p>
        </div>
      </section>
    </main>
  );
};

export default TheSystem;
