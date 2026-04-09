import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema, MedicalPageSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { CheckCircle2, Phone, ChevronRight } from "lucide-react";
import { PRACTICE } from "@/lib/constants";

const IMPLANTS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dental-implant-hero-k3ekVFSZCNDA8fPqPQR8xJ.webp";
const SMILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/smile-transformation_82cc164e.jpg";

const IMPLANT_FAQS = [
  { question: "How much do dental implants cost in Garden Grove, CA?", answer: "Dental implants at Uplift Dental in Garden Grove typically range from $1,500 to $3,500 per implant, depending on whether bone grafting or other preparatory procedures are needed. We offer free consultations and flexible financing through Cherry Finance. Most PPO insurance plans provide partial coverage." },
  { question: "How long do dental implants last?", answer: "With proper care, dental implants can last 20 years or more — often a lifetime. The titanium post is designed to fuse permanently with your jawbone. The crown on top may need replacement after 10-15 years due to normal wear." },
  { question: "Am I a candidate for dental implants?", answer: "Most adults with good general health are candidates for dental implants. You need adequate bone density to support the implant. If bone has been lost, a bone graft can often be performed first. Dr. Youssef will evaluate your candidacy with a free consultation and 3D imaging." },
  { question: "Does getting a dental implant hurt?", answer: "The procedure is performed under local anesthesia, so you won't feel pain during placement. Most patients report that the discomfort afterward is less than expected — similar to a tooth extraction. Over-the-counter pain relievers are usually sufficient for recovery." },
  { question: "How long is the dental implant process?", answer: "The full process typically takes 3-6 months from implant placement to final crown. This includes a healing period of 3-4 months for osseointegration (the implant fusing with the bone). In some cases, same-day implants with temporary crowns are possible." },
];

export default function DentalImplants() {
  return (
    <>
      <PageSEO
        title="Dental Implants in Garden Grove, CA | Uplift Dental & Orthodontics"
        description="Restore your smile with dental implants at Uplift Dental in {PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}. Expert implant placement by Dr. Youssef, Oral Surgeon. Free consultations. Financing available. Call {PRACTICE.phone.display}."
        canonical="https://upliftdental.com/dental-implants"
      />
      <FAQSchema faqs={IMPLANT_FAQS} id="ld-faq-implants" />
      <MedicalPageSchema
        name="Dental Implants in Garden Grove, CA"
        url="https://upliftdental.com/dental-implants"
        description="Expert dental implant placement by Dr. Joseph Youssef, Oral Surgeon, at Uplift Dental in {PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}. 3D-guided implant placement, bone grafting, All-on-4. Free consultations."
        medicalSpecialty="Oral Surgery"
        keywords="dental implants garden grove, dental implants near me, oral surgeon garden grove, implant dentist garden grove ca"
      />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com/" },
        { name: "Services", url: "https://upliftdental.com/services" },
        { name: "Dental Implants", url: "https://upliftdental.com/dental-implants" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "oklch(0.18 0.04 185)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "oklch(0.70 0.07 195)" }}>Permanent Tooth Replacement</p>
              <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
                Dental Implants<br />in Garden Grove, CA
              </h1>
              <p className="font-body text-white/80 text-lg leading-relaxed mb-8">
                Uplift Dental uses advanced 3D-guided implant placement with SprintRay technology for precise, predictable, and permanent tooth replacement. Restore your smile and confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-uplift-white rounded-full px-7 py-3">
                  Free Implant Consultation
                </Link>
                <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-7 py-3 rounded-full border-2 border-white/50 text-white font-body font-semibold hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" />
                  {PRACTICE.phone.display}
                </a>
              </div>
            </div>
            <img src={IMPLANTS_IMG} alt="Advanced dental implant technology at Uplift Dental & Orthodontics, Garden Grove CA" className="w-full rounded-3xl object-cover shadow-2xl" style={{ maxHeight: "480px" }} loading="lazy"/>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="font-display text-4xl text-[oklch(0.18_0.04_185)] mb-6">Why Dental Implants?</h2>
              <p className="font-body text-[oklch(0.40_0.04_185)] leading-relaxed mb-6">
                Dental implants are the gold standard for replacing missing teeth. They look, feel, and function like natural teeth — and with proper care, they can last a lifetime.
              </p>
              <ul className="space-y-3">
                {[
                  "Look and feel like natural teeth",
                  "Prevent bone loss in the jaw",
                  "No slipping or discomfort like dentures",
                  "Easy to clean — brush and floss normally",
                  "Long-lasting — can last 20+ years",
                  "3D-guided placement for precision and safety",
                  "SprintRay 3D printing technology for same-day crowns",
                  "Free consultation to assess candidacy",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-[oklch(0.35_0.04_185)]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "oklch(0.42 0.09 185)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <img src={SMILE_IMG} alt="Patient with beautiful smile after dental implants at Uplift Dental Garden Grove CA" className="w-full rounded-3xl object-cover shadow-xl" style={{ maxHeight: "480px" }} loading="lazy"/>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl text-[oklch(0.18_0.04_185)]">The Implant Process at Uplift Dental</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Free Consultation", desc: "We evaluate your bone density, gum health, and overall oral health to determine if implants are right for you." },
              { step: "02", title: "3D Imaging & Planning", desc: "Using advanced 3D imaging, we precisely plan implant placement for optimal results and minimal recovery." },
              { step: "03", title: "Implant Placement", desc: "Dr. Youssef, our oral surgeon, places the titanium implant post with guided precision under local anesthesia." },
              { step: "04", title: "Crown Placement", desc: "Once healed, we place your custom SprintRay 3D-printed crown — a permanent, natural-looking tooth replacement." },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 border border-[oklch(0.90_0.015_185)] text-center">
                <div className="font-display text-4xl font-bold mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>{item.step}</div>
                <h3 className="font-display text-lg text-[oklch(0.18_0.04_185)] mb-2">{item.title}</h3>
                <p className="font-body text-sm text-[oklch(0.45_0.04_185)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-[oklch(0.18_0.04_185)] mb-10 text-center">Frequently Asked Questions About Dental Implants</h2>
          <div className="space-y-5">
            {IMPLANT_FAQS.map((faq) => (
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
          <h2 className="font-display text-4xl text-white mb-4">Ready to Restore Your Smile?</h2>
          <p className="font-body text-white/80 mb-8">Dental implants are a permanent solution to tooth loss — they look, feel, and function like natural teeth. At Uplift Dental, Dr. Stefan and our team have restored hundreds of smiles with implants. If you're missing one or more teeth, schedule a free implant consultation today.</p>
          <Link href="/contact" className="btn-uplift-white rounded-full px-8 py-4 text-base font-bold inline-flex items-center gap-2">
            Book Free Consultation <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
