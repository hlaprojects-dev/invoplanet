import { Font } from "@react-pdf/renderer";
import type { Invoice } from "@/types/invoice";

let registered = false;

// The built-in PDF font (Helvetica) has no Arabic-script or Cyrillic letters.
// For Urdu, Arabic and Russian invoices we load Noto Sans fonts from /fonts.
// They are fetched only when a PDF in one of those languages is generated.
export function registerPdfFonts(baseUrl: string = "/fonts") {
  if (registered) return;
  registered = true;
  Font.register({
    family: "NotoSans",
    fonts: [
      { src: `${baseUrl}/NotoSans-Regular.ttf`, fontWeight: 400 },
      { src: `${baseUrl}/NotoSans-Bold.ttf`, fontWeight: 700 },
    ],
  });
  Font.register({
    family: "NotoSansArabic",
    fonts: [
      { src: `${baseUrl}/NotoSansArabic-Regular.ttf`, fontWeight: 400 },
      { src: `${baseUrl}/NotoSansArabic-Bold.ttf`, fontWeight: 700 },
    ],
  });
}

// Returns a font family for languages that need one, or null to keep Helvetica.
export function pdfFontFor(lang: string): string | null {
  if (lang === "ur" || lang === "ar") return "NotoSansArabic";
  if (lang === "ru") return "NotoSans";
  return null;
}

// The PDF library drops the first part of a line that starts with the Urdu/Arabic
// letter alef-madda (as in "aakhri" or "aap"). Putting the invisible Arabic Letter Mark
// at the start of such a text avoids that. It is only added for Urdu and Arabic
// invoices, and only to texts whose first letter is in Arabic script.
const START_MARK = "\u061C";

function startsWithArabicLetter(s: string): boolean {
  for (const ch of s) {
    const c = ch.codePointAt(0) as number;
    if ((c >= 0x0600 && c <= 0x06ff) || (c >= 0x0750 && c <= 0x077f) || (c >= 0x08a0 && c <= 0x08ff) || (c >= 0xfb50 && c <= 0xfdff) || (c >= 0xfe70 && c <= 0xfeff)) return true;
    if ((c >= 0x41 && c <= 0x5a) || (c >= 0x61 && c <= 0x7a) || (c >= 0xc0 && c <= 0x24f) || (c >= 0x400 && c <= 0x4ff)) return false;
  }
  return false;
}

export function startMark(lang: string): (s: string) => string {
  const needed = lang === "ur" || lang === "ar";
  return (s: string) => (needed && s && startsWithArabicLetter(s) ? START_MARK + s : s);
}

export function withStartMarks(inv: Invoice): Invoice {
  if (inv.language !== "ur" && inv.language !== "ar") return inv;
  const m = startMark(inv.language);
  const party = (p: Invoice["sender"]) => ({ ...p, name: m(p.name), address: m(p.address), email: m(p.email), phone: m(p.phone) });
  const l = inv.labels;
  const labels: Invoice["labels"] = {
    invoice: m(l.invoice), from: m(l.from), billTo: m(l.billTo), description: m(l.description),
    quantity: m(l.quantity), rate: m(l.rate), commission: m(l.commission), amount: m(l.amount),
    subtotal: m(l.subtotal), discount: m(l.discount), tax: m(l.tax), total: m(l.total),
  };
  return {
    ...inv,
    invoiceNumber: m(inv.invoiceNumber),
    taxLabel: m(inv.taxLabel),
    notes: m(inv.notes),
    sender: party(inv.sender),
    recipient: party(inv.recipient),
    items: inv.items.map((i) => ({ ...i, description: m(i.description) })),
    labels,
  };
}
