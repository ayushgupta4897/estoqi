import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import Logo from "./Logo";

/* =====================================================================
   ESTOQI · Navbar
   - Transparent over hero on Home (light text), solid bone elsewhere.
   - Official Estoqi logo (mark + wordmark), navy on light / light on dark.
   - Mobile sheet for narrow viewports.
   ===================================================================== */

interface NavLink {
  to: string;
  label: string;
}
const PRIMARY_LINKS: NavLink[] = [
  { to: "/science", label: "Science" },
  { to: "/the-system", label: "The System" },
  { to: "/estoqi-labs", label: "Labs" },
  { to: "/our-journey", label: "Our Journey" },
  { to: "/for-homes", label: "For Homes" },
  { to: "/for-food-businesses", label: "For Businesses" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isHome = pathname === "/";
  const isTransparent = !scrolled && isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({ to: "/" });
    }
  };

  const linkColor = isTransparent
    ? "text-bone/85 hover:text-bone"
    : "text-graphite hover:text-ink";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isTransparent ? "bg-transparent" : "bg-bone border-b border-stone"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-14 flex items-center justify-between h-[68px]">
          <a
            href="/"
            onClick={handleLogoClick}
            className="inline-flex items-center"
            aria-label="Estoqi home"
          >
            <Logo tone={isTransparent ? "bone" : "ink"} markHeight={34} />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {PRIMARY_LINKS.map((l) => {
              const active = pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`font-body text-[11px] font-medium tracking-[0.16em] uppercase transition-colors ${linkColor} ${
                    active ? (isTransparent ? "text-bone" : "text-ink") : ""
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/book-consultation"
              className={isTransparent ? "btn-bone" : "btn-ink"}
            >
              Book a Demo
            </Link>
          </div>

          <button
            type="button"
            className={`lg:hidden p-2 ${isTransparent ? "text-bone" : "text-ink"}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-ink text-bone">
          <div className="flex items-center justify-between h-[68px] px-6 border-b border-graphite">
            <a
              href="/"
              onClick={handleLogoClick}
              className="inline-flex items-center"
              aria-label="Estoqi home"
            >
              <Logo tone="bone" markHeight={34} />
            </a>
            <button
              type="button"
              className="p-2 text-bone"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
          <div className="px-6 py-10 flex flex-col gap-1">
            {PRIMARY_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-display text-[28px] py-3 border-b border-graphite text-bone hover:text-stone transition-colors"
                style={{ fontVariationSettings: "'opsz' 48" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/book-consultation" className="btn-bone mt-8 w-fit">
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
