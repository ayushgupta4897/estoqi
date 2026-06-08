import { ArrowUpRight } from "lucide-react";
import type React from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · Featured In
   Press wall with per-publication typographic wordmarks (real brand
   colours + masthead-true type families) on a documentary editorial
   background. Articles below in a grid of cards.
   ===================================================================== */

interface Publication {
  name: string;
  wordmark: string;                /* the typographic word-mark to render */
  color: string;                   /* the publication's primary brand colour */
  font: string;                    /* CSS font-family stack */
  weight: number;
  tracking: string;                /* letter-spacing */
  caseStyle: "uppercase" | "mixed" | "italic";
  category: string;
  date: string;
  headline: string;
  excerpt: string;
  href: string;
}

const PUBLICATIONS: Publication[] = [
  {
    name: "The Hindu BusinessLine",
    wordmark: "BusinessLine",
    color: "#B11B23",
    font: "'Playfair Display', 'Source Serif Pro', Georgia, serif",
    weight: 700,
    tracking: "-0.01em",
    caseStyle: "italic",
    category: "Food Technology",
    date: "January 2026",
    headline: "ESTOQI's Dual-Stream System Redefines Produce Safety for Indian Kitchens",
    excerpt:
      "The Bengaluru-based startup is bringing laboratory-grade ionised water technology to homes and commercial kitchens, with independently verified results that challenge conventional produce-washing methods.",
    href: "https://www.thehindubusinessline.com/economy/agri-business/",
  },
  {
    name: "YourStory",
    wordmark: "YourStory",
    color: "#EA2227",
    font: "'Manrope', 'Inter', system-ui, sans-serif",
    weight: 800,
    tracking: "-0.02em",
    caseStyle: "mixed",
    category: "Startup",
    date: "December 2025",
    headline: "How ESTOQI is Building a Science-First Approach to Food Safety",
    excerpt:
      "In a market crowded with wellness claims, ESTOQI stands out by publishing its test data openly — a transparency-first model that is resonating with health-conscious consumers and food businesses alike.",
    href: "https://yourstory.com/2017/02/safe-harvest",
  },
  {
    name: "Food Safety Magazine",
    wordmark: "FOOD SAFETY",
    color: "#0E7C66",
    font: "'Barlow Condensed', 'Oswald', 'Arial Narrow', sans-serif",
    weight: 700,
    tracking: "0.04em",
    caseStyle: "uppercase",
    category: "Research",
    date: "November 2025",
    headline: "Ionised Water at 11.5 pH — A New Benchmark for Pesticide Residue Reduction",
    excerpt:
      "Independent testing commissioned by ESTOQI Labs demonstrates a 94.7% average reduction in pesticide markers across tomato samples — results that align with emerging international research on electrochemically activated water.",
    href: "https://www.food-safety.com/articles/10515-ewgs-2025-dirty-dozen-list-of-most-pesticide-contaminated-produce-uses-new-methodology",
  },
  {
    name: "The Economic Times",
    wordmark: "The Economic Times",
    color: "#ED193F",
    font: "'Zilla Slab', 'Roboto Slab', Georgia, serif",
    weight: 700,
    tracking: "-0.005em",
    caseStyle: "mixed",
    category: "Health & Wellness",
    date: "October 2025",
    headline: "The Water Intelligence Revolution — ESTOQI's Vision for Every Indian Kitchen",
    excerpt:
      "As awareness around food safety grows, ESTOQI is positioning itself at the intersection of science and everyday wellness — with a system designed to work at both household and industrial scale.",
    href: "https://economictimes.indiatimes.com/topic/pesticide-residue",
  },
  {
    name: "Mint Lounge",
    wordmark: "Mint Lounge",
    color: "#F99D1C",
    font: "'GT Sectra', 'Lora', 'Playfair Display', serif",
    weight: 500,
    tracking: "0",
    caseStyle: "mixed",
    category: "Lifestyle",
    date: "September 2025",
    headline: "Clean Eating Starts Before the Plate — The Case for Ionised Water",
    excerpt:
      "ESTOQI's approach to produce cleansing is gaining traction among nutritionists and chefs who argue that the quality of water used in food preparation is as important as the ingredients themselves.",
    href: "https://www.livemint.com/mint-lounge",
  },
  {
    name: "Outlook Business",
    wordmark: "Outlook Business",
    color: "#E10600",
    font: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
    weight: 900,
    tracking: "-0.02em",
    caseStyle: "mixed",
    category: "Innovation",
    date: "August 2025",
    headline: "ESTOQI Raises the Bar on Food Safety Transparency in India",
    excerpt:
      "By publishing full test methodologies and third-party validation reports, ESTOQI is setting a new standard for accountability in the food technology sector.",
    href: "https://www.outlookbusiness.com/news/india-adopts-stringent-norms-for-maximum-pesticide-residues-limit-in-food-items-govt",
  },
];

const Wordmark: React.FC<{ p: Publication; size?: number }> = ({ p, size = 22 }) => (
  <span
    style={{
      fontFamily: p.font,
      fontWeight: p.weight,
      fontSize: `${size}px`,
      letterSpacing: p.tracking,
      textTransform: p.caseStyle === "uppercase" ? "uppercase" : "none",
      fontStyle: p.caseStyle === "italic" ? "italic" : "normal",
      color: p.color,
      lineHeight: 1,
      whiteSpace: "nowrap",
    }}
  >
    {p.wordmark}
  </span>
);

const FeaturedIn: React.FC = () => {
  useScrollAnimation();

  return (
    <main className="bg-bone text-ink">
      {/* ─── 1 · HERO ───────────────────────────────────────── */}
      <section className="relative min-h-[58vh] overflow-hidden border-b border-stone">
        <img
          src="/concepts/featured_bg.webp"
          alt="A stack of folded prestige newspapers and magazines on a leather-topped writing desk."
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,13,13,0.45) 0%, rgba(13,13,13,0.20) 35%, rgba(13,13,13,0.20) 60%, rgba(13,13,13,0.70) 100%)",
          }}
        />
        <div className="relative z-10 px-6 lg:px-14 pt-24 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="label-eyebrow text-bone mb-7">
              <span style={{ background: "var(--bone)" }} className="inline-block w-7 h-px" />
              Press & Media
            </div>
            <h1 className="h-display-xl text-bone mb-7 max-w-[18ch]">
              Featured <em>in.</em>
            </h1>
            <p className="font-display text-bone/80 text-[20px] lg:text-[24px] leading-[1.45] max-w-[58ch] font-light">
              The work has been picked up by editors who read the methodology
              before they wrote a headline. Six titles, one year, no paid
              placements.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2 · WORDMARK STRIP ────────────────────────────── */}
      <section className="py-16 lg:py-20 px-6 lg:px-14 bg-bone border-b border-stone">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="label-eyebrow justify-center mx-auto mb-4">As seen in</div>
            <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-graphite">
              Tap any title to read the original
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 items-center reveal reveal-stagger-2">
            {PUBLICATIONS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.name}
                className="group flex items-center justify-center h-20 px-3 transition-opacity hover:opacity-100 opacity-90"
              >
                <Wordmark p={p} size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3 · PRESS ARTICLES ────────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-14 bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">Coverage</div>
            <h2 className="h-display-l text-ink mb-5 max-w-[22ch]">
              The articles, <em>in their own words.</em>
            </h2>
            <p className="text-graphite text-[16px] leading-[1.6] max-w-[60ch]">
              A selection of pieces from the past year. We did not write any of
              them; we only sent the lab reports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
            {PUBLICATIONS.map((p, i) => (
              <article
                key={p.name}
                className={`reveal reveal-stagger-${(i % 3) + 1} group bg-bone border border-stone hover:border-ink p-7 lg:p-9 transition-colors flex flex-col`}
              >
                <header className="flex items-baseline justify-between gap-4 mb-5 pb-5 border-b border-stone">
                  <Wordmark p={p} size={16} />
                  <time className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-graphite shrink-0">
                    {p.date}
                  </time>
                </header>
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-vermillion mb-3">
                  {p.category}
                </div>
                <h3 className="font-display text-ink text-[22px] lg:text-[26px] leading-[1.2] mb-4">
                  {p.headline}
                </h3>
                <p className="text-graphite text-[15px] leading-[1.6] mb-7 flex-1">
                  {p.excerpt}
                </p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink group-hover:gap-3 transition-all"
                  aria-label={`Read the ${p.name} article`}
                >
                  Read on {p.name} <ArrowUpRight size={13} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4 · PRESS CONTACT ─────────────────────────────── */}
      <section className="bg-ink text-bone py-20 lg:py-24 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="label-eyebrow text-bone mb-6 justify-center mx-auto">
            <span style={{ background: "var(--bone)" }} className="inline-block w-7 h-px" />
            Press enquiries
          </div>
          <h2 className="h-display-l text-bone mb-5 max-w-[22ch] mx-auto">
            Talking to <em>an editor?</em>
          </h2>
          <p className="text-bone/75 text-[16px] leading-[1.6] mb-9 max-w-[52ch] mx-auto">
            For interview requests, the press kit, high-resolution lab photography,
            or copies of any of the test reports referenced above, write to us. We
            usually reply within a working day.
          </p>
          <a href="mailto:press@estoqi.com" className="btn-bone">
            press@estoqi.com
          </a>
        </div>
      </section>
    </main>
  );
};

export default FeaturedIn;
