import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import type React from "react";
import ReportLayout from "../reports/ReportLayout";
import { REPORTS, type ReportSlug } from "../reports/data";
import { REPORT_BODIES } from "../reports/bodies";

/* =====================================================================
   ESTOQI · LabReport page
   Standalone HTML report at /labs/reports/:slug. Renders the
   ReportLayout shell with the matching body variant for the slug.
   Reachable from:
   - Email gate "View now" CTA after submit
   - QR code in the report footer (for sharing)
   - Direct link from the journal or back-office
   ===================================================================== */

const LabReport: React.FC = () => {
  const params = useParams({ strict: false }) as { slug?: string };
  const slug = params.slug as ReportSlug | undefined;
  const entry = slug ? REPORTS[slug] : undefined;
  const Body = slug ? REPORT_BODIES[slug] : undefined;

  if (!entry || !Body) {
    return (
      <main className="bg-bone text-ink min-h-[60vh] px-6 lg:px-14 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="label-eyebrow justify-center mx-auto mb-6">Report not found</div>
          <h1 className="h-display-l text-ink mb-6">
            We couldn't find <em>that report.</em>
          </h1>
          <p className="text-graphite text-[16px] leading-[1.6] mb-8">
            The link may have moved or never existed. Browse all available
            lab work below.
          </p>
          <Link to="/estoqi-labs" className="btn-ink">
            <ArrowLeft size={13} /> Back to all reports
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-stone-soft text-ink min-h-screen py-12 lg:py-16 px-4">
      {/* Toolbar */}
      <div className="max-w-[900px] mx-auto flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
        <Link
          to="/estoqi-labs"
          className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-graphite hover:text-ink inline-flex items-center gap-2"
        >
          <ArrowLeft size={13} /> Back to Labs
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => typeof window !== "undefined" && window.print()}
            className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-graphite hover:text-ink inline-flex items-center gap-2 px-3 py-2 border border-stone hover:border-ink bg-bone transition-colors"
          >
            <Download size={13} /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* The actual report sheet */}
      <ReportLayout meta={entry.meta}>
        <Body />
      </ReportLayout>

      <p className="max-w-[900px] mx-auto mt-6 px-1 font-mono text-[10px] tracking-[0.14em] uppercase text-graphite text-center">
        A copy of this report has been emailed to the address you provided.
      </p>
    </main>
  );
};

export default LabReport;
