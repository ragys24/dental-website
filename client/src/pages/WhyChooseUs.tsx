/* ============================================================
   UPLIFT DENTAL — Why Choose Us (Comparison Page)
   AI SEO optimized: comparison tables, structured data, self-contained
   answer blocks for AI citation. Targets "best dentist in Garden Grove"
   and "dentist near me Garden Grove" queries.
   ============================================================= */
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { CheckCircle2, Phone, Clock, Shield, Award, ExternalLink } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";
import { trackSchedule } from "@/lib/tracking";
import { REVIEW_SOURCES } from "@/lib/review-sources";

const COMPARISON_FAQS = [
  { question: "What makes Uplift Dental different from other dentists in Garden Grove?", answer: "Uplift Dental brings general dentistry, orthodontics, periodontics, endodontics, and oral-surgery services together in its Garden Grove practice. Patients can ask the team about Platinum Invisalign Provider care, third-Saturday hours, same-day emergency availability, Denti-Cal, and financing options." },
  { question: "Does Uplift Dental accept Denti-Cal in Garden Grove?", answer: "Yes. Uplift Dental accepts Denti-Cal (Medi-Cal dental), many PPO insurance plans, and military insurance (TRICARE). The team can also discuss CareCredit, Cherry, and available payment options." },
  { question: "Is there a dentist open on Saturday in Garden Grove?", answer: "Yes. Uplift Dental & Orthodontics is open the 3rd Saturday of every month from 9am to 2pm. Regular weekday hours are Monday through Friday, 9am to 5pm. Most other dental offices in Garden Grove are closed on weekends." },
  { question: "Can I get same-day emergency dental care in Garden Grove?", answer: "Uplift Dental offers same-day emergency appointments when availability permits for urgent dental concerns. Call (714) 898-3308 or text (888) 895-5908 so the office can confirm the next appropriate step." },
  { question: "How much does a dental visit cost at Uplift Dental?", answer: "Costs vary with the visit, recommended treatment, and insurance benefits. The Uplift team can review the relevant options and provide an estimate before treatment is scheduled." },
];

export default function WhyChooseUs() {
  return (
    <>
      <PageSEO
        title="Best Dentist in Garden Grove CA | Why Choose Uplift Dental"
        description="Learn about Uplift Dental & Orthodontics in Garden Grove, including multi-specialty care, Saturday hours, Denti-Cal support, same-day emergency availability, and secure booking."
        canonical="https://upliftdental.com/why-choose-us"
      />
      <FAQSchema faqs={COMPARISON_FAQS} id="ld-faq-comparison" />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com/" },
        { name: "Why Choose Us", url: "https://upliftdental.com/why-choose-us" },
      ]} />

      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.73 0.07 200)" }}>Multi-Specialty Care in Garden Grove</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Best Dentist in Garden Grove, CA
            </h1>
            <p className="font-body text-white/75 text-xl max-w-3xl mx-auto mb-8">
              Uplift Dental & Orthodontics brings orthodontic, periodontal, endodontic, oral-surgery, and general-dentistry care together in one Garden Grove practice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" onClick={trackSchedule} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-lg text-white transition-all hover:shadow-xl hover:scale-105" style={{ backgroundColor: COLORS.teal }}>
                Book Free Consultation
              </Link>
              <a href={PRACTICE.phone.tel} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-lg text-white border-2 border-white/30 hover:bg-white/10 transition-all">
                <Phone className="w-5 h-5" /> {PRACTICE.phone.display}
              </a>
            </div>
          </div>
        </section>

        {/* Definition Block — optimized for "What is the best dentist in Garden Grove" AI extraction */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none font-body">
              <h2 className="font-display text-3xl font-bold mb-6" style={{ color: COLORS.tealDark }}>Why Patients Choose Uplift Dental Over Other Garden Grove Dentists</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Uplift Dental & Orthodontics</strong> is a multi-specialty dental practice at 5253 Lampson Ave, Garden Grove, CA 92845. Its team includes general dentistry, orthodontics, periodontics, endodontics, and oral-surgery services, so patients can discuss many dental needs with one office.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Practice highlights include Platinum Invisalign Provider status, third-Saturday hours, same-day emergency availability, and support for Denti-Cal, PPO, and military insurance. Coverage and appointment availability should always be confirmed with the office.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table — structured for AI extraction */}
        <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.005 192)" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-center mb-4" style={{ color: COLORS.tealDark }}>What Uplift Dental Offers</h2>
            <p className="font-body text-gray-500 text-center mb-10 max-w-2xl mx-auto">Verified practice features patients can discuss with the Garden Grove team.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead>
                  <tr style={{ backgroundColor: COLORS.tealDark }}>
                    <th className="text-left px-6 py-4 font-body font-semibold text-white text-sm">Feature</th>
                    <th className="text-center px-6 py-4 font-body font-semibold text-white text-sm">At Uplift Dental</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { feature: "Coordinated care", uplift: "General dentistry and on-site specialty services" },
                    { feature: "Invisalign", uplift: "Platinum Provider" },
                    { feature: "Saturday hours", uplift: "Third Saturday, 9am–2pm" },
                    { feature: "Emergency care", uplift: "Same-day availability when scheduling permits" },
                    { feature: "Coverage support", uplift: "Denti-Cal, PPO, and military insurance support" },
                    { feature: "Consultations", uplift: "Ask about Invisalign, implant, and cosmetic consultation options" },
                    { feature: "Financing", uplift: "CareCredit, Cherry, and in-house options for eligible patients" },
                    { feature: "Digital dentistry", uplift: "3D imaging, iTero scanning, and SprintRay technology" },
                    { feature: "Secure booking", uplift: "Online patient portal and direct office support" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-4 font-body font-medium text-sm text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-green-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          {row.uplift}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-body text-xs text-gray-400 text-center mt-4">Offerings, coverage, and availability should be confirmed directly with the office.</p>
          </div>
        </section>

        {/* Stats Section — authority signals for AI */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-center mb-12" style={{ color: COLORS.tealDark }}>By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: Award, stat: "Platinum", label: "Invisalign Provider" },
                  { icon: Shield, stat: "Denti-Cal", label: "Coverage Support" },
                  { icon: Clock, stat: "3rd Sat", label: "Monthly Hours" },
                  { icon: Clock, stat: "Same Day", label: "Emergency Availability" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${COLORS.teal}15` }}>
                    <item.icon className="w-7 h-7" style={{ color: COLORS.teal }} />
                  </div>
                  <p className="font-display text-3xl font-bold" style={{ color: COLORS.tealDark }}>{item.stat}</p>
                  <p className="font-body text-sm text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.005 192)" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-center mb-4" style={{ color: COLORS.tealDark }}>All Dental Specialties Under One Roof</h2>
            <p className="font-body text-gray-500 text-center mb-10 max-w-2xl mx-auto">No referrals needed. Every specialist is here, in our Garden Grove office.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Dr. Ragy Stefan", title: "General & Cosmetic Dentist", desc: "Cleanings, fillings, crowns, veneers, whitening, and smile makeovers." },
                { name: "Dr. Clark Schneekluth", title: "Orthodontist", desc: "Invisalign (Platinum Provider), metal braces, clear braces, and early intervention." },
                { name: "Dr. Joseph Youssef", title: "Oral Surgeon", desc: "Dental implants, wisdom teeth removal, bone grafting, and extractions." },
                { name: "Dr. Erene Saad", title: "Periodontist", desc: "LANAP laser gum therapy, scaling & root planing, gum grafting." },
                { name: "Dr. Daniel Ghobrial", title: "Endodontist", desc: "Root canal therapy, retreatment, and apicoectomy with advanced microscopy." },
                { name: "Pediatric Team", title: "Children's Dentistry", desc: "Kid-friendly exams, sealants, fluoride treatments, and early orthodontic evaluation." },
              ].map((doc) => (
                <div key={doc.name} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <p className="font-display font-bold text-base" style={{ color: COLORS.tealDark }}>{doc.name}</p>
                  <p className="font-body text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: COLORS.teal }}>{doc.title}</p>
                  <p className="font-body text-sm text-gray-600 mt-3 leading-relaxed">{doc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-center mb-4" style={{ color: COLORS.tealDark }}>Insurance & Affordability</h2>
            <p className="font-body text-gray-500 text-center mb-10 max-w-2xl mx-auto">We accept more insurance plans than most Garden Grove dentists — including Denti-Cal and military insurance.</p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-xl border border-gray-100">
                <Shield className="w-8 h-8 mx-auto mb-3" style={{ color: COLORS.teal }} />
                <p className="font-display font-bold text-sm" style={{ color: COLORS.tealDark }}>Denti-Cal</p>
                <p className="font-body text-xs text-gray-500 mt-1">Full Medi-Cal dental coverage accepted</p>
              </div>
              <div className="text-center p-6 rounded-xl border border-gray-100">
                <Shield className="w-8 h-8 mx-auto mb-3" style={{ color: COLORS.teal }} />
                <p className="font-display font-bold text-sm" style={{ color: COLORS.tealDark }}>PPO Insurance</p>
                <p className="font-body text-xs text-gray-500 mt-1">Delta Dental, MetLife, Cigna, Aetna, Anthem, United Healthcare</p>
              </div>
              <div className="text-center p-6 rounded-xl border border-gray-100">
                <Shield className="w-8 h-8 mx-auto mb-3" style={{ color: COLORS.teal }} />
                <p className="font-display font-bold text-sm" style={{ color: COLORS.tealDark }}>Military</p>
                <p className="font-body text-xs text-gray-500 mt-1">TRICARE and United Concordia accepted</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.005 192)" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-center mb-10" style={{ color: COLORS.tealDark }}>Frequently Asked Questions</h2>
            <div className="space-y-5">
              {COMPARISON_FAQS.map((item) => (
                <div key={item.question} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-display text-base font-bold mb-2" style={{ color: COLORS.tealDark }}>{item.question}</h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16" style={{ backgroundColor: COLORS.teal }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Experience the Difference?</h2>
            <p className="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto">Explore current independent patient feedback, then contact the team to discuss your dental needs and consultation options.</p>
            <a href={REVIEW_SOURCES.google.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mb-6 font-body text-sm font-semibold text-white underline underline-offset-4">
              {REVIEW_SOURCES.google.label} <ExternalLink className="w-4 h-4" />
            </a>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" onClick={trackSchedule} className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base transition-all hover:shadow-xl hover:scale-105 active:scale-95 bg-white" style={{ color: COLORS.tealDark }}>
                Book Free Consultation
              </Link>
              <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-white border-2 border-white/40 transition-all hover:bg-white/10">
                <Phone className="w-5 h-5" /> Call {PRACTICE.phone.display}
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
