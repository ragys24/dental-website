/* =============================================================
   UPLIFT DENTAL — Home Page
   Design: "Elevated Warmth" — Premium teal brand, DM Serif Display headlines
   Content: Real data from upliftdental.com WordPress site
   ============================================================= */
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "wouter";
import TikTokSection from "@/components/TikTokSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone, MessageSquare, ChevronRight, Star, CheckCircle2,
  Shield, Clock, Smile, Zap, Award, Users, ChevronDown, MapPin, Calendar,
  Stethoscope, Sparkles, AlignCenter, Drill, Scissors, Baby, Siren, Scan
} from "lucide-react";
import { PRACTICE } from "@/lib/constants";
import { SMS } from "@/lib/sms";
import { FAQSchema } from "@/components/StructuredData";

// CDN Assets
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/hero-smile_47b15f85.jpg";
const FAMILY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/family-dental-fixed_12ae74fd.png";
const INVISALIGN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/invisalign-lifestyle_cd9d5323.jpg";
const SMILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/smile-transformation_82cc164e.jpg";
const TECH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dental-tech-clean-TzX7DySrWpcEhPpd2VXxTG.webp";
const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/uplift-about-real_a6815637.jpg";
const TEAM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/uplift-team-real_80532d53.jpg";
const DR_STEFAN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dr-stefan-clean_5bc74027.png";
const DR_SCHNEEKLUTH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dr-schneekluth-labcoat-clean_5cfb4098.png";
const DR_YOUSSEF = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dr-youssef-clean_da346e41.png";
const DR_SAAD = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dr-saad-periodontist_45f9c7c5.jpg";
const DR_GHOBRIAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dr-ghobrial-hq_89525d81.jpeg";
const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/uplift-pattern-dark_02e4726d.jpg";

const services = [
  { icon: <Stethoscope className="w-7 h-7" />, title: "General Dentistry", desc: "Cleanings, exams, X-rays, fillings, and preventive care for the whole family.", href: "/services#general" },
  { icon: <Sparkles className="w-7 h-7" />, title: "Cosmetic Dentistry", desc: "Veneers, teeth whitening, bonding, and smile makeovers to transform your confidence.", href: "/services#cosmetic" },
  { icon: <AlignCenter className="w-7 h-7" />, title: "Invisalign®", desc: "Platinum Invisalign® Provider with Trios 6 & iTero scanning for precise, comfortable aligners.", href: "/invisalign" },
  { icon: <Scan className="w-7 h-7" />, title: "Dental Implants", desc: "Permanent tooth replacement with 3D-guided implant placement using SprintRay technology.", href: "/dental-implants" },
  { icon: <Smile className="w-7 h-7" />, title: "Orthodontics & Braces", desc: "Traditional braces and clear aligners for teens and adults. Dr. Schneekluth since 1983.", href: "/services#ortho" },
  { icon: <Scissors className="w-7 h-7" />, title: "Oral Surgery", desc: "Extractions, wisdom teeth removal, and surgical procedures by Dr. Youssef, oral surgeon.", href: "/services#oral-surgery" },
  { icon: <Baby className="w-7 h-7" />, title: "Pediatric Dentistry", desc: "Gentle, fun dental care for children. We make first visits comfortable and positive.", href: "/services#pediatric" },
  { icon: <Siren className="w-7 h-7" />, title: "Emergency Dentist", desc: "Same-day emergency appointments for toothaches, broken teeth, and dental trauma.", href: "/emergency-dentist" },
  { icon: <Drill className="w-7 h-7" />, title: "Periodontics", desc: "Gum disease treatment, LANAP laser therapy, gum grafts, and crown lengthening by Dr. Saad.", href: "/periodontics" },
  { icon: <Zap className="w-7 h-7" />, title: "Endodontics", desc: "Root canal therapy, microscopic and surgical endodontics, and complex retreatment by Dr. Ghobrial.", href: "/endodontics" },
];

const testimonials = [
  {
    name: "Sunday Heppner",
    text: "Dr. Clark has been a blessing to me by fixing my crooked teeth and transforming them into a beautiful smile so I can feel confident when taking pictures. He is so reasonably priced in times when money is an issue. If you want perfect teeth and a great smile, you need to come to Dr. Clark Schneekluth.",
    rating: 5,
    service: "Orthodontics"
  },
  {
    name: "Andrew Hanna",
    text: "Dr. Stefan has been great since I started seeing him for my 6-month checkups and teeth cleanings. He goes over my X-rays and explains what he sees, whether good or bad. I appreciate that he takes his time with the cleanings as well. I would highly recommend him if you are looking for a caring dentist.",
    rating: 5,
    service: "General Dentistry"
  },
  {
    name: "Patricia Robbins",
    text: "Great dental office & dentist. Takes time to listen & make sure you are comfortable before beginning. No surprises with costs either. If you need a dentist, this is the place to go.",
    rating: 5,
    service: "Family Dentistry"
  },
  {
    name: "Maria G.",
    text: "The staff is incredibly welcoming and professional. I was nervous about my first visit but they made me feel at ease immediately. The office is modern and clean, and Dr. Stefan is thorough and kind. Highly recommend!",
    rating: 5,
    service: "New Patient"
  },
];

const insuranceLogos = [
  { name: "United Healthcare Dental", abbr: "UHC" },
  { name: "United Concordia Dental", abbr: "UCD" },
  { name: "Denti-Cal", abbr: "DC" },
  { name: "Cigna Dental", abbr: "Cigna" },
  { name: "MetLife Dental", abbr: "MetLife" },
  { name: "Delta Dental", abbr: "Delta" },
  { name: "Aetna Dental", abbr: "Aetna" },
  { name: "Anthem Blue Cross", abbr: "Anthem" },
  { name: "Ameritas Dental", abbr: "Ameritas" },
  { name: "Military / Tricare", abbr: "Tricare" },
];

const faqs = [
  {
    q: "Does Uplift Dental accept Denti-Cal?",
    a: "Yes! We proudly accept Denti-Cal (Medi-Cal Dental), most PPO insurance plans, and military/Tricare insurance. We also offer Cherry financing for flexible payment options. Our goal is to make quality dental care accessible to everyone in Garden Grove."
  },
  {
    q: "Is Uplift Dental a Platinum Invisalign® Provider?",
    a: "Yes — we are a Platinum Invisalign® Provider, one of the highest designations available. This means our team has extensive experience and training in Invisalign treatment, having completed a high volume of successful cases. We use the iTero® intraoral scanner for precise digital impressions."
  },
  {
    q: "Do you offer same-day emergency dental appointments?",
    a: `Absolutely. We offer same-day emergency dental appointments in Garden Grove for severe toothaches, knocked-out teeth, broken crowns, lost fillings, and other dental emergencies. Call ${PRACTICE.phone.display} or text us immediately.`
  },
  {
    q: "What are your office hours?",
    a: "We are open Monday through Friday from 9:00 AM to 5:00 PM. We also open the third Saturday of every month from 9:00 AM to 2:00 PM for your convenience."
  },
  {
    q: "Do you offer free consultations?",
    a: `Yes! We offer free consultations for new patients and for specific treatments like Invisalign®, dental implants, and smile makeovers. Book online or call ${PRACTICE.phone.display} to schedule yours.`
  },
  {
    q: "What areas do you serve near Garden Grove?",
    a: `We serve patients from Garden Grove, Seal Beach, Los Alamitos, Cypress, Huntington Beach, Westminster, Anaheim, and surrounding Orange County communities. Our office is conveniently located at ${PRACTICE.address.full}.`
  },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(value, 1800, start);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-display font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-sm font-body text-white/70 mt-1">{label}</div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[oklch(0.90_0.015_185)] rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[oklch(0.97_0.008_185)] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-body font-semibold text-[oklch(0.18_0.04_185)] pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-[oklch(0.42_0.09_185)] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 font-body text-[oklch(0.40_0.04_185)] text-sm leading-relaxed border-t border-[oklch(0.90_0.015_185)]">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
      <Navbar />
      <FAQSchema faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} id="ld-faq-home" />
      {/* ── HERO ── pulls up behind the sticky navbar so dark image shows behind nav at top */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ marginTop: 'calc(-1 * var(--navbar-height, 9rem))' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Patient with a beautiful smile at Uplift Dental & Orthodontics, Garden Grove CA" className="w-full h-full object-cover object-center" fetchPriority="high" loading="eager"/>
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, oklch(0.18 0.04 185 / 0.90) 0%, oklch(0.18 0.04 185 / 0.75) 50%, oklch(0.18 0.04 185 / 0.40) 100%)" }} />
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "cover" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-body font-semibold" style={{ backgroundColor: "oklch(0.70 0.07 195 / 0.2)", color: "oklch(0.85 0.05 195)", border: "1px solid oklch(0.70 0.07 195 / 0.4)" }}>
              <Award className="w-4 h-4" />
              Platinum Invisalign® Provider · Garden Grove, CA
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Your Trusted Dentist{" "}<br />
              <em className="not-italic" style={{ color: "oklch(0.85 0.07 195)" }}>&amp; Orthodontist</em>{" "}<br />
              in Garden Grove, CA
            </h1>

            <p className="font-body text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
              At Uplift Dental & Orthodontics, we create stunning, confident smiles with expert general, restorative, and cosmetic dentistry — for the whole family. <strong className="text-white">Going the Extra Smile!</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/contact" className="btn-uplift-white text-base px-7 py-3.5 rounded-full font-semibold shadow-lg">
                <Calendar className="w-5 h-5" />
                Book Free Consultation
              </Link>
              <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/60 text-white font-body font-semibold text-base hover:bg-white/10 transition-all">
                <Phone className="w-5 h-5" />
                {PRACTICE.phone.display}
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
              {["Free Consultations", "Denti-Cal Accepted", "Same-Day Emergency", "Cherry Financing"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm font-body text-white/80">
                  <CheckCircle2 className="w-4 h-4" style={{ color: "oklch(0.70 0.07 195)" }} />
                  {item}
                </div>
              ))}
            </div>
            {/* Faster service CTA */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm">
              <MessageSquare className="w-4 h-4 text-white/80 shrink-0" />
              <span className="font-body text-sm text-white/90">
                <strong className="text-white">For faster service</strong> — text us at{" "}
                <a href={SMS.general} className="font-bold text-white underline underline-offset-2">{PRACTICE.sms.display}</a>
                {" "}or{" "}
                <a href="/contact" className="font-bold text-white underline underline-offset-2">book directly online</a>
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </div>
      </section>

      {/* ── EMERGENCY BANNER ── */}
      <section className="py-8" style={{ backgroundColor: "oklch(0.65 0.18 35)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-xl text-white font-bold">Dental Emergency? We're Here Now.</h2>
                <p className="font-body text-white/85 text-sm mt-0.5">
                  Severe toothache, knocked-out tooth, or broken crown? Same-day emergency appointments available.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href={SMS.general} className="flex items-center gap-2 px-5 py-2.5 bg-white/20 border border-white/40 text-white rounded-full font-body font-semibold text-sm hover:bg-white/30 transition-all">
                <MessageSquare className="w-4 h-4" />
                Text Us Now
              </a>
              <a href={PRACTICE.phone.tel} className="flex items-center gap-2 px-5 py-2.5 bg-white text-[oklch(0.65_0.18_35)] rounded-full font-body font-bold text-sm hover:bg-white/90 transition-all shadow-md">
                <Phone className="w-4 h-4" />
                Call {PRACTICE.phone.display}
              </a>
            </div>
          </div>
          <p className="text-center text-white/60 text-xs font-body mt-4">Open Mon–Fri 9am–5pm · 3rd Saturday of every month 9am–2pm</p>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="py-10 bg-white border-b border-[oklch(0.90_0.015_185)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Award className="w-6 h-6" />, title: "Platinum Invisalign®", sub: "Provider" },
              { icon: <Shield className="w-6 h-6" />, title: "Denti-Cal", sub: "& Military Insurance" },
              { icon: <Clock className="w-6 h-6" />, title: "Same-Day", sub: "Emergency Care" },
              { icon: <Smile className="w-6 h-6" />, title: "Free", sub: "Consultations" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "oklch(0.95 0.015 185)", color: "oklch(0.42 0.09 185)" }}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-body font-bold text-sm text-[oklch(0.18_0.04_185)]">{item.title}</div>
                  <div className="font-body text-xs text-[oklch(0.52_0.04_185)]">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-[oklch(0.99_0.003_90)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>What We Offer</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)]">Our Complete Dental Care<br />&amp; Orthodontic Services</h2>
            <p className="font-body text-[oklch(0.45_0.04_185)] mt-4 max-w-2xl mx-auto">
              From your child's first cleaning to full smile transformations — Uplift Dental is your multi-specialty dental home in Garden Grove, CA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <Link key={s.title} href={s.href}>
                <div className="group bg-white rounded-2xl p-6 border border-[oklch(0.90_0.015_185)] hover:border-[oklch(0.42_0.09_185)] hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                  <div className="mb-4" style={{ color: "oklch(0.42 0.09 185)" }}>{s.icon}</div>
                  <h3 className="font-display text-lg text-[oklch(0.18_0.04_185)] mb-2 group-hover:text-[oklch(0.42_0.09_185)] transition-colors">{s.title}</h3>
                  <p className="font-body text-sm text-[oklch(0.45_0.04_185)] leading-relaxed">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-body font-semibold" style={{ color: "oklch(0.42 0.09 185)" }}>
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / COMMUNITY ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <img src={FAMILY_IMG} alt={`Family receiving dental care at Uplift Dental & Orthodontics in ${PRACTICE.address.city}, ${PRACTICE.address.state} ${PRACTICE.address.zip}`} className="w-full rounded-3xl object-cover shadow-2xl" style={{ maxHeight: "500px" }} loading="lazy" width="1200" height="600"/>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-[oklch(0.90_0.015_185)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.95 0.015 185)" }}>
                    <Users className="w-5 h-5" style={{ color: "oklch(0.42 0.09 185)" }} />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-[oklch(0.18_0.04_185)]">1,000+</div>
                    <div className="font-body text-xs text-[oklch(0.52_0.04_185)]">Happy Patients</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>About Uplift Dental</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-6">
                Your Local Dentist<br />in Garden Grove, CA
              </h2>
              <p className="font-body text-[oklch(0.40_0.04_185)] leading-relaxed mb-6">
                Proudly serving Garden Grove, Seal Beach, Los Alamitos, and nearby communities, Uplift Dental & Orthodontics is a family-operated practice that believes in giving back. We actively participate in community events like National Children's Oral Health Month and host pediatric screenings at local schools to promote better oral health.
              </p>
              <p className="font-body text-[oklch(0.40_0.04_185)] leading-relaxed mb-8">
                As Platinum Invisalign® Providers and members of the Orange County Dental Society, AADMD, and CMANA, we deliver advanced and personalized dental treatments tailored to your needs.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Orange County Dental Society",
                  "AADMD Member",
                  "CMANA Member",
                  "Platinum Invisalign® Provider",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.42 0.09 185)" }} />
                    <span className="font-body text-sm text-[oklch(0.35_0.04_185)]">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-uplift-primary rounded-full px-7 py-3">
                Meet Our Team <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="py-16 relative overflow-hidden" style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "cover" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "oklch(0.18 0.04 185 / 0.88)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value={1000} suffix="+" label="Happy Patients" start={statsVisible} />
            <StatCard value={20} suffix="+" label="Years Serving the Community" start={statsVisible} />
            <StatCard value={100} suffix="+" label="5-Star Google Reviews" start={statsVisible} />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-white">5.0</div>
              <div className="text-sm font-body text-white/70 mt-1">Star Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INVISALIGN FEATURE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-body font-semibold" style={{ backgroundColor: "oklch(0.95 0.015 185)", color: "oklch(0.42 0.09 185)" }}>
                <Award className="w-4 h-4" />
                Platinum Invisalign® Provider
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-6">
                Straighter Teeth,<br />No Metal Braces
              </h2>
              <p className="font-body text-[oklch(0.40_0.04_185)] leading-relaxed mb-6">
                As a Platinum Invisalign® Provider, Uplift Dental has the expertise and technology to give you the smile you've always wanted — discreetly and comfortably. We use the Trios 6 and iTero® intraoral scanners for precise digital impressions, so no messy molds.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Nearly invisible clear aligners",
                  "Removable — eat and drink freely",
                  "Trios 6 & iTero digital scanning - no impressions",
                  "Faster results than traditional braces",
                  "Free Invisalign consultation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-body text-sm text-[oklch(0.35_0.04_185)]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "oklch(0.42 0.09 185)" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/invisalign" className="btn-uplift-primary rounded-full px-7 py-3">
                Learn About Invisalign® <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img src={INVISALIGN_IMG} alt="Platinum Invisalign clear aligners treatment at Uplift Dental & Orthodontics, Garden Grove CA" className="w-full rounded-3xl object-cover shadow-2xl" style={{ maxHeight: "500px" }} loading="lazy" width="1200" height="600"/>
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[oklch(0.90_0.015_185)]">
                <div className="font-display text-3xl font-bold text-[oklch(0.18_0.04_185)]">Platinum</div>
                <div className="font-body text-xs text-[oklch(0.52_0.04_185)]">Invisalign® Provider</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Our Specialists</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)]">Meet Your Dental Team</h2>
            <p className="font-body text-[oklch(0.45_0.04_185)] mt-4 max-w-xl mx-auto">
              Experienced, compassionate specialists dedicated to your smile and overall oral health.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              {
                img: DR_STEFAN,
                name: "Dr. Ragy Stefan",
                slug: "dr-stefan",
                title: "Founder & General Dentist",
                bio: "Dr. Stefan founded Uplift Dental with a vision of accessible, high-quality dental care for all. He specializes in comprehensive family dentistry, cosmetic procedures, and dental implants.",
                specialties: ["General Dentistry", "Cosmetic Dentistry", "Dental Implants"],
              },
              {
                img: DR_SCHNEEKLUTH,
                name: "Dr. Clark Schneekluth",
                slug: "dr-schneekluth",
                title: "Orthodontist",
                bio: "With over 40 years of orthodontic experience since 1983, Dr. Schneekluth has transformed thousands of smiles with braces, clear aligners, and dentofacial orthopedics.",
                specialties: ["Braces", "Invisalign®", "Dentofacial Orthopedics"],
              },
              {
                img: DR_YOUSSEF,
                name: "Dr. Joseph Youssef",
                slug: "dr-youssef",
                title: "Board-Certified Oral & Maxillofacial Surgeon",
                bio: "A Huntington Beach native and UCSF graduate, Dr. Youssef completed his OMS residency at Montefiore Medical Center (Chief Resident 2023–2024). He is an All-on-X full-arch implant specialist and holds staff privileges at Long Beach Memorial and CHOC. Member of AAOMS and CAOMS.",
                specialties: ["Oral & Maxillofacial Surgery", "All-on-X Implants", "Wisdom Teeth", "Facial Trauma", "TMJ"],
              },
              {
                img: DR_SAAD,
                name: "Dr. Erene Saad",
                slug: "dr-saad",
                title: "Periodontist",
                bio: "Dr. Saad is a board-trained Periodontist (DMD MS) specializing in gum disease treatment, LANAP laser therapy, gum grafts, crown lengthening, and periodontal implants.",
                specialties: ["Periodontics", "Gum Disease", "LANAP Laser"],
              },
              {
                img: DR_GHOBRIAL,
                name: "Dr. Daniel Ghobrial",
                slug: "dr-ghobrial",
                title: "Endodontist",
                bio: "Dr. Ghobrial is a UCSF-trained endodontist specializing in root canal therapy, microscopic and surgical endodontics, complex retreatment, and advanced pain control.",
                specialties: ["Root Canals", "Microscopic Endo", "Retreatment"],
              },
            ].map((doc) => (
              <Link key={doc.name} href={`/about#${doc.slug}`} className="block">
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[oklch(0.90_0.015_185)] card-hover h-full">
                  <div className="aspect-[4/3] overflow-hidden" style={{ backgroundColor: "oklch(0.95 0.015 185)" }}>
                    <img src={doc.img} alt={`${doc.name} — ${doc.title} at Uplift Dental & Orthodontics, Garden Grove CA`} className="w-full h-full object-cover object-top" loading="lazy" width="300" height="400"/>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-[oklch(0.18_0.04_185)]">{doc.name}</h3>
                    <p className="font-body text-sm font-semibold mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>{doc.title}</p>
                    <p className="font-body text-sm text-[oklch(0.45_0.04_185)] leading-relaxed mb-4">{doc.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {doc.specialties.map((s) => (
                        <span key={s} className="px-3 py-1 rounded-full text-xs font-body font-semibold" style={{ backgroundColor: "oklch(0.95 0.015 185)", color: "oklch(0.42 0.09 185)" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="font-body text-xs font-semibold mt-4" style={{ color: "oklch(0.42 0.09 185)" }}>Meet Dr. {doc.name.split(" ")[1]} &rarr;</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/about" className="btn-uplift-outline rounded-full px-7 py-3">
              Learn More About Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Patient Reviews</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)]">See What Our Patients<br />Are Saying</h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              {[1,2,3,4,5].map((s) => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              <span className="font-body font-semibold text-[oklch(0.18_0.04_185)] ml-2">5.0 Stars</span>
              <span className="font-body text-[oklch(0.52_0.04_185)] text-sm">&mdash; 100+ Google Reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`bg-white rounded-2xl p-6 border-2 shadow-sm transition-all duration-300 ${i === currentTestimonial ? "border-[oklch(0.42_0.09_185)] shadow-lg" : "border-[oklch(0.90_0.015_185)]"}`}>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="font-body text-sm text-[oklch(0.35_0.04_185)] leading-relaxed mb-5 italic">"{t.text}"</p>
                <div>
                  <div className="font-body font-bold text-sm text-[oklch(0.18_0.04_185)]">{t.name}</div>
                  <div className="font-body text-xs text-[oklch(0.52_0.04_185)]">{t.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSURANCE ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl text-[oklch(0.18_0.04_185)]">Major Insurance Partners</h2>
            <p className="font-body text-sm text-[oklch(0.45_0.04_185)] mt-2">We accept Denti-Cal, most PPOs, and military insurance. <a href="/contact" className="underline" style={{ color: "oklch(0.42 0.09 185)" }}>Call to verify your plan →</a></p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {insuranceLogos.map((ins) => (
              <div key={ins.name} className="bg-white rounded-xl p-3 flex items-center justify-center shadow-sm border border-[oklch(0.90_0.015_185)] aspect-square">
                <div className="text-center">
                  <div className="font-body font-bold text-xs text-[oklch(0.42_0.09_185)]">{ins.abbr}</div>
                  <div className="font-body text-[10px] text-[oklch(0.52_0.04_185)] leading-tight mt-0.5">{ins.name.split(" ")[0]}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center font-body text-xs text-[oklch(0.52_0.04_185)] mt-6">
            *Here are just a few of the many insurance companies we work with. Our list is always expanding — call {PRACTICE.phone.display} to verify your plan.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-[oklch(0.90_0.015_185)] bg-white shadow-sm">
              <span className="font-body text-sm text-[oklch(0.35_0.04_185)]">Flexible financing available through</span>
              <span className="font-display text-lg font-bold" style={{ color: "oklch(0.42 0.09 185)" }}>Cherry</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPOINTMENT FORM ── */}
      <section className="py-20 bg-white" id="appointment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Get Started</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-6">
                Let's Book Your<br />Appointment
              </h2>
              <p className="font-body text-[oklch(0.40_0.04_185)] leading-relaxed mb-8">
                Booking an appointment with us is easy! Fill out the form and we'll get back to you within one business day. Or call us directly at <a href={PRACTICE.phone.tel} className="font-semibold" style={{ color: "oklch(0.42 0.09 185)" }}>{PRACTICE.phone.display}</a>.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Phone className="w-5 h-5" />, label: "Call Now", value: PRACTICE.phone.display, href: PRACTICE.phone.tel },
                  { icon: <MessageSquare className="w-5 h-5" />, label: "Text Us", value: `Text ${PRACTICE.sms.display}`, href: SMS.general },
                  { icon: <MapPin className="w-5 h-5" />, label: "Address", value: PRACTICE.address.full, href: PRACTICE.googleMapsUrl },
                  { icon: <Clock className="w-5 h-5" />, label: "Hours", value: "Mon–Fri 9am–5pm · 3rd Sat 9am–2pm", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "oklch(0.95 0.015 185)", color: "oklch(0.42 0.09 185)" }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-body text-xs font-bold uppercase tracking-wide text-[oklch(0.52_0.04_185)]">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="font-body font-semibold text-[oklch(0.18_0.04_185)] hover:text-[oklch(0.42_0.09_185)] transition-colors">{item.value}</a>
                      ) : (
                        <span className="font-body font-semibold text-[oklch(0.18_0.04_185)]">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[oklch(0.97_0.008_85)] rounded-3xl p-8 border border-[oklch(0.90_0.015_185)]">
              <h3 className="font-display text-2xl text-[oklch(0.18_0.04_185)] mb-6">Request an Appointment</h3>
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── TEXT/BOOK CTA STRIP ── */}
      <section className="py-10" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl text-white mb-1">For Faster Service</h3>
              <p className="font-body text-white/80 text-sm">Skip the wait — text us or book your appointment directly online. We respond quickly!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={SMS.general}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white font-body font-bold text-sm transition-all hover:bg-white/90 shadow-md"
                style={{ color: "oklch(0.28 0.08 192)" }}
              >
                <MessageSquare className="w-4 h-4" />
                Text {PRACTICE.sms.display}
              </a>
              <a
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-white text-white font-body font-bold text-sm hover:bg-white/10 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Online Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE UPLIFT ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Why Uplift Dental</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-4">
              Not Your Average Dental Office
            </h2>
            <p className="font-body text-[oklch(0.45_0.04_185)] max-w-2xl mx-auto">
              Most dental offices refer you out for anything beyond a cleaning. At Uplift Dental & Orthodontics, our in-house team of specialists handles everything — so you get faster care, better coordination, and a smile you're proud of.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 font-body text-sm text-[oklch(0.45_0.04_185)] w-1/3"></th>
                  <th className="p-4 text-center rounded-t-2xl font-body font-bold text-sm" style={{ backgroundColor: "oklch(0.18 0.04 185)", color: "white" }}>
                    Uplift Dental &amp; Orthodontics
                  </th>
                  <th className="p-4 text-center font-body font-bold text-sm text-[oklch(0.45_0.04_185)]">
                    Typical Dental Office
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Orthodontist on staff", true, false],
                  ["Periodontist on staff", true, false],
                  ["Oral surgeon on staff", true, false],
                  ["Dental implants in-house", true, false],
                  ["Invisalign® Platinum Provider", true, false],
                  ["Denti-Cal accepted", true, false],
                  ["Same-day emergency care", true, false],
                  ["No referrals needed", true, false],
                  ["Digital scanning (no impressions)", true, false],
                  ["Cherry & CareCredit financing", true, false],
                ].map(([label, uplift, typical], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[oklch(0.97_0.008_85)]" : "bg-white"}>
                    <td className="p-4 font-body text-sm text-[oklch(0.35_0.04_185)] font-medium">{label as string}</td>
                    <td className="p-4 text-center" style={{ backgroundColor: i % 2 === 0 ? "oklch(0.95 0.015 185)" : "oklch(0.97 0.015 185)" }}>
                      {uplift ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typical ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white text-base transition-all hover:opacity-90" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
                Book a Free Consultation
                <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TIKTOK ── */}
      <TikTokSection />

      {/* ── FAQ ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Common Questions</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="font-body text-[oklch(0.45_0.04_185)] mb-4">Still have questions? We're happy to help.</p>
            <a href={PRACTICE.phone.tel} className="btn-uplift-primary rounded-full px-7 py-3">
              <Phone className="w-4 h-4" />
              Call {PRACTICE.phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* ── MOUTH-BODY CONNECTION ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Total Wellness Dentistry</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-6">
                Your Mouth Is the<br />Gateway to Your Health
              </h2>
              <p className="font-body text-[oklch(0.40_0.04_185)] leading-relaxed mb-6">
                Research consistently shows that oral health is deeply connected to your overall well-being. Gum disease has been linked to heart disease, diabetes, stroke, and even pregnancy complications. At Uplift Dental, we treat the whole person — not just the tooth.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { condition: "Heart Disease", stat: "3x higher risk" },
                  { condition: "Diabetes", stat: "Bidirectional link" },
                  { condition: "Stroke", stat: "2x higher risk" },
                  { condition: "Alzheimer's", stat: "Growing evidence" },
                ].map((item) => (
                  <div key={item.condition} className="bg-white rounded-2xl p-4 border border-[oklch(0.90_0.015_185)] shadow-sm">
                    <div className="font-body text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "oklch(0.42 0.09 185)" }}>{item.condition}</div>
                    <div className="font-display text-sm font-bold text-[oklch(0.18_0.04_185)]">{item.stat}</div>
                    <div className="font-body text-xs text-[oklch(0.52_0.04_185)] mt-0.5">with untreated gum disease</div>
                  </div>
                ))}
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: "oklch(0.42 0.09 185)" }}
              >
                Schedule a Comprehensive Exam
              </a>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { step: "01", title: "Comprehensive Exam", desc: "We assess your full oral and systemic health — checking for signs of gum disease, oral cancer, TMJ, and more." },
                { step: "02", title: "Personalized Treatment Plan", desc: "No two patients are the same. We create a custom plan that fits your health goals, timeline, and budget." },
                { step: "03", title: "Ongoing Preventive Care", desc: "Regular cleanings and monitoring keep small issues from becoming big (and expensive) problems." },
              ].map((item) => (
                <div key={item.step} className="flex gap-5 bg-white rounded-2xl p-5 border border-[oklch(0.90_0.015_185)] shadow-sm">
                  <div className="font-display text-3xl font-bold shrink-0" style={{ color: "oklch(0.85 0.04 185)" }}>{item.step}</div>
                  <div>
                    <div className="font-display font-bold text-lg text-[oklch(0.18_0.04_185)] mb-1">{item.title}</div>
                    <div className="font-body text-sm text-[oklch(0.45_0.04_185)] leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOARD-CERTIFIED SPECIALISTS ── */}
      <section className="py-16 bg-white border-y border-[oklch(0.90_0.015_185)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.42 0.09 185)" }}>One Practice. Multiple Specialists.</p>
            <h2 className="font-display text-3xl md:text-4xl text-[oklch(0.18_0.04_185)]">No Referrals. No Runaround.</h2>
            <p className="font-body text-[oklch(0.45_0.04_185)] mt-3 max-w-2xl mx-auto">Most dental offices refer you out for orthodontics, oral surgery, or implants. We handle everything in-house — saving you time, money, and the hassle of coordinating between multiple providers.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[
              { Icon: Stethoscope, specialty: "General Dentistry", detail: "Cleanings, fillings, crowns, root canals" },
              { Icon: Sparkles, specialty: "Cosmetic Dentistry", detail: "Veneers, whitening, smile makeovers" },
              { Icon: AlignCenter, specialty: "Orthodontics", detail: "Invisalign®, braces — Dr. Schneekluth since 1983" },
              { Icon: Scissors, specialty: "Oral Surgery", detail: "Implants, extractions, bone grafting" },
              { Icon: Drill, specialty: "Periodontics", detail: "Gum disease, LANAP laser, gum grafts — Dr. Saad" },
              { Icon: Zap, specialty: "Endodontics", detail: "Root canals, microscopic endo, retreatment — Dr. Ghobrial" },
            ].map((item) => (
              <div key={item.specialty} className="text-center p-6 rounded-2xl border border-[oklch(0.90_0.015_185)] hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "oklch(0.92 0.04 185)" }}>
                  <item.Icon className="w-7 h-7" style={{ color: "oklch(0.35 0.09 185)" }} />
                </div>
                <div className="font-display font-bold text-lg text-[oklch(0.18_0.04_185)] mb-2">{item.specialty}</div>
                <div className="font-body text-sm text-[oklch(0.52_0.04_185)]">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP / LOCATION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Find Us</p>
              <h2 className="font-display text-4xl text-[oklch(0.18_0.04_185)] mb-4">Visit Our Garden Grove Office</h2>
              <p className="font-body text-[oklch(0.40_0.04_185)] mb-6">
                Conveniently located in Garden Grove, CA — serving Seal Beach, Los Alamitos, Cypress, Westminster, Huntington Beach, Anaheim, and all of Orange County.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 shrink-0" style={{ color: "oklch(0.42 0.09 185)" }} />
                  <span className="font-body text-[oklch(0.35_0.04_185)]">{PRACTICE.address.full}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0" style={{ color: "oklch(0.42 0.09 185)" }} />
                  <a href={PRACTICE.phone.tel} className="font-body font-semibold text-[oklch(0.18_0.04_185)]">{PRACTICE.phone.display}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 shrink-0" style={{ color: "oklch(0.42 0.09 185)" }} />
                  <span className="font-body text-[oklch(0.35_0.04_185)]">Mon–Fri: 9am–5pm · 3rd Saturday: 9am–2pm</span>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=5253+Lampson+Ave+Garden+Grove+CA+92845"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-uplift-primary rounded-full px-7 py-3"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[oklch(0.90_0.015_185)]" style={{ height: "400px" }}>
              <iframe
                title="Uplift Dental Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5!2d-117.9601!3d33.7783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd28b0!2s5253+Lampson+Ave%2C+Garden+Grove%2C+CA+92845!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "cover" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "oklch(0.18 0.04 185 / 0.90)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            Ready to Transform<br />Your Smile?
          </h2>
          <p className="font-body text-white/75 text-lg mb-10 leading-relaxed">
            Join 1,000+ happy patients in Garden Grove and Orange County. Free consultations available. Denti-Cal, PPO, and military insurance accepted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-uplift-white text-base px-8 py-4 rounded-full font-bold shadow-xl">
              <Calendar className="w-5 h-5" />
              Book Free Consultation
            </Link>
            <a href={SMS.general} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/50 text-white font-body font-semibold text-base hover:bg-white/10 transition-all">
              <MessageSquare className="w-5 h-5" />
              Text Us for Faster Service
            </a>
            <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white/80 font-body font-semibold text-base hover:bg-white/10 transition-all">
              <Phone className="w-5 h-5" />
              Call {PRACTICE.phone.display}
            </a>
          </div>
          <p className="font-body text-white/50 text-sm mt-6">*Free consultation valued at $150. New patients only. For faster service, text us at {PRACTICE.sms.display}.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", service: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFormError("");
    try {
      await emailjs.send(
        "service_x856ofi",
        "template_mp248nf",
        {
          name: form.name,
          phone: form.phone,
          service: form.service || "Not specified",
          time: new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
        },
        "6X9QyXqRhDTbdty7A"
      );
      setSubmitted(true);
    } catch (err) {
      setFormError(`Something went wrong. Please call ${PRACTICE.phone.display}.`);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: "oklch(0.42 0.09 185)" }} />
        <h3 className="font-display text-2xl text-[oklch(0.18_0.04_185)] mb-2">Thank You!</h3>
        <p className="font-body text-[oklch(0.45_0.04_185)]">We'll be in touch within one business day to confirm your appointment.</p>
        <p className="font-body text-sm mt-4">Or call us now: <a href={PRACTICE.phone.tel} className="font-semibold" style={{ color: "oklch(0.42 0.09 185)" }}>{PRACTICE.phone.display}</a></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-body text-xs">{formError}</div>}
      <div>
        <label className="block font-body text-xs font-semibold text-[oklch(0.35_0.04_185)] mb-1.5 uppercase tracking-wide">Your Name *</label>
        <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
          placeholder="Jane Smith"
          className="w-full px-4 py-3 rounded-xl border border-[oklch(0.90_0.015_185)] bg-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.42_0.09_185)] focus:border-transparent" />
      </div>
      <div>
        <label className="block font-body text-xs font-semibold text-[oklch(0.35_0.04_185)] mb-1.5 uppercase tracking-wide">Phone Number *</label>
        <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
          placeholder="(714) 000-0000"
          className="w-full px-4 py-3 rounded-xl border border-[oklch(0.90_0.015_185)] bg-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.42_0.09_185)] focus:border-transparent" />
      </div>
      <button type="submit" disabled={sending} className="w-full py-4 rounded-xl text-white font-body font-bold text-sm transition-all hover:opacity-90 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
        <Calendar className="w-4 h-4" />
        {sending ? "Sending..." : "Request Appointment"}
      </button>
      <p className="font-body text-xs text-center text-[oklch(0.52_0.04_185)]">We'll respond within 1 business day. For urgent care, call {PRACTICE.phone.display}.</p>
      <p className="font-body text-xs text-center text-[oklch(0.55_0.02_220)] leading-relaxed border-t border-[oklch(0.92_0.01_220)] pt-3">
        <strong>Privacy Notice:</strong> Do not include sensitive health information (symptoms, diagnoses, or treatment details) in this form. This form is not encrypted for protected health information (PHI). For confidential matters, please call us directly at {PRACTICE.phone.display}.
      </p>
    </form>
  );
}
