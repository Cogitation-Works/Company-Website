/**
 * Site-wide facts and navigation.
 *
 * Every figure the company states about itself lives in ONE place so a real
 * number replaces a placeholder exactly once. Anything still unconfirmed is
 * marked `tbc: true` and rendered with a visible marker in development — see
 * PROJECT.md §7.
 */

export const SITE_URL = "https://www.cogitationworks.com";

/**
 * Contact details transcribed from the existing live site
 * (`Cogitation_Works_Website/src/components/footer/Footer.tsx` and the
 * "Book a call" links across its pages).
 *
 * ⚠️ There is NO postal address anywhere on the old site — it states only
 * "Dubai | India | Global". So none is published here either. A street address
 * for each hub has to be supplied before launch; inventing one would be the
 * worst possible thing to guess at on a contact page.
 */
export type Hub = {
  city: string;
  timeZone: string;
  country: "AE" | "IN";
  /** Present only where a sub-national region is meaningful. */
  region?: string;
};

export const COMPANY: {
  name: string;
  founded: number;
  email: string;
  phone: string;
  linkedin: string;
  instagram: string;
  whatsapp: string;
  booking: string;
  positioning: string;
  hubs: Hub[];
} = {
  name: "Cogitation Works",
  founded: 2024,
  email: "info@cogitationworks.com",
  phone: "+91 93608 89434",
  linkedin: "https://www.linkedin.com/in/cogitation-works/",
  instagram: "https://www.instagram.com/cogitation_works/",
  whatsapp: "https://wa.me/919360889434",
  // Every "Book a call" on the old site points here.
  booking: "https://calendar.app.google/7gB3fnhRjGCBUptQ6",
  positioning:
    "We build the systems that run your operation.",
  hubs: [
    { city: "UAE", timeZone: "Asia/Dubai", country: "AE" },
    { city: "Vellore", timeZone: "Asia/Kolkata", country: "IN", region: "Tamil Nadu" },
  ],
};

/** Primary navigation. Ventures sits under About deliberately — see PROJECT.md §1.5. */
export const NAV = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

export const FOOTER_NAV = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "What we do",
    links: [
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Work", href: "/work" },
      { label: "Industries", href: "/industries" },
    ],
  },
] as const;
