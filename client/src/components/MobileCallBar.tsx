/* ============================================================
   UPLIFT DENTAL — Sticky Mobile Call/Text Bar
   Persistent bottom bar visible only on mobile (md:hidden)
   Shows Call and Text buttons at all times for max conversion
   ============================================================ */
import { Phone, MessageSquare } from "lucide-react";
import { PRACTICE } from "@/lib/constants";
import { SMS } from "@/lib/sms";

export default function MobileCallBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "oklch(0.18 0.04 185)",
        boxShadow: "0 -2px 20px oklch(0 0 0 / 0.25)",
      }}
    >
      <div className="flex items-stretch h-14">
        {/* Call button */}
        <a
          href={PRACTICE.phone.tel}
          className="flex flex-1 items-center justify-center gap-2.5 font-body font-bold text-sm text-white transition-opacity active:opacity-80"
          style={{ backgroundColor: "oklch(0.42 0.09 192)" }}
          aria-label="Call Uplift Dental"
        >
          <Phone className="w-4 h-4 shrink-0" />
          Call {PRACTICE.phone.display}
        </a>

        {/* Divider */}
        <div className="w-px bg-white/20" />

        {/* Text button */}
        <a
          href={SMS.general}
          className="flex flex-1 items-center justify-center gap-2.5 font-body font-bold text-sm text-white transition-opacity active:opacity-80"
          style={{ backgroundColor: "oklch(0.32 0.09 192)" }}
          aria-label="Text Uplift Dental"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          Text {PRACTICE.sms.display}
        </a>
      </div>

      {/* Safe area padding for phones with home indicator */}
      <div className="h-safe-area-inset-bottom bg-inherit" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
    </div>
  );
}
