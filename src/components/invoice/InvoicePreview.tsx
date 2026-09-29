"use client";
import {useInvoiceStore} from "@/store/useInvoiceStore";
import {calculateInvoiceTotals,calculateLineBase,formatCurrency,formatDate,totalsView} from "@/lib/invoice-calculations";
import {directionFor,localeFor,t} from "@/lib/i18n";
import {readableOn} from "@/lib/utils";

export function InvoicePreview(){
 const invoice=useInvoiceStore(s=>s.invoice);
 const totals=calculateInvoiceTotals(invoice);
 const view=totalsView(invoice,totals);
 const hasCommission=invoice.items.some(i=>i.pricingType==="percentage");
 const locale=localeFor(invoice.language);
 const x=(k:any)=>t(invoice.language,k);
 const accent=invoice.theme.accentColor;
 const onAccent=readableOn(accent);
 const money=(n:number)=>formatCurrency(n,invoice.currency,locale);

 const tpl=invoice.theme.template;
 const isClassic=tpl==="classic";
 const isPremium=tpl==="premium";
 const fontFamily=isClassic?"Georgia, 'Times New Roman', serif":"Inter, ui-sans-serif, system-ui, sans-serif";

 // Card-style wrapper used for Bill-to / dates blocks and Notes on the Premium template.
 const premCard="rounded-xl bg-slate-50 p-3";

 return <div dir={directionFor(invoice.language)} className="mx-auto w-full max-w-[210mm] overflow-hidden bg-white text-slate-900 shadow-xl ring-1 ring-slate-200" style={{fontFamily}}>
  <div className="p-6 sm:p-9">

   {isClassic&&<div className="mb-6 border-y-2 py-2 text-center" style={{borderColor:accent,color:accent}}>
    <span className="text-xl font-bold tracking-[0.3em]">{invoice.labels.invoice}</span>
   </div>}

   <div className={isPremium?"-mx-6 mb-6 flex items-start justify-between gap-6 px-6 py-6 sm:-mx-9 sm:px-9":"flex items-start justify-between gap-6 border-b pb-6"} style={isPremium?{backgroundColor:accent,color:onAccent}:{borderColor:accent}}>
    <div className="min-w-0 flex-1">
     {invoice.theme.logoDataUrl&&<img src={invoice.theme.logoDataUrl} alt={x("logo")} className="mb-3 max-h-16 object-contain" style={isPremium?{backgroundColor:"#fff",borderRadius:8,padding:4}:undefined}/>}
     <h2 className="break-words text-lg font-bold">{invoice.sender.name||x("yourBusiness")}</h2>
     {!!invoice.sender.contact&&<p className={isPremium?"text-sm opacity-90":"text-sm text-slate-600"}>{invoice.sender.contact}</p>}
     <p className={isPremium?"whitespace-pre-line text-sm opacity-90":"whitespace-pre-line text-sm text-slate-500"}>{invoice.sender.address}</p>
     <p className={isPremium?"text-sm opacity-90":"text-sm text-slate-500"}>{invoice.sender.email}</p>
     {!!invoice.sender.phone&&<p className={isPremium?"text-sm opacity-90":"text-sm text-slate-500"}>{invoice.sender.phone}</p>}
    </div>
    <div className="shrink-0 text-right">
     {!isClassic&&<h1 className="text-3xl font-bold" style={{color:isPremium?onAccent:accent}}>{invoice.labels.invoice}</h1>}
     <p className={isPremium?"mt-1 text-sm opacity-90":"mt-1 text-sm text-slate-500"}>{invoice.invoiceNumber}</p>
    </div>
   </div>

   <div className="mt-6 flex justify-between gap-6 text-sm">
    <div className={"min-w-0 flex-1"+(isPremium?" "+premCard:"")}>
     <p className="text-slate-400">{invoice.labels.billTo}</p>
     <p className="break-words font-semibold">{invoice.recipient.name||x("clientName")}</p>
     {!!invoice.recipient.contact&&<p className="text-slate-600">{invoice.recipient.contact}</p>}
     <p className="whitespace-pre-line text-slate-500">{invoice.recipient.address}</p>
     <p className="text-slate-500">{invoice.recipient.email}</p>
     {!!invoice.recipient.phone&&<p className="text-slate-500">{invoice.recipient.phone}</p>}
    </div>
    <div className={"shrink-0 text-right"+(isPremium?" "+premCard:"")}>
     <p><span className="text-slate-400">{x("issueDate")}: </span>{formatDate(invoice.issueDate,locale)}</p>
     <p><span className="text-slate-400">{x("dueDate")}: </span>{formatDate(invoice.dueDate,locale)}</p>
     {invoice.showBalanceBox&&(isClassic
      ?<div className="mt-2 inline-flex items-center gap-3 whitespace-nowrap rounded-md border-2 px-3 py-1.5 text-sm font-semibold" style={{borderColor:accent,color:accent}}>
        <span>{invoice.labels.balanceDue}</span><span>{money(totals.balanceDue)}</span>
       </div>
      :<div className="mt-2 inline-flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold" style={{backgroundColor:accent,color:onAccent}}>
        <span>{invoice.labels.balanceDue}</span><span>{money(totals.balanceDue)}</span>
       </div>)}
    </div>
   </div>

   <table className="mt-8 w-full table-fixed text-sm">
    <thead>
     <tr style={isClassic?{borderTop:`2px solid ${accent}`,borderBottom:`2px solid ${accent}`,color:accent}:{backgroundColor:accent,color:onAccent}}>
      <th className={isClassic?"py-2 pl-1 text-left font-semibold":"rounded-l-md py-2 pl-3 text-left font-medium"} style={{width:hasCommission?"34%":"46%"}}>{invoice.labels.description}</th>
      <th className={isClassic?"py-2 text-right font-semibold":"py-2 text-right font-medium"} style={{width:"12%"}}>{invoice.labels.quantity}</th>
      <th className={isClassic?"py-2 text-right font-semibold":"py-2 text-right font-medium"} style={{width:"20%"}}>{invoice.labels.rate}</th>
      {hasCommission&&<th className={isClassic?"py-2 text-right font-semibold":"py-2 text-right font-medium"} style={{width:"16%"}}>{invoice.labels.commission}</th>}
      <th className={isClassic?"py-2 pr-1 text-right font-semibold":"rounded-r-md py-2 pr-3 text-right font-medium"} style={{width:hasCommission?"18%":"22%"}}>{invoice.labels.amount}</th>
     </tr>
    </thead>
    <tbody>
     {invoice.items.map((item,i)=><tr key={item.id} className={"border-b border-slate-100"+(isPremium&&i%2===1?" bg-slate-50":"")}>
      <td className={isClassic?"py-2 pl-1 break-words":"py-2 pl-3 break-words"}>{item.description||"—"}</td>
      <td className="py-2 text-right">{item.quantity}</td>
      <td className="py-2 text-right">{money(item.pricingType==="percentage"?calculateLineBase(item):item.rate)}</td>
      {hasCommission&&<td className="py-2 text-right">{item.pricingType==="percentage"?`${item.commissionRate}%`:"-"}</td>}
      <td className={isClassic?"py-2 pr-1 text-right":"py-2 pr-3 text-right"}>{money(totals.itemTotals[i])}</td>
     </tr>)}
    </tbody>
   </table>

   <div className="mt-6 flex justify-end">
    <div className="w-64 space-y-1 text-sm">
     {view.showSubtotal&&<Row label={invoice.labels.subtotal} value={money(totals.subtotal)}/>}
     {view.hasDiscount&&<Row label={view.discountLabel} value={`- ${money(totals.discountAmount)}`}/>}
     {view.hasTax&&<Row label={view.taxLabel} value={money(totals.taxAmount)}/>}
     {view.hasShipping&&<Row label={invoice.labels.shipping} value={money(totals.shippingAmount)}/>}
     <div className="mt-2 flex justify-between border-t pt-2 text-base font-bold" style={{borderColor:accent}}>
      <span>{view.totalLabel}</span><span>{money(totals.grandTotal)}</span>
     </div>
     {view.hasPaid&&<>
      <Row label={invoice.labels.amountPaid} value={`- ${money(totals.paid)}`}/>
      {isPremium
       ?<div className="mt-1 flex justify-between rounded-lg px-3 py-2 text-base font-bold" style={{backgroundColor:accent,color:onAccent}}>
         <span>{invoice.labels.balanceDue}</span><span>{money(totals.balanceDue)}</span>
        </div>
       :<div className="mt-1 flex justify-between border-t pt-2 text-base font-bold" style={{borderColor:accent,color:accent}}>
         <span>{invoice.labels.balanceDue}</span><span>{money(totals.balanceDue)}</span>
        </div>}
     </>}
    </div>
   </div>

   {!!invoice.notes&&<div className={"mt-10 border-t pt-4 text-sm text-slate-500"+(isPremium?" border-t-0 pt-0":"")}>
    <div className={isPremium?"mt-6 "+premCard:""}>
     <p className="mb-1 font-semibold" style={{color:accent}}>{invoice.labels.notes}</p>
     <p className="whitespace-pre-line break-words">{invoice.notes}</p>
    </div>
   </div>}
  </div>
 </div>;
}

function Row({label,value}:{label:string;value:string}){
 return <div className="flex justify-between text-slate-600"><span>{label}</span><span>{value}</span></div>;
}
