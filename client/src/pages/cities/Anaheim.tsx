/* =============================================================
   UPLIFT DENTAL — Anaheim Landing Page
   Visual style: calm teal local-service guide with factual routing context;
   do not make fixed travel-time, financing, rating, or outcome promises.
   ============================================================= */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { MapPin, Phone, MessageSquare, CheckCircle, Star, Clock, Shield, ChevronRight, Car } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";
import { trackSchedule } from "@/lib/tracking";
import { PageSEO } from "@/components/PageSEO";

const FAQS = [
  { q: "How do I get to Uplift Dental from Anaheim?", a: `From Anaheim, many visitors use the 5 South and 22 West toward Garden Grove. From Anaheim Hills, routes may include the 91 and 57 before the 22. Current traffic and your starting point affect the best route. Our office at ${PRACTICE.address.full} has free parking in front.` },
  { q: "Do you accept Denti-Cal patients from Anaheim?", a: "Yes! We accept Denti-Cal, most PPO plans, and military/Tricare insurance. Many Anaheim patients choose us because we combine Denti-Cal acceptance with specialist-level care — orthodontics, oral surgery, periodontics, and endodontics all under one roof." },
  { q: "Can I get same-day emergency dental care if I'm in Anaheim?", a: `We offer same-day emergency appointments when availability permits. Call ${PRACTICE.phone.display} or text ${PRACTICE.sms.display} for urgent dental needs so the office can confirm the next appropriate step.` },
  { q: "Why do Anaheim patients choose Uplift Dental over local options?", a: "Anaheim patients can visit Uplift Dental for a multi-specialty model that includes orthodontics, periodontics, endodontics, and oral surgery in one Garden Grove office. We are a Platinum Invisalign Provider and accept Denti-Cal." },
  { q: "Do you offer Invisalign for Anaheim patients?", a: "Yes. Uplift Dental is a Platinum Invisalign Provider and offers consultations and digital planning. The team can discuss candidacy, treatment options, insurance questions, and financing options." },
];

import LocalAreaPage from "../LocalAreaPage";
export default function Anaheim() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) };
  return (
    <>
      <PageSEO title="Dentist Near Anaheim, CA | Uplift Dental in Garden Grove" description="Anaheim patients can visit Uplift Dental in Garden Grove via regional freeways for general, specialty, and Invisalign care. Denti-Cal and PPO questions welcome." canonical="https://upliftdental.com/dentist-near-anaheim" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <div className="min-h-screen bg-white">
        <section className="py-20" style={{ background: "linear-gradient(135deg, oklch(0.14 0.04 192) 0%, oklch(0.22 0.07 192) 100%)" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body font-semibold mb-5" style={{ background: "oklch(0.42 0.09 192 / 0.3)", color: "oklch(0.85 0.08 192)", border: "1px solid oklch(0.42 0.09 192 / 0.4)" }}><MapPin className="w-3.5 h-3.5" /> Garden Grove office accessible from Anaheim</div>
              <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-5 leading-tight">Your Dentist Near<br /><span style={{ color: "oklch(0.70 0.07 195)" }}>Anaheim, CA</span></h1>
              <p className="font-body text-white/80 text-lg leading-relaxed mb-7">Anaheim families trust Uplift Dental & Orthodontics for multi-specialty dental care just off the 22 Freeway in Garden Grove. Platinum Invisalign Provider, Denti-Cal accepted, same-day emergencies — all specialists under one roof.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-full font-body font-bold text-sm" style={{ color: "oklch(0.22 0.07 192)" }}><Phone className="w-4 h-4" /> {PRACTICE.phone.display}</a>
                <Link href="/contact" onClick={trackSchedule} className="flex items-center justify-center gap-2 px-6 py-3 bg-white/15 border border-white/40 text-white rounded-full font-body font-bold text-sm"><MessageSquare className="w-4 h-4" /> Book Free Consult</Link>
              </div>
            </div>
            <div className="hidden lg:block bg-white/10 rounded-3xl p-6 border border-white/20">
              <h3 className="font-display text-xl text-white mb-4">Directions from Anaheim</h3>
              {[{ step: "1", text: "From central Anaheim: Take I-5 South to CA-22 West" }, { step: "2", text: "From Anaheim Hills: Take CA-91 West to CA-57 South, merge onto CA-22 West" }, { step: "3", text: "Exit at Magnolia Ave heading south" }, { step: "4", text: "Turn right on Lampson Ave — 5253 Lampson Ave, free parking in front" }].map(s => (
                <div key={s.step} className="flex items-start gap-3 mb-3"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "oklch(0.42 0.09 192)", color: "white" }}>{s.step}</span><p className="font-body text-white/80 text-sm">{s.text}</p></div>
              ))}
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2 text-white/70 text-sm font-body"><Car className="w-4 h-4" /> Use current navigation for your route and travel time</div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-[oklch(0.98_0.005_192)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-center mb-10" style={{ color: "oklch(0.22 0.07 192)" }}>Why Anaheim Patients Make the Drive</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[{ icon: Star, title: "Multi-Specialty Under One Roof", desc: "Orthodontist, oral surgeon, periodontist, endodontist, and cosmetic dentist — all at one address. No referrals, no driving across OC." }, { icon: Shield, title: "Denti-Cal & PPO Accepted", desc: "We accept Denti-Cal, most PPO plans, and military insurance. Quality care shouldn't depend on your insurance card." }, { icon: Clock, title: "Same-Day Emergencies", desc: "Dental emergencies don't wait. We hold same-day slots for urgent cases — call and we'll fit you in today." }].map(item => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-[oklch(0.92_0.01_192)] text-center"><item.icon className="w-8 h-8 mx-auto mb-3" style={{ color: COLORS.teal }} /><h3 className="font-display font-bold text-lg mb-2" style={{ color: "oklch(0.22 0.07 192)" }}>{item.title}</h3><p className="font-body text-sm text-gray-500 leading-relaxed">{item.desc}</p></div>
              ))}
            </div>
            <div className="bg-white rounded-3xl p-8 border border-[oklch(0.92_0.01_192)]">
              <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "oklch(0.22 0.07 192)" }}>Serving Anaheim, Anaheim Hills & the Resort District</h2>
              <div className="font-body text-gray-600 leading-relaxed space-y-4 text-sm">
                <p>Anaheim is one of Orange County's most diverse cities — home to the Disneyland Resort, Angel Stadium, the Honda Center, and a thriving residential community spanning from the flatlands near the 5 Freeway to the hillside neighborhoods of Anaheim Hills. Patients traveling from Anaheim can use regional freeways to reach Uplift Dental & Orthodontics in Garden Grove.</p>
                <p>From central Anaheim, the 22 (Garden Grove Freeway) can be part of a route to our office at 5253 Lampson Ave in Garden Grove. From Anaheim Hills, routing can include the 91, 57, and 22. Current traffic conditions determine the best route. We're located near Lampson and Magnolia, with free parking directly in front.</p>
                <p>What makes Anaheim patients choose Uplift Dental over local options is our multi-specialty model. Instead of getting a referral and waiting weeks to see a specialist at a different office, our entire team — Dr. Clark Schneekluth (orthodontist), Dr. Joseph Youssef (board-certified oral surgeon), Dr. Erene Saad (periodontist), and Dr. Daniel Ghobrial (endodontist) — all practice at our Garden Grove location. One practice, one team, one familiar environment.</p>
                <p>For Anaheim families on Denti-Cal or Medi-Cal Dental, we're one of the few multi-specialty practices in Orange County that accepts Denti-Cal for general dentistry services. We believe every family deserves access to high-quality dental care, regardless of their insurance status.</p>
                <p>As a <strong>Platinum Invisalign Provider</strong>, Uplift Dental offers Invisalign consultations and digital planning for Anaheim teens, adults, and families. The team can discuss candidacy, planning, insurance questions, and available financing options during a consultation.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-center mb-10" style={{ color: "oklch(0.22 0.07 192)" }}>Services Available to Anaheim Patients</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[{ name: "Invisalign & Orthodontics", href: "/invisalign" }, { name: "Dental Implants", href: "/dental-implants" }, { name: "Emergency Dentistry", href: "/emergency-dentist" }, { name: "Teeth Whitening", href: "/teeth-whitening" }, { name: "Porcelain Veneers", href: "/veneers" }, { name: "Periodontics (Gum Care)", href: "/periodontics" }, { name: "Root Canal Therapy", href: "/endodontics" }, { name: "Wisdom Teeth Removal", href: "/wisdom-teeth-removal" }, { name: "Teeth Cleaning & Exams", href: "/teeth-cleaning" }].map(s => (
                <Link key={s.name} href={s.href} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[oklch(0.92_0.01_192)] hover:border-[oklch(0.42_0.09_192)] hover:bg-[oklch(0.97_0.01_192)] transition-all group"><CheckCircle className="w-4 h-4 shrink-0" style={{ color: COLORS.teal }} /><span className="font-body text-sm font-medium text-gray-700 group-hover:text-[oklch(0.42_0.09_192)] transition-colors">{s.name}</span><ChevronRight className="w-3.5 h-3.5 ml-auto text-gray-300 group-hover:text-[oklch(0.42_0.09_192)] transition-colors" /></Link>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-[oklch(0.98_0.005_192)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-center mb-10" style={{ color: "oklch(0.22 0.07 192)" }}>Questions from Anaheim Patients</h2>
            <div className="space-y-5">{FAQS.map(faq => (<div key={faq.q} className="bg-white rounded-2xl p-6 border border-[oklch(0.92_0.01_192)]"><h3 className="font-body font-semibold text-gray-800 mb-2">{faq.q}</h3><p className="font-body text-sm text-gray-500 leading-relaxed">{faq.a}</p></div>))}</div>
          </div>
        </section>
        <section className="py-16 text-center" style={{ backgroundColor: "oklch(0.22 0.07 192)" }}>
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-display text-3xl text-white font-bold mb-4">Ready to Visit from Anaheim?</h2>
            <p className="font-body text-white/75 mb-8">Consultations available · Denti-Cal accepted · Same-day emergencies when availability permits · Financing options</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" onClick={trackSchedule} className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white rounded-full font-body font-bold text-sm" style={{ color: "oklch(0.22 0.07 192)" }}>Book Free Consultation <ChevronRight className="w-4 h-4" /></Link>
              <a href={SMS.general} className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 border border-white/40 text-white rounded-full font-body font-bold text-sm"><MessageSquare className="w-4 h-4" /> Text Us</a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
