import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { PILLARS } from "@/content/services";
import { PRODUCTS } from "@/content/products";
import { WORK } from "@/content/work";
import { INDUSTRIES } from "@/content/industries";
import { PUBLISHED } from "@/content/blog";

/**
 * Generated from the same content modules the pages render, so a new case study
 * or industry is in the sitemap the moment it exists. The current live site has
 * no sitemap at all.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${SITE_URL}${path}`;

  const statics: [string, number][] = [
    ["/", 1],
    ["/services", 0.9],
    ["/products", 0.9],
    ["/work", 0.9],
    ["/industries", 0.9],
    ["/about", 0.7],
    ["/blog", 0.6],
    ["/contact", 0.8],
  ];

  return [
    ...statics.map(([path, priority]) => ({
      url: url(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...PILLARS.map((p) => ({ url: url(`/services/${p.slug}`), lastModified: now, priority: 0.8 })),
    ...PRODUCTS.map((p) => ({ url: url(`/products/${p.slug}`), lastModified: now, priority: 0.8 })),
    ...WORK.map((w) => ({ url: url(`/work/${w.slug}`), lastModified: now, priority: 0.7 })),
    ...INDUSTRIES.map((i) => ({ url: url(`/industries/${i.slug}`), lastModified: now, priority: 0.8 })),
    ...PUBLISHED.map((p) => ({ url: url(`/blog/${p.slug}`), lastModified: new Date(p.date), priority: 0.6 })),
  ];
}
