/**
 * UPLIFT DENTAL — Booking Intent Confirmation
 *
 * Premium teal/ivory conversion flow: a quiet, accessible acknowledgement
 * before an external CareStack handoff. It never collects health information
 * and emits only a once-per-confirmation, secondary begin_booking signal.
 */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { captureAttribution, withCareStackAttribution } from "@/lib/attribution";
import { trackBeginBooking } from "@/lib/tracking";

const BOOKING_INTENT_EVENT = "uplift:booking-intent";

export function requestBookingIntent(href: string): void {
  window.dispatchEvent(new CustomEvent<string>(BOOKING_INTENT_EVENT, { detail: href }));
}

export default function BookingIntentConfirmation() {
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const handoffLocked = useRef(false);
  const confirmationSequence = useRef(0);

  useEffect(() => {
    const handleIntent = (event: Event) => {
      const href = (event as CustomEvent<string>).detail;
      if (href) {
        handoffLocked.current = false;
        confirmationSequence.current += 1;
        setPendingHref(href);
      }
    };
    window.addEventListener(BOOKING_INTENT_EVENT, handleIntent);
    return () => window.removeEventListener(BOOKING_INTENT_EVENT, handleIntent);
  }, []);

  const continueToCareStack = () => {
    if (!pendingHref || handoffLocked.current) return;
    handoffLocked.current = true;
    captureAttribution();
    const destination = withCareStackAttribution(pendingHref);
    trackBeginBooking(`carestack:${confirmationSequence.current}`);
    window.location.assign(destination);
  };

  return (
    <Dialog open={Boolean(pendingHref)} onOpenChange={(open) => !open && setPendingHref(null)}>
      <DialogContent className="max-w-md border-[#b9d7d5] bg-[#fbfaf5] p-0 text-[#173b3b] sm:rounded-[1.75rem]">
        <DialogHeader className="border-b border-[#d8e7e4] bg-[#eef8f6] px-6 pb-5 pt-6 text-left">
          <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-[#d7f1ed] text-[#0d6965]">
            <CalendarDays className="size-5" aria-hidden="true" />
          </div>
          <DialogTitle className="font-serif text-3xl leading-none text-[#173b3b]">Continue to online booking?</DialogTitle>
          <DialogDescription className="pt-3 text-sm leading-6 text-[#466866]">
            You’ll continue to CareStack’s secure appointment portal. We’ll remember only non-sensitive campaign details to improve appointment availability—not medical, contact, or treatment information.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-3 px-6 py-5 sm:flex-col sm:space-x-0">
          <Button
            type="button"
            data-booking-intent-confirm
            onClick={continueToCareStack}
            disabled={handoffLocked.current}
            className="h-12 w-full rounded-full bg-[#126d68] text-base font-semibold hover:bg-[#0d5b57]"
          >
            Continue to CareStack <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setPendingHref(null)}
            className="h-10 w-full rounded-full text-[#436866] hover:bg-[#eaf3f1] hover:text-[#173b3b]"
          >
            Stay on Uplift Dental
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
