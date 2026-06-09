import type React from "react";
import { useMemo } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { Activity, Battery, Beaker, Cpu, Calendar, ArrowUpRight } from "lucide-react";
import DashboardShell, { Card, SectionTitle, Pill } from "../DashboardShell";
import { machineById, siteById, accountById, washesByMachine, alertsByMachine, ANOMALIES, LAST_7 } from "../data";
import { fmtInt, fmtKg, fmtLitres, HEALTH_COLOR, SEVERITY_COLOR, fmtAgo, fmtTime } from "../format";
import { PhCurve, AreaLine, Sparkline } from "../components/Charts";

/* =====================================================================
   Machine deep dive
   ===================================================================== */

const MachineView: React.FC = () => {
  const { id } = useParams({ from: "/dashboard/machines/$id" });
  const m = machineById(id);
  const site = m ? siteById(m.siteId) : undefined;
  const account = m ? accountById(m.accountId) : undefined;
  const washes = useMemo(() => m ? washesByMachine(m.id) : [], [m]);
  const alerts = useMemo(() => m ? alertsByMachine(m.id) : [], [m]);
  const anomalies = useMemo(() => m ? ANOMALIES.filter((a) => a.scope === "machine" && a.scopeId === m.id) : [], [m]);

  if (!m || !site || !account) {
    return (
      <DashboardShell title="Machine not found">
        <Card>No machine by that id.</Card>
      </DashboardShell>
    );
  }

  /* Synthesize a 24h pH 11.5 curve seeded by the machine's current state. */
  const phCurve = useMemo(() => {
    const target = m.ph115;
    const arr: { t: number; v: number }[] = [];
    for (let t = -23; t <= 0; t++) {
      const drift = t < -12 ? -0.04 : t < -6 ? -0.02 : 0;
      const noise = (Math.sin(t * 1.3) + Math.cos(t * 0.7)) * 0.015;
      arr.push({ t, v: +(target + drift + noise).toFixed(3) });
    }
    return arr;
  }, [m]);

  /* Flow curve (Lpm) over 24h */
  const flowCurve = useMemo(() => {
    const target = m.flowLpm;
    const arr: { t: number; v: number }[] = [];
    for (let t = -23; t <= 0; t++) {
      // Bigger swings during the wash windows (10-13h, 18-21h).
      const localH = (new Date().getHours() + t + 48) % 24;
      const intense = (localH >= 10 && localH <= 13) || (localH >= 18 && localH <= 21);
      const noise = (Math.random() - 0.5) * 0.4;
      arr.push({ t, v: +(intense ? target + noise : Math.max(0, target * 0.3 + noise)).toFixed(2) });
    }
    return arr;
  }, [m]);

  const last30 = useMemo(() => washes.map((w) => ({
    label: w.date.slice(8),
    value: w.produceKg,
  })), [washes]);

  /* Last 50 washes — synthesised log */
  const recentWashes = useMemo(() => {
    const out: { ts: string; kg: number; produce: string; durationS: number; flowAvg: number }[] = [];
    const produceOptions = ["Tomato","Okra","Brinjal","Spinach","Coriander","Capsicum","Mixed"];
    let mins = 18;
    for (let i = 0; i < 12; i++) {
      const ts = new Date(Date.now() - mins * 60_000).toISOString();
      const kg = +(6 + Math.random() * 22).toFixed(1);
      const produce = produceOptions[i % produceOptions.length];
      const durationS = Math.round(kg * (60 + Math.random() * 25));
      const flowAvg = +(m.flowLpm * (0.92 + Math.random() * 0.12)).toFixed(1);
      out.push({ ts, kg, produce, durationS, flowAvg });
      mins += 22 + Math.floor(Math.random() * 40);
    }
    return out;
  }, [m]);

  const hc = HEALTH_COLOR[m.status];

  const breadcrumb = [
    { label: "Dashboard", to: "/dashboard" },
    { label: account.shortName, to: `/dashboard/accounts/${account.id}` },
    { label: site.name, to: `/dashboard/sites/${site.id}` },
    { label: m.id },
  ];

  const headerRight = (
    <div className="flex items-center gap-3">
      <Pill fg={hc.fg} bg={hc.bg}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: hc.dot }} />
        {hc.label}
      </Pill>
      <div className="text-right">
        <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase">Installed</div>
        <div className="font-mono text-ink text-[12.5px]">{new Date(m.installedAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</div>
      </div>
    </div>
  );

  return (
    <DashboardShell
      breadcrumb={breadcrumb}
      title={<span className="font-mono">{m.id}</span>}
      subtitle={<>{m.model} · deployed at {site.name} · {fmtInt(m.lifetimeWashes)} lifetime washes · {fmtLitres(m.lifetimeWaterL)} dispensed</>}
      headerRight={headerRight}
    >
      {/* Live KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-7">
        <LiveKpi
          eyebrow="pH 9.5"
          value={m.ph95.toFixed(2)}
          state="ok"
          spark={[9.45, 9.52, 9.50, 9.48, 9.51, 9.50, m.ph95]}
        />
        <LiveKpi
          eyebrow="pH 11.5"
          value={m.ph115.toFixed(2)}
          state={m.ph115 > 11.75 ? "alert" : m.ph115 > 11.6 ? "warn" : "ok"}
          spark={phCurve.slice(-7).map((p) => p.v)}
        />
        <LiveKpi
          eyebrow="Flow Lpm"
          value={m.flowLpm.toFixed(1)}
          state={m.flowLpm === 0 ? "alert" : "ok"}
          spark={flowCurve.slice(-7).map((p) => p.v)}
        />
        <LiveKpi
          eyebrow="Electrode A"
          value={m.electrodeA.toFixed(2)}
          state={m.electrodeA > 4.4 ? "warn" : "ok"}
          spark={[3.9, 4.0, 3.95, 4.1, 4.08, 4.05, m.electrodeA]}
        />
        <LiveKpi
          eyebrow="Filter %"
          value={`${m.filterPct}%`}
          state={m.filterPct < 20 ? "alert" : m.filterPct < 40 ? "warn" : "ok"}
          spark={[Math.min(100, m.filterPct + 30), Math.min(100, m.filterPct + 24), Math.min(100, m.filterPct + 18), Math.min(100, m.filterPct + 12), Math.min(100, m.filterPct + 7), Math.min(100, m.filterPct + 3), m.filterPct]}
        />
      </div>

      {/* pH curve */}
      <Card className="mb-7">
        <SectionTitle eyebrow="Live · 24h" right={
          <div className="flex items-center gap-3 font-mono text-[10px] text-graphite">
            <span className="inline-flex items-center gap-1.5"><span className="w-2 h-0.5 bg-[#022859]" /> pH 11.5</span>
          </div>
        }>
          pH 11.5 wash-water curve
        </SectionTitle>
        <PhCurve
          data={phCurve}
          yMin={11.30}
          yMax={11.85}
          threshold={{ value: 11.75, label: "DRIFT THRESHOLD 11.75" }}
        />
      </Card>

      {/* Flow + 30-day produce */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-7">
        <Card className="lg:col-span-6">
          <SectionTitle eyebrow="Live · 24h">
            Flow rate · litres / min
          </SectionTitle>
          <PhCurve
            data={flowCurve}
            yMin={0}
            yMax={Math.max(20, m.flowLpm * 1.4)}
            color="#1F5D3F"
          />
        </Card>
        <Card className="lg:col-span-6">
          <SectionTitle eyebrow="30-day">
            Produce washed
          </SectionTitle>
          <AreaLine data={last30} height={140} color={account.color} fill={`${account.color}15`} />
        </Card>
      </div>

      {/* Last washes log + service */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-7">
        <Card className="lg:col-span-8">
          <SectionTitle eyebrow="Telemetry">
            Last 12 wash cycles
          </SectionTitle>
          <table className="w-full text-[12px]">
            <thead>
              <tr className="text-left text-graphite">
                <th className="py-2 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal">Time</th>
                <th className="py-2 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal">Produce</th>
                <th className="py-2 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal text-right">Mass</th>
                <th className="py-2 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal text-right">Duration</th>
                <th className="py-2 font-mono text-[9.5px] tracking-[0.18em] uppercase font-normal text-right">Flow avg</th>
              </tr>
            </thead>
            <tbody>
              {recentWashes.map((r, i) => (
                <tr key={i} className="border-t border-stone">
                  <td className="py-2 font-mono text-ink">{fmtTime(r.ts)}</td>
                  <td className="py-2 text-ink">{r.produce}</td>
                  <td className="py-2 font-mono text-ink text-right tabular-nums">{r.kg.toFixed(1)} kg</td>
                  <td className="py-2 font-mono text-graphite text-right tabular-nums">{Math.floor(r.durationS / 60)}m {r.durationS % 60}s</td>
                  <td className="py-2 font-mono text-graphite text-right tabular-nums">{r.flowAvg.toFixed(1)} Lpm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="lg:col-span-4">
          <SectionTitle eyebrow="Service">
            Maintenance status
          </SectionTitle>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <Battery size={16} strokeWidth={1.5} className="text-graphite" />
              <div className="flex-1">
                <div className="text-ink text-[12.5px]">Filter cartridge</div>
                <div className="h-1.5 bg-stone-soft rounded-full overflow-hidden mt-1">
                  <div className="h-full rounded-full" style={{
                    width: `${m.filterPct}%`,
                    background: m.filterPct < 20 ? "#B03C2F" : m.filterPct < 40 ? "#B88548" : "#1F5D3F",
                  }}/>
                </div>
              </div>
              <span className="font-mono text-ink text-[12px] tabular-nums">{m.filterPct}%</span>
            </li>
            <li className="flex items-center gap-3">
              <Beaker size={16} strokeWidth={1.5} className="text-graphite" />
              <div className="flex-1">
                <div className="text-ink text-[12.5px]">Electrode plates</div>
                <div className="font-mono text-graphite text-[10.5px] mt-0.5">Wear pattern within normal envelope</div>
              </div>
              <span className="font-mono text-ink text-[12px]">OK</span>
            </li>
            <li className="flex items-center gap-3">
              <Calendar size={16} strokeWidth={1.5} className="text-graphite" />
              <div className="flex-1">
                <div className="text-ink text-[12.5px]">Days since service</div>
                <div className="font-mono text-graphite text-[10.5px] mt-0.5">Next scheduled in {Math.max(0, 90 - m.daysSinceService)} days</div>
              </div>
              <span className="font-mono text-ink text-[12px]">{m.daysSinceService}d</span>
            </li>
          </ul>
          <button className="mt-5 w-full bg-ink text-bone py-2 rounded text-[11.5px] font-mono tracking-[0.06em] uppercase hover:bg-ink/90">
            Schedule field service
          </button>
        </Card>
      </div>

      {/* Recent alerts + anomalies for this machine */}
      {(alerts.length > 0 || anomalies.length > 0) && (
        <Card>
          <SectionTitle eyebrow="Inbox">
            Alerts &amp; anomalies for this machine
          </SectionTitle>
          {anomalies.map((a) => (
            <div key={a.id} className="mb-4 p-3.5 bg-paper border border-stone rounded">
              <div className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase mb-1">ML signal · {Math.round(a.confidence * 100)}% confidence</div>
              <div className="text-ink text-[13px] mb-1.5">{a.signal}</div>
              <p className="text-graphite text-[12.5px] leading-[1.55]">{a.explain}</p>
            </div>
          ))}
          <ul className="divide-y divide-stone">
            {alerts.slice(0, 6).map((a) => {
              const sev = SEVERITY_COLOR[a.severity];
              return (
                <li key={a.id} className="py-2.5 grid grid-cols-[60px_1fr_60px] items-center gap-3">
                  <Pill fg={sev.fg} bg={sev.bg}>{sev.label}</Pill>
                  <div>
                    <div className="text-ink text-[12.5px]">{a.title}</div>
                    <div className="font-mono text-graphite text-[10px] mt-0.5">{a.detail}</div>
                  </div>
                  <span className="text-right font-mono text-graphite text-[10px]">{fmtAgo(a.ts)}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </DashboardShell>
  );
};

export default MachineView;

const LiveKpi: React.FC<{ eyebrow: string; value: string; state: "ok" | "warn" | "alert"; spark: number[] }> = ({ eyebrow, value, state, spark }) => {
  const border = state === "alert" ? "border-[#B03C2F] bg-[rgba(176,60,47,0.04)]" :
                 state === "warn"  ? "border-[#B88548] bg-[rgba(184,133,72,0.05)]" :
                 "border-stone bg-bone";
  const sparkColor = state === "alert" ? "#B03C2F" : state === "warn" ? "#B88548" : "#022859";
  const sparkFill  = state === "alert" ? "rgba(176,60,47,0.10)" : state === "warn" ? "rgba(184,133,72,0.12)" : "rgba(2,40,89,0.10)";
  return (
    <div className={`border rounded p-3.5 ${border}`}>
      <div className="font-mono text-graphite text-[9.5px] tracking-[0.18em] uppercase mb-1.5">{eyebrow}</div>
      <div className="flex items-end justify-between gap-2">
        <div className="font-mono text-ink text-[20px] tabular-nums leading-none">{value}</div>
        <Sparkline data={spark} width={56} height={20} color={sparkColor} fill={sparkFill} showDot={false} />
      </div>
    </div>
  );
};
