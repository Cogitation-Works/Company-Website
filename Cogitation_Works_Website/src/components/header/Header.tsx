import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";

const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
];

const Header = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const navigation = useNavigate();
  const location = useLocation();
  const activeLink = location.pathname.split("/")[1]
    ? `/${location.pathname.split("/")[1]}`
    : "/";
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`site-header sticky top-0 z-50 px-6 py-2 ${
        isScrolled ? "is-scrolled" : "bg-white/95"
      }`}
    >
      <nav className="flex items-center">
        <div
          className="site-brand flex cursor-pointer flex-row items-center"
          onClick={() => navigation("/")}
        >
          <img
            src={`${baseUrl}logo/logo.png`}
            alt="Cogitation Works Logo"
            className="brand-mark size-15"
          />
          <div className="text-xl font-extrabold text-black">
            Cogitation <span className="text-blue-500">Works</span>
          </div>
        </div>

        <div className="hidden ms-auto md:flex flex-row">
          {links.map((link) => (
            <button
              type="button"
              key={link.name}
              className={`site-nav-item nav-link ms-4 cursor-pointer p-1 text-lg font-semibold transition-colors duration-200 ${
                link.name === "Home"
                  ? "site-nav-item-delay-1"
                  : link.name === "Services"
                    ? "site-nav-item-delay-2"
                    : link.name === "Products"
                      ? "site-nav-item-delay-3"
                      : "site-nav-item-delay-4"
              } ${
                activeLink === link.path
                  ? "is-active text-blue-500"
                  : "text-black/70 hover:text-blue-500"
              }`}
              onClick={() => {
                navigation(link.path);
                setIsMenuOpen(false);
              }}
            >
              {link.name}
            </button>
          ))}
          <a
            href="https://calendar.app.google/7gB3fnhRjGCBUptQ6"
            target="_blank"
            rel="noopener noreferrer"
            className="site-nav-item site-nav-item-delay-5 button-glow ms-4 inline-block rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-600"
          >
            Get Started
          </a>
        </div>

        <div className="site-nav-item site-nav-item-delay-4 ms-auto md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-md border-2 border-transparent p-1 focus:border-black/90 focus:outline-none"
            aria-label="Toggle menu"
          >
            <HiMenuAlt1 className="text-3xl text-black" />
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-400 ease-in md:hidden ${
          isMenuOpen
            ? "max-h-64 translate-y-0 opacity-100"
            : "max-h-0 -translate-y-1 opacity-0"
        }`}
      >
        <div className="pt-2 text-center flex flex-col items-center">
          {links.map((link) => (
            <button
              type="button"
              key={link.name}
              className={`nav-link ms-4 cursor-pointer p-1 text-lg font-semibold transition-colors duration-200 ${
                activeLink === link.path
                  ? "is-active text-blue-500"
                  : "text-black/70 hover:text-blue-500"
              }`}
              onClick={() => {
                navigation(link.path);
                setIsMenuOpen(false);
              }}
            >
              {link.name}
            </button>
          ))}
          <a
            href="https://calendar.app.google/7gB3fnhRjGCBUptQ6"
            target="_blank"
            rel="noopener noreferrer"
            className="button-glow ms-4 mt-1 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-600"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
