/* =============================================================
   UPLIFT DENTAL — Wisdom Teeth Removal Page
   Design: "Elevated Warmth" — teal brand, DM Serif + DM Sans
   ============================================================= */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { Scissors, CheckCircle2, Phone, Calendar, Clock } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";

export default function WisdomTeeth() {
  return (
    <>
      <PageSEO
        title="Wisdom Teeth Removal in Garden Grove, CA | Uplift Dental"
        description="Expert wisdom teeth extraction in Garden Grove, CA by Dr. Joseph Youssef, Oral Surgeon. Same-day consultations available. Gentle care, fast recovery. Call {PRACTICE.phone.display}."
        canonical="https://upliftdental.com/wisdom-teeth-removal"
      />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Services", url: "https://upliftdental.com/services" },
          { name: "Wisdom Teeth Removal", url: "https://upliftdental.com/wisdom-teeth-removal" },
        ]} />
        <Navbar />

        {/* Hero */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Scissors className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
              Wisdom Teeth Removal<br />in Garden Grove, CA
            </h1>
            <p className="font-body text-white/85 text-xl leading-relaxed mb-10">
              Expert wisdom tooth extraction by Dr. Joseph Youssef, Oral Surgeon — right here in Garden Grove. No referrals needed. Gentle care, fast recovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-full font-body font-bold text-lg shadow-xl hover:bg-white/90 transition-all" style={{ color: COLORS.tealDark }}>
                <Phone className="w-5 h-5" /> Call {PRACTICE.phone.display}
              </a>
              <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 border-2 border-white/50 text-white rounded-full font-body font-bold text-lg hover:bg-white/30 transition-all">
                <Calendar className="w-5 h-5" /> Book Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* Signs You Need Removal */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl" style={{ color: COLORS.tealDark }}>Signs Your Wisdom Teeth Need to Come Out</h2>
              <p className="font-body text-gray-500 mt-4 text-lg max-w-2xl mx-auto">Not all wisdom teeth cause problems — but many do. Here's when removal is recommended.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Pain or Pressure", desc: "Aching at the back of your jaw, especially when chewing, is a common sign that wisdom teeth are erupting or impacted." },
                { title: "Impacted Wisdom Teeth", desc: "When wisdom teeth are trapped beneath the gum or bone, they can cause infection, damage neighboring teeth, and form cysts." },
                { title: "Crowding", desc: "Wisdom teeth can push against existing teeth, causing crowding and undoing years of orthodontic work." },
                { title: "Infection or Swelling", desc: "Partially erupted wisdom teeth create pockets where bacteria accumulate, leading to pericoronitis — a painful gum infection." },
                { title: "Tooth Decay", desc: "Wisdom teeth are difficult to clean properly. Cavities in wisdom teeth often spread to adjacent molars." },
                { title: "Preventive Removal", desc: "Many dentists recommend removing wisdom teeth in your late teens or early 20s before roots fully form, making extraction easier and recovery faster." },
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

        {/* What to Expect */}
        <section className="py-20 bg-[oklch(0.97_0.008_192)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-display text-4xl mb-6" style={{ color: COLORS.tealDark }}>What to Expect</h2>
                <div className="space-y-6">
                  {[
                    { title: "Consultation & X-rays", desc: "Dr. Youssef will review your panoramic X-ray to assess the position of your wisdom teeth and create a personalized extraction plan." },
                    { title: "Anesthesia Options", desc: "We offer local anesthesia, nitrous oxide (laughing gas), and oral sedation to ensure you're completely comfortable throughout the procedure." },
                    { title: "The Extraction", desc: "Simple erupted teeth are removed quickly. Impacted teeth may require a small incision in the gum. Most procedures take 30–60 minutes." },
                    { title: "Recovery", desc: "Most patients recover within 3–5 days. We provide detailed aftercare instructions and are available for any questions during your healing." },
                  ].map((step, i) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-body font-bold text-sm text-white" style={{ backgroundColor: COLORS.teal }}>
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-body font-semibold text-gray-800 mb-1">{step.title}</p>
                        <p className="font-body text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="font-display text-2xl mb-6" style={{ color: COLORS.tealDark }}>Recovery Tips</h3>
                <div className="space-y-4">
                  {[
                    { icon: Clock, tip: "Rest for 24–48 hours after surgery. Avoid strenuous activity for 3–4 days." },
                    { icon: CheckCircle2, tip: "Apply ice packs to your cheeks for 20 minutes on, 20 minutes off during the first 24 hours." },
                    { icon: CheckCircle2, tip: "Eat soft foods: yogurt, applesauce, mashed potatoes, smoothies (no straws!)." },
                    { icon: CheckCircle2, tip: "Rinse gently with warm salt water starting 24 hours after surgery." },
                    { icon: CheckCircle2, tip: "Take prescribed medications as directed. Don't skip pain medication." },
                    { icon: CheckCircle2, tip: "Avoid smoking, alcohol, and hard/crunchy foods for at least one week." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: COLORS.teal }} />
                      <p className="font-body text-sm text-gray-600">{item.tip}</p>
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
            <h2 className="font-display text-4xl text-center mb-12" style={{ color: COLORS.tealDark }}>Wisdom Teeth FAQs</h2>
            <div className="space-y-6">
              {[
                { q: "Does wisdom tooth removal hurt?", a: "The procedure itself is painless — you'll be fully numb. Post-operative discomfort is manageable with prescribed pain medication and typically resolves within 3–5 days." },
                { q: "Do all wisdom teeth need to be removed?", a: "No. If your wisdom teeth are fully erupted, properly aligned, and easy to clean, they may not need removal. Dr. Youssef will evaluate your specific situation." },
                { q: "What is dry socket?", a: "Dry socket occurs when the blood clot at the extraction site dislodges before healing. It causes significant pain and requires treatment. Following aftercare instructions (no straws, no smoking) greatly reduces this risk." },
                { q: "How long does recovery take?", a: "Most patients feel back to normal within 3–5 days. Complete healing of the gum tissue takes 3–4 weeks, and bone healing takes several months — but this doesn't affect daily life." },
                { q: "Does insurance cover wisdom tooth removal?", a: "Most dental insurance plans cover wisdom tooth extraction, especially when medically necessary. We'll verify your benefits and offer Cherry financing for any out-of-pocket costs." },
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
            <h2 className="font-display text-4xl text-white mb-4">Wisdom Tooth Pain? We Can Help Today.</h2>
            <p className="font-body text-white/75 text-lg mb-8">Wisdom teeth extraction is one of the most common oral surgeries. Dr. Joseph Youssef, our board-certified oral surgeon, removes wisdom teeth with minimal discomfort and fast recovery. Whether your wisdom teeth are impacted, crowding your bite, or causing pain, we offer same-day consultations and can often schedule extraction within days. Call now to book your appointment.</p>
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
