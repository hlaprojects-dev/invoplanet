// components/invoice/DownloadPdfButton.tsx
"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { InvoicePdfDocument } from "./InvoicePdfDocument";
import { t } from "@/lib/i18n";
import { registerPdfFonts } from "@/lib/pdf-fonts";

export function DownloadPdfButton() {
  const invoice = useInvoiceStore((s) => s.invoice);
  const [isGenerating, setIsGenerating] = useState(false);

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
    <Button onClick={handleDownload} disabled={isGenerating} className="w-full sm:w-auto">
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {label}
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" /> {label}
        </>
      )}
    </Button>
  );
}
