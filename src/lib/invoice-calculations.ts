import type {Discount,Invoice,InvoiceTotals,LineItem} from "@/types/invoice";
function round2(n:number){return Math.round((n+Number.EPSILON)*100)/100;}
function applyDiscount(amount:number,d:Discount){if(!d.value||d.value<=0)return amount;if(d.type==="percent")return amount*(1-Math.min(100,d.value)/100);return Math.max(0,amount-d.value);}
export function calculateLineBase(item:LineItem){return round2(Math.max(0,item.quantity||0)*Math.max(0,item.rate||0));}
export function calculateLineTotal(item:LineItem){const base=calculateLineBase(item);const raw=item.pricingType==="percentage"?base*(Math.min(100,Math.max(0,item.commissionRate||0))/100):base;return round2(Math.max(0,applyDiscount(raw,item.discount)));}
export function calculateInvoiceTotals(invoice:Invoice):InvoiceTotals{
  const itemTotals=invoice.items.map(calculateLineTotal);
  const subtotal=round2(itemTotals.reduce((a,b)=>a+b,0));
  const after=Math.max(0,applyDiscount(subtotal,invoice.globalDiscount));
  const discountAmount=round2(subtotal-after);
  const taxableAmount=round2(after);
  const taxAmount=round2(taxableAmount*(Math.min(100,Math.max(0,invoice.taxRate||0))/100));
  const shippingAmount=round2(Math.max(0,invoice.shipping||0));
  const grandTotal=round2(taxableAmount+taxAmount+shippingAmount);
  const paid=round2(Math.max(0,invoice.amountPaid||0));
  const balanceDue=round2(Math.max(0,grandTotal-paid));
  return{itemTotals,subtotal,discountAmount,taxableAmount,taxAmount,shippingAmount,grandTotal,paid,balanceDue};
}
// Decides which lines of the totals block are shown, so the preview and the PDF always agree.
export function totalsView(invoice:Invoice,totals:InvoiceTotals){
  const hasDiscount=totals.discountAmount>0,hasTax=invoice.taxRate>0,hasShipping=totals.shippingAmount>0,hasPaid=totals.paid>0;
  return{
    hasDiscount,hasTax,hasShipping,hasPaid,
    showSubtotal:hasDiscount||hasTax||hasShipping,
    totalLabel:hasPaid||invoice.showBalanceBox?invoice.labels.total:invoice.labels.balanceDue,
    discountLabel:invoice.globalDiscount.type==="percent"?`${invoice.labels.discount} (${invoice.globalDiscount.value}%)`:invoice.labels.discount,
    taxLabel:`${invoice.taxLabel} (${invoice.taxRate}%)`,
  };
}
export function formatCurrency(amount:number,currency:string,locale:string){try{return new Intl.NumberFormat(locale,{style:"currency",currency,currencyDisplay:"symbol",maximumFractionDigits:2}).format(amount);}catch{return `${currency} ${amount.toFixed(2)}`;}}
export function formatDate(iso:string,locale:string){if(!iso)return "";try{return new Intl.DateTimeFormat(locale,{dateStyle:"medium"}).format(new Date(`${iso}T00:00:00`));}catch{return iso;}}
export function isInvoiceEmpty(invoice:Invoice){const p=invoice.sender.name||invoice.sender.email||invoice.recipient.name||invoice.recipient.email;const i=invoice.items.some(x=>x.description||x.rate>0);return !p&&!i&&!invoice.notes.trim()&&!invoice.theme.logoDataUrl;}
