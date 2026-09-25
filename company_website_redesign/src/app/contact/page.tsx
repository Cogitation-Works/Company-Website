import type { Metadata } from "next";
import { Section } from "@/components/layout/Blocks";
import { OpenHero } from "@/components/heroes/Heroes";
import { COMPANY } from "@/content/site";
import ContactForm from "@/components/contact/ContactForm";
import ConfettiHero from "@/components/heroes/ConfettiHero";

export const metadata: Metadata = {
  title: "Contact — book a solution architecture call",
  description:
    "Tell us what the system has to do. Senior architects evaluate your functional requirements, analyse dependencies and return a production-ready technical roadmap. NDA guaranteed, 45-minute consultation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <OpenHero
        figure={<ConfettiHero />}
        title="Tell us what the system has to do."
        lead="Our architects evaluate your functional requirements, analyse dependencies and return a production-ready technical roadmap. No obligation, and nothing you share leaves the room."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <h2 className="label-mono">Direct</h2>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="text-[0.875rem] text-muted">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="link-wipe text-[1.0625rem]"
                    data-cursor
                  >
                    {COMPANY.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.875rem] text-muted">Phone / WhatsApp</dt>
                <dd className="mt-1">
                  <a
                    href={COMPANY.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-wipe text-[1.0625rem]"
                    data-cursor
                  >
                    {COMPANY.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.875rem] text-muted">Book directly</dt>
                <dd className="mt-1">
                  <a
                    href={COMPANY.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-wipe text-[1.0625rem]"
                    data-cursor
                  >
                    45-minute consultation →
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.875rem] text-muted">Elsewhere</dt>
                <dd className="mt-1 flex gap-5">
                  <a href={COMPANY.linkedin} className="link-wipe" data-cursor>
                    LinkedIn
                  </a>
                  <a href={COMPANY.instagram} className="link-wipe" data-cursor>
                    Instagram
                  </a>
                </dd>
              </div>
            </dl>

            <h2 className="label-mono mt-12">Hubs</h2>
            <ul className="mt-6 space-y-5">
              {COMPANY.hubs.map((h) => (
                <li key={h.city}>
                  <p className="text-[1.0625rem] font-[560] tracking-[-0.018em]">
                    {h.city}
                  </p>
                  <p className="text-[0.875rem] text-muted">
                    {h.region ? `${h.region}, ` : ""}
                    {h.country === "AE" ? "United Arab Emirates" : "India"}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.8125rem] leading-snug text-faint">
              Street addresses are not published yet — the existing site lists
              only &ldquo;Dubai | India | Global&rdquo;, so there is nothing to
              carry over. Supply one per hub and it goes here.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
