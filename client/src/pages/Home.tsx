/* =============================================================
   UPLIFT DENTAL — Home Page
   Design: "Elevated Warmth" — Premium teal brand, DM Serif Display headlines.
   Hero refinement: original, optional next-step intake surface; quiet glass material,
   left-side conversion flow, no PHI collection, and no copied reference layout/copy.
   ============================================================= */
import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone, MessageSquare, ChevronRight, ArrowRight, CheckCircle2,
  Shield, Clock, Smile, Zap, Award, Users, ChevronDown, MapPin, Calendar,
  Stethoscope, Sparkles, AlignCenter, Drill, Scissors, Baby, Siren, Scan
} from "lucide-react";
import { PRACTICE } from "@/lib/constants";
import { SMS } from "@/lib/sms";
import { PageSEO } from "@/components/PageSEO";
import { trackSchedule, trackLead } from "@/lib/tracking";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import HeroQuickStart from "@/components/HeroQuickStart";

const TikTokSection = lazy(() => import("@/components/TikTokSection"));

// CDN Assets
// The coordinated editorial crops reserve an intentional, compact left-side copy zone without leaving excess empty space.
const HERO_IMG_MOBILE = "/manus-storage/uplift-hero-mobile-editorial-tight_733a57ba.webp";
const HERO_IMG_DESKTOP = "/manus-storage/uplift-hero-desktop-tight_036aff9f.webp";
const HERO_MOTION_DESKTOP = "/manus-storage/uplift-hero-desktop-motion-v2_84f904cc.mp4";
const INVISALIGN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/invisalign-lifestyle_cd9d5323.jpg";
const TECH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dental-tech-clean-TzX7DySrWpcEhPpd2VXxTG.webp";
const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/uplift-about-real_a6815637.jpg";
const TEAM_IMG = "/manus-storage/uplift-team-garden-grove_c57d4b4d.webp";
const DR_STEFAN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dr-stefan-clean_5bc74027.png";
const DR_SCHNEEKLUTH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dr-schneekluth-labcoat-clean_5cfb4098.png";
const DR_YOUSSEF = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dr-youssef-clean_da346e41.png";
const DR_SAAD = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dr-saad-periodontist_45f9c7c5.jpg";
const DR_GHOBRIAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dr-ghobrial-hq_89525d81.jpeg";
const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/pattern-dark-optimized_09879858.jpg";
const CARESTACK_BOOKING_URL = "https://patientportal.carestack.com/?dn=uplift/#/online-appointments/select-reason";
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Uplift%20Dental%20%26%20Orthodontics%2C%205253%20Lampson%20Ave%2C%20Garden%20Grove%2C%20CA%2092845";
const ELFSIGHT_GOOGLE_REVIEWS_APP_ID = "26230d77-308b-42cd-af1f-ecc966aabd9b";

const SMILE_MAKEOVER_CASES = [
  {
    id: "composite-veneers-crown-bridge",
    title: "Composite Veneers with Crown & Bridge Work",
    description: "Practice-provided before-and-after comparison for a smile makeover involving composite veneers with crown and bridge work.",
    before: "/manus-storage/uplift-case-1-before_c7e95f4e.png",
    after: "/manus-storage/uplift-case-1-after_b4e1eb64.png",
    beforeAlt: "Composite veneers with crown and bridge work before image provided by Uplift Dental",
    afterAlt: "Composite veneers with crown and bridge work after image provided by Uplift Dental",
  },
  {
    id: "porcelain-veneers",
    title: "Porcelain Veneers",
    description: "Practice-provided before-and-after comparison for a smile makeover involving porcelain veneers.",
    before: "/manus-storage/uplift-case-2-before_217e67b4.png",
    after: "/manus-storage/uplift-case-2-after_e1f67053.webp",
    beforeAlt: "Porcelain veneers before image provided by Uplift Dental",
    afterAlt: "Porcelain veneers after image provided by Uplift Dental",
  },
] as const;

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

const insuranceLogos = [
  { name: "Delta Dental", color: "#00857c", initials: "\u0394" },
  { name: "Cigna", color: "#009bda", initials: "C" },
  { name: "MetLife", color: "#00a651", initials: "M" },
  { name: "Aetna", color: "#7d3f98", initials: "A" },
  { name: "United Healthcare", color: "#002677", initials: "U" },
  { name: "Anthem Blue Cross", color: "#003da5", initials: "\u271a" },
  { name: "Guardian", color: "#003865", initials: "G" },
  { name: "Denti-Cal", color: "#b5985a", initials: "DC" },
];

const faqs = [
  {
    q: "Does Uplift Dental accept Denti-Cal?",
    a: "Yes. We accept Denti-Cal (Medi-Cal Dental), most PPO insurance plans, and military/Tricare insurance. We also offer CareCredit, Cherry, and in-house financing options. The team can help you understand available choices for your visit."
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

/**
 * Elevated Warmth review proof: third-party Google content stays visibly attributed,
 * loads only below the fold after functional consent, and never feeds review schema.
 */
function LiveGoogleReviews() {
  const [hasConsent, setHasConsent] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);
  const [stagingFeedOptIn, setStagingFeedOptIn] = useState(false);
  const [isStagingHost, setIsStagingHost] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsStagingHost(/^ragys\.sg-host\.com$/i.test(window.location.hostname));
  }, []);

  useEffect(() => {
    const hasFunctionalConsent = () =>
      /(?:^|,)\s*(?:functional|advertisement):yes/.test(decodeURIComponent(document.cookie || ""));
    const refreshConsent = () => setHasConsent(hasFunctionalConsent());

    refreshConsent();
    window.addEventListener("cookieyes_consent_update", refreshConsent);
    return () => window.removeEventListener("cookieyes_consent_update", refreshConsent);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const refreshPreference = () => setPrefersReducedMotion(media.matches);
    refreshPreference();
    media.addEventListener("change", refreshPreference);
    return () => media.removeEventListener("change", refreshPreference);
  }, []);

  useEffect(() => {
    const canLoadFeed = hasConsent || stagingFeedOptIn;
    if (!canLoadFeed || prefersReducedMotion) return;

    const existing = document.getElementById("elfsight-platform");
    if (existing) {
      if (existing.dataset.loaded === "true") setScriptReady(true);
      else {
        existing.addEventListener("load", () => setScriptReady(true), { once: true });
        existing.addEventListener("error", () => setScriptFailed(true), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "elfsight-platform";
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    script.dataset.cookieyes = "functional";
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      setScriptReady(true);
    }, { once: true });
    script.addEventListener("error", () => setScriptFailed(true), { once: true });
    document.head.appendChild(script);
  }, [hasConsent, prefersReducedMotion, stagingFeedOptIn]);

  const canLoadLiveFeed = hasConsent || stagingFeedOptIn;

  return (
    <section data-scroll-reveal className="bg-white py-14 sm:py-20" aria-labelledby="google-feedback-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Google Reviews</p>
          <h2 id="google-feedback-heading" className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)]">Featured Feedback<br />From Google</h2>
          <p className="font-body text-[oklch(0.45_0.04_185)] mt-4 max-w-2xl mx-auto">Two current Google reviews are featured first, followed by the live practice feed. Select a review to view its Google source.</p>
        </div>

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.4rem] border border-[oklch(0.90_0.015_185)] bg-[oklch(0.97_0.008_192)] px-1.5 py-3 shadow-sm sm:rounded-3xl sm:px-6 sm:py-8">
          {canLoadLiveFeed && !prefersReducedMotion ? (
            <div className="-mx-1 min-h-[300px] sm:mx-0 sm:min-h-[260px]" aria-live="polite" aria-label="Current Google reviews for Uplift Dental and Orthodontics">
              <div className={`elfsight-app-${ELFSIGHT_GOOGLE_REVIEWS_APP_ID}`} data-elfsight-app-lazy />
              {!scriptReady && !scriptFailed && <div className="flex min-h-[300px] items-center justify-center font-body text-sm text-[oklch(0.45_0.04_185)] sm:min-h-[250px]">Loading current Google feedback…</div>}
              {scriptFailed && <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center font-body text-sm text-[oklch(0.45_0.04_185)] sm:min-h-[250px]"><p>The live review feed could not load here. Open the practice’s Google listing to browse current reviews.</p></div>}
            </div>
          ) : (
            <div className="flex min-h-[250px] flex-col items-center justify-center px-6 text-center">
              <MessageSquare className="mb-4 h-7 w-7" style={{ color: "oklch(0.42 0.09 185)" }} />
              <p className="max-w-xl font-body text-sm leading-relaxed text-[oklch(0.45_0.04_185)]">
                {prefersReducedMotion
                  ? "Your motion preference is enabled. Open the practice’s Google listing to browse current reviews without an auto-advancing carousel."
                  : "Allow functional cookies to load the live Google review feed, or open the practice’s Google listing directly."}
              </p>
              {isStagingHost && !prefersReducedMotion && (
                <button type="button" onClick={() => setStagingFeedOptIn(true)} className="mt-5 rounded-full border border-[oklch(0.42_0.09_185)] px-5 py-2.5 font-body text-sm font-bold text-[oklch(0.32_0.08_185)] transition-colors hover:bg-[oklch(0.94_0.018_185)]">
                  Load live Google review feed
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-7 flex justify-center">
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="btn-uplift-primary inline-flex rounded-full px-7 py-3">
            Read all Google reviews <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-center font-body text-xs leading-relaxed text-[oklch(0.52_0.04_185)]">The first two cards are selected from the current Google feed; remaining review order and availability are controlled by Google. Uplift does not add review or rating schema to this page.</p>
      </div>
    </section>
  );
}

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [heroMotionReady, setHeroMotionReady] = useState(false);
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || prefersReducedMotion || connection?.saveData) return;

    let timeoutId: number | undefined;
    const armMotion = () => {
      // Keep the initial static frame as LCP, then introduce matching motion after the first read.
      timeoutId = window.setTimeout(() => setHeroMotionReady(true), 1800);
    };

    if (document.readyState === "complete") armMotion();
    else window.addEventListener("load", armMotion, { once: true });

    return () => {
      window.removeEventListener("load", armMotion);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    let timeoutId: number | undefined;
    let revealed = false;
    const revealForHash = () => {
      if (!window.location.hash) return;
      revealed = true;
      setBelowFoldReady(true);
      window.removeEventListener("scroll", revealOnIntent);
    };
    const revealOnIntent = () => {
      if (revealed || window.scrollY <= 120) return;
      revealed = true;
      setBelowFoldReady(true);
      window.removeEventListener("scroll", revealOnIntent);
    };
    const schedule = () => {
      timeoutId = window.setTimeout(() => {
        revealed = true;
        setBelowFoldReady(true);
      }, isMobile ? 30000 : 2200);
      window.addEventListener("scroll", revealOnIntent, { passive: true });
    };

    if (window.location.hash) revealForHash();
    else if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    window.addEventListener("hashchange", revealForHash);

    return () => {
      window.removeEventListener("load", schedule);
      window.removeEventListener("scroll", revealOnIntent);
      window.removeEventListener("hashchange", revealForHash);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    if (!belowFoldReady || !targetId) return;

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const stickyHeaderOffset = 88;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - stickyHeaderOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
    };

    // A deferred target is absent during the browser's first native hash pass.
    // Replaying after paint and once more after initial layout keeps direct booking
    // links reliable without rendering the lower homepage earlier.
    const firstReplay = window.setTimeout(scrollToTarget, 120);
    const secondReplay = window.setTimeout(scrollToTarget, 420);

    return () => {
      window.clearTimeout(firstReplay);
      window.clearTimeout(secondReplay);
    };
  }, [belowFoldReady]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.dataset.scrollRevealState = "visible";
          observer.unobserve(element);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.dataset.scrollRevealState = "visible";
      } else {
        element.dataset.scrollRevealState = "pending";
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div data-home-root className="min-h-screen bg-[oklch(0.99_0.003_90)]">
      <PageSEO
        title="Uplift Dental | Dentist in Garden Grove, CA"
        description="Platinum Invisalign provider in Garden Grove, CA. Same-day emergencies, cosmetic and family dentistry, implants, orthodontics. Denti-Cal accepted."
        canonical="https://upliftdental.com/"
      />
      <Navbar />
      {/* ── HERO ── pulls up behind the sticky navbar so dark image shows behind nav at top */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ marginTop: 'calc(-1 * var(--navbar-height, 9rem))' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <picture className="block w-full h-full">
            <source media="(max-width: 640px)" srcSet={HERO_IMG_MOBILE} type="image/webp" />
            <img
              src={HERO_IMG_DESKTOP}
              alt="Mother and daughter sharing a sunlit, welcoming moment near Uplift Dental in Garden Grove"
              className="w-full h-full object-cover object-[58%_center] sm:object-center"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              width="1600"
              height="892"
              sizes="100vw"
            />
          </picture>
          {heroMotionReady && (
            <video
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster={HERO_IMG_DESKTOP}
            >
              <source src={HERO_MOTION_DESKTOP} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, oklch(0.18 0.04 185 / 0.88) 0%, oklch(0.18 0.04 185 / 0.70) 52%, oklch(0.18 0.04 185 / 0.24) 100%)" }} />
        </div>

        {/* CSS texture avoids a second above-the-fold image request. */}
        <div aria-hidden="true" className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.78 0.06 195 / 0.24) 0, transparent 34%), radial-gradient(circle at 80% 80%, oklch(0.65 0.08 185 / 0.20) 0, transparent 30%)" }} />

        {/* Decorative CSS-only loading accent; it does not block hero content or image rendering. */}
        <div aria-hidden="true" className="homepage-load-indicator" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
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
            <p className="sr-only">Affordable family dentist near me in Garden Grove, West Garden Grove, Westminster, and Seal Beach. Denti-Cal dentist accepting new patients.</p>

            <p className="font-body text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
              At Uplift Dental & Orthodontics, we create stunning, confident smiles with expert general, restorative, and cosmetic dentistry — for the whole family. <strong className="text-white">Going the Extra Smile!</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/contact" onClick={trackSchedule} className="btn-uplift-white text-base px-7 py-3.5 rounded-full font-semibold shadow-lg">
                <Calendar className="w-5 h-5" />
                Book Free Consultation
              </Link>
              <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/60 text-white font-body font-semibold text-base hover:bg-white/10 transition-all">
                <Phone className="w-5 h-5" />
                {PRACTICE.phone.display}
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
              {["Free Consultations", "Denti-Cal Accepted", "Same-Day Emergency", "Financing Options Available"].map((item) => (
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
                <a href={SMS.general} onClick={trackSchedule} className="font-bold text-white underline underline-offset-2">{PRACTICE.sms.display}</a>
                {" "}or{" "}
                <a href="/contact" onClick={trackSchedule} className="font-bold text-white underline underline-offset-2">book directly online</a>
              </span>
            </div>

          </div>
          <div className="lg:justify-self-end">
            <HeroQuickStart />
          </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/75" />
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
                <h2 className="font-display text-xl text-white font-bold">Emergency Dentist in Garden Grove — We're Here Now.</h2>
                <p className="font-body text-white/85 text-sm mt-0.5">
                  Severe toothache, knocked-out tooth, or broken crown? Same-day emergency appointments available.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href={SMS.general} onClick={trackSchedule} className="flex items-center gap-2 px-5 py-2.5 bg-white/20 border border-white/40 text-white rounded-full font-body font-semibold text-sm hover:bg-white/30 transition-all">
                <MessageSquare className="w-4 h-4" />
                Text Us Now
              </a>
              <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center gap-2 px-5 py-2.5 bg-white text-[oklch(0.65_0.18_35)] rounded-full font-body font-bold text-sm hover:bg-white/90 transition-all shadow-md">
                <Phone className="w-4 h-4" />
                Call {PRACTICE.phone.display}
              </a>
            </div>
          </div>
          <p className="text-center text-white/80 text-xs font-body mt-4">Open Mon–Fri 9am–5pm · 3rd Saturday of every month 9am–2pm</p>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="py-8 bg-white border-b border-[oklch(0.94_0.005_185)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: <Award className="w-5 h-5" />, title: "Platinum Invisalign®", sub: "Provider" },
              { icon: <Shield className="w-5 h-5" />, title: "Denti-Cal", sub: "& Military Insurance" },
              { icon: <Clock className="w-5 h-5" />, title: "Same-Day", sub: "Emergency Care" },
              { icon: <Smile className="w-5 h-5" />, title: "Free", sub: "Consultations" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 py-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "oklch(0.95 0.02 185)", color: "oklch(0.42 0.09 185)" }}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-body font-semibold text-sm text-[oklch(0.18_0.04_185)]">{item.title}</div>
                  <div className="font-body text-xs text-[oklch(0.52_0.04_185)]">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NO INSURANCE CALLOUT ── */}
      <section className="py-4 px-4" style={{ backgroundColor: "oklch(0.97 0.02 192)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl border-2 border-dashed text-center sm:text-left" style={{ borderColor: "oklch(0.75 0.08 192)" }}>
            <div className="flex-1">
              <p className="font-display text-lg font-bold" style={{ color: "oklch(0.25 0.06 192)" }}>No Insurance? No Problem!</p>
              <p className="font-body text-sm mt-1" style={{ color: "oklch(0.45 0.04 185)" }}>
                For less than $2/day, our in-house savings plan gives you free exams, X-rays &amp; cleanings — plus 15% off all treatment.
              </p>
            </div>
            <a
              href="/membership-plan"
              className="shrink-0 rounded-full px-6 py-2.5 text-sm font-bold font-body transition-all hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: "oklch(0.42 0.09 192)", color: "white" }}
            >
              See Plans from $39/mo →
            </a>
          </div>
        </div>
      </section>

      {belowFoldReady && (
        <Suspense fallback={null}>

      {/* ── SERVICES ── */}
      <section data-scroll-reveal className="py-20 bg-[oklch(0.99_0.003_90)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>What We Offer</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)]">Affordable Family Dentistry<br />&amp; Orthodontic Services</h2>
            <p className="font-body text-[oklch(0.45_0.04_185)] mt-4 max-w-2xl mx-auto">
              From your child's first cleaning to full smile transformations — Uplift Dental is your multi-specialty dental home in Garden Grove, CA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <Link key={s.title} href={s.href}>
                <div className="group reveal-card bg-white rounded-2xl p-6 border border-[oklch(0.92_0.01_185)] hover:border-[oklch(0.42_0.09_185)]/40 hover:shadow-xl cursor-pointer h-full relative overflow-hidden">
                  {/* Subtle gradient accent on hover */}
                  <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, oklch(0.42 0.09 185), oklch(0.65 0.07 195))" }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300" style={{ backgroundColor: "oklch(0.95 0.02 185)", color: "oklch(0.42 0.09 185)" }}>{s.icon}</div>
                  <h3 className="font-display text-lg text-[oklch(0.18_0.04_185)] mb-2 group-hover:text-[oklch(0.42_0.09_185)] transition-colors">{s.title}</h3>
                  <p className="font-body text-sm text-[oklch(0.48_0.03_185)] leading-relaxed">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-body font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "oklch(0.42 0.09 185)" }}>
                    Learn more <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY & ADVANCED CARE ── */}
      <section data-scroll-reveal className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Advanced Technology</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)]">3D Printing & Digital<br />Dentistry Innovation</h2>
            <p className="font-body text-[oklch(0.45_0.04_185)] mt-4 max-w-2xl mx-auto">From 3D-printed dentures to digital implant planning, Uplift Dental uses cutting-edge technology to deliver precise, comfortable results.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/3ddenture2_0802583c.webp" alt="3D-printed denture fabrication process showing digital design stage at Uplift Dental Garden Grove" className="w-full h-80 object-cover" loading="lazy" width="600" height="400"/>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/3ddenture4_fe4fe9c0.webp" alt="Completed 3D-printed denture with precision fit and natural tooth-colored restoration" className="w-full h-80 object-cover" loading="lazy" width="600" height="400"/>
            </div>
          </div>
          <div className="mt-8 bg-[oklch(0.97_0.008_192)] rounded-2xl p-8">
            <h3 className="font-display text-2xl text-[oklch(0.18_0.04_185)] mb-4">Why 3D Printing Matters</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Precision Fit", desc: "Digital scanning ensures dentures fit perfectly to your unique mouth anatomy" },
                { title: "Faster Results", desc: "3D-printed dentures are ready in 1-2 weeks instead of 3-4 weeks" },
                { title: "Superior Comfort", desc: "Biocompatible materials and exact digital design mean better comfort and function" },
              ].map((item) => (
                <div key={item.title}>
                  <h4 className="font-body font-semibold text-gray-800 mb-2">{item.title}</h4>
                  <p className="font-body text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT / COMMUNITY ── */}
      <section data-scroll-reveal className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <img src={TEAM_IMG} alt={`Uplift Dental & Orthodontics team in front of the office logo in ${PRACTICE.address.city}, ${PRACTICE.address.state}`} className="w-full rounded-3xl object-cover shadow-2xl" style={{ maxHeight: "500px" }} loading="lazy" width="2048" height="1444"/>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-[oklch(0.90_0.015_185)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.95 0.015 185)" }}>
                    <Users className="w-5 h-5" style={{ color: "oklch(0.42 0.09 185)" }} />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-[oklch(0.18_0.04_185)]">Our Team</div>
                    <div className="font-body text-xs text-[oklch(0.52_0.04_185)]">Here for Garden Grove</div>
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
            {[
              ["Multi-Specialty", "Dental care"],
              ["Denti-Cal & PPO", "Coverage support"],
              ["Third Saturday", "Monthly hours"],
              ["Same-Day", "Emergency care"],
            ].map(([title, label]) => (
              <div key={title} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-white">{title}</div>
                <div className="text-sm font-body text-white/70 mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVISALIGN FEATURE ── */}
      <section data-scroll-reveal className="py-20 bg-white">
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
              <Link href="/invisalign" className="btn-uplift-primary reveal-primary-button rounded-full px-7 py-3">
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
      <section data-scroll-reveal className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 85)" }}>
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
              {
                img: DR_SIDKY,
                name: "Dr. David Sidky",
                slug: "dr-sidky",
                title: "Associate Dentist",
                bio: "A third-generation dentist and Boston University DMD graduate, Dr. Sidky combines precision with artistry in cosmetic and general dentistry. He's known for building genuine patient relationships and creating confident smiles.",
                specialties: ["General Dentistry", "Cosmetic Dentistry", "Restorative"],
              },
            ].map((doc) => (
              <Link key={doc.name} href={`/about#${doc.slug}`} className="block">
                <div className="reveal-card bg-white rounded-3xl overflow-hidden shadow-lg border border-[oklch(0.90_0.015_185)] card-hover h-full">
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

      {/* ── LIVE GOOGLE FEEDBACK ── */}
      <LiveGoogleReviews />

      {/* ── CASE STUDIES ── */}
      <section data-scroll-reveal className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 192)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Real Transformations</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)]">Before & After<br />Smile Makeovers</h2>
            <p className="font-body text-[oklch(0.45_0.04_185)] mt-4 max-w-2xl mx-auto">Explore two approved, practice-provided cosmetic treatment comparisons. Drag the divider or use the left and right arrow keys when it is focused.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SMILE_MAKEOVER_CASES.map((item) => (
              <article key={item.id} className="reveal-card overflow-hidden rounded-2xl border border-[oklch(0.88_0.014_185)] bg-white shadow-sm">
                <BeforeAfterSlider
                  before={item.before}
                  after={item.after}
                  beforeAlt={item.beforeAlt}
                  afterAlt={item.afterAlt}
                  className="rounded-b-none"
                />
                <div className="p-5">
                  <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "oklch(0.42 0.09 185)" }}>Practice-provided comparison</p>
                  <h3 className="font-display text-2xl text-[oklch(0.18_0.04_185)]">{item.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-[oklch(0.45_0.04_185)]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-3xl text-center font-body text-xs leading-relaxed text-[oklch(0.52_0.04_185)]">These approved image pairs retain their original color and lighting. Individual treatment needs and results vary; a consultation is the best way to discuss options appropriate for you.</p>

          <div className="text-center mt-10">
            <Link href="/gallery" className="reveal-primary-button inline-flex items-center gap-2 px-8 py-3 rounded-full font-body font-semibold text-white transition-all" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
              View Full Gallery <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── INSURANCE ── */}
      <section data-scroll-reveal className="py-20" style={{ backgroundColor: "oklch(0.97 0.005 200)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "oklch(0.42 0.09 192)" }}>Insurance We Accept</p>
            <h2 className="font-display text-3xl md:text-4xl text-[oklch(0.18_0.04_185)]">Denti-Cal Dentist Near Westminster &amp; Garden Grove</h2>
            <p className="font-body text-base text-[oklch(0.45_0.04_185)] mt-3 max-w-xl mx-auto">We work with most major dental insurance plans including Denti-Cal, PPOs, and military coverage.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {insuranceLogos.map((ins) => (
              <div key={ins.name} className="reveal-card bg-white rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm border border-[oklch(0.92_0.01_200)] hover:shadow-md hover:border-[oklch(0.80_0.05_192)] group cursor-default">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display text-lg font-bold mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: ins.color }}
                >
                  {ins.initials}
                </div>
                <span className="font-body text-sm text-[oklch(0.30_0.03_200)] font-semibold text-center leading-tight">{ins.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-3 rounded-2xl border border-[oklch(0.90_0.015_200)] bg-white p-3 shadow-sm sm:grid-cols-3">
            {[
              ["PPO, Denti-Cal & Military", "Bring your plan details and our team can help verify benefits before your visit."],
              ["Flexible financing", "CareCredit and Cherry may offer additional payment options for eligible patients."],
              ["No insurance?", "Ask about in-house membership plans designed for preventive care and savings."],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-xl bg-[oklch(0.97_0.008_192)] px-4 py-4">
                <p className="font-body text-sm font-bold text-[oklch(0.22_0.04_185)]">{title}</p>
                <p className="mt-1 font-body text-xs leading-relaxed text-[oklch(0.48_0.04_185)]">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <Link href="/insurance-financing" className="font-body text-sm font-bold underline decoration-[oklch(0.55_0.08_192)] underline-offset-4" style={{ color: "oklch(0.42 0.09 192)" }}>Explore coverage and payment options</Link>
            <span className="hidden text-[oklch(0.70_0.02_200)] sm:inline">·</span>
            <a href="/contact" onClick={trackSchedule} className="font-body text-sm font-semibold text-[oklch(0.42_0.09_192)]">Call {PRACTICE.phone.display} to verify your plan →</a>
          </div>
          <p className="mt-4 text-center font-body text-xs text-[oklch(0.52_0.03_200)]">Coverage, financing approval, and out-of-pocket costs vary by plan and treatment. Our team can review your available options before care begins.</p>
        </div>
      </section>

      {/* ── APPOINTMENT FORM ── */}
      <section className="scroll-mt-32 py-20 bg-white" id="appointment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Get Started</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-6">
                Let's Book Your<br />Appointment
              </h2>
              <p className="font-body text-[oklch(0.40_0.04_185)] leading-relaxed mb-8">
                Choose the booking option that feels easiest. Secure online scheduling is the fastest way to request a time, or you can call, text, or send a brief booking request for our team to follow up.
              </p>
              <ol className="grid gap-3 sm:grid-cols-3 mb-8" aria-label="Booking steps">
                {[
                  ["1", "Choose a booking option"],
                  ["2", "Pick a convenient time"],
                  ["3", "Receive confirmation"],
                ].map(([step, label]) => (
                  <li key={step} className="flex items-center gap-3 rounded-xl border border-[oklch(0.90_0.015_185)] bg-white px-3 py-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>{step}</span>
                    <span className="font-body text-xs font-semibold text-[oklch(0.30_0.04_185)]">{label}</span>
                  </li>
                ))}
              </ol>
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
              <div className="mb-6 rounded-2xl border border-[oklch(0.85_0.03_185)] bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "oklch(0.42 0.09 185)" }}>Fastest option</p>
                    <h3 className="mt-1 font-display text-xl text-[oklch(0.18_0.04_185)]">Book securely online</h3>
                    <p className="mt-1 font-body text-xs text-[oklch(0.45_0.04_185)]">Choose an appointment reason in the patient portal.</p>
                  </div>
                  <a href={CARESTACK_BOOKING_URL} target="_blank" rel="noreferrer noopener" className="reveal-primary-button inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 font-body text-sm font-bold text-white" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
                    Book Online <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-[oklch(0.88_0.015_185)]" />
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[oklch(0.48_0.04_185)]">or send a brief request</span>
                <span className="h-px flex-1 bg-[oklch(0.88_0.015_185)]" />
              </div>
              <h3 className="font-display text-2xl text-[oklch(0.18_0.04_185)] mb-2">Request an Appointment</h3>
              <p className="mb-5 font-body text-sm text-[oklch(0.45_0.04_185)]">Share only your name and phone number. Please do not include medical details.</p>
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>


      {/* ── RESTORATION SOLUTIONS ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.008 192)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 185)" }}>Complete Tooth Replacement</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-6">
                Dentures That Feel<br />Natural & Comfortable
              </h2>
              <p className="font-body text-[oklch(0.40_0.04_185)] leading-relaxed mb-6">
                Missing teeth? Our 3D-printed dentures are custom-fitted to your mouth for superior comfort and natural appearance. Using advanced digital technology, we create dentures that restore your ability to eat, speak, and smile with confidence.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Custom-fit 3D-printed dentures",
                  "Precise digital scanning for perfect fit",
                  "Natural-looking teeth and gum color",
                  "Ready in 1-2 weeks",
                  "Affordable tooth replacement option",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-body text-sm text-[oklch(0.35_0.04_185)]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "oklch(0.42 0.09 185)" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/dentures" className="btn-uplift-primary rounded-full px-7 py-3">
                Learn About Dentures <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/3ddenture3_f6f03e03.webp" alt="3D-printed denture showing internal structure and precision design for optimal fit and comfort" className="w-full rounded-2xl object-cover object-center shadow-lg h-48" style={{ objectPosition: "50% 52%" }} loading="lazy" width="400" height="300"/>
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/Denture3d_b263eb16.webp" alt="Finished 3D-printed denture with natural tooth color and gum-colored base for realistic smile restoration" className="w-full rounded-2xl object-cover object-center shadow-lg h-48" style={{ objectPosition: "50% 52%" }} loading="lazy" width="400" height="300"/>
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
                  ["CareCredit, Cherry & in-house financing", true, false],
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
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
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
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact" onClick={trackSchedule} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white text-base transition-all hover:opacity-90" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
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
            <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="btn-uplift-primary rounded-full px-7 py-3">
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
                href="/contact" onClick={trackSchedule}
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
                  <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="font-body font-semibold text-[oklch(0.18_0.04_185)]">{PRACTICE.phone.display}</a>
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
            <Link href="/contact" onClick={trackSchedule} className="btn-uplift-white text-base px-8 py-4 rounded-full font-bold shadow-xl">
              <Calendar className="w-5 h-5" />
              Book Free Consultation
            </Link>
            <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/50 text-white font-body font-semibold text-base hover:bg-white/10 transition-all">
              <Phone className="w-5 h-5" />
              Call {PRACTICE.phone.display}
            </a>
          </div>
          <p className="font-body text-white/75 text-sm mt-6">*Free consultation valued at $150. New patients only. For faster service, text us at {PRACTICE.sms.display}.</p>
        </div>
      </section>

      <Footer />
        </Suspense>
      )}
    </div>
  );
}

function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const detailsComplete = Boolean(form.name.trim() && form.phone.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFormError("");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
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
      trackLead();
      trackSchedule();
      setSubmitted(true);
    } catch (err) {
      setFormError(`Something went wrong. Please call ${PRACTICE.phone.display}.`);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10" role="status" aria-live="polite">
        <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: "oklch(0.42 0.09 185)" }} />
        <h3 className="font-display text-2xl text-[oklch(0.18_0.04_185)] mb-2">Thank You!</h3>
        <p className="font-body text-[oklch(0.45_0.04_185)]">We'll be in touch within one business day to confirm your appointment.</p>
        <p className="font-body text-sm mt-4">Or call us now: <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="font-semibold" style={{ color: "oklch(0.42 0.09 185)" }}>{PRACTICE.phone.display}</a></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="appointment-form-guidance">
      <div id="appointment-form-guidance" className="rounded-xl border border-[oklch(0.89_0.015_185)] bg-white/80 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <span className="font-body text-xs font-semibold text-[oklch(0.32_0.04_185)]">Your contact details</span>
          <span className="font-body text-xs font-bold" style={{ color: detailsComplete ? "oklch(0.42 0.09 185)" : "oklch(0.52 0.04 185)" }}>{detailsComplete ? "Ready to send" : "2 short fields"}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[oklch(0.91_0.012_185)]" aria-hidden="true">
          <div className="h-full rounded-full transition-transform duration-200 motion-reduce:transition-none" style={{ width: detailsComplete ? "100%" : "50%", backgroundColor: "oklch(0.42 0.09 185)" }} />
        </div>
      </div>
      {formError && <div role="alert" className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-body text-xs">{formError}</div>}
      <div>
        <label htmlFor="appointment-name" className="block font-body text-xs font-semibold text-[oklch(0.35_0.04_185)] mb-1.5 uppercase tracking-wide">Your Name *</label>
        <input id="appointment-name" name="name" autoComplete="name" required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
          placeholder="Jane Smith"
          className="w-full px-4 py-3 rounded-xl border border-[oklch(0.90_0.015_185)] bg-white font-body text-sm transition-[border-color,box-shadow] duration-150 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[oklch(0.42_0.09_185)] focus:border-transparent" />
      </div>
      <div>
        <label htmlFor="appointment-phone" className="block font-body text-xs font-semibold text-[oklch(0.35_0.04_185)] mb-1.5 uppercase tracking-wide">Phone Number *</label>
        <input id="appointment-phone" name="tel" autoComplete="tel" required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
          placeholder="(714) 000-0000"
          className="w-full px-4 py-3 rounded-xl border border-[oklch(0.90_0.015_185)] bg-white font-body text-sm transition-[border-color,box-shadow] duration-150 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[oklch(0.42_0.09_185)] focus:border-transparent" />
      </div>
      <button type="submit" disabled={sending} className="reveal-primary-button w-full py-4 rounded-xl text-white font-body font-bold text-sm active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" style={{ backgroundColor: "oklch(0.42 0.09 185)" }}>
        <Calendar className="w-4 h-4" />
        {sending ? "Sending Request..." : "Send Booking Request"}
      </button>
      <p className="font-body text-xs text-center text-[oklch(0.52_0.04_185)]">We'll respond within 1 business day. For urgent care, call {PRACTICE.phone.display}.</p>
      <p className="font-body text-xs text-center text-[oklch(0.55_0.02_220)] leading-relaxed border-t border-[oklch(0.92_0.01_220)] pt-3">
        <strong>Privacy Notice:</strong> Do not include sensitive health information (symptoms, diagnoses, or treatment details) in this form. This form is not encrypted for protected health information (PHI). For confidential matters, please call us directly at {PRACTICE.phone.display}.
      </p>
    </form>
  );
}
const DR_SIDKY = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519418507/XbJMTPsZSXVcOpYR.jpeg";
