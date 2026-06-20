import type React from "react";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

const KEY = "estoqi-demo-key";
const ALLOW = "aayush";

/* Soft gate. NOT real auth — this is a marketing demo. The point is to
 *   • keep /dashboard/* off the public-facing index
 *   • make it cleanly shareable via a single link
 *   • let the founder land deep without typing anything
 *
 * Anyone with the link is fine. Anyone wandering in randomly hits a
 * one-line splash and bounces out. */
function isAllowed(): boolean {
  if (typeof window === "undefined") return false;
  const search = new URLSearchParams(window.location.search);
  const param = search.get("demo");
  if (param === ALLOW) {
    window.localStorage.setItem(KEY, param);
    return true;
  }
  return window.localStorage.getItem(KEY) === ALLOW;
}

const Splash: React.FC = () => (
  <main className="min-h-screen bg-bone flex items-center justify-center px-6 text-ink">
    <div className="max-w-[420px] w-full text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-stone-soft mb-6">
        <Lock size={20} strokeWidth={1.5} className="text-graphite" />
      </div>
      <h1 className="h-display-l text-ink mb-4 text-[28px] lg:text-[34px] leading-[1.1]">
        Internal preview.
      </h1>
      <p className="text-graphite text-[15px] leading-[1.55] mb-8">
        The Estoqi observability layer is in private demo. If you're here for a
        walkthrough you'll have a direct link. Otherwise — head back to the
        public site.
      </p>
      <a href="/" className="btn-ink">Take me home</a>
    </div>
  </main>
);

interface DemoGateProps {
  children: React.ReactNode;
}

const DemoGate: React.FC<DemoGateProps> = ({ children }) => {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  useEffect(() => {
    setAllowed(isAllowed());
  }, []);
  if (allowed === null) return null;
  if (!allowed) return <Splash />;
  return <>{children}</>;
};

export default DemoGate;
