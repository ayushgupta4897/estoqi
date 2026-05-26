import { useLocation } from "@tanstack/react-router";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      setVisible(false);
      const timer = setTimeout(() => {
        setVisible(true);
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 50);
      return () => clearTimeout(timer);
    }
    setVisible(true);
  }, [location.pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
