/* ============================================================
   UPLIFT DENTAL — Smile Assessment Quiz
   Design: Deep teal #0E6B6B, DM Serif Display + DM Sans
   Interactive 5-question quiz → personalized treatment result
   ============================================================ */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { Link } from "wouter";
import { ChevronRight, ChevronLeft, CheckCircle, Phone, MessageSquare, Star } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";

const TEAL_BG = "oklch(0.97 0.01 192)";

// ── Quiz Questions ─────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    question: "What is your biggest smile concern?",
    options: [
      { label: "Crooked or crowded teeth", value: "alignment", icon: "🦷" },
      { label: "Missing teeth", value: "missing", icon: "🔲" },
      { label: "Stained or discolored teeth", value: "whitening", icon: "✨" },
      { label: "Chipped, cracked, or worn teeth", value: "cosmetic", icon: "💎" },
      { label: "Gum problems or sensitivity", value: "gum", icon: "🩺" },
      { label: "Pain, infection, or emergency", value: "emergency", icon: "🚨" },
    ],
  },
  {
    id: 2,
    question: "How long have you had this concern?",
    options: [
      { label: "Just noticed it recently", value: "recent", icon: "📅" },
      { label: "A few months", value: "months", icon: "🗓️" },
      { label: "Over a year", value: "year", icon: "⏳" },
      { label: "My whole life", value: "lifelong", icon: "👶" },
    ],
  },
  {
    id: 3,
    question: "What matters most to you in treatment?",
    options: [
      { label: "Discreet — I don't want it to show", value: "discreet", icon: "🫣" },
      { label: "Fast results", value: "fast", icon: "⚡" },
      { label: "Long-lasting / permanent fix", value: "permanent", icon: "🏆" },
      { label: "Affordable / insurance-friendly", value: "affordable", icon: "💰" },
    ],
  },
  {
    id: 4,
    question: "Have you seen a dentist in the last 2 years?",
    options: [
      { label: "Yes, I'm up to date", value: "current", icon: "✅" },
      { label: "It's been a while (2–5 years)", value: "overdue", icon: "🕐" },
      { label: "No, it's been over 5 years", value: "lapsed", icon: "⚠️" },
      { label: "I'm a new patient looking for a dentist", value: "new", icon: "👋" },
    ],
  },
  {
    id: 5,
    question: "How soon are you looking to start treatment?",
    options: [
      { label: "As soon as possible", value: "asap", icon: "🚀" },
      { label: "Within the next month", value: "soon", icon: "📆" },
      { label: "In the next 3–6 months", value: "planning", icon: "🗺️" },
      { label: "Just exploring my options", value: "exploring", icon: "🔍" },
    ],
  },
];

// ── Result Logic ───────────────────────────────────────────────────────────────
interface Answers {
  [key: number]: string;
}

interface Result {
  title: string;
  subtitle: string;
  description: string;
  treatments: string[];
  cta: string;
  ctaLink: string;
  urgency: "high" | "medium" | "low";
}

function getResult(answers: Answers): Result {
  const concern = answers[1];
  const priority = answers[3];

  if (concern === "emergency") {
    return {
      title: "You Need Urgent Dental Care",
      subtitle: "Same-Day Emergency Appointments Available",
      description: "Based on your answers, you may be experiencing a dental emergency. Pain, infection, or a broken tooth should be treated promptly to prevent complications. We offer same-day emergency appointments — don't wait.",
      treatments: ["Emergency Exam & X-rays", "Pain Relief Treatment", "Tooth Repair or Extraction if needed", "Infection Management"],
      cta: `Call Now — ${PRACTICE.phone.display}`,
      ctaLink: PRACTICE.phone.tel,
      urgency: "high",
    };
  }

  if (concern === "missing") {
    return {
      title: "Dental Implants May Be Right for You",
      subtitle: "Permanent, Natural-Looking Tooth Replacement",
      description: "Missing teeth affect your confidence, bite, and long-term jaw health. Dental implants are the gold standard — they look, feel, and function like natural teeth and can last a lifetime with proper care.",
      treatments: ["Free Implant Consultation", "3D Cone Beam CT Scan", "Single or Full-Arch Implants", "Implant-Supported Dentures"],
      cta: "Book Free Implant Consultation",
      ctaLink: "/dental-implants",
      urgency: "medium",
    };
  }

  if (concern === "alignment") {
    if (priority === "discreet" || priority === "fast") {
      return {
        title: "Invisalign® Could Transform Your Smile",
        subtitle: "Platinum Invisalign® Provider — Discreet & Fast",
        description: "Clear aligners are the most popular way to straighten teeth without anyone knowing. As a Platinum Invisalign® Provider, we use Trios 6 digital scanning for precise, comfortable treatment — often completed in 6–18 months.",
        treatments: ["Free Invisalign® Consultation", "Digital Trios 6 Scan (no impressions)", "Custom Aligner Plan", "Retainers Included"],
        cta: "Book Free Invisalign® Consultation",
        ctaLink: "/invisalign",
        urgency: "low",
      };
    }
    return {
      title: "Orthodontics Can Straighten Your Smile",
      subtitle: "Braces or Invisalign® — We Offer Both",
      description: "Whether you prefer traditional braces or clear aligners, our orthodontic team has 40+ years of combined experience. We'll recommend the best option for your teeth, lifestyle, and budget.",
      treatments: ["Free Orthodontic Consultation", "Traditional Metal Braces", "Clear Ceramic Braces", "Invisalign® Clear Aligners"],
      cta: "Book Free Orthodontic Consultation",
      ctaLink: "/orthodontics",
      urgency: "low",
    };
  }

  if (concern === "whitening") {
    return {
      title: "A Brighter Smile Is Within Reach",
      subtitle: "Professional Whitening — Dramatically Better Results",
      description: "Professional teeth whitening delivers results that over-the-counter products simply can't match. In-office whitening can brighten your smile by several shades in a single visit.",
      treatments: ["In-Office Power Whitening", "Custom Take-Home Trays", "Combination Whitening Plans", "Whitening-Safe Cleaning"],
      cta: "Book a Whitening Consultation",
      ctaLink: "/teeth-whitening",
      urgency: "low",
    };
  }

  if (concern === "cosmetic") {
    return {
      title: "Cosmetic Dentistry Can Restore Your Smile",
      subtitle: "Veneers, Bonding, Crowns & More",
      description: "Chipped, cracked, or worn teeth can be beautifully restored. From porcelain veneers to dental bonding and crowns, we have options at every price point to give you a smile you're proud of.",
      treatments: ["Porcelain Veneers", "Dental Bonding", "Dental Crowns", "Smile Makeover Consultation"],
      cta: "Book a Smile Makeover Consultation",
      ctaLink: "/veneers",
      urgency: "low",
    };
  }

  if (concern === "gum") {
    return {
      title: "Gum Disease Treatment Can Protect Your Smile",
      subtitle: "Periodontics & LANAP Laser Therapy Available",
      description: "Gum disease is the leading cause of tooth loss in adults — but it's very treatable when caught early. Our periodontist offers LANAP laser gum therapy, a minimally invasive treatment with faster healing.",
      treatments: ["Periodontal Evaluation", "Deep Cleaning (Scaling & Root Planing)", "LANAP Laser Gum Therapy", "Gum Grafting if needed"],
      cta: "Book a Periodontal Consultation",
      ctaLink: "/periodontics",
      urgency: "medium",
    };
  }

  // Default
  return {
    title: "A Comprehensive Exam Is the Best First Step",
    subtitle: "New Patient Exam — We Accept Most Insurances",
    description: "The best way to understand your dental health and options is a comprehensive exam with X-rays. Our team will walk you through everything we find and recommend a personalized treatment plan — no pressure.",
    treatments: ["Comprehensive Exam & X-rays", "Professional Cleaning", "Personalized Treatment Plan", "Insurance & Financing Review"],
    cta: "Book a New Patient Exam",
    ctaLink: "/contact",
    urgency: "low",
  };
}

// ── Progress Bar ───────────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: COLORS.teal }}>
          Question {current} of {total}
        </span>
        <span className="font-body text-xs text-gray-400">{pct}% complete</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: COLORS.teal }}
        />
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function SmileAssessment() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<string | null>(null);

  const question = QUESTIONS[currentQ];
  const isLast = currentQ === QUESTIONS.length - 1;

  function handleSelect(value: string) {
    setSelected(value);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (isLast) {
      setStep("result");
    } else {
      setCurrentQ((q) => q + 1);
    }
  }

  function handleBack() {
    if (currentQ === 0) {
      setStep("intro");
    } else {
      setCurrentQ((q) => q - 1);
      setSelected(answers[QUESTIONS[currentQ - 1].id] || null);
    }
  }

  function handleRestart() {
    setStep("intro");
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
  }

  const result = step === "result" ? getResult(answers) : null;

  return (
    <>
      <PageSEO
        title="Free Smile Assessment Quiz | Uplift Dental Garden Grove"
        description="Take our free 5-question smile assessment to find out which dental treatment is right for you — Invisalign, implants, whitening, or more. Personalized results in 2 minutes."
        canonical="https://upliftdental.com/smile-assessment"
      />

      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${COLORS.tealDark} 0%, ${COLORS.teal} 100%)` }}
      >
        <div className="container max-w-3xl mx-auto text-center px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white/90 text-sm font-body mb-6">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            Free · Takes 2 Minutes · No Email Required
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Find Your Perfect Smile Treatment
          </h1>
          <p className="font-body text-lg text-white/85 max-w-xl mx-auto">
            Answer 5 quick questions and we'll recommend the best dental treatment for your unique situation — completely free.
          </p>
        </div>
      </section>

      {/* Quiz / Result Area */}
      <section className="py-16 min-h-[60vh]" style={{ background: TEAL_BG }}>
        <div className="container max-w-2xl mx-auto px-4">

          {/* ── Intro ── */}
          {step === "intro" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl" style={{ background: "oklch(0.92 0.04 192)" }}>
                🦷
              </div>
              <h2 className="font-display text-3xl font-bold mb-4" style={{ color: COLORS.tealDark }}>
                Your Personalized Smile Assessment
              </h2>
              <p className="font-body text-gray-500 mb-6 leading-relaxed">
                In just 5 questions, we'll identify the treatment that best matches your concerns, goals, and timeline — whether that's Invisalign®, dental implants, whitening, or something else entirely.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "⏱️", label: "2 minutes" },
                  { icon: "🔒", label: "100% private" },
                  { icon: "🎯", label: "Personalized" },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl border text-center" style={{ borderColor: "oklch(0.90 0.03 192)", background: TEAL_BG }}>
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <p className="font-body text-xs font-semibold text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep("quiz")}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-body font-bold text-white text-base shadow-lg hover:opacity-90 transition-all"
                style={{ background: COLORS.teal }}
              >
                Start My Assessment <ChevronRight className="w-5 h-5" />
              </button>
              <p className="font-body text-xs text-gray-400 mt-4">No email or personal info required</p>
            </div>
          )}

          {/* ── Quiz ── */}
          {step === "quiz" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
              <ProgressBar current={currentQ + 1} total={QUESTIONS.length} />

              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 leading-tight" style={{ color: COLORS.tealDark }}>
                {question.question}
              </h2>

              <div className="grid gap-3 mb-8">
                {question.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className="flex items-center gap-4 w-full text-left px-5 py-4 rounded-2xl border-2 font-body font-medium text-base transition-all"
                    style={{
                      borderColor: selected === opt.value ? COLORS.teal : "oklch(0.90 0.03 192)",
                      background: selected === opt.value ? "oklch(0.94 0.04 192)" : "white",
                      color: selected === opt.value ? COLORS.tealDark : "oklch(0.35 0.02 205)",
                    }}
                  >
                    <span className="text-xl shrink-0">{opt.icon}</span>
                    <span>{opt.label}</span>
                    {selected === opt.value && (
                      <CheckCircle className="w-5 h-5 ml-auto shrink-0" style={{ color: COLORS.teal }} />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border font-body font-semibold text-sm hover:bg-gray-50 transition-all"
                  style={{ borderColor: "oklch(0.85 0.03 192)", color: "oklch(0.45 0.04 192)" }}
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className="flex items-center gap-2 px-8 py-3 rounded-full font-body font-bold text-sm text-white shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                  style={{ background: COLORS.teal }}
                >
                  {isLast ? "See My Results" : "Next Question"} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── Result ── */}
          {step === "result" && result && (
            <div className="space-y-6">
              {/* Result Card */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                {/* Result Header */}
                <div className="p-8 md:p-10" style={{ background: `linear-gradient(135deg, ${COLORS.tealDark} 0%, ${COLORS.teal} 100%)` }}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white/90 text-xs font-body font-semibold mb-4">
                    {result.urgency === "high" ? "⚠️ Urgent" : result.urgency === "medium" ? "📋 Recommended" : "✨ Your Match"}
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                    {result.title}
                  </h2>
                  <p className="font-body text-white/80 font-semibold">{result.subtitle}</p>
                </div>

                {/* Result Body */}
                <div className="p-8 md:p-10">
                  <p className="font-body text-gray-600 leading-relaxed mb-8">{result.description}</p>

                  <h3 className="font-display text-lg font-bold mb-4" style={{ color: COLORS.tealDark }}>
                    What We Recommend for You
                  </h3>
                  <ul className="space-y-2 mb-8">
                    {result.treatments.map((t) => (
                      <li key={t} className="flex items-center gap-3 font-body text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 shrink-0" style={{ color: COLORS.teal }} />
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {result.ctaLink.startsWith("tel:") ? (
                      <a
                        href={result.ctaLink}
                        className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white text-base shadow-lg hover:opacity-90 transition-all"
                        style={{ background: COLORS.teal }}
                      >
                        <Phone className="w-4 h-4" />
                        {result.cta}
                      </a>
                    ) : (
                      <Link
                        href={result.ctaLink}
                        className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white text-base shadow-lg hover:opacity-90 transition-all"
                        style={{ background: COLORS.teal }}
                      >
                        {result.cta} <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                    <a
                      href={SMS.general}
                      className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 font-body font-semibold text-base hover:opacity-80 transition-all"
                      style={{ borderColor: COLORS.teal, color: COLORS.teal }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Text Us: {PRACTICE.sms.display}
                    </a>
                  </div>
                </div>
              </div>

              {/* Restart */}
              <div className="text-center">
                <button
                  onClick={handleRestart}
                  className="font-body text-sm underline underline-offset-2 hover:opacity-70 transition-all"
                  style={{ color: COLORS.teal }}
                >
                  Retake the assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-10 bg-white border-t" style={{ borderColor: "oklch(0.92 0.03 192)" }}>
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              "Platinum Invisalign® Provider",
              "Free Consultations",
              "Denti-Cal Accepted",
              "Same-Day Emergencies",
              "5.0 ★ on Google",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 font-body text-sm font-medium" style={{ color: COLORS.tealDark }}>
                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: COLORS.teal }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
