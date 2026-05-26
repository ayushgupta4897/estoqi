import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  Loader2,
  MessageCircle,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";
import { useAddConsultationSubmission } from "../hooks/useQueries";

const interestOptions = [
  { value: "Home Installation", label: "Home Installation" },
  { value: "Business Pilot", label: "Business Pilot" },
  { value: "General Inquiry", label: "General Inquiry" },
];

const BookConsultation: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    interest: "",
    preferredDateTime: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const addSubmission = useAddConsultationSubmission();

  useScrollAnimation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.interest
    )
      return;

    try {
      await addSubmission.mutateAsync({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        interest: formData.interest,
        preferredDateTime: formData.preferredDateTime,
        message: formData.message.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const isFormValid =
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.phoneNumber.trim() &&
    formData.interest;

  return (
    <main className="bg-estoqi-off-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-estoqi-dark overflow-hidden">
        <img
          src="/assets/generated/hero-molecules.dim_1920x1080.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-estoqi-dark/80" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="label-caps text-estoqi-green mb-6 animate-slide-up">
            Begin Your Journey
          </p>
          <h1
            className="heading-display text-white text-5xl md:text-6xl mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Begin your
            <br />
            ESTOQI journey
          </h1>
          <p
            className="text-white/60 text-lg font-light max-w-xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Schedule a consultation with our specialists. We'll understand your
            needs and design the perfect ESTOQI solution for you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3 fade-up">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 rounded-full bg-estoqi-green/10 flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={44} className="text-estoqi-green" />
                  </div>
                  <h2 className="heading-display text-3xl text-foreground mb-4">
                    Consultation requested
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.fullName.split(" ")[0]}. Our team will
                    reach out within 24 hours to confirm your consultation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20just%20submitted%20a%20consultation%20request%20for%20ESTOQI."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-estoqi justify-center"
                      style={{ background: "#25D366", borderColor: "#25D366" }}
                    >
                      <MessageCircle size={16} />
                      Chat on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn-outline-estoqi justify-center"
                      style={{
                        color: "oklch(0.32 0.09 155)",
                        borderColor: "oklch(0.32 0.09 155)",
                      }}
                    >
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="label-caps text-foreground/60 block mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full border border-border rounded-sm px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-estoqi-green transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="label-caps text-foreground/60 block mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full border border-border rounded-sm px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-estoqi-green transition-colors bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="label-caps text-foreground/60 block mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="w-full border border-border rounded-sm px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-estoqi-green transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="interest"
                        className="label-caps text-foreground/60 block mb-2"
                      >
                        Interest *
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        required
                        className="w-full border border-border rounded-sm px-4 py-3 text-foreground focus:outline-none focus:border-estoqi-green transition-colors bg-white appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Select interest...
                        </option>
                        {interestOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="preferredDateTime"
                      className="label-caps text-foreground/60 block mb-2"
                    >
                      Preferred Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      name="preferredDateTime"
                      value={formData.preferredDateTime}
                      onChange={handleChange}
                      className="w-full border border-border rounded-sm px-4 py-3 text-foreground focus:outline-none focus:border-estoqi-green transition-colors bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="label-caps text-foreground/60 block mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your needs, space, or any questions..."
                      rows={4}
                      className="w-full border border-border rounded-sm px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-estoqi-green transition-colors bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={addSubmission.isPending || !isFormValid}
                    className="btn-primary-estoqi w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addSubmission.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Consultation
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  {addSubmission.isError && (
                    <p className="text-destructive text-sm text-center">
                      Something went wrong. Please try again or contact us via
                      WhatsApp.
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6 fade-up stagger-2">
              {/* WhatsApp */}
              <div className="rounded-sm border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <MessageCircle size={20} className="text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Quick Connect
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Instant response
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Prefer to chat? Reach our team directly on WhatsApp for
                  immediate assistance.
                </p>
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20ESTOQI.%20Can%20you%20help%20me%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-sm label-caps text-white transition-all hover:-translate-y-0.5"
                  style={{ background: "#25D366" }}
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Razorpay */}
              <div className="rounded-sm border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-estoqi-blue/10 flex items-center justify-center">
                    <CreditCard size={20} className="text-estoqi-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Secure Your Slot
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Refundable deposit
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Pay a refundable deposit to confirm your consultation slot and
                  priority scheduling.
                </p>
                <a
                  href="https://rzp.io/l/PLACEHOLDER"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-sm label-caps transition-all hover:-translate-y-0.5 border border-estoqi-blue text-estoqi-blue hover:bg-estoqi-blue hover:text-white"
                >
                  <CreditCard size={16} />
                  Pay Deposit / Confirm Booking
                </a>
              </div>

              {/* What to expect */}
              <div className="rounded-sm bg-estoqi-green/5 border border-estoqi-green/20 p-6">
                <p className="label-caps text-estoqi-green mb-4">
                  What to Expect
                </p>
                <ul className="space-y-3">
                  {[
                    "Free 30-minute consultation call",
                    "Home or business site assessment",
                    "Custom ESTOQI system recommendation",
                    "Installation timeline & AMC options",
                    "No obligation to purchase",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={14}
                        className="text-estoqi-green mt-0.5 flex-shrink-0"
                      />
                      <span className="text-muted-foreground text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20ESTOQI."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{ background: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="text-white" />
      </a>
    </main>
  );
};

export default BookConsultation;
