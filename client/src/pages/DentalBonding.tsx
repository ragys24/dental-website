/* =============================================================
   UPLIFT DENTAL — Dental Bonding Page
   Design: "Elevated Warmth" — teal brand, DM Serif + DM Sans
   ============================================================= */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { Wand2, CheckCircle2, Phone, Calendar } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";

export default function DentalBonding() {
  return (
    <>
      <PageSEO
        title="Dental Bonding in Garden Grove, CA | Tooth Bonding | Uplift Dental"
        description="Fix chips, cracks, and gaps with dental bonding at Uplift Dental in Garden Grove, CA. Affordable cosmetic dentistry completed in one visit. Call {PRACTICE.phone.display}."
        canonical="https://upliftdental.com/dental-bonding"
      />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Services", url: "https://upliftdental.com/services" },
          { name: "Dental Bonding", url: "https://upliftdental.com/dental-bonding" },
        ]} />
        <Navbar />

        {/* Hero */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
              Dental Bonding<br />in Garden Grove, CA
            </h1>
            <p className="font-body text-white/85 text-xl leading-relaxed mb-10">
              Dental bonding is one of the most affordable and versatile cosmetic treatments available — fixing chips, cracks, gaps, and discoloration in a single appointment with no anesthesia required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-full font-body font-bold text-lg shadow-xl hover:bg-white/90 transition-all" style={{ color: COLORS.tealDark }}>
                <Phone className="w-5 h-5" /> Call {PRACTICE.phone.display}
              </a>
              <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 border-2 border-white/50 text-white rounded-full font-body font-bold text-lg hover:bg-white/30 transition-all">
                <Calendar className="w-5 h-5" /> Book Free Consult
              </Link>
            </div>
          </div>
        </section>

        {/* What Is Bonding */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl mb-6" style={{ color: COLORS.tealDark }}>What Is Dental Bonding?</h2>
                <p className="font-body text-gray-600 leading-relaxed mb-5">
                  Dental bonding uses a tooth-colored composite resin material that is applied directly to the tooth, sculpted to the desired shape, hardened with a special light, and polished to a natural finish — all in one visit.
                </p>
                <p className="font-body text-gray-600 leading-relaxed mb-8">
                  It's one of the least invasive cosmetic procedures available. In most cases, no enamel removal or anesthesia is needed, making it an excellent first step for patients looking to improve their smile affordably.
                </p>
                <div className="space-y-3">
                  {[
                    "Completed in 30–60 minutes per tooth",
                    "No anesthesia needed in most cases",
                    "Minimal to no enamel removal",
                    "Matched precisely to your tooth color",
                    "Lasts 5–10 years with proper care",
                    "Easily repaired if chipped",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3 font-body text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.teal }} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[oklch(0.97_0.008_192)] rounded-3xl p-8">
                <h3 className="font-display text-2xl mb-6" style={{ color: COLORS.tealDark }}>What Can Bonding Fix?</h3>
                <div className="space-y-4">
                  {[
                    { title: "Chipped Teeth", desc: "Restore the natural shape of a chipped tooth in a single appointment." },
                    { title: "Cracked Teeth", desc: "Cover minor cracks to prevent sensitivity and improve appearance." },
                    { title: "Gaps Between Teeth", desc: "Close small spaces between teeth without braces." },
                    { title: "Discolored Teeth", desc: "Cover intrinsic stains that whitening can't address." },
                    { title: "Short or Uneven Teeth", desc: "Lengthen or reshape teeth for a more balanced smile." },
                    { title: "Exposed Tooth Roots", desc: "Protect sensitive root surfaces exposed by gum recession." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: COLORS.teal }} />
                      <div>
                        <p className="font-body font-semibold text-gray-800 text-sm">{item.title}</p>
                        <p className="font-body text-gray-500 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bonding vs Veneers */}
        <section className="py-20 bg-[oklch(0.97_0.008_192)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center mb-12" style={{ color: COLORS.tealDark }}>Dental Bonding vs. Veneers</h2>
            <div className="overflow-x-auto">
              <table className="w-full font-body text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-6 font-semibold text-gray-700">Feature</th>
                    <th className="text-left py-3 pr-6 font-semibold" style={{ color: COLORS.teal }}>Bonding</th>
                    <th className="text-left py-3 font-semibold text-gray-700">Veneers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Cost", "Lower", "Higher"],
                    ["Visits needed", "1 visit", "2–3 visits"],
                    ["Enamel removal", "Minimal/none", "Small amount"],
                    ["Lifespan", "5–10 years", "10–20 years"],
                    ["Stain resistance", "Moderate", "High (porcelain)"],
                    ["Best for", "Minor corrections", "Major smile makeovers"],
                  ].map(([feature, bonding, veneer]) => (
                    <tr key={feature}>
                      <td className="py-3 pr-6 text-gray-600 font-medium">{feature}</td>
                      <td className="py-3 pr-6" style={{ color: COLORS.teal }}>{bonding}</td>
                      <td className="py-3 text-gray-600">{veneer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-body text-gray-500 text-sm mt-6 text-center">Not sure which is right for you? Book a free consultation and we'll recommend the best option for your goals and budget.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center mb-12" style={{ color: COLORS.tealDark }}>Bonding FAQs</h2>
            <div className="space-y-6">
              {[
                { q: "Does dental bonding hurt?", a: "In most cases, no anesthesia is needed and the procedure is completely painless. If bonding is being used to fill a cavity or near the gum line, a small amount of local anesthetic may be used." },
                { q: "How do I care for bonded teeth?", a: "Treat bonded teeth like natural teeth — brush twice daily, floss, and avoid biting hard objects like ice or fingernails. Limit coffee, tea, and red wine in the first 48 hours after bonding to prevent staining." },
                { q: "Can bonding be whitened?", a: "Composite resin doesn't respond to whitening treatments. If you're planning to whiten your teeth, do so before bonding so we can match the resin to your desired shade." },
                { q: "How long does bonding last?", a: "Dental bonding typically lasts 5–10 years depending on location, bite forces, and care habits. It can be easily touched up or replaced when needed." },
              ].map((faq) => (
                <div key={faq.q} className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">{faq.q}</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl text-white mb-4">Fix Your Smile in One Visit</h2>
            <p className="font-body text-white/75 text-lg mb-8">Dental bonding is the quickest, most affordable way to fix minor cosmetic issues — chipped teeth, small gaps, and discoloration. Completed in one visit with no prep or anesthesia needed, bonding is perfect for patients who want instant results without the cost of veneers. Schedule your free consultation today and see your new smile.</p>
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

        <Footer />
      </div>
    </>
  );
}
