/* =============================================================
   UPLIFT DENTAL — Orthodontics & Braces Page
   Targets: "braces garden grove", "orthodontist garden grove ca",
            "metal braces near me", "traditional braces garden grove",
            "orthodontics 92845", "braces for kids garden grove"
   NOTE: Invisalign has its own dedicated page (/invisalign).
   This page covers traditional braces, ceramic braces, and
   the overall orthodontic program — NOT Invisalign.
   Design: "Elevated Warmth" — teal brand, DM Serif + DM Sans
   ============================================================= */
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema, MedicalPageSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { CheckCircle2, Phone, ChevronRight, Star, Clock, Shield, Award, Users, Smile } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";

const ORTHO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/orthodontics-braces-xPjbHnQGVTqFBiS9cKsRzW.webp";

const BRACE_TYPES = [
  {
    icon: <Star className="w-6 h-6" />,
    name: "Traditional Metal Braces",
    description: "The most time-tested orthodontic option. High-grade stainless steel brackets and archwires apply consistent, controlled pressure to move teeth precisely. Ideal for complex cases and patients of all ages. Often the most cost-effective option.",
    tag: "Most Affordable",
    color: COLORS.teal,
  },
  {
    icon: <Smile className="w-6 h-6" />,
    name: "Ceramic (Clear) Braces",
    description: "Tooth-colored ceramic brackets that blend with your natural enamel for a much less noticeable appearance than metal. Same effectiveness as metal braces — a popular choice for teens and adults who want a subtler look without switching to aligners.",
    tag: "Aesthetic Option",
    color: "oklch(0.55 0.08 50)",
  },
  {
    icon: <Users className="w-6 h-6" />,
    name: "Phase I (Early) Orthodontics",
    description: "Interceptive treatment for children ages 7–10 to guide jaw development and correct bite problems before all permanent teeth erupt. Phase I can shorten or simplify Phase II treatment later — and in some cases eliminate the need for it entirely.",
    tag: "Ages 7–10",
    color: "oklch(0.45 0.10 140)",
  },
  {
    icon: <Award className="w-6 h-6" />,
    name: "Phase II (Comprehensive) Orthodontics",
    description: "Full-arch treatment for teens and adults once all permanent teeth are present. Corrects crowding, spacing, overbite, underbite, crossbite, and open bite. Coordinated with any Phase I treatment for optimal, lasting results.",
    tag: "Full Treatment",
    color: "oklch(0.42 0.09 192)",
  },
];

const CONCERNS = [
  { concern: "Crowded teeth", solution: "Braces create space by gradually moving teeth into proper alignment, eliminating overlapping and crowding." },
  { concern: "Gapped teeth (diastema)", solution: "Brackets and wires close gaps by drawing teeth together at a controlled rate that protects root health." },
  { concern: "Overbite", solution: "Upper teeth that protrude too far over lower teeth are corrected with specific bracket positioning and elastic bands." },
  { concern: "Underbite", solution: "Lower teeth that extend past upper teeth are addressed with braces, sometimes combined with elastics or expanders." },
  { concern: "Crossbite", solution: "Teeth that bite on the wrong side are corrected to prevent uneven wear, jaw pain, and asymmetric jaw growth." },
  { concern: "Open bite", solution: "Upper and lower teeth that don't meet when biting are corrected to restore proper chewing function and speech." },
];

const FAQS = [
  { question: "At what age should my child see an orthodontist?", answer: "The American Association of Orthodontists recommends a first orthodontic evaluation by age 7. At this age, the orthodontist can identify bite problems and jaw discrepancies while the jaw is still growing — making correction easier and often less expensive. Most children don't need treatment at 7, but early evaluation allows us to monitor development and act at the ideal time." },
  { question: "How long does orthodontic treatment with braces take?", answer: "Most comprehensive braces treatment takes 18–24 months, though this varies widely based on the complexity of the case, patient age, and compliance. Mild cases may finish in 12 months; complex bite corrections can take 30 months or more. We provide a personalized timeline estimate at your free consultation." },
  { question: "Do braces hurt?", answer: "Braces themselves don't hurt, but you'll experience soreness for 3–5 days after each adjustment appointment as your teeth begin to move. This is normal and manageable with over-the-counter pain relievers like ibuprofen. Most patients adapt quickly and find the discomfort minimal after the first few weeks." },
  { question: "What's the difference between braces and Invisalign?", answer: "Braces use fixed metal or ceramic brackets bonded to your teeth, connected by archwires that are periodically tightened. Invisalign uses a series of removable clear plastic aligners changed every 1–2 weeks. Braces are generally more effective for complex bite corrections and don't require the discipline of wearing aligners 22 hours per day. Invisalign offers more flexibility and is nearly invisible. We offer both — your orthodontist will recommend the best option for your specific case at a free consultation." },
  { question: "How much do braces cost in Garden Grove, CA?", answer: "Traditional metal braces at Uplift Dental typically range from $3,500 to $6,000 depending on case complexity and treatment length. Ceramic braces are slightly higher. We accept most PPO insurance plans, Denti-Cal for qualifying patients, and offer flexible financing through Cherry Finance with low monthly payment options. We'll provide an exact quote after your free consultation." },
  { question: "Do I need to wear a retainer after braces?", answer: "Yes — retainers are essential after braces. Without retention, teeth naturally shift back toward their original positions (relapse). We provide custom retainers at the end of treatment and recommend wearing them nightly long-term. Retainer compliance is the single most important factor in maintaining your results for life." },
];

export default function Orthodontics() {
  return (
    <>
      <PageSEO
        title="Braces in Garden Grove, CA | Orthodontist | Uplift Dental & Orthodontics"
        description="Traditional metal braces, ceramic braces, and Phase I/II orthodontics at Uplift Dental in {PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}. Platinum Invisalign Provider. Free orthodontic consultations. Denti-Cal accepted. Call {PRACTICE.phone.display}."
        canonical="https://upliftdental.com/orthodontics"
      />
      <FAQSchema faqs={FAQS} id="ld-faq-orthodontics" />
      <MedicalPageSchema
        name="Braces & Orthodontics in Garden Grove, CA"
        url="https://upliftdental.com/orthodontics"
        description="Traditional metal braces, ceramic braces, Phase I and Phase II orthodontics at Uplift Dental & Orthodontics in {PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}. Platinum Invisalign Provider. Free consultations."
        medicalSpecialty="Orthodontics"
        keywords="braces garden grove, orthodontist garden grove ca, metal braces near me, ceramic braces garden grove, orthodontics 92845, braces for kids garden grove"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com/" },
        { name: "Services", url: "https://upliftdental.com/services" },
        { name: "Orthodontics & Braces", url: "https://upliftdental.com/orthodontics" },
      ]} />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
        <Navbar />

        {/* Hero */}
        <section className="py-24 overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <p className="font-body text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "oklch(0.75 0.07 192)" }}>
                  Orthodontics · Garden Grove, CA
                </p>
                <h1 className="font-display text-5xl md:text-6xl text-white mb-6 leading-tight">
                  Braces That Fit<br />Your Life & Budget
                </h1>
                <p className="font-body text-white/80 text-lg leading-relaxed mb-8">
                  At Uplift Dental & Orthodontics, we offer traditional metal braces, ceramic braces, and comprehensive Phase I/II orthodontic programs for children, teens, and adults. Platinum Invisalign Provider. Free consultations.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Denti-Cal Accepted", "Free Consultation", "Cherry Financing", "Platinum Invisalign Provider"].map((badge) => (
                    <span key={badge} className="px-3 py-1.5 rounded-full text-xs font-body font-semibold bg-white/15 text-white border border-white/25">
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white rounded-full font-body font-bold text-sm" style={{ color: COLORS.tealDark }}>
                    <ChevronRight className="w-4 h-4" /> Free Orthodontic Consultation
                  </Link>
                  <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/40 text-white font-body font-semibold text-sm hover:bg-white/10 transition-all">
                    <Phone className="w-4 h-4" /> {PRACTICE.phone.display}
                  </a>
                </div>
              </div>
              <img
                src={ORTHO_IMG}
                alt="Orthodontic braces treatment at Uplift Dental & Orthodontics, Garden Grove CA"
                className="w-full rounded-3xl object-cover shadow-2xl"
                style={{ maxHeight: "500px" }}
                loading="lazy"
               width="1200" height="600"/>
            </div>
          </div>
        </section>

        {/* Brace Types */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl mb-4" style={{ color: COLORS.tealDark }}>Orthodontic Options at Uplift Dental</h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto">We offer multiple orthodontic solutions to match your age, lifestyle, budget, and clinical needs. Every treatment plan is customized — no one-size-fits-all approach.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {BRACE_TYPES.map((item) => (
                <div key={item.name} className="bg-[oklch(0.97_0.008_192)] rounded-2xl p-7 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: item.color }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-xl" style={{ color: COLORS.tealDark }}>{item.name}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-body font-bold text-white" style={{ backgroundColor: item.color }}>{item.tag}</span>
                      </div>
                      <p className="font-body text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="font-body text-gray-500 text-sm">
                Also a <strong>Platinum Invisalign® Provider</strong> — the highest tier awarded to practices with the most Invisalign experience.{" "}
                <Link href="/invisalign" className="font-semibold underline" style={{ color: COLORS.teal }}>Learn about Invisalign →</Link>
              </p>
            </div>
          </div>
        </section>

        {/* What Braces Correct */}
        <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 192)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl mb-4" style={{ color: COLORS.tealDark }}>Bite Problems Braces Can Fix</h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto">Orthodontic treatment addresses a wide range of alignment and bite issues that affect both appearance and long-term dental health.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CONCERNS.map((item) => (
                <div key={item.concern} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: COLORS.teal }} />
                    <h3 className="font-body font-semibold text-gray-800">{item.concern}</h3>
                  </div>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl mb-4" style={{ color: COLORS.tealDark }}>Your Orthodontic Journey</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Free Consultation", desc: "We evaluate your teeth, jaw, and bite with X-rays and photos. You'll receive a personalized treatment plan with options and pricing — no obligation." },
                { step: "02", title: "Records & Planning", desc: "Detailed impressions, photographs, and digital scans are taken to precisely plan tooth movements and predict your final result." },
                { step: "03", title: "Braces Placement", desc: "Brackets are bonded to your teeth and the archwire is placed. The appointment takes about 1–2 hours. You'll leave with your new smile in progress." },
                { step: "04", title: "Adjustments & Retention", desc: "Monthly adjustment visits keep treatment on track. After braces come off, custom retainers preserve your results for life." },
              ].map((item) => (
                <div key={item.step} className="text-center p-6 rounded-2xl border border-gray-100 bg-[oklch(0.97_0.008_192)]">
                  <div className="font-display text-4xl font-bold mb-3" style={{ color: COLORS.teal }}>{item.step}</div>
                  <h3 className="font-display text-lg mb-2" style={{ color: COLORS.tealDark }}>{item.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Uplift */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <h2 className="font-display text-4xl text-white mb-6">Why Choose Uplift Dental for Orthodontics?</h2>
                <div className="space-y-4">
                  {[
                    { icon: <Award className="w-5 h-5" />, text: "Platinum Invisalign® Provider — highest tier of experience and expertise" },
                    { icon: <Users className="w-5 h-5" />, text: "Orthodontics for all ages: children, teens, and adults" },
                    { icon: <Shield className="w-5 h-5" />, text: "All specialists under one roof — orthodontist, periodontist, oral surgeon, and endodontist" },
                    { icon: <Clock className="w-5 h-5" />, text: "Convenient Garden Grove location — serving Seal Beach, Los Alamitos, Cypress, Westminster, and Anaheim" },
                    { icon: <CheckCircle2 className="w-5 h-5" />, text: "Denti-Cal accepted, most PPO insurance plans, and Cherry Financing" },
                    { icon: <Star className="w-5 h-5" />, text: "4.9-star rating across 500+ Google reviews" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 text-white mt-0.5">
                        {item.icon}
                      </div>
                      <p className="font-body text-white/85 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 rounded-3xl p-8 border border-white/20">
                <h3 className="font-display text-2xl text-white mb-6">Start Your Free Consultation</h3>
                <p className="font-body text-white/75 text-sm leading-relaxed mb-6">
                  Straight teeth aren't just cosmetic — they improve your bite, reduce wear, and make cleaning easier. Dr. Clark Schneekluth, our Platinum Invisalign® Provider, has been creating beautiful smiles for over 40 years. Whether you choose braces or Invisalign, we customize your treatment to your lifestyle and goals.
                </p>
                <div className="space-y-3">
                  <Link href="/contact" className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-white rounded-full font-body font-bold text-sm" style={{ color: COLORS.tealDark }}>
                    Book Free Consultation <ChevronRight className="w-4 h-4" />
                  </Link>
                  <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full border-2 border-white/40 text-white font-body font-semibold text-sm hover:bg-white/10 transition-all">
                    <Phone className="w-4 h-4" /> Call {PRACTICE.phone.display}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center mb-12" style={{ color: COLORS.tealDark }}>Frequently Asked Questions About Braces</h2>
            <div className="space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.question} className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
