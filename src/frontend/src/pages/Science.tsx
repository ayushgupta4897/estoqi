import { Link } from "@tanstack/react-router";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import VideoModal from "../components/VideoModal";
import VideoPlaceholder from "../components/VideoPlaceholder";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

// ─── Q&A Data ────────────────────────────────────────────────────────────────

interface QAItem {
  number: string;
  question: string;
  answer: React.ReactNode;
}

const qaItems: QAItem[] = [
  {
    number: "01",
    question: "Why can't tap water remove pesticides from your produce?",
    answer: (
      <div className="space-y-5">
        <p className="text-[#e2e8f0] text-base leading-relaxed">
          Most pesticide residues used in modern farming are hydrophobic -
          meaning they bond to the waxy surface of fruits and vegetables and
          repel plain water. Tap water, regardless of how hard you scrub or how
          long you soak, simply cannot break this bond.
        </p>
        <p className="text-[#e2e8f0] text-base leading-relaxed">
          Alkaline ionized water at pH 11.5 changes this. The elevated pH
          increases the saponification effect - breaking down oil-based residues
          the same way soap lifts grease. Without any chemicals. Without any
          additives. Just water, restructured.
        </p>
        <div
          className="border-l-4 rounded-r-lg px-5 py-4"
          style={{
            background: "rgba(255,255,255,0.08)",
            borderColor: "oklch(0.55 0.12 230)",
          }}
        >
          <p
            className="text-xs font-semibold tracking-wide uppercase mb-1"
            style={{ color: "oklch(0.55 0.12 230)" }}
          >
            Lab Verified
          </p>
          <p className="text-2xl font-bold text-white">Up to 99%</p>
          <p
            className="text-sm mt-0.5"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            pesticide residue reduction - verified by NABL-accredited labs SGS
            India and Environcare
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    question: "What is ORP - and why does it matter for the water you drink?",
    answer: (
      <div className="space-y-5">
        <p className="text-[#e2e8f0] text-base leading-relaxed">
          ORP stands for Oxidation-Reduction Potential - a measure of water's
          ability to act as either an oxidant or an antioxidant. Tap water
          typically carries a positive ORP (+200 to +600 mV), meaning it has
          oxidizing potential - it can contribute to cellular oxidative load.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="rounded-lg px-4 py-4 text-center"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Tap Water
            </p>
            <p
              className="text-xl font-bold"
              style={{ color: "oklch(0.72 0.15 30)" }}
            >
              +200 to +600 mV
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Oxidizing potential
            </p>
          </div>
          <div
            className="rounded-lg px-4 py-4 text-center"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "oklch(0.72 0.22 145)" }}
            >
              Estoqi Water
            </p>
            <p className="text-xl font-bold text-white">-200 to -450 mV</p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Antioxidant potential
            </p>
          </div>
        </div>
        <p className="text-[#e2e8f0] text-base leading-relaxed">
          Negative ORP water acts as an electron donor - effectively functioning
          as a reducing agent in the body. This is the same principle behind
          antioxidant-rich foods and supplements, except delivered through every
          glass of water you drink.
        </p>
        <p
          className="text-sm italic pt-4"
          style={{
            color: "rgba(255,255,255,0.45)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          The lower the ORP reading, the higher the antioxidant potential of the
          water.
        </p>
      </div>
    ),
  },
  {
    number: "03",
    question:
      "What is molecular hydrogen - and what does science say about it?",
    answer: (
      <div className="space-y-5">
        <p className="text-[#e2e8f0] text-base leading-relaxed">
          Molecular hydrogen (H&#x2082;) is the smallest molecule in existence.
          Because of its size, it can penetrate cell membranes, cross the
          blood-brain barrier, and reach mitochondria - areas that larger
          antioxidant molecules simply cannot access.
        </p>
        <div
          className="border-l-4 rounded-r-lg px-5 py-4"
          style={{
            background: "rgba(255,255,255,0.08)",
            borderColor: "oklch(0.72 0.22 145)",
          }}
        >
          <p
            className="text-xs font-semibold tracking-wide uppercase mb-1"
            style={{ color: "oklch(0.72 0.22 145)" }}
          >
            Dissolved H&#x2082; Concentration
          </p>
          <p className="text-2xl font-bold text-white">1,200 ppb</p>
          <p
            className="text-sm mt-0.5"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            dissolved molecular hydrogen in every glass of Estoqi drinking water
          </p>
        </div>
        <p className="text-[#e2e8f0] text-base leading-relaxed">
          Over 1,000 peer-reviewed studies have examined the biological effects
          of molecular hydrogen. Research published in Nature Medicine (2007)
          identified H&#x2082; as a selective antioxidant with neuroprotective
          properties. Clinical trials across Japan, South Korea, and the US have
          explored applications in metabolic health, inflammation, and cognitive
          function.
        </p>
        <div
          className="rounded-lg px-4 py-3 flex gap-3 items-start"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <span
            className="text-lg mt-0.5"
            style={{ color: "oklch(0.55 0.12 230)" }}
          >
            &#9432;
          </span>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            ESTOQI does not make medical claims. These references are cited for
            scientific context only.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "04",
    question:
      "What is micro-clustering - and does it actually improve hydration?",
    answer: (
      <div className="space-y-5">
        <p className="text-[#e2e8f0] text-base leading-relaxed">
          Water molecules naturally group together in clusters. Tap water
          typically forms large clusters of 12-16 molecules - which require more
          energy for cells to absorb. Electrolysis restructures these clusters
          into smaller units of 5-6 molecules.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="rounded-lg px-4 py-4 text-center"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Standard Water
            </p>
            <p
              className="text-xl font-bold"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              12-16
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              molecules per cluster
            </p>
          </div>
          <div
            className="rounded-lg px-4 py-4 text-center"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "oklch(0.72 0.22 145)" }}
            >
              Estoqi Water
            </p>
            <p className="text-xl font-bold text-white">5-6</p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              molecules per cluster
            </p>
          </div>
        </div>
        <p className="text-[#e2e8f0] text-base leading-relaxed">
          This micro-clustering is measurable via NMR (Nuclear Magnetic
          Resonance) spectroscopy. The reduced cluster size correlates with
          improved hydration at the cellular level - meaning more of the water
          you drink is actually used by your body.
        </p>
        <p className="text-[#e2e8f0] text-base leading-relaxed">
          Every cup of chai, every glass of water, every meal cooked with Estoqi
          water - brewed or made with water that's been restructured at the
          molecular level.
        </p>
      </div>
    ),
  },
];

// --- QA Flow List - horizontal scroll-jacked pinned flow ---

const QAFlowList: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll-jack logic for desktop
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const outer = outerRef.current;
      if (!outer) return;
      const rect = outer.getBoundingClientRect();
      const wrapperTop = window.scrollY + rect.top;
      const scrolled = window.scrollY - wrapperTop;
      if (scrolled < 0) {
        setActiveIndex(0);
        return;
      }
      const idx = Math.min(
        qaItems.length - 1,
        Math.floor(scrolled / window.innerHeight),
      );
      setActiveIndex(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const handleToggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  // ── Mobile: CSS snap-scroll carousel ──────────────────────────────────────
  if (isMobile) {
    return (
      <div
        className="flex overflow-x-auto snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          gap: 0,
        }}
        data-ocid="science.qa.carousel"
      >
        {qaItems.map((item, i) => (
          <div
            key={item.number}
            className="snap-start flex-shrink-0 w-screen px-4 py-2"
          >
            <QAPanel
              item={item}
              index={i}
              isActive={true}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          </div>
        ))}
      </div>
    );
  }

  // ── Desktop: scroll-jacked pinned flow ────────────────────────────────────
  // Outer wrapper is 400vh tall so that 4 × 100vh scroll zones exist
  return (
    <div
      ref={outerRef}
      style={{ height: `${qaItems.length * 100}vh` }}
      data-ocid="science.qa.flow"
    >
      {/* Sticky viewport-height panel */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "oklch(0.11 0.03 255)",
        }}
      >
        {/* Progress indicator */}
        <div
          className="absolute bottom-10 flex gap-3 items-center"
          aria-hidden="true"
        >
          {qaItems.map((item, i) => (
            <button
              key={item.number}
              type="button"
              aria-label={`Go to question ${i + 1}`}
              onClick={() => {
                const outer = outerRef.current;
                if (!outer) return;
                const rect = outer.getBoundingClientRect();
                const wrapperTop = window.scrollY + rect.top;
                window.scrollTo({
                  top: wrapperTop + i * window.innerHeight,
                  behavior: "smooth",
                });
              }}
              style={{
                width: i === activeIndex ? "28px" : "10px",
                height: "10px",
                borderRadius: "999px",
                background:
                  i === activeIndex
                    ? "oklch(0.72 0.22 145)"
                    : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                padding: 0,
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Counter label */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 text-xs font-mono tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.30)" }}
        >
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(qaItems.length).padStart(2, "0")}
        </div>

        {/* Horizontal card rail */}
        <div
          style={{
            width: "100%",
            maxWidth: "760px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              width: `${qaItems.length * 100}%`,
              transform: `translateX(calc(-${activeIndex} * ${100 / qaItems.length}%))`,
              transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {qaItems.map((item, i) => (
              <div
                key={item.number}
                style={{ width: `${100 / qaItems.length}%`, flexShrink: 0 }}
              >
                <QAPanel
                  item={item}
                  index={i}
                  isActive={i === activeIndex}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint arrow (hidden when all cards viewed) */}
        {activeIndex < qaItems.length - 1 && (
          <div
            className="absolute bottom-24 flex flex-col items-center gap-1"
            style={{ color: "rgba(255,255,255,0.25)" }}
            aria-hidden="true"
          >
            <span className="text-[10px] tracking-widest uppercase">
              Scroll
            </span>
            <svg
              width="14"
              height="20"
              viewBox="0 0 14 20"
              fill="none"
              style={{ animation: "scrollBounce 1.6s ease-in-out infinite" }}
            >
              <title>Scroll down</title>
              <path
                d="M7 1v14M1 11l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Periodic Table Data ─────────────────────────────────────────────────────

interface RefCell {
  symbol: string;
  label: string;
  number: string;
  category: string;
  modalTitle: string;
  modalContent: string;
  estoquiBrand: string;
}

// Category colour map for periodic table cells
const categoryColors: Record<string, string> = {
  "pH Science": "oklch(0.35 0.14 185)", // deep teal
  Ionization: "oklch(0.35 0.14 185)", // deep teal
  "Pesticide Removal": "oklch(0.30 0.12 145)", // deep green
  "Food Safety": "oklch(0.30 0.12 145)", // deep green
  Hydrogen: "oklch(0.32 0.16 280)", // indigo/purple
  "Water Chemistry": "oklch(0.33 0.13 200)", // dark cyan
  Electrolysis: "oklch(0.33 0.13 200)", // dark cyan
  ORP: "oklch(0.36 0.14 60)", // amber/gold
  Oxidation: "oklch(0.36 0.14 60)", // amber/gold
  Certification: "oklch(0.28 0.10 255)", // deeper navy
  Measurement: "oklch(0.32 0.16 280)", // indigo
};

function getCellBg(category: string): string {
  for (const key of Object.keys(categoryColors)) {
    if (category.includes(key)) return categoryColors[key];
  }
  return "oklch(0.20 0.06 255)";
}

const refCells: RefCell[] = [
  // Row 1: pH Science, Water Chemistry, Electrolysis, Electrolysis
  {
    symbol: "pH",
    label: "Potential of Hydrogen",
    number: "01",
    category: "pH Science",
    modalTitle: "pH Scale & Ionization",
    modalContent:
      "pH is a logarithmic scale measuring hydrogen ion concentration in a solution. Each unit represents a 10x change in acidity/alkalinity. At pH 11.5, alkaline ionized water achieves the saponification threshold necessary to emulsify oil-based residue compounds on produce surfaces. Verified across NABL-certified test protocols by SGS India and Environcare Laboratories.",
    estoquiBrand:
      "ESTOQI produces two precise pH streams simultaneously - 11.5 for washing your produce, 9.5 for drinking - engineered to hit the exact thresholds where pH chemistry becomes useful.",
  },
  {
    symbol: "NMR",
    label: "Nuclear Magnetic Resonance",
    number: "04",
    category: "Water Chemistry",
    modalTitle: "NMR Spectroscopy",
    modalContent:
      "NMR spectroscopy is used to measure water cluster size. Standard water: 12-16 molecule clusters. Ionized/micro-clustered water: 5-6 molecule clusters. Smaller clusters correlate with faster cellular absorption. NMR analysis conducted under controlled lab conditions.",
    estoquiBrand:
      "ESTOQI's electrolysis process restructures water into micro-clusters of 5-6 molecules - measurably smaller than standard tap water, and independently verifiable via NMR analysis.",
  },
  {
    symbol: "TiO2",
    label: "Titanium Electrode Plates",
    number: "05",
    category: "Electrolysis",
    modalTitle: "Titanium-Platinum Electrodes",
    modalContent:
      "Surgical-grade titanium plates coated with platinum are used in Estoqi's electrolysis chamber. Titanium is chosen for its non-reactivity, corrosion resistance, and durability. The platinum coating enhances electron transfer efficiency during electrolysis. No heavy metal leaching - verified under extended stress tests.",
    estoquiBrand:
      "ESTOQI uses surgical-grade titanium electrode plates - the same standard applied in medical-grade equipment - to drive continuous, clean electrolysis without contamination or degradation.",
  },
  {
    symbol: "EC",
    label: "Electrolysis Chamber",
    number: "10",
    category: "Electrolysis",
    modalTitle: "Electrolysis Chamber",
    modalContent:
      "Estoqi's electrolysis chamber splits tap water using a controlled electrical current across titanium-platinum electrode plates. The process separates water into alkaline (cathode) and acidic (anode) streams simultaneously. Nothing is added to the water. The only inputs are water and electricity.",
    estoquiBrand:
      "ESTOQI's electrolysis chamber is the core of the entire system - one chamber, two ionic streams, no additives. Every glass you drink and every vegetable you wash passes through this process.",
  },
  // Row 2: ORP, ORP, Hydrogen, Measurement
  {
    symbol: "ORP",
    label: "Oxidation Reduction Potential",
    number: "02",
    category: "ORP",
    modalTitle: "ORP - Oxidation-Reduction Potential",
    modalContent:
      "ORP measures electrical potential in millivolts. Positive ORP = oxidizing. Negative ORP = reducing/antioxidant. Standard tap water: +200 to +600 mV. Estoqi drinking water: -200 to -450 mV. Measured via platinum electrode probe in controlled conditions. Source: Shirahata et al. (1997), BBRC.",
    estoquiBrand:
      "ESTOQI drinking water is measured at -200 to -450 mV - firmly in the negative ORP range, making it an electron donor rather than an oxidant with every glass you drink.",
  },
  {
    symbol: "mV",
    label: "Millivolt ORP Scale",
    number: "09",
    category: "ORP",
    modalTitle: "Millivolt (mV) ORP Scale",
    modalContent:
      "Millivolt (mV) is the unit used to express ORP readings. The higher the negative mV reading, the greater the antioxidant potential. Estoqi's -200 to -450 mV range places it firmly in the negative ORP (antioxidant) category - measurably different from standard tap or RO water, which typically reads +200 to +400 mV.",
    estoquiBrand:
      "ESTOQI's drinking stream consistently measures between -200 and -450 mV - a range that puts it at the opposite end of the scale from the tap and RO water most people drink every day.",
  },
  {
    symbol: "H2",
    label: "Molecular Hydrogen",
    number: "03",
    category: "Hydrogen",
    modalTitle: "Molecular Hydrogen (H2)",
    modalContent:
      "Molecular hydrogen (H2) at concentrations of 1,200 ppb. Key property: smallest molecule - can cross blood-brain barrier and enter mitochondria. Reference: Ohsawa I et al. (2007) 'Hydrogen acts as a therapeutic antioxidant.' Nature Medicine 13:688-694.",
    estoquiBrand:
      "ESTOQI's drinking stream delivers 1,200 ppb dissolved molecular hydrogen - one of the highest concentrations available for home use, produced continuously without any supplementation.",
  },
  {
    symbol: "ppb",
    label: "Parts Per Billion (H2)",
    number: "06",
    category: "Measurement",
    modalTitle: "ppb - Parts Per Billion",
    modalContent:
      "ppb (parts per billion) is the standard unit for measuring dissolved molecular hydrogen in water. Therapeutic research typically references concentrations from 200-1,600 ppb. Estoqi drinking water delivers 1,200 ppb dissolved H2. Measured via drop reagent method and dissolved hydrogen meter calibrated to ISO standards.",
    estoquiBrand:
      "ESTOQI's 1,200 ppb H2 concentration sits in the upper range of what current research examines - verified via ISO-calibrated dissolved hydrogen meters, not estimated.",
  },
  // Row 3: Certification, Certification, Certification, Food Safety
  {
    symbol: "SGS",
    label: "SGS India Lab Certification",
    number: "07",
    category: "Certification",
    modalTitle: "SGS India - NABL Testing",
    modalContent:
      "SGS India is a NABL-accredited testing and certification body. ESTOQI's produce wash tests were conducted under SGS India's food safety testing protocols - verifying pesticide residue reduction percentages across multiple produce categories including tomatoes, okra, spinach, grapes, and leafy greens.",
    estoquiBrand:
      "ESTOQI chose SGS India - one of the world's largest testing and certification companies - to independently verify its pesticide reduction claims. The results are published without modification.",
  },
  {
    symbol: "NABL",
    label: "Nat. Accreditation Board",
    number: "08",
    category: "Certification",
    modalTitle: "NABL Accreditation",
    modalContent:
      "NABL (National Accreditation Board for Testing and Calibration Laboratories) is India's apex accreditation body for testing labs. NABL certification ensures that laboratory test results meet internationally accepted standards of accuracy, repeatability, and traceability. All ESTOQI lab tests are conducted at NABL-certified facilities.",
    estoquiBrand:
      "Every ESTOQI claim backed by lab data was tested at a NABL-certified facility. This is the standard we hold ourselves to - not internal testing, not estimates, not proprietary methodology.",
  },
  {
    symbol: "ENV",
    label: "Environcare Laboratory",
    number: "11",
    category: "Certification",
    modalTitle: "Environcare Laboratories",
    modalContent:
      "Environcare Laboratories is a NABL-accredited environmental and food testing lab in India. ESTOQI's wash water efficacy tests were independently conducted at Environcare, providing a second-source verification of pesticide residue reduction claims. Reports are available upon request.",
    estoquiBrand:
      "ESTOQI commissioned Environcare as a second independent testing body - separate from SGS India - so that no single lab's methodology could define the outcome. Dual verification, dual confidence.",
  },
  {
    symbol: "60+",
    label: "NABL Lab Tests Conducted",
    number: "12",
    category: "Food Safety",
    modalTitle: "60+ Independent Lab Tests",
    modalContent:
      "ESTOQI has conducted 60+ independent NABL-certified lab tests across multiple produce categories and water quality parameters. Test parameters include: ORP, pH, dissolved hydrogen concentration, TDS, pesticide residue reduction (multiple active ingredient families), and shelf-life extension (measured against control samples).",
    estoquiBrand:
      "ESTOQI's 60+ NABL-certified tests span produce categories, water quality parameters, and shelf-life outcomes - building a body of evidence, not a single claim. Lab reports available upon request.",
  },
];

// ─── QA Panel Component ───────────────────────────────────────────────────────

interface QAPanelProps {
  item: QAItem;
  index: number;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const QAPanel: React.FC<QAPanelProps> = ({
  item,
  index,
  isActive,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      style={{
        opacity: isActive ? 1 : 0.35,
        transform: isActive ? "scale(1)" : "scale(0.97)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        padding: "0 16px",
      }}
      data-ocid={`science.qa.item.${index + 1}`}
    >
      {/* Card: question header + answer both live inside the same dark navy box */}
      <div
        className="overflow-hidden"
        style={{
          background: "oklch(0.17 0.05 255)",
          borderRadius: "0.75rem",
          border: isActive
            ? "1px solid rgba(255,255,255,0.18)"
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: isActive
            ? "0 0 60px oklch(0.35 0.1 255 / 0.25), 0 24px 48px rgba(0,0,0,0.4)"
            : "none",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Question row - clickable */}
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={onToggle}
          className="w-full flex items-start gap-5 py-8 px-8 cursor-pointer select-none
            transition-all duration-200 hover:brightness-110
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]
            focus-visible:outline-[oklch(0.55_0.12_230)]"
          style={{ background: "transparent" }}
        >
          {/* Number badge */}
          <span
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold tracking-wider mt-0.5"
            style={{
              background: "oklch(0.22 0.07 255)",
              color: "oklch(0.68 0.1 230)",
              border: "1px solid oklch(0.68 0.1 230 / 0.35)",
            }}
          >
            {item.number}
          </span>

          {/* Question text */}
          <span className="flex-1 text-white font-semibold text-xl md:text-2xl text-left leading-snug">
            {item.question}
          </span>

          {/* Arrow toggle */}
          <span
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
            style={{
              background: isOpen
                ? "oklch(0.38 0.12 255)"
                : "oklch(0.22 0.05 255)",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition:
                "transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.25s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <title>{isOpen ? "Collapse answer" : "Expand answer"}</title>
              <path
                d="M2 5L7 10L12 5"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {/* Answer - expands inside the same dark card */}
        <div
          style={{
            maxHeight: isOpen ? "900px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.10)",
              margin: "0 2rem",
            }}
          />
          <div className="px-8 py-7">{item.answer}</div>
        </div>
      </div>
    </div>
  );
};

// ─── Periodic Table Modal ─────────────────────────────────────────────────────

interface CellModalProps {
  cell: RefCell | null;
  onClose: () => void;
}

const CellModal: React.FC<CellModalProps> = ({ cell, onClose }) => {
  useEffect(() => {
    if (!cell) return;
    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [cell, onClose]);

  if (!cell) return null;

  return ReactDOM.createPortal(
    <div
      className="flex items-center justify-center p-4"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10,18,50,0.85)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
      data-ocid="science.ref_modal.dialog"
    >
      <div
        className="relative max-w-md w-full rounded-xl p-8 animate-fade-in-scale"
        style={{
          background: "oklch(0.16 0.05 255)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close reference panel"
          data-ocid="science.ref_modal.close_button"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center
            text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <title>Close</title>
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Symbol */}
        <div className="mb-6">
          <span
            className="text-5xl font-bold tracking-tighter"
            style={{ color: "oklch(0.68 0.1 230)" }}
          >
            {cell.symbol}
          </span>
          <p className="text-xs tracking-widest uppercase text-white/40 mt-1">
            {cell.label}
          </p>
        </div>

        <h3 className="text-white text-xl font-semibold mb-4">
          {cell.modalTitle}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          {cell.modalContent}
        </p>

        {/* ESTOQI brand mention line */}
        <div className="mt-6 pl-3" style={{ borderLeft: "2px solid #5BB8D4" }}>
          <p
            className="text-sm leading-relaxed italic"
            style={{ color: "#5BB8D4" }}
          >
            {cell.estoquiBrand}
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
          <span
            className="text-xs font-mono"
            style={{ color: "oklch(0.68 0.1 230)" }}
          >
            REF #{cell.number}
          </span>
          <button
            type="button"
            onClick={onClose}
            data-ocid="science.ref_modal.confirm_button"
            className="text-xs px-4 py-2 rounded transition-colors hover:opacity-90"
            style={{ background: "oklch(0.35 0.1 255)", color: "white" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

// ─── pH Spectrum Slider ──────────────────────────────────────────────────────

const phStations = [
  {
    ph: 3.5,
    label: "Soda / Acid Wash",
    description:
      "Highly acidic - used industrially for cleaning and stripping.",
    color: "#ef4444",
  },
  {
    ph: 5,
    label: "Black Coffee",
    description: "Mildly acidic. Common in daily beverages.",
    color: "#f97316",
  },
  {
    ph: 7,
    label: "Neutral Water",
    description: "Pure water - balanced pH, no charge.",
    color: "#22c55e",
  },
  {
    ph: 8,
    label: "Sea Water",
    description: "Slightly alkaline - found in nature.",
    color: "#3b82f6",
  },
  {
    ph: 9.5,
    label: "ESTOQI Drinking Water",
    description:
      "Hydrogen-rich ionized water for daily hydration. Negative ORP. 1,200 ppb molecular hydrogen.",
    color: "#2563eb",
    estoqi: true as const,
  },
  {
    ph: 11.5,
    label: "ESTOQI Produce Wash",
    description:
      "High-alkaline ionized water engineered to emulsify oil-based pesticide residues on produce surfaces.",
    color: "#1d4ed8",
    estoqi: true as const,
  },
  {
    ph: 12.5,
    label: "Bleach / Caustic",
    description: "Strongly alkaline - used in industrial sanitation.",
    color: "#7c3aed",
  },
];

const PhSpectrumSlider: React.FC = () => {
  const [phValue, setPhValue] = useState(7);

  const getNearestStation = (ph: number) =>
    phStations.reduce((prev, curr) =>
      Math.abs(curr.ph - ph) < Math.abs(prev.ph - ph) ? curr : prev,
    );

  const getPhColor = (ph: number) => {
    if (ph < 4) return "#ef4444";
    if (ph < 6) return "#f97316";
    if (ph < 8) return "#22c55e";
    if (ph < 10) return "#3b82f6";
    if (ph < 12) return "#1d4ed8";
    return "#7c3aed";
  };

  const station = getNearestStation(phValue);

  return (
    <section
      className="py-16 md:py-20"
      style={{
        background: "linear-gradient(to bottom, oklch(0.11 0.03 255), #080f1e)",
      }}
      data-ocid="science.ph_spectrum.section"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10 fade-up">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#2563eb" }}
          >
            PH SPECTRUM
          </p>
          <h2
            className="heading-display text-white mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            <h2
              className="heading-display text-white mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 700,
              }}
            >
              Explore the pH{" "}
              <em style={{ fontStyle: "italic", color: "#60a5fa" }}>
                spectrum
              </em>
            </h2>
            <em style={{ fontStyle: "italic", color: "#60a5fa" }}>Spectrum</em>
          </h2>
          <p
            className="text-sm max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            pH measures how acidic or alkaline a substance is - from 0 (most
            acidic) to 14 (most alkaline). Drag the slider to see where everyday
            substances sit, and where Estoqi's two outputs land.
          </p>
        </div>

        {/* Slider */}
        <div className="relative mb-4">
          <div
            className="relative h-3 rounded-full overflow-hidden"
            style={{
              background:
                "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #1d4ed8, #7c3aed)",
            }}
          >
            <div
              className="absolute top-0 h-full w-0.5 bg-white rounded-full shadow-lg"
              style={{
                left: `calc(${((phValue - 1) / 13) * 100}% - 1px)`,
                boxShadow: "0 0 8px rgba(255,255,255,0.8)",
              }}
            />
          </div>
          <input
            type="range"
            min="1"
            max="14"
            step="0.1"
            value={phValue}
            onChange={(e) => setPhValue(Number.parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="pH value slider"
            data-ocid="science.ph_spectrum.slider"
          />
        </div>

        {/* Station markers */}
        <div className="flex justify-between text-xs mb-6 px-0">
          {phStations.map((s) => (
            <div key={s.ph} className="flex flex-col items-center gap-1">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: s.color }}
              />
              <span
                className="hidden sm:block text-center"
                style={{
                  fontSize: "9px",
                  maxWidth: "44px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                pH {s.ph}
              </span>
            </div>
          ))}
        </div>

        {/* Drag hint */}
        <div className="flex justify-center mb-6">
          <span
            className="text-xs tracking-widest uppercase"
            style={{
              color: "rgba(255,255,255,0.3)",
              animation: "scrollBounce 1.6s ease-in-out infinite",
            }}
          >
            \u2b64 Drag to explore
          </span>
        </div>

        {/* Dynamic info card */}
        <div
          className="rounded-2xl p-6 transition-all duration-500 fade-up"
          style={{
            background: "#142540",
            border: `1px solid ${
              station.estoqi ? "#2563eb" : "rgba(37,99,235,0.2)"
            }`,
            boxShadow: station.estoqi
              ? "0 0 32px rgba(37,99,235,0.15)"
              : "none",
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div
                className="text-4xl font-bold mb-1"
                style={{ color: getPhColor(phValue) }}
              >
                pH {phValue.toFixed(1)}
              </div>
              <div className="text-lg font-semibold text-white">
                {station.label}
              </div>
            </div>
            {station.estoqi && (
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(37,99,235,0.2)",
                  border: "1px solid #2563eb",
                  color: "#93c5fd",
                }}
              >
                ESTOQI
              </div>
            )}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#93c5fd" }}>
            {station.description}
          </p>
        </div>
      </div>
    </section>
  );
};

// ─── Main Science Page ───────────────────────────────────────────────────

const Science: React.FC = () => {
  const [activeCell, setActiveCell] = useState<RefCell | null>(null);
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);
  useScrollAnimation();

  const videoSnippets = [
    {
      id: "ph-problem",
      category: "The pH Problem",
      title:
        "Does Washing Vegetables Remove Pesticides? The pH Truth Nobody Talks About",
      description:
        "Why plain water fails - and what pH 11.5 actually does to oil-based pesticide residues on your produce.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "oil-experiment",
      category: "The Oil Experiment",
      title: "How to Remove Pesticides From Vegetables at Home | The Oil Test",
      description:
        "A simple home experiment that shows the emulsification difference between tap water and ionized alkaline water.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "electrolysis",
      category: "The Electrolysis Explainer",
      title:
        "What Is Water Ionization? How Ionized Water Removes Pesticides From Food",
      description:
        "Inside the ionization chamber - titanium plates, ionic separation, and the science behind pH 9.5 and 11.5.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "orp-shelf-life",
      category: "The ORP & Shelf Life Story",
      title:
        "How to Keep Vegetables Fresh Longer | ORP, Oxidation and Shelf Life Explained",
      description:
        "How negative ORP and reduced oxidative stress extend produce shelf life by up to 2.2x - measurably, reproducibly.",
      url: "",
    },
    {
      id: "molecular-hydrogen",
      category: "The Molecular Hydrogen Story",
      title:
        "What Is Molecular Hydrogen in Water? Health Benefits and Science Explained",
      description:
        "A look at molecular hydrogen, ORP, and why micro-clustering matters for hydration efficiency.",
      url: "",
    },
  ];

  const homeTestingSteps = [
    {
      number: "01",
      title: "Prepare Your Sample",
      body: "Take 100ml of tap water and 100ml of ESTOQI ionized wash water (pH 11.5). Use identical glass containers for both.",
    },
    {
      number: "02",
      title: "Apply to Produce",
      body: "Submerge equal portions of the same produce in each container. Let sit for 3 minutes at room temperature. Do not agitate.",
    },
    {
      number: "03",
      title: "Compare and Upload to the Collective",
      body: "After 3 minutes, compare the residue visible in each container. The ionized water will show visible emulsification of surface residues. Photograph the result and share it with others.",
    },
  ];

  return (
    <main className="science-dark min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Hero background image — blends smoothly into page via gradient mask */}
        <img
          src="/assets/generated/science-hero-vegetables.dim_1920x900.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        {/* Radial vignette + bottom-fade blending into page background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 0%, #07111f 80%), linear-gradient(to bottom, #07111f 0%, transparent 25%, transparent 65%, #07111f 100%)",
          }}
        />
        {/* Subtle dark overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(7,17,31,0.45)" }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
          <p className="label-caps text-estoqi-blue mb-6 animate-slide-up">
            The Science
          </p>
          <h1
            className="heading-display text-white text-5xl md:text-7xl mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            The Science Behind{" "}
            <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
              Estoqi.
            </span>
          </h1>
          <p
            className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Understanding is the first step toward better choices. Four ideas
            that explain everything Estoqi does.
          </p>
        </div>
      </section>

      {/* Visual Flow: 4 Q&A Horizontal Scroll-Jacked Flow */}
      <section
        data-ocid="science.qa.section"
        style={{ background: "oklch(0.11 0.03 255)" }}
      >
        {/* Section header - outside the scroll-jacked wrapper so it scrolls away first */}
        <div className="max-w-4xl mx-auto px-6 pt-20 md:pt-28 pb-12 text-center fade-up">
          <h2 className="heading-display text-white text-4xl md:text-5xl mb-4">
            Four Questions. Four Answers.
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Scroll through each question - the answer opens inside the card.
          </p>
        </div>

        {/* Scroll-jacked horizontal flow (desktop) / snap carousel (mobile) */}
        <QAFlowList />

        {/* Spacer so next section isn't immediately under the sticky panel on desktop */}
        <div className="hidden md:block h-16" />
      </section>

      {/* ─── pH Spectrum Slider ──────────────────────────────────────────── */}
      <PhSpectrumSlider />

      {/* ─── Video Snippets ─────────────────────────────────────────────── */}
      <section
        className="pt-12 pb-24 md:py-24"
        style={{ background: "oklch(0.97 0.008 90)" }}
        data-ocid="science.videos.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 fade-up">
            <p
              className="label-caps mb-4"
              style={{ color: "oklch(0.35 0.1 255)" }}
            >
              Science in Motion
            </p>
            <h2
              className="heading-display text-4xl md:text-5xl mb-4"
              style={{ color: "oklch(0.14 0.04 255)" }}
            >
              See the Science{" "}
              <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                in Action
              </span>
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "oklch(0.42 0.04 255)" }}
            >
              Watch how ionization works at the molecular level, and what it
              means for your food and water.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-up stagger-1">
            {videoSnippets.map((clip, i) => (
              <div
                key={clip.id}
                className="group rounded-xl overflow-hidden cursor-pointer
                  transition-all duration-300 hover:-translate-y-1
                  hover:shadow-[0_12px_40px_oklch(0.35_0.1_255_/_0.15)]"
                style={{
                  background: "white",
                  border: "1px solid oklch(0.88 0.008 255)",
                }}
                data-ocid={`science.video.item.${i + 1}`}
              >
                {/* Thumbnail / Play area */}
                <div
                  className="relative h-48"
                  style={{ background: "oklch(0.14 0.04 255)" }}
                >
                  <VideoPlaceholder
                    label={clip.title}
                    overlayText="Play"
                    size="md"
                    className="h-full"
                    onClick={() =>
                      setActiveVideo({
                        url: clip.url || "#",
                        title: clip.title,
                      })
                    }
                  />
                  {/* Episode number badge */}
                  <span
                    className="absolute top-3 left-3 text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      background: "oklch(0.35 0.1 255 / 0.85)",
                      color: "oklch(0.75 0.1 230)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Category badge */}
                  <span
                    className="absolute top-3 right-3 text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded"
                    style={{
                      background: "oklch(0.72 0.22 145 / 0.9)",
                      color: "white",
                    }}
                  >
                    {clip.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="px-5 py-5">
                  <h3
                    className="font-semibold text-sm leading-snug mb-2"
                    style={{ color: "oklch(0.14 0.04 255)" }}
                  >
                    {clip.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.48 0.04 255)" }}
                  >
                    {clip.description}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveVideo({
                        url: clip.url || "#",
                        title: clip.title,
                      })
                    }
                    className="mt-4 flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors duration-200"
                    style={{ color: "oklch(0.35 0.1 255)" }}
                    data-ocid={`science.video.play_button.${i + 1}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <title>Play</title>
                      <circle
                        cx="7"
                        cy="7"
                        r="6.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M5.5 4.5L10 7L5.5 9.5V4.5Z"
                        fill="currentColor"
                      />
                    </svg>
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical References: Periodic Table Grid */}
      <section
        className="pt-12 pb-24 lg:pb-32"
        style={{ background: "oklch(0.14 0.04 255)" }}
        data-ocid="science.refs.section"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-blue mb-4">
              Technical References
            </p>
            <h2 className="heading-display text-white text-4xl md:text-5xl mb-4">
              The Science,{" "}
              <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                Indexed.
              </span>
            </h2>
            <p className="text-white/50 text-base max-w-lg mx-auto">
              The science behind the system - indexed and verified. Click any
              element to explore.
            </p>
          </div>

          {/* Periodic Grid - 4 columns x 3 rows */}
          <div
            className="grid gap-4 fade-up stagger-2"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {refCells.map((cell) => (
              <button
                key={cell.number}
                type="button"
                onClick={() => setActiveCell(cell)}
                data-ocid={`science.ref.item.${cell.number}`}
                className="group relative flex flex-col items-center justify-between p-5 rounded-lg
                  text-center cursor-pointer transition-all duration-300
                  hover:scale-105 hover:brightness-125
                  hover:shadow-[0_0_36px_rgba(74,144,217,0.30)]
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-[oklch(0.55_0.12_230)] focus-visible:outline-offset-2"
                style={{
                  background: getCellBg(cell.category),
                  border: "1px solid rgba(255,255,255,0.14)",
                  minHeight: "140px",
                }}
              >
                {/* Atomic number */}
                <span
                  className="absolute top-2.5 left-3 text-xs font-mono font-semibold"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {cell.number}
                </span>

                {/* Category chip */}
                <span
                  className="absolute top-2.5 right-2.5 text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {cell.category}
                </span>

                {/* Symbol - large */}
                <span
                  className="mt-6 text-4xl font-black tracking-tight leading-none
                    group-hover:text-white transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  {cell.symbol}
                </span>

                {/* Label */}
                <span
                  className="mt-3 text-xs font-medium tracking-wide leading-tight text-center"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                >
                  {cell.label}
                </span>

                {/* Hover glow overlay */}
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.10) 100%)",
                  }}
                />
              </button>
            ))}
          </div>

          <p className="text-center text-white/25 text-xs mt-10 tracking-wider uppercase">
            Click any element to view full reference
          </p>
        </div>
      </section>

      {/* ─── Home Testing Protocol ───────────────────────────────────────── */}
      <section
        className="py-24 md:py-32"
        style={{ background: "oklch(0.94 0.012 255)" }}
        data-ocid="science.home_testing.section"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 fade-up">
            <p
              className="label-caps mb-4"
              style={{ color: "oklch(0.35 0.1 255)" }}
            >
              Verify It Yourself
            </p>
            <h2
              className="heading-display text-4xl md:text-5xl mb-4"
              style={{ color: "oklch(0.14 0.04 255)" }}
            >
              Home Testing{" "}
              <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                Protocol
              </span>
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "oklch(0.42 0.04 255)" }}
            >
              A reproducible method for verifying ionization performance in your
              own kitchen.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 fade-up stagger-1">
            {homeTestingSteps.map((step, i) => (
              <div
                key={step.number}
                className="relative rounded-xl p-7
                  transition-all duration-300 hover:-translate-y-1
                  hover:shadow-[0_12px_40px_oklch(0.35_0.1_255_/_0.1)]"
                style={{
                  background: "white",
                  border: "1px solid oklch(0.88 0.008 255)",
                }}
                data-ocid={`science.home_testing.step.${i + 1}`}
              >
                {/* Large number */}
                <div
                  className="text-6xl font-black leading-none mb-5 select-none"
                  style={{
                    color: "oklch(0.35 0.1 255 / 0.12)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {step.number}
                </div>

                {/* Step number label */}
                <span
                  className="inline-block text-xs font-semibold tracking-widest uppercase mb-3
                    px-2.5 py-1 rounded-full"
                  style={{
                    background: "oklch(0.93 0.04 255)",
                    color: "oklch(0.35 0.1 255)",
                  }}
                >
                  Step {step.number}
                </span>

                <h3
                  className="font-semibold text-lg mb-3 leading-snug"
                  style={{ color: "oklch(0.14 0.04 255)" }}
                >
                  {step.number === "03" ? (
                    <>
                      Compare and Upload to the{" "}
                      <Link
                        to="/collective"
                        className="underline underline-offset-2"
                        style={{ color: "#2563eb" }}
                        data-ocid="science.home_testing.collective_link"
                      >
                        Collective
                      </Link>
                    </>
                  ) : (
                    step.title
                  )}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.48 0.04 255)" }}
                >
                  {step.body}
                </p>

                {/* Connector arrow - hidden on last card */}
                {i < homeTestingSteps.length - 1 && (
                  <span
                    className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10
                      w-7 h-7 rounded-full items-center justify-center shadow-sm"
                    style={{
                      background: "oklch(0.35 0.1 255)",
                      color: "white",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <title>Next step</title>
                      <path
                        d="M1 5H9M5 1L9 5L5 9"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Note box */}
          <div
            className="max-w-3xl mx-auto rounded-xl px-7 py-6 flex gap-4 items-start fade-up"
            style={{
              background: "oklch(0.93 0.04 255)",
              border: "1px solid oklch(0.35 0.1 255 / 0.18)",
            }}
            data-ocid="science.home_testing.note"
          >
            <span
              className="flex-shrink-0 mt-0.5 text-xl"
              style={{ color: "oklch(0.35 0.1 255)" }}
            >
              &#9432;
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.28 0.06 255)" }}
            >
              ESTOQI's internal testing follows NABL-accredited lab methodology
              adapted for domestic environments. Independent verification
              available upon request.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA - IF YOU'VE READ THIS FAR */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.11 0.03 255)" }}
        data-ocid="science.cta.section"
      >
        <div className="max-w-2xl mx-auto px-6 text-center fade-up">
          {/* Eyebrow */}
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ color: "#2563eb" }}
          >
            IF YOU'VE READ THIS FAR
          </p>

          {/* H2 */}
          <h2
            className="heading-display text-white mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.15,
              fontWeight: 700,
            }}
          >
            The problem is real.{" "}
            <em style={{ fontStyle: "italic", color: "#60a5fa" }}>
              Now you know.
            </em>
          </h2>

          {/* Body */}
          <p
            className="text-base md:text-lg leading-relaxed mb-5"
            style={{ color: "rgba(255,255,255,0.68)" }}
          >
            Most people wash their vegetables and assume the job is done. You
            know now that it isn't. That gap - between assumption and reality -
            is exactly why Estoqi exists.
          </p>

          {/* Sub-line */}
          <p
            className="text-sm italic mb-10"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            Awareness is the beginning. What you do with it is yours.
          </p>

          {/* Two CTA links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/the-system"
              data-ocid="science.cta.system_link"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{
                background: "#2563eb",
                color: "#fff",
              }}
            >
              See How Estoqi Fixes It
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <title>Arrow</title>
                <path
                  d="M1 5H13M8 1L13 5L8 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              to="/estoqi-labs"
              data-ocid="science.cta.labs_link"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{
                background: "transparent",
                border: "1px solid rgba(37,99,235,0.5)",
                color: "#60a5fa",
              }}
            >
              Explore What We Found
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <title>Arrow</title>
                <path
                  d="M1 5H13M8 1L13 5L8 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Periodic Table Detail Modal */}
      <CellModal cell={activeCell} onClose={() => setActiveCell(null)} />

      {/* Video Modal */}
      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title}
        videoUrl={activeVideo?.url}
      />
    </main>
  );
};

export default Science;
