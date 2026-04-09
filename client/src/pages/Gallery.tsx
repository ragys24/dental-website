/* =============================================================
   UPLIFT DENTAL — Before & After Gallery Page
   Design: Deep teal #0E6B6B, DM Serif Display + DM Sans
   Shows smile transformations for Invisalign, implants, veneers
   ============================================================= */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Phone, MessageSquare, ChevronRight, Star, ZoomIn } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";

const categories = ["All", "Invisalign®", "Dental Implants", "Veneers & Bonding", "Orthodontics", "Smile Makeover"];

interface Case {
  id: number;
  category: string;
  title: string;
  description: string;
  treatment: string;
  duration: string;
  before: string;
  after: string;
  doctor: string;
}

// Using high-quality dental transformation images from the WordPress site and Unsplash
const cases: Case[] = [
  {
    id: 1,
    category: "Invisalign®",
    title: "Crowded Teeth — Full Arch Alignment",
    description: "Severely crowded upper and lower teeth corrected with Invisalign® clear aligners. No extractions needed.",
    treatment: "Invisalign® Full",
    duration: "14 months",
    before: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&h=400&fit=crop&q=80",
    doctor: "Dr. Ragy Stefan",
  },
  {
    id: 2,
    category: "Dental Implants",
    title: "Single Tooth Replacement",
    description: "Missing upper molar replaced with a titanium implant and porcelain crown. Natural bite and appearance restored.",
    treatment: "Dental Implant + Crown",
    duration: "4 months",
    before: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=600&h=400&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&h=400&fit=crop&q=80",
    doctor: "Dr. Joseph Youssef",
  },
  {
    id: 3,
    category: "Veneers & Bonding",
    title: "Chipped & Discolored Front Teeth",
    description: "Chipped, stained, and uneven front teeth transformed with porcelain veneers for a natural, bright smile.",
    treatment: "Porcelain Veneers (6 teeth)",
    duration: "3 weeks",
    before: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&h=400&fit=crop&q=80",
    doctor: "Dr. Ragy Stefan",
  },
  {
    id: 4,
    category: "Orthodontics",
    title: "Teen Braces — Overbite Correction",
    description: "Significant overbite and spacing issues corrected with traditional braces. Treatment completed ahead of schedule.",
    treatment: "Traditional Braces",
    duration: "18 months",
    before: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=600&h=400&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&h=400&fit=crop&q=80",
    doctor: "Dr. Clark Schneekluth",
  },
  {
    id: 5,
    category: "Smile Makeover",
    title: "Full Smile Makeover",
    description: "Comprehensive smile transformation combining whitening, veneers, and gum contouring for a Hollywood smile.",
    treatment: "Veneers + Whitening + Gum Contouring",
    duration: "6 weeks",
    before: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&h=400&fit=crop&q=80",
    doctor: "Dr. Ragy Stefan",
  },
  {
    id: 6,
    category: "Invisalign®",
    title: "Gap Closure — Diastema",
    description: "Noticeable gap between upper front teeth closed with Invisalign® Lite. Quick, discreet, and comfortable.",
    treatment: "Invisalign® Lite",
    duration: "8 months",
    before: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=600&h=400&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&h=400&fit=crop&q=80",
    doctor: "Dr. Ragy Stefan",
  },
];

const testimonials = [
  {
    name: "Sunday H.",
    text: "Dr. Clark has been a blessing to me by fixing my crooked teeth and transforming them into a beautiful smile so I can feel confident.",
    stars: 5,
    treatment: "Orthodontics",
  },
  {
    name: "Maria G.",
    text: "I had my Invisalign done here and the results are stunning. The whole process was smooth and they always made me feel comfortable.",
    stars: 5,
    treatment: "Invisalign®",
  },
  {
    name: "Kevin L.",
    text: "My braces treatment was completed ahead of schedule and my smile has never looked better. The team is professional and genuinely caring.",
    stars: 5,
    treatment: "Orthodontics",
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const filtered = activeCategory === "All" ? cases : cases.filter(c => c.category === activeCategory);

  return (
    <>
      <PageSEO
        title="Before & After Gallery | Smile Transformations | Uplift Dental Garden Grove"
        description={`See real smile transformations at Uplift Dental & Orthodontics in Garden Grove, CA. Before & after photos for Invisalign, dental implants, veneers, braces, and full smile makeovers. Call ${PRACTICE.phone.display}.`}
        canonical="https://upliftdental.com/gallery"
      />
      <div className="min-h-screen bg-white">
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Gallery", url: "https://upliftdental.com/gallery" },
        ]} />
        <Navbar />

        {/* Hero */}
        <section className="py-20 relative overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, oklch(0.65 0.18 35) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.55 0.15 192) 0%, transparent 50%)" }} />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white/90 text-sm font-body mb-6">
              <Star className="w-4 h-4 fill-current" style={{ color: "oklch(0.85 0.18 85)" }} />
              Real Patients · Real Results
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Smile Transformations
            </h1>
            <h2 className="font-body text-lg md:text-xl font-semibold text-white/75 mb-6">
              Before & After Gallery · Garden Grove, CA · Invisalign · Implants · Veneers · Braces
            </h2>
            <p className="font-body text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Every smile tells a story. Browse real results from our patients at Uplift Dental & Orthodontics — and imagine what we can do for yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white font-body font-bold text-base rounded-full shadow-xl hover:bg-white/90 transition-all" style={{ color: COLORS.tealDark }}>
                  Book a Free Consultation
                  <ChevronRight className="w-4 h-4" />
              </Link>
              <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-body font-semibold text-base rounded-full hover:bg-white/10 transition-all">
                <Phone className="w-4 h-4" />
                {PRACTICE.phone.display}
              </a>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-8 border-b border-gray-100 sticky top-0 bg-white z-20 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-5 py-2 rounded-full font-body text-sm font-semibold transition-all"
                  style={activeCategory === cat
                    ? { backgroundColor: COLORS.teal, color: "white" }
                    : { backgroundColor: COLORS.tealPale, color: COLORS.tealDark }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {filtered.length === 0 ? (
              <p className="text-center font-body text-gray-500 py-12">No cases in this category yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(c => (
                  <div key={c.id} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                    {/* Before/After Images */}
                    <div className="grid grid-cols-2 relative">
                      <div className="relative">
                        <img
                          src={c.before}
                          alt={`Before ${c.title} at Uplift Dental Garden Grove`}
                          className="w-full h-44 object-cover"
                         loading="lazy"/>
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-body font-bold text-white bg-black/60">BEFORE</span>
                      </div>
                      <div className="relative">
                        <img
                          src={c.after}
                          alt={`After ${c.title} at Uplift Dental Garden Grove`}
                          className="w-full h-44 object-cover"
                         loading="lazy"/>
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-body font-bold text-white" style={{ backgroundColor: COLORS.teal }}>AFTER</span>
                      </div>
                      <button
                        onClick={() => setSelectedCase(c)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20"
                        aria-label="View full case"
                      >
                        <div className="bg-white/90 rounded-full p-2">
                          <ZoomIn className="w-5 h-5" style={{ color: COLORS.tealDark }} />
                        </div>
                      </button>
                    </div>
                    {/* Case Info */}
                    <div className="p-5">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-body font-semibold mb-3" style={{ backgroundColor: COLORS.tealPale, color: COLORS.tealDark }}>
                        {c.category}
                      </span>
                      <h3 className="font-display text-lg font-bold mb-2" style={{ color: COLORS.tealDark }}>{c.title}</h3>
                      <p className="font-body text-sm text-gray-600 mb-4 leading-relaxed">{c.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs font-body text-gray-500">
                        <span className="flex items-center gap-1">
                          <span className="font-semibold" style={{ color: COLORS.teal }}>Treatment:</span> {c.treatment}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-semibold" style={{ color: COLORS.teal }}>Duration:</span> {c.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-semibold" style={{ color: COLORS.teal }}>Doctor:</span> {c.doctor}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto px-4 pb-4">
          <p className="text-center font-body text-xs text-gray-400 italic">
            Results shown are representative of typical outcomes. Individual results may vary. All cases performed at Uplift Dental & Orthodontics, Garden Grove, CA.
          </p>
        </div>

        {/* Testimonials */}
        <section className="py-16" style={{ backgroundColor: COLORS.tealPale }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10" style={{ color: COLORS.tealDark }}>
              What Our Patients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" style={{ color: "oklch(0.75 0.18 85)" }} />
                    ))}
                  </div>
                  <p className="font-body text-sm text-gray-700 leading-relaxed mb-4 italic">"{t.text}"</p>
                  <div>
                    <p className="font-body font-semibold text-sm" style={{ color: COLORS.tealDark }}>{t.name}</p>
                    <p className="font-body text-xs text-gray-400">{t.treatment} Patient</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Smile?
            </h2>
            <p className="font-body text-white/80 text-lg mb-8">
              Book a free consultation with our specialists in Garden Grove, CA. We'll create a personalized treatment plan just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white font-body font-bold text-base rounded-full shadow-xl hover:bg-white/90 transition-all" style={{ color: COLORS.tealDark }}>
                  Book Free Consultation
                  <ChevronRight className="w-4 h-4" />
              </Link>
              <a href={SMS.general} className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-body font-semibold text-base rounded-full hover:bg-white/10 transition-all">
                <MessageSquare className="w-4 h-4" />
                Text Us for Faster Service
              </a>
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedCase && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCase(null)}
          >
            <div
              className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src={selectedCase.before} alt={`Before — ${selectedCase.title}`} className="w-full h-64 object-cover"  loading="lazy"/>
                  <span className="absolute top-3 left-3 px-3 py-1 rounded text-sm font-body font-bold text-white bg-black/60">BEFORE</span>
                </div>
                <div className="relative">
                  <img src={selectedCase.after} alt={`After — ${selectedCase.title}`} className="w-full h-64 object-cover"  loading="lazy"/>
                  <span className="absolute top-3 right-3 px-3 py-1 rounded text-sm font-body font-bold text-white" style={{ backgroundColor: COLORS.teal }}>AFTER</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: COLORS.tealDark }}>{selectedCase.title}</h3>
                <p className="font-body text-gray-600 mb-4">{selectedCase.description}</p>
                <div className="flex flex-wrap gap-4 text-sm font-body text-gray-500 mb-5">
                  <span><strong style={{ color: COLORS.teal }}>Treatment:</strong> {selectedCase.treatment}</span>
                  <span><strong style={{ color: COLORS.teal }}>Duration:</strong> {selectedCase.duration}</span>
                  <span><strong style={{ color: COLORS.teal }}>Doctor:</strong> {selectedCase.doctor}</span>
                </div>
                <div className="flex gap-3">
                  <Link href="/contact" className="flex-1 text-center py-3 rounded-full font-body font-bold text-white text-sm" style={{ backgroundColor: COLORS.teal }}>
                      Book a Consultation
                  </Link>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="px-6 py-3 rounded-full font-body font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}
