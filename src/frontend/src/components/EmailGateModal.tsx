import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

/* =====================================================================
   ESTOQI · EmailGateModal
   Reusable email-gate for any report download. Stub submit for now ·
   when the backend lands, swap the body of `submit()` for a single
   fetch() call. The success state and modal chrome do not need to
   change.
   ===================================================================== */

export interface EmailGatePayload {
  name: string;
  email: string;
  reportSlug: string;
  reportTitle: string;
  category?: string;
  consent: boolean;
  submittedAt: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  reportSlug: string;
  reportTitle: string;
  category?: string;
  /* When provided, the success state offers a "View report now" CTA that
     navigates here (the standalone HTML report at /labs/reports/:slug). */
  viewPath?: string;
}

const EmailGateModal: React.FC<Props> = ({
  open,
  onClose,
  reportSlug,
  reportTitle,
  category,
  viewPath,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setConsent(true);
      setStatus("idle");
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const payload: EmailGatePayload = {
      name: name.trim(),
      email: email.trim(),
      reportSlug,
      reportTitle,
      category,
      consent,
      submittedAt: new Date().toISOString(),
    };

    /* TODO[backend]: replace this stub with
       await fetch('/api/reports/request', { method: 'POST', body: JSON.stringify(payload) }) */
    console.log("[ESTOQI · report-request stub]", payload);
    await new Promise((r) => setTimeout(r, 450));

    setStatus("done");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-gate-title"
      className="fixed inset-0 z-50 bg-ink/85 flex items-center justify-center p-4 lg:p-10"
      onClick={onClose}
    >
      <div
        className="bg-paper text-ink max-w-[520px] w-full shadow-2xl border border-ink relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-graphite hover:text-ink p-1"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {status === "done" ? (
          <div className="p-10">
            <div className="label-mono text-vermillion mb-3">Report on its way</div>
            <h2
              id="email-gate-title"
              className="font-display text-ink text-[32px] leading-[1.1] mb-4"
            >
              Check your inbox.
            </h2>
            <p className="text-graphite text-[15px] leading-[1.6] mb-7">
              We've sent <em className="font-italic-display">{reportTitle}</em>{" "}
              to <strong>{email}</strong>. It should arrive in the next few
              minutes. If you don't see it, check your spam folder or the
              promotions tab.
            </p>
            <div className="flex flex-wrap gap-3">
              {viewPath && (
                <button
                  type="button"
                  onClick={() => {
                    navigate({ to: viewPath });
                    onClose();
                  }}
                  className="btn-ink"
                >
                  View report now <ArrowRight size={13} />
                </button>
              )}
              <button type="button" onClick={onClose} className="btn-ghost">
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="p-10">
            <div className="label-mono text-vermillion mb-3">
              {category ? `${category} · Report` : "Lab report"}
            </div>
            <h2
              id="email-gate-title"
              className="font-display text-ink text-[28px] lg:text-[32px] leading-[1.1] mb-3"
            >
              Get the {reportTitle} <em>report.</em>
            </h2>
            <p className="text-graphite text-[14.5px] leading-[1.6] mb-7">
              We email reports directly so we can stay in touch about
              methodology updates. We will not share your address.
            </p>

            <Field
              label="Your name"
              id="gate-name"
              value={name}
              onChange={setName}
              required
              placeholder="Priya Mehta"
            />
            <Field
              label="Email"
              id="gate-email"
              type="email"
              value={email}
              onChange={setEmail}
              required
              placeholder="you@example.com"
            />

            <label className="flex items-start gap-3 mt-4 mb-7 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 accent-vermillion"
              />
              <span className="font-mono text-[10.5px] tracking-[0.08em] leading-[1.55] text-graphite">
                It's OK to email me about methodology updates and new lab
                results. You can unsubscribe any time.
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "submitting" || !name || !email}
              className="btn-ink w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending…" : "Email me the report →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}
const Field: React.FC<FieldProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block label-mono text-graphite mb-1"
    >
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

export default EmailGateModal;
