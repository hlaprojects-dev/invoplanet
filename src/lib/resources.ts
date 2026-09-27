export type Resource = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const resources: Resource[] = [
  {
    slug: "how-to-create-a-professional-invoice",
    title: "How to Create a Professional Invoice",
    description: "A practical guide to the information every clear, professional invoice should contain.",
    intro: "A good invoice does more than ask for payment. It gives the customer a clear record of who provided the work, what was delivered, how the price was calculated, and when payment is expected.",
    sections: [
      { heading: "Start with clear identities", paragraphs: ["Put your business or personal trading name near the top, followed by useful contact details. Add the customer's name or company as the billed party. Clear identities reduce payment questions and make invoices easier to file."], bullets: ["Your business name and contact details", "Customer or company name", "Invoice number", "Issue date and due date"] },
      { heading: "Describe the work", paragraphs: ["Use one line for each product or service. A description such as 'Website maintenance — June' is more useful than a vague entry such as 'Services'. Include quantities and rates when they explain the total."], bullets: ["Use plain, specific descriptions", "Show quantity or hours where relevant", "Show the unit rate when it helps the customer verify the amount"] },
      { heading: "Show the calculation", paragraphs: ["A professional invoice normally separates the subtotal from discounts, taxes and the final total. This makes the arithmetic easy to check and helps customers understand why the amount due differs from the listed prices." ] },
      { heading: "Finish with payment information", paragraphs: ["Add payment instructions, terms, or a short thank-you note when useful. Keep the wording concise. If you have bank or payment details, make sure they are accurate before sending the invoice."] },
    ],
  },
  {
    slug: "invoice-vs-receipt",
    title: "Invoice vs Receipt: What Is the Difference?",
    description: "Understand when a business normally issues an invoice and when it issues a receipt.",
    intro: "Invoices and receipts are both financial records, but they serve different purposes. Understanding the difference helps businesses communicate clearly with customers and maintain better records.",
    sections: [
      { heading: "What an invoice does", paragraphs: ["An invoice is generally a request for payment for goods or services already supplied or agreed. It identifies the seller, customer, items or services, prices, and the amount due. It can also state payment terms and a due date."] },
      { heading: "What a receipt does", paragraphs: ["A receipt generally confirms that money has been received. It is therefore commonly issued after payment. The exact legal and tax treatment varies by country and business type, so local rules should be followed."] },
      { heading: "Why the distinction matters", paragraphs: ["If a customer has not paid yet, an invoice usually communicates the amount they owe. Once payment has been received, a receipt can provide evidence of that payment. Some systems may produce both documents for the same transaction."] },
    ],
  },
  {
    slug: "invoice-numbering-guide",
    title: "Invoice Numbering: Simple Systems That Scale",
    description: "Learn practical ways to organize invoice numbers without making your bookkeeping complicated.",
    intro: "Consistent invoice numbers make invoices easier to find, discuss and reconcile. The best system is usually the simplest one you can apply consistently.",
    sections: [
      { heading: "Use a predictable sequence", paragraphs: ["A basic sequence such as INV-0001, INV-0002 and INV-0003 is easy to understand. Avoid changing formats repeatedly because customers and your own records benefit from consistency."] },
      { heading: "Separate projects when useful", paragraphs: ["Businesses with many departments or projects may prefer prefixes such as WEB-0001 or LOG-0001. Only add this complexity if it solves a real filing problem."] },
      { heading: "Avoid accidental duplicates", paragraphs: ["Before issuing an invoice, confirm that the number has not already been used. If your workflow spans multiple people, define who is responsible for assigning the next number."] },
    ],
  },
  {
    slug: "freelance-invoice-guide",
    title: "Freelance Invoice Guide",
    description: "A practical invoicing checklist for freelancers, contractors and independent professionals.",
    intro: "Freelancers often invoice for projects, hours, milestones or recurring retainers. A well-structured invoice helps the client verify the work and helps the freelancer keep a clean record of income.",
    sections: [
      { heading: "Match the invoice to the agreement", paragraphs: ["Use the same project or service names that appear in your proposal or contract. If you charge hourly, show hours and the agreed rate. For a fixed project, show the milestone or deliverable being billed."] },
      { heading: "Make payment expectations visible", paragraphs: ["State the due date and any agreed payment terms. If the client needs a purchase order, tax number, or reference, include it before sending the invoice."] },
      { heading: "Keep records", paragraphs: ["Save the final invoice alongside the relevant contract, project records and payment confirmation. Record-keeping requirements differ by jurisdiction, so use the retention period required by your local rules."] },
    ],
  },
  {
    slug: "small-business-invoicing-checklist",
    title: "Small Business Invoicing Checklist",
    description: "Use this checklist before sending an invoice to a customer.",
    intro: "Small businesses can reduce avoidable payment delays by checking a few details before every invoice is sent.",
    sections: [
      { heading: "Before sending", paragraphs: ["Review the customer name, billing address, invoice number, issue date, due date, line items and totals. Check that tax and discount calculations match your agreement."], bullets: ["Correct customer details", "Unique invoice number", "Accurate dates", "Clear item descriptions", "Correct currency", "Correct tax treatment", "Payment instructions"] },
      { heading: "After sending", paragraphs: ["Keep a copy of the issued invoice and note the expected payment date. Follow up professionally if payment becomes overdue, using the terms agreed with the customer."] },
    ],
  },
  {
    slug: "how-to-invoice-for-hourly-work",
    title: "How to Invoice for Hourly Work",
    description: "Show hours, rates and totals clearly when billing for time-based services.",
    intro: "Hourly billing is common in consulting, development, design, legal work, repairs and many other services. The invoice should make it easy for the customer to verify the time and rate.",
    sections: [
      { heading: "Show the unit clearly", paragraphs: ["Use a description such as 'Development — 12 hours' or separate the description, quantity and rate fields so the calculation is visible. If your agreement uses different rates for different tasks, use separate lines."] },
      { heading: "Use accurate time records", paragraphs: ["Build the invoice from your time records rather than memory. Keep supporting notes privately when appropriate, especially for work that may be questioned later."] },
      { heading: "Check rounding", paragraphs: ["Decide whether your agreement uses exact minutes, quarter-hours or another increment. Apply the same rule consistently and make the invoice calculation easy to reproduce."] },
    ],
  },
  {
    slug: "commission-and-percentage-invoices",
    title: "How to Invoice Commission and Percentage-Based Work",
    description: "Understand how to present commissions, referral fees and percentage-based charges.",
    intro: "Some businesses earn a percentage of a sale, shipment value, project value or other base amount. These invoices need a clear explanation of both the base and the percentage used.",
    sections: [
      { heading: "Show the base amount", paragraphs: ["A percentage charge is difficult to verify without its base. Identify the relevant sales, freight, contract or transaction value and state the agreed percentage."] },
      { heading: "Separate different rates", paragraphs: ["If different services use different commission rates, use separate line items. This is clearer than combining everything into one unexplained percentage."] },
      { heading: "Check the agreement", paragraphs: ["Commission arrangements can have special rules about refunds, taxes, minimum fees and timing. The invoice should follow the written commercial agreement and applicable local requirements."] },
    ],
  },
  {
    slug: "logistics-and-dispatch-invoicing",
    title: "Invoicing for Logistics, Dispatch and Transport Services",
    description: "Practical invoice structure for freight, dispatching, trucking and transport businesses.",
    intro: "Transport businesses can bill per load, trip, mile, kilometer, hour, shipment, percentage or a combination. A clear invoice connects each charge to the service performed.",
    sections: [
      { heading: "Identify the service", paragraphs: ["Use useful references such as load number, shipment reference, route, service date or customer reference when appropriate. Do not include unnecessary personal information."] },
      { heading: "Choose the right pricing unit", paragraphs: ["Examples include a fixed load rate, a per-mile rate, a dispatch fee, detention time or a percentage-based service fee. Use separate lines when charges have different bases."] },
      { heading: "Keep supporting records", paragraphs: ["Depending on the business and jurisdiction, delivery confirmations, contracts and other operational records may support an invoice. Follow applicable transport and tax requirements."] },
    ],
  },
  {
    slug: "tax-on-invoices",
    title: "How to Show Tax on an Invoice",
    description: "Learn how to present tax clearly without making an invoice difficult to read.",
    intro: "Tax treatment varies widely by country, business type and transaction. The invoice should show the tax information required by the rules that apply to the seller and transaction.",
    sections: [
      { heading: "Use the correct tax name", paragraphs: ["Depending on the jurisdiction, the relevant tax may be VAT, GST, sales tax or another levy. Use the terminology and registration information required locally."] },
      { heading: "Show the taxable base", paragraphs: ["Customers should be able to understand how the tax amount was calculated. A common layout shows the subtotal, any permitted discount, taxable amount, tax rate and tax amount."] },
      { heading: "Do not guess legal treatment", paragraphs: ["A general invoice tool cannot determine whether a particular transaction is taxable, exempt, zero-rated or subject to special rules. Verify the applicable rules with your local tax authority or a qualified adviser."] },
    ],
  },
  {
    slug: "invoice-discount-guide",
    title: "How to Show Discounts on an Invoice",
    description: "Present percentage and fixed discounts in a way customers can understand.",
    intro: "Discounts can be promotional, negotiated, volume-based or part of a commercial agreement. Showing them separately makes the final amount easier to verify.",
    sections: [
      { heading: "Use a separate line", paragraphs: ["Instead of silently reducing a rate, show the discount as a named adjustment when transparency matters. State whether it is a percentage or fixed amount."] },
      { heading: "Apply the agreed order", paragraphs: ["Tax and discount rules vary. Some jurisdictions calculate tax before certain discounts while others use the discounted amount. Follow the applicable law and your agreement."] },
      { heading: "Avoid negative totals", paragraphs: ["A software tool should prevent accidental discounts from producing an invalid negative invoice. If a credit is required, use the appropriate accounting document or process rather than hiding it in a normal invoice."] },
    ],
  },
  {
    slug: "multi-currency-invoicing",
    title: "Multi-Currency Invoicing for International Clients",
    description: "Practical tips for issuing invoices in USD, EUR, GBP and other currencies.",
    intro: "International businesses may work with customers who prefer a currency different from the seller's home currency. The invoice should make the chosen currency unambiguous.",
    sections: [
      { heading: "State one invoice currency clearly", paragraphs: ["Use the currency code and a consistent currency symbol or formatting. Codes such as USD, EUR and GBP are useful because symbols can be ambiguous in international transactions."] },
      { heading: "Agree on conversion rules", paragraphs: ["If payment is made in a different currency, define the exchange-rate source and conversion date in the commercial agreement. Do not invent an exchange rate on the invoice without an agreed basis."] },
      { heading: "Check bank charges", paragraphs: ["International payments can involve intermediary or receiving-bank fees. Decide in advance who bears those charges and communicate the arrangement clearly."] },
    ],
  },
  {
    slug: "invoice-payment-terms",
    title: "Invoice Payment Terms: Net 7, Net 15, Net 30 and More",
    description: "Understand common payment-term wording and how to communicate a due date clearly.",
    intro: "Payment terms tell the customer when payment is expected. The most useful invoice usually shows an actual due date even when it also states a term such as Net 30.",
    sections: [
      { heading: "What Net 30 means", paragraphs: ["Net 30 commonly means the full amount is due 30 days from the agreed starting point, often the invoice date. Contracts can define the starting point differently, so follow the agreement."] },
      { heading: "Use a specific date", paragraphs: ["A visible due date reduces ambiguity, especially when customers operate in different countries or time zones. Keep the date format understandable for your audience."] },
      { heading: "Late-payment language", paragraphs: ["If your agreement permits interest, late fees or collection costs, state the relevant terms accurately. Local laws can limit or regulate such charges, so verify them before adding them."] },
    ],
  },
  {
    slug: "invoice-for-retail-and-wholesale",
    title: "Invoices for Retail and Wholesale Businesses",
    description: "Structure product invoices with quantities, unit prices and useful references.",
    intro: "Product businesses need invoices that make quantities and unit pricing easy to check. Wholesale customers may also need product codes, purchase-order references and delivery information.",
    sections: [
      { heading: "Use product-level lines", paragraphs: ["List products separately when they have different prices, quantities or tax treatment. Product codes can help customers match the invoice to their purchase order."] },
      { heading: "Separate delivery charges", paragraphs: ["If shipping is charged separately, label it clearly rather than quietly increasing a product price. This helps the buyer reconcile the invoice with the order."] },
      { heading: "Match the order", paragraphs: ["Check the customer reference, quantities and agreed prices before issuing the final invoice. Consistency between quote, order, delivery record and invoice reduces disputes."] },
    ],
  },
  {
    slug: "invoice-for-agencies",
    title: "Invoicing for Marketing, Design and Creative Agencies",
    description: "Build clearer agency invoices for retainers, projects, media and pass-through costs.",
    intro: "Agencies may bill retainers, project milestones, hourly work, media spend and third-party costs. Separating these categories makes the invoice easier for clients to approve.",
    sections: [
      { heading: "Group by service", paragraphs: ["Use concise sections such as strategy, design, development or campaign management. If a project has milestones, reference the relevant milestone in the description."] },
      { heading: "Explain pass-through costs", paragraphs: ["Third-party costs such as printing, media or software may need to be shown separately. Follow the commercial agreement and clearly identify reimbursable expenses where appropriate."] },
      { heading: "Keep recurring invoices consistent", paragraphs: ["For monthly retainers, keep the wording and layout stable. Customers should be able to compare one period with another without learning a new format each month."] },
    ],
  },
  {
    slug: "invoice-for-construction-contractors",
    title: "Invoicing for Construction and Contractors",
    description: "A practical structure for progress billing, labor, materials and project work.",
    intro: "Construction and contracting invoices can be more detailed than a simple service invoice because a project may involve labor, materials, equipment, milestones and retention or other contractual adjustments.",
    sections: [
      { heading: "Reference the project", paragraphs: ["Include the project name, job reference or purchase order when required by the contract. This helps the customer route the invoice to the correct project record."] },
      { heading: "Break down billable work", paragraphs: ["Separate labor, materials and other agreed charges when that information helps the customer verify the claim. For progress billing, reference the relevant milestone or period."] },
      { heading: "Follow the contract", paragraphs: ["Construction contracts can contain detailed payment procedures and document requirements. The invoice should follow those terms rather than using a generic approach."] },
    ],
  },
  {
    slug: "invoice-for-consultants",
    title: "Consulting Invoice Guide",
    description: "Create clear invoices for strategy, advisory, professional and consulting services.",
    intro: "Consultants commonly bill fixed projects, hourly work, day rates or recurring retainers. The invoice should connect the charge to the agreed scope without exposing unnecessary confidential information.",
    sections: [
      { heading: "Reference the engagement", paragraphs: ["Use a project or engagement name and the billing period when relevant. A short description is usually enough if the underlying contract already contains the detailed scope."] },
      { heading: "Choose the right unit", paragraphs: ["Day rates can be shown as quantity of days multiplied by the agreed rate. Hourly work can use hours. Fixed-fee milestones can be billed as a named deliverable or milestone amount."] },
      { heading: "Protect confidential information", paragraphs: ["An invoice should not contain sensitive client information that is not needed for billing. Keep the description useful but minimal."] },
    ],
  },
  {
    slug: "invoice-for-ecommerce",
    title: "E-commerce Invoicing Basics",
    description: "Organize online-order invoices with products, shipping, discounts and taxes.",
    intro: "E-commerce invoices need to connect the document to an order while keeping product, shipping, discount and tax amounts understandable.",
    sections: [
      { heading: "Use the order reference", paragraphs: ["Include an order number or customer reference where appropriate. This makes customer support and bookkeeping easier when there are many transactions."] },
      { heading: "Separate shipping and discounts", paragraphs: ["Show shipping or handling as a separate charge when appropriate, and identify discounts separately. Customers can then reconcile the invoice with their checkout total."] },
      { heading: "Consider local requirements", paragraphs: ["E-commerce sellers may face country-specific invoicing, VAT, GST, marketplace and consumer-document rules. Confirm the requirements for the markets you serve."] },
    ],
  },
  {
    slug: "invoice-data-privacy",
    title: "Invoice Data Privacy: What Should You Put on an Invoice?",
    description: "Reduce unnecessary exposure by including only information needed for billing.",
    intro: "Invoices contain business and customer information, so privacy should be considered when deciding what to collect, display and store.",
    sections: [
      { heading: "Collect only what is useful", paragraphs: ["A basic invoice may need names, business contact details, dates, descriptions, amounts and payment information. Avoid adding unrelated personal information simply because a form has space for it."] },
      { heading: "Review shared information", paragraphs: ["Before sending an invoice, check the recipient address and attachments. Use secure delivery methods appropriate for your business and customers."] },
      { heading: "Understand your legal duties", paragraphs: ["Privacy, tax and record-keeping obligations vary by jurisdiction. A general invoice generator cannot replace a business's legal or accounting advice."] },
    ],
  },
  {
    slug: "invoice-errors-to-avoid",
    title: "15 Common Invoice Mistakes to Avoid",
    description: "A practical review of mistakes that can create confusion or delay payment.",
    intro: "Most invoice problems are preventable. A short review before sending can catch errors that otherwise lead to customer questions or payment delays.",
    sections: [
      { heading: "The most common problems", paragraphs: ["Typical mistakes include wrong customer details, duplicate invoice numbers, missing due dates, vague descriptions, incorrect quantities, arithmetic errors, wrong currency, missing tax information and outdated bank details."], bullets: ["Wrong customer or billing address", "Duplicate or missing invoice number", "Incorrect date or due date", "Unclear service description", "Wrong quantity or rate", "Incorrect tax rate", "Unexpected discount", "Wrong currency", "Missing payment instructions", "Typos in bank or payment details"] },
      { heading: "Use a final review", paragraphs: ["Compare the invoice with the quote, contract, purchase order or delivery record. Confirm the final total independently if the transaction is important or complex."] },
    ],
  },
  {
    slug: "free-invoice-maker-guide",
    title: "How to Use a Free Online Invoice Maker",
    description: "A step-by-step guide to creating a professional invoice without creating an account.",
    intro: "An online invoice maker can be useful when you need a clean invoice quickly. The best workflow is short: enter the parties, add items, review adjustments and export the final document.",
    sections: [
      { heading: "1. Enter invoice details", paragraphs: ["Add an invoice number, issue date, due date, language and currency. Choose a numbering convention that works for your records."] },
      { heading: "2. Add the parties", paragraphs: ["Enter your business details and the customer's billing details. Keep the information accurate and include only what is needed for the invoice."] },
      { heading: "3. Add products or services", paragraphs: ["Write a clear description, enter quantity and rate, and check the calculated amount. Add more lines for different services or products."] },
      { heading: "4. Review and export", paragraphs: ["Check taxes, discounts, totals and payment notes. Preview the document and export the final PDF when everything is correct."] },
    ],
  },
];
