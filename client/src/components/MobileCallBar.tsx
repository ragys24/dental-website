/* ============================================================
   UPLIFT DENTAL — Sticky Mobile Call/Text Bar
   Persistent bottom bar visible only on mobile (md:hidden)
   Refined design: frosted glass effect, softer visual weight
   ============================================================ */
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { PRACTICE } from "@/lib/constants";
import { SMS } from "@/lib/sms";
import { trackInvisalignText, trackSchedule } from "@/lib/tracking";
import { Link, useLocation } from "wouter";

export default function MobileCallBar() {
  const [location] = useLocation();
  const isInvisalign = location === "/invisalign";

  if (isInvisalign) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-lg" style={{ background: "oklch(0.22 0.06 192 / 0.94)", boxShadow: "0 -1px 12px oklch(0 0 0 / 0.15)" }}>
        <div className="flex h-16 items-stretch gap-2 px-3 py-2">
          <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex flex-1 items-center justify-center gap-2 rounded-full font-body text-xs font-extrabold text-white transition-all active:scale-95" style={{ backgroundColor: "oklch(0.42 0.09 192)" }} aria-label="Call for a free Invisalign consultation">
            <Phone className="h-4 w-4 shrink-0" /> Call Invisalign
          </a>
          <a href={SMS.invisalign} onClick={trackInvisalignText} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 font-body text-xs font-extrabold text-white transition-all active:scale-95" aria-label="Text Uplift Dental about Invisalign">
            <MessageSquare className="h-4 w-4 shrink-0" /> Text Invisalign
          </a>
        </div>
        <div className="h-safe-area-inset-bottom bg-inherit" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-lg"
      style={{
        background: "oklch(0.22 0.06 192 / 0.92)",
        boxShadow: "0 -1px 12px oklch(0 0 0 / 0.15)",
      }}
    >
      <div className="flex items-stretch h-14 px-2 gap-1.5 py-2">
        {/* Call button */}
        <a
          href={PRACTICE.phone.tel} onClick={trackSchedule}
          className="flex flex-1 items-center justify-center gap-1.5 font-body font-semibold text-xs text-white rounded-full transition-all active:scale-95"
          style={{ backgroundColor: "oklch(0.42 0.09 192)" }}
          aria-label="Call Uplift Dental"
        >
          <Phone className="w-3.5 h-3.5 shrink-0" />
          Call Now
        </a>

        {/* Book button */}
        <Link
          href="/contact" onClick={trackSchedule}
          className="flex flex-1 items-center justify-center gap-1.5 font-body font-semibold text-xs text-white rounded-full transition-all active:scale-95"
          style={{ backgroundColor: "oklch(0.32 0.08 192)" }}
          aria-label="Book appointment"
        >
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          Book Free
        </Link>

        {/* Text button */}
        <a
          href={SMS.general} onClick={trackSchedule}
          className="flex flex-1 items-center justify-center gap-1.5 font-body font-semibold text-xs text-white rounded-full border border-white/25 transition-all active:scale-95 hover:bg-white/10"
          aria-label="Text Uplift Dental"
        >
          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
          Text Us
        </a>
      </div>

      {/* Safe area padding for phones with home indicator */}
      <div className="h-safe-area-inset-bottom bg-inherit" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
    </div>
  );
}
