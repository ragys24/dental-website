/* =============================================================
   UPLIFT DENTAL — About / Team Page
   ============================================================= */
import { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle, Phone, Calendar, Award, Heart, Users, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { COLORS, PRACTICE, DOCTOR_IMAGES, STAFF_IMAGES, SITE_IMAGES, type Doctor, type StaffMember } from "@/lib/constants";

const TEAL = COLORS.teal;
const TEAL_DARK = COLORS.tealDark;
const TEAL_PALE = COLORS.tealPale;

const staff: StaffMember[] = [
  {
    img: STAFF_IMAGES.angeliki,
    name: "Angeliki Blanco",
    role: "Office Manager",
    bio: "Angeliki is the engine that keeps Uplift Dental running. From coordinating schedules and managing insurance to making sure every patient has a seamless experience, she handles it all with grace and a smile. Her organizational instincts and genuine care for both the team and patients make her the backbone of the practice.",
    funFact: "Off the clock, Angeliki is in her element — whipping up authentic Greek recipes, cheering on the legacy of Kobe Bryant, and hanging out with her French bulldog.",
  },
  {
    img: STAFF_IMAGES.sinath,
    name: "Sinath Oum",
    role: "Lead Dental Assistant",
    bio: "Sinath is the heartbeat of our clinical team. As Lead Dental Assistant, she keeps every appointment running smoothly, ensures patients feel at ease, and mentors the rest of our assistants with patience and expertise. Her warm presence and sharp attention to detail make her an irreplaceable part of the Uplift Dental family.",
    funFact: "Outside the office, Sinath is all about family — spending quality time with her kids and her doberman, Mochi.",
  },
  {
    img: STAFF_IMAGES.geneyah,
    name: "Geneyah Warren",
    role: "Registered Dental Assistant",
    bio: "Geneyah brings energy, precision, and a genuine passion for patient care to every appointment. As a Registered Dental Assistant, she works seamlessly alongside our doctors to deliver a smooth, comfortable experience — and her calm, reassuring presence has a way of putting even the most nervous patients at ease.",
    funFact: "The eldest of three siblings, Geneyah has always been the trailblazer of the family. She lives by a simple philosophy: never stop exploring — whether that means picking up a new skill, chasing a new experience, or finding the next adventure.",
  },
];

const doctors: Doctor[] = [
  {
    img: DOCTOR_IMAGES.stefan,
    name: "Dr. Ragy Stefan, DDS",
    slug: "dr-stefan",
    role: "Founder & General Dentist",
    education: ["Western University of Health Sciences, College of Dental Medicine"],
    memberships: ["Orange County Dental Society", "AADMD", "CMANA"],
    bio: [
      "Dr. Ragy Stefan founded Uplift Dental & Orthodontics with a clear vision: to provide honest, compassionate, and high-quality dental care to every patient who walks through the door — regardless of their insurance status or financial situation.",
      "A graduate of Western University's College of Dental Medicine, Dr. Stefan is known for his patient-first approach, his transparency in treatment planning, and his genuine care for the community he serves. He takes time to explain every procedure, answer every question, and ensure patients feel comfortable and informed.",
      "Beyond clinical excellence, Dr. Stefan is deeply committed to community service. In the past year alone, his team has provided oral health screenings to over 1,000 children at local schools — helping families who might not otherwise have access to dental care.",
    ],
    specialties: ["General Dentistry", "Cosmetic Dentistry", "Dental Implants", "Preventive Care"],
    quote: "Every patient deserves to feel heard, respected, and cared for. That's not just our mission — it's our promise.",
  },
  {
    img: DOCTOR_IMAGES.schneekluthClean,
    name: "Dr. Clark Schneekluth, DDS",
    slug: "dr-schneekluth",
    role: "Orthodontist",
    education: ["University of the Pacific, Arthur A. Dugoni School of Dentistry"],
    memberships: ["American Association of Orthodontists", "Pacific Coast Society of Orthodontists"],
    bio: [
      "With over 40 years of experience creating beautiful, functional smiles, Dr. Clark Schneekluth is one of Orange County's most trusted and experienced orthodontists. He has been serving patients in Garden Grove, Seal Beach, Los Alamitos, and surrounding communities since 1983.",
      "Dr. Schneekluth's philosophy is simple: every patient deserves a smile they're proud of, and orthodontic treatment should be accessible and affordable. He offers a full range of orthodontic solutions — from traditional metal braces to modern clear aligners — and works with patients of all ages.",
      "His decades of experience mean he's seen and treated virtually every orthodontic case imaginable. Patients appreciate his calm demeanor, his thorough explanations, and his commitment to delivering results that last a lifetime.",
    ],
    specialties: ["Orthodontics", "Traditional Braces", "Clear Ceramic Braces", "Invisalign®", "Retainers"],
    quote: "A straight smile isn't just about aesthetics — it's about confidence, health, and quality of life.",
  },
  {
    img: DOCTOR_IMAGES.youssef,
    name: "Dr. Joseph Youssef, DDS",
    slug: "dr-youssef",
    role: "Board-Certified Oral & Maxillofacial Surgeon",
    education: [
      "University of California, San Francisco (UCSF) School of Dentistry",
      "OMS Residency — Montefiore Medical Center, New York (Chief Resident 2023–2024; Leo M. Davidoff Society Award)",
      "Certifications: BLS, ACLS, PALS, ATLS",
    ],
    memberships: [
      "American Association of Oral and Maxillofacial Surgeons (AAOMS)",
      "California Association of Oral and Maxillofacial Surgeons (CAOMS)",
      "Staff Surgeon — Long Beach Memorial Medical Center",
      "Staff Surgeon — CHOC (Children's Hospital of Orange County)",
    ],
    bio: [
      "A Huntington Beach native, Dr. Joseph Youssef is a board-certified oral and maxillofacial surgeon who made the intentional choice to return to Orange County — to be closer to family and to give back to the community that shaped him. His calm presence, precise technique, and ability to demystify complex procedures make him a surgeon patients genuinely trust.",
      "Dr. Youssef earned his dental degree at UCSF before heading to New York for his Oral and Maxillofacial Surgery residency at Montefiore Medical Center, where he rose to Chief Resident and earned the Leo M. Davidoff Society Award for his dedication to teaching and mentorship.",
      "He is recognized as an All-on-X full-arch implant specialist, having served as a lead surgeon at a high-volume full-arch rehabilitation center. His surgical scope spans dentoalveolar surgery, dental implants, facial trauma, corrective jaw surgery, and TMJ reconstruction. He holds advanced certifications in BLS, ACLS, PALS, and ATLS, and provides hospital-based care at both Long Beach Memorial and CHOC.",
    ],
    specialties: ["Oral & Maxillofacial Surgery", "All-on-X Full-Arch Implants", "Wisdom Teeth Removal", "Bone Grafting", "Facial Trauma", "Corrective Jaw Surgery", "TMJ Reconstruction"],
    quote: "I came back to serve the community I grew up in. Every patient I treat feels like family — and I approach every case with the same precision and care I'd want for my own.",
    funFact: "Outside the OR, Dr. Youssef enjoys beach days with his wife and daughter, cooking for family and friends, and playing basketball. He's a lifelong Lakers fan who was lucky enough to meet Kobe Bryant four times in college — and keeps a signed jersey as a daily reminder of what relentless preparation looks like. At home, he's also the proud owner of a dog named Root Tip — \"Rootie\" for short.",
  },
  {
    img: DOCTOR_IMAGES.saad,
    name: "Dr. Erene Saad, DMD MS",
    slug: "dr-saad",
    role: "Periodontist",
    education: [
      "Doctor of Dental Medicine (DMD) — Dental School",
      "Master of Science (MS) in Periodontology — Advanced Specialty Training",
    ],
    memberships: [
      "American Academy of Periodontology (AAP)",
      "California Society of Periodontists",
      "California Dental Association",
    ],
    bio: [
      "Dr. Erene Saad is a board-trained Periodontist with a Master of Science degree in Periodontology, bringing specialized expertise in gum health, periodontal disease treatment, and dental implant placement to Uplift Dental & Orthodontics.",
      "Dr. Saad is passionate about helping patients understand the critical connection between gum health and overall systemic health. She takes a thorough, personalized approach to diagnosis and treatment — whether that means non-surgical therapy, advanced laser treatment, or surgical intervention — always prioritizing the least invasive path to lasting health.",
      "Her warm, reassuring demeanor helps even the most anxious patients feel comfortable. She believes that healthy gums are the foundation of a beautiful, lasting smile, and she's dedicated to giving every patient the healthy foundation they deserve.",
    ],
    specialties: [
      "Periodontics",
      "Scaling & Root Planing",
      "Gum Grafts",
      "Crown Lengthening",
      "LANAP Laser Therapy",
      "Bone Grafting",
      "Dental Implants",
      "Osseous Surgery",
    ],
    quote: "Healthy gums are the foundation of every beautiful smile. I'm here to make sure yours lasts a lifetime.",
  },
  {
    img: DOCTOR_IMAGES.ghobrial,
    name: "Dr. Daniel Ghobrial, DDS",
    slug: "dr-ghobrial",
    role: "Endodontist",
    education: [
      "Bachelor of Science in Biological Sciences — University of California, Irvine (2017)",
      "Doctor of Dental Surgery (DDS) — University of California, San Francisco (2022)",
      "Certificate in Endodontics — UCSF Advanced Specialty Residency (2024)",
    ],
    memberships: [
      "American Association of Endodontists (AAE)",
      "American Dental Association (ADA)",
      "Northern California Academy of Endodontics",
    ],
    bio: [
      "Dr. Daniel Ghobrial is a dedicated endodontist committed to precision, evidence-based care, and the preservation of natural teeth. He completed his Doctor of Dental Surgery degree at UCSF in 2022, followed by a two-year advanced specialty residency in Endodontics at UCSF — one of the nation's leading dental institutions — where he received his certificate of specialty training in 2024.",
      "Dr. Ghobrial specializes in microscopic and surgical endodontics, complex retreatment cases, trauma management, and advanced pain control. He incorporates cutting-edge technology including digital imaging and operating microscopy to deliver precise, predictable outcomes with exceptional patient comfort.",
      "He has published research in the International Endodontic Journal on regenerative endodontic therapy and has presented on platelet-rich fibrin (PRF), platelet-rich plasma (PRP), and stem-cell–mediated regeneration. Outside the office, Dr. Ghobrial enjoys running, visiting national parks, and snowboarding.",
    ],
    specialties: [
      "Root Canal Therapy",
      "Microscopic Endodontics",
      "Surgical Endodontics",
      "Complex Retreatment",
      "Trauma Management",
      "Regenerative Endodontics",
      "Advanced Pain Control",
    ],
    quote: "Saving a natural tooth is always the best outcome. With precision and the right technology, we can make that possible for almost every patient.",
  },
];

const values = [
  { icon: Heart, title: "Compassion First", desc: "We treat every patient like family — with kindness, empathy, and genuine care for their wellbeing." },
  { icon: Award, title: "Clinical Excellence", desc: "Continuous education, advanced technology, and evidence-based practices ensure the best outcomes." },
  { icon: Users, title: "Community Commitment", desc: "From school screenings to accepting Denti-Cal, we believe quality dental care should be accessible to all." },
  { icon: CheckCircle, title: "Transparency", desc: "We explain every treatment option, every cost, and every step — no surprises, ever." },
];

export default function About() {
  // Scroll to doctor anchor on mount (handles /about#dr-stefan etc.)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    // Small delay to let the page render before scrolling
    const timer = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageSEO
        title="Meet Our Dental Team | Uplift Dental & Orthodontics Garden Grove, CA"
        description="Meet Dr. Ragy Stefan, Dr. Clark Schneekluth, Dr. Joseph Youssef, and Dr. Erene Saad — four specialists serving Garden Grove, CA 92845 with general dentistry, orthodontics, oral surgery, and periodontics under one roof."
        canonical="https://upliftdental.com/about"
      />
      <div className="min-h-screen flex flex-col bg-white">
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com/" },
        { name: "About Us", url: "https://upliftdental.com/about" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: TEAL_DARK }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${SITE_IMAGES.patternDark})`, backgroundSize: "500px auto" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.73 0.07 200)" }}>Our Story</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-5">Meet the Uplift Dental Team</h1>
          <p className="font-body text-white/75 text-xl max-w-2xl mx-auto">
            Four specialists united by one mission — exceptional dental care with compassion, honesty, and community at the heart of everything we do.
          </p>
        </div>
      </section>

      {/* Practice Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: TEAL }}>Who We Are</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: TEAL_DARK }}>
                Garden Grove's Multi-Specialty Dental Practice
              </h2>
              <p className="font-body text-gray-600 text-lg leading-relaxed mb-5">
                Uplift Dental & Orthodontics is more than a dental office — it's a community institution. Founded by Dr. Ragy Stefan, our practice was built on the belief that every person deserves access to high-quality dental care, regardless of their insurance status or financial circumstances.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-5">
                We're proud to be one of the few dental practices in Garden Grove that offers general dentistry, orthodontics, oral surgery, and periodontics under one roof. This means less referrals, less travel, and more coordinated care for you and your family.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                We hold Platinum Invisalign® Provider status, use the iTero intraoral scanner and SprintRay 3D printer for cutting-edge precision, and accept Denti-Cal, most PPO plans, and military insurance. We also offer Cherry and CareCredit financing to make treatment accessible.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Platinum Invisalign® Provider",
                  "iTero® 3D Scanner",
                  "SprintRay 3D Printing",
                  "Denti-Cal Accepted",
                  "Military Insurance Welcome",
                  "Cherry & CareCredit",
                  "Free Consultations",
                  "Same-Day Emergencies",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: TEAL }} />
                    <span className="font-body text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={SITE_IMAGES.team} alt="Uplift Dental & Orthodontics team in Garden Grove, CA — Dr. Stefan, Dr. Schneekluth, Dr. Youssef, Dr. Saad" className="w-full h-full object-cover"  loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ backgroundColor: TEAL_PALE }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: TEAL }}>Our Values</p>
            <h2 className="font-display text-4xl font-bold" style={{ color: TEAL_DARK }}>What Drives Us Every Day</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "oklch(0.90 0.02 192)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${TEAL}15` }}>
                    <Icon className="w-6 h-6" style={{ color: TEAL }} />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2" style={{ color: TEAL_DARK }}>{v.title}</h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: TEAL }}>Expert Care</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: TEAL_DARK }}>Our Doctors</h2>
          </div>

          <div className="space-y-20">
            {doctors.map((doc, idx) => (
              <div key={doc.name} id={doc.slug} className={`grid lg:grid-cols-2 gap-16 items-start scroll-mt-32 ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                <div className={idx % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4] max-w-sm mx-auto lg:mx-0" style={{ backgroundColor: TEAL_PALE }}>
                    <img src={doc.img} alt={`${doc.name} — ${doc.role} at Uplift Dental & Orthodontics Garden Grove CA`} className="w-full h-full object-cover object-top"  loading="lazy" width="300" height="400"/>
                  </div>
                </div>
                <div className={idx % 2 !== 0 ? "lg:order-1" : ""}>
                  <p className="font-body text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: TEAL }}>{doc.role}</p>
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: TEAL_DARK }}>{doc.name}</h3>

                  <blockquote className="border-l-4 pl-4 mb-6 italic font-display text-lg" style={{ borderColor: TEAL, color: TEAL_DARK }}>
                    "{doc.quote}"
                  </blockquote>

                  {doc.bio.map((para, i) => (
                    <p key={i} className="font-body text-gray-600 leading-relaxed mb-4">{para}</p>
                  ))}

                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="font-body text-xs font-bold uppercase tracking-widest mb-2" style={{ color: TEAL }}>Education</p>
                      {doc.education.map((e) => (
                        <p key={e} className="font-body text-sm text-gray-700">{e}</p>
                      ))}
                    </div>
                    <div>
                      <p className="font-body text-xs font-bold uppercase tracking-widest mb-2" style={{ color: TEAL }}>Professional Memberships</p>
                      {doc.memberships.map((m) => (
                        <p key={m} className="font-body text-sm text-gray-700">{m}</p>
                      ))}
                    </div>
                    <div>
                      <p className="font-body text-xs font-bold uppercase tracking-widest mb-2" style={{ color: TEAL }}>Specialties</p>
                      <div className="flex flex-wrap gap-2">
                        {doc.specialties.map((s) => (
                          <span key={s} className="px-3 py-1 rounded-full text-xs font-body font-medium" style={{ backgroundColor: `${TEAL}15`, color: TEAL }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {doc.funFact && (
                    <div className="flex items-start gap-2 rounded-xl p-3 mt-5" style={{ backgroundColor: `${TEAL}10` }}>
                      <span className="text-lg mt-0.5">🐾</span>
                      <p className="font-body text-sm text-gray-600 italic">{doc.funFact}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Staff */}
      <section className="py-20" style={{ backgroundColor: TEAL_PALE }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: TEAL }}>The Team Behind the Team</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: TEAL_DARK }}>Our Support Staff</h2>
            <p className="font-body text-gray-500 mt-4 max-w-xl mx-auto">The dedicated professionals who make every visit comfortable, organized, and seamless.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {staff.map((member) => (
              <div key={member.name} className="bg-white rounded-3xl shadow-lg overflow-hidden w-full">
                <div className="aspect-[3/4] overflow-hidden" style={{ backgroundColor: TEAL_PALE }}>
                  <img
                    src={member.img}
                    alt={`${member.name} — ${member.role} at Uplift Dental & Orthodontics Garden Grove CA`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                   width="300" height="400"/>
                </div>
                <div className="p-7">
                  <p className="font-body text-xs font-bold uppercase tracking-widest mb-1" style={{ color: TEAL }}>{member.role}</p>
                  <h3 className="font-display text-2xl font-bold mb-3" style={{ color: TEAL_DARK }}>{member.name}</h3>
                  <p className="font-body text-gray-600 leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex items-start gap-2 rounded-xl p-3" style={{ backgroundColor: `${TEAL}10` }}>
                    <span className="text-lg mt-0.5">🐾</span>
                    <p className="font-body text-sm text-gray-600 italic">{member.funFact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20" style={{ backgroundColor: TEAL_DARK }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${SITE_IMAGES.patternDark})`, backgroundSize: "500px auto" }} />
          <div className="text-center mb-12">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.73 0.07 200)" }}>Community Impact</p>
            <h2 className="font-display text-4xl font-bold text-white mb-4">Giving Back to Garden Grove</h2>
            <p className="font-body text-white/75 text-lg max-w-2xl mx-auto">
              We believe healthy smiles shouldn't be a privilege. That's why we actively work to make dental care accessible to everyone in our community.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { stat: "1,000+", label: "Children Screened", desc: "Free oral health screenings at local Garden Grove schools annually." },
              { stat: "100%", label: "Denti-Cal Accepted", desc: "We proudly accept Denti-Cal to serve patients who need it most." },
              { stat: "3", label: "Professional Associations", desc: "OCDS, AADMD, and CMANA memberships ensuring the highest standards." },
            ].map((item) => (
              <div key={item.label} className="text-center p-6 rounded-2xl border" style={{ backgroundColor: "oklch(0.42 0.09 192 / 0.2)", borderColor: "oklch(0.42 0.09 192 / 0.4)" }}>
                <div className="font-display text-4xl font-bold text-white mb-1">{item.stat}</div>
                <div className="font-body font-semibold text-sm mb-2" style={{ color: "oklch(0.73 0.07 200)" }}>{item.label}</div>
                <p className="font-body text-xs text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: TEAL_DARK }}>
            Ready to Meet the Team?
          </h2>
          <p className="font-body text-gray-600 text-lg mb-8">Book a free consultation and experience the Uplift Dental difference.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white transition-all hover:shadow-lg" style={{ backgroundColor: TEAL }}>
                <Calendar className="w-5 h-5" />
                Book Free Consultation
              </button>
            </Link>
            <a href={PRACTICE.phone.tel}>
              <button className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-semibold border-2 transition-all" style={{ borderColor: TEAL, color: TEAL }}>
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
