import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Free Invoice Maker | InvoPlanet", template: "%s | InvoPlanet" },
  description: SITE.description,
  keywords: ["free invoice maker","invoice generator","free invoice template","freelance invoice","business invoice","online invoice maker","PDF invoice"],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body><div className="site-shell"><header className="site-nav"><div className="nav-inner"><Link href="/" className="brand"><span className="brand-mark">IP</span><span>InvoPlanet</span></Link><nav><Link href="/#invoice-maker">Create Invoice</Link><Link href="/how-to-use">How to Use</Link><Link href="/resources">Guides</Link><Link href="/about">About</Link><Link href="/faq">FAQ</Link></nav></div></header>{children}<footer className="site-footer"><div className="footer-grid"><div><div className="brand footer-brand"><span className="brand-mark">IP</span><span>InvoPlanet</span></div><p>Free tools and practical invoicing guides for freelancers and businesses around the world.</p></div><div><strong>Learn</strong><Link href="/resources">Invoice Guides</Link><Link href="/how-to-use">How to Use</Link><Link href="/faq">FAQ</Link></div><div><strong>Company</strong><Link href="/about">About</Link><Link href="/contact">Contact</Link></div><div><strong>Legal</strong><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link><Link href="/disclaimer">Disclaimer</Link></div></div><div className="footer-bottom">© {new Date().getFullYear()} InvoPlanet. Free invoice creation in your browser.</div></footer></div></body></html>
}
