import type React from "react";
import {
  BROCCOLI_NUTRITION,
  OKRA_PESTICIDE,
  RED_CAPSICUM_NUTRITION,
  RICE_PESTICIDE,
  SPINACH_MICROBIAL,
  TOMATO_PESTICIDE,
  TOMATO_SHELF_LIFE,
} from "./data";

/* =====================================================================
   ESTOQI · Report body variants
   Each is a leaf React component that consumes the strongly-typed
   data block from ./data.ts and renders the body in the brand
   system the PDFs established.
   ===================================================================== */

const NAVY = "#022859";
const LIGHT_BLUE = "#9cc7d9";
const BLUE_TILE = "#3fa3c8";

/* ─── shared atoms ──────────────────────────────────────── */
const Chip: React.FC<{ children: React.ReactNode; tone?: "ink" | "subtle" }> = ({
  children,
  tone = "ink",
}) => (
  <span
    className="font-mono uppercase"
    style={{
      backgroundColor: tone === "ink" ? "#dfe6f0" : "rgba(2,40,89,0.06)",
      color: NAVY,
      fontSize: "10.5px",
      letterSpacing: "0.06em",
      padding: "4px 10px",
      borderRadius: "999px",
      display: "inline-block",
    }}
  >
    {children}
  </span>
);

const Section: React.FC<{ children: React.ReactNode; tone?: "light" | "navy" }> = ({
  children,
  tone = "light",
}) => (
  <section
    style={{
      backgroundColor: tone === "navy" ? NAVY : "transparent",
      color: tone === "navy" ? "#ffffff" : NAVY,
      padding: tone === "navy" ? "26px 28px" : "20px 0",
      margin: "12px -8px",
    }}
  >
    {children}
  </section>
);

/* =====================================================================
   1 · TOMATO  ·  Pesticide Reduction (4-column table)
   ===================================================================== */
export const TomatoPesticideBody: React.FC = () => {
  const { columns, rows, takeaway } = TOMATO_PESTICIDE;
  return (
    <>
      <table
        className="w-full"
        style={{ borderCollapse: "collapse", marginTop: "8px" }}
      >
        <thead>
          <tr>
            <th
              className="text-left"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "20px",
                color: NAVY,
                padding: "10px 8px 14px",
                borderBottom: `1px solid ${NAVY}`,
              }}
            >
              Parameters
            </th>
            {columns.map((c) => (
              <th
                key={c}
                className="text-right"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "16px",
                  color: NAVY,
                  padding: "10px 8px 14px",
                  borderBottom: `1px solid ${NAVY}`,
                  fontWeight: c === "Estoqi Wash" ? 600 : 400,
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.compound}>
              <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(2,40,89,0.10)" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "16px" }}>
                  {r.compound}
                </div>
                <div className="font-mono" style={{ fontSize: "10.5px", color: NAVY, opacity: 0.7 }}>
                  {r.family}
                </div>
              </td>
              {r.values.map((v, i) => (
                <td
                  key={i}
                  className="text-right font-mono"
                  style={{
                    padding: "10px 8px",
                    borderBottom: "1px solid rgba(2,40,89,0.10)",
                    fontSize: "13px",
                    fontWeight: i === r.values.length - 1 ? 700 : 400,
                    color: v === "Eliminated" ? NAVY : NAVY,
                    fontStyle: v === "Eliminated" ? "normal" : "normal",
                    letterSpacing: "0.02em",
                  }}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "13px",
          lineHeight: 1.55,
          color: NAVY,
          fontStyle: "italic",
        }}
      >
        {takeaway}
      </p>
    </>
  );
};

/* =====================================================================
   2 · OKRA  ·  Pesticide Reduction (KPI tiles + eliminated/reduced)
   ===================================================================== */
export const OkraPesticideBody: React.FC = () => {
  const { tiles, hero, eliminated, reduced } = OKRA_PESTICIDE;
  return (
    <>
      {/* KPI tile band (light blue) */}
      <div
        className="grid grid-cols-4 gap-0"
        style={{ backgroundColor: BLUE_TILE, color: "#ffffff", padding: "20px 24px", marginTop: "12px" }}
      >
        {tiles.map((t) => (
          <div key={t.label}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "34px",
                lineHeight: 1,
                fontWeight: 600,
              }}
            >
              {t.value}
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: "10.5px",
                lineHeight: 1.4,
                opacity: 0.92,
                marginTop: "6px",
              }}
            >
              {t.label}
            </div>
          </div>
        ))}
      </div>

      {/* Hero band (navy) */}
      <div
        className="grid grid-cols-3 gap-6"
        style={{ backgroundColor: NAVY, color: "#ffffff", padding: "26px 28px" }}
      >
        {hero.map((h, i) => (
          <div key={i} style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.15)" : undefined, paddingLeft: i > 0 ? "20px" : 0 }}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: "44px",
                lineHeight: 1,
              }}
            >
              {h.value}
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.45, marginTop: "8px", opacity: 0.92 }}>
              {h.label}
            </div>
            <div
              className="font-mono"
              style={{
                marginTop: "10px",
                backgroundColor: "rgba(255,255,255,0.16)",
                padding: "4px 10px",
                borderRadius: "999px",
                fontSize: "10px",
                letterSpacing: "0.06em",
                display: "inline-block",
              }}
            >
              {h.chip}
            </div>
          </div>
        ))}
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-2 gap-12 mt-7">
        <div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontStyle: "italic",
              fontSize: "20px",
              color: NAVY,
              marginBottom: "16px",
            }}
          >
            Residues eliminated
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {eliminated.map((e) => (
              <div
                key={e.name}
                style={{
                  backgroundColor: NAVY,
                  color: "#ffffff",
                  borderRadius: "10px",
                  padding: "14px 18px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "18px" }}>
                  {e.name}
                </div>
                <div style={{ opacity: 0.7, fontSize: "12px", fontStyle: "italic" }}>({e.kind})</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontStyle: "italic",
              fontSize: "20px",
              color: NAVY,
              marginBottom: "16px",
            }}
          >
            Residues reduced
          </h3>
          <ul className="space-y-5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {reduced.map((r) => (
              <li key={r.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "16px" }}>
                    {r.name}
                  </span>
                  <Chip>↓ {r.delta}</Chip>
                </div>
                <div className="grid grid-cols-2 mt-2 font-mono" style={{ fontSize: "12.5px" }}>
                  <div>
                    <span style={{ fontStyle: "italic", opacity: 0.75 }}>Normal water</span>
                    <div>{r.normal}</div>
                  </div>
                  <div>
                    <span style={{ fontStyle: "italic", opacity: 0.75 }}>Estoqi Wash</span>
                    <div style={{ fontWeight: 700 }}>{r.estoqi}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

/* =====================================================================
   3 · RICE  ·  Pesticide Reduction (3-column table + hero stats)
   ===================================================================== */
export const RicePesticideBody: React.FC = () => {
  const { hero, columns, rows, takeaway } = RICE_PESTICIDE;
  return (
    <>
      <div
        className="grid grid-cols-3 gap-6"
        style={{ backgroundColor: NAVY, color: "#ffffff", padding: "26px 28px", marginTop: "12px" }}
      >
        {hero.map((h, i) => (
          <div key={i} style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.15)" : undefined, paddingLeft: i > 0 ? "20px" : 0 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "44px", lineHeight: 1 }}>
              {h.value}
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.45, marginTop: "8px", opacity: 0.92 }}>{h.label}</div>
            <div
              className="font-mono"
              style={{
                marginTop: "10px",
                backgroundColor: "rgba(255,255,255,0.14)",
                padding: "4px 10px",
                borderRadius: "999px",
                fontSize: "10px",
                letterSpacing: "0.06em",
                display: "inline-block",
              }}
            >
              {h.chip}
            </div>
          </div>
        ))}
      </div>

      <h3
        className="font-mono"
        style={{
          marginTop: "28px",
          fontSize: "11px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: NAVY,
          marginBottom: "12px",
        }}
      >
        All detected parameters · residue table
      </h3>

      <table className="w-full" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              className="text-left"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "20px",
                color: NAVY,
                padding: "10px 8px 14px",
                borderBottom: `1px solid ${NAVY}`,
              }}
            >
              Parameters
            </th>
            {columns.map((c) => (
              <th
                key={c}
                className="text-right"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "16px",
                  color: NAVY,
                  padding: "10px 8px 14px",
                  borderBottom: `1px solid ${NAVY}`,
                  fontWeight: c === "Estoqi Wash" ? 600 : 400,
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.compound}>
              <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(2,40,89,0.10)" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "16px" }}>
                  {r.compound}
                </div>
                <div className="font-mono" style={{ fontSize: "10.5px", color: NAVY, opacity: 0.7 }}>
                  {r.family}
                </div>
              </td>
              {r.values.map((v, i) => (
                <td
                  key={i}
                  className="text-right font-mono"
                  style={{
                    padding: "10px 8px",
                    borderBottom: "1px solid rgba(2,40,89,0.10)",
                    fontSize: "13px",
                    fontWeight: i === r.values.length - 1 ? 700 : 400,
                  }}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: "16px", fontSize: "13px", lineHeight: 1.55, color: NAVY, fontStyle: "italic" }}>
        {takeaway}
      </p>
    </>
  );
};

/* =====================================================================
   4 · SPINACH  ·  Microbial Load Reduction
   ===================================================================== */
export const SpinachMicrobialBody: React.FC = () => {
  const { rows, hero, tags } = SPINACH_MICROBIAL;
  const maxValue = Math.max(...rows.map((r) => r.kitchen.numeric));
  return (
    <>
      <h3
        className="font-mono"
        style={{
          marginTop: "12px",
          fontSize: "11px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: NAVY,
          marginBottom: "10px",
        }}
      >
        Quantifiable Bacterial Counts ·{" "}
        <span style={{ float: "right", letterSpacing: "0.04em" }}>cfu/g</span>
      </h3>

      <div className="space-y-6">
        {rows.map((row) => {
          const kPct = (row.kitchen.numeric / maxValue) * 100;
          const ePct = (row.estoqi.numeric / maxValue) * 100;
          return (
            <div key={row.name}>
              <div className="flex items-baseline justify-between mb-2">
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: NAVY,
                  }}
                >
                  {row.name}
                </h4>
                <span
                  className="font-mono"
                  style={{
                    backgroundColor: BLUE_TILE,
                    color: "#ffffff",
                    fontSize: "10.5px",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    letterSpacing: "0.06em",
                  }}
                >
                  ● {row.chip}
                </span>
              </div>
              <BarRow label="Kitchen Wash" widthPct={kPct} value={row.kitchen.display} unit={row.kitchen.unit} tone="dark" />
              <BarRow label="Estoqi Wash" widthPct={ePct} value={row.estoqi.display} unit={row.estoqi.unit} tone="light" />
            </div>
          );
        })}
      </div>

      {/* Hero band */}
      <div
        className="grid grid-cols-3 gap-6 mt-8"
        style={{ backgroundColor: NAVY, color: "#ffffff", padding: "26px 28px" }}
      >
        {hero.map((h, i) => (
          <div key={i} style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.15)" : undefined, paddingLeft: i > 0 ? "20px" : 0 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "44px", lineHeight: 1 }}>
              {h.value}
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.45, marginTop: "8px", opacity: 0.92 }}>{h.label}</div>
            <div
              className="font-mono"
              style={{
                marginTop: "10px",
                backgroundColor: "rgba(255,255,255,0.14)",
                padding: "4px 10px",
                borderRadius: "999px",
                fontSize: "10px",
                letterSpacing: "0.06em",
                display: "inline-block",
              }}
            >
              {h.chip}
            </div>
          </div>
        ))}
      </div>

      {/* Tag pills */}
      <div className="flex flex-wrap items-center gap-3 mt-7">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "15px", color: NAVY }}>
          Estoqi wash <span style={{ fontStyle: "italic" }}>Indicating better:</span>
        </span>
        {tags.map((t) => (
          <span
            key={t}
            style={{
              backgroundColor: NAVY,
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "999px",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );
};

const BarRow: React.FC<{
  label: string;
  widthPct: number;
  value: string;
  unit: string;
  tone: "dark" | "light";
}> = ({ label, widthPct, value, unit, tone }) => (
  <div className="grid grid-cols-[140px_1fr_120px] items-center gap-3 mb-2">
    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "14.5px", color: NAVY }}>
      {label}
    </div>
    <div style={{ backgroundColor: "rgba(2,40,89,0.10)", height: "12px", borderRadius: "999px", overflow: "hidden" }}>
      <div
        style={{
          width: `${Math.max(6, widthPct)}%`,
          height: "100%",
          backgroundColor: tone === "dark" ? NAVY : LIGHT_BLUE,
          borderRadius: "999px",
        }}
      />
    </div>
    <div className="font-mono text-right" style={{ fontSize: "12.5px", color: NAVY, fontWeight: tone === "light" ? 700 : 400 }}>
      {value} {unit}
    </div>
  </div>
);

/* =====================================================================
   5 · TOMATO  ·  Shelf life
   ===================================================================== */
export const TomatoShelfLifeBody: React.FC = () => {
  const { pills, hero, observed } = TOMATO_SHELF_LIFE;
  return (
    <>
      {/* Pills */}
      <div className="flex flex-wrap gap-3 mt-3">
        {pills.map((p) => (
          <span
            key={p}
            style={{
              backgroundColor: NAVY,
              color: "#ffffff",
              padding: "9px 22px",
              borderRadius: "999px",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "15px",
            }}
          >
            {p}
          </span>
        ))}
      </div>

      {/* Hero stats */}
      <div className="grid grid-cols-3 gap-10 mt-8 mb-8">
        {hero.map((h, i) => (
          <div key={i} style={{ borderLeft: i > 0 ? "1px solid rgba(2,40,89,0.18)" : undefined, paddingLeft: i > 0 ? "24px" : 0 }}>
            <div className="font-mono" style={{ fontSize: "26px", letterSpacing: "0.02em", color: NAVY, fontWeight: 600 }}>
              {h.value}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "16px", color: NAVY, marginTop: "6px" }}>
              {h.label}
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.55, color: NAVY, marginTop: "6px" }}>{h.body}</p>
          </div>
        ))}
      </div>

      {/* Observed outcomes table on navy */}
      <div style={{ backgroundColor: NAVY, color: "#ffffff", padding: "30px 28px", borderRadius: "4px" }}>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-x-6">
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "20px" }}>
              Observed Outcomes
            </h3>
            <p className="font-mono" style={{ fontSize: "11px", lineHeight: 1.55, marginTop: "10px", opacity: 0.85 }}>
              {observed.summary}
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "16px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
              Parameter
            </div>
            {observed.rows.map((r) => (
              <div key={r.parameter} style={{ paddingTop: "16px", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "15px" }}>
                {r.parameter}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "16px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
              Without Estoqi
            </div>
            {observed.rows.map((r) => (
              <div key={r.parameter} style={{ paddingTop: "16px", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "13px", opacity: 0.85 }}>
                {r.without}
              </div>
            ))}
          </div>
          <div
            style={{
              backgroundColor: "#ffffff",
              color: NAVY,
              padding: "18px 18px",
              borderRadius: "10px",
              marginTop: "-8px",
            }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "16px", paddingBottom: "12px", borderBottom: `1px solid rgba(2,40,89,0.18)` }}>
              Estoqi
            </div>
            {observed.rows.map((r, i) => (
              <div key={r.parameter} style={{ paddingTop: "16px", paddingBottom: "10px", borderBottom: i < observed.rows.length - 1 ? "1px solid rgba(2,40,89,0.10)" : "none", fontSize: "13px", fontWeight: 600 }}>
                {r.estoqi}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/* =====================================================================
   6 · BROCCOLI  ·  Nutrition Enrichment (two-metric)
   ===================================================================== */
export const BroccoliNutritionBody: React.FC = () => {
  const { metrics, tags } = BROCCOLI_NUTRITION;
  return (
    <>
      <div className="grid grid-cols-2 gap-10 mt-6">
        {metrics.map((m) => (
          <div
            key={m.title}
            style={{
              borderLeft: `1px solid rgba(2,40,89,0.18)`,
              paddingLeft: "24px",
              ...(metrics.indexOf(m) === 0 ? { borderLeft: "none", paddingLeft: 0 } : {}),
            }}
          >
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <div className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.14em", color: NAVY, textTransform: "uppercase" }}>
                  {m.title}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: BLUE_TILE, fontSize: "24px", marginTop: "2px" }}>
                  {m.subtitle}
                </div>
              </div>
              <span
                style={{
                  backgroundColor: m.tone === "positive" ? BLUE_TILE : "rgba(2,40,89,0.12)",
                  color: m.tone === "positive" ? "#ffffff" : NAVY,
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.10em",
                  padding: "4px 10px",
                  borderRadius: "999px",
                }}
              >
                ● {m.chip}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-3 my-3">
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: NAVY, fontSize: "15px" }}>
                Normal Water
              </div>
              <div className="font-mono" style={{ fontSize: "13.5px", color: NAVY }}>{m.normal}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: NAVY, fontSize: "15px", fontWeight: 600 }}>
                Estoqi Wash
              </div>
              <div className="font-mono" style={{ fontSize: "13.5px", color: NAVY, fontWeight: 700 }}>{m.estoqi}</div>
            </div>

            <div className="flex items-baseline gap-3 mt-5">
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: m.tone === "positive" ? 700 : 600,
                  fontStyle: m.tone === "positive" ? "normal" : "italic",
                  fontSize: m.tone === "positive" ? "38px" : "30px",
                  color: NAVY,
                  lineHeight: 1,
                }}
              >
                {m.headline}
              </div>
              <div style={{ fontSize: "12.5px", lineHeight: 1.5, color: NAVY, opacity: 0.85, maxWidth: "28ch" }}>
                {m.headlineNote}
              </div>
            </div>
            <div className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.14em", color: NAVY, opacity: 0.6, marginTop: "10px" }}>
              {m.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Tag pills */}
      <div className="flex flex-wrap items-center gap-3 mt-10">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "15px", color: NAVY }}>
          Estoqi Wash <span style={{ fontStyle: "italic" }}>Indicating Better:</span>
        </span>
        {tags.map((t) => (
          <span
            key={t}
            style={{
              backgroundColor: NAVY,
              color: "#ffffff",
              padding: "9px 18px",
              borderRadius: "999px",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );
};

/* =====================================================================
   7 · RED CAPSICUM  ·  Nutrition Enrichment (single-metric)
   ===================================================================== */
export const RedCapsicumNutritionBody: React.FC = () => {
  const { metric, hero, tags } = RED_CAPSICUM_NUTRITION;
  return (
    <>
      <div style={{ marginTop: "18px" }}>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: "22px",
            color: NAVY,
            marginBottom: "16px",
          }}
        >
          {metric.title}
        </h3>

        <BarRow label="Normal water" widthPct={metric.normalRatio * 100} value={metric.normal} unit="" tone="light" />
        <BarRow label="Estoqi Wash" widthPct={metric.estoqiRatio * 100} value={metric.estoqi} unit="" tone="dark" />

        <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: NAVY, marginTop: "16px", maxWidth: "70ch" }}>
          {metric.caption}
        </p>
      </div>

      {/* Hero band */}
      <div
        className="grid grid-cols-2 gap-8 mt-7"
        style={{ backgroundColor: NAVY, color: "#ffffff", padding: "28px 30px" }}
      >
        {hero.map((h, i) => (
          <div key={i} style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.18)" : undefined, paddingLeft: i > 0 ? "24px" : 0 }}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "60px",
                lineHeight: 1,
              }}
            >
              {h.value}
            </div>
            <div style={{ fontSize: "13.5px", lineHeight: 1.5, marginTop: "10px", opacity: 0.92, maxWidth: "34ch" }}>
              {h.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tag pills */}
      <div className="flex flex-wrap items-center gap-3 mt-8">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "15px", color: NAVY }}>
          Estoqi Wash <span style={{ fontStyle: "italic" }}>Indicating Better:</span>
        </span>
        {tags.map((t) => (
          <span
            key={t}
            style={{
              backgroundColor: NAVY,
              color: "#ffffff",
              padding: "9px 18px",
              borderRadius: "999px",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );
};

/* =====================================================================
   Registry · slug → body
   ===================================================================== */
export const REPORT_BODIES: Record<string, React.FC> = {
  "tomato-pesticide-reduction":       TomatoPesticideBody,
  "okra-pesticide-reduction":          OkraPesticideBody,
  "white-rice-pesticide-reduction":    RicePesticideBody,
  "spinach-microbial-reduction":       SpinachMicrobialBody,
  "tomato-shelf-life":                 TomatoShelfLifeBody,
  "broccoli-nutrition-enrichment":     BroccoliNutritionBody,
  "red-capsicum-nutrition-enrichment": RedCapsicumNutritionBody,
};
