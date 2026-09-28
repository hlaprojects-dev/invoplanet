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

 return <div dir={directionFor(invoice.language)} className="mx-auto w-full max-w-[210mm] overflow-hidden bg-white text-slate-900 shadow-xl ring-1 ring-slate-200" style={{fontFamily:"Inter, ui-sans-serif, system-ui, sans-serif"}}>
  <div className="p-6 sm:p-9">
   <div className="flex items-start justify-between gap-6 border-b pb-6" style={{borderColor:accent}}>
    <div>
     {invoice.theme.logoDataUrl&&<img src={invoice.theme.logoDataUrl} alt={x("logo")} className="mb-3 max-h-16 object-contain"/>}
     <h2 className="text-lg font-bold">{invoice.sender.name||x("yourBusiness")}</h2>
     {!!invoice.sender.contact&&<p className="text-sm text-slate-600">{invoice.sender.contact}</p>}
     <p className="whitespace-pre-line text-sm text-slate-500">{invoice.sender.address}</p>
     <p className="text-sm text-slate-500">{invoice.sender.email}</p>
     {!!invoice.sender.phone&&<p className="text-sm text-slate-500">{invoice.sender.phone}</p>}
    </div>
    <div className="text-right">
     <h1 className="text-3xl font-bold" style={{color:accent}}>{invoice.labels.invoice}</h1>
     <p className="mt-1 text-sm text-slate-500">{invoice.invoiceNumber}</p>
    </div>
   </div>

   <div className="mt-6 flex justify-between gap-6 text-sm">
    <div>
     <p className="text-slate-400">{invoice.labels.billTo}</p>
     <p className="font-semibold">{invoice.recipient.name||x("clientName")}</p>
     {!!invoice.recipient.contact&&<p className="text-slate-600">{invoice.recipient.contact}</p>}
     <p className="whitespace-pre-line text-slate-500">{invoice.recipient.address}</p>
     <p className="text-slate-500">{invoice.recipient.email}</p>
     {!!invoice.recipient.phone&&<p className="text-slate-500">{invoice.recipient.phone}</p>}
    </div>
    <div className="text-right">
     <p><span className="text-slate-400">{x("issueDate")}: </span>{formatDate(invoice.issueDate,locale)}</p>
     <p><span className="text-slate-400">{x("dueDate")}: </span>{formatDate(invoice.dueDate,locale)}</p>
     {invoice.showBalanceBox&&<div className="mt-2 inline-flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold" style={{backgroundColor:accent,color:onAccent}}>
      <span>{invoice.labels.balanceDue}</span><span>{money(totals.balanceDue)}</span>
     </div>}
    </div>
   </div>

   <table className="mt-8 w-full text-sm">
    <thead>
     <tr style={{backgroundColor:accent,color:onAccent}}>
      <th className="rounded-l-md py-2 pl-3 text-left font-medium">{invoice.labels.description}</th>
      <th className="py-2 text-right font-medium">{invoice.labels.quantity}</th>
      <th className="py-2 text-right font-medium">{invoice.labels.rate}</th>
      {hasCommission&&<th className="py-2 text-right font-medium">{invoice.labels.commission}</th>}
      <th className="rounded-r-md py-2 pr-3 text-right font-medium">{invoice.labels.amount}</th>
     </tr>
    </thead>
    <tbody>
     {invoice.items.map((item,i)=><tr key={item.id} className="border-b border-slate-100">
      <td className="py-2 pl-3">{item.description||"—"}</td>
      <td className="py-2 text-right">{item.quantity}</td>
      <td className="py-2 text-right">{money(item.pricingType==="percentage"?calculateLineBase(item):item.rate)}</td>
      {hasCommission&&<td className="py-2 text-right">{item.pricingType==="percentage"?`${item.commissionRate}%`:"-"}</td>}
      <td className="py-2 pr-3 text-right">{money(totals.itemTotals[i])}</td>
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
      <div className="mt-1 flex justify-between border-t pt-2 text-base font-bold" style={{borderColor:accent,color:accent}}>
       <span>{invoice.labels.balanceDue}</span><span>{money(totals.balanceDue)}</span>
      </div>
     </>}
    </div>
   </div>

   {!!invoice.notes&&<div className="mt-10 border-t pt-4 text-sm text-slate-500">
    <p className="mb-1 font-semibold" style={{color:accent}}>{invoice.labels.notes}</p>
    <p className="whitespace-pre-line">{invoice.notes}</p>
   </div>}
  </div>
 </div>;
}

function Row({label,value}:{label:string;value:string}){
 return <div className="flex justify-between text-slate-600"><span>{label}</span><span>{value}</span></div>;
}
