/* =============================================================
   UPLIFT DENTAL — Special Offers Page
   Design: "Elevated Warmth" — Premium teal brand, DM Serif Display headlines
   Pricing: $99 Adult Exam + X-rays, $79 Pediatric Exam + X-rays (no insurance)
   ============================================================= */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone, MessageSquare, CheckCircle2, Clock, Tag, Star,
  Baby, Smile, AlignCenter, Sparkles, Zap, Shield, Calendar
} from "lucide-react";
import { PRACTICE } from "@/lib/constants";
import { SMS } from "@/lib/sms";

const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/uplift-pattern-dark_02e4726d.jpg";

const offers = [
  {
    badge: "New Patient Special",
    icon: <Smile className="w-8 h-8" />,
    title: "Adult Exam & X-Rays",
    price: "$99",
    originalPrice: "$250+",
    subtitle: "For patients without dental insurance",
    description: "Comprehensive new patient exam including full-mouth X-rays and oral cancer screening. Get a complete picture of your dental health at an accessible price.",
    includes: [
      "Full comprehensive oral exam",
      "Digital X-rays (full series)",
      "Oral cancer screening",
      "Personalized treatment plan",
      "No hidden fees",
    ],
    cta: "Book Adult Exam",
    color: "oklch(0.42 0.09 185)",
    bgColor: "oklch(0.95 0.015 185)",
    highlight: true,
  },
  {
    badge: "Kids Special",
    icon: <Baby className="w-8 h-8" />,
    title: "Pediatric Exam & X-Rays",
    price: "$79",
    originalPrice: "$200+",
    subtitle: "For children without dental insurance",
    description: "Gentle, kid-friendly comprehensive exam with digital X-rays. We make every child's first dental visit comfortable, fun, and positive.",
    includes: [
      "Full pediatric oral exam",
      "Digital X-rays",
      "Fluoride treatment assessment",
      "Cavity risk evaluation",
      "Parent education & guidance",
    ],
    cta: "Book Kids Exam",
    color: "oklch(0.50 0.12 160)",
    bgColor: "oklch(0.95 0.02 160)",
    highlight: false,
  },
  {
    badge: "Free Consultation",
    icon: <AlignCenter className="w-8 h-8" />,
    title: "Free Invisalign Consultation",
    price: "FREE",
    originalPrice: "$150",
    subtitle: "Platinum Invisalign® Provider",
    description: "Find out if Invisalign is right for you with a no-obligation consultation. Includes a digital Trios 6 or iTero scan — no messy impressions.",
    includes: [
      "Digital Trios 6 or iTero scan",
      "Smile simulation preview",
      "Custom treatment plan",
      "Financing options review",
      "No obligation to proceed",
    ],
    cta: "Book Free Consult",
    color: "oklch(0.42 0.09 185)",
    bgColor: "oklch(0.95 0.015 185)",
    highlight: false,
  },
  {
    badge: "Cosmetic Special",
    icon: <Sparkles className="w-8 h-8" />,
    title: "Free Smile Makeover Consult",
    price: "FREE",
    originalPrice: "$150",
    subtitle: "Veneers, whitening & bonding",
    description: "Explore your cosmetic dentistry options with a complimentary smile consultation. Discuss veneers, teeth whitening, bonding, and full smile makeovers.",
    includes: [
      "Smile analysis & assessment",
      "Digital smile design preview",
      "Veneer & whitening options",
      "Transparent pricing breakdown",
      "Cherry financing available",
    ],
    cta: "Book Smile Consult",
    color: "oklch(0.55 0.14 55)",
    bgColor: "oklch(0.97 0.02 55)",
    highlight: false,
  },
  {
    badge: "Emergency",
    icon: <Zap className="w-8 h-8" />,
    title: "Same-Day Emergency Exam",
    price: "$0",
    originalPrice: null,
    subtitle: "Emergency exam fee waived",
    description: "Dental emergency? We waive the emergency exam fee for new patients. Call or text us immediately — we'll fit you in the same day.",
    includes: [
      "Same-day appointment",
      "Emergency exam fee waived",
      "Immediate pain relief options",
      "X-rays if needed",
      "Treatment plan same visit",
    ],
    cta: "Call Now",
    color: "oklch(0.55 0.18 25)",
    bgColor: "oklch(0.97 0.015 25)",
    highlight: false,
  },
  {
    badge: "Financing",
    icon: <Shield className="w-8 h-8" />,
    title: "Cherry Financing — 0% Interest",
    price: "0%",
    originalPrice: null,
    subtitle: "Flexible payment plans available",
    description: "Break your dental care into manageable monthly payments with Cherry financing. Apply in seconds with no hard credit pull required.",
    includes: [
      "Apply in under 60 seconds",
      "No hard credit pull to apply",
      "Flexible payment terms",
      "Covers all dental services",
      "Instant approval decision",
    ],
    cta: "Learn About Financing",
    color: "oklch(0.42 0.09 185)",
    bgColor: "oklch(0.95 0.015 185)",
    highlight: false,
  },
];

function OfferCard({ offer }: { offer: typeof offers[0] }) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        offer.highlight
          ? "border-[oklch(0.42_0.09_185)] shadow-xl"
          : "border-[oklch(0.90_0.015_185)] shadow-md"
      }`}
      style={{ backgroundColor: "white" }}
    >
      {offer.highlight && (
        <div className="absolute top-0 left-0 right-0 py-2 text-center text-white text-xs font-body font-bold uppercase tracking-widest" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
          Most Popular
        </div>
      )}

      <div className={`p-8 ${offer.highlight ? "pt-12" : ""}`}>
        {/* Badge + Icon */}
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-bold uppercase tracking-wide"
            style={{ backgroundColor: offer.bgColor, color: offer.color }}>
            <Tag className="w-3 h-3" />
            {offer.badge}
          </span>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: offer.bgColor, color: offer.color }}>
            {offer.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl text-[oklch(0.18_0.04_185)] mb-1">{offer.title}</h3>
        <p className="font-body text-sm text-[oklch(0.52_0.04_185)] mb-4">{offer.subtitle}</p>

        {/* Price */}
        <div className="flex items-end gap-3 mb-4">
          <span className="font-display text-5xl font-bold" style={{ color: offer.color }}>
            {offer.price}
          </span>
          {offer.originalPrice && (
            <div className="mb-2">
              <span className="font-body text-sm text-[oklch(0.60_0.04_185)] line-through block">{offer.originalPrice} value</span>
              <span className="font-body text-xs font-bold text-green-600">You save!</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="font-body text-sm text-[oklch(0.40_0.04_185)] leading-relaxed mb-6">
          {offer.description}
        </p>

        {/* Includes */}
        <ul className="space-y-2.5 mb-8">
          {offer.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: offer.color }} />
              <span className="font-body text-sm text-[oklch(0.35_0.04_185)]">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={offer.cta === "Call Now" ? PRACTICE.phone.tel : "/contact"}
          className="w-full py-3.5 rounded-xl text-white font-body font-bold text-sm transition-all hover:opacity-90 active:scale-[0.99] flex items-center justify-center gap-2"
          style={{ backgroundColor: offer.color }}
        >
          <Calendar className="w-4 h-4" />
          {offer.cta}
        </a>
      </div>
    </div>
  );
}

export default function SpecialOffers() {
  return (
    <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "oklch(0.18 0.04 185)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "cover" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-body font-semibold"
            style={{ backgroundColor: "oklch(0.70 0.07 195 / 0.2)", color: "oklch(0.85 0.05 195)", border: "1px solid oklch(0.70 0.07 195 / 0.4)" }}>
            <Tag className="w-4 h-4" />
            Limited Time Offers
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
            Special Offers &<br />
            <em className="not-italic" style={{ color: "oklch(0.85 0.07 195)" }}>New Patient Deals</em>
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Quality dental care should be accessible to everyone. These exclusive offers are designed to help you and your family get the care you deserve — at prices that make sense.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={PRACTICE.phone.tel} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white font-body font-bold text-sm transition-all hover:bg-white/90"
              style={{ color: "oklch(0.18 0.04 185)" }}>
              <Phone className="w-4 h-4" />
              {PRACTICE.phone.display}
            </a>
            <a href={SMS.general} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-bold text-sm transition-all border-2 border-white/40 text-white hover:bg-white/10">
              <MessageSquare className="w-4 h-4" />
              Text {PRACTICE.sms.display}
            </a>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER BANNER ── */}
      <div className="py-4 px-4 text-center font-body text-sm text-[oklch(0.40_0.04_185)]" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <Clock className="w-4 h-4 inline mr-1.5 mb-0.5" style={{ color: "oklch(0.42 0.09 185)" }} />
        Offers valid for new patients without dental insurance. Cannot be combined with other offers. Have insurance? We’ll bill your insurance first. Call to confirm availability.
      </div>

      {/* ── OFFER CARDS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Current Promotions</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)]">
              Exclusive Offers for<br />New & Uninsured Patients
            </h2>
            <p className="font-body text-[oklch(0.45_0.04_185)] mt-4 max-w-xl mx-auto">
              We believe everyone deserves a healthy smile. These offers are our way of making that possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <OfferCard key={offer.title} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── INSURANCE NOTE ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-10 border border-[oklch(0.90_0.015_185)] shadow-sm text-center">
            <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: "oklch(0.42 0.09 185)" }} />
            <h3 className="font-display text-3xl text-[oklch(0.18_0.04_185)] mb-4">Have Insurance? We Accept Most Plans.</h3>
            <p className="font-body text-[oklch(0.40_0.04_185)] leading-relaxed max-w-2xl mx-auto mb-6">
              We accept Denti-Cal, most PPO insurance plans, and military/Tricare insurance. If you have coverage, your exam and X-rays may be fully covered. Call us to verify your benefits before your visit.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Denti-Cal", "Delta Dental", "MetLife", "Cigna", "Aetna", "United Healthcare", "Tricare / Military", "Most PPOs"].map((ins) => (
                <span key={ins} className="px-4 py-2 rounded-full text-sm font-body font-semibold"
                  style={{ backgroundColor: "oklch(0.95 0.015 185)", color: "oklch(0.42 0.09 185)" }}>
                  {ins}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={PRACTICE.phone.tel} className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-body font-bold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
                <Phone className="w-4 h-4" />
                Verify My Insurance
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-body font-bold text-sm transition-all border-2"
                style={{ borderColor: "oklch(0.42 0.09 185)", color: "oklch(0.42 0.09 185)" }}>
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL STRIP ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex justify-center gap-1 mb-2">
              {[1,2,3,4,5].map((s) => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="font-body text-sm text-[oklch(0.52_0.04_185)]">5.0 out of 5 — 100+ Google Reviews</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "I came in without insurance and the $99 new patient exam was a lifesaver. Dr. Stefan was thorough and explained everything clearly. No pressure at all.",
                name: "Melissa T.",
                service: "New Patient Exam"
              },
              {
                text: "Got the free Invisalign consultation and they showed me a simulation of my smile on the same day. Decided to start treatment right away. Best decision ever!",
                name: "Carlos R.",
                service: "Invisalign Consultation"
              },
              {
                text: "Brought my kids in for the pediatric special. The staff was so gentle and patient with them. My daughter actually wants to come back — that says it all!",
                name: "Jennifer M.",
                service: "Pediatric Exam"
              },
            ].map((t) => (
              <div key={t.name} className="bg-[oklch(0.97_0.008_85)] rounded-2xl p-6 border border-[oklch(0.90_0.015_185)]">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="font-body text-sm text-[oklch(0.35_0.04_185)] leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <div className="font-body font-bold text-sm text-[oklch(0.18_0.04_185)]">{t.name}</div>
                  <div className="font-body text-xs text-[oklch(0.52_0.04_185)]">{t.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.18 0.04 185)" }}>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "cover" }} />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-4xl text-white mb-4">
              Ready to Claim Your Offer?
            </h2>
            <p className="font-body text-white/80 mb-8">
              Call, text, or book online. Our team is ready to help you get started with your new patient special today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={PRACTICE.phone.tel} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white font-body font-bold text-sm transition-all hover:bg-white/90"
                style={{ color: "oklch(0.18 0.04 185)" }}>
                <Phone className="w-4 h-4" />
                Call {PRACTICE.phone.display}
              </a>
              <a href={SMS.general} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-bold text-sm transition-all border-2 border-white/40 text-white hover:bg-white/10">
                <MessageSquare className="w-4 h-4" />
                Text {PRACTICE.sms.display}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-bold text-sm transition-all border-2 border-white/40 text-white hover:bg-white/10">
                <Calendar className="w-4 h-4" />
                Book Online
              </Link>
            </div>
            <p className="font-body text-xs text-white/50 mt-6">
              *Offers for new patients without dental insurance. Cannot be combined. Subject to change without notice. If you have dental insurance, we will bill your insurance first — any remaining balance after insurance may be eligible for these special rates.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
