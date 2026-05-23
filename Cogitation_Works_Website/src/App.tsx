import "./App.css";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Header from "./components/header/Header";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Products from "./components/pages/Products";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import TawkChatWidget from "./components/TawkChatWidget";
import RouteLoader from "./components/RouteLoader";

const INITIAL_LOADER_DURATION_MS = 760;
const ROUTE_LOADER_DURATION_MS = 520;

const AppShell = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [isRouteLoading, setIsRouteLoading] = useState(true);
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      setIsRouteLoading(false);
    }, prefersReducedMotion ? 120 : INITIAL_LOADER_DURATION_MS);

    return () => window.clearTimeout(initialTimer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (previousPathRef.current === location.pathname) {
      return;
    }

    previousPathRef.current = location.pathname;
    const startTimer = window.setTimeout(() => {
      setIsRouteLoading(true);
    }, 0);

    const timer = window.setTimeout(() => {
      setIsRouteLoading(false);
    }, prefersReducedMotion ? 120 : ROUTE_LOADER_DURATION_MS);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(timer);
    };
  }, [location.pathname, prefersReducedMotion]);

  return (
    <>
      <ScrollToTop />
      <RouteLoader
        isVisible={isRouteLoading}
        routeKey={location.pathname || "/"}
      />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="route-content-shell"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -14 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <TawkChatWidget />
      <ScrollToTopButton />
    </>
  );
};

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
