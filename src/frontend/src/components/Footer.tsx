import { Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import type React from "react";
import { SiInstagram, SiYoutube } from "react-icons/si";
import Logo from "./Logo";

/* =====================================================================
   ESTOQI · Footer (compressed)
   Single dark navy band · accreditation strip → wordmark + brief + links
   → copyright baseline. No GardenBand, no newsletter, no wordmark
   banner. Per Feb 2026 brand brief.
   ===================================================================== */

const Footer: React.FC = () => {
  return (
    <footer className="text-bone" style={{ backgroundColor: "var(--forest)" }}>
      {/* ── Main footer block ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-y-10 gap-x-10">
          {/* Brand block */}
          <div>
            <Logo tone="bone" markHeight={48} />
            <p className="text-bone/70 text-[14px] leading-[1.6] max-w-[40ch] mt-4">
              Dual-stream ionization for the household kitchen and the
              commercial line. Engineered in India, third-party tested,
              independently accredited.
            </p>
            <div className="flex gap-5 mt-6 text-bone/55">
              <a
                href="https://instagram.com/estoqi"
                className="hover:text-bone transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiInstagram size={18} />
              </a>
              <a
                href="https://youtube.com/@estoqi"
                className="hover:text-bone transition-colors"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiYoutube size={18} />
              </a>
              <a
                href="https://linkedin.com/company/estoqi"
                className="hover:text-bone transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <FooterColumn
            label="The science"
            items={[
              { label: "Science", to: "/science" },
              { label: "The System", to: "/the-system" },
              { label: "Estoqi Labs", to: "/estoqi-labs" },
              { label: "Journal", to: "/journal" },
              { label: "Collective", to: "/collective" },
            ]}
          />
          <FooterColumn
            label="Buy"
            items={[
              { label: "For Homes", to: "/for-homes" },
              { label: "For Businesses", to: "/for-food-businesses" },
              { label: "Book a Demo", to: "/book-consultation" },
              { label: "Featured In", to: "/featured-in" },
            ]}
          />
          <FooterColumn
            label="Company"
            items={[
              { label: "About", to: "/about" },
              { label: "Press", to: "/featured-in" },
              { label: "Contact", to: "/book-consultation" },
              { label: "Privacy", to: "/" },
            ]}
          />
        </div>

        {/* baseline */}
        <div
          className="border-t mt-10 pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
          style={{ borderColor: "var(--forest-line)" }}
        >
          <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-bone/45">
            2026 &mdash; Estoqi Tech Pvt Ltd.
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-bone/45">
            Designed and made in India
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterColumnProps {
  label: string;
  items: { label: string; to: string }[];
}
const FooterColumn: React.FC<FooterColumnProps> = ({ label, items }) => (
  <div>
    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-bone/45 mb-4">
      {label}
    </p>
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.label + item.to}>
          <Link
            to={item.to}
            className="font-body text-[13.5px] text-bone/80 hover:text-bone transition-colors"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
