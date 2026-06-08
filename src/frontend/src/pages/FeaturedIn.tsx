import { ExternalLink } from "lucide-react";
import type React from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

const pressFeatures = [
  {
    id: 1,
    publication: "The Hindu BusinessLine",
    category: "Food Technology",
    headline:
      "ESTOQI's Dual-Stream System Redefines Produce Safety for Indian Kitchens",
    excerpt:
      "The Bengaluru-based startup is bringing laboratory-grade ionized water technology to homes and commercial kitchens, with independently verified results that challenge conventional produce washing methods.",
    date: "January 2026",
    href: "#",
    logo: "BL",
  },
  {
    id: 2,
    publication: "YourStory",
    category: "Startup",
    headline: "How ESTOQI is Building a Science-First Approach to Food Safety",
    excerpt:
      "In a market crowded with wellness claims, ESTOQI stands out by publishing its test data openly - a transparency-first model that is resonating with health-conscious consumers and food businesses alike.",
    date: "December 2025",
    href: "#",
    logo: "YS",
  },
  {
    id: 3,
    publication: "Food Safety Magazine",
    category: "Research",
    headline:
      "Ionized Water at 11.5 pH: A New Benchmark for Pesticide Residue Reduction",
    excerpt:
      "Independent testing commissioned by ESTOQI Labs demonstrates a 94.7% average reduction in pesticide markers across tomato samples - results that align with emerging international research on electrochemically activated water.",
    date: "November 2025",
    href: "#",
    logo: "FSM",
  },
  {
    id: 4,
    publication: "Economic Times",
    category: "Health & Wellness",
    headline:
      "The Water Intelligence Revolution: ESTOQI's Vision for Every Indian Kitchen",
    excerpt:
      "As awareness around food safety grows, ESTOQI is positioning itself at the intersection of science and everyday wellness - with a system designed to work at both household and industrial scale.",
    date: "October 2025",
    href: "#",
    logo: "ET",
  },
  {
    id: 5,
    publication: "Mint Lounge",
    category: "Lifestyle",
    headline:
      "Clean Eating Starts Before the Plate: The Case for Ionized Water",
    excerpt:
      "ESTOQI's approach to produce cleansing is gaining traction among nutritionists and chefs who argue that the quality of water used in food preparation is as important as the ingredients themselves.",
    date: "September 2025",
    href: "#",
    logo: "ML",
  },
  {
    id: 6,
    publication: "Outlook Business",
    category: "Innovation",
    headline: "ESTOQI Raises the Bar on Food Safety Transparency in India",
    excerpt:
      "By publishing full test methodologies and third-party validation reports, ESTOQI is setting a new standard for accountability in the food technology sector.",
    date: "August 2025",
    href: "#",
    logo: "OB",
  },
];

const FeaturedIn: React.FC = () => {
  useScrollAnimation();

  return (
    <main className="pt-20">
      {/* ── HERO ── */}
      <section className="py-28 lg:py-36 bg-ink">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <p className="label-caps text-vermillion mb-6 animate-slide-up">
            Press & Media
          </p>
          <h1
            className="heading-display text-white text-5xl md:text-7xl mb-8 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Featured In
          </h1>
          <p
            className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            ESTOQI's work has been recognized by leading publications across
            food science, technology, and wellness.
          </p>
        </div>
      </section>

      {/* ── PUBLICATION LOGO GRID ── */}
      <section className="py-16 bg-bone border-b border-ink/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="label-caps text-muted-foreground text-center mb-10 fade-up">
            As Seen In
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 fade-up stagger-1">
            {pressFeatures.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => e.preventDefault()}
                className="flex items-center justify-center h-16 rounded-sm border border-black/6 bg-bone hover:border-vermillion/30 hover:bg-vermillion/4 transition-all duration-250 group"
                aria-label={item.publication}
              >
                <span className="heading-display text-foreground/30 group-hover:text-vermillion text-lg transition-colors font-bold tracking-tight">
                  {item.logo}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS ARTICLES ── */}
      <section className="py-24 lg:py-32 bg-bone">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <div className="inline-flex items-center gap-2 mb-6 justify-center">
              <div className="w-8 h-px bg-vermillion" />
              <span className="label-caps text-vermillion">Coverage</span>
              <div className="w-8 h-px bg-vermillion" />
            </div>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-4">
              Press Coverage
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A selection of articles, features, and research mentions from
              across the media landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pressFeatures.map((item, i) => (
              <article
                key={item.id}
                className={`fade-up stagger-${(i % 3) + 1} group bg-paper rounded-sm border border-ink/6 p-7 hover:border-vermillion/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="label-caps text-vermillion text-xs">
                      {item.category}
                    </span>
                    <p className="text-foreground font-semibold text-sm mt-0.5">
                      {item.publication}
                    </p>
                  </div>
                  <time className="text-muted-foreground text-xs shrink-0 ml-4">
                    {item.date}
                  </time>
                </div>
                <h3 className="font-semibold text-foreground text-base leading-snug mb-3 group-hover:text-vermillion transition-colors">
                  {item.headline}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {item.excerpt}
                </p>
                <a
                  href={item.href}
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 label-caps text-vermillion text-xs hover:gap-2.5 transition-all"
                  aria-label={`Read article from ${item.publication}`}
                >
                  Read Article <ExternalLink size={11} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS CONTACT ── */}
      <section className="py-20 bg-bone">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center fade-up">
          <div className="inline-flex items-center gap-2 mb-6 justify-center">
            <div className="w-8 h-px bg-vermillion" />
            <span className="label-caps text-vermillion">
              Press Enquiries
            </span>
            <div className="w-8 h-px bg-vermillion" />
          </div>
          <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-4">
            Media & Press Contact
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
            For interview requests, press kits, high-resolution assets, or
            editorial enquiries, please reach out to our communications team.
          </p>
          <a
            href="mailto:press@estoqi.com"
            className="btn-primary-estoqi inline-flex"
          >
            press@estoqi.com
          </a>
        </div>
      </section>
    </main>
  );
};

export default FeaturedIn;
