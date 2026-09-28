"use client";
import {useEffect,useRef,useState} from "react";
import {useInvoiceStore,DEFAULT_LABELS} from "@/store/useInvoiceStore";
import {Button} from "@/components/ui/button"; import {Input} from "@/components/ui/input"; import {Label} from "@/components/ui/label"; import {Textarea} from "@/components/ui/textarea";
import {Plus,Trash2,RotateCcw,Upload} from "lucide-react";
import {LOCALES,t} from "@/lib/i18n";
import {cn} from "@/lib/utils";

const CURRENCIES=["USD","EUR","GBP","PKR","AED","INR","CAD","AUD","JPY","CHF","SAR","CNY","SGD","HKD","NZD","QAR","KWD","BHD","OMR","TRY","RUB","ZAR","MYR","SEK","NOK","DKK","PLN"];
const PRESET_COLORS=["#1E3A8A","#2563EB","#0284C7","#0D9488","#047857","#65A30D","#FACC15","#C2410C","#BE123C","#DB2777","#6D28D9","#4338CA","#92400E","#475569","#0F172A"];
const LABEL_KEYS=Object.keys(DEFAULT_LABELS) as (keyof typeof DEFAULT_LABELS)[];
const card="rounded-2xl border bg-white p-5 shadow-sm";
const selectCls="h-9 w-full rounded-md border bg-white px-3 text-sm";
const num=(value:string)=>{const n=Number(value);return Number.isFinite(n)?Math.max(0,n):0};

// A number box that keeps what the user is typing (so "12." and "0.5" work) and
// only sends the number to the invoice. Clicking it selects the whole value.
function NumField({id,value,onValue,placeholder}:{id?:string;value:number;onValue:(v:number)=>void;placeholder?:string}){
 const [text,setText]=useState(value?String(value):"");
 // eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(()=>{if(num(text)!==value)setText(value?String(value):"");},[value]);
 return <Input id={id} className="no-spinner" inputMode="decimal" type="text" placeholder={placeholder} value={text}
  onFocus={e=>e.currentTarget.select()}
  onChange={e=>{const v=e.target.value.replace(",",".");if(/^\d*\.?\d*$/.test(v)){setText(v);onValue(num(v));}}}/>;
}

// Reads an uploaded logo, shrinks it, and turns it into a PNG/JPG (PDFs cannot draw SVG).
function normalizeLogo(file:File):Promise<{url:string;ratio:number|null}>{
 return new Promise((resolve,reject)=>{
  const reader=new FileReader();
  reader.onerror=()=>reject(new Error("read"));
  reader.onload=()=>{
   const src=reader.result as string;
   const img=new window.Image();
   img.onerror=()=>reject(new Error("decode"));
   img.onload=()=>{
    const nw=img.naturalWidth||300,nh=img.naturalHeight||150;
    const scale=Math.min(1,800/Math.max(nw,nh));
    const w=Math.max(1,Math.round(nw*scale)),h=Math.max(1,Math.round(nh*scale));
    const canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;
    const ctx=canvas.getContext("2d");
    if(!ctx){resolve({url:src,ratio:nw/nh});return;}
    const jpeg=file.type==="image/jpeg";
    if(jpeg){ctx.fillStyle="#ffffff";ctx.fillRect(0,0,w,h);}
    ctx.drawImage(img,0,0,w,h);
    resolve({url:canvas.toDataURL(jpeg?"image/jpeg":"image/png",0.92),ratio:w/h});
   };
   img.src=src;
  };
  reader.readAsDataURL(file);
 });
}

export function InvoiceForm(){
 const invoice=useInvoiceStore(s=>s.invoice),setField=useInvoiceStore(s=>s.setField),setParty=useInvoiceStore(s=>s.setParty),addItem=useInvoiceStore(s=>s.addItem),updateItem=useInvoiceStore(s=>s.updateItem),removeItem=useInvoiceStore(s=>s.removeItem),setGlobalDiscount=useInvoiceStore(s=>s.setGlobalDiscount),setTheme=useInvoiceStore(s=>s.setTheme),setLabels=useInvoiceStore(s=>s.setLabels);
 const fileRef=useRef<HTMLInputElement>(null);
 const x=(k:any)=>t(invoice.language,k);
 const accent=invoice.theme.accentColor;
 async function upload(e:React.ChangeEvent<HTMLInputElement>){
  const f=e.target.files?.[0];e.target.value="";
  if(!f)return;
  if(f.size>2*1024*1024){alert("Please choose an image smaller than 2 MB.");return;}
  try{const {url,ratio}=await normalizeLogo(f);setTheme({logoDataUrl:url,logoRatio:ratio});}
  catch{alert("Could not read this image. Please try a PNG or JPG.");}
 }
 const dType=invoice.globalDiscount.type;
 return <div className="space-y-5">
  <section className={card}>
   <div className="mb-4 flex items-start justify-between gap-3"><div><h3 className="font-semibold">{x("invoiceNumber")}</h3><p className="text-xs text-slate-500">{x("basicDetails")}</p></div><select aria-label={x("language")} className="h-9 rounded-md border bg-white px-3 text-sm" value={invoice.language} onChange={e=>setField("language",e.target.value)}>{Object.entries(LOCALES).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select></div>
   <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <div><Label htmlFor="inv-number">{x("invoiceNumber")}</Label><Input id="inv-number" value={invoice.invoiceNumber} onChange={e=>setField("invoiceNumber",e.target.value)}/></div>
    <div><Label htmlFor="inv-currency">{x("currency")}</Label><select id="inv-currency" className={selectCls} value={invoice.currency} onChange={e=>setField("currency",e.target.value)}>{CURRENCIES.map(c=><option key={c}>{c}</option>)}</select></div>
    <div><Label htmlFor="inv-issue">{x("issueDate")}</Label><Input id="inv-issue" type="date" value={invoice.issueDate} onChange={e=>setField("issueDate",e.target.value)}/></div>
    <div><Label htmlFor="inv-due">{x("dueDate")}</Label><Input id="inv-due" type="date" value={invoice.dueDate} onChange={e=>setField("dueDate",e.target.value)}/></div>
   </div>
  </section>

  <section className="grid gap-5 xl:grid-cols-2">
   <Party idp="from" title={x("from")} p={invoice.sender} x={x} onChange={u=>setParty("sender",u)}/>
   <Party idp="bill" title={x("billTo")} p={invoice.recipient} x={x} onChange={u=>setParty("recipient",u)}/>
  </section>

  <section className={card}>
   <div className="mb-3"><h3 className="font-semibold">{x("items")}</h3><p className="text-xs text-slate-500">{x("itemsHint")}</p></div>
   <div className="space-y-3">{invoice.items.map(item=><div key={item.id} className="rounded-xl border bg-slate-50/60 p-3">
    <div className="flex items-end gap-2">
     <div className="min-w-0 flex-1"><Label htmlFor={`d-${item.id}`}>{x("description")}</Label><Input id={`d-${item.id}`} value={item.description} onChange={e=>updateItem(item.id,{description:e.target.value})}/></div>
     <Button type="button" variant="ghost" size="icon" onClick={()=>removeItem(item.id)} aria-label={x("remove")}><Trash2 className="h-4 w-4"/></Button>
    </div>
    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
     <div><Label htmlFor={`q-${item.id}`}>{x("qty")}</Label><NumField id={`q-${item.id}`} placeholder="1" value={item.quantity} onValue={v=>updateItem(item.id,{quantity:v})}/></div>
     <div><Label htmlFor={`r-${item.id}`}>{x("rate")}</Label><NumField id={`r-${item.id}`} placeholder="0.00" value={item.rate} onValue={v=>updateItem(item.id,{rate:v})}/></div>
     <div><Label htmlFor={`c-${item.id}`}>{x("calculation")}</Label><select id={`c-${item.id}`} className={selectCls} value={item.pricingType} onChange={e=>updateItem(item.id,{pricingType:e.target.value as any})}><option value="quantity">{x("standard")}</option><option value="percentage">{x("percentage")}</option></select></div>
     {item.pricingType==="percentage"&&<div><Label htmlFor={`p-${item.id}`} className="whitespace-nowrap">{x("commission")}</Label><NumField id={`p-${item.id}`} placeholder="%" value={item.commissionRate} onValue={v=>updateItem(item.id,{commissionRate:v})}/></div>}
    </div>
   </div>)}</div>
   <Button type="button" variant="outline" size="sm" className="mt-4" onClick={addItem}><Plus className="mr-1 h-4 w-4"/>{x("addItem")}</Button>
  </section>

  <section className={card}>
   <h3 className="mb-3 font-semibold">{x("taxDiscountPayment")}</h3>
   <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <div><Label htmlFor="tax-label">{x("taxLabel")}</Label><Input id="tax-label" value={invoice.taxLabel} onChange={e=>setField("taxLabel",e.target.value)}/></div>
    <div><Label htmlFor="tax-rate">{x("taxRate")}</Label><NumField id="tax-rate" placeholder="0" value={invoice.taxRate} onValue={v=>setField("taxRate",v)}/></div>
    <div><Label htmlFor="disc">{x("discount")}</Label><div className="flex gap-2"><div className="min-w-0 flex-1"><NumField id="disc" placeholder="0" value={invoice.globalDiscount.value} onValue={v=>setGlobalDiscount({...invoice.globalDiscount,value:v})}/></div>
     <div className="inline-flex shrink-0 overflow-hidden rounded-md border text-sm" role="group">
      {(["percent","flat"] as const).map(k=><button key={k} type="button" aria-pressed={dType===k} onClick={()=>setGlobalDiscount({...invoice.globalDiscount,type:k})} className={cn("px-3 transition-colors",dType===k?"bg-[#1e3a8a] text-white":"bg-white text-slate-600 hover:bg-slate-50")}>{k==="percent"?"%":x("flat")}</button>)}
     </div></div></div>
    <div><Label htmlFor="ship">{x("shipping")}</Label><NumField id="ship" placeholder="0" value={invoice.shipping} onValue={v=>setField("shipping",v)}/></div>
    <div><Label htmlFor="paid">{x("amountPaid")}</Label><NumField id="paid" placeholder="0" value={invoice.amountPaid} onValue={v=>setField("amountPaid",v)}/></div>
   </div>
   <label className="mt-4 flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="h-4 w-4" checked={invoice.showBalanceBox} onChange={e=>setField("showBalanceBox",e.target.checked)}/>{x("showBalanceBox")}</label>
  </section>

  <details className="rounded-2xl border bg-white shadow-sm"><summary className="cursor-pointer list-none p-5 font-semibold">{x("customizeLabels")}</summary><div className="border-t p-5"><p className="mb-4 text-xs text-slate-500">{x("customizeHint")}</p><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{LABEL_KEYS.map(k=><div key={k}><Label htmlFor={`lab-${k}`}>{(x as any)(k==="quantity"?"qty":k)}</Label><Input id={`lab-${k}`} value={invoice.labels[k]} onChange={e=>setLabels({[k]:e.target.value} as any)}/></div>)}</div><Button type="button" variant="ghost" size="sm" className="mt-4" onClick={()=>setLabels(DEFAULT_LABELS)}><RotateCcw className="mr-1 h-4 w-4"/>{x("resetLabels")}</Button></div></details>

  <section className={card}><div className="grid gap-5 sm:grid-cols-2">
   <div><Label>{x("logo")}</Label><input ref={fileRef} className="hidden" type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={upload}/>
    <Button type="button" variant="outline" onClick={()=>fileRef.current?.click()}><Upload className="mr-2 h-4 w-4"/>{x("uploadLogo")}</Button>
    {invoice.theme.logoDataUrl&&<Button type="button" variant="ghost" size="sm" className="ml-2" onClick={()=>setTheme({logoDataUrl:null,logoRatio:null})}>{x("removeLogo")}</Button>}
    <p className="mt-1 text-xs text-slate-400">PNG, JPG or SVG · max 2 MB</p></div>
   <div><Label>{x("accentColor")}</Label>
    <div className="flex flex-wrap items-center gap-2">
     {PRESET_COLORS.map(c=><button key={c} type="button" aria-label={c} aria-pressed={accent.toLowerCase()===c.toLowerCase()} onClick={()=>setTheme({accentColor:c})} className={cn("h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",accent.toLowerCase()===c.toLowerCase()?"border-slate-900":"border-white ring-1 ring-slate-200")} style={{backgroundColor:c}}/>)}
     <label className="ml-1 inline-flex items-center gap-2 text-xs text-slate-500"><input type="color" aria-label="Custom color" className="h-8 w-10 cursor-pointer rounded border bg-white p-0.5" value={accent} onChange={e=>setTheme({accentColor:e.target.value})}/>{accent.toUpperCase()}</label>
    </div></div>
  </div></section>

  <section className={card}><Label htmlFor="notes">{x("notes")}</Label><Textarea id="notes" rows={4} placeholder={x("notesPlaceholder")} value={invoice.notes} onChange={e=>setField("notes",e.target.value)}/></section>
 </div>
}

function Party({idp,title,p,x,onChange}:{idp:string;title:string;p:any;x:(k:any)=>string;onChange:(u:any)=>void}){
 return <div className={card}><h3 className="mb-3 font-semibold">{title}</h3><div className="space-y-3">
  <div><Label htmlFor={`${idp}-name`}>{x("companyName")}</Label><Input id={`${idp}-name`} value={p.name} onChange={e=>onChange({name:e.target.value})}/></div>
  <div><Label htmlFor={`${idp}-contact`}>{x("contactName")}</Label><Input id={`${idp}-contact`} value={p.contact} onChange={e=>onChange({contact:e.target.value})}/></div>
  <div><Label htmlFor={`${idp}-address`}>{x("address")}</Label><Textarea id={`${idp}-address`} rows={2} value={p.address} onChange={e=>onChange({address:e.target.value})}/></div>
  <div className="grid gap-3 sm:grid-cols-2">
   <div><Label htmlFor={`${idp}-email`}>{x("email")}</Label><Input id={`${idp}-email`} type="email" value={p.email} onChange={e=>onChange({email:e.target.value})}/></div>
   <div><Label htmlFor={`${idp}-phone`}>{x("phone")}</Label><Input id={`${idp}-phone`} value={p.phone} onChange={e=>onChange({phone:e.target.value})}/></div>
  </div>
 </div></div>
}
