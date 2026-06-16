import type React from "react";

/* =====================================================================
   ESTOQI · Wordmark
   "est" set in Fraunces with the variable optical-size token,
   "oqi" set in Cormorant Garamond italic in a contrasting tone.
   A small notch glyph (between "t" and "o") echoes the dual-stream
   split. One wordmark, used everywhere.
   ===================================================================== */

type Size = "nav" | "display" | "banner";
type Tone = "ink" | "bone";

interface Props {
  size?: Size;
  tone?: Tone;
  asLink?: boolean;
  /** Show the brand logomark (rounded square with italic 'e') to the
   *  left of the wordmark. Off by default — opt in per surface. */
  withMark?: boolean;
}

const SIZE: Record<Size, { fs: number; opsz: number }> = {
  nav:     { fs: 26, opsz: 32 },
  display: { fs: 56, opsz: 96 },
  banner:  { fs: 220, opsz: 144 },
};

const Wordmark: React.FC<Props> = ({ size = "nav", tone = "ink", withMark = false }) => {
  const { fs, opsz } = SIZE[size];
  const fg = tone === "ink" ? "var(--ink)" : "var(--bone)";
  const accent = "var(--vermillion)";
  const subtle = tone === "ink" ? "var(--graphite)" : "rgba(244,237,224,0.65)";
  // Logomark sits at ~0.92× of cap height for optical balance with the wordmark.
  const markSize = Math.round(fs * 0.92);
  const markFg = tone === "ink" ? "var(--bone)" : "var(--ink)";
  const markBg = tone === "ink" ? "var(--ink)" : "var(--bone)";

  return (
    <span
      aria-label="Estoqi"
      className="inline-flex items-center"
      style={{
        fontFamily: "Fraunces, Georgia, serif",
        fontVariationSettings: `'opsz' ${opsz}`,
        fontWeight: 500,
        fontSize: `${fs}px`,
        lineHeight: 1,
        letterSpacing: size === "banner" ? "-0.04em" : "-0.01em",
        color: fg,
        gap: withMark ? `${Math.max(6, fs * 0.30)}px` : undefined,
      }}
    >
      {withMark && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: markSize,
            height: markSize,
            borderRadius: Math.max(3, markSize * 0.20),
            background: markBg,
            color: markFg,
            fontFamily: "'Cormorant Garamond', Fraunces, serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: markSize * 0.78,
            lineHeight: 1,
            paddingBottom: markSize * 0.04,
          }}
        >
          e
        </span>
      )}
      <span className="inline-flex items-baseline">
      <span>est</span>
      {/* notch, a tiny line glyph between the two halves */}
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: size === "banner" ? "0.18em" : "0.08em",
          height: "1px",
          background: accent,
          margin: `0 ${size === "banner" ? "0.08em" : "0.04em"} 0.42em`,
          alignSelf: "center",
        }}
      />
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Fraunces, serif",
          fontStyle: "italic",
          fontWeight: 500,
          color: subtle,
        }}
      >
        oqi
      </span>
      </span>
    </span>
  );
};

export default Wordmark;
