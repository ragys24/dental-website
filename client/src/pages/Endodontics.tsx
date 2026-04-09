/**
 * Endodontics — Dedicated landing page for Dr. Daniel Ghobrial, DDS
 * Targets: "endodontist near me", "root canal specialist Garden Grove",
 *          "root canal treatment 92845", "endodontist Garden Grove CA"
 *
 * Design: Uplift Dental — Deep Navy & Teal, DM Serif Display + DM Sans
 * Layout: Asymmetric hero, two-column content, icon-grid treatments, myth-busting section, FAQ accordion
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  CheckCircle,
  Phone,
  Calendar,
  ChevronDown,
  ChevronRight,
  Award,
  Shield,
  Microscope,
  Zap,
  Star,
  MessageSquare,
  Heart,
  Clock,
  AlertCircle,
  ThumbsUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/StructuredData";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";

const NAVY = "oklch(0.18 0.05 240)";
const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/PATTERN-02_5ffa36bf.jpg";
const DR_GHOBRIAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/IMG_9486_6f5df7e4.jpeg";
const TECH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dental-tech-clean-TzX7DySrWpcEhPpd2VXxTG.webp";
const SMILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/smile-transformation_82cc164e.jpg";

const TREATMENTS = [
  {
    icon: <Zap className="w-6 h-6" />,
    name: "Root Canal Therapy",
    description:
      "Precise removal of infected or damaged pulp tissue to relieve pain, eliminate infection, and save your natural tooth. Most patients are surprised by how comfortable the procedure is.",
    tag: "Most Common",
  },
  {
    icon: <Microscope className="w-6 h-6" />,
    name: "Microscopic Endodontics",
    description:
      "Using high-powered operating microscopes for unmatched visualization — critical for locating calcified canals, hairline cracks, and complex root anatomy invisible to the naked eye.",
    tag: "Advanced Precision",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    name: "Surgical Endodontics (Apicoectomy)",
    description:
      "A minimally invasive surgical procedure to remove infected tissue at the root tip when conventional root canal therapy is insufficient. Preserves the tooth when other options have failed.",
    tag: "Surgical",
  },
  {
    icon: <Award className="w-6 h-6" />,
    name: "Complex Retreatment",
    description:
      "Re-treatment of previously root-canaled teeth that have failed or become re-infected — often avoiding extraction entirely. Dr. Ghobrial specializes in the most challenging retreatment cases.",
    tag: "Specialist Care",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    name: "Trauma Management",
    description:
      "Specialized care for teeth injured by trauma — including luxation injuries, avulsions (knocked-out teeth), and root fractures. Prompt treatment dramatically improves outcomes.",
    tag: "Emergency",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    name: "Regenerative Endodontics",
    description:
      "Biologically-based procedures to restore the vitality of immature teeth with incomplete root development. Cutting-edge treatment that promotes continued root growth in young patients.",
    tag: "Regenerative",
  },
  {
    icon: <Star className="w-6 h-6" />,
    name: "Advanced Pain Control",
    description:
      "Targeted anesthetic techniques including supplemental injections to ensure complete comfort — even for anxious patients or those who are difficult to numb with standard techniques.",
    tag: "Patient Comfort",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    name: "Digital Imaging & CBCT",
    description:
      "3D cone beam CT imaging for precise diagnosis of complex root anatomy, fractures, and periapical pathology — enabling more accurate treatment planning and better outcomes.",
    tag: "Diagnostic",
  },
];

const MYTHS = [
  {
    myth: "Root canals are extremely painful",
    truth: "Modern root canal therapy is no more uncomfortable than getting a filling. With advanced anesthesia and Dr. Ghobrial's gentle technique, most patients are pleasantly surprised.",
  },
  {
    myth: "It's better to just pull the tooth",
    truth: "Saving your natural tooth is almost always the better option. Natural teeth function better, last longer, and prevent bone loss. Extraction leads to shifting teeth and costly replacements.",
  },
  {
    myth: "Root canals cause illness",
    truth: "This myth stems from flawed research from the 1920s. Modern science has thoroughly debunked this. Root canals eliminate infection — they don't cause it.",
  },
  {
    myth: "If it doesn't hurt, I don't need one",
    truth: "Infected teeth can be painless, especially in later stages when the nerve has died. Only an X-ray and clinical exam can determine if a root canal is needed.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Diagnosis & Imaging",
    desc: "Digital X-rays and 3D CBCT imaging reveal the full anatomy of your tooth's root system, identifying infection, cracks, and complex canal configurations.",
  },
  {
    number: "02",
    title: "Comfortable Anesthesia",
    desc: "Dr. Ghobrial uses advanced anesthetic techniques to ensure you're completely numb before beginning. Anxious patients can also request nitrous oxide sedation.",
  },
  {
    number: "03",
    title: "Microscopic Treatment",
    desc: "Using a high-powered operating microscope, Dr. Ghobrial precisely removes infected pulp tissue, cleans and shapes the canals, and eliminates all bacteria.",
  },
  {
    number: "04",
    title: "Sealing & Restoration",
    desc: "The canals are filled with a biocompatible material (gutta-percha) and sealed. A crown is typically placed afterward to protect and restore full function.",
  },
];

const FAQS = [
  {
    q: "How do I know if I need a root canal?",
    a: "Common signs include severe toothache, prolonged sensitivity to hot or cold, darkening of the tooth, swelling or tenderness in nearby gums, or a persistent pimple on the gums. However, some infected teeth have no symptoms at all — which is why regular X-rays are important. Dr. Ghobrial will evaluate your tooth and recommend treatment only when necessary.",
  },
  {
    q: "How long does a root canal take?",
    a: "Most root canals are completed in one or two appointments of 60–90 minutes each. Complex cases, severely curved canals, or retreatments may require additional time. Dr. Ghobrial will give you a clear timeline at your consultation.",
  },
  {
    q: "Will I be in pain after the root canal?",
    a: "Some mild soreness or sensitivity for 2–3 days after the procedure is normal and manageable with over-the-counter pain relievers like ibuprofen. Severe or prolonged pain is uncommon. Most patients return to normal activities the next day.",
  },
  {
    q: "Do I need a crown after a root canal?",
    a: "In most cases, yes. A root canal removes the pulp that kept the tooth vital, making it more brittle over time. A crown protects the tooth from fracture and restores full chewing function. Dr. Ghobrial will coordinate with your general dentist for the final restoration.",
  },
  {
    q: "Do I need a referral to see Dr. Ghobrial?",
    a: "No referral is needed. At Uplift Dental & Orthodontics, all specialists — including our endodontist — are under one roof. You can book directly with Dr. Ghobrial, or your general dentist may refer you during a regular visit.",
  },
  {
    q: "Does insurance cover root canal treatment?",
    a: "Most dental insurance plans cover root canal therapy as it is considered a medically necessary procedure. Coverage varies by plan — typically 50–80% after deductible. We accept most PPO plans and will verify your benefits before treatment. Flexible payment options are also available.",
  },
  {
    q: "What is the difference between an endodontist and a general dentist?",
    a: "An endodontist is a dental specialist who has completed an additional 2–3 years of residency training beyond dental school, focusing exclusively on diagnosing tooth pain and performing root canal procedures. Endodontists perform root canals every day — it's their specialty. For complex, difficult, or retreatment cases, seeing an endodontist like Dr. Ghobrial gives you the best chance of saving your tooth.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[oklch(0.88_0.015_220)]">
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4 font-body font-semibold text-[oklch(0.18_0.05_240)] hover:text-[oklch(0.42_0.09_192)] transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 mt-0.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: COLORS.teal }}
        />
      </button>
      {open && (
        <p className="font-body text-[oklch(0.38_0.04_220)] text-base leading-relaxed pb-5">{a}</p>
      )}
    </div>
  );
}

export default function Endodontics() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": "https://upliftdental.com/endodontics#webpage",
      "url": "https://upliftdental.com/endodontics",
      "name": "Endodontist in Garden Grove, CA | Root Canal Specialist | Uplift Dental",
      "description":
        "Dr. Daniel Ghobrial, DDS — UCSF-trained endodontist at Uplift Dental & Orthodontics in {PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}. Root canal therapy, microscopic endodontics, surgical endodontics, and complex retreatment. No referral needed. Call {PRACTICE.phone.display}.",
      "about": {
        "@type": "MedicalProcedure",
        "name": "Root Canal Therapy",
        "alternateName": ["Endodontic Treatment", "Root Canal Treatment", "Endodontics"],
      },
      "specialty": "Endodontics",
      "isPartOf": { "@id": "https://upliftdental.com/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upliftdental.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://upliftdental.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Endodontics", "item": "https://upliftdental.com/endodontics" },
        ],
      },
    };
    const id = "endodontics-schema";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    document.title = "Endodontist in Garden Grove, CA | Root Canal Specialist | Uplift Dental";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Dr. Daniel Ghobrial, DDS — UCSF-trained endodontist at Uplift Dental & Orthodontics in {PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}. Root canal therapy, microscopic endodontics, surgical endodontics & complex retreatment. No referral needed."
      );
    }

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageSEO
        title="Endodontist in Garden Grove, CA | Root Canal Specialist | Uplift Dental"
        description="Dr. Daniel Ghobrial, DDS — UCSF-trained endodontist at Uplift Dental & Orthodontics in {PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}. Root canal therapy, microscopic endodontics, surgical endodontics & complex retreatment. No referral needed."
        canonical="https://upliftdental.com/endodontics"
      />
      <FAQSchema faqs={FAQS.map(f => ({ question: f.q, answer: f.a }))} id="ld-faq-endodontics" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Services", url: "https://upliftdental.com/services" },
          { name: "Endodontics", url: "https://upliftdental.com/endodontics" },
        ]}
      />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: NAVY }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "500px auto" }}
        />
        <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-semibold mb-6"
              style={{ backgroundColor: "oklch(0.42 0.09 192 / 0.2)", color: "oklch(0.75 0.10 192)" }}
            >
              <Award className="w-4 h-4" />
              UCSF-Trained Endodontist · Garden Grove, CA
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Root Canal{" "}
              <span style={{ color: "oklch(0.65 0.12 192)" }}>Specialist</span>
              <br />in Garden Grove
            </h1>
            <p className="font-body text-white/75 text-lg leading-relaxed mb-8 max-w-lg">
              Dr. Daniel Ghobrial, DDS brings UCSF-trained precision and microscopic technology to every root canal procedure — saving teeth that other dentists might give up on.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base shadow-xl transition-all hover:opacity-90"
                style={{ backgroundColor: COLORS.teal, color: "white" }}
              >
                <Calendar className="w-5 h-5" />
                Book with Dr. Ghobrial
              </Link>
              <a
                href={PRACTICE.phone.tel}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-body font-semibold text-base rounded-full hover:bg-white/10 transition-all"
              >
                <Phone className="w-5 h-5" />
                {PRACTICE.phone.display}
              </a>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { icon: <CheckCircle className="w-4 h-4" />, text: "No Referral Needed" },
                { icon: <Shield className="w-4 h-4" />, text: "Most Insurance Accepted" },
                { icon: <Clock className="w-4 h-4" />, text: "Same-Day Emergency" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/70 font-body text-sm">
                  <span style={{ color: "oklch(0.65 0.12 192)" }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dr. Ghobrial photo */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              className="absolute -top-6 -right-6 w-72 h-72 rounded-full opacity-15"
              style={{ background: `radial-gradient(circle, ${COLORS.teal}, transparent)` }}
            />
            <div className="relative w-80 lg:w-96">
              <div
                className="absolute inset-0 rounded-2xl translate-x-3 translate-y-3"
                style={{ backgroundColor: "oklch(0.42 0.09 192 / 0.3)" }}
              />
              <img
                src={DR_GHOBRIAL}
                alt="Dr. Daniel Ghobrial DDS, Endodontist at Uplift Dental Garden Grove CA"
                className="relative w-full rounded-2xl object-cover shadow-2xl"
                style={{ aspectRatio: "3/4", objectPosition: "center top" }}
              />
              {/* Credential badge */}
              <div
                className="absolute -bottom-5 -left-5 rounded-xl px-5 py-4 shadow-xl"
                style={{ backgroundColor: COLORS.teal }}
              >
                <p className="font-display text-white font-bold text-base leading-tight">Dr. Daniel Ghobrial</p>
                <p className="font-body text-white/80 text-xs mt-0.5">DDS · Endodontist · UCSF</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK STATS ── */}
      <section className="py-10 border-b" style={{ backgroundColor: COLORS.tealPale }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "UCSF", label: "Specialty Training" },
            { value: "2-yr", label: "Endo Residency" },
            { value: "8+", label: "Procedures Offered" },
            { value: "Same Day", label: "Emergency Care" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-3xl font-bold" style={{ color: COLORS.tealDark }}>{value}</p>
              <p className="font-body text-sm mt-1" style={{ color: "oklch(0.45 0.04 220)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT DR. GHOBRIAL ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div
              className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl"
              style={{ backgroundColor: "oklch(0.42 0.09 192 / 0.12)" }}
            />
            <img
              src={TECH_IMG}
              alt="Advanced endodontic microscope technology at Uplift Dental Garden Grove"
              className="relative w-full rounded-2xl object-cover shadow-lg"
              loading="lazy"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
              Meet Your Specialist
            </p>
            <h2 className="font-display text-4xl font-bold mb-6" style={{ color: NAVY }}>
              Dr. Daniel Ghobrial, DDS
            </h2>
            <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: "oklch(0.38 0.04 220)" }}>
              <p>
                Dr. Daniel Ghobrial is a dedicated endodontist committed to precision, evidence-based care, and the preservation of natural teeth. He completed his Doctor of Dental Surgery degree at UCSF in 2022, followed by a two-year advanced specialty residency in Endodontics at UCSF — one of the nation's leading dental institutions — where he received his certificate of specialty training in 2024.
              </p>
              <p>
                During his residency, Dr. Ghobrial trained under nationally recognized endodontists and gained extensive experience in microscopic endodontics, surgical procedures, complex retreatment, and the management of dental trauma. He is proficient in the latest techniques including regenerative endodontics and CBCT-guided treatment planning.
              </p>
              <p>
                At Uplift Dental & Orthodontics, Dr. Ghobrial brings specialist-level endodontic care in-house — so patients never need a referral to save their teeth.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["DDS, UCSF 2022", "Endo Residency, UCSF 2024", "Microscopic Endodontics", "CBCT Imaging", "Regenerative Endo"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full font-body text-sm font-medium"
                  style={{ backgroundColor: COLORS.tealPale, color: COLORS.tealDark }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW A ROOT CANAL WORKS ── */}
      <section className="py-20" style={{ backgroundColor: COLORS.tealPale }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
              The Process
            </p>
            <h2 className="font-display text-4xl font-bold" style={{ color: NAVY }}>
              What to Expect During Your Root Canal
            </h2>
            <p className="font-body text-base mt-4 max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.04 220)" }}>
              Modern root canal therapy is a straightforward, comfortable procedure. Here's exactly what happens from start to finish.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-7 shadow-sm border"
                style={{ borderColor: "oklch(0.88 0.015 192)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-display text-xl font-bold text-white mb-5"
                  style={{ backgroundColor: COLORS.teal }}
                >
                  {step.number}
                </div>
                <h3 className="font-display text-lg font-bold mb-3" style={{ color: NAVY }}>{step.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "oklch(0.45 0.04 220)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TREATMENTS ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
              Services
            </p>
            <h2 className="font-display text-4xl font-bold" style={{ color: NAVY }}>
              Endodontic Treatments We Offer
            </h2>
            <p className="font-body text-base mt-4 max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.04 220)" }}>
              From routine root canals to the most complex retreatment cases, Dr. Ghobrial handles it all in-house — no referrals, no runaround.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TREATMENTS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-6 border hover:shadow-md transition-shadow"
                style={{ borderColor: "oklch(0.90 0.015 192)", backgroundColor: "white" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-white"
                  style={{ backgroundColor: COLORS.teal }}
                >
                  {t.icon}
                </div>
                <span
                  className="inline-block px-2.5 py-1 rounded-full font-body text-xs font-semibold mb-3"
                  style={{ backgroundColor: COLORS.tealPale, color: COLORS.tealDark }}
                >
                  {t.tag}
                </span>
                <h3 className="font-display text-base font-bold mb-2" style={{ color: NAVY }}>{t.name}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "oklch(0.45 0.04 220)" }}>{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MYTH BUSTING ── */}
      <section className="py-20" style={{ backgroundColor: NAVY }}>
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "400px auto" }}
        />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.65 0.12 192)" }}>
              Setting the Record Straight
            </p>
            <h2 className="font-display text-4xl font-bold text-white">
              Root Canal Myths — Debunked
            </h2>
            <p className="font-body text-white/70 text-base mt-4 max-w-2xl mx-auto">
              Root canals have an undeserved reputation. Here's the truth behind the most common misconceptions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {MYTHS.map((item) => (
              <div
                key={item.myth}
                className="rounded-2xl p-7"
                style={{ backgroundColor: "oklch(0.25 0.05 240)" }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "oklch(0.65 0.18 30)" }} />
                  <p className="font-body font-semibold text-white/60 text-sm line-through">{item.myth}</p>
                </div>
                <div className="flex items-start gap-3">
                  <ThumbsUp className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "oklch(0.65 0.12 192)" }} />
                  <p className="font-body text-white/85 text-sm leading-relaxed">{item.truth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE UPLIFT ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
              Why Uplift Dental
            </p>
            <h2 className="font-display text-4xl font-bold mb-8" style={{ color: NAVY }}>
              Specialist Endodontic Care — Right Here in Garden Grove
            </h2>
            <div className="space-y-5">
              {[
                {
                  icon: <Award className="w-5 h-5" />,
                  title: "UCSF-Trained Specialist",
                  desc: "Dr. Ghobrial completed his endodontic residency at one of the top dental schools in the nation — bringing that expertise directly to Garden Grove.",
                },
                {
                  icon: <Microscope className="w-5 h-5" />,
                  title: "Microscopic Precision",
                  desc: "High-powered operating microscopes allow Dr. Ghobrial to see and treat anatomy that's invisible to the naked eye — critical for complex cases.",
                },
                {
                  icon: <CheckCircle className="w-5 h-5" />,
                  title: "No Referral Needed",
                  desc: "All specialists are under one roof. Your general dentist, orthodontist, periodontist, and endodontist work together — no driving across town.",
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: "Most Insurance Accepted",
                  desc: "We accept most PPO plans, Denti-Cal, and military insurance. Our team will verify your benefits and explain your coverage before treatment begins.",
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  title: "Same-Day Emergency Appointments",
                  desc: "Severe toothache? Dental abscess? We offer same-day emergency endodontic appointments for patients in Garden Grove and surrounding cities.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white"
                    style={{ backgroundColor: COLORS.teal }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-body font-bold text-base mb-1" style={{ color: NAVY }}>{title}</h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "oklch(0.45 0.04 220)" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -top-4 -right-4 w-full h-full rounded-2xl"
              style={{ backgroundColor: "oklch(0.42 0.09 192 / 0.10)" }}
            />
            <img
              src={SMILE_IMG}
              alt="Patient smiling after successful root canal treatment at Uplift Dental Garden Grove"
              className="relative w-full rounded-2xl object-cover shadow-lg"
              loading="lazy"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ backgroundColor: COLORS.tealPale }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
              Common Questions
            </p>
            <h2 className="font-display text-4xl font-bold" style={{ color: NAVY }}>
              Root Canal FAQs
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm px-8 py-4">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "400px auto" }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Don't Wait on Tooth Pain
          </h2>
          <p className="font-body text-white/75 text-lg mb-8 max-w-xl mx-auto">
            Root canals have a reputation for pain, but the truth is they relieve pain. Dr. Daniel Ghobrial, our UCSF-trained endodontist, performs root canals with precision and care — using advanced microscopic techniques to save your natural tooth. Most patients report the procedure is no more uncomfortable than a filling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white font-body font-bold text-base rounded-full shadow-xl hover:bg-white/90 transition-all"
              style={{ color: COLORS.tealDark }}
            >
              <Calendar className="w-5 h-5" />
              Book with Dr. Ghobrial
            </Link>
            <a
              href={SMS.general}
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-body font-semibold text-base rounded-full hover:bg-white/10 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Text Us for Faster Service
            </a>
          </div>
          <p className="font-body text-white/50 text-sm mt-6">
            {PRACTICE.address.full} · {PRACTICE.phone.display} · No referral needed
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
