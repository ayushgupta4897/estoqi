import type React from "react";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Inbox, Sparkles } from "lucide-react";
import DashboardShell, { Card, SectionTitle, Pill, FilterRow } from "../DashboardShell";
import { ALERTS, ACCOUNTS, SITES, MACHINES, ANOMALIES } from "../data";
import { fmtAgo, SEVERITY_COLOR, STATUS_LABEL, ALERT_KIND_LABEL } from "../format";
import LogoMark from "../components/LogoMark";

/* =====================================================================
   Alerts inbox + anomaly stream
   ===================================================================== */

type SeverityFilter = "all" | "severe" | "warning" | "info";
type StatusFilter = "all" | "open" | "ack" | "resolved";

const AlertsInbox: React.FC = () => {
  const [sev, setSev] = useState<SeverityFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [account, setAccount] = useState<string>("all");

  const filtered = useMemo(() => {
    return ALERTS.filter((a) => {
      if (sev !== "all" && a.severity !== sev) return false;
      if (status !== "all" && a.status !== status) return false;
      if (account !== "all" && a.accountId !== account) return false;
      return true;
    });
  }, [sev, status, account]);

  const breadcrumb = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Alerts" },
  ];

  return (
    <DashboardShell
      breadcrumb={breadcrumb}
      title={<>Alerts <em className="text-graphite font-light">inbox.</em></>}
      subtitle={`${ALERTS.filter((a) => a.status === "open").length} open · ${ALERTS.filter((a) => a.severity === "severe" && a.status !== "resolved").length} severe · live across the fleet`}
    >
      {/* Filters */}
      <div className="mb-6 space-y-3">
        <FilterRow
          label="Severity"
          value={sev}
          onChange={(id) => setSev(id as SeverityFilter)}
          options={[
            { id: "all",     label: "All",     count: ALERTS.length },
            { id: "severe",  label: "Severe",  count: ALERTS.filter((a) => a.severity === "severe").length },
            { id: "warning", label: "Warning", count: ALERTS.filter((a) => a.severity === "warning").length },
            { id: "info",    label: "Info",    count: ALERTS.filter((a) => a.severity === "info").length },
          ]}
        />
        <FilterRow
          label="Status"
          value={status}
          onChange={(id) => setStatus(id as StatusFilter)}
          options={[
            { id: "all",      label: "All",      count: ALERTS.length },
            { id: "open",     label: "Open",     count: ALERTS.filter((a) => a.status === "open").length },
            { id: "ack",      label: "Acked",    count: ALERTS.filter((a) => a.status === "ack").length },
            { id: "resolved", label: "Resolved", count: ALERTS.filter((a) => a.status === "resolved").length },
          ]}
        />
        <FilterRow
          label="Account"
          value={account}
          onChange={setAccount}
          options={[
            { id: "all", label: "All accounts" },
            ...ACCOUNTS.map((a) => ({ id: a.id, label: a.shortName, count: ALERTS.filter((x) => x.accountId === a.id).length })),
          ]}
        />
      </div>

      {/* Anomaly stream */}
      <Card className="mb-6">
        <SectionTitle eyebrow="ML signals" right={<span className="font-mono text-graphite text-[10px] tracking-[0.06em] uppercase">Last 96h</span>}>
          <span className="inline-flex items-center gap-2"><Sparkles size={16} strokeWidth={1.5} className="text-[#022859]" /> Anomaly detection stream</span>
        </SectionTitle>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {ANOMALIES.map((a) => {
            const sevColor = SEVERITY_COLOR[a.severity];
            return (
              <li key={a.id} className="border border-stone rounded p-4 bg-paper">
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <span className="font-mono text-graphite text-[10px] tracking-[0.08em] uppercase">{a.scope === "machine" ? "Machine" : a.scope === "site" ? "Site" : "Account"}</span>
                  <Pill fg={sevColor.fg} bg={sevColor.bg}>{Math.round(a.confidence * 100)}% conf.</Pill>
                </div>
                <div className="font-display text-ink text-[15px] leading-tight mb-1.5">{a.scopeLabel}</div>
                <div className="text-ink text-[13px] mb-2">{a.signal}</div>
                <p className="text-graphite text-[12.5px] leading-[1.55] mb-3">{a.explain}</p>
                <div className="flex gap-2">
                  <button className="text-[11px] font-mono tracking-[0.06em] uppercase border border-stone bg-bone px-2.5 py-1 rounded hover:border-ink">Investigate</button>
                  <button className="text-[11px] font-mono tracking-[0.06em] uppercase border border-stone bg-bone px-2.5 py-1 rounded hover:border-ink">Dismiss</button>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Alerts table */}
      <Card pad={false}>
        <div className="px-5 lg:px-6 pt-5 pb-3 flex items-center justify-between gap-4 border-b border-stone">
          <div>
            <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase mb-1">Threshold + state alerts</div>
            <h2 className="font-display text-ink text-[18px] leading-tight inline-flex items-center gap-2">
              <Inbox size={16} strokeWidth={1.5} /> {filtered.length} alerts
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[11px] font-mono tracking-[0.06em] uppercase border border-stone bg-bone px-2.5 py-1 rounded hover:border-ink">Ack all</button>
            <button className="text-[11px] font-mono tracking-[0.06em] uppercase border border-stone bg-bone px-2.5 py-1 rounded hover:border-ink">Export CSV</button>
          </div>
        </div>
        <table className="w-full text-[12.5px]">
          <thead>
            <tr className="text-left text-graphite">
              <th className="px-5 lg:px-6 py-2.5 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal">Severity</th>
              <th className="py-2.5 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal">Title</th>
              <th className="py-2.5 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal">Account</th>
              <th className="py-2.5 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal">Machine</th>
              <th className="py-2.5 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal">Kind</th>
              <th className="py-2.5 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal">Assignee</th>
              <th className="py-2.5 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal text-right">When</th>
              <th className="px-5 lg:px-6 py-2.5 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const sevColor = SEVERITY_COLOR[a.severity];
              return (
                <tr key={a.id} className="border-t border-stone hover:bg-paper">
                  <td className="px-5 lg:px-6 py-2.5">
                    <Pill fg={sevColor.fg} bg={sevColor.bg}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: sevColor.dot }} />
                      {sevColor.label}
                    </Pill>
                  </td>
                  <td className="py-2.5">
                    <div className="text-ink leading-tight">{a.title}</div>
                    <div className="font-mono text-graphite text-[10px] mt-0.5">{a.detail}</div>
                  </td>
                  <td className="py-2.5">
                    <div className="h-5 inline-flex items-center">
                      <LogoMark slug={a.accountId} height={14} tone="ink" />
                    </div>
                  </td>
                  <td className="py-2.5 font-mono text-ink">
                    {a.machineId
                      ? <Link to="/dashboard/machines/$id" params={{ id: a.machineId }} search={{ demo: "aayush" } as never} className="hover:underline">{a.machineId}</Link>
                      : <span className="text-graphite">—</span>}
                  </td>
                  <td className="py-2.5 text-graphite">{ALERT_KIND_LABEL[a.kind]}</td>
                  <td className="py-2.5 text-graphite">{a.assignee || <span className="text-stone">unassigned</span>}</td>
                  <td className="py-2.5 font-mono text-graphite text-right">{fmtAgo(a.ts)}</td>
                  <td className="px-5 lg:px-6 py-2.5 text-right">
                    <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink">{STATUS_LABEL[a.status]}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-graphite text-[13px]">
            No alerts match those filters. Try widening the scope.
          </div>
        )}
      </Card>
    </DashboardShell>
  );
};

export default AlertsInbox;
