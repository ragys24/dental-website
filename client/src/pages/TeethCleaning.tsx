/* =============================================================
   UPLIFT DENTAL — Teeth Cleaning Page
   Design: "Elevated Warmth" — teal brand, DM Serif + DM Sans
   ============================================================= */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/StructuredData";
import { Link } from "wouter";
import { CheckCircle2, Phone, Calendar, Heart } from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";

export default function TeethCleaning() {
  return (
    <>
      <PageSEO
        title="Teeth Cleaning in Garden Grove, CA | Dental Cleanings | Uplift Dental"
        description="Professional teeth cleanings and dental exams at Uplift Dental in Garden Grove, CA. New patient special: $99 Adult Exam & X-rays. Denti-Cal accepted. Call {PRACTICE.phone.display}."
        canonical="https://upliftdental.com/teeth-cleaning"
      />
      <div className="min-h-screen bg-[oklch(0.99_0.003_90)]">
        <BreadcrumbSchema items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Services", url: "https://upliftdental.com/services" },
          { name: "Teeth Cleaning", url: "https://upliftdental.com/teeth-cleaning" },
        ]} />
        <Navbar />

        {/* Hero */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
              Teeth Cleaning<br />in Garden Grove, CA
            </h1>
            <p className="font-body text-white/85 text-xl leading-relaxed mb-6">
              Professional dental cleanings are the foundation of a healthy smile. At Uplift Dental, we make every cleaning thorough, comfortable, and affordable — with a new patient special of just $99 for exam, X-rays, and cleaning.
            </p>
            <div className="inline-block bg-white/20 border border-white/30 rounded-2xl px-6 py-3 mb-8">
              <p className="font-body font-bold text-white text-lg">New Patient Special: $99 Adult Exam + X-rays</p>
              <p className="font-body text-white/70 text-sm">No insurance required · Denti-Cal accepted</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-full font-body font-bold text-lg shadow-xl hover:bg-white/90 transition-all" style={{ color: COLORS.tealDark }}>
                <Phone className="w-5 h-5" /> Call {PRACTICE.phone.display}
              </a>
              <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 border-2 border-white/50 text-white rounded-full font-body font-bold text-lg hover:bg-white/30 transition-all">
                <Calendar className="w-5 h-5" /> Book Appointment
              </Link>
            </div>
          </div>
        </section>

        {/* Why Cleanings Matter */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl mb-6" style={{ color: COLORS.tealDark }}>Why Regular Cleanings Are Essential</h2>
                <p className="font-body text-gray-600 leading-relaxed mb-5">
                  Even with excellent brushing and flossing at home, plaque and tartar build up in areas that are impossible to reach with a toothbrush. Professional cleanings remove this buildup before it causes cavities, gum disease, and bone loss.
                </p>
                <p className="font-body text-gray-600 leading-relaxed mb-8">
                  Research consistently links oral health to overall health. Untreated gum disease is associated with heart disease, diabetes, stroke, and pregnancy complications. A twice-yearly cleaning is one of the most important investments you can make in your total health.
                </p>
                <div className="space-y-3">
                  {[
                    "Prevents cavities and gum disease",
                    "Removes tartar that brushing can't reach",
                    "Freshens breath",
                    "Detects problems early when they're easiest to treat",
                    "Polishes teeth for a brighter appearance",
                    "Reduces risk of systemic health complications",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3 font-body text-gray-700">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.teal }} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-2xl mb-4" style={{ color: COLORS.tealDark }}>Types of Dental Cleanings</h3>
                {[
                  { name: "Routine Prophylaxis", desc: "The standard cleaning for patients with healthy gums. Removes plaque, tartar, and surface stains. Recommended every 6 months.", tag: "Most common" },
                  { name: "Deep Cleaning (Scaling & Root Planing)", desc: "For patients with gum disease. Cleans below the gumline to remove bacteria from tooth roots. Often completed in 2 appointments.", tag: "For gum disease" },
                  { name: "Periodontal Maintenance", desc: "For patients who have been treated for gum disease. More frequent cleanings (every 3–4 months) to keep disease from returning.", tag: "Ongoing care" },
                  { name: "Pediatric Cleaning", desc: "Gentle cleanings designed for children, with fluoride treatment and sealants as needed. New patient special: $79.", tag: "Ages 2–17" },
                ].map((type) => (
                  <div key={type.name} className="bg-[oklch(0.97_0.008_192)] rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-body font-semibold text-gray-800">{type.name}</h4>
                      <span className="font-body text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 text-white" style={{ backgroundColor: COLORS.teal }}>{type.tag}</span>
                    </div>
                    <p className="font-body text-sm text-gray-500 leading-relaxed">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-20 bg-[oklch(0.97_0.008_192)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl" style={{ color: COLORS.tealDark }}>What Happens During a Cleaning?</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {[
                { step: "01", title: "Medical History Review", desc: "We update your health history and note any changes since your last visit." },
                { step: "02", title: "Oral Exam", desc: "Dr. Stefan or a hygienist checks for cavities, gum disease, oral cancer signs, and bite issues." },
                { step: "03", title: "X-rays", desc: "Digital X-rays detect problems between teeth and below the gumline that aren't visible to the eye." },
                { step: "04", title: "Scaling & Polishing", desc: "Tartar and plaque are removed with specialized instruments, then teeth are polished to remove surface stains." },
                { step: "05", title: "Fluoride & Education", desc: "Fluoride treatment strengthens enamel. We review your home care routine and answer any questions." },
              ].map((s) => (
                <div key={s.step} className="bg-white rounded-2xl p-5 border border-gray-100 text-center">
                  <div className="font-display text-3xl font-bold mb-2" style={{ color: COLORS.teal, opacity: 0.4 }}>{s.step}</div>
                  <h3 className="font-display text-base mb-2" style={{ color: COLORS.tealDark }}>{s.title}</h3>
                  <p className="font-body text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-4xl mb-6" style={{ color: COLORS.tealDark }}>Insurance & Payment Options</h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-8">
              We accept most PPO dental insurance plans, Denti-Cal (Medi-Cal Dental), and military/Tricare insurance. Most insurance plans cover two cleanings per year at 100% — meaning your cleaning may be completely free with insurance.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: "Denti-Cal Accepted", desc: "We proudly serve Medi-Cal patients. Bring your Denti-Cal card and we'll handle the rest." },
                { title: "Most PPO Plans", desc: "We work with most major dental insurance providers. Call us to verify your coverage." },
                { title: "No Insurance? No Problem", desc: "New patient special: $99 adult exam + X-rays. Cherry 0% financing available." },
              ].map((item) => (
                <div key={item.title} className="bg-[oklch(0.97_0.008_192)] rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl text-white mb-4">Schedule Your Cleaning Today</h2>
            <p className="font-body text-white/75 text-lg mb-8">Professional cleanings remove tartar buildup that brushing can't reach — protecting your teeth and gums from decay and disease. Combined with a thorough exam and X-rays, your cleaning appointment is your best defense against cavities and gum disease. Schedule your cleaning today and keep your smile healthy for life.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-full font-body font-bold text-lg" style={{ color: COLORS.tealDark }}>
                <Phone className="w-5 h-5" /> Call {PRACTICE.phone.display}
              </a>
              <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 border-2 border-white/50 text-white rounded-full font-body font-bold text-lg hover:bg-white/30 transition-all">
                Book Online
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center mb-12" style={{ color: COLORS.tealDark }}>Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div key="{0}" className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">How often should I get my teeth cleaned?</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">Most adults benefit from a professional cleaning every 6 months. Patients with a history of gum disease, heavy tartar buildup, or certain medical conditions (such as diabetes) may need cleanings every 3–4 months. We'll recommend the right schedule based on your individual oral health.</p>
                </div>
              <div key="{1}" className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">What's the difference between a regular cleaning and a deep cleaning?</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">A regular (prophylaxis) cleaning removes plaque and tartar from above and just below the gumline — it's preventive maintenance for healthy gums. A deep cleaning (scaling and root planing) is a therapeutic procedure for patients with gum disease, reaching bacteria and tartar deposits several millimeters below the gumline. Dr. Barragan, our periodontist, performs deep cleanings when needed.</p>
                </div>
              <div key="{2}" className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">Does teeth cleaning hurt?</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">For most patients with healthy gums, a cleaning is comfortable with only mild pressure or scraping sensations. If you have sensitive teeth or inflamed gums, there may be some discomfort. We can apply a topical numbing gel beforehand and always adjust our approach to keep you comfortable.</p>
                </div>
              <div key="{3}" className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">Will cleaning remove stains and whiten my teeth?</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">Professional cleaning removes surface stains from coffee, tea, and wine — leaving your teeth noticeably cleaner and brighter. However, it's not the same as whitening treatment. If you want a more dramatic color change, we offer in-office whitening and take-home whitening kits.</p>
                </div>
              <div key="{4}" className="border-b border-gray-100 pb-6">
                  <h3 className="font-body font-semibold text-gray-800 mb-2">What happens if I skip my cleanings?</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">Skipping cleanings allows plaque to harden into tartar, which can only be removed professionally. Over time, tartar buildup leads to gum disease, bone loss, and eventually tooth loss. Untreated gum disease is also linked to increased risk of heart disease, diabetes complications, and stroke.</p>
                </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
