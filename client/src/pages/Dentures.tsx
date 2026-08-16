/* ============================================================= 
   UPLIFT DENTAL — Dentures Page
   Design: Deep teal #0E6B6B, DM Serif Display + DM Sans
   ============================================================= */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema, ServiceSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { Smile, CheckCircle2, Phone, Calendar } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";
import { trackSchedule } from "@/lib/tracking";

const DENTURE_FAQS = [
  { question: "What are 3D-printed dentures?", answer: "3D-printed dentures are custom-made using advanced digital scanning and 3D printing technology. This allows for precise fit, superior comfort, and faster production compared to traditional dentures. The process captures your exact mouth anatomy for a denture that feels natural." },
  { question: "How long does it take to get dentures?", answer: "With 3D printing technology, we can often produce dentures in 1-2 weeks after your final fitting appointment. Traditional dentures may take 2-3 weeks. We'll schedule follow-up appointments to ensure perfect fit and comfort." },
  { question: "Are dentures covered by insurance?", answer: "Many dental insurance plans cover a portion of denture costs. Uplift Dental accepts most PPO plans, Denti-Cal, and military insurance. We also offer flexible financing options through CareCredit and Cherry." },
  { question: "How do I care for my dentures?", answer: "Dentures should be cleaned daily with a denture brush and denture cleaner — never use regular toothpaste. Remove them at night and soak in water or denture solution. Handle them carefully to avoid dropping. Regular dental check-ups ensure proper fit and function." },
  { question: "Can I sleep in my dentures?", answer: "It's recommended to remove dentures at night to allow your gums to rest and maintain their health. Sleeping without dentures also helps prevent bacterial growth and extends the life of your dentures." },
  { question: "Will dentures feel natural?", answer: "Modern dentures, especially 3D-printed ones, feel very natural. There's an adjustment period of a few weeks as you get used to eating and speaking. Most patients adapt quickly and report high satisfaction with their new smile." },
];

export default function Dentures() {
  return (
    <>
      <PageSEO
        title="Dentures | Uplift Dental Garden Grove"
        description="3D-printed dentures in Garden Grove, CA. Custom-fit, comfortable, affordable tooth replacement. Free denture consultation at Uplift Dental."
        canonical="https://upliftdental.com/dentures"
      />
      <FAQSchema faqs={DENTURE_FAQS} id="ld-faq-dentures" />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Services", url: "https://upliftdental.com/services" },
          { name: "Dentures", url: "https://upliftdental.com/dentures" },
        ]} />
      <ServiceSchema
        name="Dentures"
        description="Full and partial dentures in Garden Grove, CA. Custom-fitted dentures and implant-supported dentures for a natural-looking smile."
        url="https://upliftdental.com/dentures"
        serviceType="Dentures"
      />
        <Navbar />

        {/* Hero */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Smile className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
              Custom Dentures<br />in Garden Grove, CA
            </h1>
            <p className="font-body text-white/85 text-xl leading-relaxed mb-10">
              Replace missing teeth with comfortable, natural-looking 3D-printed dentures. Custom-fit to your mouth for superior comfort and function.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-full font-body font-bold text-lg shadow-xl hover:bg-white/90 transition-all" style={{ color: COLORS.tealDark }}>
                <Phone className="w-5 h-5" /> Call {PRACTICE.phone.display}
              </a>
              <Link href="/contact" onClick={trackSchedule} className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 border-2 border-white/50 text-white rounded-full font-body font-bold text-lg hover:bg-white/30 transition-all">
                <Calendar className="w-5 h-5" /> Book Free Consult
              </Link>
            </div>
          </div>
        </section>

        {/* What Are Dentures */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl mb-6" style={{ color: COLORS.tealDark }}>What Are Dentures?</h2>
                <p className="font-body text-gray-600 leading-relaxed mb-5">
                  Dentures are custom-made replacements for missing teeth and surrounding gum tissue. They restore your ability to eat, speak, and smile with confidence. Modern dentures are more comfortable and natural-looking than ever before.
                </p>
                <p className="font-body text-gray-600 leading-relaxed mb-8">
                  At Uplift Dental, we use advanced 3D printing technology to create dentures that fit perfectly and feel natural. The process is faster and more precise than traditional denture fabrication.
                </p>
                <div className="space-y-3">
                  {[
                    "Custom-fit to your mouth for maximum comfort",
                    "3D-printed for precision and durability",
                    "Natural-looking teeth and gum color",
                    "Faster production time (1-2 weeks)",
                    "Affordable tooth replacement option",
                    "Easy to clean and maintain",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3 font-body text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.teal }} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[oklch(0.97_0.008_192)] rounded-3xl p-8">
                <h3 className="font-display text-2xl mb-6" style={{ color: COLORS.tealDark }}>Types of Dentures</h3>
                <div className="space-y-4">
                  {[
                    { title: "Complete Dentures", desc: "Replace all upper or lower teeth when natural teeth are missing." },
                    { title: "Partial Dentures", desc: "Replace one or more missing teeth while preserving remaining natural teeth." },
                    { title: "Implant-Supported Dentures", desc: "Anchored to dental implants for enhanced stability and comfort." },
                    { title: "Immediate Dentures", desc: "Placed immediately after tooth extraction to minimize time without teeth." },
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

        {/* 3D Denture Process */}
        <section className="py-20 bg-[oklch(0.97_0.008_192)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center mb-4" style={{ color: COLORS.tealDark }}>Our 3D Denture Process</h2>
            <p className="font-body text-gray-600 text-center mb-12 max-w-2xl mx-auto">We use advanced 3D scanning and printing technology to create dentures that are precisely fitted to your mouth for superior comfort and function.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  stage: "Stage 1",
                  title: "Digital Scan",
                  desc: "We capture a precise 3D scan of your mouth using advanced imaging technology.",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/3ddenture2_0802583c.webp"
                },
                {
                  stage: "Stage 2",
                  title: "Design & Modeling",
                  desc: "Our lab designs your custom dentures using 3D modeling software for perfect fit.",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/3ddenture3_f6f03e03.webp"
                },
                {
                  stage: "Stage 3",
                  title: "3D Printing",
                  desc: "Dentures are 3D-printed using biocompatible materials for durability and comfort.",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/3ddenture4_fe4fe9c0.webp"
                },
                {
                  stage: "Right Before Final Phase",
                  title: "Finishing & Fitting",
                  desc: "Dentures are finished, polished, and fitted for your comfort and smile.",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/Denture3d_b263eb16.webp"
                },
              ].map((item) => (
                <div key={item.stage} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <p className="text-xs font-body font-semibold mb-1 uppercase tracking-wide" style={{ color: COLORS.teal }}>{item.stage}</p>
                    <h3 className="font-body font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="font-body text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center mb-12" style={{ color: COLORS.tealDark }}>Why Choose Uplift Dental for Dentures?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Advanced 3D Technology", desc: "We use state-of-the-art 3D scanning and printing for precision-fit dentures." },
                { title: "Expert Fitting", desc: "Our experienced team ensures your dentures fit perfectly and feel natural." },
                { title: "Fast Turnaround", desc: "3D-printed dentures are ready in 1-2 weeks, not 3-4 weeks." },
                { title: "Affordable Options", desc: "We offer flexible financing and accept most insurance plans." },
                { title: "Lifetime Support", desc: "We provide adjustments, repairs, and replacements as needed." },
                { title: "Comfortable Materials", desc: "Biocompatible 3D-printed materials are gentle on your gums." },
              ].map((item) => (
                <div key={item.title} className="bg-[oklch(0.97_0.008_192)] rounded-2xl p-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="font-body text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[oklch(0.97_0.008_192)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center mb-12" style={{ color: COLORS.tealDark }}>Dentures FAQs</h2>
            <div className="space-y-6">
              {DENTURE_FAQS.map((faq) => (
                <div key={faq.question} className="bg-white rounded-2xl p-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl text-white mb-4">Ready for Your New Smile?</h2>
            <p className="font-body text-white/75 text-lg mb-8">Schedule a free denture consultation with our team. We'll discuss your options, answer your questions, and help you find the perfect solution for replacing your missing teeth.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-full font-body font-bold text-lg" style={{ color: COLORS.tealDark }}>
                <Phone className="w-5 h-5" /> Call {PRACTICE.phone.display}
              </a>
              <Link href="/contact" onClick={trackSchedule} className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 border-2 border-white/50 text-white rounded-full font-body font-bold text-lg hover:bg-white/30 transition-all">
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
