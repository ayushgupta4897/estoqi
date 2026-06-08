import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Minus, Plus, Play } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · Science (Feb 2026 brand brief)
   Section order:
     1 Banner
     2 Four Questions (each with a clip placeholder)
     3 Explore the pH Spectrum
     4 The Science, Indexed (term grid with hover/click reveal)
   ===================================================================== */

interface QA {
  number: string;
  q: string;
  clipLabel: string;
  body: React.ReactNode;
}

const QAS: QA[] = [
  {
    number: "01",
    q: "What is pH? And why does normal water fail?",
    clipLabel: "Clip 01 · 1:24",
    body: (
      <>
        <p>
          pH is a logarithmic measure of how acidic or alkaline a solution is.
          Plain tap water sits near pH 7, which is exactly the chemistry
          pesticide compounds were engineered to survive. The waxy outer
          surface of most produce is hydrophobic, oil-based residues bond to
          it and repel neutral water completely.
        </p>
        <p>
          Estoqi's pH 11.5 stream crosses the saponification threshold, the
          same effect that lets soap lift grease. Nothing added. Nothing
          dosed. Water, restructured.
        </p>
      </>
    ),
  },
  {
    number: "02",
    q: "How is Estoqi water made? And how does it remove pesticides?",
    clipLabel: "Clip 02 · 1:42",
    body: (
      <>
        <p>
          Ordinary tap water passes through a chamber holding surgical-grade
          titanium electrodes. A controlled current splits the water into two
          ionic streams in parallel: alkaline (cathode) at pH 11.5 for
          washing produce, and mildly alkaline (anode) at pH 9.5 carrying
          dissolved molecular hydrogen for drinking.
        </p>
        <p>
          The pH 11.5 stream emulsifies oil-bound residues on contact, the
          same mechanism behind industrial cleaning, but expressed through
          water and electricity alone.
        </p>
      </>
    ),
  },
  {
    number: "03",
    q: "What is ORP, and how do antioxidants relate?",
    clipLabel: "Clip 03 · 1:18",
    body: (
      <>
        <p>
          ORP, Oxidation-Reduction Potential, is the electrical potential of a
          solution measured in millivolts. Positive ORP = oxidizing. Negative
          ORP = reducing, i.e. antioxidant.
        </p>
        <p>
          Tap water typically measures +200 to +600 mV. Estoqi drinking water
          measures negative, between -200 and -450 mV, the same principle that
          makes antioxidant-rich foods useful, delivered through every glass.
        </p>
      </>
    ),
  },
  {
    number: "04",
    q: "What is hydrogen-rich drinking water?",
    clipLabel: "Clip 04 · 1:36",
    body: (
      <>
        <p>
          Molecular hydrogen (H₂) is the smallest molecule that exists.
          Because of its size, it penetrates cell membranes, crosses the
          blood-brain barrier, and reaches the mitochondria, areas that
          larger antioxidants cannot access.
        </p>
        <p>
          Estoqi's drinking stream consistently delivers 1,200 ppb dissolved
          molecular hydrogen, one of the highest concentrations achievable
          continuously at home, measured via dissolved-H₂ meters calibrated to
          ISO standards.
        </p>
      </>
    ),
  },
];

interface RefTile {
  symbol: string;
  unit: string;
  category: string;
  short: string;
  source: string;
}
const REF_TILES: RefTile[] = [
  { symbol: "pH",   unit: "Potential of Hydrogen",     category: "Chemistry", short: "Logarithmic measure of hydrogen-ion activity. Each pH unit is a 10× change in acidity or alkalinity.", source: "IUPAC Compendium · 2014" },
  { symbol: "ORP",  unit: "Oxidation-Reduction",       category: "Redox",     short: "Solution's tendency to donate or accept electrons, measured in millivolts. Negative ORP behaves as an antioxidant.", source: "Standard Methods for Water Analysis · 23rd ed." },
  { symbol: "H₂",   unit: "Molecular hydrogen",        category: "Hydrogen",  short: "Smallest molecule in existence. Crosses cell membranes and the blood-brain barrier. Selective antioxidant.", source: "Ohsawa et al. · Nature Medicine 13 (2007)" },
  { symbol: "NMR",  unit: "Nuclear magnetic resonance", category: "Spectroscopy", short: "Used to measure water cluster size. Smaller clusters correlate with faster cellular absorption.", source: "IS 17872 · NMR methods for water" },
  { symbol: "TiO₂", unit: "Titanium electrode",        category: "Electrolysis", short: "Inert, non-leaching electrode material used in Estoqi's chamber. Standard for medical-grade equipment.", source: "ASTM F67 · Titanium grade-4" },
  { symbol: "EC",   unit: "Electrolysis chamber",      category: "Process",   short: "The cell where current splits water into alkaline and acidic streams continuously, without chemical input.", source: "Faraday's first law of electrolysis" },
  { symbol: "mV",   unit: "Millivolt scale",           category: "Redox",     short: "Unit of ORP. The more negative the reading, the greater the reducing (antioxidant) potential.", source: "ISO 11271 · 2002" },
  { symbol: "ppb",  unit: "Parts per billion",         category: "Measurement", short: "Standard unit for dissolved H₂ concentration. Therapeutic research typically cites 200–1,600 ppb.", source: "ISO 7980" },
  { symbol: "60+",  unit: "Independent lab tests",     category: "Verification", short: "Estoqi has commissioned more than 60 independent NABL-accredited tests across produce categories.", source: "Estoqi Lab Index · 2024–2026" },
];

const Science: React.FC = () => {
  useScrollAnimation();

  return (
    <main className="bg-bone text-ink">
      {/* ─── 1 · BANNER ────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] overflow-hidden border-b border-stone">
        <img
          src="/concepts/sci_lab_bench.webp"
          alt="A working modern science laboratory bench."
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,40,89,0.4) 0%, rgba(2,40,89,0.1) 30%, rgba(2,40,89,0.0) 60%, rgba(2,40,89,0.55) 100%), linear-gradient(90deg, rgba(2,40,89,0.55) 0%, rgba(2,40,89,0.0) 50%)",
          }}
        />
        <div className="relative z-10 px-6 lg:px-14 pt-24 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="label-eyebrow text-bone mb-7">
              <span style={{ background: "var(--bone)" }} className="inline-block w-7 h-px" />
              The Science
            </div>
            <h1 className="h-display-xl text-bone mb-7 max-w-[18ch]">
              The science behind <em>Estoqi.</em>
            </h1>
            <p className="font-display text-bone/80 text-[20px] lg:text-[24px] leading-[1.45] max-w-[60ch] font-light">
              Four questions, four answers, a pH spectrum you can play with,
              and an index of every term you'll hear us use, in plain language.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2 · FOUR QUESTIONS ────────────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-14 bg-bone">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">Four questions</div>
            <h2 className="h-display-l text-ink mb-6 max-w-[20ch]">
              Four questions, <em>four answers.</em>
            </h2>
            <p className="text-graphite text-[17px] leading-[1.6] max-w-[56ch]">
              Each answer comes paired with a short clip from our 7-minute
              demo film. Read, watch, or both.
            </p>
          </div>

          <div className="space-y-5">
            {QAS.map((qa, i) => (
              <QABlock key={qa.number} qa={qa} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3 · pH SPECTRUM ────────────────────────────────────── */}
      <PhSpectrum />

      {/* ─── 4 · SCIENCE, INDEXED ──────────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-14 bg-bone">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">The Science, indexed</div>
            <h2 className="h-display-l text-ink mb-6 max-w-[24ch]">
              The vocabulary, <em>in plain language.</em>
            </h2>
            <p className="text-graphite text-[17px] leading-[1.6] max-w-[58ch]">
              Hover or tap any term for a one-sentence explanation and the
              source we used.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-4">
            {REF_TILES.map((t) => (
              <RefCard key={t.symbol} tile={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────── */}
      <section className="bg-ink text-bone py-20 lg:py-24 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto text-center reveal">
          <span className="rule-vermillion mx-auto mb-8 block" />
          <h2 className="h-display-l text-bone mb-6 max-w-[22ch] mx-auto">
            See it for yourself, <em>at your kitchen counter.</em>
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link to="/the-system" className="btn-bone">
              How the machine works <ArrowRight size={13} />
            </Link>
            <Link to="/estoqi-labs" className="btn-ghost text-bone">
              Explore the lab reports <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

/* ─── QABlock ────────────────────────────────────────────── */
interface QABlockProps {
  qa: QA;
  defaultOpen: boolean;
}
const QABlock: React.FC<QABlockProps> = ({ qa, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [playing, setPlaying] = useState(false);
  return (
    <article className={`border bg-paper transition-colors ${open ? "border-ink" : "border-stone"}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full grid grid-cols-[64px_1fr_32px] items-center gap-4 lg:gap-6 px-6 lg:px-8 py-6 lg:py-7 text-left"
        aria-expanded={open}
      >
        <span
          className={`font-display text-[36px] leading-none ${open ? "text-vermillion" : "text-graphite"}`}
          style={{ fontVariationSettings: "'opsz' 48" }}
        >
          {qa.number}
        </span>
        <span className="font-display text-ink text-[18px] md:text-[22px] leading-[1.3]">
          {qa.q}
        </span>
        <span className="text-graphite justify-self-end" aria-hidden="true">
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      {open && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 px-6 lg:px-8 pb-8">
          {/* video clip placeholder */}
          <div className="relative bg-ink aspect-video overflow-hidden border border-stone">
            {playing ? (
              <div className="absolute inset-0 flex items-center justify-center text-bone/70 font-mono text-[10px] tracking-[0.18em] uppercase">
                {/* TODO[video]: replace with clip embed */}
                {qa.clipLabel} · embed placeholder
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-0 group"
                aria-label={`Play ${qa.clipLabel}`}
              >
                <img
                  src="/concepts/ch04_the_water.webp"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-bone text-ink group-hover:scale-105 transition-transform">
                    <Play size={20} fill="currentColor" />
                  </span>
                </span>
                <div className="absolute bottom-3 left-3 font-mono text-[9.5px] tracking-[0.18em] uppercase text-bone/85">
                  {qa.clipLabel}
                </div>
              </button>
            )}
          </div>
          <div className="text-graphite text-[16px] leading-[1.65] space-y-3 max-w-[56ch]">
            {qa.body}
          </div>
        </div>
      )}
    </article>
  );
};

/* ─── pH spectrum slider ──────────────────────────────────── */
const PhSpectrum: React.FC = () => {
  const [value, setValue] = useState(11.5);

  const tone = useMemo(() => {
    if (value <= 4) return { label: "Acidic", body: "Coffee, soda, lemon juice. Eats away enamel; not for drinking long-term.", color: "#9c3b1f" };
    if (value < 7) return { label: "Mildly acidic", body: "Rainwater, fresh-pressed juices. Roughly neutral on the body.", color: "#b25c2d" };
    if (value < 8) return { label: "Neutral", body: "Tap water, RO water. Cannot remove oil-bound pesticide residue.", color: "#525252" };
    if (value < 10) return { label: "Mildly alkaline", body: "Estoqi drinking stream at pH 9.5. Smaller clusters, dissolved hydrogen, negative ORP.", color: "#022859" };
    if (value < 11.5) return { label: "Alkaline", body: "Approaching the saponification threshold. Begins to lift oil-bound residue.", color: "#143d75" };
    if (value < 13) return { label: "High-alkaline · wash water", body: "Estoqi wash stream at pH 11.5. Emulsifies oil-bound pesticide residue on contact.", color: "#022859" };
    return { label: "Caustic", body: "Drain cleaners and industrial degreasers. Not safe for produce.", color: "#9c3b1f" };
  }, [value]);

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-14 bg-paper border-y border-stone">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 max-w-[680px] reveal">
          <div className="label-eyebrow mb-6">The pH spectrum</div>
          <h2 className="h-display-l text-ink mb-6 max-w-[22ch]">
            Where Estoqi sits, <em>and why it matters.</em>
          </h2>
          <p className="text-graphite text-[17px] leading-[1.6] max-w-[56ch]">
            Drag the slider. The whole pH spectrum, with the two Estoqi
            streams marked as anchors.
          </p>
        </div>

        <div className="bg-bone border border-stone p-7 lg:p-10 reveal">
          <div className="flex items-baseline justify-between mb-3">
            <div
              className="font-display text-[64px] lg:text-[88px] leading-none"
              style={{
                fontVariationSettings: "'opsz' 144",
                color: tone.color,
              }}
            >
              {value.toFixed(1)}
            </div>
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-graphite">
              pH
            </div>
          </div>

          <div className="relative mt-6 mb-8">
            {/* gradient track */}
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #9c3b1f 0%, #b25c2d 18%, #d9b46b 30%, #c8c8c8 45%, #6b8e5f 60%, #143d75 75%, #022859 88%, #9c3b1f 100%)",
              }}
            />
            <input
              type="range"
              min={0}
              max={14}
              step={0.1}
              value={value}
              onChange={(e) => setValue(Number.parseFloat(e.target.value))}
              className="ph-spectrum-slider relative w-full"
              aria-label="pH value"
            />
            {/* anchor labels for Estoqi streams */}
            <div className="absolute top-full mt-3 left-0 right-0 flex justify-between font-mono text-[9.5px] tracking-[0.14em] uppercase text-graphite">
              <span>0</span>
              <span>7</span>
              <span>14</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3 sm:gap-6 mt-8 pt-6 border-t border-stone-soft">
            <div className="label-mono text-vermillion">{tone.label}</div>
            <p className="text-graphite text-[14.5px] leading-[1.6] max-w-[56ch]">
              {tone.body}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-stone-soft">
            <button
              type="button"
              onClick={() => setValue(9.5)}
              className="text-left group"
            >
              <div className="label-mono text-graphite mb-1">Drinking stream</div>
              <div
                className="font-display text-ink text-[28px] leading-none group-hover:text-vermillion transition-colors"
                style={{ fontVariationSettings: "'opsz' 48" }}
              >
                Jump to 9.5
              </div>
            </button>
            <button
              type="button"
              onClick={() => setValue(11.5)}
              className="text-left group"
            >
              <div className="label-mono text-graphite mb-1">Wash stream</div>
              <div
                className="font-display text-ink text-[28px] leading-none group-hover:text-vermillion transition-colors"
                style={{ fontVariationSettings: "'opsz' 48" }}
              >
                Jump to 11.5
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── RefCard with hover/click reveal ─────────────────────── */
const RefCard: React.FC<{ tile: RefTile }> = ({ tile }) => {
  const [open, setOpen] = useState(false);
  return (
    <article
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      onClick={() => setOpen((o) => !o)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
      className={`relative bg-paper border p-5 lg:p-6 cursor-pointer transition-colors focus:outline-none ${open ? "border-ink" : "border-stone hover:border-ink"}`}
    >
      <div className="flex items-baseline justify-between mb-2">
        <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-graphite">
          {tile.category}
        </div>
        <ChevronRight size={14} className={`text-graphite transition-transform ${open ? "rotate-90" : ""}`} />
      </div>
      <div
        className="font-display text-ink text-[36px] lg:text-[42px] leading-none mb-1"
        style={{ fontVariationSettings: "'opsz' 64" }}
      >
        {tile.symbol}
      </div>
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-graphite">
        {tile.unit}
      </div>
      {open && (
        <div className="mt-4 pt-4 border-t border-stone-soft">
          <p className="text-graphite text-[13.5px] leading-[1.55] mb-3">{tile.short}</p>
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-vermillion">
            Source · {tile.source}
          </div>
        </div>
      )}
    </article>
  );
};

export default Science;
