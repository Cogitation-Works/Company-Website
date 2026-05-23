import {
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  variant?: "up" | "left" | "right" | "zoom" | "fade";
};

const revealVariants: Record<NonNullable<RevealProps["variant"]>, Variants> = {
  up: {
    hidden: { opacity: 0, y: 44, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  left: {
    hidden: { opacity: 0, x: -44, filter: "blur(12px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  right: {
    hidden: { opacity: 0, x: 44, filter: "blur(12px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  zoom: {
    hidden: { opacity: 0, y: 24, scale: 0.96, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  },
  fade: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

const Reveal = ({
  children,
  className = "",
  delay = 0,
  once = true,
  variant = "up",
  style,
  ...props
}: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`reveal motion-reveal reveal-${variant} ${className}`}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount: 0.22, margin: "0px 0px -12% 0px" }}
      variants={prefersReducedMotion ? undefined : revealVariants[variant]}
      transition={{
        duration: 0.82,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
