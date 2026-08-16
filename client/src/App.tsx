import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LiveChat from "./components/LiveChat";
import AccessibilityWidget from "./components/AccessibilityWidget";
import AnnouncementBanner from "./components/AnnouncementBanner";
import { LocalBusinessSchema, WebSiteSchema } from "./components/StructuredData";
import MobileCallBar from "./components/MobileCallBar";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Invisalign = lazy(() => import("./pages/Invisalign"));
const DentalImplants = lazy(() => import("./pages/DentalImplants"));
const EmergencyDentist = lazy(() => import("./pages/EmergencyDentist"));
const SpecialOffers = lazy(() => import("./pages/SpecialOffers"));
const Periodontics = lazy(() => import("./pages/Periodontics"));
const Endodontics = lazy(() => import("./pages/Endodontics"));
const Gallery = lazy(() => import("./pages/Gallery"));
const TeethWhitening = lazy(() => import("./pages/TeethWhitening"));
const Veneers = lazy(() => import("./pages/Veneers"));
const DentalCrowns = lazy(() => import("./pages/DentalCrowns"));
const WisdomTeeth = lazy(() => import("./pages/WisdomTeeth"));
const DentalBonding = lazy(() => import("./pages/DentalBonding"));
const DentalFillings = lazy(() => import("./pages/DentalFillings"));
const TeethCleaning = lazy(() => import("./pages/TeethCleaning"));
const Orthodontics = lazy(() => import("./pages/Orthodontics"));
const SmileAssessment = lazy(() => import("./pages/SmileAssessment"));
const MembershipPlan = lazy(() => import("./pages/MembershipPlan"));
const InsuranceFinancing = lazy(() => import("./pages/InsuranceFinancing"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const NotFound = lazy(() => import("./pages/NotFound"));
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
const GardenGrove = lazy(() => import("./pages/cities/GardenGrove"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/invisalign" component={Invisalign} />
      <Route path="/dental-implants" component={DentalImplants} />
      <Route path="/emergency-dentist" component={EmergencyDentist} />
      <Route path="/special-offers" component={SpecialOffers} />
      <Route path="/periodontics" component={Periodontics} />
      <Route path="/endodontics" component={Endodontics} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/teeth-whitening" component={TeethWhitening} />
      <Route path="/veneers" component={Veneers} />
      <Route path="/dental-crowns" component={DentalCrowns} />
      <Route path="/wisdom-teeth-removal" component={WisdomTeeth} />
      <Route path="/dental-bonding" component={DentalBonding} />
      <Route path="/dental-fillings" component={DentalFillings} />
      <Route path="/teeth-cleaning" component={TeethCleaning} />
      <Route path="/orthodontics" component={Orthodontics} />
      <Route path="/smile-assessment" component={SmileAssessment} />
      <Route path="/membership-plan" component={MembershipPlan} />
      <Route path="/insurance-financing" component={InsuranceFinancing} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/accessibility" component={Accessibility} />

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
      <Route path="/dentist-near-west-grove" component={WestGrove} />

      <Route path="/team">{() => <Redirect to="/about" />}</Route>
      <Route path="/our-team">{() => <Redirect to="/about" />}</Route>
      <Route path="/meet-the-team">{() => <Redirect to="/about" />}</Route>
      <Route path="/doctors">{() => <Redirect to="/about" />}</Route>
      <Route path="/staff">{() => <Redirect to="/about" />}</Route>
      <Route path="/meet-dr-stefan">{() => <Redirect to="/about#dr-stefan" />}</Route>
      <Route path="/dr-stefan">{() => <Redirect to="/about#dr-stefan" />}</Route>
      <Route path="/dr-ragy-stefan">{() => <Redirect to="/about#dr-stefan" />}</Route>
      <Route path="/meet-dr-schneekluth">{() => <Redirect to="/about#dr-schneekluth" />}</Route>
      <Route path="/dr-schneekluth">{() => <Redirect to="/about#dr-schneekluth" />}</Route>
      <Route path="/dr-clark-schneekluth">{() => <Redirect to="/about#dr-schneekluth" />}</Route>
      <Route path="/meet-dr-youssef">{() => <Redirect to="/about#dr-youssef" />}</Route>
      <Route path="/dr-youssef">{() => <Redirect to="/about#dr-youssef" />}</Route>
      <Route path="/dr-joseph-youssef">{() => <Redirect to="/about#dr-youssef" />}</Route>
      <Route path="/meet-dr-saad">{() => <Redirect to="/about#dr-saad" />}</Route>
      <Route path="/dr-saad">{() => <Redirect to="/about#dr-saad" />}</Route>
      <Route path="/dr-erene-saad">{() => <Redirect to="/about#dr-saad" />}</Route>
      <Route path="/meet-dr-ghobrial">{() => <Redirect to="/about#dr-ghobrial" />}</Route>
      <Route path="/dr-ghobrial">{() => <Redirect to="/about#dr-ghobrial" />}</Route>
      <Route path="/dr-daniel-ghobrial">{() => <Redirect to="/about#dr-ghobrial" />}</Route>
      <Route path="/appointments">{() => <Redirect to="/contact" />}</Route>
      <Route path="/appointment">{() => <Redirect to="/contact" />}</Route>
      <Route path="/book">{() => <Redirect to="/contact" />}</Route>
      <Route path="/booking">{() => <Redirect to="/contact" />}</Route>
      <Route path="/new-patient">{() => <Redirect to="/contact" />}</Route>
      <Route path="/new-patients">{() => <Redirect to="/contact" />}</Route>
      <Route path="/patient-forms">{() => <Redirect to="/contact" />}</Route>
      <Route path="/financing">{() => <Redirect to="/insurance-financing" />}</Route>
      <Route path="/insurance">{() => <Redirect to="/insurance-financing" />}</Route>
      <Route path="/payment">{() => <Redirect to="/insurance-financing" />}</Route>
      <Route path="/implants">{() => <Redirect to="/dental-implants" />}</Route>
      <Route path="/braces">{() => <Redirect to="/orthodontics" />}</Route>
      <Route path="/whitening">{() => <Redirect to="/teeth-whitening" />}</Route>
      <Route path="/cleaning">{() => <Redirect to="/teeth-cleaning" />}</Route>
      <Route path="/emergency">{() => <Redirect to="/emergency-dentist" />}</Route>
      <Route path="/specialty-dentistry">{() => <Redirect to="/services" />}</Route>
      <Route path="/services/specialty-dentistry">{() => <Redirect to="/services" />}</Route>
      <Route path="/dental-services">{() => <Redirect to="/services" />}</Route>
      <Route path="/our-services">{() => <Redirect to="/services" />}</Route>
      <Route path="/treatments">{() => <Redirect to="/services" />}</Route>
      <Route path="/cosmetic">{() => <Redirect to="/services" />}</Route>
      <Route path="/cosmetic-dentistry">{() => <Redirect to="/services" />}</Route>
      <Route path="/general-dentistry">{() => <Redirect to="/services" />}</Route>
      <Route path="/restorative">{() => <Redirect to="/services" />}</Route>
      <Route path="/restorative-dentistry">{() => <Redirect to="/services" />}</Route>
      <Route path="/oral-surgery">{() => <Redirect to="/wisdom-teeth-removal" />}</Route>
      <Route path="/gum-disease">{() => <Redirect to="/periodontics" />}</Route>
      <Route path="/periodontal">{() => <Redirect to="/periodontics" />}</Route>
      <Route path="/root-canal">{() => <Redirect to="/endodontics" />}</Route>
      <Route path="/root-canals">{() => <Redirect to="/endodontics" />}</Route>
      <Route path="/clear-aligners">{() => <Redirect to="/orthodontics" />}</Route>
      <Route path="/crowns">{() => <Redirect to="/dental-crowns" />}</Route>
      <Route path="/wisdom-teeth">{() => <Redirect to="/wisdom-teeth-removal" />}</Route>
      <Route path="/faq">{() => <Redirect to="/blog" />}</Route>
      <Route path="/reviews">{() => <Redirect to="/about" />}</Route>
      <Route path="/membership-plans">{() => <Redirect to="/membership-plan" />}</Route>
      <Route path="/blog/page/:page">{() => <Redirect to="/blog" />}</Route>
      <Route path="/tooth-extraction">{() => <Redirect to="/wisdom-teeth-removal" />}</Route>
      <Route path="/extraction">{() => <Redirect to="/wisdom-teeth-removal" />}</Route>
      <Route path="/extractions">{() => <Redirect to="/wisdom-teeth-removal" />}</Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function RouteLoadingFallback() {
  return <div className="min-h-screen bg-white" aria-busy="true" aria-label="Loading page" />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <LocalBusinessSchema />
          <WebSiteSchema />
          <AnnouncementBanner />
          <Suspense fallback={<RouteLoadingFallback />}>
            <Router />
          </Suspense>
          <LiveChat />
          <AccessibilityWidget />
          <MobileCallBar />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
