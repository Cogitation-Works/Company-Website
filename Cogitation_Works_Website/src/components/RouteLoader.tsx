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
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.42 }}
        >
          <div className="route-loader-grid-field" aria-hidden="true" />
          <motion.div
            className="route-loader-panel-sweep route-loader-panel-sweep-one"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="route-loader-panel-sweep route-loader-panel-sweep-two"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.72, delay: 0.04, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="route-loader-brand-line">
            <motion.div
              className="route-loader-brand-mark"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -34 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -28 }}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={`${import.meta.env.BASE_URL}logo/logo.png`}
                alt=""
                className="route-loader-logo"
              />
            </motion.div>

            <motion.div
              className="route-loader-copy"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 34 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: 28 }}
              transition={{ duration: 0.58, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="route-loader-kicker">Cogitation Works</div>
              <div className="route-loader-wordmark">Digital product studio</div>
              <div className="route-loader-current">Preparing {routeLabel}</div>
            </motion.div>
          </div>

          <div className="route-loader-path">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="route-loader-status">
            <span>Strategy</span>
            <span>Design</span>
            <span>Engineering</span>
          </div>

          <div className="route-loader-map" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((item) => (
              <motion.span
                key={item}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: [0.2, 1, 0.2],
                        scale: [0.92, 1.12, 0.92],
                      }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: item * 0.16,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteLoader;
