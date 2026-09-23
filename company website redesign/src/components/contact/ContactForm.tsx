"use client";

import { useState } from "react";
import { PRODUCTS } from "@/content/products";
import { PILLARS } from "@/content/services";
import { Magnetic } from "@/components/ui/Interactions";

/**
 * Contact form.
 *
 * ⚠️ NO SUBMISSION ENDPOINT YET. The form validates and produces a mailto:
 * with the answers formatted, which means it genuinely works from day one and
 * nothing is silently lost. Swap `handleSubmit` for a server action or form
 * service when one is chosen — see PROJECT.md §7.
 *
 * Structured as three questions rather than a free-text box, because "tell us
 * about your project" produces a paragraph nobody can quote a price against.
 */

const BUDGETS = ["Under $10k", "$10k – $50k", "$50k – $150k", "$150k+", "Not sure yet"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Email: ${data.get("email")}`,
      `Interest: ${data.get("interest")}`,
      `Budget: ${data.get("budget")}`,
      "",
      "What the system has to do:",
      String(data.get("brief") ?? ""),
    ].join("\n");

    window.location.href =
      `mailto:info@cogitationworks.com` +
      `?subject=${encodeURIComponent(`Architecture call — ${data.get("company") || data.get("name")}`)}` +
      `&body=${encodeURIComponent(lines)}`;
    setSent(true);
  }

  const field =
    "w-full rounded-card border border-line bg-surface px-5 py-4 text-[1rem] " +
    "transition-colors placeholder:text-faint focus:border-signal focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="label-mono">Name</span>
          <input name="name" required autoComplete="name" className={`mt-3 ${field}`} />
        </label>
        <label className="block">
          <span className="label-mono">Company</span>
          <input name="company" autoComplete="organization" className={`mt-3 ${field}`} />
        </label>
      </div>

      <label className="block">
        <span className="label-mono">Work email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={`mt-3 ${field}`}
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="label-mono">What is this about</span>
          <select name="interest" className={`mt-3 ${field}`} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <optgroup label="Platforms">
              {PRODUCTS.map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Services">
              {PILLARS.map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.name}
                </option>
              ))}
            </optgroup>
            <option value="Something else">Something else</option>
          </select>
        </label>

        <label className="block">
          <span className="label-mono">Budget range</span>
          <select name="budget" className={`mt-3 ${field}`} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="label-mono">What does the system have to do?</span>
        <textarea
          name="brief"
          rows={5}
          required
          placeholder="The process as it works today, and where it breaks."
          className={`mt-3 resize-y ${field}`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <Magnetic>
          <button
            type="submit"
            className="inline-flex h-13 items-center rounded-pill bg-ink px-8 py-4 font-medium text-white transition-colors hover:bg-signal"
          >
            Book an architecture call →
          </button>
        </Magnetic>
        <p className="label-mono">NDA guaranteed · 45-minute consultation</p>
      </div>

      {sent ? (
        <p className="rounded-card border border-line bg-surface px-5 py-4 text-[0.9375rem] text-muted">
          Your email client should have opened with the details filled in. If it
          did not, write to{" "}
          <a href="mailto:info@cogitationworks.com" className="link-wipe">
            info@cogitationworks.com
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
