import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Statement from "@/components/sections/Statement";
import Work from "@/components/sections/Work";
import Products from "@/components/sections/Products";
import Industries from "@/components/sections/Industries";
import CTA from "@/components/sections/CTA";
import Lens from "@/components/ui/magnifier-lens";

export default function Home() {
  return (
    <>
      {/* The hero is excluded from the Lens on purpose: the Lens works by
          rendering its children a SECOND time, and duplicating the hero would
          mean a second WebGL canvas and a second copy of the frame sequence.
          Everything below it is plain DOM, so duplicating is cheap. */}
      <Hero />

      <Lens zoomFactor={1.75}>
        <Stats />
        <Statement />
        <Work />
        <Products />
        <Industries />
        <CTA />
      </Lens>
    </>
  );
}
