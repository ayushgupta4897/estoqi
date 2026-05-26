import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type React from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

const AboutESTOQI: React.FC = () => {
  useScrollAnimation();

  return (
    <main className="pt-20">
      {/* ── HERO ── */}
      <section className="py-28 lg:py-36 bg-estoqi-dark overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <p className="label-caps text-estoqi-green mb-6 animate-slide-up">
            About
          </p>
          <h1
            className="heading-display text-white text-5xl md:text-7xl mb-8 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            About ESTOQI
          </h1>
          <p
            className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Every system begins with a question. ESTOQI began with two: What are
            we truly consuming? And can we do better?
          </p>
        </div>
      </section>

      {/* ── WHY ESTOQI EXISTS ── */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-estoqi-green" />
                <span className="label-caps text-estoqi-green">
                  A Purpose That Found Its Form
                </span>
              </div>
              <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-6">
                A question-led
                <br />
                Journey
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                ESTOQI did not begin with a product. It began with an inquiry -
                into the everyday systems most people never think to question.
                Into the water they drink, the produce they eat, and the
                invisible assumptions that govern both.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What emerged was not a reaction to fear, but a response to
                possibility. If science already had the tools to elevate
                everyday consumption, the real question became: why wasn't it
                accessible to everyone?
              </p>
            </div>
            <div className="fade-up stagger-2">
              <div
                className="relative rounded-sm overflow-hidden"
                style={{ minHeight: "380px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-estoqi-green/90 to-[oklch(0.28_0.08_255)]">
                  <img
                    src="/assets/generated/science-bg.dim_1920x1080.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                </div>
                <div
                  className="relative z-10 p-10 h-full flex flex-col justify-end"
                  style={{ minHeight: "380px" }}
                >
                  <blockquote className="text-white text-xl font-light leading-relaxed italic">
                    "A system built not from urgency, but from the clarity that
                    comes when science and intention converge."
                  </blockquote>
                  <p className="text-white/50 label-caps mt-4">
                    - ESTOQI Founding Philosophy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 mb-6 justify-center">
              <div className="w-8 h-px bg-estoqi-green" />
              <span className="label-caps text-estoqi-green">Vision</span>
              <div className="w-8 h-px bg-estoqi-green" />
            </div>
            <h2 className="heading-display text-4xl md:text-6xl text-foreground mb-8">
              A World Where Every
              <br />
              meal begins{" "}
              <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                Clean.
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              We envision a future where every kitchen - from a family home in
              Chennai to a commercial kitchen in Mumbai - operates with the same
              intelligence once reserved for research laboratories. Where water
              is optimized for biology. Where produce is genuinely cleansed, not
              simply rinsed. Where the standard is not convenience - it is
              clarity.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Elevate the Everyday",
                desc: "Make research-grade food and water science a natural part of how people live.",
              },
              {
                number: "02",
                title: "Replace Assumption with Measurement",
                desc: "Build systems where every outcome is verifiable, not presumed.",
              },
              {
                number: "03",
                title: "Design for Human Potential",
                desc: "Create technology that works in alignment with biology, not in spite of it.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="fade-up text-left p-8 bg-estoqi-cream rounded-sm border border-estoqi-dark/6"
              >
                <div className="heading-display text-estoqi-green/30 text-5xl mb-4">
                  {item.number}
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-24 lg:py-32 bg-estoqi-dark">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-estoqi-green" />
                <span className="label-caps text-estoqi-green">Philosophy</span>
              </div>
              <h2 className="heading-display text-white text-4xl md:text-5xl mb-6">
                Science First.
                <br />
                <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                  Always.
                </span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-5">
                We measure before we claim. We test before we declare. Every
                feature of the ESTOQI system - from the dual-stream architecture
                to the specific pH outputs - is the result of deliberate
                research, iterative refinement, and independent validation.
              </p>
              <p className="text-white/60 leading-relaxed">
                This is not a marketing position. It is the only way we know how
                to build.
              </p>
            </div>
            <div className="fade-up stagger-2 space-y-4">
              {[
                {
                  principle: "Transparency",
                  desc: "Every test result, every methodology, every limitation - disclosed.",
                },
                {
                  principle: "Precision",
                  desc: "Exact pH outputs, exact contact times, exact measurable outcomes.",
                },
                {
                  principle: "Integrity",
                  desc: "We will never overstate efficacy or obscure inconvenient data.",
                },
                {
                  principle: "Accessibility",
                  desc: "Research-grade science should not require a research-grade income to access.",
                },
              ].map((item) => (
                <div
                  key={item.principle}
                  className="flex gap-5 p-5 rounded-sm border border-white/8 bg-white/4"
                >
                  <div className="w-1 rounded-full bg-estoqi-green shrink-0 self-stretch" />
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      {item.principle}
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IKIGAI ── */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <div className="inline-flex items-center gap-2 mb-6 justify-center">
              <div className="w-8 h-px bg-estoqi-green" />
              <span className="label-caps text-estoqi-green">
                Our Philosophy
              </span>
              <div className="w-8 h-px bg-estoqi-green" />
            </div>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-6">
              <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                Ikigai
              </span>{" "}
              in Every Drop
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              ESTOQI is guided by Ikigai - a Japanese philosophy of purpose
              found at the intersection of what you love, what you are good at,
              what the world needs, and what sustains you. For us, this
              translates into four operational pillars.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "Purpose",
                desc: "Elevating everyday consumption - food and water - to its highest possible standard.",
              },
              {
                label: "Passion",
                desc: "The scientific refinement of what we consume, pursued with rigor and without compromise.",
              },
              {
                label: "Contribution",
                desc: "Making intelligent food and water systems accessible at every scale - home and commercial.",
              },
              {
                label: "Meaning",
                desc: "Supporting long-term human wellbeing through systems designed with genuine intent.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="fade-up p-8 bg-estoqi-cream rounded-sm border border-estoqi-dark/6"
              >
                <div className="w-8 h-8 rounded-full bg-estoqi-green/10 flex items-center justify-center mb-4">
                  <div className="w-2 h-2 rounded-full bg-estoqi-green" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-3">
                  {item.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <div className="inline-flex items-center gap-2 mb-6 justify-center">
              <div className="w-8 h-px bg-estoqi-green" />
              <span className="label-caps text-estoqi-green">Leadership</span>
              <div className="w-8 h-px bg-estoqi-green" />
            </div>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-4">
              The People Behind ESTOQI
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A team of scientists, engineers, and wellness advocates united by
              a single mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Founder & CEO",
                role: "Vision & Strategy",
                initials: "EQ",
                bio: "Guiding ESTOQI from a founding question toward a category-defining system of food and water intelligence.",
              },
              {
                name: "Head of Research",
                role: "ESTOQI Labs",
                initials: "RL",
                bio: "Leading the independent testing protocols and scientific validation that form the foundation of every ESTOQI claim.",
              },
              {
                name: "Chief Technology Officer",
                role: "Systems & Engineering",
                initials: "CT",
                bio: "Architecting the dual-stream technology that delivers precision water intelligence at every scale.",
              },
            ].map((person) => (
              <div key={person.name} className="fade-up text-center">
                <div className="w-20 h-20 rounded-full bg-estoqi-green/10 border-2 border-estoqi-green/20 flex items-center justify-center mx-auto mb-5">
                  <span className="heading-display text-estoqi-green text-xl">
                    {person.initials}
                  </span>
                </div>
                <p className="label-caps text-estoqi-green text-xs mb-1">
                  {person.role}
                </p>
                <h3 className="font-semibold text-foreground text-lg mb-3">
                  {person.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT REFERENCE ── */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center fade-up">
          <div className="inline-flex items-center gap-2 mb-6 justify-center">
            <div className="w-8 h-px bg-estoqi-green" />
            <span className="label-caps text-estoqi-green">Get In Touch</span>
            <div className="w-8 h-px bg-estoqi-green" />
          </div>
          <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-6">
            We'd Love to
            <br />
            hear from you
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you're a researcher, a journalist, a potential partner, or
            simply someone curious about what we're building - our door is open.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-consultation" className="btn-primary-estoqi">
              Book a Consultation <ArrowRight size={16} />
            </Link>
            <a href="mailto:hello@estoqi.com" className="btn-outline-estoqi">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutESTOQI;
