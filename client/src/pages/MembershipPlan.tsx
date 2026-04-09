import { Check, Phone, MessageSquare, Zap, Heart, Gift } from "lucide-react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";

const PATTERN_DARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/PATTERN-02_5ffa36bf.jpg";

export default function MembershipPlan() {
  const [, navigate] = useLocation();
  const handleEnroll = () => navigate("/contact");
  return (
    <>
      <PageSEO
        title="Dental Membership Plan | Uplift Dental Garden Grove"
        description="Join our affordable dental membership plan. Save 15-25% on cleanings, exams, and treatments. No insurance required. Flexible monthly payments."
        canonical="https://upliftdental.com/membership-plan"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://upliftdental.com/" }, { name: "Membership Plan", url: "https://upliftdental.com/membership-plan" }]} />
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 text-white overflow-hidden" style={{ backgroundColor: COLORS.tealDark }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${PATTERN_DARK})`, backgroundSize: "500px auto" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Dental Membership Plan</h1>
          <p className="font-body text-xl text-white/85 max-w-2xl mx-auto">
            Save 15–25% on all dental care with our affordable membership plan. No insurance needed. No waiting periods. Just quality dental care at a price you can afford.
          </p>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
              Choose Your Plan
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: COLORS.tealDark }}>
              Membership Plans That Fit Your Needs
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              No insurance? No problem. Our membership plans offer significant savings on preventive and restorative care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Essential",
                price: "$29.99",
                period: "/month or $299-799/year",
                icon: Heart,
                desc: "Perfect for preventive care",
                features: [
                  "2 professional cleanings per year",
                  "2 comprehensive exams per year",
                  "Unlimited emergency exams",
                  "15% discount on X-rays",
                  "15% discount on fillings",
                  "15% discount on extractions",
                ],
              },
              {
                name: "Premium",
                price: "$49.99",
                period: "/month or $299-799/year",
                icon: Zap,
                desc: "Best value for families",
                features: [
                  "4 professional cleanings per year",
                  "4 comprehensive exams per year",
                  "Unlimited emergency exams",
                  "20% discount on all procedures",
                  "Free fluoride treatment",
                  "Free sealants for children",
                  "Covers 1 family member",
                ],
                highlight: true,
              },
              {
                name: "Elite",
                price: "$79.99",
                period: "/month or $299-799/year",
                icon: Gift,
                desc: "Complete dental care coverage",
                features: [
                  "6 professional cleanings per year",
                  "6 comprehensive exams per year",
                  "Unlimited emergency exams",
                  "25% discount on all procedures",
                  "Free fluoride & sealants",
                  "Free whitening annually",
                  "Covers up to 3 family members",
                  "Priority scheduling",
                ],
              },
            ].map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`rounded-3xl p-8 border-2 transition-all ${
                    plan.highlight
                      ? "shadow-lg"
                      : ""
                  }`}
                  style={{
                    borderColor: plan.highlight ? COLORS.teal : "oklch(0.90 0.02 192)",
                    backgroundColor: plan.highlight ? `${COLORS.teal}08` : "white",
                  }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${COLORS.teal}15` }}>
                    <Icon className="w-6 h-6" style={{ color: COLORS.teal }} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2" style={{ color: COLORS.tealDark }}>
                    {plan.name}
                  </h3>
                  <p className="font-body text-sm text-gray-600 mb-4">{plan.desc}</p>
                  <div className="mb-6">
                    <span className="font-display text-4xl font-bold" style={{ color: COLORS.tealDark }}>
                      {plan.price}
                    </span>
                    <span className="font-body text-gray-600">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 shrink-0 mt-1" style={{ color: COLORS.teal }} />
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
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: COLORS.tealPale }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold mb-12 text-center" style={{ color: COLORS.tealDark }}>
            How Our Membership Works
          </h2>
          <div className="space-y-8">
            {[
              { step: "1", title: "Choose Your Plan", desc: "Select the membership tier that fits your dental needs and budget." },
              { step: "2", title: "Enroll Online", desc: "Sign up in minutes with no application or approval process." },
              { step: "3", title: "Start Saving", desc: "Use your membership immediately at your next appointment." },
              { step: "4", title: "Enjoy Benefits", desc: "Receive discounts on all procedures and priority scheduling." },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-white"
                  style={{ backgroundColor: COLORS.teal }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2" style={{ color: COLORS.tealDark }}>
                    {item.title}
                  </h3>
                  <p className="font-body text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold mb-12 text-center" style={{ color: COLORS.tealDark }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: "Can I use my membership with insurance?", a: "Yes. Your membership discounts apply to any out-of-pocket costs after insurance pays its portion." },
              { q: "Is there a contract or cancellation fee?", a: "No. You can cancel anytime without penalty. Just give us 30 days notice." },
              { q: "Can I add family members?", a: "Yes. Premium and Elite plans cover multiple family members. Each additional member is $49/month." },
              { q: "Do emergency visits count toward my annual cleanings?", a: "No. Emergency exams are unlimited and separate from your annual preventive visits." },
              { q: "Can I upgrade or downgrade my plan?", a: "Yes. You can change your plan anytime. Changes take effect on your next billing cycle." },
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-5">
                <h3 className="font-body font-bold text-gray-800 mb-2">{faq.q}</h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: COLORS.tealDark }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-4xl text-white mb-4">Ready to Join?</h2>
          <p className="font-body text-white/80 mb-8">
            Start saving on dental care today. No insurance required. No waiting periods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PRACTICE.phone.tel} className="btn-uplift-white rounded-full px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2">
              Call to Enroll
            </a>
            <Link href="/contact" className="btn-uplift-outline rounded-full px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2 text-white border-2 border-white hover:bg-white/10">
              Schedule Appointment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
