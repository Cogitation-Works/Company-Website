import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import FluidCursor from "@/components/ui/FluidCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://cogitationworks.com";

/**
 * Root metadata. The live site currently has no meta description, no
 * canonical and no structured data — this is the fix, applied from the
 * first commit rather than bolted on later.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default:
      "Cogitation Works — Enterprise Software, ERP, CRM & IoT Platforms | Dubai & India",
    template: "%s | Cogitation Works",
  },
  description:
    "Cogitation Works builds the systems that run operations — ERP, CRM, workforce, IoT and AI platforms for manufacturing, healthcare, fintech, telecom, logistics and agriculture. Offices in Dubai and Vellore, India.",
  keywords: [
    "enterprise software development",
    "custom ERP development",
    "CRM software company",
    "IoT solutions",
    "software company Dubai",
    "software development India",
    "mobile app development",
    "AI automation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Cogitation Works",
    url: SITE,
    title: "Cogitation Works — We build the systems that run your operation",
    description:
      "Enterprise software for factories, clinics, fleets, networks and farms. ERP, CRM, workforce and AI platforms engineered for real operational load.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cogitation Works",
    description:
      "Enterprise software for factories, clinics, fleets, networks and farms.",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cogitation Works",
  url: SITE,
  email: "info@cogitationworks.com",
  description:
    "Enterprise software engineering — ERP, CRM, workforce, IoT and AI platforms.",
  address: [
    { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    {
      "@type": "PostalAddress",
      addressLocality: "Vellore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/cogitation-works/",
    "https://www.instagram.com/cogitation_works/",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50
                     focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <FluidCursor />
          <Cursor />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
