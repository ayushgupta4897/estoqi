import type React from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · Journey section · homepage only
   A watercolor + ink visual narrative of the produce journey from
   seed to plate. The story flows in 6 shared panels, then forks at
   the wash into two endings: "Without" (the quiet trust) and
   "With Estoqi" (the visible proof).
   All artwork is hand-painted watercolor generated via gpt-image-2.
   ===================================================================== */

interface Panel {
  n: string;
  title: string;
  body: string;
  image: string;
}

const SHARED: Panel[] = [
  {
    n: "01",
    title: "The seed",
    body: "It begins at a wooden counter in a small seed shop. A jute pouch of mustard, coriander, brinjal, tomato. A brass scale. A promise.",
    image: "/concepts/journey/journey_01_seeds.webp",
  },
  {
    n: "02",
    title: "The planting",
    body: "Red soil, pressed open with bare hands at sunrise. A clay pot of water. A child watching from the field's edge.",
    image: "/concepts/journey/journey_02_planting.webp",
  },
  {
    n: "03",
    title: "The growing",
    body: "Knee-high rows reach toward the monsoon clouds. White tomato blossoms. A scarecrow with a folded turban. The world breathes.",
    image: "/concepts/journey/journey_03_growing.webp",
  },
  {
    n: "04",
    title: "The intervention",
    body: "A brass sprayer. A measured packet, a careful row. The necessary compromise that feeds a country. The farmer is not the villain.",
    image: "/concepts/journey/journey_04_intervention.webp",
  },
  {
    n: "05",
    title: "The harvest",
    body: "Cane baskets, golden hour, the family lifting bushels into a small truck. Dust in the air. Abundance, measured in kilos.",
    image: "/concepts/journey/journey_05_harvest.webp",
  },
  {
    n: "06",
    title: "The market",
    body: "A mother and her child at the sabzi mandi. The vendor smiles. Tomatoes weighed on a brass scale. An ordinary Tuesday morning.",
    image: "/concepts/journey/journey_06_market.webp",
  },
];

const WITHOUT: Panel = {
  n: "07a",
  title: "Without Estoqi",
  body: "The kitchen tap. The water runs clear. She washes as her mother washed. There is no reason to wonder. The trust is silent, the residue invisible.",
  image: "/concepts/journey/journey_07a_without.webp",
};

const WITH: Panel = {
  n: "07b",
  title: "With Estoqi",
  body: "The same kitchen, the same hands. But the water below the colander is visibly amber. The compromise made in the field has now been seen, and lifted away. The toddler giggles. The Tuesday is no longer ordinary.",
  image: "/concepts/journey/journey_07b_with_estoqi.webp",
};

const JourneySection: React.FC = () => {
  useScrollAnimation();

  return (
    <section
      className="relative bg-bone py-24 lg:py-32"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 60% 35% at 10% 5%, rgba(184,133,72,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 90% 95%, rgba(2,40,89,0.05) 0%, transparent 60%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        {/* Title plate */}
        <div className="text-center mb-16 lg:mb-20 reveal max-w-[760px] mx-auto">
          <div className="label-eyebrow justify-center mx-auto mb-7">
            The journey, painted.
          </div>
          <h2 className="h-display-l text-ink mb-6">
            How every Indian vegetable <em>reaches your kitchen.</em>
          </h2>
          <p className="font-display text-graphite text-[18px] lg:text-[20px] leading-[1.55] font-light">
            Six common scenes. Two endings. Painted by hand, watercolour on
            paper, because some stories were never meant to be told in pixels.
          </p>
        </div>

        {/* Shared 6 panels — alternating image/text */}
        <ol className="space-y-16 lg:space-y-24">
          {SHARED.map((p, i) => (
            <SharedPanel key={p.n} panel={p} index={i} />
          ))}
        </ol>

        {/* Fork visualization */}
        <ForkSeparator />

        {/* Two-ending fork */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mt-12">
          <EndingPanel panel={WITHOUT} tone="without" />
          <EndingPanel panel={WITH} tone="with" />
        </div>

        {/* Closer */}
        <div className="text-center mt-20 lg:mt-24 max-w-[640px] mx-auto reveal">
          <span className="rule-vermillion mx-auto mb-6 block" />
          <p className="font-display text-graphite text-[18px] lg:text-[20px] leading-[1.5] font-light italic">
            The compromise made in the field is not Estoqi's fault, and not
            yours either. But it is now ours to lift away. One wash at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── SharedPanel · alternating layout ───────────────────── */
const SharedPanel: React.FC<{ panel: Panel; index: number }> = ({
  panel,
  index,
}) => {
  const reverse = index % 2 === 1;
  return (
    <li
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center reveal ${reverse ? "reveal-stagger-2" : ""}`}
    >
      <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
        <PaintingFrame src={panel.image} alt={panel.title} />
      </div>
      <div className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:text-right" : ""}`}>
        <div
          className="font-mono text-vermillion mb-3"
          style={{
            fontSize: "10.5px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Panel {panel.n}
        </div>
        <h3 className="font-display text-ink text-[32px] lg:text-[40px] leading-[1.05] mb-5">
          {panel.title}
        </h3>
        <p className="font-display text-graphite text-[17px] lg:text-[19px] leading-[1.55] font-light max-w-[42ch] lg:max-w-[42ch]" style={{ marginLeft: reverse ? "auto" : undefined }}>
          {panel.body}
        </p>
      </div>
    </li>
  );
};

/* ─── ForkSeparator · the journey splits ──────────────────── */
const ForkSeparator: React.FC = () => (
  <div className="my-16 lg:my-20 flex flex-col items-center reveal">
    <svg
      viewBox="0 0 200 120"
      width="200"
      height="120"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <path
        d="M 100 0 L 100 50 M 100 50 Q 100 60 70 75 L 30 110 M 100 50 Q 100 60 130 75 L 170 110"
        fill="none"
        stroke="var(--vermillion)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <circle cx="100" cy="50" r="3.5" fill="var(--vermillion)" />
      <circle cx="30" cy="110" r="3.5" fill="var(--graphite)" />
      <circle cx="170" cy="110" r="3.5" fill="var(--vermillion)" />
    </svg>
    <p
      className="font-mono text-graphite text-center mt-4"
      style={{
        fontSize: "10.5px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      Two endings · one choice
    </p>
  </div>
);

/* ─── EndingPanel · the Y-fork tiles ─────────────────────── */
const EndingPanel: React.FC<{ panel: Panel; tone: "without" | "with" }> = ({
  panel,
  tone,
}) => {
  const isWith = tone === "with";
  return (
    <article
      className={`reveal ${isWith ? "reveal-stagger-2" : ""} bg-paper border ${isWith ? "border-ink" : "border-stone"} p-6 lg:p-8 flex flex-col`}
      style={{
        boxShadow: isWith
          ? "0 30px 60px -28px rgba(13,13,13,0.22)"
          : "0 12px 32px -20px rgba(13,13,13,0.10)",
      }}
    >
      <PaintingFrame src={panel.image} alt={panel.title} />
      <div className="mt-7">
        <div
          className={`font-mono mb-3 ${isWith ? "text-vermillion" : "text-graphite"}`}
          style={{
            fontSize: "10.5px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {isWith ? "★ Estoqi ending" : "The default ending"}
        </div>
        <h3 className="font-display text-ink text-[28px] lg:text-[32px] leading-[1.1] mb-4">
          {panel.title}
        </h3>
        <p className="text-graphite text-[15.5px] leading-[1.6]">{panel.body}</p>
      </div>
    </article>
  );
};

/* ─── PaintingFrame · paper-edge chrome around the image ── */
const PaintingFrame: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => (
  <div
    className="relative"
    style={{
      backgroundColor: "#faf6ec",
      padding: "10px",
      boxShadow:
        "inset 0 0 0 1px rgba(2,40,89,0.05), 0 24px 48px -28px rgba(2,40,89,0.18)",
    }}
  >
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: "3 / 2",
        backgroundColor: "#f1f0eb",
      }}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* deckle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 32px 6px rgba(250,246,236,0.4)",
        }}
      />
    </div>
  </div>
);

export default JourneySection;
