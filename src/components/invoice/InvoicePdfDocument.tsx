import {Document,Page,View,Text,Image,StyleSheet} from "@react-pdf/renderer";
import type {Invoice} from "@/types/invoice";
import {calculateInvoiceTotals,calculateLineBase,formatCurrency,formatDate,totalsView} from "@/lib/invoice-calculations";
import {directionFor,localeFor,t} from "@/lib/i18n";
import {pdfFontFor,startMark,withStartMarks} from "@/lib/pdf-fonts";
import {readableOn} from "@/lib/utils";

const LOGO_MAX_W=140,LOGO_MAX_H=56;
function logoBox(ratio:number|null){
 const r=ratio&&ratio>0?ratio:1;
 if(r>=LOGO_MAX_W/LOGO_MAX_H) return {width:LOGO_MAX_W,height:LOGO_MAX_W/r};
 return {height:LOGO_MAX_H,width:LOGO_MAX_H*r};
}

const styles=StyleSheet.create({
 page:{padding:40,fontSize:10,fontFamily:"Helvetica",color:"#0f172a"},
 header:{flexDirection:"row",justifyContent:"space-between",borderBottomWidth:2,paddingBottom:16,marginBottom:16},
 sender:{fontSize:12,fontFamily:"Helvetica-Bold",marginBottom:2},
 contact:{color:"#475569",marginBottom:1},
 muted:{color:"#64748b"},
 title:{fontSize:22,fontFamily:"Helvetica-Bold"},
 meta:{flexDirection:"row",justifyContent:"space-between",marginBottom:20},
 label:{color:"#94a3b8",marginBottom:2},
 balanceBox:{flexDirection:"row",justifyContent:"space-between",gap:12,borderRadius:4,paddingVertical:5,paddingHorizontal:10,marginTop:6,fontFamily:"Helvetica-Bold",fontSize:11,minWidth:150},
 table:{marginTop:8},
 thead:{flexDirection:"row",borderRadius:3,paddingVertical:6,paddingHorizontal:6,marginBottom:4},
 row:{flexDirection:"row",borderBottomWidth:.5,borderBottomColor:"#f1f5f9",paddingVertical:6,paddingHorizontal:6},
 desc:{width:"46%"},qty:{width:"9%",textAlign:"right"},rate:{width:"18%",textAlign:"right"},comm:{width:"20%",textAlign:"right"},amount:{width:"22%",textAlign:"right"},
 totals:{marginTop:16,alignItems:"flex-end"},
 totalRow:{flexDirection:"row",justifyContent:"space-between",width:230,marginBottom:3},
 grand:{flexDirection:"row",justifyContent:"space-between",width:230,borderTopWidth:1,paddingTop:6,marginTop:6},
 bold:{fontFamily:"Helvetica-Bold",fontSize:12},
 notesTitle:{fontFamily:"Helvetica-Bold",marginBottom:3},
 notes:{marginTop:28,borderTopWidth:.5,borderTopColor:"#f1f5f9",paddingTop:10,color:"#64748b"},
});

export function InvoicePdfDocument({invoice:source}:{invoice:Invoice}){
 const invoice=withStartMarks(source),mk=startMark(source.language);
 const totals=calculateInvoiceTotals(invoice);
 const view=totalsView(invoice,totals);
 const hasCommission=invoice.items.some(i=>i.pricingType==="percentage");
 const w=hasCommission?{desc:"30%",qty:"9%",rate:"18%",comm:"20%",amount:"22%"}:{desc:"46%",qty:"12%",rate:"20%",comm:"0%",amount:"22%"};
 const locale=localeFor(invoice.language);
 const x=(k:any)=>mk(t(invoice.language,k));
 const rtl=directionFor(invoice.language)==="rtl";
 const tpl=invoice.theme.template;
 const isClassic=tpl==="classic";
 const isPremium=tpl==="premium";
 // A custom font (for Urdu/Arabic/Russian) always wins. Otherwise, Classic uses the
 // built-in Times-Roman serif; Standard/Premium use the built-in Helvetica.
 const fam=pdfFontFor(invoice.language);
 const serifFam=!fam&&isClassic?"Times-Roman":null;
 const serifBoldFam=!fam&&isClassic?"Times-Bold":null;
 const fr:any=fam?{fontFamily:fam}:serifFam?{fontFamily:serifFam}:{};
 const fb:any=fam?{fontFamily:fam,fontWeight:700}:serifBoldFam?{fontFamily:serifBoldFam}:{};
 const align=rtl?"left":"right";
 const accent=invoice.theme.accentColor,onAccent=readableOn(accent);
 const money=(n:number)=>formatCurrency(n,invoice.currency,locale);
 const box=logoBox(invoice.theme.logoRatio);
 const premCard={backgroundColor:"#f8fafc",borderRadius:8,padding:8};

 return <Document title={`${source.labels.invoice} ${source.invoiceNumber}`}>
  <Page size="A4" style={[styles.page,fr,{direction:rtl?"rtl":"ltr"} as any]}>

   {isClassic&&<View style={{borderTopWidth:2,borderBottomWidth:2,borderColor:accent,paddingVertical:6,marginBottom:16,alignItems:"center"}}>
    <Text style={[fb,{color:accent,fontSize:15,letterSpacing:4}]}>{invoice.labels.invoice}</Text>
   </View>}

   <View style={isPremium?[styles.header,fb,{backgroundColor:accent,marginHorizontal:-40,paddingHorizontal:40,paddingTop:24,borderBottomWidth:0}]:[styles.header,{borderBottomColor:accent}]}>
    <View>
     {invoice.theme.logoDataUrl&&<Image src={invoice.theme.logoDataUrl} style={{...box,marginBottom:8,backgroundColor:isPremium?"#ffffff":undefined,borderRadius:isPremium?4:0,padding:isPremium?3:0}}/>}
     <Text style={[styles.sender,fb,isPremium?{color:onAccent}:{}]}>{invoice.sender.name||x("yourBusiness")}</Text>
     {!!invoice.sender.contact&&<Text style={[styles.contact,fr,isPremium?{color:onAccent,opacity:0.85}:{}]}>{invoice.sender.contact}</Text>}
     <Text style={[styles.muted,isPremium?{color:onAccent,opacity:0.85}:{}]}>{invoice.sender.address}</Text>
     <Text style={[styles.muted,isPremium?{color:onAccent,opacity:0.85}:{}]}>{invoice.sender.email}</Text>
     {!!invoice.sender.phone&&<Text style={[styles.muted,isPremium?{color:onAccent,opacity:0.85}:{}]}>{invoice.sender.phone}</Text>}
    </View>
    <View>
     {!isClassic&&<Text style={[styles.title,fb,{color:isPremium?onAccent:accent,textAlign:align as any}]}>{invoice.labels.invoice}</Text>}
     <Text style={[styles.muted,{textAlign:align as any},isPremium?{color:onAccent,opacity:0.85}:{}]}>{invoice.invoiceNumber}</Text>
    </View>
   </View>

   <View style={[styles.meta,isPremium?{marginTop:16}:{}]}>
    <View style={isPremium?[premCard,{maxWidth:260}]:{}}>
     <Text style={styles.label}>{invoice.labels.billTo}</Text>
     <Text style={[{fontFamily:"Helvetica-Bold"},fb]}>{invoice.recipient.name||x("clientName")}</Text>
     {!!invoice.recipient.contact&&<Text style={[styles.contact,fr]}>{invoice.recipient.contact}</Text>}
     <Text style={styles.muted}>{invoice.recipient.address}</Text>
     <Text style={styles.muted}>{invoice.recipient.email}</Text>
     {!!invoice.recipient.phone&&<Text style={styles.muted}>{invoice.recipient.phone}</Text>}
    </View>
    <View style={isPremium?[premCard]:{}}>
     <Text style={styles.muted}>{x("issueDate")}: {formatDate(invoice.issueDate,locale)}</Text>
     <Text style={styles.muted}>{x("dueDate")}: {formatDate(invoice.dueDate,locale)}</Text>
     {invoice.showBalanceBox&&(isClassic
      ?<View style={[styles.balanceBox,fb,{borderWidth:1.5,borderColor:accent}]}><Text style={{color:accent}}>{invoice.labels.balanceDue}</Text><Text style={{color:accent}}>{money(totals.balanceDue)}</Text></View>
      :<View style={[styles.balanceBox,fb,{backgroundColor:accent}]}><Text style={{color:onAccent}} wrap={false}>{invoice.labels.balanceDue}</Text><Text style={{color:onAccent}}>{money(totals.balanceDue)}</Text></View>)}
    </View>
   </View>

   <View style={styles.table}>
    <View style={isClassic?[styles.thead,{borderTopWidth:1.5,borderBottomWidth:1.5,borderTopColor:accent,borderBottomColor:accent,paddingHorizontal:2}]:[styles.thead,{backgroundColor:accent}]}>
     <Text style={[styles.desc,{width:w.desc,color:isClassic?accent:onAccent}]}>{invoice.labels.description}</Text>
     <Text style={[styles.qty,{width:w.qty,color:isClassic?accent:onAccent}]}>{invoice.labels.quantity}</Text>
     <Text style={[styles.rate,{width:w.rate,color:isClassic?accent:onAccent}]}>{invoice.labels.rate}</Text>
     {hasCommission&&<Text style={[styles.comm,{color:isClassic?accent:onAccent}]}>{invoice.labels.commission}</Text>}
     <Text style={[styles.amount,{width:w.amount,color:isClassic?accent:onAccent}]}>{invoice.labels.amount}</Text>
    </View>
    {invoice.items.map((item,i)=><View key={item.id} style={[styles.row,isPremium&&i%2===1?{backgroundColor:"#f8fafc"}:{}]} wrap={false}>
     <Text style={[styles.desc,{width:w.desc}]}>{item.description||"-"}</Text>
     <Text style={[styles.qty,{width:w.qty}]}>{item.quantity}</Text>
     <Text style={[styles.rate,{width:w.rate}]}>{money(item.pricingType==="percentage"?calculateLineBase(item):item.rate)}</Text>
     {hasCommission&&<Text style={[styles.comm,{paddingRight:6}]}>{item.pricingType==="percentage"?`${item.commissionRate}%`:<Text style={{color:"#64748b"}}>-</Text>}</Text>}
     <Text style={[styles.amount,{width:w.amount}]}>{money(totals.itemTotals[i])}</Text>
    </View>)}
   </View>

   <View style={styles.totals}>
    {view.showSubtotal&&<View style={styles.totalRow}><Text style={styles.muted}>{invoice.labels.subtotal}</Text><Text>{money(totals.subtotal)}</Text></View>}
    {view.hasDiscount&&<View style={styles.totalRow}><Text style={styles.muted}>{view.discountLabel}</Text><Text>- {money(totals.discountAmount)}</Text></View>}
    {view.hasTax&&<View style={styles.totalRow}><Text style={styles.muted}>{view.taxLabel}</Text><Text>{money(totals.taxAmount)}</Text></View>}
    {view.hasShipping&&<View style={styles.totalRow}><Text style={styles.muted}>{invoice.labels.shipping}</Text><Text>{money(totals.shippingAmount)}</Text></View>}
    <View style={[styles.grand,{borderTopColor:accent}]}><Text style={[styles.bold,fb]}>{view.totalLabel}</Text><Text style={[styles.bold,fb]}>{money(totals.grandTotal)}</Text></View>
    {view.hasPaid&&<>
     <View style={[styles.totalRow,{marginTop:3}]}><Text style={styles.muted}>{invoice.labels.amountPaid}</Text><Text>- {money(totals.paid)}</Text></View>
     {isPremium
      ?<View style={{flexDirection:"row",justifyContent:"space-between",width:230,marginTop:6,backgroundColor:accent,borderRadius:6,paddingVertical:7,paddingHorizontal:10}}><Text style={[styles.bold,fb,{color:onAccent}]}>{invoice.labels.balanceDue}</Text><Text style={[styles.bold,fb,{color:onAccent}]}>{money(totals.balanceDue)}</Text></View>
      :<View style={[styles.grand,{borderTopColor:accent}]}><Text style={[styles.bold,fb,{color:accent}]}>{invoice.labels.balanceDue}</Text><Text style={[styles.bold,fb,{color:accent}]}>{money(totals.balanceDue)}</Text></View>}
    </>}
   </View>

   {!!invoice.notes&&<View style={isPremium?[styles.notes,premCard,{marginTop:20,borderTopWidth:0,paddingTop:8}]:styles.notes}>
    <Text style={[styles.notesTitle,fb,{color:accent}]}>{invoice.labels.notes}</Text>
    <Text>{invoice.notes}</Text>
   </View>}
  </Page>
 </Document>;
}
