/* Brand logo registry. Real public-facing logos used as customer-marquee
 * references — the same pattern every B2B SaaS landing page uses.
 *
 * URLs are resolved at runtime; if a URL fails, the LogoMark component
 * falls back to a typeset wordmark in the brand color. The list below
 * is the result of the logo-research agent + manual verification.
 */

export interface LogoSpec {
  slug: string;
  name: string;
  /** Display word for the typeset fallback (shorter than name when needed). */
  word: string;
  url: string | null;
  color: string;
  /** Whether to invert the SVG to white on dark backgrounds. */
  invertable: boolean;
  /** Force a specific font weight on the typeset fallback. */
  weight?: 700 | 800 | 900;
  /** Italic the typeset fallback. */
  italic?: boolean;
  /** Letter-spacing tweak for the typeset fallback. */
  tracking?: string;
}

/** All logos served from Simple Icons CDN, which returns a single-color
 *  SVG you tint with the path's hex in the URL. Reliable, CORS-safe,
 *  zero licensing concerns for B2B mock dashboards. */
const SI = (slug: string, hex: string) => `https://cdn.simpleicons.org/${slug}/${hex.replace("#", "")}`;

/* Wikimedia mirror — hot-linkable, lets browsers load Commons-licensed
 * SVGs / PNGs directly. We hit upload.wikimedia.org. */
const WP = (p: string) => `https://upload.wikimedia.org/wikipedia/${p}`;

export const LOGOS: Record<string, LogoSpec> = {
  /* Catering */
  compass: {
    slug: "compass", name: "Compass Group",
    word: "Compass", url: WP("en/4/49/Compass_Group.svg"),
    color: "#003F87", invertable: true, weight: 800, tracking: "-0.01em",
  },
  sodexo: {
    slug: "sodexo", name: "Sodexo",
    word: "Sodexo", url: WP("commons/9/90/Sodexo_logo.svg"),
    color: "#D10C00", invertable: true, weight: 800, tracking: "-0.02em",
  },
  cremica: {
    /* No public SVG / PNG for Cremica — typeset wordmark only. */
    slug: "cremica", name: "Cremica",
    word: "CREMICA", url: null,
    color: "#C8102E", invertable: true, weight: 800, tracking: "0.04em",
  },

  /* Hospitality */
  taj: {
    slug: "taj", name: "Taj Hotels",
    word: "TAJ", url: WP("en/9/92/Indian_Hotels_Company_Limited_logo.svg"),
    color: "#1D1D1D", invertable: true, weight: 700, tracking: "0.18em",
  },
  oberoi: {
    slug: "oberoi", name: "The Oberoi Group",
    word: "Oberoi", url: WP("en/9/9b/The_Oberoi_Group.png"),
    color: "#B8860B", invertable: true, weight: 700, italic: true, tracking: "0.04em",
  },
  leela: {
    slug: "leela", name: "The Leela",
    word: "THE LEELA", url: WP("commons/2/29/The_Leela_Palaces%2C_Hotels_and_Resorts_logo.svg"),
    color: "#B8860B", invertable: true, weight: 700, tracking: "0.22em",
  },
  itc: {
    slug: "itc", name: "ITC Hotels",
    word: "ITC", url: WP("commons/6/6c/ITC_Hotels_logo.svg"),
    color: "#1B4B7C", invertable: true, weight: 800, tracking: "0.1em",
  },

  /* Tenants under Compass */
  jpmorgan: {
    slug: "jpmorgan", name: "JPMorgan Chase",
    word: "J.P.Morgan", url: WP("commons/c/c9/Logo_of_JPMorganChase_2024.svg"),
    color: "#0066CC", invertable: true, weight: 700, tracking: "-0.01em",
  },
  google: {
    slug: "google", name: "Google",
    word: "Google", url: SI("google", "4285F4"),
    color: "#4285F4", invertable: false, weight: 600,
  },
  microsoft: {
    slug: "microsoft", name: "Microsoft",
    word: "Microsoft", url: WP("commons/9/96/Microsoft_logo_%282012%29.svg"),
    color: "#0078D4", invertable: true, weight: 600,
  },
  accenture: {
    slug: "accenture", name: "Accenture",
    word: "accenture", url: SI("accenture", "A100F2"),
    color: "#A100F2", invertable: true, weight: 700, tracking: "-0.02em",
  },

  /* Quick commerce */
  swiggy: {
    slug: "swiggy", name: "Swiggy Instamart",
    word: "Swiggy", url: SI("swiggy", "F85932"),
    color: "#F85932", invertable: false, weight: 800, italic: true, tracking: "-0.02em",
  },
  blinkit: {
    slug: "blinkit", name: "Blinkit",
    word: "blinkit", url: WP("commons/2/2a/Blinkit-yellow-rounded.svg"),
    color: "#FDC900", invertable: false, weight: 800, tracking: "-0.04em",
  },
  zepto: {
    slug: "zepto", name: "Zepto",
    word: "Zepto", url: WP("commons/8/81/Zepto_Logo.svg"),
    color: "#03040E", invertable: false, weight: 800, italic: true, tracking: "-0.02em",
  },
  bigbasket: {
    slug: "bigbasket", name: "BigBasket",
    word: "bigbasket", url: SI("bigbasket", "E94828"),
    color: "#E94828", invertable: false, weight: 800, tracking: "-0.02em",
  },
};
