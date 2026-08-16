/* ============================================================
   UPLIFT DENTAL — Patient Portal Page
   Explains what patients can do through CareStack and encourages adoption.
   ============================================================= */
import { Calendar, ClipboardList, CreditCard, FileText, Clock, Shield, ExternalLink, Smartphone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PRACTICE, COLORS } from "@/lib/constants";
import { trackSchedule } from "@/lib/tracking";

const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/pattern-02-optimized_1e03ef22.jpg";
const CARESTACK_URL = "https://patientportal.carestack.com/?dn=uplift/#/online-appointments/select-reason";

const portalFeatures = [
  {
    icon: Calendar,
    title: "Schedule Appointments",
    description: "Book, reschedule, or cancel appointments 24/7 without calling. Choose your preferred provider, date, and time slot.",
  },
  {
    icon: ClipboardList,
    title: "Complete Intake Forms",
    description: "Fill out new patient paperwork online before your visit. Save time at check-in and ensure we have your complete health history.",
  },
  {
    icon: FileText,
    title: "View Treatment Plans",
    description: "Review recommended treatments, understand procedures, and see estimated costs — all in one place.",
  },
  {
    icon: CreditCard,
    title: "Pay Bills Online",
    description: "View statements, make payments, and set up payment plans from the comfort of your home. Secure and convenient.",
  },
  {
    icon: Clock,
    title: "Appointment Reminders",
    description: "Receive automatic text and email reminders so you never miss an appointment. Confirm or reschedule with one tap.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Use the CareStack patient portal for secure account access. Review the portal's privacy information and contact our office with any account or privacy questions.",
  },
];

const steps = [
  { step: "1", title: "Visit the Portal", description: "Click the button below or visit our patient portal link." },
  { step: "2", title: "Create Your Account", description: "Enter your name, email, and phone number to register." },
  { step: "3", title: "Book or Manage", description: "Schedule appointments, complete forms, or pay bills online." },
];

export default function PatientPortal() {
  return (
    <>
      <PageSEO
        title="Patient Portal | Online Booking & Records | Uplift Dental"
        description="Access the Uplift Dental patient portal to book appointments online, complete intake forms, view treatment plans, and pay bills securely. Available 24/7."
        canonical="https://upliftdental.com/patient-portal"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://upliftdental.com/" }, { name: "Patient Portal", url: "https://upliftdental.com/patient-portal" }]} />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "500px auto" }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.73 0.07 200)" }}>Patient Portal</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-5">Your Dental Care,<br />At Your Fingertips</h1>
            <p className="font-body text-white/75 text-xl max-w-2xl mx-auto mb-8">
              Manage appointments, complete paperwork, and access your records — anytime, anywhere. No phone call needed.
            </p>
            <a
              href={CARESTACK_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-body font-bold text-lg text-white transition-all hover:shadow-xl hover:scale-105 active:scale-95"
              style={{ backgroundColor: COLORS.teal }}
            >
              <ExternalLink className="w-5 h-5" />
              Open Patient Portal
            </a>
          </div>
        </section>

        {/* What You Can Do Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="font-body text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: COLORS.teal }}>Portal Features</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: COLORS.tealDark }}>What You Can Do Online</h2>
              <p className="font-body text-gray-500 mt-3 max-w-xl mx-auto">Everything you need to manage your dental care — without picking up the phone.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {portalFeatures.map((feature) => (
                <div key={feature.title} className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-teal-100 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${COLORS.teal}15` }}>
                    <feature.icon className="w-6 h-6" style={{ color: COLORS.teal }} />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2" style={{ color: COLORS.tealDark }}>{feature.title}</h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20" style={{ backgroundColor: COLORS.tealPale }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="font-body text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: COLORS.teal }}>Getting Started</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: COLORS.tealDark }}>How It Works</h2>
              <p className="font-body text-gray-500 mt-3">Get set up in under 2 minutes.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-display text-xl font-bold" style={{ backgroundColor: COLORS.teal }}>
                    {s.step}
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2" style={{ color: COLORS.tealDark }}>{s.title}</h3>
                  <p className="font-body text-sm text-gray-600">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Access Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8" style={{ backgroundColor: COLORS.tealDark }}>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.teal}30` }}>
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-display text-2xl font-bold text-white mb-2">Works on Any Device</h3>
                <p className="font-body text-white/70 mb-4">Access the patient portal from your phone, tablet, or computer. No app download required — it works right in your browser.</p>
                <a
                  href={CARESTACK_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-bold text-sm text-white transition-all hover:shadow-lg hover:opacity-90"
                  style={{ backgroundColor: COLORS.teal }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Portal Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.005 192)" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold" style={{ color: COLORS.tealDark }}>Common Questions</h2>
            </div>
            <div className="space-y-6">
              {[
                { q: "Is the patient portal free to use?", a: "Yes! The portal is completely free for all Uplift Dental patients. There are no fees to create an account or use any features." },
                { q: "Can I book appointments for my family members?", a: "Yes. You can manage appointments for your children or family members linked to your account. Just select the correct patient when booking." },
                { q: "What if I need to cancel or reschedule?", a: "You can cancel or reschedule directly through the portal up to 24 hours before your appointment. For same-day changes, please call us at " + PRACTICE.phone.display + "." },
                { q: "Is my information secure?", a: "The CareStack patient portal is used for secure account access. Review the portal's privacy information and call our office with questions about your account or records." },
                { q: "Do I still need to call for emergencies?", a: "Yes. For dental emergencies (severe pain, knocked-out tooth, swelling), please call " + PRACTICE.phone.display + " directly for same-day care." },
              ].map((item) => (
                <div key={item.q} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-display text-base font-bold mb-2" style={{ color: COLORS.tealDark }}>{item.q}</h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16" style={{ backgroundColor: COLORS.teal }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto">Join thousands of patients who manage their dental care online. It only takes 2 minutes to set up.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CARESTACK_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base transition-all hover:shadow-xl hover:scale-105 active:scale-95 bg-white"
                style={{ color: COLORS.tealDark }}
              >
                <ExternalLink className="w-5 h-5" />
                Open Patient Portal
              </a>
              <a
                href={PRACTICE.phone.tel}
                onClick={trackSchedule}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-white border-2 border-white/40 transition-all hover:bg-white/10"
              >
                Need Help? Call {PRACTICE.phone.display}
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
