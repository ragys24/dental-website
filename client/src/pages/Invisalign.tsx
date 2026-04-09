import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema, MedicalPageSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { CheckCircle2, Phone, Award, ChevronRight, Star } from "lucide-react";
import { PRACTICE } from "@/lib/constants";

const INVISALIGN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/invisalign-lifestyle_cd9d5323.jpg";
const SMILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/smile-transformation_82cc164e.jpg";

const INVISALIGN_FAQS = [
  { question: "How much does Invisalign cost in Garden Grove, CA?", answer: "Invisalign at Uplift Dental in Garden Grove typically ranges from $3,500 to $7,500 depending on the complexity of your case. We offer free consultations and flexible financing through Cherry Finance with 0% APR options. Most PPO dental insurance plans cover Invisalign the same as traditional braces." },
  { question: "How long does Invisalign treatment take?", answer: "Most Invisalign Full treatments take 12-18 months. Invisalign Lite for mild cases can be completed in as little as 6 months. During your free consultation, Dr. Stefan will show you a 3D simulation of your results and an estimated timeline." },
  { question: "Is Uplift Dental a Platinum Invisalign Provider?", answer: "Yes. Uplift Dental is a Platinum Invisalign Provider, one of the highest designations awarded by Align Technology. This means our doctors have completed a high volume of successful Invisalign cases and have advanced training in complex tooth movements." },
  { question: "Does Denti-Cal cover Invisalign?", answer: "Denti-Cal (Medi-Cal Dental) does not currently cover Invisalign for adults. However, we offer 0% financing through Cherry Finance to make treatment affordable. Some PPO plans do cover a portion of Invisalign costs." },
  { question: "Can I start Invisalign the same day as my consultation?", answer: "In many cases, yes. If your iTero scan is completed and your case qualifies, we can often initiate the Invisalign process on your first visit. Call {PRACTICE.phone.display} to schedule your free consultation." },
];

export default function Invisalign() {
  return (
    <>
      <PageSEO
        title="Invisalign in Garden Grove, CA | Platinum Provider | Uplift Dental"
        description={`Uplift Dental is a Platinum Invisalign® Provider in ${PRACTICE.address.city}, ${PRACTICE.address.state} ${PRACTICE.address.zip}. Get straighter teeth with clear aligners — free consultation, flexible financing, and same-day starts available. Call ${PRACTICE.phone.display}.`}
        canonical="https://upliftdental.com/invisalign"
      />
      <FAQSchema faqs={INVISALIGN_FAQS} id="ld-faq-invisalign" />
      <MedicalPageSchema
        name="Invisalign Clear Aligners in Garden Grove, CA"
        url="https://upliftdental.com/invisalign"
        description="Platinum Invisalign Provider in Garden Grove, CA. Clear aligner orthodontic treatment for teens and adults. Free consultation. Denti-Cal and PPO insurance accepted."
        medicalSpecialty="Orthodontics"
        keywords="invisalign garden grove, invisalign near me, platinum invisalign provider, clear aligners garden grove, orthodontist garden grove"
      />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com/" },
        { name: "Services", url: "https://upliftdental.com/services" },
        { name: "Invisalign", url: "https://upliftdental.com/invisalign" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "oklch(0.18 0.04 185)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-body font-semibold" style={{ backgroundColor: "oklch(0.70 0.07 195 / 0.2)", color: "oklch(0.85 0.05 195)", border: "1px solid oklch(0.70 0.07 195 / 0.4)" }}>
                <Award className="w-4 h-4" />
                Platinum Invisalign® Provider
              </div>
              <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
                Invisalign® Clear<br />Aligners in<br />
                <em className="not-italic" style={{ color: "oklch(0.70 0.07 195)" }}>Garden Grove, CA</em>
              </h1>
              <p className="font-body text-white/80 text-lg leading-relaxed mb-8">
                As a Platinum Invisalign® Provider, Uplift Dental has the expertise to give you straighter teeth without metal braces — discreetly, comfortably, and efficiently using the latest Trios 6 and iTero® digital scanning technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-uplift-white rounded-full px-7 py-3">
                  Free Invisalign Consultation
                </Link>
                <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-7 py-3 rounded-full border-2 border-white/50 text-white font-body font-semibold hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" />
                  {PRACTICE.phone.display}
                </a>
              </div>
            </div>
            <div className="relative">
              <img src={INVISALIGN_IMG} alt="Platinum Invisalign clear aligners treatment in Garden Grove, CA — Uplift Dental & Orthodontics" className="w-full rounded-3xl object-cover shadow-2xl" style={{ maxHeight: "500px" }} loading="lazy" width="1200" height="600"/>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invisalign */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)]">Why Choose Invisalign® at Uplift Dental?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Platinum Provider Status", desc: "We are a Platinum Invisalign® Provider — meaning we've completed a high volume of successful Invisalign cases and have advanced training in the system." },
              { title: "iTero® Digital Scanning", desc: "No messy impressions. We use the iTero® intraoral scanner for precise, comfortable digital impressions that create a perfect fit for your aligners." },
              { title: "Experienced Orthodontist", desc: "Dr. Clark Schneekluth has been practicing orthodontics since 1983. His 40+ years of experience ensures your treatment is precise and effective." },
            ].map((item) => (
              <div key={item.title} className="bg-[oklch(0.97_0.008_85)] rounded-2xl p-8 border border-[oklch(0.90_0.015_185)]">
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: "oklch(0.95 0.015 185)" }}>
                  <Star className="w-5 h-5" style={{ color: "oklch(0.42 0.09 185)" }} />
                </div>
                <h3 className="font-display text-xl text-[oklch(0.18_0.04_185)] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[oklch(0.45_0.04_185)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="font-display text-4xl text-[oklch(0.18_0.04_185)] mb-6">Benefits of Invisalign® Clear Aligners</h2>
              <ul className="space-y-4">
                {[
                  "Nearly invisible — no one will know you're wearing them",
                  "Removable — eat, drink, and brush normally",
                  "More comfortable than traditional metal braces",
                  "Fewer office visits than traditional braces",
                  "Treat crowding, gaps, overbite, underbite, and crossbite",
                  "Suitable for teens and adults",
                  "3D treatment planning so you can see your results before starting",
                  "Free consultation to determine if you're a candidate",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-[oklch(0.35_0.04_185)]">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "oklch(0.42 0.09 185)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <img src={SMILE_IMG} alt="Before and after smile transformation with Invisalign at Uplift Dental Garden Grove CA" className="w-full rounded-3xl object-cover shadow-xl" style={{ maxHeight: "500px" }} loading="lazy" width="1200" height="600"/>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-[oklch(0.18_0.04_185)] mb-10 text-center">Frequently Asked Questions About Invisalign</h2>
          <div className="space-y-5">
            {INVISALIGN_FAQS.map((faq) => (
              <div key={faq.question} className="bg-[oklch(0.97_0.008_192)] rounded-2xl p-6 border border-gray-100">
                <h3 className="font-body font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="font-body text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-4xl text-white mb-4">Start Your Invisalign® Journey Today</h2>
          <p className="font-body text-white/80 mb-8">Free consultation. No obligation. Serving Garden Grove, Seal Beach, Los Alamitos, and all of Orange County.</p>
          <Link href="/contact" className="btn-uplift-white rounded-full px-8 py-4 text-base font-bold inline-flex items-center gap-2">
            Book Free Invisalign Consultation <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
