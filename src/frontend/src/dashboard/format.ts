/* ESTOQI dashboard — formatting + display helpers. */

import type { Health, Severity, AlertStatus, AlertKind } from "./data";

export function fmtNum(n: number, max = 1): string {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(max) + "M";
  if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(max) + "k";
  return Math.round(n).toString();
}

export function fmtInt(n: number): string {
  return n.toLocaleString("en-IN");
}

export function fmtKg(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(2) + " t";
  return n.toFixed(0) + " kg";
}

export function fmtLitres(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "kL";
  return n.toFixed(0) + " L";
}

export function fmtAgo(iso: string): string {
  const t = new Date(iso).getTime();
  const now = Date.now();
  const s = Math.max(1, Math.floor((now - t) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export function fmtTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function fmtINR(n: number): string {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(1)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(1)} L`;
  if (n >= 1000)        return `₹${(n / 1000).toFixed(1)}k`;
  return `₹${n.toFixed(0)}`;
}

export const HEALTH_COLOR: Record<Health, { fg: string; bg: string; dot: string; label: string }> = {
  healthy:  { fg: "#1F5D3F", bg: "rgba(31, 93, 63, 0.10)",  dot: "#1F5D3F", label: "Healthy"  },
  warning:  { fg: "#7A4A0E", bg: "rgba(184, 133, 72, 0.16)", dot: "#B88548", label: "Warning"  },
  degraded: { fg: "#7A2C2C", bg: "rgba(176, 60, 47, 0.14)",  dot: "#B03C2F", label: "Degraded" },
  offline:  { fg: "#404040", bg: "rgba(64, 64, 64, 0.10)",   dot: "#404040", label: "Offline"  },
};

export const SEVERITY_COLOR: Record<Severity, { fg: string; bg: string; dot: string; label: string }> = {
  severe:  { fg: "#7A2C2C", bg: "rgba(176, 60, 47, 0.12)",  dot: "#B03C2F", label: "Severe"  },
  warning: { fg: "#7A4A0E", bg: "rgba(184, 133, 72, 0.16)", dot: "#B88548", label: "Warning" },
  info:    { fg: "#0F3E73", bg: "rgba(2, 40, 89, 0.10)",    dot: "#022859", label: "Info"    },
};

export const STATUS_LABEL: Record<AlertStatus, string> = {
  open: "Open",
  ack: "Acknowledged",
  resolved: "Resolved",
};

export const ALERT_KIND_LABEL: Record<AlertKind, string> = {
  ph_drift: "pH drift",
  machine_offline: "Machine offline",
  flow_anomaly: "Flow anomaly",
  filter_low: "Filter low",
  electrode_wear: "Electrode wear",
  underutilisation: "Underutilisation",
  overutilisation: "Overutilisation",
  inwards_mismatch: "Inwards mismatch",
  manual_override: "Manual override",
  operator_login: "Operator login",
};
