import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---- Color helpers: keep text readable on any accent color the user picks ----
function parseHex(hex: string) {
  let h = (hex || "").replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return { r: 30, g: 58, b: 138 };
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function toHex(r: number, g: number, b: number) {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}
function lin(c: number) { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); }
export function luminance(hex: string) { const { r, g, b } = parseHex(hex); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); }
/** Text color (white or near-black) that is readable on top of the given fill color. */
export function readableOn(hex: string) { return luminance(hex) > 0.18 ? "#111827" : "#FFFFFF"; }
/** Accent color for text on a white page: darkened when the chosen color is too light to read. */
export function accentText(hex: string) {
  const { r, g, b } = parseHex(hex);
  let k = 1;
  for (let i = 0; i < 24 && luminance(toHex(r * k, g * k, b * k)) > 0.18; i++) k *= 0.9;
  return toHex(r * k, g * k, b * k);
}
