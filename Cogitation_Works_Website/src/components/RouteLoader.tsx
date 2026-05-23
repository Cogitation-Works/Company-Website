import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/services": "Services",
  "/products": "Products",
  "/about": "About",
};

type RouteLoaderProps = {
  isVisible: boolean;
  routeKey: string;
};

const RouteLoader = ({ isVisible, routeKey }: RouteLoaderProps) => {
  const prefersReducedMotion = useReducedMotion();
  const routeLabel = routeLabels[routeKey] || "Cogitation Works";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="route-loader-shell"
          aria-live="polite"
          aria-label={`Loading ${routeLabel}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.38 }}
        >
          <motion.div
            className="route-loader-plane route-loader-plane-top"
            initial={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="route-loader-plane route-loader-plane-bottom"
            initial={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1], delay: 0.04 }}
          />

          <div className="route-loader-content">
            <motion.img
              src={`${import.meta.env.BASE_URL}logo/logo.png`}
              alt=""
              className="route-loader-logo"
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="route-loader-wordmark"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.48, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Cogitation</span> Works
            </motion.div>
            <div className="route-loader-current">{routeLabel}</div>

            <div className="route-loader-progress" aria-hidden="true">
              {[0, 1, 2].map((item) => (
                <motion.span
                  key={item}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scaleX: [0.24, 1, 0.24],
                          opacity: [0.35, 1, 0.35],
                        }
                  }
                  transition={{
                    duration: 1.05,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item * 0.16,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteLoader;
