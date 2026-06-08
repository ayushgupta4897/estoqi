import { ArrowRight } from "lucide-react";
import type React from "react";
import { useState } from "react";

/* =====================================================================
   ESTOQI · DemoForm
   Single "Book a Demo" entry that branches into FORM A (Home) or
   FORM B (Business) per the brand brief. Stub submit · TODO[backend]:
   wire to /api/demo-request, branch on `audience` for separate CRM
   inboxes (home@... vs sales@...).
   ===================================================================== */

type Audience = "home" | "business" | null;

interface HomePayload {
  audience: "home";
  name: string;
  phone: string;
  email: string;
  pincode: string;
  interest?: "produce-wash" | "drinking-water" | "both";
  preferredTime?: "morning" | "afternoon" | "evening";
  demoMode: "online" | "physical";
  submittedAt: string;
}

interface BusinessPayload {
  audience: "business";
  name: string;
  workEmail: string;
  phone: string;
  company: string;
  role: string;
  businessType:
    | "cloud-kitchen"
    | "restaurant"
    | "hotel"
    | "cold-chain"
    | "quick-commerce"
    | "hospital"
    | "food-exporter"
    | "other";
  volume?: "<100kg" | "100-500kg" | "500kg-1t" | "1t+" | "not-sure";
  message?: string;
  submittedAt: string;
}

const DemoForm: React.FC = () => {
  const [audience, setAudience] = useState<Audience>(null);
  const [submitted, setSubmitted] = useState<{
    audience: "home" | "business";
    email: string;
  } | null>(null);

  if (submitted) {
    return <DoneState data={submitted} onAnother={() => {
      setSubmitted(null);
      setAudience(null);
    }} />;
  }

  if (!audience) {
    return <AudiencePicker onPick={setAudience} />;
  }

  if (audience === "home") {
    return (
      <FormHome
        onBack={() => setAudience(null)}
        onDone={(email) => setSubmitted({ audience: "home", email })}
      />
    );
  }

  return (
    <FormBusiness
      onBack={() => setAudience(null)}
      onDone={(email) => setSubmitted({ audience: "business", email })}
    />
  );
};

/* ─── audience picker ─────────────────────────────────────── */
const AudiencePicker: React.FC<{ onPick: (a: Audience) => void }> = ({
  onPick,
}) => (
  <div>
    <div className="label-eyebrow mb-7">Book a demo</div>
    <h1 className="h-display-l text-ink mb-5 max-w-[20ch]">
      Is this for your home, <em>or your business?</em>
    </h1>
    <p className="text-graphite text-[16px] leading-[1.6] max-w-[52ch] mb-10">
      Two paths from here. Either is short. We'll route you to the right team.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 max-w-[680px]">
      <button
        type="button"
        onClick={() => onPick("home")}
        className="group bg-paper border border-stone hover:border-ink p-7 text-left transition-colors"
      >
        <div className="label-mono text-vermillion mb-3">For my home</div>
        <h3 className="font-display text-ink text-[24px] mb-2">
          Single-counter ionizer
        </h3>
        <p className="text-graphite text-[14px] leading-[1.5] mb-5">
          Site assessment, install at your kitchen counter, both streams from
          a single unit.
        </p>
        <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-vermillion inline-flex items-center gap-2 group-hover:gap-3 transition-all">
          Start the home form <ArrowRight size={13} />
        </span>
      </button>
      <button
        type="button"
        onClick={() => onPick("business")}
        className="group bg-paper border border-stone hover:border-ink p-7 text-left transition-colors"
      >
        <div className="label-mono text-vermillion mb-3">For my business</div>
        <h3 className="font-display text-ink text-[24px] mb-2">
          Commercial pilot
        </h3>
        <p className="text-graphite text-[14px] leading-[1.5] mb-5">
          90-day pilot at your facility. No capex. Pay only for what we
          cleanse.
        </p>
        <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-vermillion inline-flex items-center gap-2 group-hover:gap-3 transition-all">
          Start the business form <ArrowRight size={13} />
        </span>
      </button>
    </div>
  </div>
);

/* ─── FORM A · Home ──────────────────────────────────────── */
const FormHome: React.FC<{
  onBack: () => void;
  onDone: (email: string) => void;
}> = ({ onBack, onDone }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [interest, setInterest] = useState<HomePayload["interest"]>(undefined);
  const [time, setTime] = useState<HomePayload["preferredTime"]>(undefined);
  const [mode, setMode] = useState<HomePayload["demoMode"]>("online");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload: HomePayload = {
      audience: "home",
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      pincode: pincode.trim(),
      interest,
      preferredTime: time,
      demoMode: mode,
      submittedAt: new Date().toISOString(),
    };
    /* TODO[backend]: POST to /api/demo-request, audience-based inbox routing */
    console.log("[ESTOQI · demo-request stub · HOME]", payload);
    await new Promise((r) => setTimeout(r, 500));
    onDone(email);
  };

  return (
    <form onSubmit={submit}>
      <button
        type="button"
        onClick={onBack}
        className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-graphite hover:text-ink mb-7 inline-flex items-center gap-2"
      >
        ← Change audience
      </button>
      <div className="label-eyebrow mb-6">For homes</div>
      <h2 className="h-display-l text-ink mb-3 max-w-[22ch]">
        Tell us a little, <em>get a free assessment.</em>
      </h2>
      <p className="text-graphite text-[15px] leading-[1.6] mb-10 max-w-[56ch]">
        Five short fields. We'll call you back at your preferred time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
        <Field id="h-name" label="Name" required value={name} onChange={setName} placeholder="Priya Mehta" />
        <Field id="h-phone" label="Phone / WhatsApp" required value={phone} onChange={setPhone} placeholder="+91 9XXXX XXXXX" />
        <Field id="h-email" label="Email" required type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <Field id="h-pincode" label="Pincode" required value={pincode} onChange={setPincode} placeholder="560001" />

        <Select
          id="h-interest"
          label="What interests you most? (optional)"
          value={interest ?? ""}
          onChange={(v) => setInterest((v || undefined) as HomePayload["interest"])}
          options={[
            { v: "", label: "Choose…" },
            { v: "produce-wash", label: "Produce washing" },
            { v: "drinking-water", label: "Drinking water" },
            { v: "both", label: "Both" },
          ]}
        />
        <Select
          id="h-time"
          label="Preferred contact time (optional)"
          value={time ?? ""}
          onChange={(v) => setTime((v || undefined) as HomePayload["preferredTime"])}
          options={[
            { v: "", label: "Choose…" },
            { v: "morning", label: "Morning" },
            { v: "afternoon", label: "Afternoon" },
            { v: "evening", label: "Evening" },
          ]}
        />
      </div>

      <fieldset className="mt-2 mb-8">
        <legend className="block label-mono text-graphite mb-2">
          Demo preference
        </legend>
        <div className="flex gap-3">
          <RadioPill name="mode" value="online" checked={mode === "online"} onChange={() => setMode("online")}>
            Online
          </RadioPill>
          <RadioPill name="mode" value="physical" checked={mode === "physical"} onChange={() => setMode("physical")}>
            Physical
          </RadioPill>
        </div>
      </fieldset>

      <button type="submit" disabled={submitting} className="btn-ink">
        {submitting ? "Sending…" : "Book my free assessment"} <ArrowRight size={13} />
      </button>
    </form>
  );
};

/* ─── FORM B · Business ──────────────────────────────────── */
const FormBusiness: React.FC<{
  onBack: () => void;
  onDone: (email: string) => void;
}> = ({ onBack, onDone }) => {
  const [name, setName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [businessType, setBusinessType] = useState<BusinessPayload["businessType"]>("cloud-kitchen");
  const [volume, setVolume] = useState<BusinessPayload["volume"]>(undefined);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload: BusinessPayload = {
      audience: "business",
      name: name.trim(),
      workEmail: workEmail.trim(),
      phone: phone.trim(),
      company: company.trim(),
      role: role.trim(),
      businessType,
      volume,
      message: message.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };
    /* TODO[backend]: POST to /api/demo-request, audience-based inbox routing */
    console.log("[ESTOQI · demo-request stub · BUSINESS]", payload);
    await new Promise((r) => setTimeout(r, 500));
    onDone(workEmail);
  };

  return (
    <form onSubmit={submit}>
      <button
        type="button"
        onClick={onBack}
        className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-graphite hover:text-ink mb-7 inline-flex items-center gap-2"
      >
        ← Change audience
      </button>
      <div className="label-eyebrow mb-6">For businesses</div>
      <h2 className="h-display-l text-ink mb-3 max-w-[22ch]">
        Tell us about your operation. <em>We'll size a pilot.</em>
      </h2>
      <p className="text-graphite text-[15px] leading-[1.6] mb-10 max-w-[56ch]">
        Eight short fields. We typically respond within one business day.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
        <Field id="b-name" label="Name" required value={name} onChange={setName} placeholder="Vikram Singh" />
        <Field id="b-email" label="Work email" required type="email" value={workEmail} onChange={setWorkEmail} placeholder="vikram@company.com" />
        <Field id="b-phone" label="Phone" required value={phone} onChange={setPhone} placeholder="+91 9XXXX XXXXX" />
        <Field id="b-company" label="Company name" required value={company} onChange={setCompany} placeholder="Sunrise Foods Pvt Ltd" />
        <Field id="b-role" label="Role / designation" required value={role} onChange={setRole} placeholder="Procurement Lead" />

        <Select
          id="b-type"
          label="Business type *"
          value={businessType}
          onChange={(v) => setBusinessType(v as BusinessPayload["businessType"])}
          options={[
            { v: "cloud-kitchen", label: "Cloud kitchen" },
            { v: "restaurant", label: "Restaurant" },
            { v: "hotel", label: "Hotel" },
            { v: "cold-chain", label: "Cold chain" },
            { v: "quick-commerce", label: "Quick commerce" },
            { v: "hospital", label: "Hospital" },
            { v: "food-exporter", label: "Food exporter" },
            { v: "other", label: "Other" },
          ]}
        />
        <Select
          id="b-volume"
          label="Approx. produce volume per day (optional)"
          value={volume ?? ""}
          onChange={(v) => setVolume((v || undefined) as BusinessPayload["volume"])}
          options={[
            { v: "", label: "Choose…" },
            { v: "<100kg", label: "< 100 kg" },
            { v: "100-500kg", label: "100 to 500 kg" },
            { v: "500kg-1t", label: "500 kg to 1 tonne" },
            { v: "1t+", label: "1 tonne and up" },
            { v: "not-sure", label: "Not sure" },
          ]}
        />
      </div>

      <div className="mt-2 mb-8">
        <label htmlFor="b-message" className="block label-mono text-graphite mb-1">
          Anything else? (optional)
        </label>
        <textarea
          id="b-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="A short note about your operation or what you'd like to test"
          className="w-full bg-bone border border-stone focus:border-ink outline-none px-3 py-3 font-body text-[15px] text-ink placeholder:text-graphite/55 resize-none"
        />
      </div>

      <button type="submit" disabled={submitting} className="btn-ink">
        {submitting ? "Sending…" : "Request a pilot consultation"} <ArrowRight size={13} />
      </button>
    </form>
  );
};

/* ─── shared field primitives ─────────────────────────────── */
interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}
const Field: React.FC<FieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block label-mono text-graphite mb-1">
      {label}{required ? " *" : ""}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      className="w-full bg-bone border border-stone focus:border-ink outline-none px-3 py-3 font-body text-[15px] text-ink placeholder:text-graphite/55"
    />
  </div>
);

interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; label: string }[];
}
const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block label-mono text-graphite mb-1">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-bone border border-stone focus:border-ink outline-none px-3 py-3 font-body text-[15px] text-ink"
    >
      {options.map((o) => (
        <option key={o.v} value={o.v}>{o.label}</option>
      ))}
    </select>
  </div>
);

interface RadioPillProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}
const RadioPill: React.FC<RadioPillProps> = ({
  name,
  value,
  checked,
  onChange,
  children,
}) => (
  <label
    className={`cursor-pointer inline-flex items-center gap-2 px-5 py-3 border font-mono text-[11px] tracking-[0.16em] uppercase transition-colors ${
      checked
        ? "border-ink bg-ink text-bone"
        : "border-stone text-graphite hover:border-ink hover:text-ink"
    }`}
  >
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    {children}
  </label>
);

/* ─── done state ──────────────────────────────────────────── */
const DoneState: React.FC<{
  data: { audience: "home" | "business"; email: string };
  onAnother: () => void;
}> = ({ data, onAnother }) => (
  <div>
    <div className="label-eyebrow mb-7">Received</div>
    <h2 className="h-display-l text-ink mb-5 max-w-[22ch]">
      Thanks. <em>We'll be in touch.</em>
    </h2>
    <p className="text-graphite text-[16px] leading-[1.6] max-w-[56ch] mb-8">
      A confirmation is on the way to <strong>{data.email}</strong>. The {data.audience === "home" ? "home installation" : "B2B pilot"} team will reach out within one business day.
    </p>
    <button type="button" onClick={onAnother} className="btn-ink">
      Book another <ArrowRight size={13} />
    </button>
  </div>
);

export default DemoForm;
