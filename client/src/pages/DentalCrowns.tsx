/* =============================================================
   UPLIFT DENTAL — Dental Crowns Page
   Design: "Elevated Warmth" — teal brand, DM Serif + DM Sans
   ============================================================= */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { Shield, CheckCircle2, Phone, Calendar } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";

export default function DentalCrowns() {
  return (
    <>
      <PageSEO
        title="Dental Crowns in Garden Grove, CA | Same-Day Crowns | Uplift Dental"
        description="Restore damaged or weakened teeth with dental crowns at Uplift Dental in Garden Grove, CA. Porcelain, zirconia, and same-day crown options available. Call {PRACTICE.phone.display}."
        canonical="https://upliftdental.com/dental-crowns"
      />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Services", url: "https://upliftdental.com/services" },
          { name: "Dental Crowns", url: "https://upliftdental.com/dental-crowns" },
        ]} />
        <Navbar />

        {/* Hero */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
              Dental Crowns<br />in Garden Grove, CA
            </h1>
            <p className="font-body text-white/85 text-xl leading-relaxed mb-10">
              A dental crown restores a damaged, cracked, or weakened tooth to its full strength and natural appearance. At Uplift Dental, we offer porcelain, zirconia, and same-day crown options.
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

        {/* When You Need a Crown */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl" style={{ color: COLORS.tealDark }}>When Do You Need a Dental Crown?</h2>
              <p className="font-body text-gray-500 mt-4 text-lg max-w-2xl mx-auto">Crowns are one of the most versatile restorations in dentistry, used in a wide range of situations</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Cracked or Fractured Tooth", desc: "A crown holds a cracked tooth together, preventing the crack from spreading and protecting the nerve." },
                { title: "Large Cavity", desc: "When a cavity is too large for a filling to support, a crown provides full coverage and structural strength." },
                { title: "After Root Canal", desc: "Root canal-treated teeth become brittle. A crown protects the tooth from fracture and restores function." },
                { title: "Broken or Severely Worn Tooth", desc: "Teeth worn down from grinding (bruxism) or broken from injury can be fully restored with a crown." },
                { title: "Dental Implant Restoration", desc: "The visible portion of a dental implant is a crown custom-made to match your surrounding teeth." },
                { title: "Cosmetic Improvement", desc: "Crowns can improve the appearance of severely discolored, misshapen, or poorly aligned teeth." },
              ].map((item) => (
                <div key={item.title} className="bg-[oklch(0.97_0.008_192)] rounded-2xl p-6 border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 mb-3" style={{ color: COLORS.teal }} />
                  <h3 className="font-display text-lg mb-2" style={{ color: COLORS.tealDark }}>{item.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Crown Types */}
        <section className="py-20 bg-[oklch(0.97_0.008_192)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl" style={{ color: COLORS.tealDark }}>Types of Dental Crowns</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Porcelain Crowns", desc: "The most natural-looking option. Ideal for front teeth where aesthetics are the priority. Matched precisely to your tooth color.", best: "Best for: Front teeth, cosmetic cases" },
                { name: "Zirconia Crowns", desc: "Extremely strong and tooth-colored. The gold standard for back teeth that need both strength and aesthetics. Highly biocompatible.", best: "Best for: Back teeth, implant crowns" },
                { name: "Porcelain-Fused-to-Metal", desc: "A metal base with a porcelain exterior. Strong and natural-looking, though the metal margin can show over time.", best: "Best for: Back teeth, budget-conscious patients" },
              ].map((c) => (
                <div key={c.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-display text-xl mb-3" style={{ color: COLORS.tealDark }}>{c.name}</h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed mb-4">{c.desc}</p>
                  <p className="font-body text-xs font-semibold" style={{ color: COLORS.teal }}>{c.best}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl" style={{ color: COLORS.tealDark }}>The Crown Process</h2>
              <p className="font-body text-gray-500 mt-4">Typically completed in 2 appointments (1–2 weeks apart)</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Exam & X-rays", desc: "We evaluate the tooth, take X-rays, and determine whether a crown is the right treatment." },
                { step: "02", title: "Tooth Preparation", desc: "The tooth is shaped to make room for the crown. Impressions are taken and sent to our dental lab." },
                { step: "03", title: "Temporary Crown", desc: "A temporary crown protects your tooth while your permanent crown is being fabricated (1–2 weeks)." },
                { step: "04", title: "Permanent Crown", desc: "Your custom crown is checked for fit, bite, and color, then permanently cemented in place." },
              ].map((s) => (
                <div key={s.step} className="bg-[oklch(0.97_0.008_192)] rounded-2xl p-6 border border-gray-100">
                  <div className="font-display text-4xl font-bold mb-3" style={{ color: COLORS.teal, opacity: 0.4 }}>{s.step}</div>
                  <h3 className="font-display text-lg mb-2" style={{ color: COLORS.tealDark }}>{s.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[oklch(0.97_0.008_192)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center mb-12" style={{ color: COLORS.tealDark }}>Crown FAQs</h2>
            <div className="space-y-6">
              {[
                { q: "How long do dental crowns last?", a: "With proper care, porcelain and zirconia crowns typically last 10–15 years or longer. Good oral hygiene, regular cleanings, and avoiding hard foods extend crown lifespan." },
                { q: "Does getting a crown hurt?", a: "The procedure is done under local anesthesia, so you won't feel pain during the appointment. Some sensitivity and soreness for a few days afterward is normal." },
                { q: "Can a crown fall off?", a: "It's rare, but crowns can loosen over time. If your crown comes off, keep it safe and call us right away — we can usually re-cement it quickly." },
                { q: "Does insurance cover dental crowns?", a: "Most dental insurance plans cover a portion of crown costs when the crown is medically necessary. We'll help you maximize your benefits and offer Cherry financing for remaining balances." },
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
            <h2 className="font-display text-4xl text-white mb-4">Restore Your Tooth Today</h2>
            <p className="font-body text-white/75 text-lg mb-8">A crown restores a damaged tooth to full strength and appearance — protecting it from further damage while blending seamlessly with your natural smile. We offer same-day crowns using advanced CAD/CAM technology, so you can leave with a permanent restoration in one appointment. Schedule your crown consultation today.</p>
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
