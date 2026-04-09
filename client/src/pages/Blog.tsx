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

const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/PATTERN-02_5ffa36bf.jpg";
const SMILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/smile-transformation-Wf9zjaGJrezRhcJ4Rfspix.webp";
const INVISALIGN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/invisalign-lifestyle-a4Ab7WZcR277XNEE76tgPU.webp";
const FAMILY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/family-dental-TeGJLyZzfqwuRW5gkKNBzm.webp";
const TECH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dental-tech-clean-TzX7DySrWpcEhPpd2VXxTG.webp";

const categories = ["All", "Emergency Care", "Orthodontics", "Preventive Care", "Cosmetic Dentistry", "Oral Health Tips", "Pediatric Dentistry", "Patient Stories"];

// Removed duplicate posts array — now using getVisiblePosts() from blogData.ts
const UNUSED_posts = [
  {
    slug: "emergency-dentist-garden-grove",
    title: "5 Signs You Need to See an Emergency Dentist Right Away",
    excerpt: "Dental emergencies can strike at any moment — whether it is a sudden, sharp toothache in the middle of the night or a knocked-out tooth during a weekend soccer game. Knowing when to seek immediate care can save your tooth.",
    category: "Emergency Care",
    date: "April 3, 2026",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2025/03/pain.jpg",
    featured: true,
    tags: ["Emergency Dentist", "Garden Grove", "Dental Emergency"],
    link: "https://upliftdental.com/emergency-dentist-garden-grove/",
  },
  {
    slug: "tips-for-optimal-braces-care",
    title: "Tips for Optimal Braces Care",
    excerpt: "Caring for your braces is a key part of achieving a healthy, straight smile. Proper at-home care, alongside orthodontic visits, is essential for effective treatment and preventing potential problems.",
    category: "Orthodontics",
    date: "June 1, 2025",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2025/06/Uplift-Dental.jpg",
    featured: false,
    tags: ["Braces", "Orthodontics", "Oral Hygiene"],
    link: "https://upliftdental.com/tips-for-optimal-braces-care/",
  },
  {
    slug: "effective-tmj-treatment-options",
    title: "Effective TMJ Treatment Options",
    excerpt: "Temporomandibular joint (TMJ) disorders can cause significant discomfort, from jaw pain and headaches to difficulty chewing and even earaches. Learn about your treatment options.",
    category: "Oral Health Tips",
    date: "May 1, 2025",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2025/05/Uplift-Dental.jpg",
    featured: false,
    tags: ["TMJ", "Jaw Pain", "Treatment"],
    link: "https://upliftdental.com/effective-tmj-treatment-options/",
  },
  {
    slug: "oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups",
    title: "Oral Health and Overall Wellness: Why Seniors Need Regular Dental Checkups",
    excerpt: "Oral health plays a vital role in the overall wellness of seniors, influencing not just their dental condition but also their general health. Poor oral health is linked to heart disease, diabetes, and more.",
    category: "Preventive Care",
    date: "April 1, 2025",
    readTime: "6 min read",
    img: "https://upliftdental.com/wp-content/uploads/2025/04/Uplift-Dental-2.jpg",
    featured: false,
    tags: ["Senior Dental Care", "Preventive Care", "Oral Health"],
    link: "https://upliftdental.com/oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups/",
  },
  {
    slug: "get-started-the-benefits-of-early-intervention-with-invisalign",
    title: "Get Started: The Benefits of Early Intervention with Invisalign",
    excerpt: "When it comes to your child's smile, timing is everything. Early intervention with Invisalign can set the stage for a lifetime of healthy, confident smiles.",
    category: "Orthodontics",
    date: "March 1, 2025",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2025/03/Uplift-Dental-5.png",
    featured: false,
    tags: ["Invisalign", "Early Orthodontics", "Kids"],
    link: "https://upliftdental.com/get-started-the-benefits-of-early-intervention-with-invisalign/",
  },
  {
    slug: "understanding-gum-disease-stages",
    title: "Understanding Gum Disease Stages",
    excerpt: "Gum disease can sneak up on you! It starts subtly, but if left unchecked, it can cause serious damage to your teeth and gums. Regular professional dental care is essential.",
    category: "Preventive Care",
    date: "February 1, 2025",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2025/02/Uplift-Dental-1.png",
    featured: false,
    tags: ["Gum Disease", "Periodontal", "Prevention"],
    link: "https://upliftdental.com/understanding-gum-disease-stages/",
  },
  {
    slug: "fluoride-vs-hydroxyapatite-which-is-best-for-your-childs-dental-health",
    title: "Fluoride vs. Hydroxyapatite: Which is Best for Your Child's Dental Health?",
    excerpt: "By Dr. Ragy Stefan, Uplift Dental. We all want the best for our kids as parents, and regular visits to our pediatric dentistry team help ensure great oral health.",
    category: "Pediatric Dentistry",
    date: "January 15, 2025",
    readTime: "6 min read",
    img: "https://upliftdental.com/wp-content/uploads/2025/02/Uplift-Dental-2.png",
    featured: false,
    tags: ["Pediatric Dentistry", "Fluoride", "Kids Oral Health"],
    link: "https://upliftdental.com/fluoride-vs-hydroxyapatite-which-is-best-for-your-childs-dental-health/",
  },
  {
    slug: "3-tricks-to-make-flossing-with-braces-easier",
    title: "3 Tricks To Make Flossing With Braces Easier",
    excerpt: "Flossing with braces can be challenging, but proper oral hygiene is essential for a healthy smile during orthodontic treatment. These three tricks will make it much easier.",
    category: "Orthodontics",
    date: "January 1, 2025",
    readTime: "4 min read",
    img: "https://upliftdental.com/wp-content/uploads/2025/01/Uplift-Dental-2.png",
    featured: false,
    tags: ["Braces", "Flossing", "Oral Hygiene"],
    link: "https://upliftdental.com/3-tricks-to-make-flossing-with-braces-easier/",
  },
  {
    slug: "what-happens-during-your-professional-dental-cleaning",
    title: "What Happens During Your Professional Dental Cleaning",
    excerpt: "Regular dental cleanings are key to maintaining a healthy smile and preventing costly problems. Here's exactly what to expect during your visit at Uplift Dental.",
    category: "Preventive Care",
    date: "December 1, 2024",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2024/11/Uplift-Dental.png",
    featured: false,
    tags: ["Dental Cleaning", "Preventive Care", "Garden Grove"],
    link: "https://upliftdental.com/what-happens-during-your-professional-dental-cleaning/",
  },
  {
    slug: "oral-health-tips-for-children",
    title: "Oral Health Tips for Children",
    excerpt: "Ensuring children maintain good oral health is a cornerstone of their overall well-being, and choosing the right pediatric dentistry in Garden Grove makes all the difference.",
    category: "Pediatric Dentistry",
    date: "November 1, 2024",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2025/01/Uplift-Dental.png",
    featured: false,
    tags: ["Pediatric Dentistry", "Kids", "Oral Health"],
    link: "https://upliftdental.com/oral-health-tips-for-children/",
  },
  {
    slug: "diet-and-oral-health",
    title: "Diet and Oral Health",
    excerpt: "A healthy diet is vital in maintaining strong teeth and gums, but many overlook the connection between what they eat and their oral health. Sugary snacks and acidic drinks are the biggest culprits.",
    category: "Oral Health Tips",
    date: "October 1, 2024",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2024/10/Uplift-Dental-1.png",
    featured: false,
    tags: ["Diet", "Oral Health", "Nutrition"],
    link: "https://upliftdental.com/diet-and-oral-health/",
  },
  {
    slug: "a-deep-dive-into-dental-hygiene-floss-vs-water-pick",
    title: "A Deep Dive into Dental Hygiene: Floss vs Water Pick",
    excerpt: "Dental hygiene is of paramount importance, not just for aesthetic reasons but also for overall health. Should you use traditional floss or a water pick? We break it down.",
    category: "Oral Health Tips",
    date: "April 27, 2024",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2024/04/GettyImages-1210180620-1920w.webp",
    featured: false,
    tags: ["Flossing", "Water Pick", "Dental Hygiene"],
    link: "https://upliftdental.com/a-deep-dive-into-dental-hygiene-floss-vs-water-pick/",
  },
  {
    slug: "is-invisalign-the-same-as-braces",
    title: "Is Invisalign the same as Braces?",
    excerpt: "How should you straighten your teeth — with Invisalign or braces? As a Platinum Invisalign® Provider, we help patients understand the key differences every day.",
    category: "Orthodontics",
    date: "April 24, 2024",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2024/04/GettyImages-1405959406-1920w.webp",
    featured: false,
    tags: ["Invisalign", "Braces", "Orthodontics"],
    link: "https://upliftdental.com/is-invisalign-the-same-as-braces/",
  },
  {
    slug: "its-too-early-for-braces-or-is-it",
    title: "When Should I get Braces or Invisalign?",
    excerpt: "When Is the Best Age to Start Orthodontic Treatment? Orthodontic treatment with braces or Invisalign can help to improve your smile and your overall oral health.",
    category: "Orthodontics",
    date: "April 16, 2024",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2024/04/GettyImages-1540306772-1920w.webp",
    featured: false,
    tags: ["Braces", "Invisalign", "Orthodontics", "Kids"],
    link: "https://upliftdental.com/its-too-early-for-braces-or-is-it/",
  },
  {
    slug: "how-to-keep-your-teeth-healthy-and-white",
    title: "How To Keep My Teeth White and Healthy?",
    excerpt: "Did you know that the attractiveness of your smile can have a direct influence on how people perceive you? Learn the best evidence-based strategies for a whiter, healthier smile.",
    category: "Cosmetic Dentistry",
    date: "April 12, 2024",
    readTime: "5 min read",
    img: "https://upliftdental.com/wp-content/uploads/2024/04/GettyImages-580503073-1920w.webp",
    featured: false,
    tags: ["Teeth Whitening", "Oral Health", "Cosmetic Dentistry"],
    link: "https://upliftdental.com/how-to-keep-your-teeth-healthy-and-white/",
  },
  {
    slug: "i-want-whiter-teeth",
    title: "I Want Whiter Teeth!",
    excerpt: "Safe Methods of Teeth Whitening. Having a bright, white smile is something that many people strive for. Here are the safest and most effective whitening options available.",
    category: "Cosmetic Dentistry",
    date: "March 29, 2024",
    readTime: "4 min read",
    img: "https://upliftdental.com/wp-content/uploads/2024/04/GettyImages-471031774-1920w.webp",
    featured: false,
    tags: ["Teeth Whitening", "Cosmetic Dentistry"],
    link: "https://upliftdental.com/i-want-whiter-teeth/",
  },
  {
    slug: "what-are-the-differences-between-dental-insurance-plans",
    title: "What are the differences between dental insurance plans?",
    excerpt: "Dental Insurance in California 2024: A Comprehensive Guide for Patients. Understanding your coverage options can save you thousands of dollars on dental care.",
    category: "Preventive Care",
    date: "March 19, 2024",
    readTime: "7 min read",
    img: "https://upliftdental.com/wp-content/uploads/2024/04/GettyImages-1210180620-1920w.webp",
    featured: false,
    tags: ["Dental Insurance", "California", "Coverage"],
    link: "https://upliftdental.com/what-are-the-differences-between-dental-insurance-plans/",
  },
  {
    slug: "are-clear-aligners-better-than-braces",
    title: "Are clear aligners better than braces?",
    excerpt: "Clear Aligners vs. Braces: Understanding Your Orthodontic Options. Consider the key differences in comfort, appearance, effectiveness, and cost.",
    category: "Orthodontics",
    date: "March 1, 2024",
    readTime: "6 min read",
    img: "https://upliftdental.com/wp-content/uploads/2024/04/GettyImages-1405959406-1920w.webp",
    featured: false,
    tags: ["Clear Aligners", "Braces", "Invisalign"],
    link: "https://upliftdental.com/are-clear-aligners-better-than-braces/",
  },
  {
    slug: "the-compassionate-provider",
    title: "The Compassionate Provider",
    excerpt: "The Importance of Oral Healthcare and Compassion in Healthcare. Your oral health is an important part of your overall health — and so is feeling heard and cared for by your dental team.",
    category: "Patient Stories",
    date: "February 14, 2024",
    readTime: "4 min read",
    img: "https://upliftdental.com/wp-content/uploads/2024/04/GettyImages-580503073-1920w.webp",
    featured: false,
    tags: ["Patient Care", "Compassion", "Uplift Dental"],
    link: "https://upliftdental.com/the-compassionate-provider/",
  },
];

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
