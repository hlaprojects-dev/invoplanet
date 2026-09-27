# InvoPlanet — Global Free Invoice Maker

A static, browser-based invoice maker built with Next.js, React, TypeScript and Tailwind CSS.

## Product goals
- Free invoice creation with no account or subscription
- No automatic invoice draft/history storage
- Multiple currencies and languages, including RTL Arabic and Urdu
- Flexible quantity, rate and percentage-based calculations
- Editable invoice headings
- Logo upload and PDF export
- Responsive mobile and desktop UX
- Original invoicing guides, FAQ, About, Contact and legal pages
- SEO metadata, sitemap and robots support

## Privacy model
Invoice data is handled by the client-side application. This version does not automatically save invoice drafts or invoice history. PDF generation is performed in the browser.

## AdSense readiness
This repository includes substantial informational content and site structure that can support an advertising-supported product: About, Contact, Privacy, Terms, Cookies, FAQ, How to Use, and 18 original invoicing guides. It does **not** guarantee Google AdSense approval. Before applying, publish the site on a real domain, replace the placeholder contact email and domain in `src/lib/site.ts`, review all legal text, and ensure the production site's actual cookies, analytics, advertising and consent behavior are accurately disclosed.

Google does not publish a universal minimum number of articles that guarantees approval. Focus on originality, usefulness, navigation, accessibility, technical quality and compliance with current publisher policies.

## Run locally
```bash
npm install
npm run dev
```

## Build static site
```bash
npm run build
```

The build uses Next.js static export. The generated site can be deployed to a static host/CDN.
