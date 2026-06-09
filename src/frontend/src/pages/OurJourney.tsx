import type React from "react";
import JourneySection from "../components/JourneySection";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · Our Journey
   Dedicated page that hosts the watercolour seed-to-plate narrative.
   Previously lived on the homepage; lifted here at the founder's
   request so the home doesn't bloat and the painted story gets its
   own room. The hero is a single grand panoramic painting that folds
   the entire arc into one richly detailed frame; the eight-panel
   narrative + Y-fork below stays exactly as it was.
   ===================================================================== */

const OurJourney: React.FC = () => {
  useScrollAnimation();

  return (
    <main className="bg-bone text-ink">
      {/* ─── 1 · HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-stone">
        <div
          className="relative w-full"
          style={{
            backgroundColor: "#f1f0eb",
            aspectRatio: "3 / 2",
            maxHeight: "82vh",
          }}
        >
          <img
            src="/concepts/journey/journey_hero.webp"
            alt="A grand panoramic watercolour painting that folds the entire seed-to-plate journey into a single frame — village seed shop, planting at sunrise, growing crops with a brass-sprayer farmer, harvest, sabzi mandi, the fork at the kitchen sink, and a multi-generational Indian family at a meal — all painted in vernacular Indian storybook style."
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Soft vignette so any title overlay would breathe; no overlay
              text by default — the painting itself does the talking. */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 120px 30px rgba(241,240,235,0.55)",
            }}
          />
        </div>

        {/* Hero plate */}
        <div className="max-w-5xl mx-auto px-6 lg:px-14 py-16 lg:py-24 text-center">
          <div className="label-eyebrow justify-center mx-auto mb-7">
            Our journey, painted.
          </div>
          <h1 className="h-display-xl text-ink mb-7 max-w-[20ch] mx-auto">
            From the seed to <em>your kitchen.</em>
          </h1>
          <p className="font-display text-graphite text-[19px] lg:text-[22px] leading-[1.5] font-light max-w-[60ch] mx-auto">
            A field, a farmer, a family. Eight watercolour scenes that follow
            an ordinary Indian vegetable from the soil it grew in to the plate
            it ends up on — and the small but consequential moment at the
            kitchen sink where two futures part ways.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 text-graphite">
            <span className="rule-vermillion w-10 inline-block" />
            <span
              className="font-mono"
              style={{
                fontSize: "10.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Watercolour on paper · ink linework · 2026
            </span>
            <span className="rule-vermillion w-10 inline-block" />
          </div>
        </div>
      </section>

      {/* ─── 2 · THE EIGHT-PANEL NARRATIVE ─────────────────────── */}
      <JourneySection variant="page" />
    </main>
  );
};

export default OurJourney;
