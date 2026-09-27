export type DiscountType = "percent" | "flat";
export type PricingType = "quantity" | "percentage";
export interface Discount { type: DiscountType; value: number; }
export interface Party { name:string; address:string; email:string; phone:string; taxId?:string; }
export interface LineItem { id:string; description:string; quantity:number; rate:number; pricingType:PricingType; commissionRate:number; discount:Discount; }
export interface InvoiceTheme { accentColor:string; logoDataUrl:string|null; }
export interface InvoiceLabels { invoice:string; from:string; billTo:string; description:string; quantity:string; rate:string; amount:string; subtotal:string; discount:string; tax:string; total:string; }
export interface Invoice { invoiceNumber:string; issueDate:string; dueDate:string; currency:string; language:string; sender:Party; recipient:Party; items:LineItem[]; taxRate:number; taxLabel:string; globalDiscount:Discount; notes:string; theme:InvoiceTheme; labels:InvoiceLabels; }
export interface InvoiceTotals { itemTotals:number[]; subtotal:number; discountAmount:number; taxableAmount:number; taxAmount:number; grandTotal:number; }
