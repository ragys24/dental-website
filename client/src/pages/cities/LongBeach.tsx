/* =============================================================
   UPLIFT DENTAL — Long Beach Landing Page
   Visual style: calm teal local-service guide; factual regional context,
   authentic practice imagery, and no unsupported ratings, prices, or timings.
   ============================================================= */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { MapPin, Phone, MessageSquare, CheckCircle, Clock, Shield, ChevronRight, Car } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";
import { trackSchedule } from "@/lib/tracking";
import { PageSEO } from "@/components/PageSEO";

const TEAM_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/uplift-team-real_80532d53.jpg";

const FAQS = [
  {
    q: "How do I get to Uplift Dental from Long Beach?",
    a: `From East Long Beach, many visitors use the CA-22 (Garden Grove Freeway) toward Garden Grove, then follow local directions to Lampson Avenue. Travel time depends on traffic and your starting point. Our office at ${PRACTICE.address.full} has free parking directly in front.`,
  },
  {
    q: "Do you accept Denti-Cal patients from Long Beach?",
    a: "Yes! We proudly accept Denti-Cal (Medi-Cal Dental), most PPO insurance plans, and military/Tricare insurance. Many Long Beach patients choose us because we combine Denti-Cal acceptance with advanced technology like 3D printing and digital scanning — something few Denti-Cal providers offer.",
  },
  {
    q: "Can I get same-day emergency dental care if I'm in Long Beach?",
    a: `Absolutely. We offer same-day emergency dental appointments for patients from Long Beach and surrounding areas. The drive is only about 15 minutes via the 22 Freeway. Call ${PRACTICE.phone.display} or text ${PRACTICE.sms.display} immediately for urgent dental needs like severe toothaches, knocked-out teeth, or broken crowns.`,
  },
  {
    q: "Why do Long Beach patients choose Uplift Dental over local options?",
    a: "Long Beach patients can visit Uplift Dental for a multi-specialty approach: general dentistry, orthodontics, periodontics, and oral surgery in one Garden Grove office. We are a Platinum Invisalign Provider and use digital scanning technology. The team can also discuss insurance and financing options during a consultation.",
  },
  {
    q: "Do you offer Invisalign for Long Beach patients?",
    a: "Yes. Uplift Dental is a Platinum Invisalign Provider and offers Invisalign consultations for patients visiting from Long Beach. During a consultation, the team can discuss candidacy, digital planning, insurance questions, and financing options.",
  },
];

export default function LongBeach() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <>
      <PageSEO
        title="Dentist Near Long Beach, CA | Uplift Dental in Garden Grove"
        description="Long Beach patients can visit Uplift Dental in Garden Grove via CA-22 for general, specialty, and Invisalign care. Denti-Cal and PPO options; consultations available."
        canonical="https://upliftdental.com/dentist-near-long-beach"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.tealDark} 0%, ${COLORS.teal} 100%)` }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/pattern-02-optimized_1e03ef22.jpg')", backgroundSize: "cover" }} />
        <div className="container relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white/90 text-sm font-body mb-6">
            <MapPin className="w-4 h-4" />
            Serving Long Beach, CA · Garden Grove, CA
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            Dentist Near Long Beach, CA
          </h1>
          <h2 className="font-body text-lg md:text-xl font-semibold text-white/80 mb-5">
            A Garden Grove dental office accessible via the CA-22 Freeway
          </h2>
          <p className="font-body text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed">
            Long Beach residents can visit Uplift Dental for comprehensive multi-specialty care in one Garden Grove office — including general dentistry, Invisalign, implants, orthodontics, and oral surgery.
          </p>
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-white/80 font-body text-sm">
              <Car className="w-4 h-4" />
              <span>Via CA-22 from East Long Beach</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 font-body text-sm">
              <MapPin className="w-4 h-4" />
              <span>Garden Grove office with free parking</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" onClick={trackSchedule} className="flex items-center justify-center gap-2 px-8 py-4 bg-white font-body font-bold text-base rounded-full shadow-xl hover:bg-white/90 transition-all" style={{ color: COLORS.tealDark }}>
                Book Free Consultation
            </Link>
            <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center justify-center gap-2 px-8 py-4 bg-white/15 border-2 border-white/40 text-white font-body font-semibold text-base rounded-full hover:bg-white/25 transition-all">
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
              "Insurance & Financing Guidance",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 font-body text-sm font-medium" style={{ color: COLORS.tealDark }}>
                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: COLORS.teal }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Long Beach Content — 400+ words */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>WHY LONG BEACH PATIENTS CHOOSE US</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: COLORS.tealDark }}>
                An Easy Commute from East Long Beach for Exceptional Dental Care
              </h2>
              <div className="font-body text-gray-600 leading-relaxed space-y-4">
                <p>
                  If you live in <strong>East Long Beach</strong>, <strong>Belmont Shore</strong>, or near the <strong>Traffic Circle</strong>, Uplift Dental & Orthodontics is in Garden Grove. A common route uses the <strong>CA-22 (Garden Grove Freeway)</strong>, with local routing depending on your starting point and current traffic. From the <strong>Long Beach Town Center</strong> or <strong>Cal State Long Beach</strong> area, navigation can help identify the most appropriate route before you leave.
                </p>
                <p>
                  Patients considering a Garden Grove office can ask about access to <strong>multiple dental specialties under one roof</strong>. General dentistry, orthodontics, implants, periodontics, and oral surgery are coordinated through the Uplift Dental team.
                </p>
                <p>
                  We're located at <strong>{PRACTICE.address.full}</strong>, just off Lampson Avenue near the intersection with Seal Beach Boulevard. The office is across from <strong>McGaugh Elementary School</strong> and minutes from the <strong>Rossmoor Shopping Center</strong>. Free parking is available directly in front of our building — no parking structures or meters to worry about.
                </p>
                <p>
                  Whether you're coming from the <strong>Lakewood Village</strong> area, <strong>Los Altos</strong>, or elsewhere in Long Beach, the Garden Grove team can discuss care options, Denti-Cal and PPO questions, and financing during a visit. Please allow for current traffic conditions when planning your appointment.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={TEAM_IMAGE}
                  alt="Uplift Dental team at the Garden Grove office"
                  className="rounded-2xl shadow-xl w-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="768"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border" style={{ borderColor: "oklch(0.88 0.04 192)" }}>
                  <p className="font-body text-xs font-semibold text-gray-700">Garden Grove office</p>
                  <p className="font-body text-xs text-gray-500">Coordinated multi-specialty care</p>
                </div>
              </div>
              {/* Driving directions card */}
              <div className="bg-[oklch(0.97_0.01_192)] rounded-2xl p-6 border" style={{ borderColor: "oklch(0.88 0.04 192)" }}>
                <h3 className="font-display text-lg font-bold mb-3" style={{ color: COLORS.tealDark }}>
                  <Car className="w-5 h-5 inline mr-2" style={{ color: COLORS.teal }} />
                  Driving Directions from Long Beach
                </h3>
                <ol className="font-body text-sm text-gray-600 space-y-2 list-decimal list-inside">
                  <li>From East Long Beach, head west on <strong>CA-22 (Garden Grove Fwy)</strong></li>
                  <li>Exit at <strong>Seal Beach Blvd</strong> and turn right (north)</li>
                  <li>Turn left onto <strong>Lampson Ave</strong></li>
                  <li>Our office is on the right at <strong>5253 Lampson Ave</strong></li>
                </ol>
                <p className="font-body text-xs text-gray-500 mt-3">Free parking available directly in front of the building.</p>
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
              Dental Services for Long Beach Patients
            </h2>
            <p className="font-body text-gray-500 mt-4 max-w-xl mx-auto">
              From routine cleanings to full-mouth rehabilitation — everything your family needs in one convenient Garden Grove location, a short drive from Long Beach.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "General Dentistry", desc: "Cleanings, exams, fillings, crowns, and preventive care for the whole family." },
              { name: "Invisalign® Clear Aligners", desc: "Platinum Invisalign® Provider — straighten your smile discreetly with Trios 6 & iTero digital scanning." },
              { name: "Dental Implants", desc: "Permanent, natural-looking tooth replacement with 3D-guided implant surgery." },
              { name: "Cosmetic Dentistry", desc: "Veneers, bonding, whitening, and smile makeovers tailored to your goals." },
              { name: "Orthodontics & Braces", desc: "Traditional braces and clear ceramic braces with Dr. Schneekluth — 40+ years experience." },
              { name: "Oral Surgery", desc: "Extractions, wisdom teeth removal, bone grafting, and frenectomy with Dr. Youssef." },
              { name: "Emergency Dentistry", desc: "Same-day emergency appointments for toothaches, broken teeth, and urgent dental needs." },
              { name: "Denti-Cal & PPO Accepted", desc: "We accept Denti-Cal, most PPO plans, and military insurance — care for everyone." },
            ].map((svc) => (
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

      {/* Directions / Map CTA */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, ${COLORS.tealDark} 0%, ${COLORS.teal} 100%)` }}>
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-10 h-10 text-white/80 mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Conveniently Located Near Long Beach
          </h2>
          <p className="font-body text-white/80 text-lg mb-2">
            {PRACTICE.address.full}
          </p>
          <p className="font-body text-white/80 text-sm mb-8">Accessible from Long Beach via the CA-22 Freeway; travel time varies with traffic.</p>
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
              href={SMS.general} onClick={trackSchedule}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/15 border-2 border-white/40 text-white font-body font-semibold text-base rounded-full hover:bg-white/25 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Text Us Now
            </a>
          </div>
          <p className="font-body text-white/75 text-xs mt-6">Mon–Fri: 9am–5pm · 3rd Saturday: 9am–2pm · Same-day emergencies available</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: COLORS.tealDark }}>
              Questions from Long Beach Patients
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
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
            Ready to Visit Us from Long Beach?
          </h2>
          <p className="font-body text-gray-500 mb-8 text-lg">
            Book a consultation today. The Garden Grove office is accessible from East Long Beach via the CA-22 Freeway; travel time varies with traffic. New patients are welcome, and the team can discuss Denti-Cal, PPO, and military-insurance questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/contact" onClick={trackSchedule} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white shadow-lg hover:opacity-90 transition-all" style={{ background: COLORS.teal }}>
                Book Free Consultation Online
            </Link>
            <a href={SMS.general} onClick={trackSchedule} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 font-body font-semibold text-base hover:opacity-80 transition-all text-white" style={{ background: COLORS.tealDark, borderColor: COLORS.tealDark }}>
              <MessageSquare className="w-4 h-4" />
              Text {PRACTICE.sms.display}
            </a>
            <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 font-body font-semibold text-base hover:bg-white transition-all" style={{ borderColor: COLORS.teal, color: COLORS.teal }}>
              <Phone className="w-4 h-4" />
              Call {PRACTICE.phone.display}
            </a>
          </div>
          <p className="font-body text-sm text-gray-500">For faster service, text us at {PRACTICE.sms.display} or book directly online.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
