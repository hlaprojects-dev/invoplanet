import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import {resources} from "@/lib/resources";
export const dynamicParams=false;
export function generateStaticParams(){return resources.map(r=>({slug:r.slug}));}
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{const r=resources.find(x=>x.slug===params.slug);return r?{title:r.title,description:r.description}:{};}
export default function ResourcePage({params}:{params:{slug:string}}){const r=resources.find(x=>x.slug===params.slug);if(!r)notFound();return <main className="article-page"><span className="crumb"><Link href="/resources">Resources</Link> / Guide</span><h1>{r.title}</h1><p className="intro">{r.intro}</p>{r.sections.map(s=><section className="article-section" key={s.heading}><h2>{s.heading}</h2>{s.paragraphs.map((p,i)=><p key={i}>{p}</p>)}{s.bullets&&<ul>{s.bullets.map(b=><li key={b}>{b}</li>)}</ul>}</section>)}<div className="info-box">InvoPlanet is a general-purpose invoice tool. Tax rates, invoice requirements, record-keeping rules and payment laws vary by jurisdiction. Verify local requirements before issuing business documents.</div><div className="hero-actions" style={{justifyContent:"flex-start"}}><Link className="secondary-link" href="/resources">Back to all guides</Link><Link className="primary-link" href="/#invoice-maker">Create an invoice</Link></div></main>}
