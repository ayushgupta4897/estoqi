import type React from "react";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, TrendingUp, TrendingDown, Droplets, Cpu, Bell, AlertOctagon } from "lucide-react";
import DashboardShell, { Card, SectionTitle, HealthDot, Pill, FilterRow } from "../DashboardShell";
import { ACCOUNTS, SITES, MACHINES, WASHES, ALERTS, ANOMALIES, computeKpis, LAST_7, TODAY, washesByAccount } from "../data";
import { fmtInt, fmtKg, fmtLitres, fmtAgo, HEALTH_COLOR, SEVERITY_COLOR } from "../format";
import { Sparkline, AreaLine, IndiaMap, BarRanked } from "../components/Charts";
import LogoMark from "../components/LogoMark";

/* =====================================================================
   Network Health · Estoqi HQ
   The one-glance view of the entire fleet. KPIs at the top, India pin
   map, top accounts ranked, live alerts feed, anomaly callouts.
   ===================================================================== */

type SegmentFilter = "all" | "Corporate Catering" | "Hospitality" | "Quick Commerce";

const NetworkHealth: React.FC = () => {
  const [segment, setSegment] = useState<SegmentFilter>("all");

  const filteredAccounts = useMemo(
    () => segment === "all" ? ACCOUNTS : ACCOUNTS.filter((a) => a.segment === segment),
    [segment],
  );
  const accIds = new Set(filteredAccounts.map((a) => a.id));
  const filteredMachines = useMemo(() => MACHINES.filter((m) => accIds.has(m.accountId)), [accIds]);
  const filteredWashes = useMemo(() => WASHES.filter((w) => accIds.has(w.accountId)), [accIds]);
  const filteredAlerts = useMemo(() => ALERTS.filter((a) => accIds.has(a.accountId)), [accIds]);
  const filteredSites = useMemo(() => SITES.filter((s) => accIds.has(s.accountId)), [accIds]);
  const kpis = useMemo(() => computeKpis(filteredMachines, filteredWashes, filteredAlerts), [filteredMachines, filteredWashes, filteredAlerts]);

  /* 7-day series for the hero chart. */
  const weekSeries = useMemo(() => {
    return LAST_7.map((d) => {
      const dayWashes = filteredWashes.filter((w) => w.date === d);
      return {
        label: d.slice(5).replace("-", "/"),
        value: dayWashes.reduce((s, w) => s + w.produceKg, 0),
      };
    });
  }, [filteredWashes]);

  /* Sparkline data for the KPI cards. */
  const sparkProduce = weekSeries.map((d) => d.value);
  const sparkWater = LAST_7.map((d) => {
    const dayWashes = filteredWashes.filter((w) => w.date === d);
    return dayWashes.reduce((s, w) => s + w.waterL, 0);
  });
  const sparkWashes = LAST_7.map((d) => {
    const dayWashes = filteredWashes.filter((w) => w.date === d);
    return dayWashes.reduce((s, w) => s + w.washes, 0);
  });

  /* Map pins. */
  const pins = useMemo(() => filteredSites.map((s) => ({
    id: s.id,
    lat: s.lat,
    lng: s.lng,
    color: HEALTH_COLOR[s.health].dot,
  })), [filteredSites]);

  /* Top accounts ranked by produce kg this week. */
  const topAccounts = useMemo(() => {
    return filteredAccounts.map((a) => {
      const accWashes = washesByAccount(a.id).filter((w) => LAST_7.includes(w.date));
      return {
        label: a.shortName,
        value: accWashes.reduce((s, w) => s + w.produceKg, 0),
        sub: a.segment,
        color: a.color,
        id: a.id,
      };
    }).sort((x, y) => y.value - x.value);
  }, [filteredAccounts]);

  /* Live + open alerts for the inbox preview. */
  const liveAlerts = filteredAlerts.filter((a) => a.status === "open").slice(0, 8);

  /* Anomalies relevant to filter scope. */
  const liveAnomalies = ANOMALIES.filter((a) => {
    if (a.scope === "account") return accIds.has(a.scopeId);
    if (a.scope === "site") return filteredSites.some((s) => s.id === a.scopeId);
    return filteredMachines.some((m) => m.id === a.scopeId);
  }).slice(0, 4);

  const breadcrumb = [
    { label: "Dashboard" },
    { label: "Network Health" },
  ];

  const headerRight = (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase">As of</div>
        <div className="font-mono text-ink text-[12.5px]">{new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</div>
      </div>
    </div>
  );

  return (
    <DashboardShell
      breadcrumb={breadcrumb}
      title={<>Network Health <em className="text-graphite font-light">— India.</em></>}
      subtitle={`${fmtInt(kpis.machines)} Estoqi machines across ${fmtInt(kpis.sites)} sites and ${fmtInt(kpis.accounts)} accounts. Live.`}
      headerRight={headerRight}
    >
      {/* Filter row */}
      <div className="mb-6">
        <FilterRow
          label="Segment"
          value={segment}
          onChange={(id) => setSegment(id as SegmentFilter)}
          options={[
            { id: "all",                 label: "All",         count: ACCOUNTS.length },
            { id: "Corporate Catering",  label: "Catering",    count: ACCOUNTS.filter((a) => a.segment === "Corporate Catering").length },
            { id: "Hospitality",         label: "Hospitality", count: ACCOUNTS.filter((a) => a.segment === "Hospitality").length },
            { id: "Quick Commerce",      label: "Q-Commerce",  count: ACCOUNTS.filter((a) => a.segment === "Quick Commerce").length },
          ]}
        />
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        <KpiCard
          eyebrow="Machines online"
          value={`${fmtInt(kpis.machinesOnline)}/${fmtInt(kpis.machines)}`}
          delta="+12 this week"
          trend="up"
          spark={sparkWashes}
          icon={<Cpu size={13} strokeWidth={1.5} />}
        />
        <KpiCard
          eyebrow="Produce washed · today"
          value={fmtKg(kpis.produceKgToday)}
          delta="+8% vs 7-day avg"
          trend="up"
          spark={sparkProduce}
        />
        <KpiCard
          eyebrow="Water dispensed · today"
          value={fmtLitres(kpis.waterLToday)}
          delta="−2% vs 7-day avg"
          trend="down"
          spark={sparkWater}
          icon={<Droplets size={13} strokeWidth={1.5} />}
        />
        <KpiCard
          eyebrow="Open alerts"
          value={fmtInt(kpis.openAlerts)}
          delta={`${fmtInt(kpis.severeAlerts)} severe`}
          trend={kpis.severeAlerts > 0 ? "down" : "up"}
          spark={[3, 4, 4, 6, 5, 7, kpis.openAlerts]}
          icon={<Bell size={13} strokeWidth={1.5} />}
          intent={kpis.severeAlerts > 0 ? "alert" : undefined}
        />
      </div>

      {/* Map + week chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-7">
        <Card className="lg:col-span-7">
          <SectionTitle eyebrow="Map" right={<HealthLegendInline />}>
            Fleet across India
          </SectionTitle>
          <IndiaMap pins={pins} height={340} />
        </Card>
        <Card className="lg:col-span-5">
          <SectionTitle eyebrow="7-day" right={<span className="font-mono text-graphite text-[10px]">PRODUCE · KG</span>}>
            Volume trend
          </SectionTitle>
          <AreaLine data={weekSeries} height={220} />
          <div className="mt-3 pt-3 border-t border-stone grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase">7-day total</div>
              <div className="font-mono text-ink text-[14px] mt-0.5">{fmtKg(kpis.produceKgWeek)}</div>
            </div>
            <div>
              <div className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase">Avg / day</div>
              <div className="font-mono text-ink text-[14px] mt-0.5">{fmtKg(kpis.produceKgWeek / 7)}</div>
            </div>
            <div>
              <div className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase">Peak day</div>
              <div className="font-mono text-ink text-[14px] mt-0.5">{fmtKg(Math.max(...sparkProduce))}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Top accounts + alerts feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-7">
        <Card className="lg:col-span-5">
          <SectionTitle eyebrow="Accounts" right={<Link to="/dashboard" search={{ demo: "aayush" } as never} className="font-mono text-graphite text-[10px] tracking-[0.06em] uppercase hover:text-ink">All ↗</Link>}>
            Top by produce · 7-day
          </SectionTitle>
          <ul className="space-y-3">
            {topAccounts.slice(0, 7).map((a) => (
              <li key={a.id} className="grid grid-cols-[100px_1fr_70px] items-center gap-3">
                <Link
                  to="/dashboard/accounts/$id"
                  params={{ id: a.id }}
                  search={{ demo: "aayush" } as never}
                  className="block flex items-center h-6"
                >
                  <LogoMark slug={a.id} height={16} tone="ink" />
                </Link>
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-graphite text-[10.5px] uppercase font-mono tracking-[0.06em]">{a.sub}</span>
                  </div>
                  <div className="h-1.5 bg-stone-soft rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{
                      width: `${Math.max(2, (a.value / Math.max(...topAccounts.map(x => x.value))) * 100)}%`,
                      background: a.color,
                    }}/>
                  </div>
                </div>
                <div className="text-right font-mono text-ink text-[12.5px] tabular-nums">{fmtKg(a.value)}</div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-7">
          <SectionTitle eyebrow="Inbox" right={
            <Link to="/dashboard/alerts" search={{ demo: "aayush" } as never} className="font-mono text-graphite text-[10px] tracking-[0.06em] uppercase hover:text-ink inline-flex items-center gap-1">
              View all <ArrowUpRight size={11} />
            </Link>
          }>
            Live alerts feed
          </SectionTitle>
          <ul className="divide-y divide-stone">
            {liveAlerts.map((a) => {
              const sev = SEVERITY_COLOR[a.severity];
              const acc = ACCOUNTS.find((x) => x.id === a.accountId);
              return (
                <li key={a.id} className="py-2.5 first:pt-0 last:pb-0 grid grid-cols-[68px_1fr_70px] items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Pill fg={sev.fg} bg={sev.bg}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: sev.dot }} />
                      {sev.label.slice(0, 4)}
                    </Pill>
                  </div>
                  <div className="min-w-0">
                    <div className="text-ink text-[13px] leading-tight truncate">{a.title}</div>
                    <div className="font-mono text-graphite text-[10px] mt-0.5 flex items-center gap-1.5">
                      <span>{acc?.shortName}</span>
                      <span>·</span>
                      <span>{a.machineId ?? "site-level"}</span>
                    </div>
                  </div>
                  <div className="text-right font-mono text-graphite text-[10px]">{fmtAgo(a.ts)}</div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* Anomaly section */}
      <Card>
        <SectionTitle eyebrow="ML signals" right={
          <span className="font-mono text-graphite text-[10px] tracking-[0.06em] uppercase">Last 96h</span>
        }>
          Anomaly detection
        </SectionTitle>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {liveAnomalies.map((a) => {
            const sev = SEVERITY_COLOR[a.severity];
            return (
              <li key={a.id} className="border border-stone rounded p-4 bg-paper">
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <span className="font-mono text-graphite text-[10px] tracking-[0.08em] uppercase">{a.scope === "machine" ? "Machine" : a.scope === "site" ? "Site" : "Account"}</span>
                  <Pill fg={sev.fg} bg={sev.bg}>{Math.round(a.confidence * 100)}% conf.</Pill>
                </div>
                <div className="font-display text-ink text-[15.5px] leading-tight mb-1.5">{a.scopeLabel}</div>
                <div className="text-ink text-[13px] mb-2">{a.signal}</div>
                <p className="text-graphite text-[12.5px] leading-[1.55]">{a.explain}</p>
              </li>
            );
          })}
        </ul>
      </Card>
    </DashboardShell>
  );
};

export default NetworkHealth;

/* ─── KpiCard ────────────────────────────────────────────────── */

interface KpiCardProps {
  eyebrow: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  spark?: number[];
  icon?: React.ReactNode;
  intent?: "alert";
}
const KpiCard: React.FC<KpiCardProps> = ({ eyebrow, value, delta, trend, spark, icon, intent }) => (
  <div className={`border rounded p-4 lg:p-5 ${intent === "alert" ? "border-[#B03C2F] bg-[rgba(176,60,47,0.04)]" : "border-stone bg-bone"}`}>
    <div className="flex items-center justify-between mb-1.5">
      <div className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase flex items-center gap-1.5">
        {icon}
        {eyebrow}
      </div>
      {intent === "alert" && <AlertOctagon size={12} strokeWidth={1.5} className="text-[#B03C2F]" />}
    </div>
    <div className="flex items-baseline justify-between gap-3">
      <div className="font-mono text-ink text-[22px] lg:text-[26px] tabular-nums leading-none">{value}</div>
      {spark && <Sparkline data={spark} width={88} height={26} showDot={false} />}
    </div>
    {delta && (
      <div className={`text-[11px] mt-2 flex items-center gap-1 ${trend === "up" ? "text-[#1F5D3F]" : "text-[#B88548]"}`}>
        {trend === "up" ? <TrendingUp size={12} strokeWidth={1.5} /> : <TrendingDown size={12} strokeWidth={1.5} />}
        <span>{delta}</span>
      </div>
    )}
  </div>
);

const HealthLegendInline: React.FC = () => (
  <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.08em] uppercase">
    <HealthDot color={HEALTH_COLOR.healthy.dot} label="OK" />
    <HealthDot color={HEALTH_COLOR.warning.dot} label="WARN" />
    <HealthDot color={HEALTH_COLOR.degraded.dot} label="DEG" />
    <HealthDot color={HEALTH_COLOR.offline.dot} label="OFF" />
  </div>
);
