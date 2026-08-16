/*
   UPLIFT DENTAL — Community Outreach Page
   Design: Elevated Warmth; community presence documented with authentic, consent-cleared images.
   Captions remain factual and do not infer event names, partners, attendance, or outcomes.
   ============================================================= */
import { useEffect } from "react";
import { Link } from "wouter";
import { Heart, Users, Smile, Award, ChevronRight, Calendar, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PRACTICE } from "@/lib/constants";
import { SMS } from "@/lib/sms";
import { trackSchedule } from "@/lib/tracking";

const OUTREACH_IMAGES = {
  img1: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/IMG_3712_45b73b36.HEIC",
  img2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/IMG_3710_58ce0eca.HEIC",
  img3: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/IMG_9375_edc32dfa.JPG",
  img4: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/IMG_3767_8abeca31.HEIC",
  img5: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/IMG_4232_9393e7fd.HEIC",
  img6: "/manus-storage/img_3750-web_4b848a72.webp",
  img7: "/manus-storage/img_7836-web_d73f2274.webp",
};

export default function CommunityOutreach() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageSEO
        title="Community Outreach & Pediatric Dental Education | Uplift Dental"
        description="Uplift Dental provides free dental screenings, oral health education, and preventive care to children and families in Garden Grove. Learn about our community outreach programs."
        canonical="https://upliftdental.com/community-outreach"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com" },
        { name: "Community Outreach", url: "https://upliftdental.com/community-outreach" },
      ]} />

      <Navbar />

      {/* ── HERO ── */}
      <section className="py-20 bg-gradient-to-br from-[oklch(0.42_0.09_185)] to-[oklch(0.35_0.08_190)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-white/80 mb-3">Our Mission</p>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">Community Outreach & Pediatric Dental Education</h1>
            <p className="font-body text-xl text-white/90 max-w-3xl mx-auto mb-8">
              At Uplift Dental, we believe healthy smiles shouldn't be a privilege. We're committed to providing free dental screenings, oral health education, and preventive care to children and families in our community — especially those who might not otherwise have access to quality dental services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" onClick={trackSchedule}>
                <button className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white bg-white/20 hover:bg-white/30 transition-all border border-white/40">
                  <Calendar className="w-5 h-5" />
                  Schedule Your Family's Appointment
                </button>
              </Link>
              <a href={PRACTICE.phone.tel} onClick={trackSchedule}>
                <button className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-[oklch(0.42_0.09_185)] bg-white hover:bg-white/90 transition-all">
                  <Phone className="w-5 h-5" />
                  Call Us Today
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "1,000+", label: "Children Screened", desc: "Free oral health screenings annually" },
              { stat: "100%", label: "Denti-Cal Accepted", desc: "Serving underserved families" },
              { stat: "40+", label: "Years of Service", desc: "Serving Garden Grove since 1983" },
              { stat: "5", label: "Specialists", desc: "Expert care for all dental needs" },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-display text-5xl font-bold text-[oklch(0.42_0.09_185)] mb-2">{item.stat}</div>
                <div className="font-body font-semibold text-lg text-gray-800 mb-1">{item.label}</div>
                <p className="font-body text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTREACH PROGRAMS ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 192)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-4">Our Outreach Programs</h2>
            <p className="font-body text-lg text-[oklch(0.45_0.04_185)] max-w-2xl mx-auto">We actively participate in community events to educate children and families about preventive dental care and the importance of early intervention.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <img src={OUTREACH_IMAGES.img1} alt="Uplift Dental team providing pediatric dental education and oral health guidance to children at community school outreach event" className="rounded-2xl shadow-lg w-full h-96 object-cover" loading="lazy" />
            <div>
              <h3 className="font-display text-3xl text-[oklch(0.18_0.04_185)] mb-4">School Dental Screenings</h3>
              <p className="font-body text-gray-700 mb-4">We visit local schools to provide free dental screenings and teach children proper brushing techniques, the importance of flossing, and how to maintain healthy teeth and gums.</p>
              <ul className="space-y-3">
                {["Free comprehensive dental exams", "Oral health education for students", "Early detection of dental problems", "Referrals for treatment when needed"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Smile className="w-5 h-5 text-[oklch(0.42_0.09_185)] flex-shrink-0 mt-1" />
                    <span className="font-body text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="font-display text-3xl text-[oklch(0.18_0.04_185)] mb-4">Community Health Fairs</h3>
              <p className="font-body text-gray-700 mb-4">Our team participates in local health fairs and community events to provide free dental screenings, answer questions about oral health, and connect families with dental resources.</p>
              <ul className="space-y-3">
                {["Free dental consultations", "Preventive care guidance", "Insurance and financial assistance information", "Direct access to our dental team"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-[oklch(0.42_0.09_185)] flex-shrink-0 mt-1" />
                    <span className="font-body text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <img src={OUTREACH_IMAGES.img2} alt="Dental professionals screening children's teeth and providing oral health education at community health fair to promote preventive dental care" className="rounded-2xl shadow-lg w-full h-96 object-cover" loading="lazy" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img src={OUTREACH_IMAGES.img3} alt="Uplift Dental dentists providing free dental screenings and oral health guidance to children at school outreach program" className="rounded-2xl shadow-lg w-full h-96 object-cover" loading="lazy" />
            <div>
              <h3 className="font-display text-3xl text-[oklch(0.18_0.04_185)] mb-4">Pediatric Dental Education</h3>
              <p className="font-body text-gray-700 mb-4">We believe education is the foundation of good oral health. Our team teaches children and families about nutrition, hygiene, and the connection between dental health and overall wellness.</p>
              <ul className="space-y-3">
                {["Age-appropriate oral health lessons", "Interactive demonstrations", "Take-home educational materials", "Family-focused preventive care strategies"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-[oklch(0.42_0.09_185)] flex-shrink-0 mt-1" />
                    <span className="font-body text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-[oklch(0.18_0.04_185)] mb-4">Community Events in Action</h2>
            <p className="font-body text-lg text-gray-600">See our team making a difference in the Garden Grove community.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <img src={OUTREACH_IMAGES.img4} alt="Uplift Dental team engaging with children at pediatric dental education community event to promote oral health awareness" className="rounded-2xl shadow-lg w-full h-72 object-cover" loading="lazy" />
            <img src={OUTREACH_IMAGES.img5} alt="Dental professionals providing free oral health screenings and preventive care guidance to children at community outreach event" className="rounded-2xl shadow-lg w-full h-72 object-cover" loading="lazy" />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-[oklch(0.88_0.016_185)] bg-[oklch(0.97_0.008_192)] shadow-lg">
              <img src={OUTREACH_IMAGES.img7} alt="Uplift Dental representative at a branded community outreach table with educational materials" className="h-auto w-full" loading="lazy" />
              <figcaption className="px-5 py-4 font-body text-sm leading-relaxed text-[oklch(0.40_0.04_185)]">An authentic Uplift Dental community outreach setup with informational materials and giveaway items.</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-[oklch(0.88_0.016_185)] bg-[oklch(0.97_0.008_192)] shadow-lg">
              <img src={OUTREACH_IMAGES.img6} alt="Uplift Dental branded hand sanitizer at an outdoor community event" className="h-auto w-full" loading="lazy" />
              <figcaption className="px-5 py-4 font-body text-sm leading-relaxed text-[oklch(0.40_0.04_185)]">A practice-provided Uplift Dental brand detail from a community event.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl text-white mb-6">Join Our Community of Healthy Smiles</h2>
          <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're looking for quality dental care for your family or interested in learning more about our community outreach programs, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" onClick={trackSchedule}>
              <button className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-[oklch(0.42_0.09_185)] bg-white hover:bg-white/90 transition-all">
                <Calendar className="w-5 h-5" />
                Schedule an Appointment
              </button>
            </Link>
            <a href={SMS.general} onClick={trackSchedule}>
              <button className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white border-2 border-white hover:bg-white/10 transition-all">
                <Phone className="w-5 h-5" />
                Text Us
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
