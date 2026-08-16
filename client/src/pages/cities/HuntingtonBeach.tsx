/* =============================================================
   UPLIFT DENTAL — Huntington Beach Landing Page
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
  { q: "How do I get to Uplift Dental from Huntington Beach?", a: `From Huntington Beach, Beach Boulevard (Hwy 39) can connect to Garden Grove. Another route may use the 405 and 22. Current traffic and your starting point determine the best route. Our office at ${PRACTICE.address.full} has free parking directly in front.` },
  { q: "Do you accept Denti-Cal patients from Huntington Beach?", a: "Yes! We accept Denti-Cal, most PPO plans, and military/Tricare insurance. Many HB patients choose us because we combine Denti-Cal acceptance with advanced technology and specialist-level care all under one roof." },
  { q: "Can I get same-day emergency dental care if I'm in Huntington Beach?", a: `We offer same-day emergency appointments when availability permits. Call ${PRACTICE.phone.display} or text ${PRACTICE.sms.display} for urgent dental needs so the office can confirm the next appropriate step.` },
  { q: "Why do Huntington Beach patients choose Uplift Dental?", a: "Huntington Beach patients can visit Uplift Dental for a multi-specialty model that includes orthodontics, oral surgery, periodontics, and endodontics in one Garden Grove office. We are a Platinum Invisalign Provider and accept Denti-Cal." },
  { q: "Do you offer Invisalign for Huntington Beach patients?", a: "Yes. Uplift Dental is a Platinum Invisalign Provider and offers consultations and digital planning. The team can discuss candidacy, treatment options, insurance questions, and financing options." },
];

import LocalAreaPage from "../LocalAreaPage";
export default function HuntingtonBeach() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) };
  return (
    <>
      <PageSEO title="Dentist Near Huntington Beach, CA | Uplift Dental in Garden Grove" description="Huntington Beach patients can visit Uplift Dental in Garden Grove for general, specialty, and Invisalign care. Denti-Cal and PPO questions welcome." canonical="https://upliftdental.com/dentist-near-huntington-beach" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <div className="min-h-screen bg-white">
        <section className="py-20" style={{ background: "linear-gradient(135deg, oklch(0.14 0.04 192) 0%, oklch(0.22 0.07 192) 100%)" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body font-semibold mb-5" style={{ background: "oklch(0.42 0.09 192 / 0.3)", color: "oklch(0.85 0.08 192)", border: "1px solid oklch(0.42 0.09 192 / 0.4)" }}><MapPin className="w-3.5 h-3.5" /> Garden Grove office accessible from Huntington Beach</div>
              <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-5 leading-tight">Your Dentist Near<br /><span style={{ color: "oklch(0.70 0.07 195)" }}>Huntington Beach, CA</span></h1>
              <p className="font-body text-white/80 text-lg leading-relaxed mb-7">Surf City residents trust Uplift Dental & Orthodontics for multi-specialty dental care just up Beach Blvd in Garden Grove. Platinum Invisalign Provider, Denti-Cal accepted, same-day emergencies — no referrals needed.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-full font-body font-bold text-sm" style={{ color: "oklch(0.22 0.07 192)" }}><Phone className="w-4 h-4" /> {PRACTICE.phone.display}</a>
                <Link href="/contact" onClick={trackSchedule} className="flex items-center justify-center gap-2 px-6 py-3 bg-white/15 border border-white/40 text-white rounded-full font-body font-bold text-sm"><MessageSquare className="w-4 h-4" /> Book Free Consult</Link>
              </div>
            </div>
            <div className="hidden lg:block bg-white/10 rounded-3xl p-6 border border-white/20">
              <h3 className="font-display text-xl text-white mb-4">Directions from Huntington Beach</h3>
              {[{ step: "1", text: "Head north on Beach Blvd (Hwy 39) from central HB" }, { step: "2", text: "Continue north through Westminster into Garden Grove" }, { step: "3", text: "Turn right on Lampson Ave" }, { step: "4", text: "Arrive at 5253 Lampson Ave — free parking in front" }].map(s => (
                <div key={s.step} className="flex items-start gap-3 mb-3"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "oklch(0.42 0.09 192)", color: "white" }}>{s.step}</span><p className="font-body text-white/80 text-sm">{s.text}</p></div>
              ))}
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2 text-white/70 text-sm font-body"><Car className="w-4 h-4" /> Use current navigation for your route and travel time</div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-[oklch(0.98_0.005_192)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-center mb-10" style={{ color: "oklch(0.22 0.07 192)" }}>Why Huntington Beach Patients Make the Drive</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[{ icon: Star, title: "Multi-Specialty Under One Roof", desc: "Orthodontist, oral surgeon, periodontist, endodontist, and cosmetic dentist — all at one address. No referrals, no driving across OC." }, { icon: Shield, title: "Denti-Cal & PPO Accepted", desc: "We accept Denti-Cal, most PPO plans, and military insurance. Quality care shouldn't depend on your insurance card." }, { icon: Clock, title: "Same-Day Emergencies", desc: "Dental emergencies don't wait. We hold same-day slots for urgent cases — call and we'll fit you in today." }].map(item => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-[oklch(0.92_0.01_192)] text-center"><item.icon className="w-8 h-8 mx-auto mb-3" style={{ color: COLORS.teal }} /><h3 className="font-display font-bold text-lg mb-2" style={{ color: "oklch(0.22 0.07 192)" }}>{item.title}</h3><p className="font-body text-sm text-gray-500 leading-relaxed">{item.desc}</p></div>
              ))}
            </div>
            <div className="bg-white rounded-3xl p-8 border border-[oklch(0.92_0.01_192)]">
              <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "oklch(0.22 0.07 192)" }}>Serving Huntington Beach, Fountain Valley & Surf City Families</h2>
              <div className="font-body text-gray-600 leading-relaxed space-y-4 text-sm">
                <p>Huntington Beach — Surf City USA — is home to some of Orange County's most active, health-conscious families. Whether you're a surfer who's chipped a tooth, a parent looking for Invisalign for your teenager, or a senior in need of dental implants, Uplift Dental & Orthodontics is just a short drive up Beach Blvd from anywhere in HB.</p>
                <p>We serve patients from all corners of Huntington Beach — from neighborhoods near Pacific Coast Highway and Main Street, to inland communities near Goldenwest College, to families in the Newland area near the 405 Freeway. Beach Blvd (Highway 39) connects Huntington Beach directly to Garden Grove, making our office one of the most accessible multi-specialty dental practices for HB residents.</p>
                <p>Uplift Dental offers a multi-specialty model in one Garden Grove office. Dr. Clark Schneekluth (orthodontist), Dr. Joseph Youssef (board-certified oral surgeon), Dr. Erene Saad (periodontist), and Dr. Daniel Ghobrial (endodontist) practice at the Garden Grove location. The team can help coordinate appropriate next steps for patients visiting from Huntington Beach.</p>
                <p>We're also proud to be a <strong>Platinum Invisalign Provider</strong>. Huntington Beach teens, adults, and families can ask about Invisalign consultations, digital planning, insurance questions, and available financing options. We use the iTero Element scanner for digital impressions.</p>
                <p>For Huntington Beach families on Denti-Cal or Medi-Cal Dental, we're one of the few practices in the area that accepts Denti-Cal while offering the same advanced technology and specialist-level care as private-pay practices. Every patient — regardless of insurance — receives the same attentive, thorough care.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-center mb-10" style={{ color: "oklch(0.22 0.07 192)" }}>Services Available to Huntington Beach Patients</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[{ name: "Invisalign & Orthodontics", href: "/invisalign" }, { name: "Dental Implants", href: "/dental-implants" }, { name: "Emergency Dentistry", href: "/emergency-dentist" }, { name: "Teeth Whitening", href: "/teeth-whitening" }, { name: "Porcelain Veneers", href: "/veneers" }, { name: "Periodontics (Gum Care)", href: "/periodontics" }, { name: "Root Canal Therapy", href: "/endodontics" }, { name: "Wisdom Teeth Removal", href: "/wisdom-teeth-removal" }, { name: "Teeth Cleaning & Exams", href: "/teeth-cleaning" }].map(s => (
                <Link key={s.name} href={s.href} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[oklch(0.92_0.01_192)] hover:border-[oklch(0.42_0.09_192)] hover:bg-[oklch(0.97_0.01_192)] transition-all group"><CheckCircle className="w-4 h-4 shrink-0" style={{ color: COLORS.teal }} /><span className="font-body text-sm font-medium text-gray-700 group-hover:text-[oklch(0.42_0.09_192)] transition-colors">{s.name}</span><ChevronRight className="w-3.5 h-3.5 ml-auto text-gray-300 group-hover:text-[oklch(0.42_0.09_192)] transition-colors" /></Link>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-[oklch(0.98_0.005_192)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-center mb-10" style={{ color: "oklch(0.22 0.07 192)" }}>Questions from Huntington Beach Patients</h2>
            <div className="space-y-5">{FAQS.map(faq => (<div key={faq.q} className="bg-white rounded-2xl p-6 border border-[oklch(0.92_0.01_192)]"><h3 className="font-body font-semibold text-gray-800 mb-2">{faq.q}</h3><p className="font-body text-sm text-gray-500 leading-relaxed">{faq.a}</p></div>))}</div>
          </div>
        </section>
        <section className="py-16 text-center" style={{ backgroundColor: "oklch(0.22 0.07 192)" }}>
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-display text-3xl text-white font-bold mb-4">Ready to Visit from Huntington Beach?</h2>
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
