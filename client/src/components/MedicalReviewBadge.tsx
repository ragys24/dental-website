/* ============================================================
   UPLIFT DENTAL — Medical Review Badge
   E-E-A-T trust signal: "Medically reviewed by Dr. Stefan"
   Used on all service/specialty pages for YMYL compliance
   ============================================================ */
import { ShieldCheck } from "lucide-react";

interface MedicalReviewBadgeProps {
  reviewDate?: string; // e.g. "March 2026"
  reviewerName?: string;
  reviewerTitle?: string;
}

export default function MedicalReviewBadge({
  reviewDate = "March 2026",
  reviewerName = "Dr. Ragy Stefan, DDS",
  reviewerTitle = "General & Cosmetic Dentist, Uplift Dental & Orthodontics",
}: MedicalReviewBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-body"
      style={{
        backgroundColor: "oklch(0.97 0.01 192)",
        borderColor: "oklch(0.88 0.04 192)",
      }}
    >
      <ShieldCheck
        className="w-4 h-4 shrink-0"
        style={{ color: "oklch(0.42 0.09 192)" }}
      />
      <div>
        <span className="font-semibold" style={{ color: "oklch(0.28 0.08 192)" }}>
          Medically reviewed by {reviewerName}
        </span>
        <span className="text-xs block" style={{ color: "oklch(0.52 0.04 205)" }}>
          {reviewerTitle} · Content reviewed {reviewDate}
        </span>
      </div>
    </div>
  );
}
