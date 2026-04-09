/* ============================================================
   UPLIFT DENTAL — Announcement Banner
   Persistent top strip on every page: "Text Us Now or Book Online"
   Responsive: single-line on all viewports
   Mobile: icon buttons only | Tablet+: full text labels
   Brand: Deep teal oklch(0.42 0.09 192)
   ============================================================ */
import { useState } from "react";
import { Link } from "wouter";
import { MessageSquare, Calendar, X } from "lucide-react";
import { SMS } from "@/lib/sms";

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="relative w-full z-[60] sticky top-0"
      style={{ backgroundColor: "oklch(0.42 0.09 192)" }}
    >
      <div className="max-w-7xl mx-auto px-10 py-2 flex items-center justify-center gap-2 sm:gap-4">

        {/* Label — hidden on xs, visible sm+ */}
        <span className="hidden sm:inline font-body text-white text-sm font-medium whitespace-nowrap">
          For faster service —
        </span>

        {/* Mobile-only label (shorter) */}
        <span className="sm:hidden font-body text-white text-xs font-medium whitespace-nowrap">
          Faster service:
        </span>

        {/* Text Us CTA */}
        <a
          href={SMS.general}
          className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white font-body font-semibold px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200 border border-white/30 whitespace-nowrap text-xs sm:text-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden xs:inline sm:inline">Text Us</span>
          <span className="xs:hidden sm:hidden">Text</span>
        </a>

        {/* Separator */}
        <span className="text-white/50 text-xs sm:text-sm">or</span>

        {/* Book Online CTA */}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 bg-white font-body font-semibold px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-white/90 whitespace-nowrap text-xs sm:text-sm"
          style={{ color: "oklch(0.28 0.08 192)" }}
        >
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Book Online</span>
        </Link>
      </div>

      {/* Dismiss button — always visible, positioned right */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
