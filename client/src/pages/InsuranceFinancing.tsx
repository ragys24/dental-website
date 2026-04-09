/* ============================================================
   UPLIFT DENTAL — Insurance & Financing Page
   Design: Clean, trust-building layout. Insurance grid + financing cards.
   Brand: Teal dark/light palette, display + body fonts.
   ============================================================= */
import { CheckCircle, Phone, MessageSquare, CreditCard, Shield, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";

const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/PATTERN-02_5ffa36bf.jpg";

// ── All accepted insurance plans ─────────────────────────────────────────────
const insurancePlans = [
  {
    category: "Government Programs",
    plans: [
      { name: "Denti-Cal (Medi-Cal Dental)", note: "Accepted for adults & children" },
      { name: "Military / TRICARE", note: "Active duty, veterans & dependents" },
    ],
  },
  {
    category: "PPO Plans",
    plans: [
      { name: "Delta Dental PPO", note: "" },
      { name: "MetLife Dental", note: "" },
      { name: "Cigna Dental", note: "" },
      { name: "Aetna Dental", note: "" },
      { name: "Anthem Blue Cross Dental", note: "" },
      { name: "Ameritas Dental", note: "" },
      { name: "United Healthcare Dental", note: "" },
      { name: "United Concordia Dental", note: "" },
      { name: "Guardian Dental", note: "" },
      { name: "Humana Dental", note: "" },
      { name: "Sun Life Dental", note: "" },
      { name: "Principal Financial Dental", note: "" },
      { name: "Most PPO Plans", note: "Call to verify your specific plan" },
    ],
  },
  {
    category: "HMO / Managed Care",
    plans: [
      { name: "DeltaCare USA (HMO)", note: "" },
      { name: "Cigna DHMO", note: "" },
      { name: "MetLife PDP Plus", note: "" },
    ],
  },
];

// ── Financing options ─────────────────────────────────────────────────────────
const financingOptions = [
  {
    name: "Cherry Financing",
    logo: null,
    tagline: "Get the care you need today — pay over time.",
    features: [
      "0% APR promotional financing available",
      "Approvals in as little as 30 seconds",
      "No hard credit pull to check your rate",
      "Flexible payment plans from 3–24 months",
      "Available for treatments of any size",
    ],
    cta: "Apply for Cherry",
    ctaUrl: "https://withcherry.com",
    color: "oklch(0.92 0.04 25)",
    borderColor: "oklch(0.80 0.08 25)",
    accentColor: "oklch(0.52 0.18 25)",
  },
  {
    name: "CareCredit",
    logo: null,
    tagline: "Healthcare financing that works for your budget.",
    features: [
      "Deferred interest financing options",
      "Accepted at 260,000+ healthcare providers",
      "Use for multiple family members",
      "Revolving credit — reuse as needed",
      "Covers treatments not covered by insurance",
    ],
    cta: "Apply for CareCredit",
    ctaUrl: "https://www.carecredit.com",
    color: "oklch(0.92 0.04 240)",
    borderColor: "oklch(0.80 0.06 240)",
    accentColor: "oklch(0.45 0.18 240)",
  },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How do I know if my insurance is accepted?",
    a: "The easiest way is to call our office at {PRACTICE.phone.display} or text us at {PRACTICE.sms.display}. We'll verify your benefits in minutes. You can also provide your insurance card at your first visit and we'll handle the verification for you.",
  },
  {
    q: "Do you accept Denti-Cal for adults?",
    a: "Yes! We proudly accept Denti-Cal (Medi-Cal Dental) for both adults and children. We believe quality dental care should be accessible to everyone, regardless of insurance type.",
  },
  {
    q: "What if I don't have dental insurance?",
    a: "No insurance? No problem. We offer Cherry and CareCredit financing with flexible monthly payment plans. We also offer free consultations for new patients so you can understand your treatment options and costs before committing.",
  },
  {
    q: "Can I use Cherry or CareCredit for any treatment?",
    a: "Yes — both Cherry and CareCredit can be used for any dental treatment at our office, including cosmetic procedures like veneers and Invisalign that are typically not covered by insurance.",
  },
  {
    q: "Do you offer in-house payment plans?",
    a: "We work with Cherry and CareCredit to provide flexible financing. For specific payment arrangement questions, please call our office and we'll work with you to find a solution that fits your budget.",
  },
  {
    q: "Will you bill my insurance directly?",
    a: "Yes. We are in-network with many PPO plans and will file claims directly with your insurance company. For out-of-network plans, we'll provide you with all the documentation needed to submit your own claim for reimbursement.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-xl overflow-hidden transition-all"
      style={{ borderColor: open ? COLORS.tealMid : "oklch(0.88 0.02 192)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
        style={{ backgroundColor: open ? COLORS.tealPale : "white" }}
      >
        <span className="font-body font-semibold text-gray-800 text-sm md:text-base">{q}</span>
        <ChevronDown
          className="w-5 h-5 shrink-0 transition-transform"
          style={{ color: COLORS.teal, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1" style={{ backgroundColor: COLORS.tealPale }}>
          <p className="font-body text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function InsuranceFinancing() {
  return (
    <>
      <PageSEO
        title="Insurance & Financing | Uplift Dental & Orthodontics Garden Grove CA"
        description={`Uplift Dental accepts Denti-Cal, Delta Dental, MetLife, Cigna, Aetna, Anthem, Ameritas, TRICARE, and most PPO plans. Cherry and CareCredit financing available. ${PRACTICE.address.city}, ${PRACTICE.address.state} ${PRACTICE.address.zip}.`}
        canonical="https://upliftdental.com/insurance-financing"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com/" },
        { name: "Insurance & Financing", url: "https://upliftdental.com/insurance-financing" },
      ]} />

      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />

        {/* Hero */}
        <section className="py-20 relative overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "500px auto" }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.73 0.07 200)" }}>
              Accessible Care for Everyone
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-5">
              Insurance &amp; Financing
            </h1>
            <p className="font-body text-white/75 text-xl max-w-2xl mx-auto">
              We accept most major insurance plans — including Denti-Cal — and offer flexible financing so cost is never a barrier to a healthy smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href={PRACTICE.phone.tel}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-body font-bold text-sm text-white transition-all hover:opacity-90 shadow-lg"
                style={{ backgroundColor: COLORS.tealMid }}
              >
                <Phone className="w-4 h-4" />
                Verify My Insurance — {PRACTICE.phone.display}
              </a>
              <a
                href={SMS.general}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-body font-bold text-sm border-2 border-white/40 text-white transition-all hover:border-white"
              >
                <MessageSquare className="w-4 h-4" />
                Text Us to Verify
              </a>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <div className="py-4 border-b" style={{ backgroundColor: COLORS.tealPale, borderColor: "oklch(0.90 0.02 192)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-center">
              {[
                "Denti-Cal Accepted",
                "Military / TRICARE Welcome",
                "Most PPO Plans In-Network",
                "0% APR Financing Available",
                "Free Consultations for New Patients",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: COLORS.teal }} />
                  <span className="font-body text-sm font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insurance Plans Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-sm font-body font-semibold" style={{ backgroundColor: COLORS.tealPale, color: COLORS.teal }}>
                <Shield className="w-4 h-4" />
                Insurance Plans We Accept
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: COLORS.tealDark }}>
                We Work With Your Insurance
              </h2>
              <p className="font-body text-gray-500 text-lg max-w-2xl mx-auto">
                We are in-network with most major PPO plans and accept Denti-Cal for adults and children. Not sure if we take yours? Call us — we'll verify in minutes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {insurancePlans.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "oklch(0.88 0.02 192)", backgroundColor: COLORS.tealPale }}
                >
                  <h3 className="font-display text-lg font-bold mb-5" style={{ color: COLORS.tealDark }}>
                    {group.category}
                  </h3>
                  <div className="space-y-3">
                    {group.plans.map((plan) => (
                      <div key={plan.name} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: COLORS.teal }} />
                        <div>
                          <p className="font-body text-sm font-semibold text-gray-800">{plan.name}</p>
                          {plan.note && (
                            <p className="font-body text-xs text-gray-500 mt-0.5">{plan.note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center font-body text-sm text-gray-500 mt-8">
              Don't see your plan listed?{" "}
              <a href={PRACTICE.phone.tel} className="font-semibold underline" style={{ color: COLORS.teal }}>
                Call {PRACTICE.phone.display}
              </a>{" "}
              — we likely accept it. Our list is always expanding.
            </p>
          </div>
        </section>

        {/* Financing Section */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealPale }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-sm font-body font-semibold" style={{ backgroundColor: "white", color: COLORS.teal }}>
                <CreditCard className="w-4 h-4" />
                Flexible Financing Options
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: COLORS.tealDark }}>
                No Insurance? No Problem.
              </h2>
              <p className="font-body text-gray-500 text-lg max-w-2xl mx-auto">
                We partner with Cherry and CareCredit to offer flexible monthly payment plans — so you can get the care you need without waiting.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {financingOptions.map((option) => (
                <div
                  key={option.name}
                  className="rounded-3xl border-2 bg-white p-8 flex flex-col shadow-sm"
                  style={{ borderColor: option.borderColor }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: option.color }}
                  >
                    <CreditCard className="w-6 h-6" style={{ color: option.accentColor }} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-1" style={{ color: COLORS.tealDark }}>
                    {option.name}
                  </h3>
                  <p className="font-body text-gray-500 text-sm mb-6">{option.tagline}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {option.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: option.accentColor }} />
                        <span className="font-body text-sm text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={option.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl font-body font-bold text-sm text-center transition-all hover:opacity-90 hover:shadow-md"
                    style={{ backgroundColor: option.accentColor, color: "white" }}
                  >
                    {option.cta} →
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-10 max-w-4xl mx-auto rounded-2xl border bg-white p-6 flex flex-col sm:flex-row items-center gap-5" style={{ borderColor: "oklch(0.88 0.02 192)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: COLORS.tealPale }}>
                <HelpCircle className="w-6 h-6" style={{ color: COLORS.teal }} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-body font-semibold text-gray-800">Not sure which financing option is right for you?</p>
                <p className="font-body text-sm text-gray-500 mt-1">Our team can walk you through both options and help you choose the best fit for your treatment and budget.</p>
              </div>
              <a
                href={PRACTICE.phone.tel}
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-bold text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: COLORS.teal }}
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold mb-4" style={{ color: COLORS.tealDark }}>
                Frequently Asked Questions
              </h2>
              <p className="font-body text-gray-500">
                Everything you need to know about insurance and payment at Uplift Dental.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 relative overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "500px auto" }} />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="font-body text-white/75 text-lg mb-8 max-w-xl mx-auto">
              Free consultations for new patients. We'll verify your insurance before your visit so there are no surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-sm text-white transition-all hover:opacity-90 shadow-lg"
                style={{ backgroundColor: COLORS.tealMid }}
              >
                Book Free Consultation
              </a>
              <a
                href={PRACTICE.phone.tel}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-sm border-2 border-white/40 text-white transition-all hover:border-white"
              >
                <Phone className="w-4 h-4" />
                {PRACTICE.phone.display}
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
