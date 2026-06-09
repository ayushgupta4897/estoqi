import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · Home
   Sections (Feb 2026 brand brief):
     1 Hero
     2 Stats Strip
     3 Clean-looking ≠ safe (rotating produce reels)
     4 Brand Film · "Our Ikigai"
     5 Dual Stream (short teaser → /the-system)
     6 Same Science, Different Scales
     7 Testimonials
     8 Journal preview
     (footer)
   ===================================================================== */

const PRODUCE_REELS = [
  {
    produce: "Tomato",
    reduction: "94% pesticides",
    image: "/concepts/proof/proof_tomato.webp",
  },
  {
    produce: "Spinach",
    reduction: "96% pesticides",
    image: "/concepts/proof/proof_spinach.webp",
  },
  {
    produce: "Grapes",
    reduction: "88% pesticides",
    image: "/concepts/proof/proof_grapes.webp",
  },
  {
    produce: "Coriander",
    reduction: "93% pesticides",
    image: "/concepts/proof/proof_coriander.webp",
  },
];

const journalPosts = [
  {
    id: 1,
    category: "Water Science",
    title: "What pH 11.5 actually does to the wax on a tomato.",
    excerpt:
      "The mechanism, the molecular reach, and why plain water leaves residue behind.",
    image: "/concepts/ch03_the_stack.webp",
    date: "Feb 12, 2026",
  },
  {
    id: 2,
    category: "The System",
    title: "Inside the electrolysis chamber, a walk through the cell.",
    excerpt:
      "Surgical-grade titanium, a controlled current, two outputs from one source.",
    image: "/concepts/ch04_the_water.webp",
    date: "Feb 5, 2026",
  },
  {
    id: 3,
    category: "At the table",
    title: "A tomato, returned to being a tomato.",
    excerpt:
      "The everyday outcome, what an Estoqi household kitchen actually looks like.",
    image: "/concepts/ch06_the_return.webp",
    date: "Jan 28, 2026",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Priya M.",
    location: "Bengaluru",
    quote:
      "The wash-water turns visibly amber the first time. After that, you can't unsee it. I haven't bought a single bottled produce-wash since.",
  },
  {
    id: 2,
    name: "Arjun K.",
    location: "Mumbai",
    quote:
      "We pilot-installed two units at our cloud kitchen six months ago. The shelf-life numbers carried the conversation; the spoilage saved paid back the install in four months.",
  },
  {
    id: 3,
    name: "Sunita R.",
    location: "Pune",
    quote:
      "I'm a sceptic about wellness claims. The NABL reports are downloadable. That's why I bought one.",
  },
  {
    id: 4,
    name: "Vikram S.",
    location: "Delhi",
    quote:
      "It looks like a piece of laboratory equipment because that's what it is. Beautiful, quiet, and it does one job. I want every appliance in my kitchen to be this honest.",
  },
];

const Home: React.FC = () => {
  useScrollAnimation();

  return (
    <main className="bg-bone text-ink font-body">
      {/* ────────────────────────────────────────── 1 · HERO */}
      <section className="relative h-screen min-h-[680px] overflow-hidden">
        <img
          src="/concepts/signature_hero.webp"
          alt="A colander of fresh garden produce being rinsed with ionized water."
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,13,13,0.42) 0%, rgba(13,13,13,0.10) 28%, rgba(13,13,13,0.10) 48%, rgba(13,13,13,0.68) 100%), linear-gradient(90deg, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.0) 42%)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 lg:px-14 pb-14 lg:pb-16">
          <div className="max-w-[920px]">
            <div className="label-eyebrow text-bone mb-5">
              <span style={{ background: "var(--bone)" }} className="inline-block w-7 h-px" />
              India's first dual-stream ionizer , NABL accredited
            </div>
            <h1 className="h-display-xl text-bone max-w-[16ch] mb-5">
              The wash that <em>actually</em> washes.
            </h1>
            <p className="font-body text-bone/85 text-[17px] leading-[1.55] max-w-[58ch] mb-8 font-light">
              Estoqi's ionization technology removes up to 99% of pesticide
              residues from fresh produce, using only water. No compromises.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/for-homes" className="btn-bone" data-ocid="hero.for_homes_link">
                For Homes <ArrowRight size={13} />
              </Link>
              <Link
                to="/for-food-businesses"
                className="btn-ghost text-bone"
                data-ocid="hero.for_businesses_link"
              >
                For Businesses <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────── 2 · STATS STRIP */}
      <section className="bg-paper border-y border-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-soft">
            {(
              [
                { num: "up to 99%", em: true, label: "Surface pesticide residue reduction" },
                { num: "~2.2×", em: false, label: "Shelf-life extension" },
                { num: "1,200", em: false, suffix: "ppb", label: "Molecular hydrogen" },
                { num: "100+", em: false, label: "Independent lab tests" },
              ] as { num: string; em: boolean; suffix?: string; label: string }[]
            ).map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col gap-1 px-4 lg:px-8 ${i === 0 ? "pl-0 lg:pl-0" : ""}`}
              >
                <span className="font-display text-ink text-[30px] sm:text-[36px] lg:text-[42px] leading-none">
                  {s.em ? <em>{s.num}</em> : s.num}
                  {s.suffix && (
                    <span className="font-mono text-[14px] lg:text-[16px] tracking-tight ml-1 align-baseline text-graphite">
                      {s.suffix}
                    </span>
                  )}
                </span>
                <span className="label-mono text-graphite mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────── 3 · CLEAN-LOOKING ≠ SAFE */}
      <section className="py-24 lg:py-32 bg-bone">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="max-w-[640px] mb-12 reveal">
            <div className="label-eyebrow mb-6">A closer look</div>
            <h2 className="h-display-l text-ink mb-6">
              Your produce is clean-looking. <em>That doesn't make it safe.</em>
            </h2>
            <p className="text-graphite text-[17px] leading-[1.6]">
              Across our independent tests, the wash water consistently runs
              visibly murky. The residue is real, plain water just can't see
              it.
            </p>
          </div>
          <ProduceReels />
        </div>
      </section>

      {/* ────────────────────────────────────────── 4 · BRAND FILM · OUR IKIGAI */}
      <BrandFilmSection />

      {/* ────────────────────────────────────────── 5 · DUAL STREAM (teaser) */}
      <section className="bg-paper border-y border-stone py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="label-eyebrow mb-6">The dual stream</div>
            <h2 className="h-display-l text-ink mb-6">
              One source. <em>Two waters.</em>
            </h2>
            <p className="text-graphite text-[17px] leading-[1.6] mb-7 max-w-[48ch]">
              Estoqi's chamber splits ordinary tap water into two ionized
              streams, each calibrated for a different purpose, on demand.
            </p>
            <Link to="/the-system" className="btn-ink">
              See how it works <ArrowRight size={13} />
            </Link>
          </div>
          <div className="lg:col-span-7 reveal reveal-stagger-2 grid grid-cols-2 gap-2">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <img src="/concepts/hydration_moment.webp" alt="A glass of clear ionized water." className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 right-3 text-bone">
                <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase opacity-75">Stream 01</div>
                <div className="font-display text-[20px] leading-none mt-1">pH 9.5</div>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <img src="/concepts/r2_process_water.webp" alt="Ionized wash water arcing onto spinach." className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 right-3 text-bone">
                <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase opacity-75">Stream 02</div>
                <div className="font-display text-[20px] leading-none mt-1">pH 11.5</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────── 6 · SAME SCIENCE, DIFFERENT SCALES */}
      <section className="py-24 lg:py-32 bg-bone">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="max-w-[680px] mb-16 reveal">
            <div className="label-eyebrow mb-6">Estoqi, for you</div>
            <h2 className="h-display-l text-ink mb-6">
              Same science, <em>different scales.</em>
            </h2>
            <p className="text-graphite text-[17px] leading-[1.6] max-w-[62ch]">
              Whether you're a parent washing tonight's vegetables or a
              procurement head responsible for 10 tonnes a day, the science
              behind Estoqi is the same. The standard is the same.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <Link
              to="/for-homes"
              className="group relative overflow-hidden bg-paper border border-stone reveal"
              data-ocid="audience.homes_card_link"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                <img
                  src="/concepts/canon_stilllife.webp"
                  alt="Heirloom tomatoes on worn oak, a home kitchen counter scene."
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-8 lg:p-10">
                <div className="label-mono text-vermillion mb-3">For Homes</div>
                <h3 className="h-display-m text-ink mb-4 max-w-[24ch]">
                  Clean food starts <em>at your kitchen counter.</em>
                </h3>
                <p className="text-graphite text-[15px] leading-[1.6] mb-6 max-w-[48ch]">
                  Fits at your kitchen counter. Connects to your existing tap.
                  Two outlets, two outputs, wash water and drinking water, for
                  every meal, every day.
                </p>
                <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-vermillion inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explore home ionizers <ArrowRight size={13} />
                </span>
              </div>
            </Link>

            <Link
              to="/for-food-businesses"
              className="group relative overflow-hidden bg-paper border border-stone reveal reveal-stagger-2"
              data-ocid="audience.businesses_card_link"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                <img
                  src="/concepts/business_scale.webp"
                  alt="A commercial kitchen prep area, fresh greens being rinsed in an industrial sink."
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-8 lg:p-10">
                <div className="label-mono text-oxide mb-3">For Businesses</div>
                <h3 className="h-display-m text-ink mb-4 max-w-[24ch]">
                  Cleaner produce. <em>Defensible food safety.</em>
                </h3>
                <p className="text-graphite text-[15px] leading-[1.6] mb-6 max-w-[48ch]">
                  Estoqi installs and owns the equipment. You pay per kilogram
                  processed. Built for cold chains, cloud kitchens,
                  quick-commerce, hospitals, and food exporters.
                </p>
                <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-oxide inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Talk to our B2B team <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────── 7 · TESTIMONIALS */}
      <section className="py-24 lg:py-32 bg-paper border-y border-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="max-w-[720px] mb-16 reveal">
            <div className="label-eyebrow mb-6">The Collective</div>
            <h2 className="h-display-l text-ink">
              People who switched, <em>and stayed.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {testimonials.map((t, i) => (
              <figure
                key={t.id}
                className={`reveal reveal-stagger-${(i % 4) + 1}`}
              >
                <blockquote className="font-display text-ink text-[22px] lg:text-[26px] leading-[1.35] mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-4 border-t border-stone-soft">
                  <div className="label-mono text-ink">{t.name}</div>
                  <div className="font-mono text-[10.5px] text-graphite">
                    , {t.location}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 reveal">
            <Link to="/collective" className="btn-ink">
              Join the collective <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────── 8 · JOURNAL PREVIEW */}
      <section className="py-24 lg:py-32 bg-bone">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 reveal">
            <div className="max-w-[720px]">
              <div className="label-eyebrow mb-6">The Journal</div>
              <h2 className="h-display-l text-ink">
                Dispatches from <em>the lab and the table.</em>
              </h2>
            </div>
            <Link
              to="/journal"
              className="hidden md:inline-flex items-center gap-2 label-mono text-vermillion hover:gap-3 transition-all"
            >
              All articles <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {journalPosts.map((post, i) => (
              <JournalCard key={post.id} post={post} index={i} />
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link to="/journal" className="btn-ink">
              All articles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

/* ─── Produce reels (rotating placeholders) ──────────────── */
const ProduceReels: React.FC = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PRODUCE_REELS.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 reveal reveal-stagger-2">
      {PRODUCE_REELS.map((r, i) => {
        const active = i === idx;
        return (
          <button
            key={r.produce}
            type="button"
            onClick={() => setIdx(i)}
            className={`relative aspect-[4/5] overflow-hidden bg-ink text-left transition-all duration-500 ${active ? "ring-1 ring-ink ring-offset-2 ring-offset-bone" : "opacity-85 hover:opacity-100"}`}
            aria-label={`View ${r.produce} reduction`}
          >
            <img
              src={r.image}
              alt={r.produce}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(13,13,13,0.0) 0%, rgba(13,13,13,0.0) 38%, rgba(13,13,13,0.78) 100%)",
              }}
            />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-bone">
              <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase opacity-75">
                Murky wash water
              </span>
              <span
                className={`w-2 h-2 rounded-full ${active ? "bg-vermillion" : "bg-bone/40"}`}
                aria-hidden="true"
              />
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-bone">
              <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase opacity-80">
                {r.produce}
              </div>
              <div className="font-display text-[22px] leading-none mt-1">
                {r.reduction}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

/* ─── Brand film · Our Ikigai ─────────────────────────────── */
const BrandFilmSection: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="py-24 lg:py-32 bg-bone">
      <div className="max-w-6xl mx-auto px-6 lg:px-14">
        <div className="text-center mb-12 reveal">
          <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-graphite mb-3">
            Why we built this.
          </div>
          <h2 className="h-display-l text-ink mb-4 max-w-[20ch] mx-auto">
            Our <em>Ikigai.</em>
          </h2>
        </div>

        <div className="reveal reveal-stagger-2 relative overflow-hidden bg-ink border border-stone aspect-video">
          {playing ? (
            <div className="absolute inset-0 flex items-center justify-center text-bone/70 font-mono text-[10.5px] tracking-[0.18em] uppercase">
              {/* TODO[video]: replace with actual brand film embed
                  <iframe src="..." className="absolute inset-0 w-full h-full" allow="autoplay; encrypted-media" /> */}
              Brand film placeholder, swap for embed
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 group"
              aria-label="Play brand film"
            >
              <img
                src="/concepts/ch06_the_return.webp"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
              />
              <div className="absolute inset-0 bg-ink/30" />
              <span className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-bone text-ink mx-auto top-1/2 -translate-y-1/2 group-hover:scale-105 transition-transform">
                <Play size={28} fill="currentColor" />
              </span>
              <div className="absolute bottom-5 left-5 font-mono text-[10.5px] tracking-[0.18em] uppercase text-bone/85">
                1:50 brand film
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

interface JournalCardProps {
  post: {
    id: number;
    category: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
  };
  index: number;
}
const JournalCard: React.FC<JournalCardProps> = ({ post, index }) => (
  <article
    className={`group reveal reveal-stagger-${(index % 4) + 1}`}
    data-ocid={`journal.card.${post.id}`}
  >
    <div className="relative overflow-hidden bg-ink aspect-[4/3] mb-5">
      <img
        src={post.image}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
    </div>
    <div className="label-mono text-vermillion mb-3">{post.category}</div>
    <h3 className="font-display text-ink text-[22px] leading-[1.25] mb-3 max-w-[28ch] group-hover:text-graphite transition-colors">
      {post.title}
    </h3>
    <p className="text-graphite text-[14.5px] leading-[1.55] max-w-[48ch] mb-4">
      {post.excerpt}
    </p>
    <div className="flex items-center justify-between pt-3 border-t border-stone-soft">
      <time className="font-mono text-[10.5px] text-graphite tracking-[0.04em]">
        {post.date}
      </time>
      <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-vermillion flex items-center gap-2 group-hover:gap-3 transition-all">
        Read <ArrowRight size={12} />
      </span>
    </div>
  </article>
);

export default Home;
