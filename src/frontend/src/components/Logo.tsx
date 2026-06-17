import type React from "react";

/* =====================================================================
   ESTOQI · Logo
   The official brand lockup — the circular "e" mark beside the ESTOQI
   wordmark. Both are the real artwork (transparent PNG), served in two
   tones: navy on light surfaces, white-with-blue-arc on dark surfaces.
   One logo, used everywhere.
   ===================================================================== */

type Tone = "ink" | "bone";

interface Props {
  /** "ink" → navy logo for light surfaces · "bone" → light logo for dark surfaces. */
  tone?: Tone;
  /** Pixel height of the circular mark; the wordmark scales to match. */
  markHeight?: number;
  /** Show the ESTOQI wordmark beside the mark. Off → mark only. */
  showWordmark?: boolean;
  className?: string;
}

const Logo: React.FC<Props> = ({
  tone = "ink",
  markHeight = 32,
  showWordmark = true,
  className = "",
}) => {
  const light = tone === "bone";
  const mark = light
    ? "/assets/brand/estoqi-mark-light.png"
    : "/assets/brand/estoqi-mark.png";
  const word = light
    ? "/assets/brand/estoqi-wordmark-light.png"
    : "/assets/brand/estoqi-wordmark.png";

  // The wordmark cap-height reads best at ~0.46× the mark; gap echoes that.
  const wordHeight = Math.round(markHeight * 0.46);
  const gap = Math.round(markHeight * 0.42);

  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ gap }}
      aria-label="Estoqi"
    >
      <img
        src={mark}
        alt=""
        style={{ height: markHeight, width: "auto", display: "block" }}
      />
      {showWordmark && (
        <img
          src={word}
          alt=""
          style={{ height: wordHeight, width: "auto", display: "block" }}
        />
      )}
    </span>
  );
};

export default Logo;
