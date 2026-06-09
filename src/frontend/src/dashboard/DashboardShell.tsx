import type React from "react";
import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Activity, Building2, Cpu, Bell, TagIcon, MonitorSmartphone, ChevronRight,
  Search, Bot, Menu, X,
} from "lucide-react";
import { ACCOUNTS, computeKpis } from "./data";
import { fmtInt } from "./format";
import LogoMark from "./components/LogoMark";

/* =====================================================================
   ESTOQI · DASHBOARD SHELL
   ---------------------------------------------------------------------
   Left sidenav, top utility bar, breadcrumb row, content slot.
   Calm, info-dense, Plaid/Stripe school. Brand colour only on accents.
   ===================================================================== */

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  match?: (path: string) => boolean;
}

const PRIMARY: NavItem[] = [
  { to: "/dashboard",          label: "Network Health", icon: <Activity   size={15} strokeWidth={1.5} />, match: (p) => p === "/dashboard" },
  { to: "/dashboard/alerts",   label: "Alerts",         icon: <Bell       size={15} strokeWidth={1.5} /> },
  { to: "/dashboard/pricing",  label: "Pricing",        icon: <TagIcon    size={15} strokeWidth={1.5} /> },
  { to: "/dashboard/operator", label: "Operator UI",    icon: <MonitorSmartphone size={15} strokeWidth={1.5} /> },
];

interface DashboardShellProps {
  children: React.ReactNode;
  /** Breadcrumb segments. The last item is rendered as bold. */
  breadcrumb?: Array<{ label: string; to?: string }>;
  /** Title rendered in the page header band. */
  title?: React.ReactNode;
  /** Subtitle / one-liner. */
  subtitle?: React.ReactNode;
  /** Right-side header chrome (filter pills, time-window selector, etc.). */
  headerRight?: React.ReactNode;
}

const DashboardShell: React.FC<DashboardShellProps> = ({
  children, breadcrumb, title, subtitle, headerRight,
}) => {
  const location = useLocation();
  const path = location.pathname;
  const kpis = computeKpis();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F5EE] text-ink flex">
      {/* ─── SIDENAV ─────────────────────────────────────────── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-[244px] shrink-0 bg-bone border-r border-stone flex flex-col transform transition-transform lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-5 pt-5 pb-4 border-b border-stone flex items-center justify-between">
          <Link to="/" search={{ demo: "aayush" } as never} className="font-display text-ink text-[22px] leading-none" style={{ fontVariationSettings: "'opsz' 24" }}>
            est<em>oqi</em>
          </Link>
          <button
            className="lg:hidden w-8 h-8 -mr-1 flex items-center justify-center text-graphite"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Identity strip */}
        <div className="px-5 py-3 border-b border-stone bg-paper">
          <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase mb-1">
            Workspace
          </div>
          <div className="font-display text-ink text-[15px] leading-tight">Estoqi · HQ</div>
          <div className="font-mono text-graphite text-[10px] mt-0.5">Demo session · live</div>
        </div>

        {/* Primary nav */}
        <nav className="px-3 py-4 flex-1 overflow-y-auto">
          <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase px-2 mb-2">
            Overview
          </div>
          <ul className="space-y-0.5 mb-6">
            {PRIMARY.map((it) => {
              const active = it.match ? it.match(path) : path.startsWith(it.to);
              return (
                <li key={it.to}>
                  <Link
                    to={it.to}
                    search={{ demo: "aayush" } as never}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded text-[13px] transition-colors ${
                      active
                        ? "bg-ink text-bone"
                        : "text-graphite hover:bg-stone-soft hover:text-ink"
                    }`}
                  >
                    {it.icon}
                    <span>{it.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase px-2 mb-2">
            Accounts
          </div>
          <ul className="space-y-0.5">
            {ACCOUNTS.map((a) => {
              const to = `/dashboard/accounts/${a.id}`;
              const active = path === to;
              return (
                <li key={a.id}>
                  <Link
                    to="/dashboard/accounts/$id"
                    params={{ id: a.id }}
                    search={{ demo: "aayush" } as never}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded text-[13px] transition-colors ${
                      active
                        ? "bg-ink text-bone"
                        : "text-graphite hover:bg-stone-soft hover:text-ink"
                    }`}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: a.color }}
                    />
                    <span className="flex-1 truncate">{a.shortName}</span>
                    <span className={`font-mono text-[9px] ${active ? "text-bone/70" : "text-graphite/70"}`}>
                      {a.segment === "Hospitality" ? "HOT" : a.segment === "Quick Commerce" ? "QC" : "CC"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer ID */}
        <div className="px-5 py-4 border-t border-stone bg-paper">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-ink text-bone flex items-center justify-center text-[11px] font-display" style={{ fontVariationSettings: "'opsz' 24" }}>
              <em>J</em>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-ink text-[12px] leading-tight">Jesal Desai</div>
              <div className="font-mono text-graphite text-[9.5px]">Founder · Estoqi</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile nav overlay backdrop */}
      {mobileNavOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-ink/40"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* ─── MAIN COLUMN ─────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top utility bar */}
        <header className="bg-bone border-b border-stone px-5 lg:px-8 py-3 flex items-center gap-4">
          <button
            className="lg:hidden w-8 h-8 -ml-1 flex items-center justify-center text-graphite"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={18} strokeWidth={1.5} />
          </button>
          <div className="flex-1 max-w-[420px] relative">
            <Search size={13} strokeWidth={1.5} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-graphite" />
            <input
              type="search"
              placeholder="Search machines, sites, accounts, alerts"
              className="w-full bg-paper border border-stone rounded pl-7 pr-3 py-1.5 text-[12.5px] text-ink placeholder:text-graphite focus:outline-none focus:border-ink"
            />
          </div>
          <div className="hidden md:flex items-center gap-3 text-graphite font-mono text-[10.5px]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F5D3F] animate-pulse" />
              {fmtInt(kpis.machinesOnline)} ONLINE
            </span>
            <span className="text-stone">·</span>
            <span>
              <span className="text-[#B03C2F]">{fmtInt(kpis.severeAlerts)}</span> SEVERE
            </span>
          </div>
          <button className="hidden lg:inline-flex items-center gap-1.5 bg-ink text-bone px-3 py-1.5 rounded text-[11px] font-mono tracking-[0.08em] uppercase">
            <Bot size={13} strokeWidth={1.5} />
            Ask Estoqi AI
          </button>
        </header>

        {/* Page title band */}
        {(title || breadcrumb) && (
          <section className="bg-bone border-b border-stone px-5 lg:px-8 pt-6 pb-5">
            {breadcrumb && breadcrumb.length > 0 && (
              <nav className="flex items-center gap-1.5 text-graphite font-mono text-[10px] tracking-[0.06em] mb-3">
                {breadcrumb.map((b, i) => (
                  <span key={`${b.label}-${i}`} className="inline-flex items-center gap-1.5">
                    {b.to ? (
                      <Link to={b.to} search={{ demo: "aayush" } as never} className="hover:text-ink">{b.label}</Link>
                    ) : (
                      <span className="text-ink">{b.label}</span>
                    )}
                    {i < breadcrumb.length - 1 && <ChevronRight size={11} strokeWidth={1.5} className="text-stone" />}
                  </span>
                ))}
              </nav>
            )}
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                {title && (
                  <h1 className="font-display text-ink text-[28px] lg:text-[36px] leading-[1.05]" style={{ fontVariationSettings: "'opsz' 48" }}>
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-graphite text-[13.5px] leading-[1.5] mt-2 max-w-[60ch]">
                    {subtitle}
                  </p>
                )}
              </div>
              {headerRight && <div className="shrink-0">{headerRight}</div>}
            </div>
          </section>
        )}

        {/* Content area */}
        <main className="flex-1 px-5 lg:px-8 py-7 lg:py-9 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;

/* ─── Re-exported helpers used by every page ─────────────────────── */

export const Card: React.FC<{ children: React.ReactNode; className?: string; pad?: boolean }> = ({ children, className = "", pad = true }) => (
  <div className={`bg-bone border border-stone rounded ${pad ? "p-5 lg:p-6" : ""} ${className}`}>
    {children}
  </div>
);

export const SectionTitle: React.FC<{ children: React.ReactNode; right?: React.ReactNode; eyebrow?: string }> = ({ children, right, eyebrow }) => (
  <div className="flex items-end justify-between gap-4 mb-4">
    <div>
      {eyebrow && (
        <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase mb-1.5">{eyebrow}</div>
      )}
      <h2 className="font-display text-ink text-[18px] lg:text-[20px] leading-tight">
        {children}
      </h2>
    </div>
    {right}
  </div>
);

export const HealthDot: React.FC<{ color: string; label?: string }> = ({ color, label }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: color }} />
    {label && <span className="font-mono text-[10px] tracking-[0.06em] uppercase">{label}</span>}
  </span>
);

export const Pill: React.FC<{ children: React.ReactNode; fg: string; bg: string }> = ({ children, fg, bg }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9.5px] tracking-[0.08em] uppercase"
    style={{ background: bg, color: fg }}
  >
    {children}
  </span>
);

/** Filter chip row used across multiple pages. */
export interface FilterOption { id: string; label: string; count?: number }
interface FilterRowProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (id: string) => void;
}
export const FilterRow: React.FC<FilterRowProps> = ({ label, options, value, onChange }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <span className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase mr-1">{label}</span>
    {options.map((o) => {
      const active = o.id === value;
      return (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`px-2.5 py-1 rounded-full border text-[11px] font-mono tracking-[0.06em] uppercase transition-colors ${
            active
              ? "bg-ink text-bone border-ink"
              : "bg-bone text-graphite border-stone hover:border-ink hover:text-ink"
          }`}
        >
          {o.label}
          {typeof o.count === "number" && (
            <span className={`ml-1.5 ${active ? "text-bone/60" : "text-graphite/60"}`}>
              {o.count}
            </span>
          )}
        </button>
      );
    })}
  </div>
);
