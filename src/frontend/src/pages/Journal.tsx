import { ChevronRight, Play } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

const categories = [
  "All",
  "Water Science",
  "Nutrition",
  "Wellness",
  "Business",
];

const journalEntries = [
  {
    id: 1,
    category: "Water Science",
    title: "The Science of Ionized Water: What pH Really Means",
    excerpt:
      "Understanding the molecular difference between 9.5 pH drinking water and conventional tap water - and why it matters for your cells.",
    date: "2026-02-12",
    displayDate: "Feb 12, 2026",
    readTime: "6 min read",
  },
  {
    id: 2,
    category: "Nutrition",
    title: "How 11.5 pH Water Transforms Produce Cleansing",
    excerpt:
      "A deep dive into how alkaline ionized water removes pesticide residues at the molecular level, without any chemical additives.",
    date: "2026-02-05",
    displayDate: "Feb 5, 2026",
    readTime: "8 min read",
  },
  {
    id: 3,
    category: "Wellness",
    title: "Hydration Intelligence: Drinking Smarter, Not More",
    excerpt:
      "Why the quality of your water matters as much as the quantity - and how micro-clustered water changes cellular absorption.",
    date: "2026-01-28",
    displayDate: "Jan 28, 2026",
    readTime: "5 min read",
  },
  {
    id: 4,
    category: "Business",
    title: "The Pay-Per-Kg Revolution in Commercial Produce Washing",
    excerpt:
      "How forward-thinking food businesses are eliminating chemical wash costs and improving produce quality with ESTOQI.",
    date: "2026-01-20",
    displayDate: "Jan 20, 2026",
    readTime: "7 min read",
  },
  {
    id: 5,
    category: "Water Science",
    title: "ORP Explained: The Antioxidant Power of Negative Charge",
    excerpt:
      "Oxidation-Reduction Potential is the hidden metric that separates ordinary water from truly functional hydration.",
    date: "2026-01-14",
    displayDate: "Jan 14, 2026",
    readTime: "9 min read",
  },
  {
    id: 6,
    category: "Nutrition",
    title: "From Farm to Table: The Invisible Contamination Problem",
    excerpt:
      "Research shows that conventional produce washing removes less than 30% of surface pesticide residues. ESTOQI changes that equation.",
    date: "2026-01-07",
    displayDate: "Jan 7, 2026",
    readTime: "6 min read",
  },
  {
    id: 7,
    category: "Wellness",
    title: "Molecular Hydrogen: The Smallest Antioxidant",
    excerpt:
      "H₂-rich water produced by ESTOQI contains dissolved molecular hydrogen - the most bioavailable antioxidant known to science.",
    date: "2025-12-30",
    displayDate: "Dec 30, 2025",
    readTime: "7 min read",
  },
  {
    id: 8,
    category: "Business",
    title: "ESTOQI in Commercial Kitchens: A Case for Intelligence",
    excerpt:
      "How restaurants and cloud kitchens are integrating ESTOQI to meet rising consumer demand for clean, traceable food.",
    date: "2025-12-22",
    displayDate: "Dec 22, 2025",
    readTime: "5 min read",
  },
];

interface JournalEntry {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  displayDate: string;
  readTime: string;
}

const JournalCard: React.FC<{ entry: JournalEntry; index: number }> = ({
  entry,
  index,
}) => {
  const [hovered, setHovered] = useState(false);
  const delay = (index % 3) + 1;

  return (
    <article
      className={`fade-up stagger-${delay} group cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video Thumbnail */}
      <div
        className="relative rounded-sm overflow-hidden mb-5"
        style={{ aspectRatio: "16/9" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-estoqi-dark to-[oklch(0.18_0.04_155)]">
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                entry.category === "Water Science" ||
                entry.category === "Wellness"
                  ? "rgba(74,144,217,0.15)"
                  : "rgba(26,74,46,0.15)",
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`play-icon transition-all duration-300 ${
              hovered ? "opacity-100 scale-110" : "opacity-50"
            }`}
          >
            <Play size={20} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
        {/* Category color bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background:
              entry.category === "Water Science" ||
              entry.category === "Wellness"
                ? "oklch(0.55 0.12 230)"
                : "oklch(0.32 0.09 155)",
          }}
        />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3">
        <span
          className="label-caps text-xs px-2 py-1 rounded-full"
          style={{
            background:
              entry.category === "Water Science" ||
              entry.category === "Wellness"
                ? "oklch(0.93 0.04 230)"
                : "oklch(0.92 0.04 155)",
            color:
              entry.category === "Water Science" ||
              entry.category === "Wellness"
                ? "oklch(0.35 0.12 230)"
                : "oklch(0.32 0.09 155)",
          }}
        >
          {entry.category}
        </span>
        <span className="text-muted-foreground text-xs">{entry.readTime}</span>
      </div>

      <header>
        <h2 className="font-semibold text-foreground text-lg leading-snug mb-3 group-hover:text-estoqi-green transition-colors">
          {entry.title}
        </h2>
      </header>

      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {entry.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <time dateTime={entry.date} className="text-muted-foreground text-xs">
          {entry.displayDate}
        </time>
        <span className="inline-flex items-center gap-1 label-caps text-estoqi-green text-xs group-hover:gap-2 transition-all">
          Read More <ChevronRight size={12} />
        </span>
      </div>
    </article>
  );
};

const Journal: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  useScrollAnimation();

  const filtered =
    activeCategory === "All"
      ? journalEntries
      : journalEntries.filter((e) => e.category === activeCategory);

  return (
    <main className="bg-estoqi-off-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-estoqi-off-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="/assets/generated/hero-molecules.dim_1920x1080.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="label-caps text-estoqi-green mb-6 animate-slide-up">
            Journal
          </p>
          <h1
            className="heading-display text-5xl md:text-7xl text-foreground mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Intelligence
            <br />
            dispatches
          </h1>
          <p
            className="text-muted-foreground text-lg md:text-xl font-light max-w-xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Science, nutrition, and wellness insights from the ESTOQI research
            collective.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 lg:top-20 z-30 bg-estoqi-off-white/92 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full label-caps text-xs transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-estoqi-green text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              No articles in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map((entry, i) => (
                <JournalCard key={entry.id} entry={entry} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Journal;
