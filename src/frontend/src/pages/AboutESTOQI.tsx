import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import type React from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · About Us (Feb 2026 brief)
   1 Founder Story (Jesal, placeholder · TODO[copy])
   2 What We Believe (3 principles, exact wording from brief)
   3 The Team (placeholder · TODO[copy/photos])
   4 Contact
   ===================================================================== */

const PRINCIPLES = [
  {
    n: "01",
    title: "We measure before we claim.",
    body: "Every number on this site comes from a NABL-accredited third-party laboratory. We commission the test, receive the report, and publish without amendment. If we cannot measure it, we will not say it.",
  },
  {
    n: "02",
    title: "We will never overstate its efficacy.",
    body: "We talk about ranges, not best cases. We disclose what the wash does not do as carefully as what it does. Underclaim is a discipline, not an accident.",
  },
  {
    n: "03",
    title: "Research-grade science shouldn't require research-grade income.",
    body: "We've engineered Estoqi for the under-counter price point, not the laboratory price point, because the household kitchen is where this fight is actually fought.",
  },
];

/* TODO[copy/photos]: replace with the real team, with their actual photos
   and bios. Placeholders are kept human and modest by design. */
interface Teammate {
  name: string;
  role: string;
  bio: string;
  photo?: string;
}
const TEAM: Teammate[] = [
  {
    name: "Jesal",
    role: "Founder",
    bio: "Started Estoqi after a year of asking why the wash water in his own kitchen had never looked clean. Engineering background; reads more chemistry papers than is healthy.",
    photo: "/concepts/jesal_forbes.webp",
  },
  {
    name: "TBD",
    role: "Head of Lab Operations",
    bio: "Runs the testing program. Decides which labs we commission, what gets retested, and what gets published.",
  },
  {
    name: "TBD",
    role: "Head of Engineering",
    bio: "Owns the hardware. Titanium plate sourcing, chamber geometry, controller firmware, every component on the BOM.",
  },
  {
    name: "TBD",
    role: "Head of Field",
    bio: "Runs installs, AMC, and customer success. Trains the technician network across the cities we serve.",
  },
];

const AboutESTOQI: React.FC = () => {
  useScrollAnimation();

  return (
    <main className="bg-bone text-ink">
      {/* ─── 1 · FOUNDER STORY ─────────────────────────────── */}
      <section className="pt-24 lg:pt-32 pb-20 lg:pb-24 px-6 lg:px-14 border-b border-stone">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <div className="label-eyebrow mb-7">About</div>
            <h1 className="h-display-xl text-ink mb-7 max-w-[18ch]">
              The story <em>behind Estoqi.</em>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-12">
            <div className="lg:col-span-7 reveal reveal-stagger-2">
              <p className="font-display text-graphite text-[20px] lg:text-[22px] leading-[1.55] mb-6 max-w-[56ch] font-light">
                Estoqi began at a kitchen sink in Bengaluru.
              </p>
              <p className="text-graphite text-[16px] leading-[1.7] mb-5 max-w-[58ch]">
                {/* TODO[copy]: replace with Jesal's actual voice. Below
                    is a believable placeholder, drawn from the brief. */}
                I had been washing my mother's vegetables every Sunday since I
                was a teenager. The same vegetables, the same rinse, the same
                soft tap water. For thirty years I had assumed that was enough.
              </p>
              <p className="text-graphite text-[16px] leading-[1.7] mb-5 max-w-[58ch]">
                Then I read a study from FSSAI on residue retention after
                household washing. The number it gave for plain water was so
                low it changed what I felt every time I picked up a tomato. I
                spent the next six months reading every paper I could find
                about ionization. I commissioned my first NABL test out of
                pocket. The wash water came back amber, and that was the
                moment Estoqi started.
              </p>
              <p className="text-graphite text-[16px] leading-[1.7] mb-8 max-w-[58ch]">
                We built Estoqi to be the machine I wished I'd had then. Quiet.
                Honest. Sized for the kitchen counter. Tested at the same
                accredited labs we use today, every claim independently
                verified, every report downloadable on request.
              </p>
              <div className="font-italic-display text-ink text-[20px]">— Jesal</div>
              <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-graphite mt-1">
                Founder, Estoqi
              </div>
            </div>

            <div className="lg:col-span-5 reveal reveal-stagger-3">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <img
                  src="/concepts/jesal_factory.webp"
                  alt="Jesal, founder of Estoqi, photographed on the factory floor with stainless-steel ionization chambers being assembled and the in-house laboratory bench visible in the background."
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 font-mono text-[9.5px] tracking-[0.18em] uppercase text-bone/85">
                  Pune · 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2 · WHAT WE BELIEVE ───────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-paper border-b border-stone">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">What we believe</div>
            <h2 className="h-display-l text-ink max-w-[22ch]">
              Three principles, <em>not negotiable.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
            {PRINCIPLES.map((p, i) => (
              <article
                key={p.n}
                className={`reveal reveal-stagger-${(i % 4) + 1} bg-bone border border-stone p-7 lg:p-8 flex flex-col`}
              >
                <span
                  className="font-display text-vermillion text-[32px] leading-none block mb-4"
                  style={{ fontVariationSettings: "'opsz' 48" }}
                >
                  {p.n}
                </span>
                <h3 className="font-display text-ink text-[20px] leading-[1.3] mb-4 max-w-[26ch]">
                  {p.title}
                </h3>
                <p className="text-graphite text-[14.5px] leading-[1.6]">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3 · TEAM ──────────────────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-bone">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-[680px] reveal">
            <div className="label-eyebrow mb-6">The team</div>
            <h2 className="h-display-l text-ink mb-4">
              People behind <em>the machine.</em>
            </h2>
            <p className="text-graphite text-[16px] leading-[1.6]">
              {/* TODO[copy]: replace placeholders with actual team
                  names and bios. */}
              Lab ops, hardware, field installs, and customer success. Small
              team. Long meetings.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            {TEAM.map((m, i) => (
              <article
                key={m.role}
                className={`reveal reveal-stagger-${(i % 4) + 1} bg-paper border border-stone p-6 flex flex-col`}
              >
                <div className="relative aspect-square bg-stone-soft mb-4 overflow-hidden">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={`${m.name}, ${m.role}.`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-display text-ink text-[36px]" style={{ fontVariationSettings: "'opsz' 48" }}>
                      {m.name === "TBD" ? "·" : m.name[0]}
                    </div>
                  )}
                </div>
                <h3 className="font-display text-ink text-[18px] leading-none">{m.name}</h3>
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-vermillion mt-1">
                  {m.role}
                </div>
                <p className="text-graphite text-[13px] leading-[1.55] mt-3">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4 · CONTACT ───────────────────────────────────── */}
      <section className="bg-ink text-bone py-20 lg:py-24 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto text-center reveal">
          <span className="rule-vermillion mx-auto mb-8 block" />
          <h2 className="h-display-l text-bone mb-6 max-w-[22ch] mx-auto">
            We're easy <em>to reach.</em>
          </h2>
          <p className="text-bone/65 text-[16.5px] leading-[1.6] mb-10 max-w-[56ch] mx-auto font-light">
            Site assessments, pilot inquiries, lab data requests, press, or
            simply curiosity. We answer every email.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:hello@estoqi.com" className="btn-bone">
              <Mail size={14} /> hello@estoqi.com
            </a>
            <Link to="/book-consultation" className="btn-ghost text-bone">
              Book a demo <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutESTOQI;
