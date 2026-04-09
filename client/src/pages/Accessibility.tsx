// Design: Clean, readable, high-contrast legal page matching Uplift Dental brand
// Colors: COLORS.tealDark headers, body text gray-700, teal accent links
import { PageSEO } from "@/components/PageSEO";
import { PRACTICE, COLORS} from "@/lib/constants";

export default function Accessibility() {
  return (
    <>
      <PageSEO
        title="Accessibility Statement | Uplift Dental & Orthodontics Garden Grove CA"
        description="Uplift Dental & Orthodontics is committed to ensuring digital accessibility for people with disabilities. Learn about our WCAG 2.1 AA compliance efforts."
        canonical="/accessibility"
      />

      <main className="min-h-screen bg-white pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <p
              className="font-body text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: COLORS.teal }}
            >
              Legal
            </p>
            <h1
              className="font-display text-4xl md:text-5xl font-bold mb-4"
              style={{ color: COLORS.tealDark }}
            >
              Accessibility Statement
            </h1>
            <p className="font-body text-gray-500 text-sm">
              Last updated: April 2026
            </p>
          </div>

          <div className="prose prose-gray max-w-none font-body text-gray-700 leading-relaxed space-y-8">
            {/* Commitment */}
            <section>
              <h2
                className="font-display text-2xl font-bold mb-3"
                style={{ color: COLORS.tealDark }}
              >
                Our Commitment
              </h2>
              <p>
                Uplift Dental &amp; Orthodontics is committed to ensuring that
                our website is accessible to all people, including individuals
                with disabilities. We strive to meet or exceed the requirements
                of the{" "}
                <strong>
                  Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
                </strong>
                , as well as applicable provisions of the{" "}
                <strong>Americans with Disabilities Act (ADA)</strong> and
                California accessibility laws.
              </p>
            </section>

            {/* Measures */}
            <section>
              <h2
                className="font-display text-2xl font-bold mb-3"
                style={{ color: COLORS.tealDark }}
              >
                Measures We Take
              </h2>
              <p>
                To support accessibility, Uplift Dental &amp; Orthodontics
                takes the following measures:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  Include accessibility as part of our website design and
                  development process.
                </li>
                <li>
                  Provide text alternatives for all non-text content, including
                  images and icons.
                </li>
                <li>
                  Ensure all pages are navigable by keyboard without requiring
                  a mouse.
                </li>
                <li>
                  Maintain sufficient color contrast ratios for all text and
                  interactive elements.
                </li>
                <li>
                  Use semantic HTML to support screen readers and assistive
                  technologies.
                </li>
                <li>
                  Ensure all form fields are properly labeled and error messages
                  are descriptive.
                </li>
                <li>
                  Provide visible focus indicators for keyboard navigation.
                </li>
              </ul>
            </section>

            {/* Conformance Status */}
            <section>
              <h2
                className="font-display text-2xl font-bold mb-3"
                style={{ color: COLORS.tealDark }}
              >
                Conformance Status
              </h2>
              <p>
                We believe this website substantially conforms to{" "}
                <strong>WCAG 2.1 Level AA</strong>. We are continuously working
                to improve accessibility and address any gaps that are
                identified. Some third-party content or embedded tools may not
                fully conform; we work with our vendors to improve their
                accessibility as well.
              </p>
            </section>

            {/* Known Limitations */}
            <section>
              <h2
                className="font-display text-2xl font-bold mb-3"
                style={{ color: COLORS.tealDark }}
              >
                Known Limitations
              </h2>
              <p>
                While we strive for full accessibility, some areas of the site
                may still be in the process of being improved:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  Certain older PDF documents may not be fully accessible.
                  Please contact us and we will provide the information in an
                  accessible format.
                </li>
                <li>
                  Some embedded third-party widgets (such as online scheduling
                  tools) are managed by external vendors and may have their own
                  accessibility limitations.
                </li>
              </ul>
            </section>

            {/* Feedback & Contact */}
            <section>
              <h2
                className="font-display text-2xl font-bold mb-3"
                style={{ color: COLORS.tealDark }}
              >
                Feedback &amp; Contact
              </h2>
              <p>
                We welcome your feedback on the accessibility of our website.
                If you experience any barriers or have difficulty accessing any
                content, please contact us and we will do our best to provide
                the information in an alternative format or resolve the issue
                promptly.
              </p>
              <div
                className="mt-4 rounded-xl p-5 space-y-2"
                style={{ backgroundColor: "oklch(0.97 0.01 185)" }}
              >
                <p className="font-semibold" style={{ color: COLORS.tealDark }}>
                  Uplift Dental &amp; Orthodontics
                </p>
                <p>
                  <span className="font-medium">Address:</span> 5253 Lampson
                  Ave, {PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  <a
                    href={PRACTICE.phone.tel}
                    className="underline"
                    style={{ color: COLORS.teal }}
                  >
                    {PRACTICE.phone.display}
                  </a>
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:info@upliftdental.com"
                    className="underline"
                    style={{ color: COLORS.teal }}
                  >
                    info@upliftdental.com
                  </a>
                </p>
                <p className="text-sm text-gray-500 pt-1">
                  We aim to respond to accessibility feedback within{" "}
                  <strong>2 business days</strong>.
                </p>
              </div>
            </section>

            {/* Formal Complaints */}
            <section>
              <h2
                className="font-display text-2xl font-bold mb-3"
                style={{ color: COLORS.tealDark }}
              >
                Formal Complaints
              </h2>
              <p>
                If you are not satisfied with our response to your accessibility
                concern, you may contact the{" "}
                <strong>
                  U.S. Department of Justice, Civil Rights Division
                </strong>{" "}
                or file a complaint with the{" "}
                <strong>
                  California Department of Fair Employment and Housing (DFEH)
                </strong>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
