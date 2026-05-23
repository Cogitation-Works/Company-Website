import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  direction?: "up" | "down";
};

const Parallax = ({
  children,
  className = "",
  distance = 48,
  direction = "up",
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const travel = direction === "up" ? -distance : distance;
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={prefersReducedMotion ? undefined : { y, scale: 1.04 }}
    >
      {children}
    </motion.div>
  );
};

export default Parallax;
