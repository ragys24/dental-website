// Design: Clean, readable legal page matching Uplift Dental brand
// Colors: COLORS.tealDark headers, body text gray-700, teal accent links
import { PageSEO } from "@/components/PageSEO";
import { PRACTICE, COLORS} from "@/lib/constants";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="font-display text-2xl font-bold" style={{ color: COLORS.tealDark }}>
      {title}
    </h2>
    <div className="font-body text-gray-700 leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function PrivacyPolicy() {
  return (
    <>
      <PageSEO
        title="Privacy Policy | Uplift Dental & Orthodontics Garden Grove CA"
        description="Read the Privacy Policy for Uplift Dental & Orthodontics. Learn how we collect, use, and protect your personal information in compliance with CCPA and HIPAA."
        canonical="/privacy-policy"
      />

      <main className="min-h-screen bg-white pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>
              Legal
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: COLORS.tealDark }}>
              Privacy Policy
            </h1>
            <p className="font-body text-gray-500 text-sm">
              Effective Date: April 2026 &nbsp;·&nbsp; Last Updated: April 2026
            </p>
          </div>

          <div className="space-y-10">
            {/* Intro */}
            <Section title="Introduction">
              <p>
                Uplift Dental &amp; Orthodontics ("we," "our," or "us"), located at {PRACTICE.address.full},
                is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website <strong>upliftdental.com</strong> or contact us to
                schedule dental services.
              </p>
              <p>
                Please read this policy carefully. If you do not agree with its terms, please discontinue use of our website.
                This policy is intended to comply with the <strong>California Consumer Privacy Act (CCPA)</strong>, the{" "}
                <strong>California Privacy Rights Act (CPRA)</strong>, and applicable provisions of{" "}
                <strong>HIPAA</strong> as they relate to our website and non-clinical communications.
              </p>
            </Section>

            {/* Information We Collect */}
            <Section title="Information We Collect">
              <p>We may collect the following categories of personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Contact Information:</strong> Name, phone number, email address, and mailing address when you
                  submit a contact form, request an appointment, or text us.
                </li>
                <li>
                  <strong>Appointment &amp; Scheduling Data:</strong> Preferred appointment times, service inquiries, and
                  insurance information provided during booking.
                </li>
                <li>
                  <strong>Communications:</strong> Messages, chat transcripts, and SMS exchanges when you contact us
                  through the website.
                </li>
                <li>
                  <strong>Usage Data:</strong> Browser type, IP address, pages visited, time on site, and referring URLs,
                  collected automatically via cookies and analytics tools.
                </li>
                <li>
                  <strong>Device Information:</strong> Device type, operating system, and screen resolution for site
                  optimization purposes.
                </li>
              </ul>
              <p>
                We do <strong>not</strong> collect sensitive health or medical records through this website. Clinical
                health information is handled separately under our HIPAA Notice of Privacy Practices, which is provided
                to patients at the time of treatment.
              </p>
            </Section>

            {/* How We Use Your Information */}
            <Section title="How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to appointment requests, inquiries, and messages.</li>
                <li>Schedule and confirm dental appointments.</li>
                <li>Send appointment reminders and follow-up communications (with your consent).</li>
                <li>Improve our website, services, and patient experience.</li>
                <li>Comply with legal obligations and resolve disputes.</li>
                <li>Send promotional offers or newsletters if you have opted in (you may opt out at any time).</li>
                <li>Analyze website usage to improve content and functionality.</li>
              </ul>
            </Section>

            {/* Cookies */}
            <Section title="Cookies & Tracking Technologies">
              <p>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience and
                analyze site traffic. Cookies are small data files stored on your device. You can instruct your browser
                to refuse all cookies or to indicate when a cookie is being sent; however, some features of the site
                may not function properly without cookies.
              </p>
              <p>
                We may use third-party analytics services (such as Google Analytics) that collect usage data on our
                behalf. These services have their own privacy policies governing the use of that information.
              </p>
            </Section>

            {/* Sharing */}
            <Section title="How We Share Your Information">
              <p>
                We do <strong>not</strong> sell your personal information. We may share your information in the
                following limited circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who assist with appointment scheduling,
                  website hosting, analytics, or communications (e.g., CareStack, Google Analytics). These providers
                  are contractually obligated to protect your data.
                </li>
                <li>
                  <strong>Legal Compliance:</strong> When required by law, court order, or government authority.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets,
                  your information may be transferred as part of that transaction.
                </li>
                <li>
                  <strong>With Your Consent:</strong> For any other purpose with your explicit consent.
                </li>
              </ul>
            </Section>

            {/* CCPA Rights */}
            <Section title="Your California Privacy Rights (CCPA / CPRA)">
              <p>
                If you are a California resident, you have the following rights under the CCPA and CPRA:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Right to Know:</strong> You may request details about the categories and specific pieces of
                  personal information we have collected about you.
                </li>
                <li>
                  <strong>Right to Delete:</strong> You may request that we delete personal information we have
                  collected, subject to certain exceptions.
                </li>
                <li>
                  <strong>Right to Correct:</strong> You may request correction of inaccurate personal information.
                </li>
                <li>
                  <strong>Right to Opt-Out of Sale:</strong> We do not sell personal information. If this changes, we
                  will update this policy and provide an opt-out mechanism.
                </li>
                <li>
                  <strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising
                  any of your privacy rights.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at the information below. We will respond within{" "}
                <strong>45 days</strong> as required by California law.
              </p>
            </Section>

            {/* HIPAA Note */}
            <Section title="HIPAA Notice">
              <p>
                As a dental practice, we are a covered entity under the Health Insurance Portability and
                Accountability Act (HIPAA). Your protected health information (PHI) — including dental records,
                treatment history, and insurance information — is governed by our separate{" "}
                <strong>HIPAA Notice of Privacy Practices</strong>, which you receive at your first appointment.
              </p>
              <p>
                This website Privacy Policy covers only the information collected through our website and digital
                communications, not clinical health records.
              </p>
            </Section>

            {/* Data Security */}
            <Section title="Data Security">
              <p>
                We implement reasonable administrative, technical, and physical safeguards to protect your personal
                information from unauthorized access, disclosure, alteration, or destruction. However, no method of
                transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </Section>

            {/* Children */}
            <Section title="Children's Privacy">
              <p>
                Our website is not directed to children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you believe we have inadvertently collected such information,
                please contact us and we will promptly delete it.
              </p>
            </Section>

            {/* Third Party Links */}
            <Section title="Third-Party Links">
              <p>
                Our website may contain links to third-party websites (such as Google Maps, review platforms, or
                insurance portals). We are not responsible for the privacy practices of those sites and encourage you
                to review their privacy policies before providing any personal information.
              </p>
            </Section>

            {/* Changes */}
            <Section title="Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the "Last Updated"
                date at the top of this page. We encourage you to review this policy periodically to stay informed
                about how we protect your information.
              </p>
            </Section>

            {/* Contact */}
            <Section title="Contact Us">
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal
                information, please contact us:
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
