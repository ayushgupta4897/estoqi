import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  FlaskConical,
  RotateCcw,
  Zap,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import VideoModal from "../components/VideoModal";
import VideoPlaceholder from "../components/VideoPlaceholder";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

const installSteps = [
  {
    number: "01",
    title: "Site Assessment",
    description:
      "Our certified technician visits your home to assess the kitchen plumbing, available space, and water source quality.",
    icon: "🏠",
  },
  {
    number: "02",
    title: "System Installation",
    description:
      "The ESTOQI unit is installed under the counter or on the countertop, connected to your main water line with food-grade tubing.",
    icon: "⚙️",
  },
  {
    number: "03",
    title: "Output Setup",
    description:
      "Depending on the machine selected, your engineer will configure the output system to your kitchen setup - whether that means a dedicated produce wash tap, a drinking water outlet, or both.",
    icon: "🚿",
  },
  {
    number: "04",
    title: "Calibration & Testing",
    description:
      "The system is calibrated to your local water profile. pH and ORP levels are verified with precision instruments.",
    icon: "🔬",
  },
];

const pricingPlans = [
  {
    eyebrow: "Drinking",
    name: "Estoqi Aqua",
    description:
      "pH 9.5 hydrogen-rich drinking water. For families who want better water at every tap - cooking, drinking, and daily use.",
    price: "₹49,999",
    subPricing: "+ ₹4,500/yr AMC · ₹99/mo consumables",
    accent: "border-estoqi-green/30",
    badge: "bg-estoqi-green/10 text-estoqi-green",
  },
  {
    eyebrow: "Pesticide Removal",
    name: "Estoqi Clean",
    description:
      "pH 11.5 produce wash water. Designed specifically for washing every fruit, vegetable, and grain your family consumes.",
    price: "₹49,999",
    subPricing: "+ ₹4,500/yr AMC · ₹99/mo consumables",
    accent: "border-estoqi-blue/30",
    badge: "bg-estoqi-blue/10 text-estoqi-blue",
  },
  {
    eyebrow: "Complete",
    name: "Estoqi Dual",
    description:
      "Both streams. Both benefits. One under-counter unit for the complete Estoqi experience - wash water and drinking water, every day.",
    price: "₹89,999",
    subPricing: "+ ₹4,500/yr AMC · ₹99/mo consumables",
    accent: "border-estoqi-green",
    badge: "bg-estoqi-green text-white",
    featured: true,
    mostPopular: true,
  },
];

const testimonials = [
  {
    quote:
      "We've been using Estoqi for six months now. The difference in how our vegetables look after washing is remarkable - and my family actually enjoys drinking water again.",
    name: "Priya S.",
    location: "Bengaluru",
  },
  {
    quote:
      "I was skeptical about ionized water, but the NABL-certified test results convinced me. Installation was seamless, and the team was professional throughout.",
    name: "Rahul M.",
    location: "Mumbai",
  },
  {
    quote:
      "The dual-stream system is elegant in its simplicity. One machine, two purposes - it fits perfectly under our counter and requires almost no maintenance.",
    name: "Ananya K.",
    location: "Hyderabad",
  },
  {
    quote:
      "What impressed me most was the science behind it. It's not just a water filter - it's a thoughtfully engineered system. We use it every single day.",
    name: "Vikram T.",
    location: "Chennai",
  },
];

const faqs = [
  {
    q: "How long does installation take?",
    a: "A standard Estoqi installation takes approximately 60–90 minutes. Our certified technicians handle everything from fitting to calibration, leaving your kitchen exactly as they found it.",
  },
  {
    q: "Is Estoqi compatible with my water TDS levels?",
    a: "Estoqi is engineered to work across a wide range of TDS levels common in Indian municipal and borewell water. Our team conducts a site assessment before installation to confirm compatibility.",
  },
  {
    q: "What is the warranty on the system?",
    a: "Estoqi systems come with a standard one-year warranty covering parts and service. Extended coverage is available through our AMC plans.",
  },
  {
    q: "What happens if I move homes?",
    a: "Our team can uninstall and reinstall the system at your new address. Relocation assistance is included in our Complete Plan and available as a service add-on for other plans.",
  },
  {
    q: "How much electricity does the system consume?",
    a: "Estoqi operates on a low-power cycle, consuming electricity only during active ionization. Typical usage adds minimal impact to your monthly electricity bill.",
  },
];

const boxItems = [
  {
    icon: BookOpen,
    label: "Installation Manual",
    description: "Step-by-step setup guide with maintenance tips.",
  },
  {
    icon: FlaskConical,
    label: "Testing Kit",
    description: "pH and TDS testing strips to verify your water quality.",
  },
  {
    icon: Zap,
    label: "Ionizer Unit",
    description:
      "The core dual-stream ionizer, pre-calibrated and ready to install.",
  },
];

const ForHomes: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoKey, setDemoKey] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useScrollAnimation();

  return (
    <main className="bg-estoqi-off-white">
      {/* Solutions Sub-Navigation */}
      <div className="sticky top-16 z-40 bg-estoqi-dark border-b border-white/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-1 py-2">
            <Link
              to="/for-homes"
              data-ocid="solutions.subnav.for_homes_link"
              className="px-5 py-2 rounded-sm label-caps text-sm font-semibold bg-white text-estoqi-dark transition-all"
            >
              For Homes
            </Link>
            <Link
              to="/for-food-businesses"
              data-ocid="solutions.subnav.for_businesses_link"
              className="px-5 py-2 rounded-sm label-caps text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              For Commercial Systems
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-estoqi-green to-[oklch(0.22_0.07_255)]">
          <div className="absolute inset-0 bg-gradient-to-b from-estoqi-dark/20 to-estoqi-dark/50" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
          <p className="label-caps text-white/60 mb-6 animate-slide-up">
            For Homes
          </p>
          <h1
            className="heading-display text-white text-5xl md:text-7xl mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Your Home.
            <br />
            <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
              Elevated.
            </span>
          </h1>
          <p
            className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Estoqi installs under your counter. Two outlets, two streams - one
            for washing your family’s food, one for drinking. Used by every
            family member, every meal.
          </p>
          <Link
            to="/book-consultation"
            className="btn-primary-estoqi animate-slide-up"
            style={{
              animationDelay: "0.3s",
              background: "white",
              color: "oklch(0.32 0.09 255)",
              borderColor: "white",
            }}
            data-ocid="for-homes.hero_cta"
          >
            Request for a Demo <ArrowRight size={16} />
          </Link>
        </div>
        <div className="pb-16" />
      </section>

      {/* Installation Animation */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-green mb-4">Installation</p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              Simple.{" "}
              <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                Professional.
              </span>
              <br />
              Seamless.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {installSteps.map((step, i) => (
              <div
                key={step.number}
                className={`fade-up stagger-${i + 1} relative`}
              >
                {/* Connector line */}
                {i < installSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-estoqi-green/30 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-estoqi-green/10 border border-estoqi-green/30 flex items-center justify-center mb-6 text-2xl">
                    {step.icon}
                  </div>
                  <p className="label-caps text-estoqi-green mb-2">
                    {step.number}
                  </p>
                  <h3 className="font-semibold text-foreground text-lg mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Demo */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="label-caps text-estoqi-green mb-4">Virtual Demo</p>
              <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-6">
                See it before
                <br />
                You Install It
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Take a guided virtual tour of the ESTOQI home system. Watch how
                the dual streams work in a real kitchen environment, from
                produce washing to daily hydration.
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setDemoModalOpen(true)}
                  className="btn-primary-estoqi"
                >
                  Watch Demo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDemoKey((k) => k + 1);
                    setDemoModalOpen(true);
                  }}
                  className="flex items-center gap-2 label-caps text-estoqi-green hover:text-estoqi-green/80 transition-colors"
                >
                  <RotateCcw size={14} />
                  Replay Demo
                </button>
              </div>
            </div>
            <div className="fade-up stagger-2">
              <VideoPlaceholder
                key={demoKey}
                label="ESTOQI Home Demo - 8 Minutes"
                overlayText="Home Installation Demo"
                onClick={() => setDemoModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Estoqi - Pricing */}
      <section className="py-24 lg:py-32 bg-estoqi-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-green mb-4">Plans</p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-4">
              Choose Your{" "}
              <span style={{ fontStyle: "italic", color: "#60a5fa" }}>
                Estoqi
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Three machines. One standard. Pick the stream - or both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <div
                key={plan.name}
                data-ocid={`for-homes.plan.item.${i + 1}`}
                className={`fade-up stagger-${i + 1} rounded-xl border-2 ${plan.accent} p-8 relative bg-white/80 backdrop-blur-sm ${
                  plan.featured ? "shadow-lg ring-1 ring-estoqi-green/20" : ""
                }`}
              >
                {plan.mostPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-estoqi-green text-white label-caps text-xs px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1">
                    ⭐ Most Popular
                  </span>
                )}
                <p
                  className={`label-caps text-xs mb-3 ${plan.badge.includes("blue") ? "text-estoqi-blue" : "text-estoqi-green"}`}
                >
                  {plan.eyebrow}
                </p>
                <h3 className="font-bold text-foreground text-2xl mb-4">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                  {plan.description}
                </p>
                <div className="mb-2">
                  <span className="text-4xl font-light text-foreground">
                    {plan.price}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs mb-8 leading-relaxed">
                  {plan.subPricing}
                </p>
                <Link
                  to="/book-consultation"
                  data-ocid={`for-homes.plan.cta.${i + 1}`}
                  className={`block text-center label-caps py-3.5 rounded-sm transition-all ${
                    plan.featured
                      ? "bg-estoqi-green text-white hover:bg-estoqi-green/90"
                      : "border border-estoqi-green/30 text-estoqi-green hover:bg-estoqi-green/5"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-green mb-4">Testimonials</p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              Families Using Estoqi
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                data-ocid={`for-homes.testimonial.item.${i + 1}`}
                className={`fade-up stagger-${i + 1} bg-estoqi-off-white/90 backdrop-blur-sm border border-estoqi-dark/6 rounded-2xl shadow-sm p-8`}
              >
                <p className="text-foreground leading-relaxed mb-6 text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-estoqi-green/10 flex items-center justify-center">
                    <span className="text-estoqi-green font-semibold text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {t.name}
                    </p>
                    <p className="text-muted-foreground text-xs label-caps">
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 fade-up">
            <Link
              to="/collective"
              data-ocid="for-homes.testimonials.collective_link"
              className="inline-flex items-center gap-2 border border-estoqi-green/30 text-estoqi-green hover:bg-estoqi-green/5 label-caps text-sm px-6 py-3 rounded-sm transition-all"
            >
              Read Their Stories | The Collective <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-green mb-4">
              Frequently Asked
            </p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              Questions About Estoqi
            </h2>
          </div>
          <div className="space-y-3 fade-up stagger-1">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="border border-estoqi-dark/6 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  data-ocid={`for-homes.faq.toggle.${i + 1}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-estoqi-green/5 transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-estoqi-green flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's In The Box */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-green mb-4">In The Box</p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              What&rsquo;s In The Box
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {boxItems.map((item, i) => (
              <div
                key={item.label}
                className={`fade-up stagger-${i + 1} bg-estoqi-off-white/90 backdrop-blur-sm border border-estoqi-dark/6 rounded-2xl p-8 text-center`}
              >
                <div className="w-16 h-16 rounded-full bg-estoqi-green/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon size={24} className="text-estoqi-green" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-3">
                  {item.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-estoqi-green">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center fade-up">
          <h2 className="heading-display text-white text-4xl md:text-5xl mb-6">
            Ready to Transform
            <br />
            Your Home?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Schedule a free demo with our installation specialists. We’ll assess
            your water and recommend the perfect Solution.
          </p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-3 bg-white text-estoqi-green px-8 py-4 rounded-sm label-caps hover:bg-white/90 transition-all hover:-translate-y-0.5"
            data-ocid="for-homes.cta_button"
          >
            Schedule a Demo <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <VideoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        title="ESTOQI Home Demo"
      />
    </main>
  );
};

export default ForHomes;
