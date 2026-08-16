/**
 * App.tsx — Root application component with route-level code splitting
 *
 * Secondary page components are lazy-loaded to reduce navigation payloads.
 * The homepage is kept in the initial application bundle because it is the
 * highest-traffic route and its LCP content must never wait on a second
 * dynamic-import request.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import SEORedirect from "./components/SEORedirect";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocalBusinessSchema, WebSiteSchema } from "./components/StructuredData";
import AnnouncementBanner from "./components/AnnouncementBanner";
import MobileCallBar from "./components/MobileCallBar";
import Measurement from "./components/Measurement";
import Home from "./pages/Home";

// Floating helpers are deferred until the primary page content has painted.
// They do not affect SEO, consent, primary calls-to-action, or core navigation.
const LiveChat = lazy(() => import("./components/LiveChat"));
const AccessibilityWidget = lazy(() => import("./components/AccessibilityWidget"));

/* ─── Lazy-loaded page components ─────────────────────────────────── */

// Core pages
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// Service pages
const Invisalign = lazy(() => import("./pages/Invisalign"));
const DentalImplants = lazy(() => import("./pages/DentalImplants"));
const EmergencyDentist = lazy(() => import("./pages/EmergencyDentist"));
const Periodontics = lazy(() => import("./pages/Periodontics"));
const Endodontics = lazy(() => import("./pages/Endodontics"));
const TeethWhitening = lazy(() => import("./pages/TeethWhitening"));
const Veneers = lazy(() => import("./pages/Veneers"));
const DentalCrowns = lazy(() => import("./pages/DentalCrowns"));
const WisdomTeeth = lazy(() => import("./pages/WisdomTeeth"));
const DentalBonding = lazy(() => import("./pages/DentalBonding"));
const DentalFillings = lazy(() => import("./pages/DentalFillings"));
const TeethCleaning = lazy(() => import("./pages/TeethCleaning"));
const Orthodontics = lazy(() => import("./pages/Orthodontics"));
const Dentures = lazy(() => import("./pages/Dentures"));

// Secondary pages
const SpecialOffers = lazy(() => import("./pages/SpecialOffers"));
const Gallery = lazy(() => import("./pages/Gallery"));
const SmileAssessment = lazy(() => import("./pages/SmileAssessment"));
const MembershipPlan = lazy(() => import("./pages/MembershipPlan"));
const InsuranceFinancing = lazy(() => import("./pages/InsuranceFinancing"));
const CommunityOutreach = lazy(() => import("./pages/CommunityOutreach"));
const PatientPortal = lazy(() => import("./pages/PatientPortal"));
const WhyChooseUs = lazy(() => import("./pages/WhyChooseUs"));
const OurSpecialists = lazy(() => import("./pages/OurSpecialists"));

// Legal / utility pages
const Accessibility = lazy(() => import("./pages/Accessibility"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Location-specific service pages
const InvisalignSealBeach = lazy(() => import("./pages/InvisalignSealBeach"));

// City landing pages
const GardenGrove = lazy(() => import("./pages/cities/GardenGrove"));
const SealBeach = lazy(() => import("./pages/cities/SealBeach"));
const LosAlamitos = lazy(() => import("./pages/cities/LosAlamitos"));
const Westminster = lazy(() => import("./pages/cities/Westminster"));
const Anaheim = lazy(() => import("./pages/cities/Anaheim"));
const HuntingtonBeach = lazy(() => import("./pages/cities/HuntingtonBeach"));
const CypressCity = lazy(() => import("./pages/cities/CypressCity"));
const LongBeach = lazy(() => import("./pages/cities/LongBeach"));
const Stanton = lazy(() => import("./pages/cities/Stanton"));
const BuenaPark = lazy(() => import("./pages/cities/BuenaPark"));
const Rossmoor = lazy(() => import("./pages/cities/Rossmoor"));
const WestGrove = lazy(() => import("./pages/cities/WestGrove"));

/* ─── Loading fallback ────────────────────────────────────────────── */

/**
 * Minimal loading spinner shown while lazy-loaded pages are fetched.
 * Keeps the shell (Navbar, Footer) visible while content loads.
 */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function useDeferredEnhancements() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;
    const enable = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Primary conversion controls are already present. Heavy optional helpers can
      // wait longer on mobile so they do not compete with the initial render.
      timeoutId = window.setTimeout(() => setReady(true), isMobile || prefersReducedMotion ? 7000 : 1800);
    };

    // React can hydrate while the document is already interactive but after the
    // window load event has fired. Treat both interactive and complete states
    // as safe to schedule optional helpers so the chat never remains unmounted.
    if (document.readyState !== "loading") enable();
    else window.addEventListener("load", enable, { once: true });

    return () => {
      window.removeEventListener("load", enable);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return ready;
}

/* ─── Router ──────────────────────────────────────────────────────── */

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Core pages */}
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />

        {/* Service pages */}
        <Route path="/invisalign" component={Invisalign} />
        <Route path="/dental-implants" component={DentalImplants} />
        <Route path="/emergency-dentist" component={EmergencyDentist} />
        <Route path="/periodontics" component={Periodontics} />
        <Route path="/endodontics" component={Endodontics} />
        <Route path="/teeth-whitening" component={TeethWhitening} />
        <Route path="/veneers" component={Veneers} />
        <Route path="/dental-crowns" component={DentalCrowns} />
        <Route path="/wisdom-teeth-removal" component={WisdomTeeth} />
        <Route path="/dental-bonding" component={DentalBonding} />
        <Route path="/dental-fillings" component={DentalFillings} />
        <Route path="/teeth-cleaning" component={TeethCleaning} />
        <Route path="/orthodontics" component={Orthodontics} />
        <Route path="/dentures" component={Dentures} />
        <Route path="/invisalign-seal-beach" component={InvisalignSealBeach} />
        <Route path="/special-offers" component={SpecialOffers} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/smile-assessment" component={SmileAssessment} />
        <Route path="/membership-plan" component={MembershipPlan} />
        <Route path="/insurance-financing" component={InsuranceFinancing} />
        <Route path="/community-outreach" component={CommunityOutreach} />
        <Route path="/patient-portal" component={PatientPortal} />

        {/* City landing pages */}
        <Route path="/dentist-near-garden-grove" component={GardenGrove} />
        <Route path="/dentist-near-seal-beach" component={SealBeach} />
        <Route path="/dentist-near-los-alamitos" component={LosAlamitos} />
        <Route path="/dentist-near-westminster" component={Westminster} />
        <Route path="/dentist-near-anaheim" component={Anaheim} />
        <Route path="/dentist-near-huntington-beach" component={HuntingtonBeach} />
        <Route path="/dentist-near-cypress" component={CypressCity} />
        <Route path="/dentist-near-long-beach" component={LongBeach} />
        <Route path="/dentist-near-stanton" component={Stanton} />
        <Route path="/dentist-near-buena-park" component={BuenaPark} />
        <Route path="/dentist-near-rossmoor" component={Rossmoor} />

        {/* Legal / utility */}
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/accessibility" component={Accessibility} />

        {/* ── Redirects ─────────────────────────────────────────── */}

        {/* Membership */}
        <Route path="/in-house-membership">{() => <SEORedirect to="/membership-plan" />}</Route>
        <Route path="/membership-plans">{() => <SEORedirect to="/membership-plan" />}</Route>
        <Route path="/membership-plans/">{() => <SEORedirect to="/membership-plan" />}</Route>

        {/* Team / About */}
        <Route path="/team">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/our-team">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/meet-the-team">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/doctors">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/staff">{() => <SEORedirect to="/about" />}</Route>

        {/* Doctor deep links */}
        <Route path="/meet-dr-stefan">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/dr-stefan">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/dr-ragy-stefan">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/meet-dr-schneekluth">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/dr-schneekluth">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/dr-clark-schneekluth">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/meet-dr-youssef">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/dr-youssef">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/dr-joseph-youssef">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/meet-dr-saad">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/dr-saad">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/dr-erene-saad">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/meet-dr-ghobrial">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/dr-ghobrial">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/dr-daniel-ghobrial">{() => <SEORedirect to="/about" />}</Route>

        {/* Appointment / Contact */}
        <Route path="/appointments">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/appointment">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/book">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/booking">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/new-patient">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/new-patients">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/patient-forms">{() => <SEORedirect to="/contact" />}</Route>

        {/* Insurance / Financing */}
        <Route path="/financing">{() => <SEORedirect to="/insurance-financing" />}</Route>
        <Route path="/insurance">{() => <SEORedirect to="/insurance-financing" />}</Route>
        <Route path="/payment">{() => <SEORedirect to="/insurance-financing" />}</Route>
        <Route path="/financing-and-insurance-information">{() => <SEORedirect to="/insurance-financing" />}</Route>
        <Route path="/financing-and-insurance-information/">{() => <SEORedirect to="/insurance-financing" />}</Route>

        {/* Service aliases */}
        <Route path="/implants">{() => <SEORedirect to="/dental-implants" />}</Route>
        <Route path="/braces">{() => <SEORedirect to="/orthodontics" />}</Route>
        <Route path="/whitening">{() => <SEORedirect to="/teeth-whitening" />}</Route>
        <Route path="/cleaning">{() => <SEORedirect to="/teeth-cleaning" />}</Route>
        <Route path="/emergency">{() => <SEORedirect to="/emergency-dentist" />}</Route>
        <Route path="/specialty-dentistry">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/specialty-dentistry/">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/services/specialty-dentistry">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/dental-services">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/our-services">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/treatments">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/cosmetic">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/cosmetic-dentistry">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/general-dentistry">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/restorative">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/restorative-dentistry">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/oral-surgery">{() => <SEORedirect to="/wisdom-teeth-removal" />}</Route>
        <Route path="/oral-surgery/">{() => <SEORedirect to="/wisdom-teeth-removal" />}</Route>
        <Route path="/gum-disease">{() => <SEORedirect to="/periodontics" />}</Route>
        <Route path="/periodontal">{() => <SEORedirect to="/periodontics" />}</Route>
        <Route path="/root-canal">{() => <SEORedirect to="/endodontics" />}</Route>
        <Route path="/root-canals">{() => <SEORedirect to="/endodontics" />}</Route>
        <Route path="/clear-aligners">{() => <SEORedirect to="/orthodontics" />}</Route>
        <Route path="/crowns">{() => <SEORedirect to="/dental-crowns" />}</Route>
        <Route path="/wisdom-teeth">{() => <SEORedirect to="/wisdom-teeth-removal" />}</Route>
        <Route path="/tooth-extraction">{() => <SEORedirect to="/wisdom-teeth-removal" />}</Route>
        <Route path="/tooth-extraction/">{() => <SEORedirect to="/wisdom-teeth-removal" />}</Route>
        <Route path="/extraction">{() => <SEORedirect to="/wisdom-teeth-removal" />}</Route>
        <Route path="/extractions">{() => <SEORedirect to="/wisdom-teeth-removal" />}</Route>

        {/* Old WordPress blog slugs → redirect to matching new blog posts */}
        <Route path="/dental-x-rays-for-better-prevention">{() => <SEORedirect to="/blog" />}</Route>
        <Route path="/dental-x-rays-for-better-prevention/">{() => <SEORedirect to="/blog" />}</Route>
        <Route path="/are-clear-aligners-better-than-braces">{() => <SEORedirect to="/blog/are-clear-aligners-better-than-braces" />}</Route>
        <Route path="/are-clear-aligners-better-than-braces/">{() => <SEORedirect to="/blog/are-clear-aligners-better-than-braces" />}</Route>
        <Route path="/get-started-the-benefits-of-early-intervention-with-invisalign">{() => <SEORedirect to="/blog/get-started-the-benefits-of-early-intervention-with-invisalign" />}</Route>
        <Route path="/get-started-the-benefits-of-early-intervention-with-invisalign/">{() => <SEORedirect to="/blog/get-started-the-benefits-of-early-intervention-with-invisalign" />}</Route>
        <Route path="/what-are-the-differences-between-dental-insurance-plans">{() => <SEORedirect to="/blog/what-are-the-differences-between-dental-insurance-plans" />}</Route>
        <Route path="/what-are-the-differences-between-dental-insurance-plans/">{() => <SEORedirect to="/blog/what-are-the-differences-between-dental-insurance-plans" />}</Route>
        <Route path="/oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups">{() => <SEORedirect to="/blog/oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups" />}</Route>
        <Route path="/oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups/">{() => <SEORedirect to="/blog/oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups" />}</Route>
        <Route path="/straighten-your-teeth-discreetly-with-clear-aligners">{() => <SEORedirect to="/orthodontics" />}</Route>
        <Route path="/straighten-your-teeth-discreetly-with-clear-aligners/">{() => <SEORedirect to="/orthodontics" />}</Route>
        <Route path="/oral-surgery-in-garden-grove-made-easy">{() => <SEORedirect to="/wisdom-teeth-removal" />}</Route>
        <Route path="/oral-surgery-in-garden-grove-made-easy/">{() => <SEORedirect to="/wisdom-teeth-removal" />}</Route>
        <Route path="/next-level-dental-care-with-itero-intraoral-scanner">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/next-level-dental-care-with-itero-intraoral-scanner/">{() => <SEORedirect to="/about" />}</Route>

        {/* Old WordPress location paths */}
        <Route path="/locations/seal-beach">{() => <SEORedirect to="/dentist-near-seal-beach" />}</Route>
        <Route path="/locations/seal-beach/">{() => <SEORedirect to="/dentist-near-seal-beach" />}</Route>
        <Route path="/locations/long-beach">{() => <SEORedirect to="/dentist-near-long-beach" />}</Route>
        <Route path="/locations/long-beach/">{() => <SEORedirect to="/dentist-near-long-beach" />}</Route>
        <Route path="/locations/rossmoor">{() => <SEORedirect to="/dentist-near-rossmoor" />}</Route>
        <Route path="/locations/rossmoor/">{() => <SEORedirect to="/dentist-near-rossmoor" />}</Route>
        <Route path="/locations/santa-ana">{() => <SEORedirect to="/" />}</Route>
        <Route path="/locations/santa-ana/">{() => <SEORedirect to="/" />}</Route>
        <Route path="/locations/fountain-valley">{() => <SEORedirect to="/" />}</Route>
        <Route path="/locations/fountain-valley/">{() => <SEORedirect to="/" />}</Route>
        <Route path="/locations/belmont-shore">{() => <SEORedirect to="/dentist-near-long-beach" />}</Route>
        <Route path="/locations/belmont-shore/">{() => <SEORedirect to="/dentist-near-long-beach" />}</Route>
        <Route path="/locations/:rest*">{() => <SEORedirect to="/" />}</Route>

        {/* Old WordPress service/page paths */}
        <Route path="/dental-cleaning">{() => <SEORedirect to="/teeth-cleaning" />}</Route>
        <Route path="/dental-cleaning/">{() => <SEORedirect to="/teeth-cleaning" />}</Route>
        <Route path="/dental-bridges">{() => <SEORedirect to="/dental-crowns" />}</Route>
        <Route path="/dental-bridges/">{() => <SEORedirect to="/dental-crowns" />}</Route>
        <Route path="/testimonials">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/testimonials/">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/home">{() => <SEORedirect to="/" />}</Route>
        <Route path="/home/">{() => <SEORedirect to="/" />}</Route>
        <Route path="/Home">{() => <SEORedirect to="/" />}</Route>
        <Route path="/results">{() => <SEORedirect to="/gallery" />}</Route>
        <Route path="/results/">{() => <SEORedirect to="/gallery" />}</Route>
        <Route path="/dentofacial-orthopedics">{() => <SEORedirect to="/orthodontics" />}</Route>
        <Route path="/dentofacial-orthopedics/">{() => <SEORedirect to="/orthodontics" />}</Route>
        <Route path="/terms-and-conditions-of-use">{() => <SEORedirect to="/terms-of-service" />}</Route>
        <Route path="/terms-and-conditions-of-use/">{() => <SEORedirect to="/terms-of-service" />}</Route>
        <Route path="/porcelain-veneers">{() => <SEORedirect to="/veneers" />}</Route>
        <Route path="/porcelain-veneers/">{() => <SEORedirect to="/veneers" />}</Route>
        <Route path="/top-notch-technology">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/top-notch-technology/">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/index.html">{() => <SEORedirect to="/" />}</Route>
        <Route path="/patient-form">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/patient-form/">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/tmj-treatment">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/tmj-treatment/">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/connect">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/connect/">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/refer-a-patient">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/refer-a-patient/">{() => <SEORedirect to="/contact" />}</Route>
        <Route path="/root-canal-treatment">{() => <SEORedirect to="/endodontics" />}</Route>
        <Route path="/root-canal-treatment/">{() => <SEORedirect to="/endodontics" />}</Route>
        <Route path="/dentist-office-events">{() => <SEORedirect to="/community-outreach" />}</Route>
        <Route path="/dentist-office-events/">{() => <SEORedirect to="/community-outreach" />}</Route>
        <Route path="/invisalign-treatment-garden-grove-ca">{() => <SEORedirect to="/invisalign" />}</Route>
        <Route path="/invisalign-treatment-garden-grove-ca/">{() => <SEORedirect to="/invisalign" />}</Route>
        <Route path="/what-to-expect">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/what-to-expect/">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/dental-fillings-3">{() => <SEORedirect to="/dental-fillings" />}</Route>
        <Route path="/dental-fillings-3/">{() => <SEORedirect to="/dental-fillings" />}</Route>
        <Route path="/announcements">{() => <SEORedirect to="/special-offers" />}</Route>
        <Route path="/announcements/">{() => <SEORedirect to="/special-offers" />}</Route>
        <Route path="/clear-aligners/">{() => <SEORedirect to="/orthodontics" />}</Route>
        <Route path="/gallery/">{() => <SEORedirect to="/gallery" />}</Route>

        {/* Old WordPress paths — redirect to homepage */}
        <Route path="/wp-admin">{() => <SEORedirect to="/" />}</Route>
        <Route path="/wp-login.php">{() => <SEORedirect to="/" />}</Route>
        <Route path="/wp-content/:rest*">{() => <SEORedirect to="/" />}</Route>
        <Route path="/feed">{() => <SEORedirect to="/" />}</Route>
        <Route path="/feed/">{() => <SEORedirect to="/" />}</Route>
        <Route path="/xmlrpc.php">{() => <SEORedirect to="/" />}</Route>
        <Route path="/category/:rest*">{() => <SEORedirect to="/blog" />}</Route>
        <Route path="/author/:rest*">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/page/:page">{() => <SEORedirect to="/" />}</Route>
        <Route path="/tag/:rest*">{() => <SEORedirect to="/blog" />}</Route>

        {/* Misc */}
        <Route path="/faq">{() => <SEORedirect to="/blog" />}</Route>
        <Route path="/faq/">{() => <SEORedirect to="/blog" />}</Route>
        <Route path="/reviews">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/reviews/">{() => <SEORedirect to="/about" />}</Route>
        <Route path="/blog/page/:page">{() => <SEORedirect to="/blog" />}</Route>
        <Route path="/cosmetic-dentistry/">{() => <SEORedirect to="/services" />}</Route>
        <Route path="/meet-dr-stefan/">{() => <SEORedirect to="/about" />}</Route>

        <Route path="/why-choose-us" component={WhyChooseUs} />
        <Route path="/our-specialists" component={OurSpecialists} />
        {/* 404 */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

/* ─── App shell ───────────────────────────────────────────────────── */

function App() {
  const enhancementsReady = useDeferredEnhancements();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Measurement />
          <LocalBusinessSchema />
          <WebSiteSchema />
          <AnnouncementBanner />
          <Router />
          {enhancementsReady && (
            <Suspense fallback={null}>
              <LiveChat />
              <AccessibilityWidget />
            </Suspense>
          )}
          <MobileCallBar />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
