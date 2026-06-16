import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type React from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · The System
   The Journey of Water, 4 stages on a single quiet scroll.
   ===================================================================== */

interface Stage {
  number: string;
  side: "L" | "R";
  label: string;
  title: React.ReactNode;
  body: string;
  image: string;
  alt: string;
}

const STAGES: Stage[] = [
  {
    number: "01",
    side: "L",
    label: "Where it begins",
    title: (
      <>
        Ordinary tap water. <em>Nothing added.</em>
      </>
    ),
    body: "The process starts with the water already in your pipes, municipal, filtered, whatever you have. No pre-treatment required. The water enters exactly as it is.",
    image: "/concepts/sys_step01_tap.webp",
    alt: "An Indian kitchen tap; a hand holds a glass under the flowing stream of ordinary municipal water.",
  },
  {
    number: "02",
    side: "R",
    label: "The process",
    title: (
      <>
        The electrolysis <em>chamber.</em>
      </>
    ),
    body: "Titanium electrode plates transform the water. A controlled electrical current through the titanium plates changes the ionic charge of the water molecules to a higher pH of 9.5 and 11.5–12.",
    image: "/concepts/ch04_the_water.webp",
    alt: "A laboratory electrolysis cell with titanium plates inside, ports for water in and out.",
  },
  {
    number: "03",
    side: "L",
    label: "Output 01 · pH 9.5",
    title: (
      <>
        Hydrogen-rich <em>drinking water.</em>
      </>
    ),
    body: "The mildly alkaline output carries dissolved molecular hydrogen, the smallest molecule in existence, small enough to pass through cell membranes. 1,200 ppb H₂. Negative ORP. For daily drinking, cooking, and hydration, made the moment you turn the tap.",
    image: "/concepts/sys_step03_drinking.webp",
    alt: "A tall glass of pH 9.5 hydrogen-rich drinking water with visible micro-bubbles clinging to the inside of the glass.",
  },
  {
    number: "04",
    side: "R",
    label: "Output 02 · pH 11.5",
    title: (
      <>
        Ionized <em>washing water.</em>
      </>
    ),
    body: "At pH 11.5 the water emulsifies oil-based pesticide residues on contact, the same principle that makes industrial degreasers work, but produced from plain tap water. Pesticide residues that were engineered to survive neutral water cannot survive this. Used wherever produce is washed, at any scale.",
    image: "/concepts/r2_process_water.webp",
    alt: "Ionized wash water arcing onto spinach, droplets caught mid-fall.",
  },
];

const TheSystem: React.FC = () => {
  useScrollAnimation();

  return (
    <main className="bg-bone text-ink">
      {/* ──────────────────────────────────────────────────────────────
          1 · HERO, quiet, no full-bleed photograph (the photographs
          live inside the stages). Just the title plate.
      ─────────────────────────────────────────────────────────────── */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-20 px-6 lg:px-14 border-b border-stone-soft">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <div className="label-eyebrow mb-7">The Estoqi System</div>
            <h1 className="h-display-xl text-ink max-w-[18ch] mb-7">
              The machine that transforms <em>your water.</em>
            </h1>
            <p className="font-display text-graphite text-[20px] lg:text-[24px] leading-[1.45] max-w-[58ch] font-light">
              A machine built to achieve the highest efficacy, with two
              dedicated outputs for washing and drinking.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          2 · THE JOURNEY, four stages. Alternating image / text.
          Quiet vertical rule between sections does the work of the old
          centerline animation.
      ─────────────────────────────────────────────────────────────── */}
      <section className="bg-bone">
        {STAGES.map((stage, i) => (
          <StageBlock key={stage.number} stage={stage} isLast={i === STAGES.length - 1} />
        ))}
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CLOSING, quiet, full-width, ink section
          (Per Feb 2026 brief: 'same water source / different outcome'
          section removed. Outputs now live inside Stages 03 + 04.)
      ─────────────────────────────────────────────────────────────── */}
      <section className="bg-ink text-bone py-20 lg:py-24 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto text-center reveal">
          <span className="rule-vermillion mx-auto mb-8 block" />
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/estoqi-labs" className="btn-bone">
              See the lab work <ArrowRight size={13} />
            </Link>
            <Link to="/book-consultation" className="btn-ghost text-bone">
              Book a Demo <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

/* ───────────────────────────────────────────────────────────────────
   StageBlock, one stage in the journey
─────────────────────────────────────────────────────────────────── */

interface StageBlockProps {
  stage: Stage;
  isLast: boolean;
}
const StageBlock: React.FC<StageBlockProps> = ({ stage, isLast }) => {
  const textFirst = stage.side === "L";
  return (
    <div
      className={`relative grid grid-cols-1 lg:grid-cols-2 ${
        isLast ? "" : "border-b border-stone-soft"
      }`}
    >
      {/* image */}
      <div
        className={`relative bg-ink overflow-hidden min-h-[420px] lg:min-h-[600px] ${
          textFirst ? "lg:order-2" : ""
        }`}
      >
        <img
          src={stage.image}
          alt={stage.alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* text */}
      <div
        className={`px-6 lg:px-14 py-16 lg:py-24 flex flex-col justify-center reveal ${
          textFirst ? "lg:order-1" : ""
        }`}
      >
        <div className="max-w-[520px]">
          <div className="flex items-baseline gap-4 mb-5">
            <span
              className="font-display text-vermillion text-[40px] lg:text-[52px] leading-none"
              style={{ fontVariationSettings: "'opsz' 72" }}
            >
              {stage.number}
            </span>
            <span className="label-mono text-graphite">{stage.label}</span>
          </div>
          <h3 className="h-display-l text-ink mb-6 max-w-[18ch]">
            {stage.title}
          </h3>
          <p className="text-graphite text-[16.5px] leading-[1.6]">
            {stage.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TheSystem;
