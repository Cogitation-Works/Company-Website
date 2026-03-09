import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;
    const handleScroll = () => {
      setVisible(root.scrollTop > 400);
    };
    root.addEventListener("scroll", handleScroll, { passive: true });
    return () => root.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const root = document.getElementById("root");
    if (root) {
      root.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-blue-500 text-white shadow-lg cursor-pointer transition-all duration-300 hover:bg-blue-600 hover:scale-110 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

export default ScrollToTopButton;
