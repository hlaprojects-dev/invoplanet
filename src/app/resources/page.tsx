import type {Metadata} from "next";
import Link from "next/link";
import {resources} from "@/lib/resources";
export const metadata:Metadata={title:"Invoice Guides & Resources",description:"Practical, original guides about invoices, freelance billing, taxes, pricing, payment terms and small-business invoicing."};
export default function Resources(){return <main className="article-page"><span className="crumb">InvoPlanet / Resources</span><h1>Invoice guides & resources</h1><p className="intro">Practical explanations for freelancers, contractors, service businesses, retailers and teams. These guides are general educational information and do not replace local legal, tax or accounting advice.</p><div className="article-list">{resources.map(r=><Link className="article-card" key={r.slug} href={`/resources/${r.slug}`}><h3>{r.title}</h3><p>{r.description}</p></Link>)}</div></main>}
