import { MapPin, Clock, Users, CheckCircle, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PRACTICE, COLORS } from "@/lib/constants";
import { trackSchedule } from "@/lib/tracking";

const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/pattern-02-optimized_1e03ef22.jpg";

export default function InvisalignSealBeach() {
  const handleEnroll = () => {
    trackSchedule();
    window.location.href = "/contact";
  };

  return (
    <>
      <PageSEO
        title="Invisalign in Seal Beach, CA | Clear Aligners Near You"
        description="Get Invisalign clear aligners in Seal Beach, CA. Discreet teeth straightening from Uplift Dental. Free consultation. Flexible payment plans available."
        canonical="https://upliftdental.com/invisalign-seal-beach"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Invisalign", url: "https://upliftdental.com/invisalign" },
          { name: "Invisalign in Seal Beach", url: "https://upliftdental.com/invisalign-seal-beach" },
        ]}
      />
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative py-24 text-white overflow-hidden"
        style={{ backgroundColor: COLORS.tealDark }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "500px auto" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Invisalign in Seal Beach
              </h1>
              <p className="font-body text-xl text-white/90 mb-8">
                Achieve your perfect smile with clear aligners from Uplift Dental. Discreet, comfortable, and proven to work. Serving Seal Beach and nearby communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleEnroll}
                  className="rounded-full px-8 py-4 text-base font-bold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "#FFA500" }}
                >
                  Free Invisalign Consultation
                </button>
                <a
                  href={`tel:${PRACTICE.phone.tel}`}
                  onClick={trackSchedule}
                  className="rounded-full px-8 py-4 text-base font-bold border-2 border-white text-white hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
                >
                  Call Now
                </a>
              </div>
              <p className="font-body text-sm text-white/70 mt-6">
                ✓ No insurance required • ✓ Flexible payment plans • ✓ Same-day consultations available
              </p>
            </div>
            <div className="hidden md:block">
              <div
                className="rounded-2xl p-8 text-center"
                style={{ backgroundColor: `${COLORS.teal}20`, borderColor: COLORS.teal, borderWidth: "2px" }}
              >
                <div className="text-6xl font-bold mb-4" style={{ color: "#FFA500" }}>
                  6-18
                </div>
                <p className="font-body text-lg text-white mb-6">Months to Your Perfect Smile</p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: "#FFA500" }} />
                    <span className="font-body text-white/90">Nearly invisible aligners</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: "#FFA500" }} />
                    <span className="font-body text-white/90">Removable for eating & cleaning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: "#FFA500" }} />
                    <span className="font-body text-white/90">Comfortable & effective</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-4 text-center"
            style={{ color: COLORS.tealDark }}
          >
            Why Seal Beach Patients Choose Uplift Dental
          </h2>
          <p className="font-body text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            We're conveniently located near Seal Beach with proven expertise in Invisalign treatment. Over 500+ patients have transformed their smiles with us.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Close to Home",
                desc: "Just minutes from Seal Beach. Easy parking and convenient appointment times.",
              },
              {
                icon: Clock,
                title: "Fast Results",
                desc: "Most treatments complete in 6-18 months. See results in weeks, not years.",
              },
              {
                icon: Users,
                title: "Expert Team",
                desc: "Certified Invisalign provider with 15+ years of orthodontic experience.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="text-center p-8 rounded-2xl" style={{ backgroundColor: COLORS.tealPale }}>
                  <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: COLORS.teal }} />
                  <h3
                    className="font-display text-2xl font-bold mb-3"
                    style={{ color: COLORS.tealDark }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-body text-gray-700">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: COLORS.tealPale }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display text-4xl font-bold mb-16 text-center"
            style={{ color: COLORS.tealDark }}
          >
            Your Invisalign Journey
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Consultation", desc: "Free 3D scan & treatment plan" },
              { step: "2", title: "Custom Aligners", desc: "Personalized aligners created" },
              { step: "3", title: "Wear & Progress", desc: "Change aligners every 7-10 days" },
              { step: "4", title: "Beautiful Smile", desc: "Enjoy your transformed smile" },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div
                  className="rounded-2xl p-6 text-center h-full"
                  style={{ backgroundColor: "white", borderColor: COLORS.teal, borderWidth: "2px" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg"
                    style={{ backgroundColor: COLORS.teal }}
                  >
                    {item.step}
                  </div>
                  <h3
                    className="font-display text-xl font-bold mb-2"
                    style={{ color: COLORS.tealDark }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-body text-gray-600 text-sm">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6" style={{ color: COLORS.teal }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display text-4xl font-bold mb-4 text-center"
            style={{ color: COLORS.tealDark }}
          >
            Affordable Invisalign Pricing
          </h2>
          <p className="font-body text-lg text-gray-600 text-center mb-12">
            Flexible payment plans to fit your budget. Most insurance accepted.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="rounded-2xl p-8 border-2"
              style={{ borderColor: COLORS.teal, backgroundColor: `${COLORS.teal}08` }}
            >
              <h3
                className="font-display text-2xl font-bold mb-4"
                style={{ color: COLORS.tealDark }}
              >
                Standard Pricing
              </h3>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold" style={{ color: COLORS.tealDark }}>
                  $3,500
                </span>
                <span className="font-body text-gray-600 ml-2">— $8,000</span>
              </div>
              <p className="font-body text-gray-700 mb-6">
                Depending on complexity and treatment duration. Most cases fall in the $4,500–$6,500 range.
              </p>
              <ul className="space-y-3">
                {[
                  "Custom treatment plan",
                  "All aligners included",
                  "Regular check-ins",
                  "Refinements if needed",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: COLORS.teal }} />
                    <span className="font-body text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl p-8 border-2"
              style={{ borderColor: COLORS.teal, backgroundColor: `${COLORS.teal}08` }}
            >
              <h3
                className="font-display text-2xl font-bold mb-4"
                style={{ color: COLORS.tealDark }}
              >
                Payment Options
              </h3>
              <ul className="space-y-4">
                {[
                  { title: "Monthly Plans", desc: "$150–$300/month (12–36 months)" },
                  { title: "Insurance", desc: "Most PPO & HMO plans accepted" },
                  { title: "Membership", desc: "20% off with Uplift Dental membership" },
                  { title: "FSA/HSA", desc: "Use pre-tax dollars to pay" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <h4
                      className="font-display font-bold"
                      style={{ color: COLORS.tealDark }}
                    >
                      {item.title}
                    </h4>
                    <p className="font-body text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ backgroundColor: COLORS.tealPale }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display text-4xl font-bold mb-16 text-center"
            style={{ color: COLORS.tealDark }}
          >
            What Seal Beach Patients Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                location: "Seal Beach",
                text: "I was nervous about Invisalign, but the team at Uplift Dental made it so easy. My teeth are straight and nobody even knew I was wearing aligners!",
                rating: 5,
              },
              {
                name: "James T.",
                location: "Seal Beach",
                text: "Great experience from start to finish. The office is close to home, and the staff is incredibly friendly. Highly recommend!",
                rating: 5,
              },
              {
                name: "Michelle R.",
                location: "Seal Beach",
                text: "Best investment I've made in myself. My smile is completely transformed. The payment plan made it affordable.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-8 bg-white shadow-md"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: "#FFA500" }} />
                  ))}
                </div>
                <p className="font-body text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-display font-bold" style={{ color: COLORS.tealDark }}>
                    {testimonial.name}
                  </p>
                  <p className="font-body text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display text-4xl font-bold mb-12 text-center"
            style={{ color: COLORS.tealDark }}
          >
            Invisalign FAQs
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "How long does Invisalign treatment take?",
                a: "Most treatments take 6–18 months, depending on the complexity of your case. We'll give you a personalized timeline during your consultation.",
              },
              {
                q: "Is Invisalign painful?",
                a: "No. Invisalign is comfortable. You may feel slight pressure when you switch to a new aligner, but it's not painful.",
              },
              {
                q: "Can I eat and drink with my aligners in?",
                a: "Remove your aligners before eating or drinking anything except water. This keeps them clean and prevents staining.",
              },
              {
                q: "How often do I need to visit the office?",
                a: "You'll visit every 4–6 weeks for progress checks. Most appointments are quick (15–20 minutes).",
              },
              {
                q: "Does insurance cover Invisalign?",
                a: "Many insurance plans cover a portion of Invisalign. We'll verify your coverage and help you maximize your benefits.",
              },
            ].map((faq, idx) => (
              <div key={idx}>
                <h3
                  className="font-display font-bold text-lg mb-2"
                  style={{ color: COLORS.tealDark }}
                >
                  {faq.q}
                </h3>
                <p className="font-body text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white" style={{ backgroundColor: COLORS.tealDark }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-5xl font-bold mb-6">
            Ready for Your Perfect Smile?
          </h2>
          <p className="font-body text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Schedule your free Invisalign consultation today. No obligation, no pressure—just expert advice tailored to your smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleEnroll}
              className="rounded-full px-8 py-4 text-base font-bold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#FFA500" }}
            >
              Book Free Consultation
            </button>
            <a
              href={`tel:${PRACTICE.phone.tel}`}
              onClick={trackSchedule}
              className="rounded-full px-8 py-4 text-base font-bold border-2 border-white text-white hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
            >
              Call (714) 898-3308
            </a>
          </div>
          <p className="font-body text-sm text-white/70 mt-8">
            Serving Seal Beach, Los Alamitos, Cypress, Anaheim, and surrounding areas. <Link href="/invisalign" className="underline hover:text-white/60 transition-colors">Learn more about our Invisalign services →</Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
