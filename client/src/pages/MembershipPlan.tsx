import { Check, DollarSign, Clock, Users, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PRACTICE, COLORS } from "@/lib/constants";
import { trackSchedule } from "@/lib/tracking";

const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/pattern-02-optimized_1e03ef22.jpg";

export default function MembershipPlan() {
  const [, navigate] = useLocation();
  const handleEnroll = () => navigate("/contact");

  const plans = [
    {
      name: "Adult Complete",
      ages: "Ages 14+",
      price: "$39",
      period: "/month",
      annual: "$468/year",
      savings: "Save $202/year!",
      desc: "Essential preventive care for adults",
      features: [
        "2 Professional Cleanings & Checkups",
        "2 Regular Exams & Screenings",
        "Routine X-rays",
        "1 Emergency Exam",
        "15% off all procedures at our practice",
      ],
      highlight: false,
    },
    {
      name: "Perio",
      ages: "Ages 14+",
      price: "$55",
      period: "/month",
      annual: "$660/year",
      savings: "Save $299/year!",
      desc: "Enhanced care for patients with gum disease",
      features: [
        "3 Periodontal Maintenances",
        "2 Annual Exams & Screenings",
        "Routine X-rays",
        "1 Emergency Exam",
        "15% off all procedures at our practice",
      ],
      highlight: true,
    },
  ];

  const faqs = [
    {
      q: "What forms of payment are accepted?",
      a: "All forms of credit and debit cards including Visa, Mastercard, Discover, and American Express.",
    },
    {
      q: "When can I start using my membership?",
      a: "Your membership is effective immediately — no waiting periods! Schedule your appointment today by calling our office or booking online.",
    },
    {
      q: "How can I use my member-exclusive discount for treatment?",
      a: "Simply schedule an appointment and let us know you're a member. When you arrive, we'll confirm your membership is current and you'll be eligible for instant savings off our regular fees.",
    },
    {
      q: "Can I add family members to my account?",
      a: "Absolutely! Your entire family can join. Each member gets their own plan at the same rate.",
    },
    {
      q: "Can I transfer my membership to another dentist?",
      a: "Your membership is solely with Uplift Dental & Orthodontics and is non-transferrable.",
    },
  ];

  return (
    <>
      <PageSEO
        title="Dental Savings Plan | No Insurance Needed | Uplift Dental Garden Grove"
        description="No dental insurance? No problem. Our in-house dental savings plan starts at $39/month. Save $202+ per year on cleanings, exams, and treatments. No waiting periods."
        canonical="https://upliftdental.com/membership-plan"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://upliftdental.com/" },
          { name: "Dental Savings Plan", url: "https://upliftdental.com/membership-plan" },
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-20 text-white overflow-hidden"
        style={{ backgroundColor: COLORS.tealDark }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "500px auto" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-4">No Dental Insurance?</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            We Have You Covered
          </h1>
          <p className="font-body text-xl text-white/85 max-w-2xl mx-auto mb-4">
            With Our In-House Dental Savings Plans!
          </p>
          <p className="font-body text-base text-white/70 max-w-xl mx-auto">
            For less than two dollars a day, get access to discounted services, plus free exams, X-rays, and cleanings. No insurance needed. No waiting periods.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-4"
              style={{ color: COLORS.tealDark }}
            >
              Choose a Care Plan That Best Fits Your Needs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 border-2 transition-all ${
                  plan.highlight ? "shadow-xl" : "shadow-md"
                }`}
                style={{
                  borderColor: plan.highlight ? COLORS.teal : "oklch(0.90 0.02 192)",
                  backgroundColor: plan.highlight ? `${COLORS.teal}08` : "white",
                }}
              >
                {plan.highlight && (
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ backgroundColor: `${COLORS.teal}20`, color: COLORS.teal }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <h3
                  className="font-display text-3xl font-bold mb-1"
                  style={{ color: COLORS.tealDark }}
                >
                  {plan.name}
                </h3>
                <p className="font-body text-sm text-gray-500 mb-1">{plan.ages}</p>
                <p className="font-body text-sm text-gray-600 mb-6">{plan.desc}</p>

                <div className="mb-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="font-display text-5xl font-bold"
                      style={{ color: COLORS.tealDark }}
                    >
                      {plan.price}
                    </span>
                    <span className="font-body text-gray-600 text-sm">{plan.period}</span>
                  </div>
                  <p className="font-body text-xs text-gray-500">{plan.annual}</p>
                </div>

                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-6"
                  style={{ backgroundColor: "oklch(0.95 0.05 145)", color: "oklch(0.35 0.12 145)" }}
                >
                  {plan.savings}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: COLORS.teal }} />
                      <span className="font-body text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleEnroll}
                  className="w-full py-3 rounded-xl font-body font-bold text-sm transition-all hover:opacity-90"
                  style={{
                    backgroundColor: plan.highlight ? COLORS.teal : `${COLORS.teal}15`,
                    color: plan.highlight ? "white" : COLORS.teal,
                  }}
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16" style={{ backgroundColor: COLORS.tealPale }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display text-3xl font-bold mb-10 text-center"
            style={{ color: COLORS.tealDark }}
          >
            Why Our Members Love It
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: DollarSign, title: "Real Savings", desc: "Save $200+ per year vs. paying out of pocket." },
              { icon: Clock, title: "No Waiting Period", desc: "Membership is active immediately. Use it on day one." },
              { icon: Shield, title: "No Contracts", desc: "Cancel anytime. No penalties or hidden fees." },
              { icon: Users, title: "Whole Family", desc: "Each family member can join at the same rate." },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${COLORS.teal}15` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: COLORS.teal }} />
                </div>
                <h3 className="font-display text-base font-bold mb-1" style={{ color: COLORS.tealDark }}>{item.title}</h3>
                <p className="font-body text-sm text-gray-600">{item.desc}</p>
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
            Dental Savings Plan FAQs
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-6">
                <h3
                  className="font-display font-bold text-lg mb-2"
                  style={{ color: COLORS.tealDark }}
                >
                  {faq.q}
                </h3>
                <p className="font-body text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: COLORS.tealDark }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-4xl text-white mb-2">New Patients Welcome</h2>
          <p className="font-body text-white/80 mb-8">
            Emergency appointments available. Call or book online today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PRACTICE.phone.tel}
              onClick={trackSchedule}
              className="rounded-full px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2 transition-all"
              style={{ backgroundColor: "white", color: COLORS.tealDark }}
            >
              Call Now
            </a>
            <Link
              href="/contact"
              onClick={trackSchedule}
              className="rounded-full px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2 text-white border-2 border-white hover:bg-white/10 transition-all"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
