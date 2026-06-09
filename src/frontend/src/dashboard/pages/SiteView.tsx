import type React from "react";
import { useMemo } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, UserCircle2, Wrench } from "lucide-react";
import DashboardShell, { Card, SectionTitle, Pill } from "../DashboardShell";
import { siteById, accountById, machinesBySite, washesBySite, alertsBySite, LAST_7, TODAY, ProduceKind } from "../data";
import { fmtInt, fmtKg, fmtLitres, HEALTH_COLOR, SEVERITY_COLOR, fmtAgo, fmtTime } from "../format";
import { DonutMix, AreaLine, Sparkline } from "../components/Charts";
import LogoMark from "../components/LogoMark";

/* =====================================================================
   Site view · one kitchen / dark store
   ===================================================================== */

const PRODUCE_COLORS: Record<string, string> = {
  Tomato:    "#B03C2F",
  Okra:      "#1F5D3F",
  Brinjal:   "#5C2C73",
  Spinach:   "#2F6F3D",
  Coriander: "#5BA047",
  Capsicum:  "#D89A2E",
  Cucumber:  "#7AAE5A",
  Apple:     "#A8453D",
  Mango:     "#E0A23A",
  Grapes:    "#6B4291",
  Mixed:     "#7B7B78",
};

const SiteView: React.FC = () => {
  const { id } = useParams({ from: "/dashboard/sites/$id" });
  const site = siteById(id);
  const account = site ? accountById(site.accountId) : undefined;
  const machines = useMemo(() => site ? machinesBySite(site.id) : [], [site]);
  const washes = useMemo(() => site ? washesBySite(site.id) : [], [site]);
  const alerts = useMemo(() => site ? alertsBySite(site.id) : [], [site]);

  if (!site || !account) {
    return (
      <DashboardShell title="Site not found">
        <Card>No site by that id.</Card>
      </DashboardShell>
    );
  }

  const todayWashes = washes.filter((w) => w.date === TODAY);
  const weekWashes = washes.filter((w) => LAST_7.includes(w.date));
  const produceToday = todayWashes.reduce((s, w) => s + w.produceKg, 0);
  const waterToday = todayWashes.reduce((s, w) => s + w.waterL, 0);

  /* Produce mix donut from today's wash breakdowns. */
  const mixAgg: Record<string, number> = {};
  for (const w of todayWashes) {
    for (const k of Object.keys(w.breakdown) as ProduceKind[]) {
      mixAgg[k] = (mixAgg[k] || 0) + (w.breakdown[k] || 0);
    }
  }
  const mixData = Object.entries(mixAgg)
    .map(([label, value]) => ({ label, value, color: PRODUCE_COLORS[label] || "#7B7B78" }))
    .sort((a, b) => b.value - a.value);

  /* 30-day chart */
  const series30 = useMemo(() => {
    const dates = Array.from(new Set(washes.map((w) => w.date))).sort();
    return dates.map((d) => ({
      label: d.slice(8),
      value: washes.filter((w) => w.date === d).reduce((s, w) => s + w.produceKg, 0),
    }));
  }, [washes]);

  /* Mock inwards reconciliation: today's purchases (deterministic). */
  const purchaseKg = Math.round(produceToday * (0.92 + (machines.length % 5) * 0.012));
  const gapPct = produceToday > 0 ? ((produceToday - purchaseKg) / purchaseKg) * 100 : 0;
  const gapAlert = Math.abs(gapPct) > 5;

  /* Operator activity log */
  const operators = ["Anuj Patel", "Ravi Iyer", "Priya Sharma", "Vikram Rao"];
  const activityLog = useMemo(() => {
    const out: { ts: string; op: string; what: string }[] = [];
    let mins = 30;
    for (let i = 0; i < 8; i++) {
      const op = operators[i % operators.length];
      const what = [
        `Wash cycle started · ${Math.floor(8 + Math.random() * 16)}kg Tomato + ${Math.floor(2 + Math.random() * 6)}kg Coriander`,
        `Cycle complete · 23kg mixed`,
        `Manual override · pH bypass approved`,
        `Cycle complete · 18kg Capsicum`,
        `Filter cartridge swap`,
        `Wash cycle started · 12kg Spinach`,
        `Cycle complete · 14kg Cucumber`,
        `Operator login`,
      ][i % 8];
      out.push({
        ts: new Date(Date.now() - mins * 60_000).toISOString(),
        op,
        what,
      });
      mins += 25 + Math.floor(Math.random() * 35);
    }
    return out;
  }, [site.id]);

  const breadcrumb = [
    { label: "Dashboard", to: "/dashboard" },
    { label: account.shortName, to: `/dashboard/accounts/${account.id}` },
    { label: site.name },
  ];

  const headerRight = (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase">Site manager</div>
        <div className="font-mono text-ink text-[12.5px]">{site.manager}</div>
      </div>
    </div>
  );

  return (
    <DashboardShell
      breadcrumb={breadcrumb}
      title={site.name}
      subtitle={<><MapPin size={12} strokeWidth={1.5} className="inline mb-0.5 mr-1 text-graphite" /> {site.city}, {site.state} · {machines.length} machines deployed</>}
      headerRight={headerRight}
    >
      {/* Today snapshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        <MiniKpi eyebrow="Produce · today" value={fmtKg(produceToday)} />
        <MiniKpi eyebrow="Water · today" value={fmtLitres(waterToday)} />
        <MiniKpi eyebrow="Washes · today" value={fmtInt(todayWashes.reduce((s, w) => s + w.washes, 0))} />
        <MiniKpi
          eyebrow="Inwards gap"
          value={`${gapPct >= 0 ? "+" : ""}${gapPct.toFixed(1)}%`}
          intent={gapAlert ? "alert" : undefined}
        />
      </div>

      {/* Mix + 30 day trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-7">
        <Card className="lg:col-span-5">
          <SectionTitle eyebrow="Today">
            Produce mix
          </SectionTitle>
          {mixData.length ? (
            <DonutMix data={mixData} size={180} thickness={22} centerLabel={fmtKg(produceToday).replace(" kg", "")} centerSub="KG" />
          ) : (
            <p className="text-graphite text-[12.5px]">No washes recorded today yet.</p>
          )}
        </Card>
        <Card className="lg:col-span-7">
          <SectionTitle eyebrow="30-day" right={<span className="font-mono text-graphite text-[10px]">PRODUCE · KG</span>}>
            Volume trend
          </SectionTitle>
          <AreaLine data={series30} height={200} color={account.color} fill={`${account.color}15`} />
        </Card>
      </div>

      {/* Machines + reconciliation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-7">
        <Card className="lg:col-span-7">
          <SectionTitle eyebrow="Hardware">
            Machines at this site
          </SectionTitle>
          <ul className="divide-y divide-stone">
            {machines.map((m) => {
              const hc = HEALTH_COLOR[m.status];
              return (
                <li key={m.id} className="py-3 first:pt-0 grid grid-cols-[110px_1fr_140px_60px] items-center gap-3">
                  <Link to="/dashboard/machines/$id" params={{ id: m.id }} search={{ demo: "aayush" } as never} className="font-mono text-ink text-[13px] hover:underline">{m.id}</Link>
                  <div>
                    <div className="text-ink text-[12.5px]">{m.model}</div>
                    <div className="font-mono text-graphite text-[10px] mt-0.5">
                      pH 11.5: <span className={m.ph115 > 11.7 ? "text-[#B88548]" : ""}>{m.ph115.toFixed(2)}</span>
                      <span className="text-stone mx-1.5">·</span>
                      Flow: {m.flowLpm.toFixed(1)} Lpm
                      <span className="text-stone mx-1.5">·</span>
                      Filter: {m.filterPct}%
                    </div>
                  </div>
                  <div>
                    <Pill fg={hc.fg} bg={hc.bg}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: hc.dot }} />
                      {hc.label}
                    </Pill>
                  </div>
                  <Link to="/dashboard/machines/$id" params={{ id: m.id }} search={{ demo: "aayush" } as never} className="font-mono text-graphite text-[10px] tracking-[0.06em] uppercase hover:text-ink inline-flex items-center gap-1 justify-end">
                    Open <ArrowUpRight size={11} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="lg:col-span-5">
          <SectionTitle eyebrow="POS sync">
            Inwards reconciliation
          </SectionTitle>
          <ul className="space-y-3">
            <li className="grid grid-cols-2 items-center">
              <span className="text-graphite text-[12.5px]">Purchased (POS)</span>
              <span className="text-right font-mono text-ink text-[14px] tabular-nums">{fmtKg(purchaseKg)}</span>
            </li>
            <li className="grid grid-cols-2 items-center">
              <span className="text-graphite text-[12.5px]">Washed (Estoqi)</span>
              <span className="text-right font-mono text-ink text-[14px] tabular-nums">{fmtKg(produceToday)}</span>
            </li>
            <li className={`grid grid-cols-2 items-center border-t border-stone pt-3 ${gapAlert ? "text-[#B03C2F]" : ""}`}>
              <span className="text-[12.5px] font-medium">Variance</span>
              <span className="text-right font-mono text-[14px] tabular-nums">{gapPct >= 0 ? "+" : ""}{gapPct.toFixed(1)}%</span>
            </li>
          </ul>
          {gapAlert && (
            <div className="mt-3 p-3 bg-[rgba(176,60,47,0.06)] border border-[rgba(176,60,47,0.2)] rounded">
              <div className="font-mono text-[#7A2C2C] text-[9.5px] tracking-[0.18em] uppercase mb-1">Action</div>
              <p className="text-ink text-[12.5px] leading-[1.5]">
                Gap above 5% threshold. Auto-flagged for inwards review. Probable: shrinkage, manual-entry error, or unbilled banquet.
              </p>
            </div>
          )}
          <button className="mt-3 w-full text-left bg-paper border border-stone rounded px-3 py-2 text-[12px] text-ink hover:bg-stone-soft">
            Open inwards ledger
          </button>
        </Card>
      </div>

      {/* Operator activity + maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <Card className="lg:col-span-7">
          <SectionTitle eyebrow="Audit"><UserCircle2 size={14} strokeWidth={1.5} className="inline mr-1 -mt-1" /> Operator activity · last 6h</SectionTitle>
          <ul className="divide-y divide-stone font-mono text-[12px]">
            {activityLog.map((row, i) => (
              <li key={i} className="py-2 grid grid-cols-[60px_120px_1fr] gap-3 items-center">
                <span className="text-graphite text-[10.5px]">{fmtTime(row.ts)}</span>
                <span className="text-ink">{row.op}</span>
                <span className="text-graphite text-[11.5px] leading-tight">{row.what}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-5">
          <SectionTitle eyebrow="Service"><Wrench size={14} strokeWidth={1.5} className="inline mr-1 -mt-0.5" /> Upcoming maintenance</SectionTitle>
          <ul className="space-y-3">
            {machines.slice(0, 3).map((m, i) => (
              <li key={m.id} className="grid grid-cols-[100px_1fr_70px] items-center gap-3 py-1">
                <span className="font-mono text-ink text-[12.5px]">{m.id}</span>
                <span className="text-graphite text-[12px]">
                  {i === 0 ? "Filter cartridge swap" : i === 1 ? "Electrode plate inspection" : "Quarterly calibration"}
                </span>
                <span className="font-mono text-ink text-[11px] text-right">
                  {new Date(Date.now() + (i + 3) * 86400000).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardShell>
  );
};

export default SiteView;

const MiniKpi: React.FC<{ eyebrow: string; value: string; intent?: "alert" }> = ({ eyebrow, value, intent }) => (
  <div className={`border rounded p-4 ${intent === "alert" ? "border-[#B03C2F] bg-[rgba(176,60,47,0.04)]" : "border-stone bg-bone"}`}>
    <div className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase mb-1.5">{eyebrow}</div>
    <div className="font-mono text-ink text-[22px] tabular-nums leading-none">{value}</div>
  </div>
);
