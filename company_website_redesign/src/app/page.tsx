import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Statement from "@/components/sections/Statement";
import Work from "@/components/sections/Work";
import Products from "@/components/sections/Products";
import Industries from "@/components/sections/Industries";
import CTA from "@/components/sections/CTA";

/**
 * The magnifier Lens now wraps every page from the root layout, so this page
 * no longer wraps itself. Hero detects when it is inside the lens copy and
 * falls back to its static poster rather than mounting a second WebGL context.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Statement />
      <Work />
      <Products />
      <Industries />
      {/* The separate "Ventures" strip is gone: those things are now part of
          Products, which is already on this page. One section, not two. */}
      <CTA />
    </>
  );
}
