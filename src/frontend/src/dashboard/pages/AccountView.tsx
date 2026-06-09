import type React from "react";
import { useState, useMemo } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Shield, Building2, Cpu } from "lucide-react";
import DashboardShell, { Card, SectionTitle, Pill, FilterRow } from "../DashboardShell";
import { accountById, sitesByAccount, MACHINES, washesByAccount, alertsByAccount, ANOMALIES, LAST_7, TODAY, ACCOUNTS } from "../data";
import { fmtInt, fmtKg, fmtLitres, HEALTH_COLOR, SEVERITY_COLOR, fmtAgo } from "../format";
import { AreaLine, Sparkline, BarRanked } from "../components/Charts";
import LogoMark from "../components/LogoMark";

/* =====================================================================
   Account view · the chain-owner perspective
   All sites under one account, with filters by city + health and a
   compliance audit-trail rollup. Compass-only: tenant marquee.
   ===================================================================== */

type HealthFilter = "all" | "healthy" | "warning" | "degraded" | "offline";

const AccountView: React.FC = () => {
  const { id } = useParams({ from: "/dashboard/accounts/$id" });
  const account = accountById(id);
  const [healthFilter, setHealthFilter] = useState<HealthFilter>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");

  const sites = useMemo(() => sitesByAccount(id), [id]);
  const machines = useMemo(() => MACHINES.filter((m) => m.accountId === id), [id]);
  const washes = useMemo(() => washesByAccount(id), [id]);
  const alerts = useMemo(() => alertsByAccount(id), [id]);
  const cities = useMemo(() => Array.from(new Set(sites.map((s) => s.city))).sort(), [sites]);

  const filteredSites = useMemo(() => sites.filter((s) => {
    if (healthFilter !== "all" && s.health !== healthFilter) return false;
    if (cityFilter !== "all" && s.city !== cityFilter) return false;
    return true;
  }), [sites, healthFilter, cityFilter]);

  if (!account) {
    return (
      <DashboardShell title="Account not found">
        <Card>
          <p className="text-graphite text-[14px]">No account by that id.</p>
        </Card>
      </DashboardShell>
    );
  }

  const breadcrumb = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Accounts" },
    { label: account.name },
  ];

  /* KPIs */
  const todayWashes = washes.filter((w) => w.date === TODAY);
  const weekWashes = washes.filter((w) => LAST_7.includes(w.date));
  const kpiProduceToday = todayWashes.reduce((s, w) => s + w.produceKg, 0);
  const kpiWaterToday = todayWashes.reduce((s, w) => s + w.waterL, 0);
  const kpiWashesToday = todayWashes.reduce((s, w) => s + w.washes, 0);
  const kpiWeekProduce = weekWashes.reduce((s, w) => s + w.produceKg, 0);

  /* 30-day series */
  const series30 = useMemo(() => {
    const dates = Array.from(new Set(washes.map((w) => w.date))).sort();
    return dates.map((d) => ({
      label: d.slice(8),
      value: washes.filter((w) => w.date === d).reduce((s, w) => s + w.produceKg, 0),
    }));
  }, [washes]);

  /* Sites ranked by produce this week */
  const rankedSites = useMemo(() => filteredSites.map((s) => {
    const sweek = weekWashes.filter((w) => w.siteId === s.id);
    return {
      label: s.name,
      sub: `${s.city} · ${s.machineCount} mc`,
      value: sweek.reduce((sum, w) => sum + w.produceKg, 0),
      siteId: s.id,
      health: s.health,
    };
  }).sort((x, y) => y.value - x.value), [filteredSites, weekWashes]);

  const openAlerts = alerts.filter((a) => a.status !== "resolved");
  const recentAnomalies = ANOMALIES.filter((a) => a.scope === "account" ? a.scopeId === id : sites.some((s) => s.id === a.scopeId)).slice(0, 4);

  const headerRight = (
    <div className="flex items-center gap-3">
      <Pill fg={account.color} bg={`${account.color}1A`}>{account.segment}</Pill>
      <div className="text-right">
        <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase">Live since</div>
        <div className="font-mono text-ink text-[12.5px]">{new Date(account.since).toLocaleDateString("en-IN", { dateStyle: "medium" })}</div>
      </div>
    </div>
  );

  return (
    <DashboardShell
      breadcrumb={breadcrumb}
      title={
        <span className="inline-flex items-center gap-4">
          <span className="inline-flex items-center justify-center h-12 px-4 bg-paper border border-stone rounded">
            <LogoMark slug={account.id} height={26} />
          </span>
          {account.name}
        </span>
      }
      subtitle={`${fmtInt(sites.length)} sites · ${fmtInt(machines.length)} Estoqi machines · HQ ${account.hq}.`}
      headerRight={headerRight}
    >
      {/* Tenant marquee (Compass only) */}
      {account.tenants && (
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 lg:gap-6 items-center">
            <div>
              <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase mb-1.5">Tenants served</div>
              <div className="font-display text-ink text-[15px] leading-tight">Whose canteens Compass runs</div>
            </div>
            <div className="flex items-center gap-7 lg:gap-9 flex-wrap">
              {account.tenants.map((t) => (
                <div key={t.id} className="h-7 flex items-center">
                  <LogoMark slug={t.id} height={20} />
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        <MiniKpi eyebrow="Produce today" value={fmtKg(kpiProduceToday)} />
        <MiniKpi eyebrow="Water today" value={fmtLitres(kpiWaterToday)} />
        <MiniKpi eyebrow="Washes today" value={fmtInt(kpiWashesToday)} />
        <MiniKpi
          eyebrow="Open alerts"
          value={fmtInt(openAlerts.length)}
          intent={openAlerts.filter((a) => a.severity === "severe").length > 0 ? "alert" : undefined}
        />
      </div>

      {/* 30-day chart */}
      <Card className="mb-7">
        <SectionTitle eyebrow="30-day" right={<span className="font-mono text-graphite text-[10px]">PRODUCE · KG</span>}>
          {account.shortName} · daily volume
        </SectionTitle>
        <AreaLine data={series30} height={220} color={account.color} fill={`${account.color}15`} />
      </Card>

      {/* Filters + sites table + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-7">
        <Card className="lg:col-span-8">
          <SectionTitle eyebrow="Sites">
            All {sites.length} sites · filterable
          </SectionTitle>
          <div className="mb-4 flex flex-col gap-3">
            <FilterRow
              label="Health"
              value={healthFilter}
              onChange={(v) => setHealthFilter(v as HealthFilter)}
              options={[
                { id: "all",      label: "All",      count: sites.length },
                { id: "healthy",  label: "Healthy",  count: sites.filter((s) => s.health === "healthy").length },
                { id: "warning",  label: "Warning",  count: sites.filter((s) => s.health === "warning").length },
                { id: "degraded", label: "Degraded", count: sites.filter((s) => s.health === "degraded").length },
                { id: "offline",  label: "Offline",  count: sites.filter((s) => s.health === "offline").length },
              ]}
            />
            <FilterRow
              label="City"
              value={cityFilter}
              onChange={setCityFilter}
              options={[
                { id: "all", label: "All cities" },
                ...cities.map((c) => ({ id: c, label: c, count: sites.filter((s) => s.city === c).length })),
              ]}
            />
          </div>

          <div className="border-t border-stone -mx-5 lg:-mx-6">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left">
                  <th className="px-5 lg:px-6 py-2.5 font-mono text-graphite text-[9px] tracking-[0.18em] uppercase font-normal">Site</th>
                  <th className="px-3 py-2.5 font-mono text-graphite text-[9px] tracking-[0.18em] uppercase font-normal">City</th>
                  <th className="px-3 py-2.5 font-mono text-graphite text-[9px] tracking-[0.18em] uppercase font-normal text-right">Machines</th>
                  <th className="px-3 py-2.5 font-mono text-graphite text-[9px] tracking-[0.18em] uppercase font-normal text-right">7-day kg</th>
                  <th className="px-3 py-2.5 font-mono text-graphite text-[9px] tracking-[0.18em] uppercase font-normal text-right">Trend</th>
                  <th className="px-3 py-2.5 font-mono text-graphite text-[9px] tracking-[0.18em] uppercase font-normal">Health</th>
                  <th className="px-5 lg:px-6 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {rankedSites.map((row) => {
                  const sObj = sites.find((x) => x.id === row.siteId)!;
                  const trend = LAST_7.map((d) =>
                    washes.filter((w) => w.siteId === row.siteId && w.date === d).reduce((s, w) => s + w.produceKg, 0)
                  );
                  const hc = HEALTH_COLOR[row.health];
                  return (
                    <tr key={row.siteId} className="border-t border-stone hover:bg-paper">
                      <td className="px-5 lg:px-6 py-3 text-ink">{row.label}</td>
                      <td className="px-3 py-3 text-graphite">{sObj.city}</td>
                      <td className="px-3 py-3 font-mono text-ink text-right tabular-nums">{sObj.machineCount}</td>
                      <td className="px-3 py-3 font-mono text-ink text-right tabular-nums">{fmtKg(row.value)}</td>
                      <td className="px-3 py-3 text-right"><Sparkline data={trend} width={64} height={20} showDot={false} color={account.color} fill={`${account.color}1A`} /></td>
                      <td className="px-3 py-3">
                        <Pill fg={hc.fg} bg={hc.bg}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: hc.dot }} />
                          {hc.label}
                        </Pill>
                      </td>
                      <td className="px-5 lg:px-6 py-3 text-right">
                        <Link to="/dashboard/sites/$id" params={{ id: row.siteId }} search={{ demo: "aayush" } as never} className="font-mono text-graphite text-[10px] tracking-[0.06em] uppercase hover:text-ink inline-flex items-center gap-1">
                          Open <ArrowUpRight size={11} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Open alerts */}
          <Card>
            <SectionTitle eyebrow="Inbox">
              Open alerts
            </SectionTitle>
            <ul className="divide-y divide-stone">
              {openAlerts.slice(0, 5).map((a) => {
                const sev = SEVERITY_COLOR[a.severity];
                return (
                  <li key={a.id} className="py-2 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <Pill fg={sev.fg} bg={sev.bg}>{sev.label}</Pill>
                      <span className="font-mono text-graphite text-[9.5px]">{fmtAgo(a.ts)}</span>
                    </div>
                    <div className="text-ink text-[12.5px] leading-tight">{a.title}</div>
                  </li>
                );
              })}
              {openAlerts.length === 0 && (
                <li className="py-3 text-graphite text-[12px]">No open alerts.</li>
              )}
            </ul>
          </Card>

          {/* Anomalies */}
          {recentAnomalies.length > 0 && (
            <Card>
              <SectionTitle eyebrow="ML signals">
                Recent anomalies
              </SectionTitle>
              <ul className="space-y-3">
                {recentAnomalies.map((a) => {
                  const sev = SEVERITY_COLOR[a.severity];
                  return (
                    <li key={a.id} className="border-l-2 pl-3 py-0.5" style={{ borderColor: sev.dot }}>
                      <div className="text-ink text-[12.5px] mb-0.5">{a.signal}</div>
                      <div className="font-mono text-graphite text-[10px] mb-1">{a.scopeLabel}</div>
                      <p className="text-graphite text-[11.5px] leading-[1.5]">{a.explain}</p>
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}

          {/* Compliance */}
          <Card>
            <SectionTitle eyebrow="Compliance">
              FSSAI audit trail
            </SectionTitle>
            <div className="flex items-start gap-3 mb-3">
              <Shield size={22} strokeWidth={1.5} className="text-[#1F5D3F] mt-0.5 shrink-0" />
              <div>
                <div className="text-ink text-[13px] leading-tight">100% recorded</div>
                <div className="font-mono text-graphite text-[10.5px] mt-0.5">
                  {fmtInt(weekWashes.reduce((s, w) => s + w.washes, 0))} wash cycles · last 7 days
                </div>
              </div>
            </div>
            <button className="w-full text-left bg-paper border border-stone rounded px-3 py-2 text-[12px] text-ink hover:bg-stone-soft">
              Download 90-day audit log · PDF
            </button>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
};

export default AccountView;

const MiniKpi: React.FC<{ eyebrow: string; value: string; intent?: "alert" }> = ({ eyebrow, value, intent }) => (
  <div className={`border rounded p-4 ${intent === "alert" ? "border-[#B03C2F] bg-[rgba(176,60,47,0.04)]" : "border-stone bg-bone"}`}>
    <div className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase mb-1.5">{eyebrow}</div>
    <div className="font-mono text-ink text-[22px] tabular-nums leading-none">{value}</div>
  </div>
);
