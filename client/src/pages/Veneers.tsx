/* =============================================================
   UPLIFT DENTAL — Dental Veneers Page
   Design: "Elevated Warmth" — teal brand, DM Serif + DM Sans
   ============================================================= */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { Sparkles, CheckCircle2, Phone, Calendar } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";

export default function Veneers() {
  return (
    <>
      <PageSEO
        title="Dental Veneers in Garden Grove, CA | Porcelain Veneers | Uplift Dental"
        description="Transform your smile with porcelain dental veneers at Uplift Dental in Garden Grove, CA. Fix chips, cracks, gaps, and discoloration in just 2 visits. Call {PRACTICE.phone.display} for a free consult."
        canonical="https://upliftdental.com/veneers"
      />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Services", url: "https://upliftdental.com/services" },
          { name: "Dental Veneers", url: "https://upliftdental.com/veneers" },
        ]} />
        <Navbar />

        {/* Hero */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
              Dental Veneers<br />in Garden Grove, CA
            </h1>
            <p className="font-body text-white/85 text-xl leading-relaxed mb-10">
              Porcelain veneers are ultra-thin shells that transform the appearance of your smile — covering chips, cracks, stains, gaps, and uneven teeth in just two visits.
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

        {/* What Are Veneers */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl mb-6" style={{ color: COLORS.tealDark }}>What Are Dental Veneers?</h2>
                <p className="font-body text-gray-600 leading-relaxed mb-5">
                  Dental veneers are wafer-thin shells of porcelain or composite resin custom-crafted to bond to the front surface of your teeth. They mimic the natural translucency of tooth enamel while correcting a wide range of cosmetic concerns — all in as few as two appointments.
                </p>
                <p className="font-body text-gray-600 leading-relaxed mb-8">
                  At Uplift Dental, we use high-quality porcelain veneers that are stain-resistant, durable, and indistinguishable from natural teeth. Our dentists work closely with you to design a smile that fits your face, personality, and goals.
                </p>
                <div className="space-y-3">
                  {[
                    "Fix chipped or cracked teeth",
                    "Cover severe discoloration that whitening can't fix",
                    "Close gaps between teeth",
                    "Correct mildly misaligned or uneven teeth",
                    "Lengthen short or worn-down teeth",
                    "Create a complete smile makeover",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3 font-body text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.teal }} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[oklch(0.97_0.008_192)] rounded-3xl p-8">
                <h3 className="font-display text-2xl mb-6" style={{ color: COLORS.tealDark }}>Porcelain vs. Composite Veneers</h3>
                <div className="space-y-6">
                  {[
                    { name: "Porcelain Veneers", pros: ["Most natural appearance", "Stain-resistant", "Lasts 10–20 years", "Strong and durable"], note: "Requires minimal enamel removal. Most popular choice." },
                    { name: "Composite Veneers", pros: ["More affordable", "Completed in one visit", "Reversible in some cases", "Easily repaired"], note: "Shorter lifespan (5–7 years). Good for minor corrections." },
                  ].map((v) => (
                    <div key={v.name} className="bg-white rounded-2xl p-5 border border-gray-100">
                      <h4 className="font-body font-bold text-gray-800 mb-3">{v.name}</h4>
                      <ul className="space-y-1 mb-3">
                        {v.pros.map((p) => (
                          <li key={p} className="flex items-center gap-2 font-body text-sm text-gray-600">
                            <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: COLORS.teal }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <p className="font-body text-xs text-gray-400 italic">{v.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-[oklch(0.97_0.008_192)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl" style={{ color: COLORS.tealDark }}>The Veneer Process</h2>
              <p className="font-body text-gray-500 mt-4">Most veneer cases are completed in just 2–3 appointments</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Consultation", desc: "We discuss your goals, evaluate your teeth, and create a personalized treatment plan. Digital smile design lets you preview your results." },
                { step: "02", title: "Preparation", desc: "A thin layer of enamel (about 0.5mm) is gently removed from the tooth surface to make room for the veneer. Impressions are taken and sent to the lab." },
                { step: "03", title: "Temporaries", desc: "Temporary veneers are placed while your custom porcelain veneers are crafted at the dental lab (typically 1–2 weeks)." },
                { step: "04", title: "Bonding", desc: "Your permanent veneers are checked for fit and color, then bonded permanently to your teeth with a strong dental adhesive. Final adjustments are made." },
              ].map((s) => (
                <div key={s.step} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="font-display text-4xl font-bold mb-3" style={{ color: COLORS.teal, opacity: 0.4 }}>{s.step}</div>
                  <h3 className="font-display text-lg mb-2" style={{ color: COLORS.tealDark }}>{s.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center mb-12" style={{ color: COLORS.tealDark }}>Veneer FAQs</h2>
            <div className="space-y-6">
              {[
                { q: "Are veneers permanent?", a: "Porcelain veneers require a small amount of enamel removal, making them a permanent commitment. However, they can be replaced when they eventually wear out after 10–20 years." },
                { q: "Do veneers hurt?", a: "The procedure is performed under local anesthesia, so you won't feel discomfort during preparation. Some sensitivity is normal for a few days afterward." },
                { q: "Can I whiten veneers?", a: "Porcelain veneers are stain-resistant and don't respond to whitening treatments. If you want whiter teeth, it's best to whiten your natural teeth before getting veneers so we can match the shade." },
                { q: "How do I care for veneers?", a: "Treat them like natural teeth — brush twice daily, floss, and visit us for regular cleanings. Avoid biting hard objects (ice, nails) and consider a night guard if you grind your teeth." },
                { q: "How much do veneers cost in Garden Grove?", a: "Veneer costs vary based on the number of teeth and material chosen. We offer Cherry 0% financing to make treatment accessible. Call us for a personalized quote." },
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
            <h2 className="font-display text-4xl text-white mb-4">Design Your Dream Smile</h2>
            <p className="font-body text-white/75 text-lg mb-8">Veneers are the gold standard for smile makeovers — they fix chips, cracks, gaps, discoloration, and shape issues in just two visits. Our ultra-thin porcelain veneers look incredibly natural and last 10–15 years with proper care. If you've always wanted a Hollywood smile, veneers are your answer. Schedule your free smile design consultation today.</p>
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
