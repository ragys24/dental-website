/* ============================================================
   UPLIFT DENTAL — Hero Quick Start
   Design: clean ivory intake card, intentionally original to Uplift.
   Privacy: broad non-clinical interest + name + one contact method only;
   no free text, symptoms, diagnoses, insurance data, uploads, or emergency form.
   ============================================================ */
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { PRACTICE } from "@/lib/constants";
import { trackLead, trackSchedule, trackVerifiedLead } from "@/lib/tracking";

type Interest = "Orthodontic consultation" | "Cosmetic dentistry" | "General dentistry" | "Emergency care";
type Step = "interest" | "name" | "contact" | "complete";

const INTERESTS: Array<{ value: Exclude<Interest, "Emergency care">; label: string; detail: string; featured?: boolean }> = [
  { value: "Orthodontic consultation", label: "A straighter smile", detail: "Invisalign® & braces", featured: true },
  { value: "Cosmetic dentistry", label: "A refreshed smile", detail: "Cosmetic options" },
  { value: "General dentistry", label: "A routine visit", detail: "New & returning patients" },
];

export default function HeroQuickStart() {
  const [interest, setInterest] = useState<Interest | "">("");
  const [step, setStep] = useState<Step>("interest");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const didTrackVerifiedLead = useRef(false);

  const chooseInterest = (value: Interest) => {
    setInterest(value);
    setError("");
    setStep(value === "Emergency care" ? "interest" : "name");
  };

  const resetToInterest = () => {
    setInterest("");
    setStep("interest");
    setError("");
  };

  const continueToContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name to continue.");
      return;
    }
    setError("");
    setStep("contact");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!interest || interest === "Emergency care") return;
    if (!phone.trim() && !email.trim()) {
      setError("Please enter a mobile number or email address.");
      return;
    }

    setSending(true);
    setError("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "84b33306-8bd2-4e29-bbbc-0da57a4292dc",
          subject: `Quick Start Request — ${interest} | Uplift Dental`,
          from_name: name,
          name,
          phone: phone.trim() || "Not provided",
          email: email.trim() || "Not provided",
          service: interest,
          time: new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Submission failed");

      // These lead events remain success-only: they run after Web3Forms confirms
      // receipt, never when an interest is selected or a step is viewed.
      trackLead();
      if (!didTrackVerifiedLead.current) {
        didTrackVerifiedLead.current = true;
        trackVerifiedLead("hero_quick_start");
      }
      setStep("complete");
    } catch {
      setError(`Something went wrong. Please call us at ${PRACTICE.phone.display} or try again.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <aside
      className="w-full max-w-md rounded-[1.6rem] border border-white/40 bg-[oklch(0.985_0.008_92_/_0.96)] p-5 text-[oklch(0.18_0.04_185)] shadow-[0_24px_60px_oklch(0.08_0.03_185_/_0.30)] backdrop-blur-md sm:p-6"
      aria-labelledby="quick-start-heading"
    >
      {step === "complete" ? (
        <div className="py-4 text-center" aria-live="polite">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[oklch(0.91_0.045_185)]">
            <CheckCircle2 className="h-6 w-6 text-[oklch(0.35_0.09_185)]" aria-hidden="true" />
          </div>
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-[oklch(0.42_0.09_185)]">Request received</p>
          <h2 id="quick-start-heading" className="mt-2 font-display text-3xl leading-none">Thank you</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-[oklch(0.42_0.04_185)]">Our team will reach out within one business day to continue the conversation.</p>
          <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[oklch(0.35_0.09_185)] px-5 py-3 font-body text-sm font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.35_0.09_185)]">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call for urgent needs
          </a>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-[oklch(0.42_0.09_185)]">A simple place to begin</p>
              <h2 id="quick-start-heading" className="mt-1 font-display text-3xl leading-none">Your next step starts here</h2>
            </div>
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[oklch(0.50_0.10_185)]" aria-hidden="true" />
          </div>

          <div key={`${step}-${interest || "none"}`} className="hero-quick-start-step">
          {step === "interest" && (
            <div className="mt-5">
              <p className="font-body text-sm leading-relaxed text-[oklch(0.42_0.04_185)]">What would you like to explore?</p>
              <div className="mt-3 grid gap-2" role="group" aria-label="Choose a broad visit interest">
                {INTERESTS.map((item) => (
                  <button key={item.value} type="button" onClick={() => chooseInterest(item.value)} className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.35_0.09_185)] ${item.featured ? "border-[oklch(0.57_0.11_185)] bg-[oklch(0.955_0.02_185)] shadow-[0_8px_20px_oklch(0.42_0.09_185_/_0.10)] hover:border-[oklch(0.42_0.09_185)]" : "border-[oklch(0.88_0.018_185)] bg-white hover:border-[oklch(0.48_0.10_185)]"}`}>
                    <span>
                      {item.featured && <span className="mb-1 inline-flex rounded-full bg-[oklch(0.35_0.09_185)] px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-[0.12em] text-white">Invisalign®</span>}
                      <span className="block font-body text-sm font-bold text-[oklch(0.22_0.05_185)]">{item.label}</span>
                      <span className="mt-0.5 block font-body text-xs text-[oklch(0.48_0.04_185)]">{item.detail}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-[oklch(0.48_0.10_185)] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                ))}
                <button type="button" onClick={() => chooseInterest("Emergency care")} className="group flex items-center justify-between rounded-xl border border-[oklch(0.84_0.07_45)] bg-[oklch(0.985_0.025_55)] px-4 py-3 text-left transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-[oklch(0.65_0.16_38)] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.65_0.16_38)]">
                  <span>
                    <span className="block font-body text-sm font-bold text-[oklch(0.34_0.10_38)]">Urgent care today</span>
                    <span className="mt-0.5 block font-body text-xs text-[oklch(0.46_0.08_38)]">Call us about same-day availability</span>
                  </span>
                  <Phone className="h-4 w-4 text-[oklch(0.55_0.15_38)]" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {interest === "Emergency care" && (
            <div className="mt-5 rounded-xl border border-[oklch(0.84_0.07_45)] bg-[oklch(0.985_0.025_55)] p-4" aria-live="polite">
              <p className="font-body text-sm font-bold text-[oklch(0.34_0.10_38)]">For urgent concerns, please call us directly.</p>
              <p className="mt-1 font-body text-xs leading-relaxed text-[oklch(0.46_0.08_38)]">This quick-start form is not used for emergency or clinical details.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.60_0.17_38)] px-4 py-2.5 font-body text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.60_0.17_38)]">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call {PRACTICE.phone.display}
                </a>
                <button type="button" onClick={resetToInterest} className="rounded-full px-3 py-2.5 font-body text-xs font-bold text-[oklch(0.42_0.06_38)] underline underline-offset-2">Choose another option</button>
              </div>
            </div>
          )}

          {step === "name" && interest && (
            <form className="mt-5" onSubmit={continueToContact}>
              <button type="button" onClick={resetToInterest} className="inline-flex items-center gap-1 font-body text-xs font-bold text-[oklch(0.42_0.09_185)] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.35_0.09_185)]">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Change my selection
              </button>
              <p className="mt-3 font-body text-sm leading-relaxed text-[oklch(0.42_0.04_185)]">First, what should we call you?</p>
              {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 font-body text-xs text-red-700">{error}</p>}
              <label className="mt-4 block">
                <span className="mb-1.5 block font-body text-xs font-bold text-[oklch(0.30_0.05_185)]">Your name</span>
                <input required autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); setError(""); }} placeholder="Jane Smith" className="w-full rounded-xl border border-[oklch(0.86_0.02_185)] bg-white px-3.5 py-3 font-body text-sm text-[oklch(0.20_0.04_185)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.42_0.09_185)]" />
              </label>
              <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[oklch(0.35_0.09_185)] px-4 py-3.5 font-body text-sm font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.35_0.09_185)]">
                Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="mt-3 flex gap-2 font-body text-[11px] leading-relaxed text-[oklch(0.48_0.04_185)]">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[oklch(0.42_0.09_185)]" aria-hidden="true" />
                Please do not include symptoms, diagnoses, insurance details, or other health information here.
              </p>
            </form>
          )}

          {step === "contact" && interest && (
            <form className="mt-5" onSubmit={handleSubmit}>
              <button type="button" onClick={() => { setStep("name"); setError(""); }} className="inline-flex items-center gap-1 font-body text-xs font-bold text-[oklch(0.42_0.09_185)] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.35_0.09_185)]">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back
              </button>
              <p className="mt-3 font-body text-sm leading-relaxed text-[oklch(0.42_0.04_185)]">Thanks, {name.trim()}. How should our team reach you about <strong className="text-[oklch(0.25_0.06_185)]">{interest.toLowerCase()}</strong>?</p>
              <p id="contact-method-help" className="mt-1 font-body text-xs leading-relaxed text-[oklch(0.48_0.04_185)]">Enter a mobile number or email address. At least one is required.</p>
              {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 font-body text-xs text-red-700">{error}</p>}
              <div className="mt-4 grid gap-3">
                <label className="block">
                  <span className="mb-1.5 block font-body text-xs font-bold text-[oklch(0.30_0.05_185)]">Mobile number <span className="font-normal">(optional if using email)</span></span>
                  <input type="tel" autoComplete="tel" value={phone} onChange={(event) => { setPhone(event.target.value); setError(""); }} placeholder="(714) 000-0000" aria-describedby="contact-method-help" className="w-full rounded-xl border border-[oklch(0.86_0.02_185)] bg-white px-3.5 py-3 font-body text-sm text-[oklch(0.20_0.04_185)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.42_0.09_185)]" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-body text-xs font-bold text-[oklch(0.30_0.05_185)]">Email address <span className="font-normal">(optional if using mobile)</span></span>
                  <input type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} placeholder="jane@example.com" aria-describedby="contact-method-help" className="w-full rounded-xl border border-[oklch(0.86_0.02_185)] bg-white px-3.5 py-3 font-body text-sm text-[oklch(0.20_0.04_185)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.42_0.09_185)]" />
                </label>
              </div>
              <button type="submit" disabled={sending} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[oklch(0.35_0.09_185)] px-4 py-3.5 font-body text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.35_0.09_185)]">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {sending ? "Sending request…" : "Request a follow-up"}
              </button>
              <p className="mt-3 flex gap-2 font-body text-[11px] leading-relaxed text-[oklch(0.48_0.04_185)]">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[oklch(0.42_0.09_185)]" aria-hidden="true" />
                Please do not include symptoms, diagnoses, insurance details, or other health information here. For urgent needs, call us directly.
              </p>
            </form>
          )}
          </div>
        </>
      )}
    </aside>
  );
}
