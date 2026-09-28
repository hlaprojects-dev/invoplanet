"use client";
import { create } from "zustand";
import type { Discount, Invoice, InvoiceLabels, LineItem, Party } from "@/types/invoice";

export const DEFAULT_LABELS: InvoiceLabels = {invoice:"Invoice",from:"From",billTo:"Bill to",description:"Description",quantity:"Qty",rate:"Rate",commission:"Commission %",amount:"Amount",subtotal:"Subtotal",discount:"Discount",shipping:"Shipping",tax:"Tax",total:"Total",amountPaid:"Amount paid",balanceDue:"Balance due",notes:"Notes"};

function newLineItem(): LineItem {
  return { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0, pricingType: "quantity", commissionRate: 0, discount: { type: "percent", value: 0 } };
}
function todayIso() { return new Date().toISOString().slice(0, 10); }
function dueInDaysIso(days:number) { const d=new Date(); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10); }

export function createEmptyInvoice(): Invoice {
  return {
    invoiceNumber:"INV-0001", issueDate:todayIso(), dueDate:dueInDaysIso(14), currency:"USD", language:"en",
    sender:{name:"",contact:"",address:"",email:"",phone:""}, recipient:{name:"",contact:"",address:"",email:"",phone:""},
    items:[newLineItem()], taxRate:0, taxLabel:"Tax", globalDiscount:{type:"percent",value:0}, shipping:0, amountPaid:0, showBalanceBox:true, notes:"",
    theme:{accentColor:"#1E3A8A",logoDataUrl:null,logoRatio:null},
    labels:{...DEFAULT_LABELS},
  };
}

interface InvoiceState {
  invoice: Invoice;
  setField:<K extends keyof Invoice>(key:K,value:Invoice[K])=>void;
  setParty:(party:"sender"|"recipient",updates:Partial<Party>)=>void;
  addItem:()=>void;
  updateItem:(id:string,updates:Partial<LineItem>)=>void;
  removeItem:(id:string)=>void;
  setGlobalDiscount:(discount:Discount)=>void;
  setTheme:(updates:Partial<Invoice["theme"]>)=>void;
  setLabels:(updates:Partial<Invoice["labels"]>)=>void;
  reset:()=>void;
}
export const useInvoiceStore=create<InvoiceState>((set)=>({
  invoice:createEmptyInvoice(),
  setField:(key,value)=>set(s=>({invoice:{...s.invoice,[key]:value}})),
  setParty:(party,updates)=>set(s=>({invoice:{...s.invoice,[party]:{...s.invoice[party],...updates}}})),
  addItem:()=>set(s=>({invoice:{...s.invoice,items:[...s.invoice.items,newLineItem()]}})),
  updateItem:(id,updates)=>set(s=>({invoice:{...s.invoice,items:s.invoice.items.map(i=>i.id===id?{...i,...updates}:i)}})),
  removeItem:(id)=>set(s=>{const remaining=s.invoice.items.filter(i=>i.id!==id);return {invoice:{...s.invoice,items:remaining.length?remaining:[newLineItem()]}}}),
  setGlobalDiscount:(discount)=>set(s=>({invoice:{...s.invoice,globalDiscount:discount}})),
  setTheme:(updates)=>set(s=>({invoice:{...s.invoice,theme:{...s.invoice.theme,...updates}}})),
  setLabels:(updates)=>set(s=>({invoice:{...s.invoice,labels:{...s.invoice.labels,...updates}}})),
  reset:()=>set({invoice:createEmptyInvoice()}),
}));
