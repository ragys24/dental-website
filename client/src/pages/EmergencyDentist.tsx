import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Link } from "wouter";
import { Phone, Zap, CheckCircle2, Clock, ChevronRight, MessageSquare } from "lucide-react";
import { PRACTICE } from "@/lib/constants";
import { SMS } from "@/lib/sms";

export default function EmergencyDentist() {
  return (
    <>
      <PageSEO
        title="Emergency Dentist in Garden Grove, CA | Same-Day Care | Uplift Dental"
        description={`Need an emergency dentist in Garden Grove, CA? Uplift Dental offers same-day emergency appointments for toothaches, broken teeth, lost crowns, and more. Call ${PRACTICE.phone.display} now.`}
        canonical="https://upliftdental.com/emergency-dentist"
      />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com/" },
        { name: "Services", url: "https://upliftdental.com/services" },
        { name: "Emergency Dentist", url: "https://upliftdental.com/emergency-dentist" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.65 0.18 35)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
            Emergency Dentist<br />in Garden Grove, CA
          </h1>
          <p className="font-body text-white/85 text-xl leading-relaxed mb-10">
            Dental emergencies don't wait. Neither do we. Call Uplift Dental for same-day emergency dental appointments in Garden Grove, CA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[oklch(0.65_0.18_35)] rounded-full font-body font-bold text-lg shadow-xl hover:bg-white/90 transition-all">
              <Phone className="w-5 h-5" />
              Call Now: {PRACTICE.phone.display}
            </a>
            <a href={SMS.general} className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 border-2 border-white/50 text-white rounded-full font-body font-bold text-lg hover:bg-white/30 transition-all">
              <MessageSquare className="w-5 h-5" />
              Text Us Now
            </a>
          </div>
          <p className="font-body text-white/60 text-sm mt-6">
            <Clock className="w-4 h-4 inline mr-1" />
            Mon–Fri: 9am–5pm · 3rd Saturday: 9am–2pm
          </p>
        </div>
      </section>

      {/* Emergencies We Treat */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl text-[oklch(0.18_0.04_185)]">Dental Emergencies We Treat</h2>
            <p className="font-body text-[oklch(0.45_0.04_185)] mt-4">Call us immediately if you're experiencing any of the following:</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Severe Toothache", desc: "Intense, persistent tooth pain that doesn't go away — often a sign of infection or abscess requiring urgent treatment." },
              { title: "Knocked-Out Tooth", desc: "Keep the tooth moist (in milk or saliva) and call us immediately. Time is critical for saving a knocked-out tooth." },
              { title: "Broken or Cracked Tooth", desc: "A fractured tooth can expose nerves and cause severe pain. We'll assess and repair it same-day when possible." },
              { title: "Lost Filling or Crown", desc: "A lost filling or crown leaves your tooth vulnerable. We'll replace it quickly to prevent further damage." },
              { title: "Dental Abscess", desc: "A painful infection that can spread if untreated. Signs include swelling, fever, and throbbing pain." },
              { title: "Soft Tissue Injuries", desc: "Cuts or lacerations to the gums, lips, or tongue from dental trauma that require prompt attention." },
            ].map((item) => (
              <div key={item.title} className="bg-[oklch(0.97_0.008_85)] rounded-2xl p-6 border border-[oklch(0.90_0.015_185)]">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "oklch(0.65 0.18 35 / 0.1)" }}>
                  <Zap className="w-4 h-4" style={{ color: "oklch(0.65 0.18 35)" }} />
                </div>
                <h3 className="font-display text-lg text-[oklch(0.18_0.04_185)] mb-2">{item.title}</h3>
                <p className="font-body text-sm text-[oklch(0.45_0.04_185)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Do */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-[oklch(0.18_0.04_185)] text-center mb-12">What to Do in a Dental Emergency</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Stay Calm", desc: "Take a deep breath. Most dental emergencies are treatable — especially when addressed quickly." },
              { step: "2", title: "Call Uplift Dental Immediately", desc: `Call ${PRACTICE.phone.display} or text us. We'll assess your situation and schedule a same-day appointment when available.` },
              { step: "3", title: "Manage Pain Temporarily", desc: "Take over-the-counter pain relievers (ibuprofen or acetaminophen) as directed. Apply a cold compress for swelling." },
              { step: "4", title: "Preserve Any Broken Pieces", desc: "If a tooth or piece breaks off, keep it in milk or saliva and bring it to your appointment." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 bg-white rounded-2xl p-6 border border-[oklch(0.90_0.015_185)]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-white" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display text-lg text-[oklch(0.18_0.04_185)] mb-1">{item.title}</h3>
                  <p className="font-body text-sm text-[oklch(0.45_0.04_185)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: "oklch(0.65 0.18 35)" }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-4xl text-white mb-4">Don't Wait — Call Now</h2>
          <p className="font-body text-white/80 mb-8">Same-day emergency appointments available. Serving Garden Grove, Anaheim, Westminster, Seal Beach, Los Alamitos, Huntington Beach, and all of Orange County.</p>
          <a href={PRACTICE.phone.tel} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[oklch(0.65_0.18_35)] rounded-full font-body font-bold text-lg shadow-xl hover:bg-white/90 transition-all">
            <Phone className="w-5 h-5" />
            Call {PRACTICE.phone.display}
          </a>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
