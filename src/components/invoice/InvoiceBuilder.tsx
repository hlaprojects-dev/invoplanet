"use client";
import {useState} from "react";
import {InvoiceForm} from "./InvoiceForm";
import {InvoicePreview} from "./InvoicePreview";
import {DownloadPdfButton} from "./DownloadPdfButton";
import {Button} from "@/components/ui/button";
import {useInvoiceStore} from "@/store/useInvoiceStore";
import {directionFor,t} from "@/lib/i18n";

export function InvoiceBuilder(){
  const [tab,setTab]=useState<"edit"|"preview">("edit");
  const invoice=useInvoiceStore(s=>s.invoice),reset=useInvoiceStore(s=>s.reset);
  const x=(k:any)=>t(invoice.language,k);
  return <section id="invoice-maker" dir={directionFor(invoice.language)} className="min-h-[70vh] bg-slate-50">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-5 flex flex-col gap-4 rounded-3xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div><div className="mb-1 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{x("freeTool")}</div><h2 className="text-2xl font-bold tracking-tight">{x("appTitle")}</h2><p className="text-sm text-slate-500">{x("subtitle")}</p></div>
        <Button variant="outline" onClick={()=>{if(confirm(x("startNew"))) reset();}}>{x("newInvoice")}</Button>
      </header>
      <div className="mb-4 flex gap-2 sm:hidden"><Button size="sm" variant={tab==="edit"?"default":"outline"} onClick={()=>setTab("edit")}>{x("edit")}</Button><Button size="sm" variant={tab==="preview"?"default":"outline"} onClick={()=>setTab("preview")}>{x("preview")}</Button></div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(430px,0.9fr)]">
        <div className={tab==="preview"?"hidden sm:block":""}><InvoiceForm/></div>
        <div className={tab==="edit"?"hidden sm:block":""}><div className="lg:sticky lg:top-5"><InvoicePreview/><div className="mt-4 flex justify-end"><DownloadPdfButton/></div></div></div>
      </div>
    </div>
  </section>
}
