import type React from "react";
import DemoForm from "../components/DemoForm";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";

/* =====================================================================
   ESTOQI · Book a Demo (Feb 2026 brief)
   Single entry that branches into Home or Business form via DemoForm.
   ===================================================================== */

const BookConsultation: React.FC = () => {
  useScrollAnimation();
  return (
    <main className="bg-bone text-ink min-h-[80vh]">
      <section className="pt-24 lg:pt-32 pb-24 lg:pb-32 px-6 lg:px-14">
        <div className="max-w-5xl mx-auto">
          <DemoForm />
        </div>
      </section>
    </main>
  );
};

export default BookConsultation;
