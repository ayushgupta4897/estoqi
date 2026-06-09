import type React from "react";

/* All charts are hand-rolled SVG. Calm, mono-tone, Plaid-school.
 *   • Sparkline  — small KPI-card trend
 *   • AreaLine   — main time-series
 *   • DonutMix   — produce mix
 *   • BarRanked  — site comparison
 *   • IndiaMap   — pin map with status colors
 * No Recharts; full control over typography + colour. */

const NAVY = "#022859";
const NAVY_DIM = "rgba(2, 40, 89, 0.10)";
const INK = "#0D0D0D";
const GRAPHITE = "#7B7B78";
const STONE = "#E5E1D6";

/* ─── Sparkline ───────────────────────────────────────────────── */

interface SparklineProps {
  data: number[];
  height?: number;
  width?: number;
  color?: string;
  fill?: string;
  showDot?: boolean;
}
export const Sparkline: React.FC<SparklineProps> = ({
  data, height = 36, width = 120, color = NAVY, fill = NAVY_DIM, showDot = true,
}) => {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const innerH = height - pad * 2;
  const stepX = (width - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => ({
    x: pad + i * stepX,
    y: pad + innerH - ((v - min) / range) * innerH,
  }));
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const area = `${path} L${pts[pts.length - 1].x} ${height} L${pts[0].x} ${height} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="trend">
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      {showDot && <circle cx={last.x} cy={last.y} r={2.5} fill={color} />}
    </svg>
  );
};

/* ─── AreaLine ────────────────────────────────────────────────── */

interface AreaLineProps {
  data: { label: string; value: number }[];
  height?: number;
  yLabel?: string;
  color?: string;
  fill?: string;
}
export const AreaLine: React.FC<AreaLineProps> = ({
  data, height = 220, yLabel, color = NAVY, fill = NAVY_DIM,
}) => {
  const w = 800; // viewBox width — SVG scales responsively
  const padL = 42, padR = 12, padT = 12, padB = 28;
  const min = 0;
  const max = Math.max(...data.map((d) => d.value)) * 1.1 || 1;
  const innerH = height - padT - padB;
  const innerW = w - padL - padR;
  const stepX = innerW / Math.max(1, data.length - 1);
  const pts = data.map((d, i) => ({
    x: padL + i * stepX,
    y: padT + innerH - ((d.value - min) / (max - min)) * innerH,
  }));
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const area = `${path} L${pts[pts.length - 1].x} ${padT + innerH} L${pts[0].x} ${padT + innerH} Z`;

  // 4 horizontal gridlines.
  const gridYs = [0, 0.33, 0.66, 1].map((t) => padT + innerH - t * innerH);
  const gridLabels = [0, 0.33, 0.66, 1].map((t) => max * t);

  // X tick every Math.ceil(n/6) points so the labels never collide.
  const tickStride = Math.max(1, Math.ceil(data.length / 6));

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full h-auto" preserveAspectRatio="none" role="img" aria-label={yLabel || "chart"}>
      {gridYs.map((y, i) => (
        <g key={i}>
          <line x1={padL} y1={y} x2={w - padR} y2={y} stroke={STONE} strokeDasharray="2 4" strokeWidth={0.6} />
          <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="9" fontFamily="'Geist Mono', monospace" fill={GRAPHITE}>
            {Math.round(gridLabels[i])}
          </text>
        </g>
      ))}
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      {pts.map((p, i) => (
        i % tickStride === 0 || i === pts.length - 1 ? (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={2} fill={color} />
            <text x={p.x} y={height - 8} textAnchor="middle" fontSize="9" fontFamily="'Geist Mono', monospace" fill={GRAPHITE}>
              {data[i].label}
            </text>
          </g>
        ) : null
      ))}
    </svg>
  );
};

/* ─── DonutMix ───────────────────────────────────────────────── */

interface DonutMixProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerSub?: string;
}
export const DonutMix: React.FC<DonutMixProps> = ({
  data, size = 200, thickness = 26, centerLabel, centerSub,
}) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2 - 2;
  const inner = r - thickness;
  const cx = size / 2, cy = size / 2;
  let acc = -Math.PI / 2; // start at 12 o'clock
  const arcs = data.map((d) => {
    const a = (d.value / total) * Math.PI * 2;
    const start = acc;
    const end = acc + a;
    acc += a;
    const large = a > Math.PI ? 1 : 0;
    const sx = cx + r * Math.cos(start), sy = cy + r * Math.sin(start);
    const ex = cx + r * Math.cos(end), ey = cy + r * Math.sin(end);
    const sxi = cx + inner * Math.cos(end), syi = cy + inner * Math.sin(end);
    const exi = cx + inner * Math.cos(start), eyi = cy + inner * Math.sin(start);
    const path = [
      `M ${sx} ${sy}`,
      `A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`,
      `L ${sxi} ${syi}`,
      `A ${inner} ${inner} 0 ${large} 0 ${exi} ${eyi}`,
      "Z",
    ].join(" ");
    return { path, color: d.color, label: d.label, value: d.value };
  });
  return (
    <div className="flex items-center gap-5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {arcs.map((a, i) => (
          <path key={i} d={a.path} fill={a.color} />
        ))}
        {centerLabel && (
          <>
            <text x={cx} y={cy - 2} textAnchor="middle" fontSize="22" fontFamily="'Geist Mono', monospace" fontWeight={600} fill={INK}>
              {centerLabel}
            </text>
            {centerSub && (
              <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fontFamily="'Geist Mono', monospace" fill={GRAPHITE}>
                {centerSub}
              </text>
            )}
          </>
        )}
      </svg>
      <ul className="flex-1 space-y-1.5 min-w-0">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2 text-[12px]">
            <span className="inline-block w-2 h-2 shrink-0" style={{ background: d.color, borderRadius: 1 }} />
            <span className="text-ink truncate flex-1">{d.label}</span>
            <span className="font-mono text-graphite">{Math.round((d.value / total) * 100)}%</span>
            <span className="font-mono text-graphite tabular-nums w-10 text-right">{d.value.toFixed(0)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ─── BarRanked ──────────────────────────────────────────────── */

interface BarRankedProps {
  data: { label: string; value: number; sub?: string; color?: string }[];
  unit?: string;
  max?: number;
}
export const BarRanked: React.FC<BarRankedProps> = ({ data, unit = "", max }) => {
  const top = max ?? (Math.max(...data.map((d) => d.value)) || 1);
  return (
    <ul className="space-y-2.5">
      {data.map((d) => (
        <li key={d.label} className="grid grid-cols-[1fr_70px] items-center gap-3">
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[13px] text-ink">{d.label}</span>
              {d.sub && <span className="font-mono text-graphite text-[10px]">{d.sub}</span>}
            </div>
            <div className="h-1.5 bg-stone-soft rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(2, (d.value / top) * 100)}%`,
                  background: d.color || NAVY,
                }}
              />
            </div>
          </div>
          <div className="text-right font-mono text-ink text-[12.5px] tabular-nums">
            {Math.round(d.value).toLocaleString("en-IN")}
            {unit && <span className="text-graphite ml-0.5 text-[10px]">{unit}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
};

/* ─── IndiaMap ───────────────────────────────────────────────── */

/* A stylised India outline as a single SVG path. Pin coords are mapped
 * from lat/lng to viewBox via a simple Mercator-ish projection bounded
 * to the Indian land mass. Not survey-accurate; visually faithful and
 * lightweight. */
interface IndiaMapProps {
  pins: { id: string; lat: number; lng: number; color: string; label?: string }[];
  height?: number;
}

// Projection bounds — keep the map tight to mainland India.
const LAT_MAX = 36.5, LAT_MIN = 7.5;
const LNG_MIN = 67.5, LNG_MAX = 97.5;

function project(lat: number, lng: number, w: number, h: number): { x: number; y: number } {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * w;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * h;
  return { x, y };
}

// Simplified Indian land outline. Not survey grade; calm + readable.
const INDIA_PATH = "M 314 78 L 305 92 L 296 102 L 288 116 L 282 132 L 285 146 L 297 155 L 311 152 L 322 144 L 333 152 L 343 168 L 354 184 L 366 190 L 380 188 L 390 195 L 397 211 L 404 230 L 405 252 L 397 270 L 388 286 L 379 304 L 372 322 L 363 342 L 356 360 L 345 378 L 332 394 L 318 410 L 304 422 L 290 432 L 276 441 L 263 448 L 251 454 L 238 459 L 226 462 L 214 459 L 203 451 L 191 442 L 180 432 L 169 419 L 159 405 L 150 390 L 142 374 L 134 357 L 126 339 L 119 320 L 113 300 L 109 280 L 107 259 L 108 238 L 113 217 L 121 198 L 132 182 L 145 168 L 159 156 L 174 144 L 191 134 L 209 124 L 228 116 L 247 108 L 266 100 L 285 92 L 304 84 L 314 78 Z";

export const IndiaMap: React.FC<IndiaMapProps> = ({ pins, height = 380 }) => {
  const w = 500;
  const h = height;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label="machine locations across India">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={STONE} strokeWidth={0.3} />
        </pattern>
      </defs>
      <rect width={w} height={h} fill="url(#grid)" opacity={0.5} />
      <path d={INDIA_PATH} fill="rgba(2, 40, 89, 0.04)" stroke="rgba(2, 40, 89, 0.30)" strokeWidth={0.8} strokeLinejoin="round" />
      {pins.map((p) => {
        const { x, y } = project(p.lat, p.lng, w, h);
        return (
          <g key={p.id}>
            <circle cx={x} cy={y} r={5} fill={p.color} opacity={0.18} />
            <circle cx={x} cy={y} r={2.2} fill={p.color} />
          </g>
        );
      })}
      {/* Legend */}
      <g transform={`translate(20 ${h - 60})`}>
        <text x={0} y={0} fontFamily="'Geist Mono', monospace" fontSize="8.5" fill={GRAPHITE} letterSpacing="0.06em">STATUS</text>
        {[
          { c: "#1F5D3F", l: "HEALTHY" },
          { c: "#B88548", l: "WARNING" },
          { c: "#B03C2F", l: "DEGRADED" },
          { c: "#404040", l: "OFFLINE" },
        ].map((row, i) => (
          <g key={row.l} transform={`translate(0 ${10 + i * 12})`}>
            <circle cx={3} cy={-2.5} r={2.2} fill={row.c} />
            <text x={10} y={0} fontFamily="'Geist Mono', monospace" fontSize="8.5" fill={INK} letterSpacing="0.06em">{row.l}</text>
          </g>
        ))}
      </g>
    </svg>
  );
};

/* ─── pH curve mini-line (for machine deep dive) ─────────────── */

interface PhCurveProps {
  /** Pairs of (hour offset, pH). */
  data: { t: number; v: number }[];
  yMin: number;
  yMax: number;
  threshold?: { value: number; label: string };
  color?: string;
  height?: number;
}
export const PhCurve: React.FC<PhCurveProps> = ({
  data, yMin, yMax, threshold, color = NAVY, height = 140,
}) => {
  const w = 800;
  const padL = 40, padR = 12, padT = 10, padB = 22;
  const innerH = height - padT - padB;
  const innerW = w - padL - padR;
  const stepX = innerW / Math.max(1, data.length - 1);
  const yFor = (v: number) => padT + innerH - ((v - yMin) / (yMax - yMin)) * innerH;
  const pts = data.map((d, i) => ({ x: padL + i * stepX, y: yFor(d.v) }));
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
      {[0, 0.5, 1].map((t, i) => {
        const y = padT + innerH * t;
        const v = yMax - t * (yMax - yMin);
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={w - padR} y2={y} stroke={STONE} strokeDasharray="2 4" strokeWidth={0.6} />
            <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="9" fontFamily="'Geist Mono', monospace" fill={GRAPHITE}>
              {v.toFixed(2)}
            </text>
          </g>
        );
      })}
      {threshold && (
        <g>
          <line x1={padL} y1={yFor(threshold.value)} x2={w - padR} y2={yFor(threshold.value)} stroke="#B03C2F" strokeWidth={0.8} strokeDasharray="4 3" />
          <text x={w - padR - 4} y={yFor(threshold.value) - 4} textAnchor="end" fontSize="9" fontFamily="'Geist Mono', monospace" fill="#B03C2F" letterSpacing="0.06em">
            {threshold.label}
          </text>
        </g>
      )}
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} />
      {[0, Math.floor(data.length / 2), data.length - 1].map((i) => (
        <text key={i} x={pts[i].x} y={height - 6} textAnchor="middle" fontSize="9" fontFamily="'Geist Mono', monospace" fill={GRAPHITE}>
          {data[i].t < 0 ? `−${Math.abs(data[i].t)}h` : data[i].t === 0 ? "now" : `+${data[i].t}h`}
        </text>
      ))}
    </svg>
  );
};
