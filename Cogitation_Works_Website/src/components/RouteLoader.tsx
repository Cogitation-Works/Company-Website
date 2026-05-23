import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FaCode } from "react-icons/fa6";
import { PiCloudArrowUpBold } from "react-icons/pi";
import { VscCircuitBoard } from "react-icons/vsc";

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/services": "Services",
  "/products": "Products",
  "/about": "About",
};

const loaderNodes = [
  { label: "Apps", icon: <FaCode /> },
  { label: "Cloud", icon: <PiCloudArrowUpBold /> },
  { label: "IoT", icon: <VscCircuitBoard /> },
];

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.32 }}
        >
          <div className="route-loader-mesh" aria-hidden="true" />
          <div className="route-loader-blueprint" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <motion.div
            className="route-loader-stage"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -18, scale: 0.98 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="route-loader-orbit" aria-hidden="true">
              {loaderNodes.map((node, index) => (
                <motion.div
                  key={node.label}
                  className={`route-loader-node route-loader-node-${index + 1}`}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: [0, index % 2 === 0 ? -10 : 10, 0],
                        }
                  }
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.22,
                  }}
                >
                  {node.icon}
                  <span>{node.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="route-loader-brand-core"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      boxShadow: [
                        "0 24px 70px rgba(37,99,235,0.18)",
                        "0 30px 90px rgba(37,99,235,0.32)",
                        "0 24px 70px rgba(37,99,235,0.18)",
                      ],
                    }
              }
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={`${import.meta.env.BASE_URL}logo/logo.png`}
                alt=""
                className="route-loader-logo"
              />
            </motion.div>

            <div className="route-loader-copy-block">
              <div className="route-loader-wordmark">
                <span>Cogitation</span> Works
              </div>
              <div className="route-loader-current">{routeLabel}</div>
            </div>

            <div className="route-loader-progress" aria-hidden="true">
              <motion.span
                animate={prefersReducedMotion ? undefined : { scaleX: [0.1, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteLoader;
