import type React from "react";
import { useState, useMemo } from "react";
import { Plus, Minus, Trash2, Check, Wifi, Battery, ChevronRight, BadgeCheck } from "lucide-react";
import DashboardShell from "../DashboardShell";

/* =====================================================================
   Operator UI · the iPad checkout
   What the floor operator at a Compass / Taj / Blinkit kitchen sees
   when they're about to run a wash. Touch-first tiles, kg entry, start
   button. Two states: idle + active wash.
   ===================================================================== */

interface ProduceOption {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const PRODUCE: ProduceOption[] = [
  { id: "tomato",    name: "Tomato",    emoji: "🍅", color: "#B03C2F" },
  { id: "okra",      name: "Okra",      emoji: "🥒", color: "#1F5D3F" },
  { id: "brinjal",   name: "Brinjal",   emoji: "🍆", color: "#5C2C73" },
  { id: "spinach",   name: "Spinach",   emoji: "🥬", color: "#2F6F3D" },
  { id: "coriander", name: "Coriander", emoji: "🌿", color: "#5BA047" },
  { id: "capsicum",  name: "Capsicum",  emoji: "🫑", color: "#D89A2E" },
  { id: "cucumber",  name: "Cucumber",  emoji: "🥒", color: "#7AAE5A" },
  { id: "apple",     name: "Apple",     emoji: "🍎", color: "#A8453D" },
  { id: "mango",     name: "Mango",     emoji: "🥭", color: "#E0A23A" },
  { id: "grapes",    name: "Grapes",    emoji: "🍇", color: "#6B4291" },
  { id: "carrot",    name: "Carrot",    emoji: "🥕", color: "#D97A2E" },
  { id: "mixed",     name: "Mixed",     emoji: "🧺", color: "#7B7B78" },
];

const Operator: React.FC = () => {
  const [bucket, setBucket] = useState<Record<string, number>>({});
  const [activeCycle, setActiveCycle] = useState<null | {
    items: Record<string, number>;
    startedAt: number;
    durationS: number;
  }>(null);

  const totalKg = Object.values(bucket).reduce((s, v) => s + v, 0);
  const BASKET_LIMIT = 25;

  const bump = (id: string, by: number) => {
    setBucket((prev) => {
      const cur = prev[id] || 0;
      const next = Math.max(0, Math.min(BASKET_LIMIT, cur + by));
      const nextTotal = totalKg - cur + next;
      if (nextTotal > BASKET_LIMIT) return prev;
      const out = { ...prev, [id]: next };
      if (next === 0) delete out[id];
      return out;
    });
  };

  const startWash = () => {
    if (totalKg === 0) return;
    setActiveCycle({
      items: { ...bucket },
      startedAt: Date.now(),
      durationS: Math.round(totalKg * 70 + 20),
    });
    setBucket({});
  };

  const clear = () => setBucket({});

  return (
    <DashboardShell
      breadcrumb={[
        { label: "Dashboard", to: "/dashboard" },
        { label: "Operator UI" },
      ]}
      title={<>Operator UI <em className="text-graphite font-light">— the iPad.</em></>}
      subtitle="What the floor operator sees on the touchscreen mounted next to the Estoqi machine. Designed for gloved hands and 6-second decisions."
    >
      <div className="flex justify-center">
        {/* iPad bezel */}
        <div className="relative bg-ink rounded-[36px] p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] max-w-[920px] w-full">
          <div className="relative bg-[#FBF8EE] rounded-[24px] overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
            {/* Status bar */}
            <div className="px-6 pt-3 flex items-center justify-between font-mono text-[10.5px] text-graphite">
              <div className="flex items-center gap-2">
                <span className="font-display text-ink text-[14px] leading-none" style={{ fontVariationSettings: "'opsz' 24" }}>
                  est<em>oqi</em>
                </span>
                <span>·</span>
                <span>EQ-3047 · Counter Pro</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><Wifi size={11} strokeWidth={1.5} /> GSM</span>
                <span className="inline-flex items-center gap-1 text-[#1F5D3F]"><BadgeCheck size={11} strokeWidth={1.5} /> Anuj P.</span>
                <span>{new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>

            {activeCycle ? (
              <CycleRunning
                cycle={activeCycle}
                onDone={() => setActiveCycle(null)}
              />
            ) : (
              <div className="px-6 pb-6 pt-3 h-full flex flex-col">
                {/* Title */}
                <div className="mb-3">
                  <h2 className="font-display text-ink text-[26px] leading-tight">What are we washing?</h2>
                  <p className="text-graphite text-[12px] mt-1">Tap to add. Basket limit · 25 kg per cycle.</p>
                </div>

                {/* Tiles grid */}
                <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
                  {PRODUCE.map((p) => {
                    const v = bucket[p.id] || 0;
                    const active = v > 0;
                    return (
                      <button
                        key={p.id}
                        onClick={() => bump(p.id, 1)}
                        className={`relative aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                          active
                            ? "border-ink bg-bone"
                            : "border-stone bg-paper hover:border-graphite"
                        }`}
                      >
                        <span className="text-[28px] leading-none">{p.emoji}</span>
                        <span className="font-mono text-[10px] tracking-[0.04em] uppercase text-ink">{p.name}</span>
                        {active && (
                          <span className="absolute top-1.5 right-1.5 bg-ink text-bone font-mono text-[10px] px-1.5 py-0.5 rounded-full tabular-nums">
                            {v}kg
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Basket */}
                <div className="bg-bone border border-stone rounded-2xl p-4 flex-1">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="font-display text-ink text-[16px]">Basket</h3>
                    <span className="font-mono text-[11px] text-graphite">{totalKg}/{BASKET_LIMIT} kg</span>
                  </div>
                  {totalKg === 0 ? (
                    <p className="text-graphite text-[13px]">Tap a tile to start.</p>
                  ) : (
                    <ul className="space-y-2">
                      {Object.entries(bucket).map(([id, v]) => {
                        const p = PRODUCE.find((x) => x.id === id)!;
                        return (
                          <li key={id} className="flex items-center gap-3">
                            <span className="text-[22px] w-7 text-center">{p.emoji}</span>
                            <span className="text-ink text-[14px] flex-1">{p.name}</span>
                            <div className="flex items-center gap-1">
                              <button onClick={() => bump(id, -1)} className="w-7 h-7 rounded-full bg-paper border border-stone flex items-center justify-center hover:border-ink">
                                <Minus size={12} strokeWidth={1.5} />
                              </button>
                              <span className="font-mono text-ink text-[14px] tabular-nums w-10 text-center">{v}kg</span>
                              <button onClick={() => bump(id, 1)} className="w-7 h-7 rounded-full bg-paper border border-stone flex items-center justify-center hover:border-ink">
                                <Plus size={12} strokeWidth={1.5} />
                              </button>
                              <button onClick={() => bump(id, -v)} className="w-7 h-7 rounded-full text-graphite hover:text-[#B03C2F] flex items-center justify-center">
                                <Trash2 size={12} strokeWidth={1.5} />
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {/* Footer actions */}
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={clear}
                    disabled={totalKg === 0}
                    className="px-4 py-3 rounded-full border border-stone font-mono text-[11px] tracking-[0.08em] uppercase text-graphite hover:border-ink hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Clear
                  </button>
                  <button
                    onClick={startWash}
                    disabled={totalKg === 0}
                    className="flex-1 px-6 py-3 rounded-full bg-ink text-bone font-mono text-[12px] tracking-[0.10em] uppercase hover:bg-[#022859] inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Start wash · {totalKg}kg <ChevronRight size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footnote */}
      <p className="text-center font-mono text-graphite text-[10.5px] tracking-[0.06em] uppercase mt-7">
        Operator UI · iPad orientation · the screen sits next to the flow-meter checkout
      </p>
    </DashboardShell>
  );
};

export default Operator;

/* ─── CycleRunning ──────────────────────────────────────────────── */

const CycleRunning: React.FC<{
  cycle: { items: Record<string, number>; startedAt: number; durationS: number };
  onDone: () => void;
}> = ({ cycle, onDone }) => {
  const total = Object.values(cycle.items).reduce((s, v) => s + v, 0);
  const items = Object.entries(cycle.items);
  // Static demo — show elapsed as a fixed % so the page is screenshot-stable.
  const pct = 38;
  return (
    <div className="px-6 pb-6 pt-3 h-full flex flex-col items-center justify-center text-center">
      <div className="font-mono text-graphite text-[10px] tracking-[0.18em] uppercase mb-3">Cycle in progress</div>
      <h2 className="font-display text-ink text-[34px] leading-tight mb-1">
        Washing <em>{total} kg.</em>
      </h2>
      <p className="text-graphite text-[13px] mb-7">
        {items.map(([id, v]) => {
          const p = PRODUCE.find((x) => x.id === id)!;
          return `${v}kg ${p.name}`;
        }).join(" · ")}
      </p>
      <div className="w-full max-w-[480px] mb-5">
        <div className="h-2.5 bg-stone rounded-full overflow-hidden">
          <div className="h-full bg-[#022859] rounded-full" style={{ width: `${pct}%`, transition: "width 1s linear" }} />
        </div>
        <div className="flex justify-between font-mono text-[10px] text-graphite mt-2">
          <span>pH 11.5 · live</span>
          <span>{Math.round(pct * cycle.durationS / 100)}s of {cycle.durationS}s</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 text-center mb-7">
        <div>
          <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase">pH 11.5</div>
          <div className="font-mono text-ink text-[18px] mt-0.5">11.52</div>
        </div>
        <div>
          <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase">Flow</div>
          <div className="font-mono text-ink text-[18px] mt-0.5">14.1 Lpm</div>
        </div>
        <div>
          <div className="font-mono text-graphite text-[9px] tracking-[0.18em] uppercase">Water used</div>
          <div className="font-mono text-ink text-[18px] mt-0.5">{Math.round(total * 3.7 * pct / 100)} L</div>
        </div>
      </div>
      <button
        onClick={onDone}
        className="px-6 py-2.5 rounded-full border border-ink text-ink font-mono text-[11px] tracking-[0.08em] uppercase hover:bg-ink hover:text-bone inline-flex items-center gap-2"
      >
        <Check size={13} strokeWidth={1.5} /> End cycle &amp; log
      </button>
    </div>
  );
};
