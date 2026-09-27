import type {Metadata} from "next";
export const metadata:Metadata={title:"Invoice Maker FAQ",description:"Answers to common questions about creating free invoices, PDF export, privacy, currencies and taxes."};
const faqs=[
["Is the invoice maker free?","Yes. The core invoice generator is designed to be free to use without a subscription or account."],
["Do I need to create an account?","No. The current editor does not require registration."],
["Does it save my invoice automatically?","No. Automatic invoice drafts and invoice history have been removed from the current version. This is intentional for a simpler, privacy-conscious workflow."],
["Can I change the invoice headings?","Yes. Open Customize invoice labels and change headings such as Invoice, Description, Qty, Rate, Amount, Subtotal, Tax and Total."],
["Can I use my own currency?","The editor includes a selection of widely used currencies. Always confirm the currency and any exchange-rate terms agreed with your customer."],
["Can I add tax or discounts?","Yes. You can enter a tax label and rate and an overall percentage discount. Local tax treatment should always be verified independently."],
["Can I invoice by commission or percentage?","Yes. Line items can use a percentage-based calculation when your commercial agreement uses a commission or similar percentage fee."],
["Does the tool provide tax advice?","No. The calculator performs arithmetic; it cannot determine whether a transaction is taxable, exempt, zero-rated or subject to special rules."],
["Can I use the PDF for my business?","The generated PDF is intended as a general business document. Check your local legal and tax requirements before using any invoice format for regulated purposes."],
["How can I contact InvoPlanet?","Use the Contact page for the support route configured by the site owner."],
];
export default function FAQ(){return <main className="article-page"><span className="crumb">InvoPlanet / FAQ</span><h1>Frequently asked questions</h1><p className="intro">Answers about the free invoice generator, privacy, calculations and practical use.</p><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></main>}
