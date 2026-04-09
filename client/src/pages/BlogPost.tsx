/* =============================================================
   UPLIFT DENTAL — Individual Blog Post Page
   Design: Clean editorial layout, dark teal accents, serif headings
   SEO: Article schema, breadcrumbs, canonical, meta description
   ============================================================= */
import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { Calendar, Clock, ArrowLeft, Tag, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, getVisiblePosts, type BlogPost } from "@/lib/blogData";
import { PRACTICE, COLORS } from "@/lib/constants";

function ArticleSEO({ post }: { post: BlogPost }) {
  useEffect(() => {
    document.title = `${post.title} | Uplift Dental & Orthodontics`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", post.metaDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", `https://upliftdental.com/blog/${post.slug}`);

    // Article schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.metaDescription,
      "datePublished": post.dateISO,
      "dateModified": post.dateISO,
      "image": post.image,
      "author": { "@type": "Organization", "name": "Uplift Dental & Orthodontics" },
      "publisher": {
        "@type": "Organization",
        "name": "Uplift Dental & Orthodontics",
        "logo": { "@type": "ImageObject", "url": "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/Logo-01_0c8b669d.png" }
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": `https://upliftdental.com/blog/${post.slug}` }
    };
    let schemaTag = document.getElementById("article-schema");
    if (!schemaTag) { schemaTag = document.createElement("script"); schemaTag.id = "article-schema"; schemaTag.setAttribute("type", "application/ld+json"); document.head.appendChild(schemaTag); }
    schemaTag.textContent = JSON.stringify(schema);

    return () => {
      document.title = "Uplift Dental & Orthodontics | Top-Rated Dentist in {PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}";
      schemaTag?.remove();
    };
  }, [post]);
  return null;
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

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: `linear-gradient(135deg, oklch(0.14 0.04 192) 0%, oklch(0.22 0.07 192) 100%)` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs font-body text-white/60 mb-6">
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
            <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" />Uplift Dental & Orthodontics</span>
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
           width="400" height="300"/>
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

            {/* CTA */}
            <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: `linear-gradient(135deg, oklch(0.14 0.04 192) 0%, oklch(0.22 0.07 192) 100%)` }}>
              <h3 className="font-display font-bold text-xl text-white mb-2">Ready to Schedule Your Visit?</h3>
              <p className="font-body text-white/80 text-sm mb-5">Uplift Dental & Orthodontics — Garden Grove, CA. Free consultations available.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="tel:7148983308" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-semibold text-sm bg-white text-[oklch(0.22_0.07_192)] hover:bg-white/90 transition-colors">
                  Call {PRACTICE.phone.display}
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition-colors">
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
                <a href="tel:7148983308" className="block text-center text-xs font-body font-semibold px-4 py-2 rounded-full text-white transition-colors hover:opacity-90" style={{ background: COLORS.teal }}>
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
                          <img src={rp.image} alt={rp.title} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
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

      <Footer />
    </>
  );
}
