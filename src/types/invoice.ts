export type DiscountType = "percent" | "flat";
export type PricingType = "quantity" | "percentage";
export interface Discount { type: DiscountType; value: number; }
export interface Party { name:string; contact:string; address:string; email:string; phone:string; taxId?:string; }
export interface LineItem { id:string; description:string; quantity:number; rate:number; pricingType:PricingType; commissionRate:number; discount:Discount; }
export type TemplateId = "standard" | "classic" | "premium";
export interface InvoiceTheme { accentColor:string; logoDataUrl:string|null; logoRatio:number|null; template:TemplateId; }
export interface InvoiceLabels { invoice:string; from:string; billTo:string; description:string; quantity:string; rate:string; commission:string; amount:string; subtotal:string; discount:string; shipping:string; tax:string; total:string; amountPaid:string; balanceDue:string; notes:string; }
export interface Invoice { invoiceNumber:string; issueDate:string; dueDate:string; currency:string; language:string; sender:Party; recipient:Party; items:LineItem[]; taxRate:number; taxLabel:string; globalDiscount:Discount; shipping:number; amountPaid:number; showBalanceBox:boolean; notes:string; theme:InvoiceTheme; labels:InvoiceLabels; }
export interface InvoiceTotals { itemTotals:number[]; subtotal:number; discountAmount:number; taxableAmount:number; taxAmount:number; shippingAmount:number; grandTotal:number; paid:number; balanceDue:number; }
