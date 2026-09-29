"use client";
import {useEffect,useState} from "react";
import {InvoiceForm} from "./InvoiceForm";
import {InvoicePreview} from "./InvoicePreview";
import {DownloadPdfButton} from "./DownloadPdfButton";
import {Button} from "@/components/ui/button";
import {useInvoiceStore} from "@/store/useInvoiceStore";
import {directionFor,t} from "@/lib/i18n";
import {Maximize2, X} from "lucide-react";

export function InvoiceBuilder(){
  const [tab,setTab]=useState<"edit"|"preview">("edit");
  const [fullPreview,setFullPreview]=useState(false);
  const invoice=useInvoiceStore(s=>s.invoice),reset=useInvoiceStore(s=>s.reset);
  const x=(k:any)=>t(invoice.language,k);
  const dir=directionFor(invoice.language);
  useEffect(()=>{if(!fullPreview)return;const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setFullPreview(false);};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey);},[fullPreview]);
  return <section id="invoice-maker" dir={dir} className="min-h-[70vh] bg-slate-50">
    <div className="mx-auto max-w-7xl px-4 py-6 pb-24 sm:px-6 sm:pb-6 lg:px-8">
      <header className="mb-5 flex flex-col gap-4 rounded-3xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div><div className="mb-1 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{x("freeTool")}</div><h2 className="text-2xl font-bold tracking-tight">{x("appTitle")}</h2><p className="text-sm text-slate-500">{x("subtitle")}</p></div>
        <Button variant="outline" onClick={()=>{if(confirm(x("startNew"))) reset();}}>{x("newInvoice")}</Button>
      </header>

      <div className="mb-4 flex gap-2 sm:hidden"><Button size="sm" variant={tab==="edit"?"default":"outline"} onClick={()=>setTab("edit")}>{x("edit")}</Button><Button size="sm" variant={tab==="preview"?"default":"outline"} onClick={()=>setTab("preview")}>{x("preview")}</Button></div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,65fr)_minmax(0,35fr)]">
        <div className={tab==="preview"?"hidden sm:block":""}><InvoiceForm/></div>
        <div className={tab==="edit"?"hidden sm:block":""}>
          <div className="lg:sticky lg:top-5">
            <div className="origin-top lg:scale-[0.92]"><InvoicePreview/></div>
            <div className="mt-4 hidden items-center justify-between gap-3 sm:flex">
              <button type="button" onClick={()=>setFullPreview(true)} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"><Maximize2 className="h-3.5 w-3.5"/>{x("fullPreview")}</button>
              <DownloadPdfButton/>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile: a colorful download button pinned to the bottom, visible in both tabs. */}
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] sm:hidden">
      <DownloadPdfButton className="w-full justify-center py-3"/>
    </div>

    {fullPreview&&<div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 p-4" onClick={()=>setFullPreview(false)}>
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4" onClick={e=>e.stopPropagation()}>
        <div className="mb-3 flex justify-end"><button type="button" onClick={()=>setFullPreview(false)} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"><X className="h-4 w-4"/>{x("close")}</button></div>
        <InvoicePreview/>
        <div className="mt-4 flex justify-end"><DownloadPdfButton/></div>
      </div>
    </div>}
  </section>;
}
