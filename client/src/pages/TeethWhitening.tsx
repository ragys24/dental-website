/* =============================================================
   UPLIFT DENTAL — Teeth Whitening Page
   Design: "Elevated Warmth" — teal brand, DM Serif + DM Sans
   ============================================================= */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { Smile, CheckCircle2, Phone, Calendar, Star } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";

export default function TeethWhitening() {
  return (
    <>
      <PageSEO
        title="Teeth Whitening in Garden Grove, CA | Professional Whitening | Uplift Dental"
        description={`Get a brighter smile with professional teeth whitening at Uplift Dental in Garden Grove, CA. In-office and take-home whitening options. Results in as little as one visit. Call ${PRACTICE.phone.display}.`}
        canonical="https://upliftdental.com/teeth-whitening"
      />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Services", url: "https://upliftdental.com/services" },
          { name: "Teeth Whitening", url: "https://upliftdental.com/teeth-whitening" },
        ]} />
        <Navbar />

        {/* Hero */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Smile className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
              Teeth Whitening<br />in Garden Grove, CA
            </h1>
            <p className="font-body text-white/85 text-xl leading-relaxed mb-10">
              Brighten your smile by up to 8 shades with professional teeth whitening at Uplift Dental. Faster, safer, and longer-lasting than any store-bought kit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-full font-body font-bold text-lg shadow-xl hover:bg-white/90 transition-all" style={{ color: COLORS.tealDark }}>
                <Phone className="w-5 h-5" />
                Call {PRACTICE.phone.display}
              </a>
              <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 border-2 border-white/50 text-white rounded-full font-body font-bold text-lg hover:bg-white/30 transition-all">
                <Calendar className="w-5 h-5" />
                Book Free Consult
              </Link>
            </div>
          </div>
        </section>

        {/* Options */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl" style={{ color: COLORS.tealDark }}>Whitening Options We Offer</h2>
              <p className="font-body text-gray-500 mt-4 text-lg">Choose the option that fits your schedule and goals</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "In-Office Whitening",
                  subtitle: "Results in 1 hour",
                  desc: "Our professional in-office whitening treatment uses a high-concentration bleaching gel activated by a specialized light. You'll leave with a dramatically brighter smile in a single appointment — perfect for special events or when you want fast results.",
                  features: ["Up to 8 shades brighter", "Completed in ~60 minutes", "Supervised by our dental team", "Long-lasting results"],
                },
                {
                  title: "Take-Home Whitening Kit",
                  subtitle: "Whiten on your schedule",
                  desc: "Custom-fitted whitening trays made from impressions of your teeth ensure even, comfortable coverage. Our professional-strength whitening gel is far more effective than anything available over the counter, with results you'll notice within days.",
                  features: ["Custom-fitted trays for comfort", "Professional-strength gel", "Whiten at your own pace", "Great for touch-ups anytime"],
                },
              ].map((opt) => (
                <div key={opt.title} className="rounded-3xl p-8 border border-gray-100 shadow-sm bg-[oklch(0.98_0.005_192)]">
                  <h3 className="font-display text-2xl mb-1" style={{ color: COLORS.tealDark }}>{opt.title}</h3>
                  <p className="font-body text-sm font-semibold mb-4" style={{ color: COLORS.teal }}>{opt.subtitle}</p>
                  <p className="font-body text-gray-600 leading-relaxed mb-6">{opt.desc}</p>
                  <ul className="space-y-2">
                    {opt.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 font-body text-gray-700 text-sm">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.teal }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Professional */}
        <section className="py-20 bg-[oklch(0.97_0.008_192)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl mb-6" style={{ color: COLORS.tealDark }}>Why Professional Whitening vs. Store-Bought?</h2>
                <div className="space-y-5">
                  {[
                    { title: "Stronger, Safer Formula", desc: "Professional gels contain higher concentrations of whitening agents, applied safely under dental supervision to avoid sensitivity and gum irritation." },
                    { title: "Custom Fit", desc: "Generic strips and trays don't fit your unique tooth shape, leading to uneven results and gel contact with gums. Our custom trays cover every surface evenly." },
                    { title: "Faster Results", desc: "In-office whitening achieves in one hour what store-bought kits take weeks to accomplish — if they work at all." },
                    { title: "Longer Lasting", desc: "Professional whitening penetrates deeper into enamel for results that last 1–3 years with proper maintenance." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: COLORS.teal }} />
                      <div>
                        <p className="font-body font-semibold text-gray-800">{item.title}</p>
                        <p className="font-body text-gray-500 text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="font-display text-2xl mb-6" style={{ color: COLORS.tealDark }}>What Causes Tooth Discoloration?</h3>
                <div className="space-y-3">
                  {[
                    "Coffee, tea, and red wine",
                    "Tobacco use (smoking or chewing)",
                    "Certain medications (e.g. tetracycline)",
                    "Aging and natural enamel thinning",
                    "Foods like berries, tomato sauce, and soy sauce",
                    "Fluorosis (excess fluoride during development)",
                    "Trauma or injury to a tooth",
                  ].map((cause) => (
                    <div key={cause} className="flex items-center gap-3 font-body text-gray-600 text-sm">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.teal }} />
                      {cause}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center mb-12" style={{ color: COLORS.tealDark }}>Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "Is teeth whitening safe?", a: "Yes. Professional whitening performed or supervised by a dentist is safe for most patients. We'll evaluate your teeth and gums beforehand to ensure you're a good candidate." },
                { q: "Will whitening work on crowns, veneers, or fillings?", a: "Whitening only works on natural tooth enamel. Existing restorations won't change color. If you have visible restorations, we'll discuss options to ensure a uniform result." },
                { q: "How long do results last?", a: "With proper care — limiting staining foods and beverages, brushing twice daily — results typically last 1–3 years. Touch-up treatments with your take-home kit can extend results indefinitely." },
                { q: "Will my teeth be sensitive after whitening?", a: "Some patients experience temporary sensitivity for 24–48 hours after whitening. We use desensitizing agents to minimize discomfort and can recommend the best approach for sensitive teeth." },
                { q: "How much does teeth whitening cost?", a: "Pricing varies by treatment type. We offer competitive rates and financing through Cherry. Call us or book a free consultation to get an exact quote." },
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
            <h2 className="font-display text-4xl text-white mb-4">Ready for a Brighter Smile?</h2>
            <p className="font-body text-white/75 text-lg mb-8">A brighter smile boosts confidence. Our professional whitening treatments are 6–8 times more effective than over-the-counter products — delivering visible results in a single visit. Choose in-office whitening for dramatic results, or take-home trays for gradual whitening on your schedule.</p>
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
