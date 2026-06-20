import type React from "react";
import { useState, useMemo } from "react";
import { Check, X } from "lucide-react";
import DashboardShell, { Card, SectionTitle } from "../DashboardShell";
import { fmtINR } from "../format";
import LogoMark from "../components/LogoMark";

/* =====================================================================
   Pricing · the SaaS layer on top of the hardware
   The point of this page is to make Jesal feel that the platform
   monetises itself separately from machine sales — recurring, tiered,
   sales-friendly.
   ===================================================================== */

interface Tier {
  id: string;
  name: string;
  tagline: string;
  monthlyPerMachine: number | "custom";
  pop: boolean;
  audience: string;
  features: { label: string; included: boolean | string }[];
}

const TIERS: Tier[] = [
  {
    id: "essential",
    name: "Estoqi Essential",
    tagline: "One machine, one site, full peace of mind.",
    monthlyPerMachine: 12_500,
    pop: false,
    audience: "Standalone canteens · single dark store · boutique restaurants",
    features: [
      { label: "Live machine telemetry", included: true },
      { label: "Site-level dashboard", included: true },
      { label: "Operator iPad UX", included: true },
      { label: "Email alerts", included: true },
      { label: "Chain rollup analytics", included: false },
      { label: "Anomaly detection", included: false },
      { label: "Inwards reconciliation", included: false },
      { label: "FSSAI audit pack", included: "add-on" },
      { label: "API access", included: false },
      { label: "Dedicated CSM", included: false },
    ],
  },
  {
    id: "pro",
    name: "Estoqi Pro",
    tagline: "Multi-site chain · the standard playbook.",
    monthlyPerMachine: 9_500,
    pop: true,
    audience: "Hotel groups · QSR + cloud kitchens · dark-store networks",
    features: [
      { label: "Live machine telemetry", included: true },
      { label: "Site + chain dashboards", included: true },
      { label: "Operator iPad UX", included: true },
      { label: "Email + SMS + Slack alerts", included: true },
      { label: "Anomaly detection", included: true },
      { label: "Inwards reconciliation", included: true },
      { label: "FSSAI audit pack", included: "add-on" },
      { label: "Up to 25 machines", included: true },
      { label: "API access", included: "limited" },
      { label: "Dedicated CSM", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Estoqi Enterprise",
    tagline: "Fleet-scale. White-glove. Custom models.",
    monthlyPerMachine: "custom",
    pop: false,
    audience: "25+ machines · group-wide rollouts · IT-led integrations",
    features: [
      { label: "Live machine telemetry", included: true },
      { label: "Full hierarchy · account → machine", included: true },
      { label: "Operator iPad UX (white-label)", included: true },
      { label: "Webhook alerts · SLA-backed", included: true },
      { label: "Custom anomaly models", included: true },
      { label: "Inwards + POS deep-integration", included: true },
      { label: "FSSAI audit pack", included: true },
      { label: "Unlimited machines", included: true },
      { label: "Full API + SSO + SCIM", included: true },
      { label: "Dedicated CSM + quarterly review", included: true },
    ],
  },
];

const Pricing: React.FC = () => {
  const [sites, setSites] = useState(20);
  const [machinesPerSite, setMachinesPerSite] = useState(2);
  const [tier, setTier] = useState("pro");

  const totalMachines = sites * machinesPerSite;
  const monthly = useMemo(() => {
    const t = TIERS.find((x) => x.id === tier)!;
    if (t.monthlyPerMachine === "custom") {
      return Math.max(totalMachines * 7_500, 1_50_000); // negotiated floor
    }
    return totalMachines * t.monthlyPerMachine;
  }, [sites, machinesPerSite, tier, totalMachines]);
  const annual = monthly * 12;

  const breadcrumb = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Pricing" },
  ];

  return (
    <DashboardShell
      breadcrumb={breadcrumb}
      title={<>Estoqi <em className="text-graphite font-light">SaaS pricing.</em></>}
      subtitle="A recurring software layer on top of the hardware. Per-machine, monthly, tiered to what the chain actually needs."
    >
      {/* Tiers grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-9">
        {TIERS.map((t) => (
          <div
            key={t.id}
            className={`relative rounded p-6 lg:p-7 ${
              t.pop
                ? "bg-ink text-bone border border-ink"
                : "bg-bone text-ink border border-stone"
            }`}
          >
            {t.pop && (
              <div className="absolute top-0 right-6 -translate-y-1/2">
                <span className="bg-[#022859] text-bone px-2.5 py-0.5 rounded-full font-mono text-[9.5px] tracking-[0.18em] uppercase">
                  Most picked
                </span>
              </div>
            )}
            <h3 className={`font-display text-[22px] lg:text-[26px] leading-tight mb-1 ${t.pop ? "text-bone" : "text-ink"}`}>
              {t.name}
            </h3>
            <p className={`text-[13px] leading-[1.5] mb-5 ${t.pop ? "text-bone/75" : "text-graphite"}`}>
              {t.tagline}
            </p>
            <div className="mb-5">
              {t.monthlyPerMachine === "custom" ? (
                <div className={`font-display text-[34px] leading-none ${t.pop ? "text-bone" : "text-ink"}`}>
                  Custom
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className={`font-mono text-[34px] tabular-nums leading-none ${t.pop ? "text-bone" : "text-ink"}`}>
                    {fmtINR(t.monthlyPerMachine)}
                  </span>
                  <span className={`font-mono text-[11px] ${t.pop ? "text-bone/65" : "text-graphite"}`}>
                    / machine / month
                  </span>
                </div>
              )}
            </div>
            <div className={`font-mono text-[10px] tracking-[0.06em] uppercase mb-4 ${t.pop ? "text-bone/65" : "text-graphite"}`}>
              {t.audience}
            </div>
            <ul className={`space-y-2 mb-7 ${t.pop ? "" : ""}`}>
              {t.features.map((f) => (
                <li key={f.label} className="flex items-start gap-2 text-[13px]">
                  {f.included === true ? (
                    <Check size={14} strokeWidth={1.5} className={t.pop ? "text-bone/85 mt-0.5 shrink-0" : "text-[#1F5D3F] mt-0.5 shrink-0"} />
                  ) : f.included === false ? (
                    <X size={14} strokeWidth={1.5} className={t.pop ? "text-bone/35 mt-0.5 shrink-0" : "text-graphite/40 mt-0.5 shrink-0"} />
                  ) : (
                    <span className={`mt-1 shrink-0 w-3 h-3 rounded-full ${t.pop ? "border border-bone/40" : "border border-stone"} flex items-center justify-center font-mono text-[7px] uppercase tracking-[0.04em] ${t.pop ? "text-bone/65" : "text-graphite"}`}>+</span>
                  )}
                  <span className={f.included === false ? (t.pop ? "text-bone/35 line-through" : "text-graphite/50 line-through") : ""}>
                    {f.label}
                    {typeof f.included === "string" && (
                      <span className={`ml-1.5 font-mono text-[9.5px] tracking-[0.06em] uppercase ${t.pop ? "text-bone/55" : "text-graphite"}`}>
                        · {f.included}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setTier(t.id)}
              className={`w-full py-2.5 rounded font-mono text-[11.5px] tracking-[0.06em] uppercase transition-colors ${
                tier === t.id
                  ? (t.pop ? "bg-bone text-ink" : "bg-ink text-bone")
                  : (t.pop ? "border border-bone/40 text-bone hover:bg-bone hover:text-ink" : "border border-ink text-ink hover:bg-ink hover:text-bone")
              }`}
            >
              {tier === t.id ? "Selected" : "Use this tier"}
            </button>
          </div>
        ))}
      </div>

      {/* Calculator */}
      <Card className="mb-9">
        <SectionTitle eyebrow="Run-rate calculator">
          What would this cost?
        </SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-3">
            <label className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase block mb-2">Sites</label>
            <input
              type="range" min={1} max={150} value={sites}
              onChange={(e) => setSites(Number(e.target.value))}
              className="w-full accent-ink"
            />
            <div className="font-mono text-ink text-[20px] tabular-nums mt-1">{sites}</div>
          </div>
          <div className="lg:col-span-3">
            <label className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase block mb-2">Machines / site</label>
            <input
              type="range" min={1} max={6} value={machinesPerSite}
              onChange={(e) => setMachinesPerSite(Number(e.target.value))}
              className="w-full accent-ink"
            />
            <div className="font-mono text-ink text-[20px] tabular-nums mt-1">{machinesPerSite}</div>
          </div>
          <div className="lg:col-span-2">
            <label className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase block mb-2">Total machines</label>
            <div className="font-mono text-ink text-[20px] tabular-nums">{totalMachines}</div>
          </div>
          <div className="lg:col-span-2 border-l border-stone pl-6">
            <div className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase mb-2">Monthly</div>
            <div className="font-mono text-ink text-[22px] tabular-nums">{fmtINR(monthly)}</div>
          </div>
          <div className="lg:col-span-2">
            <div className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase mb-2">Annual ARR</div>
            <div className="font-mono text-[#022859] text-[22px] tabular-nums">{fmtINR(annual)}</div>
          </div>
        </div>
      </Card>

      {/* Hardware + consumables */}
      <Card className="mb-9">
        <SectionTitle eyebrow="One-time + consumables">
          Beyond the SaaS layer
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "Industrial L3 machine · MRP",       price: "₹14.5 L", sub: "+ ₹85k install + commissioning" },
            { label: "Industrial L1 machine · MRP",       price: "₹8.2 L",  sub: "+ ₹48k install" },
            { label: "Counter Pro machine · MRP",         price: "₹3.6 L",  sub: "+ ₹22k install" },
            { label: "Filter cartridge · 6-pack",          price: "₹18,400", sub: "auto-ship every 90 days" },
            { label: "Electrode plate service · per visit", price: "₹4,200",  sub: "or included in Enterprise" },
            { label: "Compliance pack · FSSAI",            price: "₹35k / yr", sub: "1-click audit log + chain-of-custody" },
          ].map((row) => (
            <div key={row.label} className="border border-stone rounded p-3.5 bg-paper">
              <div className="text-graphite text-[11px] tracking-[0.06em] uppercase font-mono mb-1">{row.label}</div>
              <div className="font-mono text-ink text-[18px] tabular-nums">{row.price}</div>
              <div className="text-graphite text-[11px] mt-1">{row.sub}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Trust strip */}
      <Card>
        <SectionTitle eyebrow="In production with">
          Already on Estoqi
        </SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-6 items-center">
          {["compass","taj","oberoi","leela","itc","swiggy","blinkit","zepto"].map((slug) => (
            <div key={slug} className="h-7 flex items-center">
              <LogoMark slug={slug} height={22} tone="ink" />
            </div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  );
};

export default Pricing;
