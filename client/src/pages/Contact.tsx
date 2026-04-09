/* ============================================================
   UPLIFT DENTAL — Contact Page
   Design: Booking form FIRST, then info. Short form: name, phone, service only.
   ============================================================= */
import { useState, useRef } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Calendar, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";

const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/PATTERN-02_5ffa36bf.jpg";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "84b33306-8bd2-4e29-bbbc-0da57a4292dc",
          subject: "New Appointment Request — Uplift Dental",
          from_name: formData.name,
          name: formData.name,
          phone: formData.phone,
          service: formData.service || "Not specified",
          time: new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      setError(`Something went wrong. Please call us at ${PRACTICE.phone.display} or try again.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageSEO
        title=`Contact Uplift Dental & Orthodontics | ${PRACTICE.address.city}, ${PRACTICE.address.state} ${PRACTICE.address.zip}`
        description=`Contact Uplift Dental & Orthodontics at ${PRACTICE.address.full}. Call ${PRACTICE.phone.display} or text ${PRACTICE.sms.display}. Book online 24/7. Same-day emergency appointments available.`
        canonical="https://upliftdental.com/contact"
      />
      <div className="min-h-screen flex flex-col bg-white">
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://upliftdental.com/" },
        { name: "Contact", url: "https://upliftdental.com/contact" },
      ]} />
      <Navbar />

      {/* Hero */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "500px auto" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.73 0.07 200)" }}>Get In Touch</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-5">Book Your Appointment</h1>
          <p className="font-body text-white/75 text-xl max-w-xl mx-auto">
            Free consultations for new patients. Same-day emergency care available.
          </p>
        </div>
      </section>

      {/* Emergency Banner */}
      <div className="py-4" style={{ backgroundColor: COLORS.teal }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="font-body font-semibold text-white">Dental Emergency? Same-day appointments available.</p>
          <a href={PRACTICE.phone.tel}>
            <button className="flex items-center gap-2 px-5 py-2 rounded-full font-body font-bold bg-white text-sm transition-all hover:shadow-md" style={{ color: COLORS.tealDark }}>
              <Phone className="w-4 h-4" />
              Call {PRACTICE.phone.display} Now
            </button>
          </a>
        </div>
      </div>

      {/* Main Content — FORM FIRST */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-14">

            {/* LEFT: Booking Form (3 cols) */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl p-8 border shadow-sm" style={{ backgroundColor: COLORS.tealPale, borderColor: "oklch(0.90 0.02 192)" }}>
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${COLORS.teal}20` }}>
                      <CheckCircle className="w-10 h-10" style={{ color: COLORS.teal }} />
                    </div>
                    <h3 className="font-display text-3xl font-bold mb-3" style={{ color: COLORS.tealDark }}>Thank You!</h3>
                    <p className="font-body text-gray-600 text-lg mb-2">Your appointment request has been received.</p>
                    <p className="font-body text-gray-500">We'll contact you within 1 business day to confirm. For urgent needs, call <a href={PRACTICE.phone.tel} className="font-semibold" style={{ color: COLORS.teal }}>{PRACTICE.phone.display}</a>.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-3xl font-bold mb-2" style={{ color: COLORS.tealDark }}>Request an Appointment</h2>
                    <p className="font-body text-gray-500 mb-6">Free consultations for new patients. We'll confirm within 1 business day.</p>
                    {error && (
                      <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-body text-sm">{error}</div>
                    )}
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:ring-2 bg-white transition-all"
                          style={{ borderColor: "oklch(0.90 0.02 192)" }}
                          placeholder="Jane Smith"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:ring-2 bg-white transition-all"
                          style={{ borderColor: "oklch(0.90 0.02 192)" }}
                          placeholder="(714) 000-0000"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-4 rounded-xl font-body font-bold text-white text-base transition-all hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{ backgroundColor: COLORS.teal }}
                      >
                        <Calendar className="w-5 h-5" />
                        {sending ? "Sending Request..." : "Request Appointment"}
                      </button>
                      <p className="font-body text-xs text-center text-gray-400">
                        We respond within 1 business day. For emergencies, call <a href={PRACTICE.phone.tel} className="font-semibold" style={{ color: COLORS.teal }}>{PRACTICE.phone.display}</a> directly.
                      </p>
                      <p className="font-body text-xs text-center text-gray-400 leading-relaxed border-t border-gray-200 pt-3">
                        <strong className="text-gray-600">Privacy Notice:</strong> Do not include sensitive health information (symptoms, diagnoses, or treatment details) in this form. This form is not encrypted for protected health information (PHI). For confidential matters, please call us directly at {PRACTICE.phone.display}.
                      </p>
                    </form>
                  </>
                )}
              </div>

              {/* Quick Contact Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <a href={PRACTICE.phone.tel} className="flex items-center justify-center gap-2 py-4 rounded-2xl font-body font-bold text-white text-sm transition-all hover:opacity-90 shadow-md" style={{ backgroundColor: COLORS.teal }}>
                  <Phone className="w-4 h-4" />
                  Call {PRACTICE.phone.display}
                </a>
                <a href={SMS.general} className="flex items-center justify-center gap-2 py-4 rounded-2xl font-body font-bold text-sm border-2 transition-all hover:shadow-md" style={{ borderColor: COLORS.teal, color: COLORS.teal }}>
                  <MessageSquare className="w-4 h-4" />
                  Text {PRACTICE.sms.display}
                </a>
              </div>
            </div>

            {/* RIGHT: Practice Info (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold mb-5" style={{ color: COLORS.tealDark }}>Practice Information</h2>
                <div className="space-y-5">
                  {[
                    {
                      icon: Phone,
                      label: "Phone",
                      content: <a href={PRACTICE.phone.tel} className="font-body font-semibold text-gray-800 hover:underline">{PRACTICE.phone.display}</a>,
                    },
                    {
                      icon: MessageSquare,
                      label: "Text Us",
                      content: <a href={SMS.general} className="font-body font-semibold text-gray-800 hover:underline">{PRACTICE.sms.display}</a>,
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      content: <a href="mailto:Info@UpliftDental.com" className="font-body text-gray-800 hover:underline">Info@UpliftDental.com</a>,
                    },
                    {
                      icon: MapPin,
                      label: "Address",
                      content: (
                        <div>
                          <p className="font-body text-gray-800">{PRACTICE.address.street}</p>
                          <p className="font-body text-gray-800">{PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}</p>
                          <a href="https://maps.google.com/?q=5253+Lampson+Ave+Garden+Grove+CA+92845" target="_blank" rel="noopener noreferrer" className="text-sm font-body font-semibold mt-1 inline-block" style={{ color: COLORS.teal }}>
                            Get Directions &rarr;
                          </a>
                        </div>
                      ),
                    },
                    {
                      icon: Clock,
                      label: "Office Hours",
                      content: (
                        <div className="space-y-1">
                          <p className="font-body text-gray-800">Mon &ndash; Fri: 9:00 AM &ndash; 5:00 PM</p>
                          <p className="font-body text-gray-800">3rd Saturday: 9:00 AM &ndash; 2:00 PM</p>
                          <p className="font-body text-gray-500 text-sm">Sunday: Closed</p>
                        </div>
                      ),
                    },
                  ].map(({ icon: Icon, label, content }) => (
                    <div key={label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLORS.teal}15` }}>
                        <Icon className="w-5 h-5" style={{ color: COLORS.teal }} />
                      </div>
                      <div>
                        <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                        {content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insurance */}
              <div className="rounded-2xl p-5 border" style={{ backgroundColor: COLORS.tealPale, borderColor: "oklch(0.90 0.02 192)" }}>
                <h3 className="font-display font-semibold text-lg mb-3" style={{ color: COLORS.tealDark }}>Insurance We Accept</h3>
                <div className="space-y-1.5">
                  {["Denti-Cal", "United Healthcare Dental", "Concordia Dental", "Cigna Dental", "MetLife", "Delta Dental", "Aetna", "Anthem Blue Cross", "Ameritas", "Military / Tricare", "Most PPO Plans"].map((ins) => (
                    <div key={ins} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" style={{ color: COLORS.teal }} />
                      <span className="font-body text-sm text-gray-700">{ins}</span>
                    </div>
                  ))}
                </div>
                <p className="font-body text-xs text-gray-500 mt-3">Cherry &amp; CareCredit financing also available.</p>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border h-56" style={{ borderColor: "oklch(0.90 0.02 192)" }}>
                <iframe
                  title="Uplift Dental & Orthodontics Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.2!2d-117.9945!3d33.7739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s5253+Lampson+Ave%2C+Garden+Grove%2C+CA+92845!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="py-12" style={{ backgroundColor: COLORS.tealPale }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold mb-3" style={{ color: COLORS.tealDark }}>Serving All of Orange County</h2>
          <p className="font-body text-gray-600 mb-2">Located near Great Wolf Lodge and Garden Grove Park, Uplift Dental is easy to find and convenient to reach.</p>
          <p className="font-body text-gray-600 mb-6">Patients travel from across the region to experience the Uplift Dental difference.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Garden Grove", "Seal Beach", "Los Alamitos", "Huntington Beach", "Westminster", "Anaheim", "Cypress", "Stanton", "Buena Park", "Rossmoor", "Long Beach", "Fountain Valley"].map((city) => (
              <span key={city} className="px-4 py-2 rounded-full font-body text-sm font-medium bg-white border" style={{ borderColor: "oklch(0.90 0.02 192)", color: COLORS.tealDark }}>
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
