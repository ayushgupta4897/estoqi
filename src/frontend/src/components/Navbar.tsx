import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const solutionsRef = useRef<HTMLDivElement>(null);
  const solutionsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = location.pathname;

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname change triggers route-change cleanup
  useEffect(() => {
    setMobileOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  // Close solutions dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        solutionsRef.current &&
        !solutionsRef.current.contains(e.target as Node)
      ) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      e.preventDefault();
      navigate({ to: "/" });
    }
  };

  const handleSolutionsMouseEnter = () => {
    if (solutionsTimerRef.current) clearTimeout(solutionsTimerRef.current);
    setSolutionsOpen(true);
  };

  const handleSolutionsMouseLeave = () => {
    solutionsTimerRef.current = setTimeout(() => setSolutionsOpen(false), 180);
  };

  const isTransparent = !scrolled && isHome;

  const navLinkBase =
    "relative text-[11px] font-medium tracking-[0.12em] uppercase transition-all duration-250 group";

  const navLinkClass = (path: string) => {
    const isActive = pathname === path;
    if (isTransparent) {
      return `${navLinkBase} ${isActive ? "text-white" : "text-white/70 hover:text-white"}`;
    }
    return `${navLinkBase} ${isActive ? "text-estoqi-green" : "text-foreground/55 hover:text-estoqi-green"}`;
  };

  const isSolutionsActive =
    pathname === "/for-homes" || pathname === "/for-food-businesses";

  const solutionsTriggerClass = `${navLinkBase} flex items-center gap-1 cursor-pointer ${
    isTransparent
      ? isSolutionsActive
        ? "text-white"
        : "text-white/70 hover:text-white"
      : isSolutionsActive
        ? "text-estoqi-green"
        : "text-foreground/55 hover:text-estoqi-green"
  }`;

  return (
    <>
      {/* Single-Row Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isTransparent ? "bg-transparent" : "navbar-solid"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 ease-in-out ${
            scrolled ? "px-6 lg:px-10 py-3" : "px-6 lg:px-10 py-4 lg:py-5"
          }`}
        >
          {/* Logo - Left */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center shrink-0 focus:outline-none"
            aria-label="ESTOQI - Go to homepage"
          >
            <img
              src="/assets/generated/logo-estoqi.dim_400x120.png"
              alt="ESTOQI"
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-6" : "h-7"
              } ${isTransparent ? "brightness-0 invert" : "brightness-0"}`}
            />
          </a>

          {/* Desktop Nav - Right */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {/* Home */}
            <Link to="/" className={navLinkClass("/")}>
              Home
              <span
                className={`absolute -bottom-0.5 left-0 right-0 h-px transition-all duration-250 origin-left ${
                  pathname === "/"
                    ? isTransparent
                      ? "bg-white/60 scale-x-100"
                      : "bg-estoqi-green scale-x-100"
                    : `scale-x-0 group-hover:scale-x-100 ${isTransparent ? "bg-white/40" : "bg-estoqi-green/40"}`
                }`}
              />
            </Link>
            {/* Science */}
            <Link to="/science" className={navLinkClass("/science")}>
              Science
              <span
                className={`absolute -bottom-0.5 left-0 right-0 h-px transition-all duration-250 origin-left ${
                  pathname === "/science"
                    ? isTransparent
                      ? "bg-white/60 scale-x-100"
                      : "bg-estoqi-green scale-x-100"
                    : `scale-x-0 group-hover:scale-x-100 ${isTransparent ? "bg-white/40" : "bg-estoqi-green/40"}`
                }`}
              />
            </Link>
            {/* System */}
            <Link to="/the-system" className={navLinkClass("/the-system")}>
              System
              <span
                className={`absolute -bottom-0.5 left-0 right-0 h-px transition-all duration-250 origin-left ${
                  pathname === "/the-system"
                    ? isTransparent
                      ? "bg-white/60 scale-x-100"
                      : "bg-estoqi-green scale-x-100"
                    : `scale-x-0 group-hover:scale-x-100 ${isTransparent ? "bg-white/40" : "bg-estoqi-green/40"}`
                }`}
              />
            </Link>
            {/* ESTOQI Labs */}
            <Link to="/estoqi-labs" className={navLinkClass("/estoqi-labs")}>
              ESTOQI Labs
              <span
                className={`absolute -bottom-0.5 left-0 right-0 h-px transition-all duration-250 origin-left ${
                  pathname === "/estoqi-labs"
                    ? isTransparent
                      ? "bg-white/60 scale-x-100"
                      : "bg-estoqi-green scale-x-100"
                    : `scale-x-0 group-hover:scale-x-100 ${isTransparent ? "bg-white/40" : "bg-estoqi-green/40"}`
                }`}
              />
            </Link>
            {/* Solutions Dropdown */}
            <div
              ref={solutionsRef}
              className="relative"
              onMouseEnter={handleSolutionsMouseEnter}
              onMouseLeave={handleSolutionsMouseLeave}
            >
              <button
                type="button"
                className={solutionsTriggerClass}
                onClick={() => setSolutionsOpen((v) => !v)}
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
              >
                Solutions
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${solutionsOpen ? "rotate-180" : ""}`}
                />
                <span
                  className={`absolute -bottom-0.5 left-0 right-0 h-px transition-all duration-250 origin-left ${
                    isSolutionsActive
                      ? isTransparent
                        ? "bg-white/60 scale-x-100"
                        : "bg-estoqi-green scale-x-100"
                      : `scale-x-0 group-hover:scale-x-100 ${isTransparent ? "bg-white/40" : "bg-estoqi-green/40"}`
                  }`}
                />
              </button>

              {/* Dropdown Panel */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 transition-all duration-250 origin-top ${
                  solutionsOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-estoqi-off-white/97 backdrop-blur-xl border border-estoqi-dark/8 rounded-sm shadow-[0_8px_32px_rgba(15,30,100,0.10)] overflow-hidden">
                  <Link
                    to="/for-homes"
                    className={`block px-5 py-3.5 text-[11px] font-medium tracking-[0.10em] uppercase transition-all duration-200 ${
                      pathname === "/for-homes"
                        ? "text-estoqi-green bg-estoqi-green/5"
                        : "text-foreground/55 hover:text-estoqi-green hover:bg-estoqi-green/5"
                    }`}
                    onClick={() => setSolutionsOpen(false)}
                  >
                    For Homes
                  </Link>
                  <div className="h-px bg-estoqi-dark/6 mx-4" />
                  <Link
                    to="/for-food-businesses"
                    className={`block px-5 py-3.5 text-[11px] font-medium tracking-[0.10em] uppercase transition-all duration-200 ${
                      pathname === "/for-food-businesses"
                        ? "text-estoqi-green bg-estoqi-green/5"
                        : "text-foreground/55 hover:text-estoqi-green hover:bg-estoqi-green/5"
                    }`}
                    onClick={() => setSolutionsOpen(false)}
                  >
                    For Commercial Systems
                  </Link>
                </div>
              </div>
            </div>
            {/* Journal */}
            <Link to="/journal" className={navLinkClass("/journal")}>
              Journal
              <span
                className={`absolute -bottom-0.5 left-0 right-0 h-px transition-all duration-250 origin-left ${
                  pathname === "/journal"
                    ? isTransparent
                      ? "bg-white/60 scale-x-100"
                      : "bg-estoqi-green scale-x-100"
                    : `scale-x-0 group-hover:scale-x-100 ${isTransparent ? "bg-white/40" : "bg-estoqi-green/40"}`
                }`}
              />
            </Link>
            <Link to="/collective" className={navLinkClass("/collective")}>
              Collective
              <span
                className={`absolute -bottom-0.5 left-0 right-0 h-px transition-all duration-250 origin-left ${
                  pathname === "/collective"
                    ? isTransparent
                      ? "bg-white/60 scale-x-100"
                      : "bg-estoqi-green scale-x-100"
                    : `scale-x-0 group-hover:scale-x-100 ${isTransparent ? "bg-white/40" : "bg-estoqi-green/40"}`
                }`}
              />
            </Link>
            {/* CTA Button */}
            <Link
              to="/book-consultation"
              className={`ml-2 text-[11px] font-medium tracking-[0.12em] uppercase px-5 py-2.5 rounded-sm transition-all duration-250 hover:scale-[1.03] active:scale-[0.98] ${
                isTransparent
                  ? "border border-white/50 text-white hover:bg-white/10 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                  : "bg-estoqi-green text-white hover:bg-estoqi-green/90 hover:shadow-[0_4px_16px_rgba(15,30,100,0.25)]"
              }`}
            >
              Book a Demo
            </Link>
          </nav>

          {/* Mobile Right Side */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile CTA - visible in header */}
            <Link
              to="/book-consultation"
              className={`text-[10px] font-medium tracking-[0.10em] uppercase px-3.5 py-2 rounded-sm transition-all duration-250 ${
                isTransparent
                  ? "border border-white/50 text-white hover:bg-white/10"
                  : "bg-estoqi-green text-white hover:bg-estoqi-green/90"
              }`}
            >
              Book a Demo
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              className={`p-2 -mr-1 transition-colors rounded-sm ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-foreground hover:bg-estoqi-dark/5"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop dismiss */}
        <div
          className="absolute inset-0 bg-estoqi-dark/35 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-in Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-80 max-w-[88vw] bg-estoqi-off-white shadow-2xl transition-transform duration-400 ease-out flex flex-col ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-estoqi-dark/8">
            <img
              src="/assets/generated/logo-estoqi.dim_400x120.png"
              alt="ESTOQI"
              className="h-6 w-auto brightness-0"
            />
            <button
              type="button"
              className="p-2 -mr-2 text-foreground/40 hover:text-foreground transition-colors rounded-sm"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-0.5">
              <li>
                <Link
                  to="/"
                  className={`block py-3.5 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors border-b border-estoqi-dark/6 ${
                    pathname === "/"
                      ? "text-estoqi-green"
                      : "text-foreground/55 hover:text-estoqi-green"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/science"
                  className={`block py-3.5 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors border-b border-estoqi-dark/6 ${
                    pathname === "/science"
                      ? "text-estoqi-green"
                      : "text-foreground/55 hover:text-estoqi-green"
                  }`}
                >
                  Science
                </Link>
              </li>
              <li>
                <Link
                  to="/the-system"
                  className={`block py-3.5 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors border-b border-estoqi-dark/6 ${
                    pathname === "/the-system"
                      ? "text-estoqi-green"
                      : "text-foreground/55 hover:text-estoqi-green"
                  }`}
                >
                  System
                </Link>
              </li>
              <li>
                <Link
                  to="/estoqi-labs"
                  className={`block py-3.5 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors border-b border-estoqi-dark/6 ${
                    pathname === "/estoqi-labs"
                      ? "text-estoqi-green"
                      : "text-foreground/55 hover:text-estoqi-green"
                  }`}
                >
                  ESTOQI Labs
                </Link>
              </li>

              {/* Solutions Accordion */}
              <li className="border-b border-estoqi-dark/6">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between py-3.5 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors ${
                    isSolutionsActive
                      ? "text-estoqi-green"
                      : "text-foreground/55 hover:text-estoqi-green"
                  }`}
                  onClick={() => setMobileSolutionsOpen((v) => !v)}
                  aria-expanded={mobileSolutionsOpen}
                >
                  Solutions
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-300 ${mobileSolutionsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileSolutionsOpen
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="pl-4 pb-3 space-y-0.5 border-l-2 border-estoqi-green/20 ml-1">
                    <li>
                      <Link
                        to="/for-homes"
                        className={`block py-2.5 text-[11px] font-medium tracking-[0.10em] uppercase transition-colors ${
                          pathname === "/for-homes"
                            ? "text-estoqi-green"
                            : "text-foreground/45 hover:text-estoqi-green"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        For Homes
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/for-food-businesses"
                        className={`block py-2.5 text-[11px] font-medium tracking-[0.10em] uppercase transition-colors ${
                          pathname === "/for-food-businesses"
                            ? "text-estoqi-green"
                            : "text-foreground/45 hover:text-estoqi-green"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        For Commercial Systems
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Link
                  to="/journal"
                  className={`block py-3.5 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors border-b border-estoqi-dark/6 ${
                    pathname === "/journal"
                      ? "text-estoqi-green"
                      : "text-foreground/55 hover:text-estoqi-green"
                  }`}
                >
                  Journal
                </Link>
              </li>
              <li>
                <Link
                  to="/collective"
                  className={`block py-3.5 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors border-b border-estoqi-dark/6 ${
                    pathname === "/collective"
                      ? "text-estoqi-green"
                      : "text-foreground/55 hover:text-estoqi-green"
                  }`}
                >
                  Collectives
                </Link>
              </li>
            </ul>

            {/* Mobile CTA */}
            <div className="mt-8">
              <Link
                to="/book-consultation"
                className="block w-full text-center bg-estoqi-green text-white text-[11px] font-medium tracking-[0.12em] uppercase px-5 py-3.5 rounded-sm hover:bg-estoqi-green/90 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Book a Demo
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
