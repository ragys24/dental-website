/**
 * UPLIFT DENTAL — Invisalign Consultation Landing Page
 * Design reminder: focused orthodontic conversion page; lead with verified credentials,
 * clear Call/Text actions, concise education, and no price, outcome, or coverage promises.
 */
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema, HowToSchema, MedicalPageSchema, ServiceSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { ArrowRight, Award, BadgeCheck, CheckCircle2, ClipboardCheck, MapPin, MessageSquare, Phone, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import { COLORS, PRACTICE } from "@/lib/constants";
import { SMS } from "@/lib/sms";
import { trackInvisalignText } from "@/lib/tracking";

const INVISALIGN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/invisalign-lifestyle_cd9d5323.jpg";

const INVISALIGN_FAQS = [
  {
    question: "Could Invisalign be right for me?",
    answer: "Invisalign may be an option for children, teens, and adults, depending on individual orthodontic needs. During your consultation, the orthodontic team will evaluate your smile goals and oral-health needs, then explain whether clear aligners or another orthodontic approach is appropriate.",
  },
  {
    question: "What happens at the free Invisalign consultation?",
    answer: "Your consultation is a chance to discuss your goals, ask questions, and learn the next steps. If treatment appears appropriate, the team can explain a personalized plan and the information needed to move forward.",
  },
  {
    question: "Do you accept insurance or offer financing for Invisalign?",
    answer: "Many PPO plans include orthodontic benefits, but eligibility and benefits vary. Our team can help you review available information and discuss flexible Cherry financing options. Coverage and financing are subject to the applicable plan terms and approval.",
  },
  {
    question: "Where is the Invisalign consultation office?",
    answer: `Uplift Dental & Orthodontics is located at ${PRACTICE.address.full}, in convenient West Garden Grove. The office welcomes children, teens, and adults from Garden Grove and neighboring Orange County communities.`,
  },
  {
    question: "Do you serve Invisalign patients from nearby cities?",
    answer: "Yes. Our West Garden Grove office is convenient for patients from Westminster, Cypress, Seal Beach, Los Alamitos, Fountain Valley, Huntington Beach, Anaheim, and nearby Orange County communities. Call or text to ask about an Invisalign consultation close to home.",
  },
  {
    question: "How are digital scans used for Invisalign planning?",
    answer: "Our orthodontic team may use Trios 6 and iTero digital scanning technology to create detailed orthodontic records without traditional impression material. The records needed depend on your individual orthodontic needs, and the team will explain the appropriate next steps at your consultation.",
  },
  {
    question: "How do Invisalign and braces differ?",
    answer: "Invisalign uses removable clear aligners, while braces use fixed brackets and wires. Both can be appropriate options depending on the bite, alignment concerns, and treatment goals. Your orthodontic consultation is the best time to compare which approach may fit your needs.",
  },
];

const proofPoints = [
  { icon: Award, title: "Platinum Invisalign Provider", detail: "Experience focused on clear-aligner care." },
  { icon: BadgeCheck, title: "Board-Certified Orthodontist", detail: "Specialist orthodontic care at one convenient office." },
  { icon: WalletCards, title: "PPO Plans + Cherry Financing", detail: "Help reviewing available options without coverage promises." },
];

const whyUplift = [
  { icon: Award, title: "Platinum provider", body: "Clear-aligner treatment supported by a practice with Platinum Invisalign Provider status." },
  { icon: ShieldCheck, title: "Board-certified orthodontist", body: "Specialist orthodontic guidance is available for your consultation and treatment planning." },
  { icon: ClipboardCheck, title: "Personalized plan", body: "Your consultation starts with your smile goals, questions, and individual orthodontic needs." },
  { icon: Sparkles, title: "All ages welcome", body: "Clear-aligner consultations for children, teens, and adults exploring orthodontic care at every stage of life." },
  { icon: WalletCards, title: "Insurance and financing support", body: "Our team can help review available PPO information and discuss Cherry financing options." },
];

export default function Invisalign() {
  return (
    <>
      <PageSEO
        title="Invisalign in Garden Grove, CA | West Garden Grove Orthodontist"
        description="Explore Invisalign in West Garden Grove with a board-certified orthodontist at a Platinum Invisalign Provider. Free all-ages consultation, convenient for nearby Orange County cities."
        canonical="https://upliftdental.com/invisalign"
      />
      <FAQSchema faqs={INVISALIGN_FAQS} id="ld-faq-invisalign" />
      <HowToSchema
        id="ld-howto-invisalign"
        name="How to Start Invisalign in Garden Grove"
        description="Three steps to begin an Invisalign consultation at Uplift Dental & Orthodontics in Garden Grove, California."
        steps={[
          { name: "Book a free consultation", text: "Call Uplift Dental & Orthodontics or text the office to ask for a free Invisalign consultation.", url: "https://upliftdental.com/invisalign" },
          { name: "Review your custom treatment plan", text: "Meet with the orthodontic team to discuss your smile goals and learn whether clear aligners may be appropriate for you.", url: "https://upliftdental.com/invisalign" },
          { name: "Start your smile journey", text: "If you choose to move forward, the team will explain your next treatment-planning steps and available support options.", url: "https://upliftdental.com/invisalign" },
        ]}
      />
      <MedicalPageSchema
        name="Invisalign in Garden Grove"
        url="https://upliftdental.com/invisalign"
        description="All-ages Invisalign consultation page at Uplift Dental & Orthodontics in convenient West Garden Grove, California, serving nearby Orange County communities."
        medicalSpecialty="Orthodontics"
        keywords="invisalign garden grove, invisalign west garden grove, orthodontist west garden grove, board-certified orthodontist garden grove, platinum invisalign provider, clear aligners garden grove, invisalign near westminster, invisalign near cypress"
      />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)] pb-20 md:pb-0">
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Services", url: "https://upliftdental.com/services" },
          { name: "Invisalign", url: "https://upliftdental.com/invisalign" },
        ]} />
        <ServiceSchema
          name="Invisalign Consultation"
          description="Free all-ages Invisalign consultation with a board-certified orthodontist at a Platinum Invisalign Provider in convenient West Garden Grove, California."
          url="https://upliftdental.com/invisalign"
          serviceType="Invisalign"
        />
        <Navbar />

        <main>
          <section className="relative overflow-hidden" style={{ background: `linear-gradient(118deg, ${COLORS.tealDeep} 0%, ${COLORS.tealDark} 58%, ${COLORS.tealMid} 100%)` }}>
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[oklch(0.73_0.07_200_/_0.12)] blur-3xl" />
            <div className="absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-[oklch(0.78_0.12_85_/_0.12)] blur-3xl" />
            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-8">
              <div>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.16em] text-white/90">
                  <Sparkles className="h-3.5 w-3.5" /> Orthodontic consultations
                </p>
                <h1 className="max-w-3xl font-display text-5xl leading-[0.98] text-white sm:text-6xl lg:text-7xl">Invisalign in Garden Grove</h1>
                <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/85 sm:text-xl">Free consultation with a board-certified orthodontist at a Platinum Invisalign Provider.</p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {proofPoints.map(({ icon: Icon, title, detail }) => (
                    <div key={title} className="rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm">
                      <Icon className="mb-3 h-5 w-5" style={{ color: COLORS.gold }} />
                      <p className="font-body text-sm font-bold leading-snug text-white">{title}</p>
                      <p className="mt-1 font-body text-xs leading-relaxed text-white/65">{detail}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href={PRACTICE.phone.tel} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-body text-sm font-extrabold text-[oklch(0.22_0.06_192)] shadow-lg shadow-black/15 transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]">
                    <Phone className="h-4 w-4" /> Call for a Free Invisalign Consultation
                  </a>
                  <a href={SMS.invisalign} onClick={trackInvisalignText} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-white/60 bg-transparent px-6 py-4 font-body text-sm font-bold text-white transition-colors duration-150 hover:bg-white/10 active:scale-[0.98]">
                    <MessageSquare className="h-4 w-4" /> Text Us About Invisalign
                  </a>
                </div>
                <p className="mt-4 font-body text-sm text-white/70">For privacy, please don’t text medical details.</p>
                <p className="mt-2 max-w-2xl font-body text-sm font-medium leading-relaxed text-[oklch(0.88_0.035_200)]">Children, teens, and adults welcome. Convenient West Garden Grove office serving nearby Orange County communities.</p>
              </div>

              <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                <div className="absolute -inset-3 rounded-[2rem] bg-[oklch(0.78_0.12_85_/_0.24)] blur-2xl" />
                <img src={INVISALIGN_IMG} alt="Patient holding clear Invisalign aligners at Uplift Dental & Orthodontics in Garden Grove" className="relative aspect-[5/4] w-full rounded-[1.75rem] object-cover shadow-2xl" width="1200" height="960" fetchPriority="high" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/25 bg-[oklch(0.18_0.04_185_/_0.88)] p-4 backdrop-blur-md">
                  <p className="font-body text-sm font-bold text-white">A clear plan starts with a conversation.</p>
                  <p className="mt-1 font-body text-xs leading-relaxed text-white/70">Call or text the office to request your free Invisalign consultation.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <p className="font-body text-xs font-bold uppercase tracking-[0.16em]" style={{ color: COLORS.teal }}>Why Uplift for Invisalign?</p>
                <h2 className="mt-3 font-display text-4xl leading-tight text-[oklch(0.22_0.06_192)] sm:text-5xl">Specialist guidance, with room to ask every question.</h2>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {whyUplift.map(({ icon: Icon, title, body }) => (
                  <article key={title} className="rounded-2xl border border-[oklch(0.90_0.015_185)] bg-[oklch(0.985_0.006_92)] p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: COLORS.tealPale }}><Icon className="h-5 w-5" style={{ color: COLORS.teal }} /></div>
                    <h3 className="mt-5 font-display text-xl text-[oklch(0.22_0.06_192)]">{title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-[oklch(0.42_0.035_192)]">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20" style={{ background: "oklch(0.97 0.009 85)" }}>
            <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.16fr_0.84fr] lg:items-center lg:px-8">
              <div>
                <p className="font-body text-xs font-bold uppercase tracking-[0.16em]" style={{ color: COLORS.teal }}>Digital orthodontic planning</p>
                <h2 className="mt-3 font-display text-4xl leading-tight text-[oklch(0.22_0.06_192)] sm:text-5xl">A detailed conversation can start with a digital scan.</h2>
                <p className="mt-5 max-w-2xl font-body leading-relaxed text-[oklch(0.42_0.035_192)]">Uplift Dental & Orthodontics uses Trios 6 and iTero digital scanning technology to support orthodontic records and treatment discussions. Your consultation is an opportunity to review your goals, ask questions, and understand the next steps before making a decision.</p>
              </div>
              <div className="rounded-3xl border border-[oklch(0.88_0.02_185)] bg-white p-7 shadow-[0_16px_36px_oklch(0.22_0.06_192_/_0.06)]">
                <h3 className="font-display text-2xl text-[oklch(0.22_0.06_192)]">Considering fixed braces instead?</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-[oklch(0.42_0.035_192)]">Explore Uplift’s dedicated braces and orthodontics page for traditional metal braces, ceramic braces, and early orthodontic care.</p>
                <Link href="/orthodontics" className="mt-6 inline-flex items-center gap-2 font-body text-sm font-bold underline decoration-2 underline-offset-4" style={{ color: COLORS.teal }}>
                  Compare braces and orthodontic options <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20" style={{ background: "oklch(0.97 0.009 85)" }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
                <div>
                  <p className="font-body text-xs font-bold uppercase tracking-[0.16em]" style={{ color: COLORS.teal }}>A straightforward next step</p>
                  <h2 className="mt-3 font-display text-4xl leading-tight text-[oklch(0.22_0.06_192)] sm:text-5xl">Your Invisalign process, in three clear steps.</h2>
                </div>
                <p className="font-body text-base leading-relaxed text-[oklch(0.42_0.035_192)]">There is no need to decide everything before you call. Start with a free consultation, then receive information tailored to your orthodontic goals and questions.</p>
              </div>
              <ol className="mt-10 grid gap-5 md:grid-cols-3">
                {[
                  { number: "01", title: "Free consultation", body: "Call or text to request time with our orthodontic team in West Garden Grove." },
                  { number: "02", title: "Custom treatment plan", body: "Discuss your goals and learn whether clear aligners may be appropriate for you." },
                  { number: "03", title: "Start your smile journey", body: "If you choose to move forward, the team will outline your next planning steps." },
                ].map((step) => (
                  <li key={step.number} className="list-none rounded-3xl bg-white p-7 shadow-[0_14px_35px_oklch(0.22_0.06_192_/_0.07)]">
                    <span className="font-body text-xs font-extrabold tracking-[0.2em]" style={{ color: COLORS.gold }}>{step.number}</span>
                    <h3 className="mt-6 font-display text-2xl text-[oklch(0.22_0.06_192)]">{step.title}</h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-[oklch(0.42_0.035_192)]">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
              <div className="rounded-3xl p-8 text-white sm:p-10" style={{ background: COLORS.tealDark }}>
                <MapPin className="h-7 w-7" style={{ color: COLORS.gold }} />
                <h2 className="mt-6 font-display text-4xl leading-tight">Convenient West Garden Grove Invisalign consultations</h2>
                <p className="mt-4 font-body leading-relaxed text-white/78">Visit Uplift Dental & Orthodontics at {PRACTICE.address.full}. Our all-ages Invisalign consultations are conveniently located for Garden Grove families and patients from Westminster, Cypress, Seal Beach, Los Alamitos, Fountain Valley, Huntington Beach, Anaheim, and neighboring Orange County cities.</p>
                <a href={PRACTICE.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-body text-sm font-bold text-white underline decoration-[oklch(0.78_0.12_85)] decoration-2 underline-offset-4">Get directions <ArrowRight className="h-4 w-4" /></a>
              </div>
              <div>
                <p className="font-body text-xs font-bold uppercase tracking-[0.16em]" style={{ color: COLORS.teal }}>Questions, answered clearly</p>
                <h2 className="mt-3 font-display text-4xl text-[oklch(0.22_0.06_192)]">Invisalign FAQ</h2>
                <div className="mt-7 divide-y divide-[oklch(0.90_0.015_185)] border-y border-[oklch(0.90_0.015_185)]">
                  {INVISALIGN_FAQS.map((faq) => (
                    <details key={faq.question} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body font-bold text-[oklch(0.25_0.055_192)]"><span>{faq.question}</span><ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-90" /></summary>
                      <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-[oklch(0.42_0.035_192)]">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 text-center sm:py-20" style={{ background: COLORS.teal }}>
            <div className="mx-auto max-w-3xl px-4">
              <CheckCircle2 className="mx-auto h-8 w-8" style={{ color: COLORS.gold }} />
              <h2 className="mt-5 font-display text-4xl text-white sm:text-5xl">Talk with an Invisalign team that meets you where you are.</h2>
              <p className="mx-auto mt-5 max-w-2xl font-body leading-relaxed text-white/80">Request a free consultation with a board-certified orthodontist at Uplift Dental & Orthodontics.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={PRACTICE.phone.tel} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-body text-sm font-extrabold text-[oklch(0.22_0.06_192)] transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"><Phone className="h-4 w-4" /> Call for a Free Consultation</a>
                <a href={SMS.invisalign} onClick={trackInvisalignText} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-white/60 px-6 py-4 font-body text-sm font-bold text-white transition-colors duration-150 hover:bg-white/10 active:scale-[0.98]"><MessageSquare className="h-4 w-4" /> Text Us About Invisalign</a>
              </div>
              <p className="mt-4 font-body text-xs text-white/65">For privacy, please don’t text medical details.</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
