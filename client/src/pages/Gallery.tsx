/*
  UPLIFT DENTAL — Source-backed practice gallery
  Design: Elevated Warmth; authentic practice proof with restrained, source-recorded comparisons.
  Clinical imagery is shown only in unaltered, approved before-and-after sliders with no treatment guarantees.
*/
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Phone, MessageSquare, ChevronRight, ZoomIn, ScanLine, Users, ShieldCheck } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";
import { trackSchedule } from "@/lib/tracking";
import { REVIEW_SOURCES } from "@/lib/review-sources";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

interface GalleryRecord {
  id: number;
  category: "Digital Dentistry" | "Our Team" | "Our Office";
  title: string;
  description: string;
  image: string;
  alt: string;
  source: string;
  fit?: "cover" | "contain";
}

const records: GalleryRecord[] = [
  {
    id: 1,
    category: "Digital Dentistry",
    title: "Digital Denture Design",
    description: "A practice-provided view of the digital design stage used in the team’s denture workflow.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/3ddenture2_0802583c.webp",
    alt: "Digital denture design shown in Uplift Dental's practice technology workflow",
    source: "Practice-provided technology image",
  },
  {
    id: 2,
    category: "Digital Dentistry",
    title: "Denture Fabrication Detail",
    description: "A practice-provided technology image showing a denture component in the digital fabrication workflow.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/3ddenture4_fe4fe9c0.webp",
    alt: "Denture component from Uplift Dental's digital fabrication workflow",
    source: "Practice-provided technology image",
  },
  {
    id: 3,
    category: "Digital Dentistry",
    title: "Finished Digital Denture",
    description: "A practice-provided image of a completed denture appliance. Treatment needs and outcomes vary by patient.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/Denture3d_b263eb16.webp",
    alt: "Finished denture appliance shown by Uplift Dental",
    source: "Practice-provided technology image",
  },
  {
    id: 4,
    category: "Our Team",
    title: "The Uplift Dental Team",
    description: "A current practice-provided team image from Uplift Dental & Orthodontics in Garden Grove.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/uplift-team-real_80532d53.jpg",
    alt: "Uplift Dental and Orthodontics team in Garden Grove",
    source: "Practice-provided team image",
  },
  {
    id: 5,
    category: "Our Office",
    title: "Reception & Waiting Area",
    description: "An authentic practice-provided view of the reception and waiting area at Uplift Dental & Orthodontics in Garden Grove.",
    image: "/manus-storage/uplift-reception-wide_5d817e16.webp",
    alt: "Reception and waiting area at Uplift Dental and Orthodontics in Garden Grove",
    source: "Practice-provided office interior image",
  },
  {
    id: 6,
    category: "Our Office",
    title: "Uplift Reception Desk",
    description: "An authentic practice-provided view of the branded reception area where patients check in.",
    image: "/manus-storage/uplift-reception-branded_bbc61b1b.webp",
    alt: "Branded reception desk at Uplift Dental and Orthodontics",
    source: "Practice-provided office interior image",
  },
  {
    id: 7,
    category: "Our Office",
    title: "Care Environment",
    description: "A practice-provided image from a clinical room at Uplift Dental & Orthodontics.",
    image: "/manus-storage/img_2495-web_1a77c86d.webp",
    alt: "Uplift Dental care team and a person in a clinical room",
    source: "Practice-provided care-environment image with marketing consent",
    fit: "contain",
  },
  {
    id: 8,
    category: "Our Office",
    title: "Clinical Room Team",
    description: "A practice-provided image showing an Uplift Dental clinical room and care team.",
    image: "/manus-storage/img_2496-web_12fc8cc0.webp",
    alt: "Uplift Dental care team and a person in a clinical room",
    source: "Practice-provided care-environment image with marketing consent",
    fit: "contain",
  },
];

const categories = ["All", "Digital Dentistry", "Our Office", "Our Team"] as const;

const comparisonCases = [
  {
    id: "case-1",
    title: "Case 1 Comparison",
    before: "/manus-storage/uplift-case-1-before_c7e95f4e.png",
    after: "/manus-storage/uplift-case-1-after_b4e1eb64.png",
    beforeAlt: "Case 1 before image provided by Uplift Dental",
    afterAlt: "Case 1 after image provided by Uplift Dental",
  },
  {
    id: "case-2",
    title: "Case 2 Comparison",
    before: "/manus-storage/uplift-case-2-before_217e67b4.png",
    after: "/manus-storage/uplift-case-2-after_e1f67053.webp",
    beforeAlt: "Case 2 before image provided by Uplift Dental",
    afterAlt: "Case 2 after image provided by Uplift Dental",
  },
] as const;

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [selectedRecord, setSelectedRecord] = useState<GalleryRecord | null>(null);
  const visibleRecords = activeCategory === "All" ? records : records.filter((record) => record.category === activeCategory);

  return (
    <>
      <PageSEO
        title="Practice & Technology Gallery | Uplift Dental Garden Grove"
        description="Explore source-backed office, team, and practice technology imagery from Uplift Dental & Orthodontics in Garden Grove, California."
        canonical="https://upliftdental.com/gallery"
      />
      <div className="min-h-screen bg-white">
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Gallery", url: "https://upliftdental.com/gallery" },
        ]} />
        <Navbar />

        <section className="relative overflow-hidden py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div aria-hidden="true" className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, oklch(0.65 0.18 35) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.55 0.15 192) 0%, transparent 50%)" }} />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-body text-white/90">
              <ShieldCheck className="h-4 w-4" style={{ color: "oklch(0.85 0.18 85)" }} />
              Source-backed practice imagery
            </div>
            <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">Practice & Technology Gallery</h1>
            <p className="mx-auto mb-8 max-w-2xl font-body text-lg text-white/80">Explore the office, team, technology, and practice-provided imagery behind Uplift Dental & Orthodontics in Garden Grove.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact" onClick={trackSchedule} className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-body text-base font-bold shadow-xl transition-all hover:bg-white/90" style={{ color: COLORS.tealDark }}>
                Book a Free Consultation <ChevronRight className="h-4 w-4" />
              </Link>
              <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 font-body text-base font-semibold text-white transition-all hover:bg-white/10">
                <Phone className="h-4 w-4" /> {PRACTICE.phone.display}
              </a>
            </div>
          </div>
        </section>

        <section className="sticky top-0 z-20 border-b border-gray-100 bg-white py-6 shadow-sm">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button key={category} onClick={() => setActiveCategory(category)} className="rounded-full px-5 py-2 font-body text-sm font-semibold transition-all" style={activeCategory === category ? { backgroundColor: COLORS.teal, color: "white" } : { backgroundColor: COLORS.tealPale, color: COLORS.tealDark }}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 rounded-3xl border border-[oklch(0.90_0.015_185)] bg-[oklch(0.97_0.008_192)] p-6 text-center">
              <p className="mx-auto max-w-3xl font-body text-sm leading-relaxed text-[oklch(0.40_0.04_185)]">This page includes practice-provided office, team, technology, and two approved clinical comparison cases. Before-and-after images are displayed only when their source and publication approval are retained; individual needs and outcomes vary.</p>
            </div>

            <section aria-labelledby="comparison-cases-heading" className="mb-16 rounded-[2rem] border border-[oklch(0.88_0.018_185)] bg-[oklch(0.985_0.006_75)] p-5 sm:p-8">
              <div className="mb-8 max-w-3xl">
                <span className="mb-3 inline-flex rounded-full px-3 py-1 font-body text-xs font-semibold" style={{ backgroundColor: COLORS.tealPale, color: COLORS.tealDark }}>Approved before-and-after cases</span>
                <h2 id="comparison-cases-heading" className="font-display text-3xl font-bold" style={{ color: COLORS.tealDark }}>Slide to compare each image pair</h2>
                <p className="mt-3 font-body leading-relaxed text-gray-600">Drag the divider, or use the left and right arrow keys when it is focused. The supplied images retain their original color and lighting; the neutral frame is used only for a consistent comparison display.</p>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                {comparisonCases.map((caseRecord) => (
                  <article key={caseRecord.id} className="overflow-hidden rounded-2xl border border-[oklch(0.87_0.014_185)] bg-white shadow-sm">
                    <BeforeAfterSlider
                      before={caseRecord.before}
                      after={caseRecord.after}
                      beforeAlt={caseRecord.beforeAlt}
                      afterAlt={caseRecord.afterAlt}
                      className="rounded-b-none"
                    />
                    <div className="p-5">
                      <h3 className="font-display text-xl font-bold" style={{ color: COLORS.tealDark }}>{caseRecord.title}</h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-gray-600">Practice-provided before-and-after image pair. No treatment outcome is promised; individual needs and results vary.</p>
                      <p className="mt-4 font-body text-xs text-gray-500">Source: Practice-provided clinical comparison image, approved for gallery display</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visibleRecords.map((record) => (
                <article key={record.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-shadow hover:shadow-xl">
                  <button onClick={() => setSelectedRecord(record)} className="group relative block w-full text-left" aria-label={`View ${record.title}`}>
                    <img src={record.image} alt={record.alt} className={`h-64 w-full ${record.fit === "contain" ? "bg-[oklch(0.97_0.008_192)] object-contain" : "object-cover"}`} loading="lazy" width="600" height="400" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="rounded-full bg-white/90 p-2"><ZoomIn className="h-5 w-5" style={{ color: COLORS.tealDark }} /></span>
                    </span>
                  </button>
                  <div className="p-5">
                    <span className="mb-3 inline-block rounded-full px-3 py-1 font-body text-xs font-semibold" style={{ backgroundColor: COLORS.tealPale, color: COLORS.tealDark }}>{record.category}</span>
                    <h2 className="mb-2 font-display text-lg font-bold" style={{ color: COLORS.tealDark }}>{record.title}</h2>
                    <p className="font-body text-sm leading-relaxed text-gray-600">{record.description}</p>
                    <p className="mt-4 font-body text-xs text-gray-500">Source: {record.source}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16" style={{ backgroundColor: COLORS.tealPale }}>
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <MessageSquare className="mx-auto mb-4 h-8 w-8" style={{ color: COLORS.teal }} />
            <h2 className="font-display text-3xl font-bold md:text-4xl" style={{ color: COLORS.tealDark }}>Independent Patient Feedback</h2>
            <p className="mx-auto mt-4 max-w-2xl font-body leading-relaxed text-gray-600">Patient feedback is hosted by the independent business-profile source. We do not recreate individual reviews, ratings, or reviewer identities on this page without a retained source record.</p>
            <a href={REVIEW_SOURCES.google.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3 font-body font-bold text-white" style={{ backgroundColor: COLORS.teal }}>
              {REVIEW_SOURCES.google.label} <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="py-16" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="mx-auto max-w-3xl px-4 text-center">
            <ScanLine className="mx-auto mb-4 h-8 w-8 text-white/80" />
            <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">Talk Through Your Options</h2>
            <p className="mb-8 font-body text-lg text-white/80">Book a consultation with our Garden Grove team to discuss the treatment path that may be appropriate for your needs.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact" onClick={trackSchedule} className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-body text-base font-bold shadow-xl transition-all hover:bg-white/90" style={{ color: COLORS.tealDark }}>
                Book a Consultation <ChevronRight className="h-4 w-4" />
              </Link>
              <a href={SMS.general} onClick={trackSchedule} className="flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 font-body text-base font-semibold text-white transition-all hover:bg-white/10">
                <MessageSquare className="h-4 w-4" /> Text Us for Faster Service
              </a>
            </div>
          </div>
        </section>

        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedRecord(null)}>
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <img src={selectedRecord.image} alt={selectedRecord.alt} className="max-h-[65vh] w-full object-contain bg-[oklch(0.97_0.008_192)]" />
              <div className="p-6">
                <h2 className="font-display text-xl font-bold" style={{ color: COLORS.tealDark }}>{selectedRecord.title}</h2>
                <p className="mt-2 font-body text-gray-600">{selectedRecord.description}</p>
                <p className="mt-4 font-body text-xs text-gray-500">Source: {selectedRecord.source}</p>
                <button onClick={() => setSelectedRecord(null)} className="mt-5 rounded-full border border-gray-200 px-6 py-3 font-body text-sm font-semibold transition-colors hover:bg-gray-50">Close</button>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}
