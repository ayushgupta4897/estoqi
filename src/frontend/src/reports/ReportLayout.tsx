import { QRCodeSVG } from "qrcode.react";
import type React from "react";
import type { ReportMeta } from "./data";

/* =====================================================================
   ESTOQI · ReportLayout
   The chrome shared by every Envirocare report. Body content is
   passed as children. Brand-aligned to the PDF originals: light
   gray surface, navy primary, light-blue title accent, Cormorant
   italic produce name, mono captions, QR in the footer.
   ===================================================================== */

interface Props {
  meta: ReportMeta;
  children: React.ReactNode;
  /* When the report is rendered standalone at /labs/reports/:slug,
     pass the full URL so the QR encodes a shareable link. */
  shareUrl?: string;
}

const ReportLayout: React.FC<Props> = ({ meta, children, shareUrl }) => {
  const qrValue =
    shareUrl ??
    (typeof window !== "undefined" ? window.location.href : `https://estoqi-ten.vercel.app/labs/reports/${meta.slug}`);

  return (
    <article
      className="mx-auto"
      style={{
        backgroundColor: "#f1f0eb",
        color: "#022859",
        maxWidth: "900px",
        padding: "44px 56px 24px",
        fontFamily: "Geist, system-ui, sans-serif",
        boxShadow: "0 30px 60px -20px rgba(2,40,89,0.18)",
      }}
    >
      {/* ── Header ── */}
      <header className="grid grid-cols-[1fr_auto] gap-6 items-start mb-3">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <EstoqiMark />
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "12px",
                letterSpacing: "0.10em",
                color: "#022859",
              }}
            >
              Estoqi
            </span>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "12px",
                letterSpacing: "0.08em",
                color: "#022859",
              }}
            >
              Case Study: {meta.kindLabel}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "64px",
              lineHeight: 1.0,
              color: "#3fa3c8",
              marginTop: "10px",
              letterSpacing: "-0.005em",
            }}
          >
            {meta.produce}
          </h1>
          <p
            style={{
              maxWidth: "58ch",
              fontSize: "14.5px",
              lineHeight: 1.55,
              color: "#022859",
              marginTop: "12px",
            }}
          >
            {meta.description}
          </p>
        </div>

        <BracketedImage src={meta.produceImage} alt={meta.produce} />
      </header>

      {/* ── Body ── */}
      <div className="mt-6">{children}</div>

      {/* ── Footer ── */}
      <footer
        className="grid grid-cols-[88px_1fr] gap-5 items-start pt-5 mt-8"
        style={{ borderTop: "1px solid rgba(2,40,89,0.18)" }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "4px",
            border: "1px solid rgba(2,40,89,0.12)",
          }}
        >
          <QRCodeSVG
            value={qrValue}
            size={80}
            level="M"
            bgColor="#ffffff"
            fgColor="#022859"
          />
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: "11px",
            lineHeight: 1.65,
            color: "#022859",
            letterSpacing: "0.01em",
          }}
        >
          <div>Lab Tested by: {meta.testedBy}</div>
          <div>Testing Method: {meta.testingMethod}</div>
          <div>Report Date: {meta.reportDate}</div>
          <div style={{ marginTop: "4px", opacity: 0.6 }}>
            Report Ref: {meta.reportNo}
          </div>
        </div>
      </footer>
    </article>
  );
};

/* ─── EstoqiMark · circular Estoqi C ───────────────────── */
const EstoqiMark: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
    <circle cx="14" cy="14" r="13" fill="none" stroke="#3fa3c8" strokeWidth="1.5" />
    <path
      d="M 20 8 A 8 8 0 1 0 20 20"
      fill="none"
      stroke="#022859"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── BracketedImage · corner brackets + image ──────────── */
const BracketedImage: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => (
  <div className="relative" style={{ width: "180px", height: "180px" }}>
    <img
      src={src}
      alt={alt}
      style={{
        position: "absolute",
        inset: "16px",
        width: "calc(100% - 32px)",
        height: "calc(100% - 32px)",
        objectFit: "cover",
      }}
    />
    {/* corner brackets */}
    {(
      [
        { top: 0, left: 0, rotate: 0 },
        { top: 0, right: 0, rotate: 90 },
        { bottom: 0, right: 0, rotate: 180 },
        { bottom: 0, left: 0, rotate: 270 },
      ] as Array<React.CSSProperties & { rotate: number }>
    ).map((pos, i) => {
      const { rotate, ...style } = pos;
      return (
        <svg
          key={i}
          width="36"
          height="36"
          viewBox="0 0 36 36"
          style={{ position: "absolute", transform: `rotate(${rotate}deg)`, ...style }}
        >
          <path
            d="M 4 28 L 4 4 L 28 4"
            fill="none"
            stroke="#022859"
            strokeWidth="3"
            strokeLinecap="square"
          />
        </svg>
      );
    })}
  </div>
);

export default ReportLayout;
