import { Link } from "@tanstack/react-router";
import { Heart, Linkedin } from "lucide-react";
import type React from "react";
import { SiInstagram, SiYoutube } from "react-icons/si";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "estoqi",
  );

  return (
    <footer className="bg-estoqi-dark text-white/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/assets/generated/logo-estoqi.dim_400x120.png"
              alt="ESTOQI"
              className="h-8 w-auto brightness-0 invert mb-6"
            />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Dual-Stream Food & Water Intelligence System. 11.5 pH for produce
              cleansing. 9.5 pH for pure hydration.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/estoqi"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiInstagram size={18} />
              </a>
              <a
                href="https://youtube.com/@estoqi"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiYoutube size={18} />
              </a>
              <a
                href="https://linkedin.com/company/estoqi"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 1 - Explore */}
          <div>
            <p className="label-caps text-white/30 mb-5">Explore</p>
            <ul className="space-y-3">
              {[
                { label: "System", path: "/the-system" },
                { label: "Science", path: "/science" },
                { label: "ESTOQI Labs", path: "/estoqi-labs" },
                { label: "Solutions", path: "/for-homes" },
                { label: "Journal", path: "/journal" },
                { label: "Collectives", path: "/collective" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Company */}
          <div>
            <p className="label-caps text-white/30 mb-5">Company</p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  About ESTOQI
                </Link>
              </li>
              <li>
                <Link
                  to="/featured-in"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  Featured In
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  to="/book-consultation"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <p className="label-caps text-white/30 mb-5">Legal</p>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms", href: "/terms" },
                { label: "Disclaimer", href: "/disclaimer" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {year} ESTOQI. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1.5">
            Built with{" "}
            <Heart size={12} className="text-estoqi-green fill-estoqi-green" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
