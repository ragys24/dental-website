/**
 * Periodontics — Dedicated landing page for Dr. Erene Saad, DMD MS
 * Targets: "periodontist near me", "gum disease treatment Garden Grove",
 *          "LANAP laser therapy Garden Grove", "scaling root planing 92845"
 *
 * Design: Uplift Dental — Teal & Forest Green, DM Serif Display + DM Sans
 * Layout: Asymmetric hero, two-column content, icon-grid treatments, FAQ accordion
 */
import { useEffect } from "react";
import { Link } from "wouter";
import {
  CheckCircle,
  Phone,
  Calendar,
  ChevronDown,
  ChevronRight,
  Award,
  Shield,
  Heart,
  Zap,
  Star,
  MessageSquare,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/StructuredData";
import { useState } from "react";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";

const FOREST = "oklch(0.32 0.08 155)";
const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/PATTERN-02_5ffa36bf.jpg";
const DR_SAAD = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dr-saad-periodontist_45f9c7c5.jpg";
const SMILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/smile-transformation_82cc164e.jpg";

const TREATMENTS = [
  {
    icon: <Zap className="w-6 h-6" />,
    name: "Scaling & Root Planing",
    description:
      "A deep cleaning procedure that removes tartar and bacteria from below the gumline, smoothing root surfaces to help gums reattach and heal.",
    tag: "Most Common",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    name: "LANAP Laser Therapy",
    description:
      "FDA-cleared laser gum surgery that targets diseased tissue with precision, preserving healthy gum and bone with minimal discomfort and faster healing.",
    tag: "Minimally Invasive",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    name: "Gum Grafting",
    description:
      "Restores receded gum tissue using donor or your own tissue, protecting exposed roots and improving both function and aesthetics.",
    tag: "Restorative",
  },
  {
    icon: <Award className="w-6 h-6" />,
    name: "Crown Lengthening",
    description:
      "Reshapes the gum and bone to expose more tooth structure, enabling restorations or correcting a 'gummy smile' for a more balanced appearance.",
    tag: "Cosmetic & Restorative",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    name: "Osseous Surgery",
    description:
      "Surgical reshaping of the bone around teeth to eliminate deep pockets where bacteria accumulate, stopping advanced gum disease progression.",
    tag: "Advanced Care",
  },
  {
    icon: <Star className="w-6 h-6" />,
    name: "Dental Implant Placement",
    description:
      "As a periodontist, Dr. Saad specializes in the surgical placement of implants in the jaw, creating a stable foundation for permanent replacement teeth.",
    tag: "Implants",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    name: "Periodontal Maintenance",
    description:
      "Ongoing care visits every 3–4 months for patients who have been treated for gum disease, preventing recurrence and monitoring gum health.",
    tag: "Preventive",
  },
  {
    icon: <ChevronRight className="w-6 h-6" />,
    name: "Frenectomy",
    description:
      "Removal of the frenum (tissue connecting lip or tongue to gum) that causes gum recession, spacing issues, or speech difficulties.",
    tag: "Minor Surgery",
  },
];

const STAGES = [
  {
    stage: "Healthy Gums",
    color: "oklch(0.55 0.14 155)",
    description: "Pink, firm gums that don't bleed when brushing. No bone loss.",
  },
  {
    stage: "Gingivitis",
    color: "oklch(0.65 0.14 60)",
    description: "Gums are red, swollen, and bleed easily. Fully reversible with professional cleaning.",
  },
  {
    stage: "Mild Periodontitis",
    color: "oklch(0.60 0.16 45)",
    description: "Pockets of 4–5mm form around teeth. Early bone loss begins. Requires deep cleaning.",
  },
  {
    stage: "Moderate Periodontitis",
    color: "oklch(0.55 0.18 30)",
    description: "Pockets of 5–7mm. Significant bone loss. Teeth may shift. Requires specialist care.",
  },
  {
    stage: "Severe Periodontitis",
    color: "oklch(0.45 0.20 20)",
    description: "Pockets over 7mm. Severe bone loss. Tooth mobility and loss risk. Surgical intervention needed.",
  },
];

const FAQS = [
  {
    q: "What is the difference between a periodontist and a general dentist?",
    a: "A periodontist is a dental specialist who has completed an additional 3 years of residency training beyond dental school, focusing exclusively on the prevention, diagnosis, and treatment of gum disease and the placement of dental implants. While a general dentist can treat mild gingivitis, a periodontist like Dr. Saad handles moderate to severe gum disease, complex implant cases, and gum surgery.",
  },
  {
    q: "Do I need a referral to see Dr. Saad?",
    a: "No referral is needed. One of the key advantages of Uplift Dental & Orthodontics is that all specialists — including our periodontist — are under one roof. You can book directly with Dr. Saad, or your general dentist may recommend her during your regular visit.",
  },
  {
    q: "Is gum disease treatment painful?",
    a: "Most periodontal treatments are performed under local anesthesia, so you won't feel pain during the procedure. Scaling and root planing may cause mild soreness for a day or two afterward. LANAP laser therapy is known for significantly less discomfort and faster recovery compared to traditional gum surgery.",
  },
  {
    q: "How do I know if I have gum disease?",
    a: "Common signs include gums that bleed when brushing or flossing, red or swollen gums, persistent bad breath, receding gums (teeth look longer), loose teeth, or pain when chewing. However, gum disease is often painless in its early stages — which is why regular dental checkups are essential for early detection.",
  },
  {
    q: "Does insurance cover periodontal treatment?",
    a: "Most dental insurance plans cover periodontal treatment, including scaling and root planing, as it is considered a medically necessary procedure. Coverage varies by plan. We accept most PPO insurance plans and will help verify your benefits before treatment. We also offer flexible payment options.",
  },
  {
    q: "How is LANAP different from traditional gum surgery?",
    a: "Traditional osseous surgery requires cutting the gum tissue and sutures. LANAP (Laser-Assisted New Attachment Procedure) uses a precise laser to remove diseased tissue while leaving healthy tissue intact. Benefits include less bleeding, less swelling, faster healing, and no scalpel or stitches in most cases.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[oklch(0.88_0.015_192)]">
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4 font-body font-semibold text-[oklch(0.18_0.04_185)] hover:text-[oklch(0.42_0.09_192)] transition-colors"
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
        <p className="font-body text-[oklch(0.42_0.04_185)] text-base leading-relaxed pb-5">{a}</p>
      )}
    </div>
  );
}

export default function Periodontics() {
  // Inject page-specific SEO schema
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": "https://upliftdental.com/periodontics#webpage",
      "url": "https://upliftdental.com/periodontics",
      "name": "Periodontist in Garden Grove, CA | Gum Disease Treatment | Uplift Dental",
      "description":
        `Board-eligible periodontist Dr. Erene Saad, DMD MS offers gum disease treatment, LANAP laser therapy, gum grafts, crown lengthening, and dental implants in ${PRACTICE.address.city}, ${PRACTICE.address.state} ${PRACTICE.address.zip}.`,
      "about": {
        "@type": "MedicalCondition",
        "name": "Periodontal Disease",
        "alternateName": ["Gum Disease", "Periodontitis", "Gingivitis"],
      },
      "specialty": "Periodontology",
      "isPartOf": { "@id": "https://upliftdental.com/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upliftdental.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://upliftdental.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Periodontics", "item": "https://upliftdental.com/periodontics" },
        ],
      },
    };
    const id = "periodontics-schema";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // Update page title and meta description
    document.title = "Periodontist in Garden Grove, CA | Gum Disease Treatment | Uplift Dental";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        `Dr. Erene Saad, DMD MS — board-eligible periodontist at Uplift Dental & Orthodontics in ${PRACTICE.address.city}, ${PRACTICE.address.state} ${PRACTICE.address.zip}. Gum disease treatment, LANAP laser therapy, gum grafts, crown lengthening & dental implants. No referral needed.`
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
        title="Periodontist in Garden Grove, CA | Gum Disease Treatment | Uplift Dental"
        description={`Dr. Erene Saad, DMD MS — Board-trained Periodontist at Uplift Dental in ${PRACTICE.address.city}, ${PRACTICE.address.state} ${PRACTICE.address.zip}. Gum disease treatment, LANAP laser therapy, gum grafts, scaling & root planing. Free consultations. Call ${PRACTICE.phone.display}.`}
        canonical="https://upliftdental.com/periodontics"
      />
      <FAQSchema faqs={FAQS.map(f => ({ question: f.q, answer: f.a }))} id="ld-faq-periodontics" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Services", url: "https://upliftdental.com/services" },
          { name: "Periodontics", url: "https://upliftdental.com/periodontics" },
        ]}
      />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "500px auto" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-body font-semibold"
                style={{
                  backgroundColor: "oklch(0.70 0.07 195 / 0.2)",
                  color: "oklch(0.85 0.05 195)",
                  border: "1px solid oklch(0.70 0.07 195 / 0.4)",
                }}
              >
                <Award className="w-4 h-4" />
                In-House Periodontist · No Referral Needed
              </div>
              <h1 className="font-display text-5xl md:text-6xl text-white mb-6 leading-tight">
                Periodontist &amp;<br />
                <span style={{ color: "oklch(0.78 0.07 195)" }}>Gum Disease</span><br />
                Treatment in Garden Grove, CA
              </h1>
              <p className="font-body text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
                Dr. Erene Saad, DMD MS is a board-eligible periodontist specializing in gum disease treatment, LANAP laser therapy, gum grafting, and dental implants — all under one roof at Uplift Dental & Orthodontics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-body font-semibold text-base transition-all shadow-lg"
                  style={{ backgroundColor: "oklch(0.78 0.07 195)", color: COLORS.tealDark }}
                >
                  <Calendar className="w-5 h-5" />
                  Book Perio Consultation
                </Link>
                <a
                  href={PRACTICE.phone.tel}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/60 text-white font-body font-semibold text-base hover:bg-white/10 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  {PRACTICE.phone.display}
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] max-w-sm mx-auto lg:mx-0">
                <img
                  src={DR_SAAD}
                  alt="Dr. Erene Saad, DMD MS — Periodontist at Uplift Dental & Orthodontics, Garden Grove CA"
                  className="w-full h-full object-cover object-top"
                 loading="lazy" width="300" height="400"/>
              </div>
              {/* Floating credential card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[oklch(0.90_0.015_185)] max-w-[200px]">
                <div className="font-display text-lg text-[oklch(0.18_0.04_185)] leading-tight">Dr. Erene Saad</div>
                <div className="font-body text-xs font-semibold mt-1" style={{ color: COLORS.teal }}>DMD MS · Periodontist</div>
                <div className="font-body text-xs text-[oklch(0.55_0.03_185)] mt-1">Board-Eligible Specialist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-6 border-b border-[oklch(0.92_0.015_192)]" style={{ backgroundColor: COLORS.tealPale }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-body font-semibold" style={{ color: COLORS.tealDark }}>
            {[
              "Board-Eligible Periodontist",
              "LANAP Laser Certified",
              "Dental Implant Specialist",
              "No Referral Required",
              "Most Insurance Accepted",
              `${PRACTICE.address.city}, ${PRACTICE.address.state} ${PRACTICE.address.zip}`,
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: COLORS.teal }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT DR. SAAD ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.98 0.005 90)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="font-body text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: COLORS.teal }}
              >
                Meet Your Periodontist
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-6">
                Dr. Erene Saad, DMD MS
              </h2>
              <p className="font-body text-[oklch(0.40_0.04_185)] text-lg leading-relaxed mb-5">
                Dr. Saad is a board-eligible periodontist who completed her dental degree (DMD) and her Master of Science (MS) in Periodontology through an accredited specialty residency program. Her advanced training gives her expertise in diagnosing and treating all stages of gum disease, as well as placing dental implants with precision.
              </p>
              <p className="font-body text-[oklch(0.40_0.04_185)] text-lg leading-relaxed mb-8">
                As part of the Uplift Dental & Orthodontics team, Dr. Saad brings specialist-level periodontal care directly to Garden Grove — no referrals, no separate offices, no extra trips. She works closely with our general dentists and orthodontist to provide comprehensive, coordinated care for every patient.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Specialty", value: "Periodontology" },
                  { label: "Degree", value: "DMD, MS" },
                  { label: "Status", value: "Board-Eligible" },
                  { label: "Location", value: "Garden Grove, CA" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-2xl p-4 border border-[oklch(0.90_0.015_185)] shadow-sm">
                    <div className="font-body text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: COLORS.teal }}>
                      {item.label}
                    </div>
                    <div className="font-display text-lg text-[oklch(0.18_0.04_185)]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={SMILE_IMG}
                alt="Healthy gums and beautiful smile after periodontal treatment at Uplift Dental Garden Grove CA"
                className="w-full rounded-3xl object-cover shadow-2xl"
                style={{ maxHeight: "480px" }}
               loading="lazy"/>
              <div
                className="absolute -top-5 -right-5 rounded-2xl p-5 shadow-xl text-white"
                style={{ backgroundColor: COLORS.tealDark }}
              >
                <div className="font-display text-3xl font-bold">Gum</div>
                <div className="font-display text-3xl font-bold">Health</div>
                <div className="font-body text-xs mt-1 text-white/70">Specialist On-Site</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUM DISEASE STAGES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
              Understanding Gum Disease
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-4">
              The Stages of Periodontal Disease
            </h2>
            <p className="font-body text-[oklch(0.45_0.04_185)] text-lg max-w-2xl mx-auto">
              Gum disease progresses silently. Early detection and treatment prevent tooth loss and protect your overall health.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {STAGES.map((s, i) => (
              <div
                key={s.stage}
                className="rounded-2xl p-5 text-white relative overflow-hidden"
                style={{ backgroundColor: s.color }}
              >
                <div className="font-body text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
                  Stage {i + 1}
                </div>
                <div className="font-display text-lg mb-3">{s.stage}</div>
                <p className="font-body text-sm leading-relaxed opacity-90">{s.description}</p>
              </div>
            ))}
          </div>
          <div
            className="mt-8 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ backgroundColor: COLORS.tealPale }}
          >
            <div>
              <p className="font-display text-xl text-[oklch(0.18_0.04_185)]">
                Not sure what stage you're at?
              </p>
              <p className="font-body text-[oklch(0.45_0.04_185)] mt-1">
                Schedule a periodontal evaluation with Dr. Saad — most insurance plans cover diagnostic visits.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-white transition-all shadow-md"
              style={{ backgroundColor: COLORS.teal }}
            >
              <Calendar className="w-4 h-4" />
              Book Evaluation
            </Link>
          </div>
        </div>
      </section>

      {/* ── TREATMENTS ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
              Periodontal Treatments
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-4">
              Comprehensive Gum Care Under One Roof
            </h2>
            <p className="font-body text-[oklch(0.45_0.04_185)] text-lg max-w-2xl mx-auto">
              From non-surgical deep cleaning to advanced laser therapy and implant placement — Dr. Saad offers the full spectrum of periodontal care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TREATMENTS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-[oklch(0.90_0.015_185)] shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: COLORS.tealPale, color: COLORS.teal }}
                >
                  {t.icon}
                </div>
                <div
                  className="inline-block text-xs font-body font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3"
                  style={{ backgroundColor: "oklch(0.90 0.04 192)", color: FOREST }}
                >
                  {t.tag}
                </div>
                <h3 className="font-display text-lg text-[oklch(0.18_0.04_185)] mb-2">{t.name}</h3>
                <p className="font-body text-sm text-[oklch(0.45_0.04_185)] leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE UPLIFT ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
                Why Patients Choose Us
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-8">
                Specialist Care Without the Runaround
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: "No Referral, No Waiting",
                    desc: "Book directly with Dr. Saad. No need to visit a separate specialist office or wait weeks for a referral appointment.",
                  },
                  {
                    title: "Coordinated Multi-Specialty Care",
                    desc: "Your periodontist, general dentist, and orthodontist all communicate directly — your treatment plan is seamlessly integrated.",
                  },
                  {
                    title: "LANAP Laser Technology",
                    desc: "We offer FDA-cleared LANAP laser gum therapy — a less invasive alternative to traditional gum surgery with faster recovery.",
                  },
                  {
                    title: "Insurance & Flexible Payments",
                    desc: "We accept most PPO plans and Denti-Cal. Flexible payment options available for patients without insurance.",
                  },
                  {
                    title: "Convenient Garden Grove Location",
                    desc: `Located at ${PRACTICE.address.full} — easily accessible from Seal Beach, Los Alamitos, Westminster, and Anaheim.`,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: COLORS.tealPale }}
                    >
                      <CheckCircle className="w-4 h-4" style={{ color: COLORS.teal }} />
                    </div>
                    <div>
                      <div className="font-body font-semibold text-[oklch(0.18_0.04_185)]">{item.title}</div>
                      <div className="font-body text-sm text-[oklch(0.45_0.04_185)] mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-3xl p-8 text-white"
              style={{ backgroundColor: COLORS.tealDark }}
            >
              <div
                className="absolute inset-0 opacity-10 rounded-3xl"
                style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "400px auto" }}
              />
              <div className="relative">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-current" style={{ color: "oklch(0.85 0.14 85)" }} />
                  ))}
                </div>
                <blockquote className="font-display text-2xl text-white leading-snug mb-6">
                  "Dr. Saad is a wonderful periodontist. I was nervous about my gum treatment but she explained everything clearly and made the procedure painless. My gum health has improved dramatically."
                </blockquote>
                <div className="font-body text-white/70 text-sm">— Aisha M., Garden Grove, CA</div>
                <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-3 gap-4 text-center">
                  {[
                    { num: "5.0", label: "Star Rating" },
                    { num: "100+", label: "Google Reviews" },
                    { num: "20+", label: "Years Serving OC" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="font-display text-3xl text-white">{stat.num}</div>
                      <div className="font-body text-xs text-white/60 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
              Common Questions
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)]">
              Periodontics FAQ
            </h2>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[oklch(0.90_0.015_185)]">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 text-white relative overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "500px auto" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-5">
            Take the First Step Toward Healthier Gums
          </h2>
          <p className="font-body text-white/75 text-xl mb-10 max-w-2xl mx-auto">
            Gum disease is silent — it progresses without pain until teeth are at risk. Dr. Erene Saad, our board-trained periodontist, specializes in advanced gum therapy including LANAP laser treatment, which regenerates bone and gum tissue without surgery. Early detection and treatment can save your teeth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-base transition-all shadow-lg"
              style={{ backgroundColor: "oklch(0.78 0.07 195)", color: COLORS.tealDark }}
            >
              <Calendar className="w-5 h-5" />
              Book Perio Consultation
            </Link>
            <a
              href={SMS.general}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/60 text-white font-body font-semibold text-base hover:bg-white/10 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Text Us: {PRACTICE.sms.display}
            </a>
          </div>
          <p className="font-body text-white/50 text-sm mt-6">
            {PRACTICE.address.full} · {PRACTICE.phone.display}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
