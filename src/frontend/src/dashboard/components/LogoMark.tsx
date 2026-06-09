import { useState } from "react";
import type React from "react";
import { LOGOS } from "../logos";

interface LogoMarkProps {
  slug: string;
  /** Pixel height of the rendered mark. Width follows naturally. */
  height?: number;
  /** Display variant. "color" uses brand color; "muted" uses neutral grey. */
  tone?: "color" | "muted" | "ink";
}

/* Renders a real logo from the registry. If the URL fails (network /
 * CDN hiccup), falls back to a typeset wordmark using the registered
 * font + brand color. Either way, the consuming layout doesn't have to
 * know which path was taken. */
const LogoMark: React.FC<LogoMarkProps> = ({ slug, height = 22, tone = "color" }) => {
  const spec = LOGOS[slug];
  const [errored, setErrored] = useState(false);
  if (!spec) {
    return (
      <span style={{ fontSize: height * 0.7, color: "#404040" }}>
        {slug}
      </span>
    );
  }
  const color =
    tone === "muted" ? "#7B7B78" :
    tone === "ink" ? "#0D0D0D" :
    spec.color;

  if (spec.url && !errored) {
    return (
      <img
        src={spec.url}
        alt={spec.name}
        height={height}
        style={{
          height,
          width: "auto",
          objectFit: "contain",
          display: "block",
          filter: tone === "muted" ? "grayscale(1) opacity(0.55)" : undefined,
        }}
        onError={() => setErrored(true)}
      />
    );
  }

  /* Typeset fallback. */
  return (
    <span
      style={{
        fontFamily: "'Inter', 'Geist', 'Helvetica Neue', system-ui, sans-serif",
        fontWeight: spec.weight ?? 700,
        fontStyle: spec.italic ? "italic" : "normal",
        letterSpacing: spec.tracking ?? "normal",
        color,
        fontSize: height * 0.9,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {spec.word}
    </span>
  );
};

export default LogoMark;
