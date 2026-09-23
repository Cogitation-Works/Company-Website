import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Statement from "@/components/sections/Statement";
import Work from "@/components/sections/Work";
import Products from "@/components/sections/Products";
import Industries from "@/components/sections/Industries";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Statement />
      <Work />
      <Products />
      <Industries />
      <CTA />
    </>
  );
}
