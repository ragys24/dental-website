/* =============================================================
   UPLIFT DENTAL — Meet Our Specialists Page
   Purpose: E-E-A-T signal, Google People cards, internal linking
   Design: Clean card grid with teal accents, credential badges
   ============================================================= */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Link } from "wouter";
import { Award, GraduationCap, CheckCircle2, ChevronRight, Users } from "lucide-react";
import { DOCTOR_IMAGES, COLORS } from "@/lib/constants";

const specialists = [
  {
    img: DOCTOR_IMAGES.stefan,
    name: "Dr. Ragy Stefan, DDS",
    slug: "dr-stefan",
    role: "Founder & General Dentist",
    badge: "Founder",
    badgeColor: "oklch(0.42 0.09 192)",
    education: ["Western University of Health Sciences, College of Dental Medicine"],
    memberships: ["Orange County Dental Society", "AADMD", "CMANA"],
    specialties: ["General Dentistry", "Cosmetic Dentistry", "Dental Implants", "Preventive Care"],
    bio: "Dr. Ragy Stefan founded Uplift Dental & Orthodontics with a clear vision: to provide honest, compassionate, and high-quality dental care to every patient — regardless of their insurance status. Known for his patient-first approach and transparency, Dr. Stefan has led over 1,000 community oral health screenings for local school children.",
    quote: "Every patient deserves to feel heard, respected, and cared for. That's not just our mission — it's our promise.",
    serviceLink: "/teeth-cleaning",
    serviceName: "General Dentistry",
  },
  {
    img: DOCTOR_IMAGES.schneekluthClean,
    name: "Dr. Clark Schneekluth, DDS",
    slug: "dr-schneekluth",
    role: "Orthodontist",
    badge: "40+ Years Experience",
    badgeColor: "oklch(0.55 0.12 150)",
    education: ["University of the Pacific, Arthur A. Dugoni School of Dentistry"],
    memberships: ["American Association of Orthodontists", "Pacific Coast Society of Orthodontists"],
    specialties: ["Orthodontics", "Traditional Braces", "Clear Ceramic Braces", "Invisalign®", "Retainers"],
    bio: "With over 40 years of experience, Dr. Clark Schneekluth is one of Orange County's most trusted orthodontists. Practicing since 1983, he has treated thousands of patients of all ages in Garden Grove, Seal Beach, and Los Alamitos. His calm demeanor and commitment to accessible orthodontic care make him a patient favorite.",
    quote: "A straight smile isn't just about aesthetics — it's about confidence, health, and quality of life.",
    serviceLink: "/invisalign",
    serviceName: "Invisalign & Orthodontics",
  },
  {
    img: DOCTOR_IMAGES.youssef,
    name: "Dr. Joseph Youssef, DDS",
    slug: "dr-youssef",
    role: "Board-Certified Oral & Maxillofacial Surgeon",
    badge: "UCSF · AAOMS Board Certified",
    badgeColor: "oklch(0.45 0.10 25)",
    education: [
      "UCSF School of Dentistry",
      "OMS Residency — Montefiore Medical Center, NY (Chief Resident 2023–2024)",
      "Leo M. Davidoff Society Award",
    ],
    memberships: ["AAOMS", "CAOMS", "Staff Surgeon — Long Beach Memorial & CHOC"],
    specialties: ["Oral & Maxillofacial Surgery", "All-on-X Full-Arch Implants", "Wisdom Teeth Removal", "Bone Grafting", "Facial Trauma", "Corrective Jaw Surgery"],
    bio: "A Huntington Beach native, Dr. Joseph Youssef is a board-certified oral and maxillofacial surgeon who returned to Orange County to serve his home community. UCSF-trained and Montefiore-residency-tested, he is an All-on-X full-arch implant specialist and provides hospital-based surgical care at Long Beach Memorial and CHOC.",
    quote: "I came back to serve the community I grew up in. Every patient I treat feels like family.",
    serviceLink: "/dental-implants",
    serviceName: "Oral Surgery & Implants",
  },
  {
    img: DOCTOR_IMAGES.saad,
    name: "Dr. Erene Saad, DMD MS",
    slug: "dr-saad",
    role: "Periodontist",
    badge: "MS in Periodontology",
    badgeColor: "oklch(0.45 0.12 145)",
    education: [
      "Doctor of Dental Medicine (DMD)",
      "Master of Science (MS) in Periodontology",
    ],
    memberships: ["American Academy of Periodontology (AAP)", "California Society of Periodontists", "California Dental Association"],
    specialties: ["Periodontics", "LANAP Laser Therapy", "Gum Grafts", "Crown Lengthening", "Bone Grafting", "Dental Implants", "Osseous Surgery"],
    bio: "Dr. Erene Saad is a board-trained Periodontist with a Master of Science in Periodontology. She specializes in gum health, periodontal disease treatment, and dental implant placement. Her warm, reassuring demeanor helps even the most anxious patients feel comfortable while receiving advanced periodontal care.",
    quote: "Healthy gums are the foundation of every beautiful smile. I'm here to make sure yours lasts a lifetime.",
    serviceLink: "/periodontics",
    serviceName: "Periodontics",
  },
  {
    img: DOCTOR_IMAGES.ghobrial,
    name: "Dr. Daniel Ghobrial, DDS",
    slug: "dr-ghobrial",
    role: "Endodontist",
    badge: "UCSF Endodontics Residency",
    badgeColor: "oklch(0.42 0.09 192)",
    education: [
      "BS in Biological Sciences — UC Irvine (2017)",
      "DDS — UCSF (2022)",
      "Certificate in Endodontics — UCSF Advanced Specialty Residency (2024)",
    ],
    memberships: ["American Association of Endodontists (AAE)", "American Dental Association (ADA)", "Northern California Academy of Endodontics"],
    specialties: ["Root Canal Therapy", "Microscopic Endodontics", "Surgical Endodontics", "Complex Retreatment", "Trauma Management", "Regenerative Endodontics"],
    bio: "Dr. Daniel Ghobrial is a UCSF-trained endodontist specializing in microscopic and surgical endodontics. He completed his advanced specialty residency at UCSF in 2024 and has published research in the International Endodontic Journal on regenerative endodontic therapy. He uses operating microscopy and digital imaging for precision root canal therapy.",
    quote: "Saving a natural tooth is always the best outcome. With precision and the right technology, we can make that possible for almost every patient.",
    serviceLink: "/endodontics",
    serviceName: "Endodontics",
  },
  {
    img: DOCTOR_IMAGES.sidky,
    name: "Dr. David Sidky, DMD",
    slug: "dr-sidky",
    role: "Associate Dentist",
    badge: "Boston University DMD",
    badgeColor: "oklch(0.42 0.09 192)",
    education: [
      "BS in Biological Sciences — University of Minnesota (2019)",
      "DMD — Boston University Henry M. Goldman School of Dental Medicine (2023)",
    ],
    memberships: ["American Dental Association (ADA)"],
    specialties: ["General Dentistry", "Cosmetic Dentistry", "Preventive Care", "Restorative Dentistry"],
    bio: "Dr. David Sidky is a third-generation dentist who brings a passion for personalized, patient-centered care to Uplift Dental. A Boston University DMD graduate, he specializes in cosmetic and general dentistry and is known for combining precision with artistry to create confident, beautiful smiles.",
    quote: "My goal is to combine advanced dentistry with genuine relationships — helping every patient feel confident, comfortable, and proud of their smile.",
    serviceLink: "/veneers",
    serviceName: "Cosmetic Dentistry",
  },
];

function SpecialistsPersonSchema() {
  useEffect(() => {
    const id = "ld-specialists";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Dental Specialists at Uplift Dental & Orthodontics",
      "description": "Meet the 6 dental specialists at Uplift Dental & Orthodontics in Garden Grove, CA — general dentist, orthodontist, oral surgeon, periodontist, endodontist, and associate dentist.",
      "itemListElement": specialists.map((doc, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Physician",
          "name": doc.name,
          "jobTitle": doc.role,
          "worksFor": { "@type": "MedicalOrganization", "name": "Uplift Dental & Orthodontics", "url": "https://upliftdental.com" },
          "url": `https://upliftdental.com/about#${doc.slug}`,
          "image": doc.img,
          "alumniOf": doc.education.map(e => ({ "@type": "CollegeOrUniversity", "name": e })),
          "knowsAbout": doc.specialties,
        }
      }))
    };
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.getElementById(id)?.remove(); };
  }, []);
  return null;
}

export default function OurSpecialists() {
  return (
    <>
      <PageSEO
        title="Meet Our Dental Specialists | Uplift Dental & Orthodontics"
        description="Meet the 6 dental specialists at Uplift Dental & Orthodontics in Garden Grove, CA — orthodontist, oral surgeon, periodontist, endodontist, and cosmetic dentists. Multi-specialty care under one roof."
        canonical="https://upliftdental.com/our-specialists"
      />
      <SpecialistsPersonSchema />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com/" },
        { name: "About", url: "https://upliftdental.com/about" },
        { name: "Our Specialists", url: "https://upliftdental.com/our-specialists" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, oklch(0.14 0.04 192) 0%, oklch(0.22 0.07 192) 100%)` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-semibold mb-6" style={{ background: "oklch(0.42 0.09 192 / 0.3)", color: "oklch(0.85 0.08 192)", border: "1px solid oklch(0.42 0.09 192 / 0.4)" }}>
            <Users className="w-4 h-4" />
            Multi-Specialty Dental Care Since 2023
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white font-bold mb-6 leading-tight">
            Meet Our<br />
            <span style={{ color: "oklch(0.70 0.07 195)" }}>6 Dental Specialists</span>
          </h1>
          <p className="font-body text-white/80 text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Garden Grove's original multi-specialty dental home. General dentistry, orthodontics, oral surgery, periodontics, endodontics, and cosmetic dentistry — all under one roof at 5253 Lampson Ave.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-body text-white/70">
            {["No Referrals Needed", "All Specialists On-Site", "Denti-Cal & PPO Accepted", "Free Consultations"].map(tag => (
              <span key={tag} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[oklch(0.70_0.07_195)]" /> {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Specialists Grid */}
      <section className="py-20 bg-[oklch(0.98_0.005_192)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialists.map(doc => (
              <div key={doc.slug} id={doc.slug} className="bg-white rounded-3xl overflow-hidden border border-[oklch(0.92_0.01_192)] hover:shadow-xl transition-all duration-300 flex flex-col">
                {/* Photo */}
                <div className="relative h-72 overflow-hidden bg-[oklch(0.95_0.01_192)]">
                  <img
                    src={doc.img}
                    alt={`${doc.name} — ${doc.role} at Uplift Dental & Orthodontics, Garden Grove, CA`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-block text-xs font-body font-bold px-3 py-1 rounded-full text-white shadow-md" style={{ backgroundColor: doc.badgeColor }}>
                      {doc.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display font-bold text-xl text-[oklch(0.14_0.02_220)] mb-1">{doc.name}</h2>
                  <p className="font-body text-sm font-semibold mb-4" style={{ color: COLORS.teal }}>{doc.role}</p>

                  <p className="font-body text-sm text-[oklch(0.40_0.02_220)] leading-relaxed mb-4 flex-1">{doc.bio}</p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <p className="font-body text-xs font-semibold uppercase tracking-widest text-[oklch(0.55_0.02_220)] mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.specialties.slice(0, 4).map(s => (
                        <span key={s} className="text-xs font-body px-2.5 py-1 rounded-full bg-[oklch(0.95_0.02_192)] text-[oklch(0.42_0.09_192)] font-medium">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-5">
                    <p className="font-body text-xs font-semibold uppercase tracking-widest text-[oklch(0.55_0.02_220)] mb-2 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" /> Education
                    </p>
                    <ul className="space-y-1">
                      {doc.education.slice(0, 2).map(e => (
                        <li key={e} className="font-body text-xs text-[oklch(0.45_0.02_220)] leading-snug">{e}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-2 pl-3 mb-5 italic font-body text-xs text-[oklch(0.45_0.02_220)] leading-relaxed" style={{ borderColor: COLORS.teal }}>
                    "{doc.quote}"
                  </blockquote>

                  {/* CTA */}
                  <Link href={doc.serviceLink} className="flex items-center justify-between px-4 py-2.5 rounded-xl font-body text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: COLORS.teal }}>
                    <span>View {doc.serviceName}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Multi-Specialty */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-12 h-12 mx-auto mb-6" style={{ color: COLORS.teal }} />
          <h2 className="font-display text-4xl font-bold text-[oklch(0.14_0.02_220)] mb-6">
            Why Multi-Specialty Care Matters
          </h2>
          <p className="font-body text-[oklch(0.40_0.02_220)] text-lg leading-relaxed mb-8">
            When your dental care requires multiple specialists, most practices send you to different offices across town — adding weeks of waiting, extra co-pays, and the frustration of starting over with a new team. At Uplift Dental & Orthodontics, all 6 specialists work together in the same building, share your records, and coordinate your treatment plan in real time.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { title: "No Referrals", desc: "See any specialist same-day or next-day — no referral paperwork, no waiting weeks for an appointment at another office." },
              { title: "Coordinated Care", desc: "Your specialists communicate directly with each other about your treatment plan, ensuring nothing falls through the cracks." },
              { title: "One Familiar Team", desc: "You build a relationship with our entire team — the same front desk, the same assistants, the same comfortable environment every visit." },
            ].map(item => (
              <div key={item.title} className="bg-[oklch(0.97_0.008_192)] rounded-2xl p-6 border border-[oklch(0.92_0.01_192)]">
                <h3 className="font-display font-bold text-lg text-[oklch(0.14_0.02_220)] mb-2">{item.title}</h3>
                <p className="font-body text-sm text-[oklch(0.45_0.02_220)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white text-base transition-all hover:opacity-90" style={{ backgroundColor: COLORS.teal }}>
            Book a Free Consultation <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
