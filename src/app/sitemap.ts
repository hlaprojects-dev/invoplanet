import type {MetadataRoute} from "next";
import {SITE} from "@/lib/site";
import {resources} from "@/lib/resources";
export default function sitemap():MetadataRoute.Sitemap{const base=["/","/how-to-use","/resources","/about","/faq","/contact","/privacy","/terms","/cookies","/disclaimer"];return [...base.map(path=>({url:`${SITE.url}${path}`,lastModified:new Date()})),...resources.map(r=>({url:`${SITE.url}/resources/${r.slug}`,lastModified:new Date()}))];}
