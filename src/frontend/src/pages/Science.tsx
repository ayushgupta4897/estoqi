import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Play } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · Science (Jun 2026 — client narrative)
   One machine, two waters. A guided read, top to bottom:

     1  Hero            "Water, restructured."  + inline pH dial
     2  Intro           "is rinsing actually enough?"
     3  The Washing Water
         · the problem      (rinsing ≠ washing)
         · pH wash scale    (drag toward 11.5, residue lets go)
         · the fix          (saponification, two-stream split)
     4  The Drinking Water
         · antioxidant      ORP meter (drag the needle past zero)
         · goes deeper      hydrogen-through-membrane diagram
     5  Closing CTA     "And that's the whole idea."
     6  Four short films
   ===================================================================== */

const Science: React.FC = () => {
  useScrollAnimation();

  return (
    <main className="bg-bone text-ink">
      <Hero />
      <Intro />
      <WashingWater />
      <DrinkingWater />
      <Closing />
      <FilmStrip />
    </main>
  );
};

/* ─── 1 · HERO ─────────────────────────────────────────────── */
const Hero: React.FC = () => (
  <section
    id="science-top"
    className="relative min-h-[72vh] overflow-hidden border-b border-stone"
  >
    <img
      src="/concepts/science_hero.webp"
      alt="A tall glass of water on a dark-oak counter, the lowercase Estoqi wordmark etched into the glass, water mid-pour from above."
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(13,13,13,0.45) 0%, rgba(13,13,13,0.12) 32%, rgba(13,13,13,0.0) 58%, rgba(13,13,13,0.6) 100%), linear-gradient(90deg, rgba(13,13,13,0.6) 0%, rgba(13,13,13,0.0) 52%)",
      }}
    />
    <div className="relative z-10 px-6 lg:px-14 pt-28 pb-20 min-h-[72vh] flex flex-col justify-end">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_auto] items-end gap-12">
          <div className="max-w-[40ch]">
            <div className="label-eyebrow text-bone mb-7">The Science</div>
            <h1 className="h-display-xl text-bone mb-7">
              Water, <em>restructured.</em>
            </h1>
            <p className="font-display text-bone/80 text-[20px] lg:text-[24px] leading-[1.45] max-w-[54ch] font-light">
              Engineered to lift pesticides off your produce, and pour
              antioxidant, hydrogen-rich water into your glass.
            </p>
            <a
              href="#the-problem"
              className="inline-flex items-center gap-2 mt-9 font-mono text-[10.5px] tracking-[0.2em] uppercase text-bone/90 hover:text-bone transition-colors"
            >
              Explore the science
              <ArrowDown size={14} />
            </a>
          </div>

          {/* signature pH dial */}
          <PhDialChip />
        </div>
      </div>
    </div>
  </section>
);

const PhDialChip: React.FC = () => (
  <div className="hidden lg:block w-[260px] shrink-0 border border-bone/25 bg-ink/35 backdrop-blur-sm p-6">
    <div className="flex items-center justify-between font-mono text-[9.5px] tracking-[0.16em] uppercase text-bone/65">
      <span>tap water · 7.0</span>
      <span className="text-bone">Estoqi · 11.5</span>
    </div>
    <div className="mt-5 mb-2 h-1.5 rounded-full overflow-hidden bg-bone/15">
      <div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, #8a5a1d 0%, #d4d4d4 50%, #143d75 76%, #022859 100%)",
        }}
      />
    </div>
    <div className="flex items-baseline gap-2 mt-6">
      <span
        className="font-display text-bone leading-none text-[68px]"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        11.5
      </span>
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-bone/60">
        pH
      </span>
    </div>
    <p className="mt-4 text-bone/70 text-[12.5px] leading-[1.5]">
      The exact point water starts lifting grease.
    </p>
  </div>
);

/* ─── 2 · INTRO ────────────────────────────────────────────── */
const Intro: React.FC = () => (
  <section className="py-24 lg:py-32 px-6 lg:px-14 bg-paper border-b border-stone">
    <div className="max-w-4xl mx-auto reveal">
      <div className="label-eyebrow mb-8">The whole idea, start to finish</div>
      <p className="font-display text-ink text-[26px] md:text-[34px] lg:text-[40px] leading-[1.28] tracking-[-0.015em] font-light max-w-[24ch]">
        It begins with a question every kitchen has at the sink:{" "}
        <em>is rinsing actually enough?</em>
      </p>
    </div>
  </section>
);

/* ─── 3 · THE WASHING WATER ────────────────────────────────── */
const WashingWater: React.FC = () => (
  <>
    {/* the problem */}
    <section
      id="the-problem"
      className="py-24 lg:py-32 px-6 lg:px-14 bg-bone scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-[680px] reveal">
          <div className="label-eyebrow mb-6">The washing water</div>
          <h2 className="h-display-l text-ink mb-7 max-w-[18ch]">
            Rinsing your vegetables isn't the same as <em>washing them.</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          <div className="text-graphite text-[16.5px] leading-[1.68] space-y-5 max-w-[58ch] reveal">
            <p>
              Here's the uncomfortable part: pesticides aren't water-soluble.
              They're oily, built to cling to the waxy skin of produce and shrug
              off rain, irrigation, even a hard scrub under the tap. So when you
              rinse, the water beads up and rolls away, leaving the residue
              right where it started.
            </p>
            <p>
              It all comes down to one number,{" "}
              <span className="text-ink font-medium">pH</span> — simply how
              acidic or alkaline water is. Your tap sits at{" "}
              <span className="text-ink font-medium">pH 7</span>, dead neutral,
              and neutral water is powerless against an oily film.
            </p>
          </div>

          <figure className="border border-stone bg-paper p-7 lg:p-8 reveal">
            <blockquote className="font-display text-ink text-[28px] lg:text-[34px] leading-[1.18] tracking-[-0.015em]">
              Cold water on a greasy pan.
            </blockquote>
            <figcaption className="mt-5 label-mono text-vermillion">
              That's your tap, every single rinse
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    {/* interactive · pH wash scale */}
    <PhWashScale />

    {/* the fix */}
    <section className="py-24 lg:py-32 px-6 lg:px-14 bg-bone">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-[700px] reveal">
          <div className="label-eyebrow mb-6">The fix</div>
          <h2 className="h-display-l text-ink mb-7 max-w-[20ch]">
            So we taught water to lift grease, <em>the way soap does.</em>
          </h2>
          <div className="text-graphite text-[16.5px] leading-[1.68] space-y-5 max-w-[58ch]">
            <p>
              Soap cleans through an effect called{" "}
              <span className="text-ink font-medium">saponification</span>: it
              loosens oily grime so it can finally rinse away. Estoqi reaches
              that exact tipping point using only water and a little
              electricity. Tap water flows past surgical-grade titanium plates
              carrying a gentle current, and that current restructures the water
              itself.
            </p>
            <p>
              Out comes a stream at{" "}
              <span className="text-ink font-medium">pH 11.5</span> — alkaline
              enough to break the oily pesticide film on contact and wash it
              down the drain. The same science as industrial cleaning, expressed
              through water and electricity.
            </p>
          </div>
        </div>

        <StreamSplit />
      </div>
    </section>
  </>
);

/* ─── Interactive #1 · pH wash scale ───────────────────────── */
const RESIDUE = [
  { x: 12, y: 28, r: 7, t: 10.5 },
  { x: 30, y: 64, r: 5, t: 10.7 },
  { x: 44, y: 22, r: 8, t: 10.9 },
  { x: 58, y: 58, r: 6, t: 11.0 },
  { x: 70, y: 34, r: 5, t: 11.1 },
  { x: 82, y: 66, r: 7, t: 11.2 },
  { x: 22, y: 46, r: 4, t: 11.3 },
  { x: 64, y: 78, r: 5, t: 11.4 },
  { x: 88, y: 40, r: 4, t: 11.5 },
];

const PhWashScale: React.FC = () => {
  const [value, setValue] = useState(7);

  const lifting = value >= 10.5;
  const released = RESIDUE.filter((d) => value >= d.t).length;
  const state = useMemo(() => {
    if (value < 8)
      return { label: "Neutral · residue stays", color: "var(--graphite)" };
    if (value < 10.5)
      return { label: "Alkaline · nearly there", color: "var(--leaf)" };
    if (value < 11.5)
      return { label: "Residue lifting", color: "var(--vermillion)" };
    return { label: "Estoqi wash · residue gone", color: "var(--vermillion)" };
  }, [value]);

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-14 bg-paper border-y border-stone">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 max-w-[640px] reveal">
          <div className="label-mono text-vermillion mb-4">
            Interactive · pH scale
          </div>
          <h3 className="h-display-m text-ink max-w-[20ch]">
            Drag toward Estoqi, <em>and watch the residue let go.</em>
          </h3>
        </div>

        <div className="bg-bone border border-stone p-7 lg:p-10 reveal">
          {/* produce surface with oil-bound residue */}
          <div className="relative h-44 lg:h-52 overflow-hidden border border-stone-soft bg-paper mb-9">
            <div
              className="absolute inset-x-0 bottom-0 h-1/2"
              style={{
                background:
                  "linear-gradient(180deg, rgba(2,40,89,0.04) 0%, rgba(2,40,89,0.10) 100%)",
              }}
            />
            <span className="absolute bottom-3 left-4 font-mono text-[9px] tracking-[0.16em] uppercase text-graphite">
              produce surface · oil-bound residue
            </span>
            {RESIDUE.map((d, i) => {
              const gone = value >= d.t;
              return (
                <span
                  key={`${d.x}-${d.y}`}
                  aria-hidden="true"
                  className="absolute rounded-full"
                  style={{
                    left: `${d.x}%`,
                    top: `${d.y}%`,
                    width: d.r * 2,
                    height: d.r * 2,
                    background:
                      "radial-gradient(circle at 35% 30%, rgba(138,90,29,0.95), rgba(138,90,29,0.55))",
                    boxShadow: "0 1px 2px rgba(138,90,29,0.35)",
                    opacity: gone ? 0 : 0.9,
                    transform: gone
                      ? "translateY(60px) scale(0.5)"
                      : "translateY(0) scale(1)",
                    transition:
                      "opacity 500ms ease, transform 700ms cubic-bezier(0.5,0,0.5,1)",
                    transitionDelay: `${i * 18}ms`,
                  }}
                />
              );
            })}
          </div>

          {/* readout */}
          <div className="flex items-end justify-between mb-3">
            <div className="flex items-baseline gap-3">
              <span
                className="font-display leading-none text-[56px] lg:text-[76px]"
                style={{
                  fontVariationSettings: "'opsz' 144",
                  color: state.color,
                }}
              >
                {value.toFixed(1)}
              </span>
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-graphite">
                pH
              </span>
            </div>
            <div
              className="label-mono text-right"
              style={{
                color: lifting ? "var(--vermillion)" : "var(--graphite)",
              }}
            >
              {released}/{RESIDUE.length} lifted
            </div>
          </div>

          {/* track */}
          <div className="relative mt-6 mb-9">
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #8a5a1d 0%, #c9a06a 18%, #d4d4d4 42%, #9fb0c8 60%, #143d75 80%, #022859 100%)",
              }}
            />
            {/* soap-effect threshold marker at 10.5 */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${(10.5 / 14) * 100}%` }}
            >
              <span className="block w-px h-7 -translate-x-1/2 bg-ink/40" />
            </div>
            <input
              type="range"
              min={0}
              max={14}
              step={0.1}
              value={value}
              onChange={(e) => setValue(Number.parseFloat(e.target.value))}
              className="ph-spectrum-slider relative w-full"
              aria-label="pH value"
              aria-valuetext={`pH ${value.toFixed(1)}, ${state.label}`}
            />
            <div className="absolute top-full mt-3 left-0 right-0 flex justify-between font-mono text-[9px] tracking-[0.12em] uppercase text-graphite">
              <span>0</span>
              <span>7 · tap</span>
              <span>10.5 · soap-effect</span>
              <span>14</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-3 sm:gap-6 mt-10 pt-6 border-t border-stone-soft">
            <div className="label-mono" style={{ color: state.color }}>
              {state.label}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setValue(7)}
                className="font-mono text-[10px] tracking-[0.14em] uppercase text-graphite hover:text-ink border border-stone hover:border-ink px-4 py-2 transition-colors"
              >
                Tap water · 7.0
              </button>
              <button
                type="button"
                onClick={() => setValue(11.5)}
                className="font-mono text-[10px] tracking-[0.14em] uppercase text-bone bg-vermillion border border-vermillion px-4 py-2 hover:bg-leaf hover:border-leaf transition-colors"
              >
                Estoqi wash · 11.5
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Two-stream split diagram ─────────────────────────────── */
const StreamSplit: React.FC = () => (
  <div className="reveal">
    <div className="grid md:grid-cols-2 border border-stone bg-paper">
      {/* cathode · wash */}
      <div className="p-7 lg:p-9 border-b md:border-b-0 md:border-r border-stone">
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-graphite">
            Cathode −
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-vermillion">
            wash
          </span>
        </div>
        <div
          className="font-display text-ink leading-none text-[44px] lg:text-[52px]"
          style={{ fontVariationSettings: "'opsz' 64" }}
        >
          pH 11.5
        </div>
        <p className="mt-4 text-graphite text-[14.5px] leading-[1.6] max-w-[34ch]">
          Alkaline stream that emulsifies oil-bound residue on contact.
        </p>
      </div>
      {/* anode · drink */}
      <div className="p-7 lg:p-9">
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-graphite">
            Anode +
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-leaf">
            drink
          </span>
        </div>
        <div
          className="font-display text-ink leading-none text-[44px] lg:text-[52px]"
          style={{ fontVariationSettings: "'opsz' 64" }}
        >
          pH 9.5
        </div>
        <p className="mt-4 text-graphite text-[14.5px] leading-[1.6] max-w-[34ch]">
          Mildly alkaline, carries dissolved molecular hydrogen.
        </p>
      </div>
    </div>
    <p className="mt-7 font-display text-ink text-[20px] lg:text-[24px] leading-[1.4] max-w-[40ch]">
      One current in. <em>Two waters out</em> — a wash for your food, a drink
      for you.
    </p>
  </div>
);

/* ─── 4 · THE DRINKING WATER ───────────────────────────────── */
const DrinkingWater: React.FC = () => (
  <>
    {/* antioxidant */}
    <section className="py-24 lg:py-32 px-6 lg:px-14 bg-bone border-t border-stone">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-[700px] reveal">
          <div className="label-eyebrow mb-6">The drinking water</div>
          <h2 className="h-display-l text-ink mb-7 max-w-[20ch]">
            The water you drink doesn't just hydrate, <em>it fights back.</em>
          </h2>
          <div className="text-graphite text-[16.5px] leading-[1.68] space-y-5 max-w-[58ch]">
            <p>
              Plain water is mildly{" "}
              <span className="text-ink font-medium">oxidizing</span>:
              chemically, it nudges your body toward the everyday wear and tear
              we blame on free radicals. There's a scale for this, called{" "}
              <span className="text-ink font-medium">ORP</span>, measured in
              millivolts. The more positive the number, the more oxidizing the
              water.
            </p>
            <p>
              Estoqi's drinking stream flips that number{" "}
              <span className="text-ink font-medium">negative</span>, down to
              around <span className="text-ink font-medium">−350 mV</span>.
              Negative means antioxidant: the very property that makes berries,
              green tea and leafy greens good for you, now pouring straight from
              your tap.
            </p>
          </div>
        </div>
      </div>

      <OrpMeter />
    </section>

    {/* goes deeper · hydrogen */}
    <section className="py-24 lg:py-32 px-6 lg:px-14 bg-paper border-y border-stone">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-[700px] reveal">
          <div className="label-mono text-vermillion mb-4">Goes deeper</div>
          <h2 className="h-display-l text-ink mb-7 max-w-[24ch]">
            And it carries the one antioxidant{" "}
            <em>small enough to reach everywhere.</em>
          </h2>
          <div className="text-graphite text-[16.5px] leading-[1.68] space-y-5 max-w-[58ch]">
            <p>
              Most antioxidants are large molecules. They help, but they're too
              big to slip inside your cells, where much of the damage actually
              happens.
            </p>
            <p>
              <span className="text-ink font-medium">Hydrogen (H₂)</span> is the
              smallest molecule that exists, so it reaches where the others
              can't: through cell walls, across the blood-brain barrier, all the
              way to the mitochondria. Every glass of Estoqi drinking water
              carries about{" "}
              <span className="text-ink font-medium">1,200 ppb</span> of
              dissolved hydrogen, among the highest you can get continuously at
              home.
            </p>
          </div>
        </div>

        <HydrogenDiagram />
      </div>
    </section>
  </>
);

/* ─── Interactive #2 · ORP meter ───────────────────────────── */
const ORP_MIN = -450;
const ORP_MAX = 600;
const orpPct = (v: number) => ((v - ORP_MIN) / (ORP_MAX - ORP_MIN)) * 100;

const OrpMeter: React.FC = () => {
  const [value, setValue] = useState(400);
  const antioxidant = value < 0;

  return (
    <div className="max-w-5xl mx-auto reveal">
      <div className="mb-8 max-w-[640px]">
        <div className="label-mono text-vermillion mb-4">
          Interactive · ORP meter
        </div>
        <h3 className="h-display-m text-ink max-w-[24ch]">
          From +400 to −350: the difference between{" "}
          <em>rusting and protecting.</em>
        </h3>
      </div>

      <div className="bg-bone border border-stone p-7 lg:p-10">
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-baseline gap-3">
            <span
              className="font-display leading-none text-[56px] lg:text-[80px]"
              style={{
                fontVariationSettings: "'opsz' 144",
                color: antioxidant
                  ? "var(--vermillion)"
                  : "var(--amber-runoff)",
              }}
            >
              {value > 0 ? `+${value}` : value}
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-graphite">
              mV
            </span>
          </div>
          <div
            className="label-mono text-right"
            style={{
              color: antioxidant ? "var(--vermillion)" : "var(--amber-runoff)",
            }}
          >
            {antioxidant ? "reducing · antioxidant" : "oxidizing"}
          </div>
        </div>

        {/* meter track */}
        <div className="relative mt-6 mb-9">
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #022859 0%, #143d75 24%, #d4d4d4 52%, #c9a06a 76%, #8a5a1d 100%)",
            }}
          />
          {/* zero marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${orpPct(0)}%` }}
          >
            <span className="block w-px h-8 -translate-x-1/2 bg-ink/45" />
            <span className="absolute top-9 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.14em] uppercase text-graphite">
              0
            </span>
          </div>
          <input
            type="range"
            min={ORP_MIN}
            max={ORP_MAX}
            step={10}
            value={value}
            onChange={(e) => setValue(Number.parseInt(e.target.value, 10))}
            className="ph-spectrum-slider relative w-full"
            aria-label="ORP value in millivolts"
            aria-valuetext={`${value} millivolts, ${
              antioxidant ? "antioxidant" : "oxidizing"
            }`}
          />
          <div className="absolute top-full mt-3 left-0 right-0 flex justify-between font-mono text-[9px] tracking-[0.12em] uppercase text-graphite">
            <span>−450 · antioxidant</span>
            <span>+600 · oxidizing</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-12 pt-6 border-t border-stone-soft">
          <button
            type="button"
            onClick={() => setValue(400)}
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-graphite hover:text-ink border border-stone hover:border-ink px-4 py-2 transition-colors"
          >
            Tap water · +400
          </button>
          <button
            type="button"
            onClick={() => setValue(-350)}
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-bone bg-vermillion border border-vermillion px-4 py-2 hover:bg-leaf hover:border-leaf transition-colors"
          >
            Estoqi · −350
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Interactive #3 · hydrogen-through-membrane diagram ────── */
const BIG_MOLECULES = [
  { label: "vit C", y: 26, delay: "0s", size: 30 },
  { label: "CoQ10", y: 66, delay: "1.4s", size: 38 },
];
const H2_MOLECULES = [
  { y: 40, delay: "0s" },
  { y: 54, delay: "1.7s" },
  { y: 30, delay: "3.1s" },
];

const HydrogenDiagram: React.FC = () => (
  <div className="reveal border border-stone bg-bone p-7 lg:p-10">
    <div className="relative h-64 lg:h-72 overflow-hidden">
      {/* zone labels */}
      <span className="absolute top-0 left-2 font-mono text-[9px] tracking-[0.14em] uppercase text-graphite">
        bloodstream
      </span>
      <span className="absolute top-0 right-2 font-mono text-[9px] tracking-[0.14em] uppercase text-vermillion">
        cell · mitochondria
      </span>

      {/* cell membrane */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: "48%" }}
        aria-hidden="true"
      >
        <span className="block w-[3px] h-full bg-vermillion/30" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-mono text-[8.5px] tracking-[0.2em] uppercase text-graphite bg-bone px-2">
          cell membrane
        </span>
      </div>

      {/* mitochondria target glow */}
      <div
        className="absolute rounded-full"
        style={{
          right: "8%",
          top: "50%",
          width: 120,
          height: 120,
          transform: "translateY(-50%)",
          background:
            "radial-gradient(circle, rgba(2,40,89,0.10) 0%, rgba(2,40,89,0.0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* large antioxidants — turned back at the membrane */}
      {BIG_MOLECULES.map((m) => (
        <div
          key={m.label}
          className="sci-big absolute flex items-center justify-center rounded-full border border-amber-runoff/50 text-amber-runoff"
          style={{
            left: "4%",
            top: `${m.y}%`,
            width: m.size,
            height: m.size,
            animationDelay: m.delay,
            background:
              "radial-gradient(circle at 35% 30%, rgba(138,90,29,0.22), rgba(138,90,29,0.08))",
          }}
        >
          <span className="font-mono text-[8px] tracking-[0.04em]">
            {m.label}
          </span>
        </div>
      ))}

      {/* tiny H₂ — slips through to the mitochondria */}
      {H2_MOLECULES.map((m, i) => (
        <div
          key={`h2-${m.y}-${i}`}
          className="sci-h2 absolute flex items-center justify-center rounded-full text-bone"
          style={{
            left: "6%",
            top: `${m.y}%`,
            width: 22,
            height: 22,
            animationDelay: m.delay,
            background: "var(--vermillion)",
            boxShadow: "0 0 0 4px rgba(2,40,89,0.12)",
          }}
        >
          <span className="font-mono text-[8px]">H₂</span>
        </div>
      ))}

      {/* caption */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[9px] tracking-[0.14em] uppercase text-graphite">
        only the tiny one gets through
        <ArrowRight size={12} className="text-vermillion" />
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-stone-soft flex flex-wrap items-baseline justify-between gap-4">
      <p className="font-display text-ink text-[20px] lg:text-[24px] leading-[1.35] max-w-[34ch]">
        Only the smallest molecule gets <em>all the way in.</em>
      </p>
      <div className="flex items-baseline gap-2">
        <span
          className="font-display text-vermillion leading-none text-[40px] lg:text-[48px]"
          style={{ fontVariationSettings: "'opsz' 64" }}
        >
          1,200
        </span>
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-graphite">
          ppb H₂
        </span>
      </div>
    </div>
  </div>
);

/* ─── 5 · CLOSING ──────────────────────────────────────────── */
const Closing: React.FC = () => (
  <section className="bg-ink text-bone py-24 lg:py-32 px-6 lg:px-14">
    <div className="max-w-3xl mx-auto text-center reveal">
      <span
        className="rule-vermillion mx-auto mb-9 block"
        style={{ background: "var(--bone)" }}
      />
      <h2 className="h-display-l text-bone mb-7 max-w-[20ch] mx-auto">
        And that's the whole idea.{" "}
        <em>Just water, electricity, and a smarter glass.</em>
      </h2>
      <p className="text-bone/70 text-[16.5px] leading-[1.7] max-w-[52ch] mx-auto mb-11">
        One machine that washes what you eat and pours what you drink.
        Engineered to lift pesticides off your produce, and pour antioxidant,
        hydrogen-rich water into your glass.
      </p>
      <Link to="/book-consultation" className="btn-bone">
        Pre-order Estoqi
        <ArrowRight size={14} />
      </Link>
    </div>
  </section>
);

/* ─── 6 · FOUR SHORT FILMS ─────────────────────────────────── */
interface Film {
  number: string;
  duration: string;
  title: string;
}
const FILMS: Film[] = [
  {
    number: "01",
    duration: "1:24",
    title: "What is pH, and why tap water fails",
  },
  { number: "02", duration: "1:42", title: "How Estoqi water is made" },
  { number: "03", duration: "1:18", title: "ORP and antioxidants, explained" },
  { number: "04", duration: "1:36", title: "Hydrogen-rich drinking water" },
];

const FilmStrip: React.FC = () => (
  <section className="py-24 lg:py-32 px-6 lg:px-14 bg-bone">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 reveal">
        <div className="max-w-[560px]">
          <div className="label-eyebrow mb-6">In four short films</div>
          <h2 className="h-display-l text-ink max-w-[16ch]">
            Watch the <em>science.</em>
          </h2>
        </div>
        <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-graphite">
          scroll →
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 reveal">
        {FILMS.map((f) => (
          <FilmCard key={f.number} film={f} />
        ))}
      </div>
    </div>
  </section>
);

const FilmCard: React.FC<{ film: Film }> = ({ film }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="border border-stone bg-paper">
      <div className="relative aspect-[3/4] bg-ink overflow-hidden">
        {playing ? (
          <div className="absolute inset-0 flex items-center justify-center text-bone/70 font-mono text-[9.5px] tracking-[0.18em] uppercase text-center px-4">
            {/* TODO[video]: replace with Clip {film.number} embed */}
            Clip {film.number} · embed placeholder
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 group"
            aria-label={`Play clip ${film.number}: ${film.title}`}
          >
            <img
              src="/concepts/ch04_the_water.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-70 transition-opacity"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bone text-ink group-hover:scale-105 transition-transform">
                <Play size={18} fill="currentColor" />
              </span>
            </span>
            <span className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.18em] uppercase text-bone/85">
              Replace with Clip {film.number}
            </span>
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between mb-3">
          <span
            className="font-display text-vermillion text-[28px] leading-none"
            style={{ fontVariationSettings: "'opsz' 48" }}
          >
            {film.number}
          </span>
          <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-graphite">
            {film.duration}
          </span>
        </div>
        <p className="font-display text-ink text-[16px] leading-[1.3]">
          {film.title}
        </p>
      </div>
    </article>
  );
};

export default Science;
