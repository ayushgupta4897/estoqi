import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type React from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · Collective
   Houses both the community voice AND the at-home reproducible test
   (moved here from Science per Feb 2026 brief).
   ===================================================================== */

const HOME_TEST_STEPS = [
  {
    n: "01",
    title: "Prepare your sample",
    body: "Take a clean glass. Half-fill with tap water. Add three drops of mustard oil. Stir briefly. The oil sits as visible droplets on the surface, your residue analog.",
  },
  {
    n: "02",
    title: "Apply to produce",
    body: "Submerge a tomato, an apple, or a few leaves of spinach. Soak for sixty seconds. Lift the produce out. The oil will have transferred to the surface.",
  },
  {
    n: "03",
    title: "Rinse and compare",
    body: "Rinse one specimen under tap water for ten seconds, the other under Estoqi pH 11.5 wash water. Examine both. Photograph both. Share your result with the Estoqi collective.",
  },
];

const TESTIMONIALS = [
  { name: "Priya M.",   location: "Bengaluru",  quote: "The wash water turns visibly amber the first time. After that, you can't unsee it." },
  { name: "Arjun K.",   location: "Mumbai",     quote: "We pilot-installed two units at our cloud kitchen six months ago. The shelf-life numbers carried the conversation." },
  { name: "Sunita R.",  location: "Pune",       quote: "I'm a sceptic about wellness claims. The NABL reports are downloadable. That's why I bought one." },
  { name: "Vikram S.",  location: "Delhi",      quote: "It looks like a piece of laboratory equipment because that's what it is. Beautiful, quiet, and it does one job honestly." },
  { name: "Ananya S.",  location: "Chennai",    quote: "I ran the home test the day it arrived. The visual difference is the proof; the lab data is the receipt." },
  { name: "Rohan G.",   location: "Hyderabad",  quote: "Our family's water habit changed overnight. Drinking water is no longer the chore we forget." },
];

const Collective: React.FC = () => {
  useScrollAnimation();
  return (
    <main className="bg-bone text-ink">
      {/* HERO */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-20 px-6 lg:px-14 border-b border-stone">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <div className="label-eyebrow mb-7">The Collective</div>
            <h1 className="h-display-xl text-ink mb-7 max-w-[18ch]">
              People who tested it <em>for themselves.</em>
            </h1>
            <p className="font-display text-graphite text-[20px] lg:text-[24px] leading-[1.45] max-w-[58ch] font-light">
              You don't have to take our word for any of it. Below is a
              reproducible home test, followed by stories from people who ran
              it.
            </p>
          </div>
        </div>
      </section>

      {/* VERIFY IT YOURSELF (moved from Science) */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-bone">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 reveal">
              <div className="label-eyebrow mb-6">Verify it yourself</div>
              <h2 className="h-display-l text-ink mb-6 max-w-[18ch]">
                A protocol you can <em>run at home.</em>
              </h2>
              <p className="text-graphite text-[17px] leading-[1.6] max-w-[48ch] mb-6">
                The oil-on-produce test is a reproducible kitchen experiment
                that visualizes the difference between plain water and pH 11.5
                wash water. Twenty minutes, no equipment beyond two glasses.
              </p>
              <p className="text-graphite text-[15px] leading-[1.6] max-w-[48ch] mb-8">
                Photograph your before and after, share with the collective,
                and we'll feature the strongest visual comparisons in the
                journal.
              </p>
            </div>

            <ol className="lg:col-span-7 space-y-3 reveal reveal-stagger-2">
              {HOME_TEST_STEPS.map((s) => (
                <li
                  key={s.n}
                  className="grid grid-cols-[64px_1fr] gap-6 items-start border-b border-stone-soft pb-7"
                >
                  <span
                    className="font-display text-vermillion text-[36px] leading-none"
                    style={{ fontVariationSettings: "'opsz' 48" }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-ink text-[22px] mb-2">{s.title}</h3>
                    <p className="text-graphite text-[15px] leading-[1.6]">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-paper border-y border-stone">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">Community voices</div>
            <h2 className="h-display-l text-ink">
              Real people. <em>Real switch.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                className={`reveal reveal-stagger-${(i % 4) + 1}`}
              >
                <blockquote className="font-display text-ink text-[19px] leading-[1.4] mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-stone-soft pt-4">
                  <div className="label-mono text-ink">{t.name}</div>
                  <div className="font-mono text-[10.5px] text-graphite mt-1">{t.location}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SHARE YOUR STORY */}
      <section className="bg-ink text-bone py-20 lg:py-24 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto text-center reveal">
          <span className="rule-vermillion mx-auto mb-8 block" />
          <h2 className="h-display-l text-bone mb-6 max-w-[20ch] mx-auto">
            Run the test. <em>Show us what you saw.</em>
          </h2>
          <p className="text-bone/65 text-[16.5px] leading-[1.6] mb-10 max-w-[56ch] mx-auto font-light">
            We collect kitchen-counter side-by-side photos. The best ones go
            into the journal with credit.
          </p>
          <Link to="/journal" className="btn-bone">
            Read the journal <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Collective;
