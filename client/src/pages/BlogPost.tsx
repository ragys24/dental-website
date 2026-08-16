/* =============================================================
   UPLIFT DENTAL — Individual Blog Post Page
   Design: Clean editorial layout, dark teal accents, serif headings
   SEO: Article schema, breadcrumbs, canonical, meta description
   ============================================================= */
import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { Calendar, Clock, ArrowLeft, Tag, ChevronRight, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, getVisiblePosts, type BlogPost } from "@/lib/blog";
import { PRACTICE, COLORS } from "@/lib/constants";
import { trackSchedule } from "@/lib/tracking";
import { PageSEO } from "@/components/PageSEO";
import { FAQSchema, JsonLd } from "@/components/StructuredData";

// Service links by blog category for internal linking
const CATEGORY_SERVICE_LINKS: Record<string, { title: string; href: string; emoji: string }[]> = {
  "Cosmetic Dentistry": [
    { title: "Porcelain Veneers", href: "/veneers", emoji: "✨" },
    { title: "Teeth Whitening", href: "/teeth-whitening", emoji: "⚡" },
    { title: "Dental Bonding", href: "/dental-bonding", emoji: "🦷" },
    { title: "Smile Makeover", href: "/veneers", emoji: "😁" },
  ],
  "Orthodontics": [
    { title: "Invisalign", href: "/invisalign", emoji: "😁" },
    { title: "Braces", href: "/orthodontics", emoji: "🔧" },
    { title: "Free Ortho Consult", href: "/contact", emoji: "📅" },
    { title: "Why Choose Us", href: "/why-choose-us", emoji: "🏆" },
  ],
  "Oral Health": [
    { title: "Teeth Cleaning", href: "/teeth-cleaning", emoji: "🪥" },
    { title: "Periodontics", href: "/periodontics", emoji: "💚" },
    { title: "Emergency Dentist", href: "/emergency-dentist", emoji: "🚨" },
    { title: "Dental Implants", href: "/dental-implants", emoji: "🦷" },
  ],
  "Patient Resources": [
    { title: "Insurance & Financing", href: "/insurance-financing", emoji: "💳" },
    { title: "Membership Plan", href: "/membership-plan", emoji: "⭐" },
    { title: "Patient Portal", href: "/patient-portal", emoji: "🔐" },
    { title: "Book Appointment", href: "/contact", emoji: "📅" },
  ],
  "default": [
    { title: "Invisalign", href: "/invisalign", emoji: "😁" },
    { title: "Dental Implants", href: "/dental-implants", emoji: "🦷" },
    { title: "Teeth Whitening", href: "/teeth-whitening", emoji: "⚡" },
    { title: "Emergency Dentist", href: "/emergency-dentist", emoji: "🚨" },
  ],
};

function ArticleSEO({ post }: { post: BlogPost }) {
  const canonical = `https://upliftdental.com/blog/${post.slug}`;
  const wordCount = post.content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": post.dateISO,
    "dateModified": post.dateISO,
    "image": post.image,
    "wordCount": wordCount,
    "keywords": post.tags?.join(", ") || post.category,
    "articleSection": post.category,
    "inLanguage": "en-US",
    "author": {
      "@type": "Organization",
      "name": PRACTICE.name,
      "url": PRACTICE.website,
    },
    "publisher": {
      "@type": "Organization",
      "name": PRACTICE.name,
      "logo": { "@type": "ImageObject", "url": "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/logo-primary-optimized_5fbb89d5.png" },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    "isPartOf": { "@id": "https://upliftdental.com/#website" },
  };

  return (
    <>
      <PageSEO title={`${post.title} | Uplift Dental & Orthodontics`} description={post.metaDescription} canonical={canonical} ogImage={post.image} />
      <JsonLd id="article-schema" data={articleSchema} />
      {post.faqs?.length ? <FAQSchema id="faq-schema" faqs={post.faqs} /> : null}
    </>
  );
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const post = getPostBySlug(slug);
  const allPosts = getVisiblePosts();

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post || (!post.isPublished && !post.isScheduled)) {
    return (
      <>
        <PageSEO title="Article Not Found | Uplift Dental" description="The requested Uplift Dental article is not available." canonical={`https://upliftdental.com/blog/${slug || ""}`} noindex />
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-3xl font-display font-bold text-[oklch(0.14_0.02_220)]">Post Not Found</h1>
          <p className="text-[oklch(0.45_0.02_220)] font-body">This article doesn't exist or hasn't been published yet.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 font-body font-semibold text-sm px-5 py-2.5 rounded-full text-white" style={{ background: COLORS.teal }}>
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Check if scheduled post is visible (date has passed)
  if (post.isScheduled) {
    const now = new Date();
    const postDate = new Date(post.dateISO);
    if (postDate > now) {
      return (
        <>
          <PageSEO title="Article Coming Soon | Uplift Dental" description="This Uplift Dental article is scheduled for a future publication date." canonical={`https://upliftdental.com/blog/${post.slug}`} noindex />
          <Navbar />
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
            <h1 className="text-3xl font-display font-bold text-[oklch(0.14_0.02_220)]">Coming Soon</h1>
            <p className="text-[oklch(0.45_0.02_220)] font-body">This article will be published on {post.date}.</p>
            <Link href="/blog" className="inline-flex items-center gap-2 font-body font-semibold text-sm px-5 py-2.5 rounded-full text-white" style={{ background: COLORS.teal }}>
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
          <Footer />
        </>
      );
    }
  }

  // Related posts (same category, excluding current)
  const related = allPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const fallbackRelated = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);
  const relatedPosts = related.length >= 2 ? related : fallbackRelated;

  return (
    <>
      <ArticleSEO post={post} />
      <Navbar />
      <main>

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: `linear-gradient(135deg, oklch(0.14 0.04 192) 0%, oklch(0.22 0.07 192) 100%)` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs font-body text-white/80 mb-6">
            <Link href="/" className="hover:text-white/90 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-white/90 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80 truncate max-w-[200px]">{post.title}</span>
          </nav>

          <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "oklch(0.42 0.09 192 / 0.3)", color: "oklch(0.85 0.08 192)" }}>
            {post.category}
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
            {post.title}
          </h1>
         <div className="flex flex-wrap items-center gap-4 text-sm font-body text-white/70">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
            <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" />By Dr. Ragy Stefan, DDS</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-xl"
            loading="eager"
            width="1200" height="675"
          />
        </div>
      )}

      {/* Article Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <div>
            <div
              className="prose prose-lg max-w-none font-body
                prose-headings:font-display prose-headings:font-bold prose-headings:text-[oklch(0.14_0.02_220)]
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[oklch(0.35_0.02_220)] prose-p:leading-relaxed prose-p:mb-5
                prose-a:text-[oklch(0.42_0.09_192)] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[oklch(0.14_0.02_220)] prose-strong:font-semibold
                prose-ul:text-[oklch(0.35_0.02_220)] prose-ol:text-[oklch(0.35_0.02_220)]
                prose-li:mb-1.5
                prose-blockquote:border-l-4 prose-blockquote:border-[oklch(0.42_0.09_192)] prose-blockquote:bg-[oklch(0.97_0.01_192)] prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:text-[oklch(0.35_0.02_220)]
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-[oklch(0.92_0.01_220)]">
                <p className="text-xs font-body font-semibold uppercase tracking-widest text-[oklch(0.55_0.02_220)] mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-body px-3 py-1 rounded-full bg-[oklch(0.95_0.02_192)] text-[oklch(0.42_0.09_192)] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio — E-E-A-T signal for AI SEO */}
            <div className="mt-10 pt-8 border-t border-[oklch(0.92_0.01_220)]">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-[oklch(0.97_0.005_192)]">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.42_0.09_192)] flex items-center justify-center text-white font-display font-bold text-lg shrink-0">RS</div>
                <div>
                  <p className="font-display font-bold text-sm text-[oklch(0.14_0.02_220)]">Written by Dr. Ragy Stefan, DDS</p>
                  <p className="font-body text-xs text-[oklch(0.45_0.02_220)] mt-1">Dr. Stefan is the founder of Uplift Dental & Orthodontics in Garden Grove, CA. With expertise in general and cosmetic dentistry, he leads a multi-specialty team providing comprehensive dental care.</p>
                  <p className="font-body text-xs text-[oklch(0.55_0.02_220)] mt-2">Medically reviewed &middot; Last updated: {post.date}</p>
                </div>
              </div>
            </div>
            {/* Related Services — internal linking for bounce rate */}
            {(() => {
              const serviceLinks = CATEGORY_SERVICE_LINKS[post.category] || CATEGORY_SERVICE_LINKS["default"];
              return (
                <div className="mt-8 p-6 rounded-2xl bg-[oklch(0.97_0.008_192)] border border-[oklch(0.92_0.01_192)]">
                  <h3 className="font-display font-bold text-base text-[oklch(0.14_0.02_220)] mb-4">Related Services at Uplift Dental</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceLinks.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[oklch(0.92_0.01_192)] hover:border-[oklch(0.42_0.09_192)] hover:shadow-sm transition-all group"
                      >
                        <span className="text-lg">{link.emoji}</span>
                        <span className="font-body text-xs font-semibold text-[oklch(0.14_0.02_220)] group-hover:text-[oklch(0.42_0.09_192)] transition-colors leading-snug">{link.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* CTA */}
            <div className="mt-8 rounded-2xl p-8 text-center" style={{ background: `linear-gradient(135deg, oklch(0.14 0.04 192) 0%, oklch(0.22 0.07 192) 100%)` }}>
              <h3 className="font-display font-bold text-xl text-white mb-2">Ready to Schedule Your Visit?</h3>
              <p className="font-body text-white/80 text-sm mb-5">Uplift Dental & Orthodontics — Garden Grove, CA. Free consultations available.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-semibold text-sm bg-white text-[oklch(0.22_0.07_192)] hover:bg-white/90 transition-colors">
                  <Phone className="w-4 h-4" /> Call {PRACTICE.phone.display}
                </a>
                <Link href="/contact" onClick={trackSchedule} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition-colors">
                  Book Free Consult
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {/* Back to blog */}
              <Link href="/blog" className="flex items-center gap-2 text-sm font-body font-semibold text-[oklch(0.42_0.09_192)] hover:text-[oklch(0.28_0.08_192)] transition-colors">
                <ArrowLeft className="w-4 h-4" /> All Articles
              </Link>

              {/* About the practice */}
              <div className="rounded-2xl p-5 bg-[oklch(0.97_0.01_192)]">
                <h4 className="font-display font-bold text-sm text-[oklch(0.14_0.02_220)] mb-2">Uplift Dental & Orthodontics</h4>
                <p className="font-body text-xs text-[oklch(0.45_0.02_220)] leading-relaxed mb-4">
                  Serving Garden Grove, CA and surrounding communities with comprehensive family and specialty dental care.
                </p>
                <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="block text-center text-xs font-body font-semibold px-4 py-2 rounded-full text-white transition-colors hover:opacity-90" style={{ background: COLORS.teal }}>
                  {PRACTICE.phone.display}
                </a>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h4 className="font-display font-bold text-sm text-[oklch(0.14_0.02_220)] mb-3">Related Articles</h4>
                  <div className="space-y-3">
                    {relatedPosts.map(rp => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`} className="block group">
                        <div className="flex gap-3 items-start">
                          <img src={rp.image} alt={rp.title} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" loading="lazy" decoding="async" width="56" height="56" />
                          <div>
                            <p className="font-body text-xs font-semibold text-[oklch(0.14_0.02_220)] group-hover:text-[oklch(0.42_0.09_192)] transition-colors leading-snug line-clamp-2">{rp.title}</p>
                            <p className="font-body text-xs text-[oklch(0.55_0.02_220)] mt-1">{rp.date}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
      </main>

      <Footer />
    </>
  );
}
