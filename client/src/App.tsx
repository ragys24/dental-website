import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LiveChat from "./components/LiveChat";
import AccessibilityWidget from "./components/AccessibilityWidget";
import AnnouncementBanner from "./components/AnnouncementBanner";
import { LocalBusinessSchema, WebSiteSchema } from "./components/StructuredData";
import MobileCallBar from "./components/MobileCallBar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Invisalign from "./pages/Invisalign";
import DentalImplants from "./pages/DentalImplants";
import EmergencyDentist from "./pages/EmergencyDentist";
import SpecialOffers from "./pages/SpecialOffers";
import Periodontics from "./pages/Periodontics";
import Endodontics from "./pages/Endodontics";
import Gallery from "./pages/Gallery";
import TeethWhitening from "./pages/TeethWhitening";
import Veneers from "./pages/Veneers";
import DentalCrowns from "./pages/DentalCrowns";
import WisdomTeeth from "./pages/WisdomTeeth";
import DentalBonding from "./pages/DentalBonding";
import DentalFillings from "./pages/DentalFillings";
import TeethCleaning from "./pages/TeethCleaning";
import Orthodontics from "./pages/Orthodontics";
import SmileAssessment from "./pages/SmileAssessment";
import MembershipPlan from "./pages/MembershipPlan";

// Local area landing pages
import SealBeach from "./pages/cities/SealBeach";
import LosAlamitos from "./pages/cities/LosAlamitos";
import Westminster from "./pages/cities/Westminster";
import Anaheim from "./pages/cities/Anaheim";
import HuntingtonBeach from "./pages/cities/HuntingtonBeach";
import CypressCity from "./pages/cities/CypressCity";
import LongBeach from "./pages/cities/LongBeach";
import Stanton from "./pages/cities/Stanton";
import BuenaPark from "./pages/cities/BuenaPark";
import Rossmoor from "./pages/cities/Rossmoor";
import WestGrove from "./pages/cities/WestGrove";
import GardenGrove from "./pages/cities/GardenGrove";
import Accessibility from "./pages/Accessibility";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import InsuranceFinancing from "./pages/InsuranceFinancing";
import { Redirect } from "wouter";

function Router() {
  return (
    <Switch>
      {/* Core pages */}
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

      {/* Local area SEO landing pages */}
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
       <Route path="/smile-assessment" component={SmileAssessment} />
      <Route path="/membership-plan" component={MembershipPlan} />
      <Route path="/insurance-financing" component={InsuranceFinancing} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/accessibility" component={Accessibility} />

      {/* Redirect legacy/Google-indexed URLs to correct pages */}
      <Route path="/team">{() => <Redirect to="/about" />}</Route>
      <Route path="/our-team">{() => <Redirect to="/about" />}</Route>
      <Route path="/meet-the-team">{() => <Redirect to="/about" />}</Route>
      <Route path="/doctors">{() => <Redirect to="/about" />}</Route>
      <Route path="/staff">{() => <Redirect to="/about" />}</Route>
      {/* Doctor-specific deep links from old WordPress site */}
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
      {/* WordPress specialty/service URL patterns */}
      <Route path="/specialty-dentistry">{() => <Redirect to="/services" />}</Route>
      <Route path="/specialty-dentistry/">{() => <Redirect to="/services" />}</Route>
      <Route path="/services/specialty-dentistry">{() => <Redirect to="/services" />}</Route>
      <Route path="/dental-services">{() => <Redirect to="/services" />}</Route>
      <Route path="/our-services">{() => <Redirect to="/services" />}</Route>
      <Route path="/treatments">{() => <Redirect to="/services" />}</Route>
      <Route path="/cosmetic">{() => <Redirect to="/services" />}</Route>
      <Route path="/cosmetic-dentistry">{() => <Redirect to="/services" />}</Route>
      <Route path="/general-dentistry">{() => <Redirect to="/services" />}</Route>
      <Route path="/restorative">{() => <Redirect to="/services" />}</Route>
      <Route path="/restorative-dentistry">{() => <Redirect to="/services" />}</Route>
      <Route path="/oral-surgery">{() => <Redirect to="/oral-surgery-garden-grove" />}</Route>
      <Route path="/gum-disease">{() => <Redirect to="/periodontics" />}</Route>
      <Route path="/periodontal">{() => <Redirect to="/periodontics" />}</Route>
      <Route path="/root-canal">{() => <Redirect to="/endodontics" />}</Route>
      <Route path="/root-canals">{() => <Redirect to="/endodontics" />}</Route>
      <Route path="/invisalign">{() => <Redirect to="/orthodontics" />}</Route>
      <Route path="/clear-aligners">{() => <Redirect to="/orthodontics" />}</Route>
      <Route path="/veneers">{() => <Redirect to="/veneers" />}</Route>
      <Route path="/crowns">{() => <Redirect to="/dental-crowns" />}</Route>
      <Route path="/wisdom-teeth">{() => <Redirect to="/wisdom-teeth-removal" />}</Route>
      {/* FAQ, Reviews, Membership redirects */}
      <Route path="/faq">{() => <Redirect to="/blog" />}</Route>
      <Route path="/faq/">{() => <Redirect to="/blog" />}</Route>
      <Route path="/reviews">{() => <Redirect to="/about" />}</Route>
      <Route path="/reviews/">{() => <Redirect to="/about" />}</Route>
      <Route path="/membership-plans">{() => <Redirect to="/membership-plan" />}</Route>
      <Route path="/membership-plans/">{() => <Redirect to="/membership-plan" />}</Route>

      {/* Blog pagination */}
      <Route path="/blog/page/:page">{() => <Redirect to="/blog" />}</Route>
      {/* Tooth extraction and other missing pages */}
      <Route path="/tooth-extraction">{() => <Redirect to="/wisdom-teeth-removal" />}</Route>
      <Route path="/tooth-extraction/">{() => <Redirect to="/wisdom-teeth-removal" />}</Route>
      <Route path="/extraction">{() => <Redirect to="/wisdom-teeth-removal" />}</Route>
      <Route path="/extractions">{() => <Redirect to="/wisdom-teeth-removal" />}</Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <LocalBusinessSchema />
          <WebSiteSchema />
          <AnnouncementBanner />
          <Router />
          <LiveChat />
          <AccessibilityWidget />
          <MobileCallBar />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
