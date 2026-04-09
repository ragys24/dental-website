// Design: Clean, readable legal page matching Uplift Dental brand
import { PageSEO } from "@/components/PageSEO";
import { PRACTICE, COLORS } from "@/lib/constants";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="font-display text-2xl font-bold" style={{ color: COLORS.tealDark }}>
      {title}
    </h2>
    <div className="font-body text-gray-700 leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function TermsOfService() {
  return (
    <>
      <PageSEO
        title="Terms of Service | Uplift Dental & Orthodontics Garden Grove CA"
        description="Read the Terms of Service for Uplift Dental & Orthodontics. Understand the conditions governing use of our website and digital communications."
        canonical="/terms-of-service"
      />

      <main className="min-h-screen bg-white pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
              Legal
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: COLORS.tealDark }}>
              Terms of Service
            </h1>
            <p className="font-body text-gray-500 text-sm">
              Effective Date: April 2026 &nbsp;·&nbsp; Last Updated: April 2026
            </p>
          </div>

          <div className="space-y-10">
            <Section title="Acceptance of Terms">
              <p>
                By accessing or using the website at <strong>upliftdental.com</strong> (the "Site"), you agree to be
                bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the
                Site. These Terms apply to all visitors, users, and anyone who accesses the Site.
              </p>
            </Section>

            <Section title="Use of the Site">
              <p>
                This Site is provided by Uplift Dental &amp; Orthodontics ("we," "our," or "us") for informational
                and appointment-scheduling purposes only. You agree to use the Site only for lawful purposes and in a
                manner that does not infringe the rights of others or restrict their use and enjoyment of the Site.
              </p>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Site in any way that violates applicable local, state, or federal laws or regulations.</li>
                <li>Transmit any unsolicited or unauthorized advertising or promotional material.</li>
                <li>Attempt to gain unauthorized access to any part of the Site or its related systems.</li>
                <li>Engage in any conduct that could damage, disable, or impair the Site or interfere with other users.</li>
              </ul>
            </Section>

            <Section title="Medical Disclaimer">
              <p>
                The content on this Site is provided for <strong>general informational purposes only</strong> and is
                not intended to be a substitute for professional dental or medical advice, diagnosis, or treatment.
                Always seek the advice of a qualified dental or healthcare provider with any questions you may have
                regarding a dental condition or treatment.
              </p>
              <p>
                Do not disregard professional dental advice or delay seeking it because of something you have read on
                this Site. In a dental emergency, call our office at{" "}
                <a href={PRACTICE.phone.tel} className="underline" style={{ color: COLORS.teal }}>
                  {PRACTICE.phone.display}
                </a>{" "}
                or call 911 immediately.
              </p>
            </Section>

            <Section title="Appointment Requests & Communications">
              <p>
                Submitting an appointment request, contact form, or text message through this Site does not
                constitute a confirmed appointment. All appointment requests are subject to availability and
                confirmation by our office. We will contact you to confirm scheduling details.
              </p>
              <p>
                By providing your phone number or email address, you consent to receive communications from us
                related to your appointment or inquiry. Standard message and data rates may apply for SMS
                communications. You may opt out at any time by replying STOP.
              </p>
            </Section>

            <Section title="Intellectual Property">
              <p>
                All content on this Site — including text, graphics, logos, images, and software — is the property
                of Uplift Dental &amp; Orthodontics or its content suppliers and is protected by applicable
                intellectual property laws. You may not reproduce, distribute, or create derivative works from any
                content on this Site without our express written permission.
              </p>
            </Section>

            <Section title="Third-Party Links">
              <p>
                This Site may contain links to third-party websites (such as Google Maps, social media platforms,
                or insurance portals). These links are provided for your convenience only. We have no control over
                the content of those sites and accept no responsibility for them or for any loss or damage that may
                arise from your use of them.
              </p>
            </Section>

            <Section title="Disclaimer of Warranties">
              <p>
                This Site is provided on an "as is" and "as available" basis without any warranties of any kind,
                either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or
                free of viruses or other harmful components. We make no warranties regarding the accuracy,
                completeness, or reliability of any content on the Site.
              </p>
            </Section>

            <Section title="Limitation of Liability">
              <p>
                To the fullest extent permitted by law, Uplift Dental &amp; Orthodontics shall not be liable for
                any indirect, incidental, special, consequential, or punitive damages arising from your use of, or
                inability to use, this Site or its content. Our total liability for any claim arising from your use
                of the Site shall not exceed $100.
              </p>
            </Section>

            <Section title="Governing Law">
              <p>
                These Terms are governed by and construed in accordance with the laws of the{" "}
                <strong>State of California</strong>, without regard to its conflict of law provisions. Any disputes
                arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in
                Orange County, California.
              </p>
            </Section>

            <Section title="Changes to These Terms">
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon
                posting to the Site. Your continued use of the Site after any changes constitutes your acceptance
                of the revised Terms. We encourage you to review these Terms periodically.
              </p>
            </Section>

            <Section title="Contact Us">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div
                className="rounded-xl p-5 space-y-2 mt-2"
                style={{ backgroundColor: "oklch(0.97 0.01 185)" }}
              >
                <p className="font-semibold" style={{ color: COLORS.tealDark }}>
                  Uplift Dental &amp; Orthodontics
                </p>
                <p>{PRACTICE.address.full}</p>
                <p>
                  Phone:{" "}
                  <a href={PRACTICE.phone.tel} className="underline" style={{ color: COLORS.teal }}>
                    {PRACTICE.phone.display}
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@upliftdental.com" className="underline" style={{ color: COLORS.teal }}>
                    info@upliftdental.com
                  </a>
                </p>
              </div>
            </Section>
          </div>
        </div>
      </main>
    </>
  );
}
