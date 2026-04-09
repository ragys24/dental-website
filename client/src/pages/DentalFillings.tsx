/* =============================================================
   UPLIFT DENTAL — Dental Fillings Page
   Design: "Elevated Warmth" — teal brand, DM Serif + DM Sans
   ============================================================= */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { CheckCircle2, Phone, Calendar, Stethoscope } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";

export default function DentalFillings() {
  return (
    <>
      <PageSEO
        title="Tooth-Colored Fillings in Garden Grove, CA | Composite Fillings | Uplift Dental"
        description="Get natural-looking tooth-colored composite fillings at Uplift Dental in Garden Grove, CA. Replace old silver amalgam fillings or treat new cavities. Call {PRACTICE.phone.display}."
        canonical="https://upliftdental.com/dental-fillings"
      />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Services", url: "https://upliftdental.com/services" },
          { name: "Dental Fillings", url: "https://upliftdental.com/dental-fillings" },
        ]} />
        <Navbar />

        {/* Hero */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
              Tooth-Colored Fillings<br />in Garden Grove, CA
            </h1>
            <p className="font-body text-white/85 text-xl leading-relaxed mb-10">
              At Uplift Dental, we use tooth-colored composite resin fillings that blend seamlessly with your natural teeth — no more dark metal spots when you smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-full font-body font-bold text-lg shadow-xl hover:bg-white/90 transition-all" style={{ color: COLORS.tealDark }}>
                <Phone className="w-5 h-5" /> Call {PRACTICE.phone.display}
              </a>
              <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 border-2 border-white/50 text-white rounded-full font-body font-bold text-lg hover:bg-white/30 transition-all">
                <Calendar className="w-5 h-5" /> Book Appointment
              </Link>
            </div>
          </div>
        </section>

        {/* Composite vs Amalgam */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl" style={{ color: COLORS.tealDark }}>Composite vs. Amalgam Fillings</h2>
              <p className="font-body text-gray-500 mt-4 text-lg">Why we exclusively use tooth-colored composite resin</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[oklch(0.97_0.008_192)] rounded-3xl p-8 border border-gray-100">
                <h3 className="font-display text-2xl mb-2" style={{ color: COLORS.teal }}>Composite Resin (Tooth-Colored)</h3>
                <p className="font-body text-sm text-gray-500 mb-6">What we use at Uplift Dental</p>
                <ul className="space-y-3">
                  {[
                    "Matches your natural tooth color exactly",
                    "Bonds directly to tooth structure — less drilling",
                    "Preserves more healthy tooth structure",
                    "No mercury content",
                    "Less sensitivity to temperature changes",
                    "Can be used for small to medium cavities",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-gray-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.teal }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                <h3 className="font-display text-2xl mb-2 text-gray-600">Amalgam (Silver/Metal)</h3>
                <p className="font-body text-sm text-gray-400 mb-6">Traditional option we no longer use</p>
                <ul className="space-y-3">
                  {[
                    "Dark silver color — visible when you smile",
                    "Requires more tooth removal for placement",
                    "Contains mercury (though considered safe by ADA)",
                    "Can cause tooth to crack over time from expansion",
                    "Greater temperature sensitivity",
                    "Not suitable for visible front teeth",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-gray-500 text-sm">
                      <div className="w-4 h-4 flex-shrink-0 rounded-full border-2 border-gray-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Signs You Need a Filling */}
        <section className="py-20 bg-[oklch(0.97_0.008_192)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl mb-6" style={{ color: COLORS.tealDark }}>Signs You May Need a Filling</h2>
                <div className="space-y-4">
                  {[
                    { title: "Tooth Sensitivity", desc: "Sharp pain when eating sweet, hot, or cold foods can indicate a cavity or cracked tooth." },
                    { title: "Visible Dark Spots", desc: "Brown or black spots on tooth surfaces are often signs of decay that need treatment." },
                    { title: "Toothache", desc: "Persistent or intermittent tooth pain, especially when biting, often signals a cavity." },
                    { title: "Rough or Jagged Edges", desc: "If you feel a rough spot on a tooth with your tongue, it may be a chip or cavity." },
                    { title: "Old Filling Issues", desc: "Existing fillings can crack, fall out, or develop decay around the edges and need replacement." },
                    { title: "No Symptoms at All", desc: "Many cavities cause no pain in early stages — which is why regular checkups are so important." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.teal }} />
                      <div>
                        <p className="font-body font-semibold text-gray-800 text-sm">{item.title}</p>
                        <p className="font-body text-gray-500 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="font-display text-2xl mb-6" style={{ color: COLORS.tealDark }}>The Filling Process</h3>
                <div className="space-y-5">
                  {[
                    { step: "1", title: "Exam & X-ray", desc: "We identify the cavity and assess its size and depth." },
                    { step: "2", title: "Anesthesia", desc: "Local anesthesia numbs the area so you feel no discomfort." },
                    { step: "3", title: "Decay Removal", desc: "We gently remove the decayed portion of the tooth." },
                    { step: "4", title: "Filling Placement", desc: "Composite resin is applied in layers, shaped, and hardened with a curing light." },
                    { step: "5", title: "Polish & Bite Check", desc: "The filling is polished and your bite is checked for comfort." },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-4">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-body font-bold text-xs text-white" style={{ backgroundColor: COLORS.teal }}>
                        {s.step}
                      </div>
                      <div>
                        <p className="font-body font-semibold text-gray-800 text-sm">{s.title}</p>
                        <p className="font-body text-gray-500 text-xs mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Replace Old Fillings */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-4xl mb-6" style={{ color: COLORS.tealDark }}>Replace Your Old Silver Fillings</h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-8">
              If you have old amalgam (silver) fillings that are cracked, leaking, or simply bothering you aesthetically, we can safely remove them and replace them with natural-looking composite fillings. Many patients are surprised by how much better their smile looks after replacing just a few old metal fillings.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-lg text-white hover:opacity-90 transition-all" style={{ backgroundColor: COLORS.teal }}>
              <Calendar className="w-5 h-5" /> Schedule a Filling Replacement
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl text-white mb-4">Treat Cavities Before They Get Worse</h2>
            <p className="font-body text-white/75 text-lg mb-8">Cavities don't heal on their own — they grow deeper and more expensive to treat. Our tooth-colored composite fillings blend with your natural teeth and are completed in a single visit. We remove old silver amalgam fillings too, replacing them with modern, natural-looking restorations. Don't wait — call to schedule your filling today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-full font-body font-bold text-lg" style={{ color: COLORS.tealDark }}>
                <Phone className="w-5 h-5" /> Call {PRACTICE.phone.display}
              </a>
              <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 border-2 border-white/50 text-white rounded-full font-body font-bold text-lg hover:bg-white/30 transition-all">
                Book Online
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center mb-12" style={{ color: COLORS.tealDark }}>Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div key="{0}" className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">How long do composite (tooth-colored) fillings last?</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">Composite fillings typically last 7–10 years with proper care. Their longevity depends on the size and location of the filling, your bite, and your oral hygiene habits. Fillings on back teeth that bear heavy chewing forces may wear faster than those on front teeth.</p>
                </div>
              <div key="{1}" className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">Do I need a filling if my tooth doesn't hurt?</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">Yes — many cavities cause no pain until they reach the nerve. By the time a tooth hurts, the decay is often advanced and may require a root canal instead of a simple filling. That's why regular X-rays are essential for catching decay early, when a small filling is all that's needed.</p>
                </div>
              <div key="{2}" className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">Can you replace my old silver (amalgam) fillings with tooth-colored ones?</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">Absolutely. We routinely replace old amalgam fillings with natural-looking composite resin. The old filling is removed, the area is cleaned, and the composite is bonded and shaped to match your tooth. The result is virtually invisible.</p>
                </div>
              <div key="{3}" className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">How long does getting a filling take?</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">Most fillings are completed in a single appointment of 30–60 minutes, depending on the size and location of the cavity. We use local anesthesia so you won't feel discomfort during the procedure.</p>
                </div>
              <div key="{4}" className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">Does insurance cover fillings?</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">Most dental insurance plans cover composite fillings on front teeth and amalgam fillings on back teeth. Coverage for tooth-colored fillings on molars varies by plan. We'll verify your benefits before treatment and explain your out-of-pocket cost upfront.</p>
                </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
