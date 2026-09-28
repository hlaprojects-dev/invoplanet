"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { InvoicePdfDocument } from "./InvoicePdfDocument";
import { t } from "@/lib/i18n";
import { registerPdfFonts } from "@/lib/pdf-fonts";
import { readableOn, cn } from "@/lib/utils";

export function DownloadPdfButton({ className }: { className?: string }) {
  const invoice = useInvoiceStore((s) => s.invoice);
  const [isGenerating, setIsGenerating] = useState(false);
  const accent = invoice.theme.accentColor;

  async function handleDownload() {
    setIsGenerating(true);
    try {
      // Everything below runs entirely in the browser — the invoice data
      // and any uploaded logo never leave the client to produce this PDF.
      registerPdfFonts();
      const blob = await pdf(<InvoicePdfDocument invoice={invoice} />).toBlob();
      const url = URL.createObjectURL(blob);

      const filename = `${invoice.invoiceNumber || "invoice"}.pdf`;
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Free the object URL shortly after triggering the download
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  const label = t(invoice.language, isGenerating ? "generating" : "download");

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      style={{ backgroundColor: accent, color: readableOn(accent) }}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-60 sm:w-auto",
        className
      )}
    >
      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {label}
    </button>
  );
}
