/* =============================================================
   UPLIFT DENTAL — Blog Page
   SEO-rich dental health articles for local search dominance
   ============================================================= */
import { useState } from "react";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { getVisiblePosts } from "@/lib/blogData";
import { PRACTICE, COLORS } from "@/lib/constants";

const PATTERN_DARK = "/assets/uplift/PATTERN-02_5ffa36bf.webp";
const SMILE_IMG = "/assets/uplift/smile-transformation-Wf9zjaGJrezRhcJ4Rfspix.webp";
const INVISALIGN_IMG = "/assets/uplift/invisalign-lifestyle-a4Ab7WZcR277XNEE76tgPU.webp";
const FAMILY_IMG = "/assets/uplift/family-dental-TeGJLyZzfqwuRW5gkKNBzm.webp";
const TECH_IMG = "/assets/uplift/dental-tech-clean-TzX7DySrWpcEhPpd2VXxTG.webp";

const categories = ["All", "Emergency Care", "Orthodontics", "Preventive Care", "Cosmetic Dentistry", "Oral Health Tips", "Pediatric Dentistry", "Patient Stories"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const posts = getVisiblePosts();

  const filtered = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeCategory !== "All" || searchQuery);

  return (
    <>
      <PageSEO
        title="Dental Health Blog | Uplift Dental & Orthodontics Garden Grove"
        description={`Expert dental health tips, Invisalign guides, gum disease education, and oral care advice from the team at Uplift Dental & Orthodontics in ${PRACTICE.address.city}, ${PRACTICE.address.state} ${PRACTICE.address.zip}.`}
        canonical="https://upliftdental.com/blog"
      />
      <div className="min-h-screen flex flex-col bg-white">
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com/" },
        { name: "Blog", url: "https://upliftdental.com/blog" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "500px auto" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.73 0.07 200)" }}>Dental Health Resources</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-5">The Uplift Dental Blog</h1>
          <p className="font-body text-white/75 text-xl max-w-xl mx-auto mb-8">
            Expert dental health tips, treatment guides, and practice news from the Uplift Dental team in Garden Grove, CA.
          </p>
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full font-body text-sm focus:outline-none focus:ring-2 bg-white"
              style={{ "--tw-ring-color": COLORS.teal } as React.CSSProperties}
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-white border-b" style={{ borderColor: "oklch(0.90 0.02 192)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeCategory === cat ? COLORS.teal : "transparent",
                  color: activeCategory === cat ? "white" : "oklch(0.45 0.04 192)",
                  border: `1px solid ${activeCategory === cat ? COLORS.teal : "oklch(0.90 0.02 192)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured post */}
          {featured && activeCategory === "All" && !searchQuery && (
            <div className="mb-16">
              <p className="font-body text-xs font-bold uppercase tracking-widest mb-4" style={{ color: COLORS.teal }}>Featured Article</p>
              <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl border" style={{ borderColor: "oklch(0.90 0.02 192)" }}>
                <div className="aspect-[4/3] lg:aspect-auto">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover"  loading="lazy" width="800" height="450"/>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center" style={{ backgroundColor: COLORS.tealPale }}>
                  <span className="inline-block px-3 py-1 rounded-full font-body text-xs font-semibold mb-4" style={{ backgroundColor: `${COLORS.teal}15`, color: COLORS.teal }}>
                    {featured.category}
                  </span>
                  <h2 className="font-display text-3xl font-bold mb-4" style={{ color: COLORS.tealDark }}>{featured.title}</h2>
                  <p className="font-body text-gray-600 leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-400 font-body">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="flex items-center gap-2 font-body font-semibold text-sm self-start transition-all hover:gap-3"
                    style={{ color: COLORS.teal }}
                  >
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Articles grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-body text-gray-500 text-lg">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(activeCategory === "All" && !searchQuery ? rest : filtered).map((post) => (
                <article key={post.slug} className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ borderColor: "oklch(0.90 0.02 192)" }}>
                  {/* Links to full article on upliftdental.com */}
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"  loading="lazy" width="400" height="300"/>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-full font-body text-xs font-semibold" style={{ backgroundColor: `${COLORS.teal}15`, color: COLORS.teal }}>
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3 leading-tight" style={{ color: COLORS.tealDark }}>{post.title}</h3>
                    <p className="font-body text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400 font-body">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-1 font-body text-sm font-semibold transition-all"
                        style={{ color: COLORS.teal }}
                      >
                        Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded font-body text-xs text-gray-400" style={{ backgroundColor: "oklch(0.95 0.01 192)" }}>
                          <Tag className="w-2.5 h-2.5" />{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16" style={{ backgroundColor: COLORS.tealPale }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-3" style={{ color: COLORS.tealDark }}>Stay Informed About Your Oral Health</h2>
          <p className="font-body text-gray-600 mb-6">Get monthly dental tips, practice news, and exclusive patient offers delivered to your inbox.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:ring-2 bg-white" style={{ borderColor: "oklch(0.90 0.02 192)" }} />
            <button className="px-6 py-3 rounded-xl font-body font-semibold text-white text-sm transition-all hover:shadow-md" style={{ backgroundColor: COLORS.teal }}>
              Subscribe
            </button>
          </div>
          <p className="font-body text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
