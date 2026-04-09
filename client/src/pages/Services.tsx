/* =============================================================
   UPLIFT DENTAL — Services Page
   SEO-rich service descriptions for all dental specialties
   ============================================================= */
import { Link } from "wouter";
import { CheckCircle, Phone, Calendar, ArrowRight, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PRACTICE, COLORS } from "@/lib/constants";

const SMILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/smile-transformation-Wf9zjaGJrezRhcJ4Rfspix.webp";
const INVISALIGN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/invisalign-lifestyle-a4Ab7WZcR277XNEE76tgPU.webp";
const FAMILY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/general-dentistry-clean-LezMDGWkmg46HMXLmdPsth.webp";
const TECH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dental-tech-clean-TzX7DySrWpcEhPpd2VXxTG.webp";
const WHITENING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/teeth-whitening-service-GFdaDu8hrcaxHAdkpU4VSE.webp";
const ORTHO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/orthodontics-braces-U3K8rtBtyKN8vNF3Qv3diF.webp";
const IMPLANTS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/dental-implants-xray-o29b5GJ6kDtFez7JQjzyLT.webp";
const ORAL_SURGERY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/oral-surgery-consult-Vi4KLsbGvghRt73SdrUprh.webp";
const PERIO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/periodontics-gums-8yxDptJ86QFDsaVgaCxvDM.webp";
const ENDO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/endodontics-microscope-hx7iwZLLNyvbyySf2aHhfk.webp";

const serviceCategories = [
  {
    id: "general",
    category: "General Dentistry",
    headline: "Preventive Care for a Lifetime of Healthy Smiles",
    desc: "Our general dentistry services form the foundation of your oral health. From routine cleanings and digital X-rays to fillings and gum disease treatment, we provide comprehensive care for patients of all ages in Garden Grove and surrounding communities.",
    img: FAMILY_IMG,
    services: [
      { name: "Dental Cleanings & Exams", desc: "Professional cleanings every 6 months to prevent decay, gum disease, and detect problems early." },
      { name: "Digital X-Rays", desc: "90% less radiation than traditional X-rays. Instant, high-resolution images for accurate diagnosis." },
      { name: "Dental Fillings", desc: "Tooth-colored composite fillings that blend seamlessly with your natural teeth." },
      { name: "Gum Disease Treatment", desc: "Deep cleaning (scaling and root planing) to treat periodontal disease and restore gum health." },
      { name: "Dental Crowns", desc: "Custom porcelain crowns to restore damaged, cracked, or severely decayed teeth." },
      { name: "Dental Bridges", desc: "Fixed prosthetics to replace one or more missing teeth and restore your bite." },
      { name: "Full & Partial Dentures", desc: "Custom-fitted removable prosthetics for comfortable, natural-looking tooth replacement." },
      { name: "TMJ Treatment", desc: "Relief for jaw pain, clicking, and headaches caused by temporomandibular joint disorders." },
    ],
  },
  {
    id: "cosmetic",
    category: "Cosmetic Dentistry",
    headline: "Transform Your Smile, Transform Your Confidence",
    desc: "Your smile is your first impression. Our cosmetic dental services are designed to enhance the appearance of your teeth while maintaining optimal oral health. Whether you want a subtle refresh or a complete smile makeover, we'll create a customized plan just for you.",
    img: SMILE_IMG,
    services: [
      { name: "Porcelain Veneers", desc: "Ultra-thin porcelain shells bonded to the front of teeth to correct shape, color, and alignment." },
      { name: "Dental Bonding", desc: "Tooth-colored resin applied to repair chips, cracks, gaps, and discoloration — often in one visit." },
      { name: "Teeth Whitening", desc: "Professional-grade whitening that delivers dramatically whiter teeth safely and effectively." },
      { name: "Smile Makeovers", desc: "Comprehensive cosmetic treatment plans combining multiple procedures for a complete transformation." },
      { name: "Gum Contouring", desc: "Reshape your gum line to create a more balanced, aesthetically pleasing smile." },
    ],
  },
  {
    id: "invisalign",
    category: "Invisalign® Clear Aligners",
    headline: "Platinum Invisalign® Provider in Garden Grove",
    desc: "As a Platinum Invisalign® Provider — one of the highest designations available — Uplift Dental has the expertise and experience to deliver exceptional Invisalign® results. Using the iTero intraoral scanner, we create a precise 3D digital model of your teeth for a perfect-fitting aligner series.",
    img: INVISALIGN_IMG,
    services: [
      { name: "Invisalign® Full", desc: "Complete treatment for complex cases — overbites, underbites, crossbites, crowding, and spacing." },
      { name: "Invisalign® Lite", desc: "Shorter treatment for mild to moderate alignment issues. Typically 7–14 aligners." },
      { name: "Invisalign® Teen", desc: "Designed specifically for teenagers with compliance indicators and replacement aligners." },
      { name: "iTero® Digital Scanning", desc: "No messy impressions. Our 3D scanner creates a precise digital model for your aligner series." },
      { name: "Invisalign® Retainers", desc: "Custom retainers to maintain your results after Invisalign® treatment is complete." },
    ],
  },
  {
    id: "orthodontics",
    category: "Orthodontics & Braces",
    headline: "Straighten Your Smile at Any Age",
    desc: "Dr. Clark Schneekluth has been creating beautiful, functional smiles in Garden Grove, Seal Beach, and surrounding areas since 1983. With over 40 years of experience, he offers both traditional braces and modern clear aligner options for children, teens, and adults.",
    img: ORTHO_IMG,
    services: [
      { name: "Traditional Metal Braces", desc: "The most reliable and cost-effective orthodontic treatment for complex cases." },
      { name: "Clear Ceramic Braces", desc: "Tooth-colored brackets that are less noticeable than traditional metal braces." },
      { name: "Orthodontic Retainers", desc: "Custom retainers to maintain your beautiful results after braces or Invisalign® treatment." },
      { name: "Early Orthodontic Treatment", desc: "Phase 1 treatment for children ages 7–10 to guide jaw development and prevent future problems." },
      { name: "Adult Orthodontics", desc: "It's never too late for a straighter smile. Discreet options available for adult patients." },
    ],
  },
  {
    id: "implants",
    category: "Dental Implants",
    headline: "Permanent Tooth Replacement That Looks and Feels Natural",
    desc: "Dental implants are the gold standard for replacing missing teeth. Using 3D cone beam CT imaging for precise placement planning, our team provides implant solutions that look, feel, and function like your natural teeth — with results that can last a lifetime.",
    img: IMPLANTS_IMG,
    services: [
      { name: "Single Tooth Implants", desc: "Replace one missing tooth with a titanium implant and custom porcelain crown." },
      { name: "Implant-Supported Bridges", desc: "Replace multiple missing teeth without affecting adjacent healthy teeth." },
      { name: "All-on-4® Implants", desc: "Full-arch restoration using just four strategically placed implants — same-day teeth." },
      { name: "Bone Grafting", desc: "Build up bone volume to support implant placement in areas with insufficient bone." },
      { name: "Sinus Lift", desc: "Augment the upper jaw bone to allow implant placement in the posterior upper arch." },
    ],
  },
  {
    id: "oral-surgery",
    category: "Oral Surgery",
    headline: "Expert Surgical Care by Dr. Joseph Youssef",
    desc: "Dr. Joseph Youssef, our board-certified oral surgeon, provides a full range of surgical dental procedures with precision and compassion. From routine extractions to complex bone grafting, you'll receive expert care in a comfortable, welcoming environment.",
    img: ORAL_SURGERY_IMG,
    services: [
      { name: "Tooth Extractions", desc: "Simple and surgical extractions performed with minimal discomfort and fast recovery." },
      { name: "Wisdom Teeth Removal", desc: "Expert removal of impacted or problematic wisdom teeth under local or IV sedation." },
      { name: "Bone Grafting", desc: "Restore bone volume lost to tooth extraction, gum disease, or trauma." },
      { name: "Frenectomy", desc: "Removal of the frenum tissue to improve speech, feeding, or orthodontic outcomes." },
      { name: "Biopsy & Pathology", desc: "Evaluation and biopsy of suspicious oral lesions for early detection of oral cancer." },
    ],
  },
  {
    id: "periodontics",
    category: "Periodontics",
    headline: "Expert Gum Disease Treatment by Dr. Erene Saad, DMD MS",
    desc: "Healthy gums are the foundation of a healthy smile. Dr. Erene Saad, our board-trained Periodontist with a Master of Science in Periodontology, provides comprehensive gum disease diagnosis, treatment, and prevention — from non-surgical therapy to advanced laser treatment and surgical procedures. All in-house, no referrals needed.",
    img: PERIO_IMG,
    services: [
      { name: "Comprehensive Periodontal Evaluation", desc: "Thorough assessment of gum health, bone levels, and risk factors for periodontal disease." },
      { name: "Scaling & Root Planing", desc: "Deep cleaning below the gum line to remove tartar and bacteria from tooth roots — the cornerstone of non-surgical gum disease treatment." },
      { name: "LANAP Laser Therapy", desc: "Minimally invasive laser treatment for gum disease — less discomfort, faster healing, and no scalpel or sutures required." },
      { name: "Gum Grafts (Soft Tissue Grafts)", desc: "Restore receding gums to protect tooth roots, reduce sensitivity, and improve the appearance of your smile." },
      { name: "Osseous Surgery", desc: "Surgical reshaping of the bone around teeth to eliminate deep pockets and halt the progression of advanced gum disease." },
      { name: "Crown Lengthening", desc: "Expose more of the tooth structure for restorative procedures or to improve a 'gummy' smile aesthetically." },
      { name: "Periodontal Maintenance", desc: "Ongoing supportive therapy every 3–4 months to maintain gum health and prevent disease recurrence after active treatment." },
      { name: "Dental Implants (Periodontal)", desc: "Dr. Saad places dental implants with a focus on long-term gum and bone health for lasting, stable results." },
    ],
  },
  {
    id: "endodontics",
    category: "Endodontics",
    headline: "Expert Root Canal Therapy by Dr. Daniel Ghobrial, DDS",
    desc: "Root canals have an undeserved reputation. With modern techniques, microscopic precision, and advanced pain control, Dr. Daniel Ghobrial makes endodontic treatment comfortable and predictable. A UCSF-trained endodontist, Dr. Ghobrial specializes in saving natural teeth — even in the most complex cases — so you avoid extraction and preserve your smile.",
    img: ENDO_IMG,
    services: [
      { name: "Root Canal Therapy", desc: "Precise removal of infected or damaged pulp tissue to relieve pain, eliminate infection, and save your natural tooth." },
      { name: "Microscopic Endodontics", desc: "Using high-powered operating microscopes for unmatched visualization — critical for locating calcified canals, cracks, and complex anatomy." },
      { name: "Surgical Endodontics (Apicoectomy)", desc: "Minimally invasive surgical procedure to remove infected tissue at the root tip when conventional root canal therapy is insufficient." },
      { name: "Complex Retreatment", desc: "Re-treatment of previously root-canaled teeth that have failed or become re-infected — often avoiding extraction entirely." },
      { name: "Trauma Management", desc: "Specialized care for teeth injured by trauma — including luxation injuries, avulsions, and root fractures." },
      { name: "Regenerative Endodontics", desc: "Biologically-based procedures to restore the vitality of immature teeth with incomplete root development." },
      { name: "Advanced Pain Control", desc: "Targeted anesthetic techniques including supplemental injections to ensure complete comfort even for anxious or difficult-to-numb patients." },
      { name: "Digital Imaging & CBCT", desc: "3D cone beam imaging for precise diagnosis of complex root anatomy, fractures, and periapical pathology." },
    ],
  },
  {
    id: "emergency",
    category: "Emergency Dentistry",
    headline: "Same-Day Emergency Dental Care in Garden Grove",
    desc: "Dental emergencies don't wait for convenient times. Uplift Dental offers same-day emergency appointments for patients in Garden Grove and surrounding areas. Call {PRACTICE.phone.display} immediately for severe toothaches, knocked-out teeth, broken crowns, or any urgent dental need.",
    img: FAMILY_IMG,
    services: [
      { name: "Severe Toothache", desc: "Immediate diagnosis and relief for acute dental pain — don't suffer in silence." },
      { name: "Knocked-Out Tooth", desc: "Time is critical. Call immediately and follow our emergency instructions for best outcomes." },
      { name: "Broken or Cracked Tooth", desc: "Emergency repair for fractured teeth to prevent infection and restore function." },
      { name: "Lost Crown or Filling", desc: "Same-day replacement or temporary restoration to protect your tooth." },
      { name: "Dental Abscess", desc: "Urgent treatment for tooth or gum infections that can become life-threatening if untreated." },
    ],
  },
  {
    id: "whitening",
    category: "Teeth Whitening",
    headline: "Professional Whitening for a Brighter Smile",
    desc: "Over-the-counter whitening products can't match the results of professional dental whitening. Our in-office and take-home whitening systems use prescription-strength formulas to safely and effectively whiten your teeth by multiple shades in just one visit.",
    img: WHITENING_IMG,
    services: [
      { name: "In-Office Whitening", desc: "Dramatic results in just one 60-90 minute appointment. Perfect for special occasions." },
      { name: "Take-Home Whitening Kits", desc: "Custom-fitted trays with professional-grade gel for gradual whitening at home." },
      { name: "Combination Whitening", desc: "In-office treatment followed by take-home maintenance for maximum and lasting results." },
    ],
  },
];

export default function Services() {
  return (
    <>
          <PageSEO
        title="Dental Services in Garden Grove, CA | Uplift Dental & Orthodontics"
        description={`Comprehensive dental services in ${PRACTICE.address.city}, ${PRACTICE.address.state} ${PRACTICE.address.zip} — general dentistry, Invisalign, dental implants, orthodontics, oral surgery, periodontics, cosmetic dentistry & emergency care. Denti-Cal accepted. Call ${PRACTICE.phone.display}.`}
        canonical="https://upliftdental.com/services"
      />
      <div className="min-h-screen flex flex-col bg-white">
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com/" },
        { name: "Services", url: "https://upliftdental.com/services" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/PATTERN-02_5ffa36bf.jpg)`, backgroundSize: "500px auto" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.73 0.07 200)" }}>Garden Grove, CA</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-5">Our Dental Services</h1>
          <p className="font-body text-white/75 text-xl max-w-2xl mx-auto mb-8">
            Multi-specialty dental care under one roof — from preventive cleanings to full-mouth rehabilitation. Accepting Denti-Cal, PPO, and military insurance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-bold text-white border-2 border-white hover:bg-white transition-all"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = COLORS.tealDark; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}
              >
                <Calendar className="w-5 h-5" />
                Book Free Consultation
              </button>
            </Link>
            <a href={PRACTICE.phone.tel}>
              <button className="flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-semibold text-white/80 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                {PRACTICE.phone.display}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <div className="sticky top-[80px] z-40 bg-white border-b shadow-sm" style={{ borderColor: "oklch(0.90 0.02 192)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {serviceCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium transition-colors whitespace-nowrap"
                style={{ color: "oklch(0.45 0.04 192)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = COLORS.tealPale; (e.currentTarget as HTMLElement).style.color = COLORS.teal; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ""; (e.currentTarget as HTMLElement).style.color = "oklch(0.45 0.04 192)"; }}
              >
                {cat.category}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Service sections */}
      {serviceCategories.map((cat, idx) => (
        <section key={cat.id} id={cat.id} className="py-20" style={{ backgroundColor: idx % 2 === 0 ? "white" : COLORS.tealPale }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
              <div className={idx % 2 !== 0 ? "lg:order-2" : ""}>
                <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>{cat.category}</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-5" style={{ color: COLORS.tealDark }}>{cat.headline}</h2>
                <p className="font-body text-gray-600 leading-relaxed mb-8 text-lg">{cat.desc}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {cat.services.map((s) => (
                    <div key={s.name} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: COLORS.teal }} />
                      <div>
                        <p className="font-body font-semibold text-sm" style={{ color: COLORS.tealDark }}>{s.name}</p>
                        <p className="font-body text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/contact">
                  <button className="flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-semibold text-white transition-all hover:shadow-lg" style={{ backgroundColor: COLORS.teal }}>
                    Book {cat.category} Appointment <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
              <div className={`rounded-3xl overflow-hidden shadow-xl aspect-[4/3] ${idx % 2 !== 0 ? "lg:order-1" : ""}`}>
                <img src={cat.img} alt={`${cat.category} at Uplift Dental Garden Grove`} className="w-full h-full object-cover"  loading="lazy" width="400" height="300"/>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: COLORS.teal }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />)}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="font-body text-white/80 text-lg mb-8">Free consultations for new patients. Denti-Cal, PPO, and military insurance accepted.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold bg-white transition-all hover:shadow-lg" style={{ color: COLORS.tealDark }}>
                <Calendar className="w-5 h-5" />
                Book Free Consultation
              </button>
            </Link>
            <a href={PRACTICE.phone.tel}>
              <button className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold border-2 border-white text-white hover:bg-white/10 transition-all">
                <Phone className="w-5 h-5" />
                {PRACTICE.phone.display}
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
