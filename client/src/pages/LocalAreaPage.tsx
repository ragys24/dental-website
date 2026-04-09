/* =============================================================
   UPLIFT DENTAL — Local Area Landing Page Template
   Reusable component for all surrounding city SEO pages
   Brand: Deep teal #0E6B6B, DM Serif Display + DM Sans
   ============================================================= */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { MapPin, Phone, MessageSquare, CheckCircle, Star, Clock, Shield, ChevronRight } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";

export interface LocalAreaPageProps {
  city: string;
  state?: string;
  distance?: string; // e.g. "4 miles"
  driveTime?: string; // e.g. "8 minutes"
  slug: string;
  nearbyLandmark?: string; // e.g. "near Seal Beach Pier"
  metaDescription?: string;
  intro?: string;
  zipCode?: string; // primary zip code for the city
}

const SERVICES = [
  { name: "General Dentistry", desc: "Cleanings, exams, fillings, crowns, and preventive care for the whole family." },
  { name: "Invisalign® Clear Aligners", desc: "Platinum Invisalign® Provider — straighten your smile discreetly with Trios 6 & iTero digital scanning." },
  { name: "Dental Implants", desc: "Permanent, natural-looking tooth replacement with 3D-guided implant surgery." },
  { name: "Cosmetic Dentistry", desc: "Veneers, bonding, whitening, and smile makeovers tailored to your goals." },
  { name: "Orthodontics & Braces", desc: "Traditional braces and clear ceramic braces with Dr. Schneekluth — 40+ years experience." },
  { name: "Oral Surgery", desc: "Extractions, wisdom teeth removal, bone grafting, and frenectomy with Dr. Youssef." },
  { name: "Emergency Dentistry", desc: "Same-day emergency appointments for toothaches, broken teeth, and urgent dental needs." },
  { name: "Denti-Cal & PPO Accepted", desc: "We accept Denti-Cal, most PPO plans, and military insurance — care for everyone." },
];

// Testimonials removed from city pages to avoid Google structured data conflicts

const FAQS = (city: string) => [
  {
    q: `How far is Uplift Dental from ${city}?`,
    a: `Uplift Dental & Orthodontics is conveniently located at ${PRACTICE.address.full} — just minutes from ${city}. We serve patients from ${city} and the surrounding Orange County area.`,
  },
  {
    q: `Do you accept Denti-Cal patients from ${city}?`,
    a: `Yes! We proudly accept Denti-Cal, most PPO insurance plans, and military insurance. We also offer Cherry and CareCredit financing to make dental care accessible for all ${city} residents.`,
  },
  {
    q: `Can I get same-day emergency dental care if I'm in ${city}?`,
    a: `Absolutely. We offer same-day emergency dental appointments for patients from ${city} and surrounding areas. Call ${PRACTICE.phone.display} or text ${PRACTICE.sms.display} immediately for urgent dental needs.`,
  },
  {
    q: `Do you offer free consultations for ${city} patients?`,
    a: `Yes — we offer free consultations for new patients from ${city} for Invisalign®, dental implants, and cosmetic dentistry. Call us or book online to schedule your complimentary visit.`,
  },
  {
    q: `Is Uplift Dental a Platinum Invisalign® Provider near ${city}?`,
    a: `Yes! Uplift Dental holds Platinum Invisalign® Provider status — one of the highest designations available. We use the Trios 6 and iTero intraoral scanners for precise digital impressions, serving Invisalign® patients from ${city} and all of Orange County.`,
  },
];

export default function LocalAreaPage({ city, state = "CA", distance, driveTime, slug, nearbyLandmark, intro, zipCode }: LocalAreaPageProps) {
  const faqs = FAQS(city);

  // Note: LocalBusiness schema is only on the homepage (StructuredData.tsx)
  // City pages only use FAQ schema to avoid duplicate business entity schemas

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <>
      {/* Inject FAQ schema only (LocalBusiness schema on homepage only) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.tealDark} 0%, ${COLORS.teal} 100%)` }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/PATTERN-02_5ffa36bf.jpg')", backgroundSize: "cover" }} />
        <div className="container relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white/90 text-sm font-body mb-6">
            <MapPin className="w-4 h-4" />
            Serving {city}, {state} · Garden Grove, CA
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            Dentist Near {city}, {state}
          </h1>
          <h2 className="font-body text-lg md:text-xl font-semibold text-white/80 mb-5">
            Serving {city} Patients · {PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip} · Platinum Invisalign® Provider · Same-Day Emergency Care
          </h2>
          <p className="font-body text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed">
            {intro || `Uplift Dental & Orthodontics proudly serves patients from ${city} with expert general dentistry, Invisalign®, dental implants, orthodontics, and oral surgery — all under one roof in nearby Garden Grove.`}
          </p>
          {(distance || driveTime) && (
            <div className="flex items-center justify-center gap-6 mb-8">
              {distance && (
                <div className="flex items-center gap-2 text-white/80 font-body text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>~{distance} from {city}</span>
                </div>
              )}
              {driveTime && (
                <div className="flex items-center gap-2 text-white/80 font-body text-sm">
                  <Clock className="w-4 h-4" />
                  <span>~{driveTime} drive</span>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white font-body font-bold text-base rounded-full shadow-xl hover:bg-white/90 transition-all" style={{ color: COLORS.tealDark }}>
                Book Free Consultation
            </Link>
            <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 bg-white/15 border-2 border-white/40 text-white font-body font-semibold text-base rounded-full hover:bg-white/25 transition-all">
              <Phone className="w-4 h-4" />
              {PRACTICE.phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 border-b border-gray-100" style={{ background: "oklch(0.97 0.01 192)" }}>
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              "Platinum Invisalign® Provider",
              "Denti-Cal Accepted",
              "Free Consultations",
              "Same-Day Emergencies",
              "Military Insurance Welcome",
              "Cherry & CareCredit Financing",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 font-body text-sm font-medium" style={{ color: COLORS.tealDark }}>
                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: COLORS.teal }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Uplift for City patients */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>WHY {city.toUpperCase()} PATIENTS CHOOSE US</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: COLORS.tealDark }}>
                Garden Grove's Premier Multi-Specialty Dental Practice
              </h2>
              <p className="font-body text-gray-600 leading-relaxed mb-6">
                Patients from {city} choose Uplift Dental because we offer something rare: general dentistry, orthodontics, and oral surgery all under one roof. No referrals, no extra travel — just coordinated, expert care for your whole family.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                We hold <strong>Platinum Invisalign® Provider</strong> status, use the <strong>Trios 6</strong> and <strong>iTero intraoral scanners</strong> and <strong>SprintRay 3D printer</strong> for precision treatment, and accept Denti-Cal, most PPO plans, and military insurance.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Years Serving Community", value: "20+" },
                  { label: "5-Star Reviews", value: "100+" },
                  { label: "Happy Patients", value: "1,000+" },
                  { label: "Insurances Accepted", value: "20+" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl border" style={{ borderColor: "oklch(0.88 0.04 192)", background: "oklch(0.97 0.01 192)" }}>
                    <p className="font-display text-2xl font-bold" style={{ color: COLORS.teal }}>{stat.value}</p>
                    <p className="font-body text-xs text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://i0.wp.com/upliftdental.com/wp-content/uploads/2024/10/uplift-dental-garden-grove-team.jpg?w=1024&ssl=1"
                alt={`Uplift Dental team serving patients from ${city}`}
                className="rounded-2xl shadow-xl w-full object-cover"
                style={{ aspectRatio: "4/3" }}
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80"; }}
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border" style={{ borderColor: "oklch(0.88 0.04 192)" }}>
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="font-body text-xs font-semibold text-gray-700">5.0 / 5 on Google</p>
                <p className="font-body text-xs text-gray-400">100+ verified reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20" style={{ background: "oklch(0.97 0.01 192)" }}>
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>COMPREHENSIVE CARE</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: COLORS.tealDark }}>
              Dental Services for {city} Patients
            </h2>
            <p className="font-body text-gray-500 mt-4 max-w-xl mx-auto">
              From routine cleanings to full-mouth rehabilitation — everything your family needs in one convenient Garden Grove location.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((svc) => (
              <div key={svc.name} className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition-shadow" style={{ borderColor: "oklch(0.92 0.03 192)" }}>
                <CheckCircle className="w-5 h-5 mb-3" style={{ color: COLORS.teal }} />
                <h3 className="font-display font-semibold text-base mb-2" style={{ color: COLORS.tealDark }}>{svc.name}</h3>
                <p className="font-body text-xs text-gray-500 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white shadow-lg hover:opacity-90 transition-all" style={{ background: COLORS.teal }}>
                View All Services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials section removed to avoid Google structured data conflicts on city pages */}

      {/* Directions / Map CTA */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, ${COLORS.tealDark} 0%, ${COLORS.teal} 100%)` }}>
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-10 h-10 text-white/60 mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Conveniently Located Near {city}
          </h2>
          <p className="font-body text-white/80 text-lg mb-2">
            {PRACTICE.address.full}
          </p>
          {nearbyLandmark && (
            <p className="font-body text-white/60 text-sm mb-8">{nearbyLandmark}</p>
          )}
          {!nearbyLandmark && <div className="mb-8" />}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://maps.google.com/?q=5253+Lampson+Ave+Garden+Grove+CA+92845"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white font-body font-bold text-base rounded-full shadow-xl hover:bg-white/90 transition-all"
              style={{ color: COLORS.tealDark }}
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
            <a
              href={SMS.general}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/15 border-2 border-white/40 text-white font-body font-semibold text-base rounded-full hover:bg-white/25 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Text Us Now
            </a>
          </div>
          <p className="font-body text-white/50 text-xs mt-6">Mon–Fri: 9am–5pm · 3rd Saturday: 9am–2pm · Same-day emergencies available</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: COLORS.tealDark }}>
              Questions from {city} Patients
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-2xl border overflow-hidden" style={{ borderColor: "oklch(0.88 0.04 192)" }}>
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-body font-semibold text-base" style={{ color: COLORS.tealDark, background: "oklch(0.97 0.01 192)" }}>
                  {faq.q}
                  <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-open:rotate-90" style={{ color: COLORS.teal }} />
                </summary>
                <div className="p-5 pt-0 bg-white">
                  <p className="font-body text-sm text-gray-600 leading-relaxed pt-4 border-t" style={{ borderColor: "oklch(0.92 0.03 192)" }}>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16" style={{ background: "oklch(0.97 0.01 192)" }}>
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.tealDark }}>
            Ready to Visit Us from {city}?
          </h2>
          <p className="font-body text-gray-500 mb-8 text-lg">
            Book your free consultation today. New patients welcome. Denti-Cal, PPO, and military insurance accepted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white shadow-lg hover:opacity-90 transition-all" style={{ background: COLORS.teal }}>
                Book Free Consultation Online
            </Link>
            <a href={SMS.general} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 font-body font-semibold text-base hover:opacity-80 transition-all text-white" style={{ background: COLORS.tealDark, borderColor: COLORS.tealDark }}>
              <MessageSquare className="w-4 h-4" />
              Text {PRACTICE.sms.display}
            </a>
            <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 font-body font-semibold text-base hover:bg-white transition-all" style={{ borderColor: COLORS.teal, color: COLORS.teal }}>
              <Phone className="w-4 h-4" />
              Call {PRACTICE.phone.display}
            </a>
          </div>
          <p className="font-body text-sm text-gray-400">For faster service, text us at {PRACTICE.sms.display} or book directly online.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
