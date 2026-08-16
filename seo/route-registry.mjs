/**
 * Phase 2 technical SEO source of truth.
 *
 * This registry drives initial route documents, sitemap membership, server
 * responses, SiteGround redirects, and 404/410 treatment. It intentionally
 * contains canonical URLs only; aliases belong in LEGACY_REDIRECTS.
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

export const SITE_URL = "https://upliftdental.com";
export const INDEXABLE_ROBOTS = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
export const DEFAULT_OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/hero-smile-optimized_eaf37ef9.jpg";
export const GEO = Object.freeze({ latitude: 33.7815617, longitude: -118.0414966 });

const page = (path, title, description, options = {}) => ({
  path,
  title,
  description,
  priority: options.priority ?? 0.7,
  changefreq: options.changefreq ?? "monthly",
  schema: options.schema ?? "webpage",
  label: options.label ?? title.replace(/\s*\|\s*Uplift Dental.*$/i, ""),
});

export const STATIC_ROUTES = [
  page("/", "Uplift Dental | Dentist in Garden Grove, CA", "Uplift Dental & Orthodontics provides general, cosmetic, restorative, and specialty dental care in Garden Grove, California.", { priority: 1, changefreq: "weekly", schema: "home", label: "Home" }),
  page("/services", "Dental Services | Uplift Dental Garden Grove", "Explore general, cosmetic, restorative, orthodontic, and specialty dental services at Uplift Dental in Garden Grove, California.", { priority: 0.9, schema: "serviceHub", label: "Services" }),
  page("/about", "About Uplift Dental | Garden Grove, CA", "Meet the dental team and learn about Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.8, label: "About" }),
  page("/contact", "Contact Uplift Dental | Garden Grove, CA", "Contact Uplift Dental & Orthodontics in Garden Grove, California, for office information, directions, and appointment scheduling.", { priority: 0.9, label: "Contact" }),
  page("/blog", "Dental Health Blog | Uplift Dental", "Dental health guides, oral-care information, and treatment insights from Uplift Dental & Orthodontics in Garden Grove.", { priority: 0.8, changefreq: "weekly", label: "Dental Health Blog" }),
  page("/special-offers", "Special Dental Offers | Uplift Dental Garden Grove", "View current dental offers and patient information from Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.85, changefreq: "weekly", label: "Special Offers" }),
  page("/gallery", "Dental Practice Gallery | Uplift Dental Garden Grove", "View Uplift Dental & Orthodontics’ Garden Grove practice environment and authorized smile-makeover image gallery.", { priority: 0.7, label: "Gallery" }),
  page("/invisalign", "Invisalign in Garden Grove | Uplift Dental & Orthodontics", "Explore Invisalign consultations at Uplift Dental & Orthodontics in Garden Grove, California. Adults and teens welcome.", { priority: 0.9, schema: "service", label: "Invisalign" }),
  page("/orthodontics", "Orthodontics & Braces | Uplift Dental Garden Grove", "Learn about orthodontic care, braces, and clear-aligner consultations at Uplift Dental in Garden Grove, California.", { priority: 0.9, schema: "service", label: "Orthodontics" }),
  page("/dental-implants", "Dental Implants | Uplift Dental Garden Grove", "Learn about dental implant consultations and tooth-replacement options at Uplift Dental in Garden Grove, California.", { priority: 0.85, schema: "service", label: "Dental Implants" }),
  page("/emergency-dentist", "Emergency Dentist | Uplift Dental Garden Grove", "Contact Uplift Dental in Garden Grove for urgent dental concerns and to check same-day appointment availability.", { priority: 0.85, schema: "service", label: "Emergency Dentist" }),
  page("/periodontics", "Periodontics & Gum Care | Uplift Dental Garden Grove", "Learn about periodontal and gum-care consultations at Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.8, schema: "service", label: "Periodontics" }),
  page("/endodontics", "Endodontics & Root Canal Care | Uplift Dental Garden Grove", "Learn about endodontic and root-canal care consultations at Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.8, schema: "service", label: "Endodontics" }),
  page("/teeth-whitening", "Teeth Whitening | Uplift Dental Garden Grove", "Learn about professional teeth-whitening options at Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.8, schema: "service", label: "Teeth Whitening" }),
  page("/veneers", "Dental Veneers | Uplift Dental Garden Grove", "Learn about dental veneer consultations at Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.8, schema: "service", label: "Dental Veneers" }),
  page("/dental-crowns", "Dental Crowns & Bridges | Uplift Dental Garden Grove", "Learn about dental crowns and bridges at Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.8, schema: "service", label: "Dental Crowns & Bridges" }),
  page("/wisdom-teeth-removal", "Wisdom Teeth Removal | Uplift Dental Garden Grove", "Learn about wisdom-teeth removal and surgical-extraction consultations at Uplift Dental in Garden Grove, California.", { priority: 0.8, schema: "service", label: "Wisdom Teeth Removal" }),
  page("/dental-bonding", "Dental Bonding | Uplift Dental Garden Grove", "Learn about dental bonding consultations at Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.75, schema: "service", label: "Dental Bonding" }),
  page("/dental-fillings", "Tooth-Colored Fillings | Uplift Dental Garden Grove", "Learn about tooth-colored dental fillings at Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.75, schema: "service", label: "Dental Fillings" }),
  page("/teeth-cleaning", "Teeth Cleaning | Uplift Dental Garden Grove", "Learn about routine teeth-cleaning appointments at Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.75, schema: "service", label: "Teeth Cleaning" }),
  page("/dentures", "Dentures | Uplift Dental Garden Grove", "Learn about denture consultations and tooth-replacement options at Uplift Dental in Garden Grove, California.", { priority: 0.75, schema: "service", label: "Dentures" }),
  page("/community-outreach", "Community Outreach | Uplift Dental Garden Grove", "Learn about Uplift Dental & Orthodontics’ community outreach and oral-health education in Garden Grove, California.", { priority: 0.7, label: "Community Outreach" }),
  page("/patient-portal", "Patient Portal | Uplift Dental Garden Grove", "Access the Uplift Dental patient portal and appointment resources.", { priority: 0.8, label: "Patient Portal" }),
  page("/why-choose-us", "Why Choose Uplift Dental | Garden Grove", "Learn about the patient-centered, multi-specialty approach at Uplift Dental & Orthodontics in Garden Grove.", { priority: 0.9, label: "Why Choose Uplift" }),
  page("/our-specialists", "Meet Our Specialists | Uplift Dental Garden Grove", "Meet the specialists supporting care at Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.85, label: "Our Specialists" }),
  page("/invisalign-seal-beach", "Invisalign Near Seal Beach | Uplift Dental", "Explore Invisalign consultations near Seal Beach at Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.7, schema: "service", label: "Invisalign Near Seal Beach" }),
  page("/membership-plan", "Dental Membership Plan | Uplift Dental Garden Grove", "Learn about the Uplift Dental membership plan and patient benefits in Garden Grove, California.", { priority: 0.85, label: "Membership Plan" }),
  page("/insurance-financing", "Dental Insurance & Financing | Uplift Dental Garden Grove", "Review insurance and financing information from Uplift Dental & Orthodontics in Garden Grove, California.", { priority: 0.85, label: "Insurance & Financing" }),
  page("/smile-assessment", "Smile Assessment | Uplift Dental Garden Grove", "Explore Uplift Dental’s smile-assessment information and consultation options in Garden Grove, California.", { priority: 0.8, label: "Smile Assessment" }),
  page("/dentist-near-garden-grove", "Dentist Near Garden Grove | Uplift Dental", "Uplift Dental & Orthodontics serves patients in and near Garden Grove, California.", { priority: 0.75, label: "Dentist Near Garden Grove" }),
  page("/dentist-near-seal-beach", "Dentist Near Seal Beach | Uplift Dental", "Uplift Dental & Orthodontics serves patients near Seal Beach from its Garden Grove office.", { priority: 0.7, label: "Dentist Near Seal Beach" }),
  page("/dentist-near-los-alamitos", "Dentist Near Los Alamitos | Uplift Dental", "Uplift Dental & Orthodontics serves patients near Los Alamitos from its Garden Grove office.", { priority: 0.7, label: "Dentist Near Los Alamitos" }),
  page("/dentist-near-westminster", "Dentist Near Westminster | Uplift Dental", "Uplift Dental & Orthodontics serves patients near Westminster from its Garden Grove office.", { priority: 0.7, label: "Dentist Near Westminster" }),
  page("/dentist-near-anaheim", "Dentist Near Anaheim | Uplift Dental", "Uplift Dental & Orthodontics serves patients near Anaheim from its Garden Grove office.", { priority: 0.7, label: "Dentist Near Anaheim" }),
  page("/dentist-near-huntington-beach", "Dentist Near Huntington Beach | Uplift Dental", "Uplift Dental & Orthodontics serves patients near Huntington Beach from its Garden Grove office.", { priority: 0.7, label: "Dentist Near Huntington Beach" }),
  page("/dentist-near-cypress", "Dentist Near Cypress | Uplift Dental", "Uplift Dental & Orthodontics serves patients near Cypress from its Garden Grove office.", { priority: 0.7, label: "Dentist Near Cypress" }),
  page("/dentist-near-long-beach", "Dentist Near Long Beach | Uplift Dental", "Uplift Dental & Orthodontics serves patients near Long Beach from its Garden Grove office.", { priority: 0.7, label: "Dentist Near Long Beach" }),
  page("/dentist-near-stanton", "Dentist Near Stanton | Uplift Dental", "Uplift Dental & Orthodontics serves patients near Stanton from its Garden Grove office.", { priority: 0.7, label: "Dentist Near Stanton" }),
  page("/dentist-near-buena-park", "Dentist Near Buena Park | Uplift Dental", "Uplift Dental & Orthodontics serves patients near Buena Park from its Garden Grove office.", { priority: 0.7, label: "Dentist Near Buena Park" }),
  page("/dentist-near-rossmoor", "Dentist Near Rossmoor | Uplift Dental", "Uplift Dental & Orthodontics serves patients near Rossmoor from its Garden Grove office.", { priority: 0.7, label: "Dentist Near Rossmoor" }),
  page("/privacy-policy", "Privacy Policy | Uplift Dental", "Read the Uplift Dental & Orthodontics privacy policy.", { priority: 0.3, changefreq: "yearly", label: "Privacy Policy" }),
  page("/terms-of-service", "Terms of Service | Uplift Dental", "Read the Uplift Dental & Orthodontics terms of service.", { priority: 0.3, changefreq: "yearly", label: "Terms of Service" }),
  page("/accessibility", "Accessibility | Uplift Dental Garden Grove", "Learn about Uplift Dental & Orthodontics’ accessibility commitment and digital-accessibility features.", { priority: 0.3, changefreq: "yearly", label: "Accessibility" }),
];

export function getBlogRoutes() {
  const blogDir = join(rootDir, "client", "src", "lib", "blog");
  return readdirSync(blogDir)
    .filter((file) => file.endsWith(".ts") && !["index.ts", "types.ts"].includes(file))
    .flatMap((file) => {
      const source = readFileSync(join(blogDir, file), "utf8");
      const records = [];
      const starts = [...source.matchAll(/\n  \{\n    id:\s*"([^"]+)"/g)];
      for (let index = 0; index < starts.length; index += 1) {
        const start = starts[index];
        const end = starts[index + 1]?.index ?? source.length;
        const record = source.slice(start.index, end);
        const field = (name) => record.match(new RegExp(`${name}:\\s*"([^\"]+)"`))?.[1];
        const slug = field("slug") ?? start[1];
        const title = field("title");
        const description = field("metaDescription");
        const lastmod = field("dateISO");
        if (!/isPublished:\s*true/.test(record) || !title || !description || !lastmod) continue;
        records.push({
          path: `/blog/${slug}`,
          title: `${title} | Uplift Dental & Orthodontics`,
          description,
          priority: 0.65,
          changefreq: "monthly",
          schema: "article",
          label: title,
          lastmod,
        });
      }
      return records;
    });
}

export function getCanonicalRoutes() {
  return [...STATIC_ROUTES, ...getBlogRoutes()];
}

export function normalizePath(inputPath) {
  const parsed = inputPath.includes("://") ? new URL(inputPath).pathname : inputPath;
  const decoded = decodeURIComponent(parsed || "/");
  if (decoded === "/") return "/";
  return `/${decoded.replace(/^\/+|\/+$/g, "")}`;
}

export function getCanonicalRoute(path) {
  const normalized = normalizePath(path);
  return getCanonicalRoutes().find((route) => route.path === normalized) ?? null;
}

const addRedirect = (sources, target, entries) => {
  for (const source of sources) entries[normalizePath(source)] = target;
};

export const LEGACY_REDIRECTS = (() => {
  const entries = {};
  addRedirect(["/Home", "/home", "/index.html"], "/", entries);
  addRedirect(["/team", "/team/angeliki-blanco"], "/about", entries);
  addRedirect(["/results"], "/gallery", entries);
  addRedirect(["/connect", "/refer-a-patient"], "/contact", entries);
  addRedirect(["/dentist-office-events"], "/community-outreach", entries);
  addRedirect(["/top-notch-technology"], "/about", entries);
  addRedirect(["/dental-financing", "/financing-and-insurance-information"], "/insurance-financing", entries);
  addRedirect(["/membership-plans"], "/membership-plan", entries);
  addRedirect(["/special-dental-offers-garden-grove", "/announcements"], "/special-offers", entries);
  addRedirect(["/terms-and-conditions-of-use"], "/terms-of-service", entries);
  addRedirect(["/locations/belmont-shore", "/long-beach", "/locations/long-beach"], "/dentist-near-long-beach", entries);
  addRedirect(["/westminster"], "/dentist-near-westminster", entries);
  addRedirect(["/seal-beach", "/locations/seal-beach"], "/dentist-near-seal-beach", entries);
  addRedirect(["/rossmoor", "/locations/rossmoor"], "/dentist-near-rossmoor", entries);
  addRedirect(["/garden-grove"], "/dentist-near-garden-grove", entries);
  addRedirect(["/huntington-beach"], "/dentist-near-huntington-beach", entries);
  addRedirect(["/cypress"], "/dentist-near-cypress", entries);
  addRedirect(["/los-alamitos"], "/dentist-near-los-alamitos", entries);
  addRedirect(["/buena-park"], "/dentist-near-buena-park", entries);
  addRedirect(["/stanton"], "/dentist-near-stanton", entries);
  addRedirect(["/dental-cleaning"], "/teeth-cleaning", entries);
  addRedirect(["/porcelain-veneers"], "/veneers", entries);
  addRedirect(["/invisalign-treatment-garden-grove-ca"], "/invisalign", entries);
  addRedirect(["/emergency-care", "/emergency-dentist-garden-grove", "/same-day-dental-appointments"], "/emergency-dentist", entries);
  addRedirect(["/dental-bridges"], "/dental-crowns", entries);
  addRedirect(["/oral-surgery"], "/wisdom-teeth-removal", entries);
  addRedirect(["/root-canal-treatment"], "/endodontics", entries);
  addRedirect(["/gum-disease-treatment", "/dont-let-gum-disease-hold-you-back"], "/periodontics", entries);
  addRedirect(["/tmj-treatment", "/tmj-treatment-garden-grove-ca"], "/blog/effective-tmj-treatment-options", entries);
  addRedirect(["/dentofacial-orthopedics", "/orthodontic-treatments", "/braces"], "/orthodontics", entries);
  addRedirect(["/clear-aligners"], "/invisalign", entries);
  addRedirect(["/patient-form"], "/patient-portal", entries);
  addRedirect(["/how-to-keep-your-teeth-healthy-and-white"], "/blog/how-to-keep-your-teeth-healthy-and-white", entries);
  addRedirect(["/a-deep-dive-into-dental-hygiene-floss-vs-water-pick"], "/blog/a-deep-dive-into-dental-hygiene-floss-vs-water-pick", entries);
  addRedirect(["/its-too-early-for-braces-or-is-it"], "/blog/its-too-early-for-braces-or-is-it", entries);
  addRedirect(["/get-started-the-benefits-of-early-intervention-with-invisalign"], "/blog/get-started-the-benefits-of-early-intervention-with-invisalign", entries);
  addRedirect(["/what-are-the-differences-between-dental-insurance-plans", "/2023/10/27/whats-are-the-differences-between-dental-insurance-plans"], "/blog/what-are-the-differences-between-dental-insurance-plans", entries);
  addRedirect(["/oral-health-tips-for-children"], "/blog/oral-health-tips-for-children", entries);
  addRedirect(["/3-tricks-to-make-flossing-with-braces-easier"], "/blog/3-tricks-to-make-flossing-with-braces-easier", entries);
  addRedirect(["/what-happens-during-your-professional-dental-cleaning"], "/blog/what-happens-during-your-professional-dental-cleaning", entries);
  addRedirect(["/the-compassionate-provider"], "/blog/the-compassionate-provider", entries);
  addRedirect(["/diet-and-oral-health"], "/blog/diet-and-oral-health", entries);
  addRedirect(["/is-invisalign-the-same-as-braces"], "/blog/is-invisalign-the-same-as-braces", entries);
  addRedirect(["/i-want-whiter-teeth"], "/blog/i-want-whiter-teeth", entries);
  addRedirect(["/are-clear-aligners-better-than-braces"], "/blog/are-clear-aligners-better-than-braces", entries);
  addRedirect(["/tips-for-optimal-braces-care"], "/blog/tips-for-optimal-braces-care", entries);
  addRedirect(["/oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups"], "/blog/oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups", entries);
  addRedirect(["/invisalign-complete-guide-2026"], "/blog/the-complete-guide-to-invisalign-what-to-expect-from-start-to-finish", entries);
  // Pre-migration sitemap URLs retired by the newer content strategy. Preserve
  // their established relevance with direct one-hop server redirects.
  addRedirect(["/dentist-near-west-grove"], "/dentist-near-garden-grove", entries);
  addRedirect(["/blog/a-parents-guide-to-your-childs-first-dental-visit", "/blog/7-tips-to-keep-your-kids-teeth-healthy-and-cavity-free", "/blog/dental-sealants-the-secret-weapon-against-cavities-for-kids-and-adults"], "/blog/oral-health-tips-for-children", entries);
  addRedirect(["/blog/how-gum-disease-can-affect-your-overall-health"], "/blog/understanding-gum-disease-stages", entries);
  addRedirect(["/blog/new-year-new-smile-setting-dental-health-goals-for-the-year-ahead"], "/blog/how-to-keep-your-teeth-healthy-and-white", entries);
  addRedirect(["/blog/the-ultimate-guide-to-choosing-between-dental-bridge-and-implant"], "/dental-implants", entries);
  addRedirect(["/blog/dental-care-during-pregnancy-what-every-expecting-mom-should-know", "/blog/the-truth-about-dental-anxiety-and-how-to-overcome-it"], "/blog", entries);
  addRedirect(["/blog/tmj-disorder-causes-symptoms-and-treatment-options"], "/blog/effective-tmj-treatment-options", entries);
  addRedirect(["/blog/the-benefits-of-dental-implants-a-permanent-solution-for-missing-teeth"], "/dental-implants", entries);
  addRedirect(["/blog/dental-emergency-away-from-home", "/blog/what-to-do-when-you-crack-or-break-a-tooth"], "/emergency-dentist", entries);
  addRedirect(["/blog/what-are-dental-veneers-and-are-they-right-for-you"], "/veneers", entries);
  addRedirect(["/blog/do-i-really-need-to-floss-a-dentist-answers-your-top-questions"], "/blog/a-deep-dive-into-dental-hygiene-floss-vs-water-pick", entries);
  addRedirect(["/blog/cosmetic-dentistry-5-ways-to-transform-your-smile"], "/blog/smile-makeovers-no-prep-veneers", entries);
  addRedirect(["/blog/understanding-root-canals-why-they-are-nothing-to-fear"], "/endodontics", entries);
  addRedirect(["/blog/how-dental-crowns-can-save-a-damaged-tooth"], "/dental-crowns", entries);
  addRedirect(["/blog/why-regular-dental-cleanings-are-more-important-than-you-think"], "/teeth-cleaning", entries);
  addRedirect(["/blog/braces-vs-invisalign-which-is-better-for-your-teen"], "/blog/are-clear-aligners-better-than-braces", entries);
  addRedirect(["/blog/the-complete-guide-to-invisalign-what-to-expect-from-start-to-finish"], "/blog/invisalign-complete-guide-2026", entries);
  addRedirect(["/blog/everything-you-need-to-know-about-teeth-whitening"], "/teeth-whitening", entries);
  addRedirect(["/blog/how-to-choose-the-best-dentist-in-garden-grove-ca"], "/why-choose-us", entries);
  addRedirect(["/blog/dental-implants-vs-dentures-which-is-right-for-you"], "/dentures", entries);
  addRedirect(["/in-office-teeth-whitening-garden-grove"], "/teeth-whitening", entries);
  addRedirect(["/denti-cal-dentist-near-westminster-garden-grove"], "/insurance-financing", entries);
  // `/blog` is canonical. Its slash variant normalizes to the same registry
  // key, so its trailing-slash handling belongs to the generated route rule.
  return Object.freeze(entries);
})();

export const GONE_PATHS = new Set([
  "/pediatric-dentistry",
  "/dental-x-rays",
  "/what-to-expect-at-your-first-dental-appointment",
  "/locations",
  "/locations/santa-ana",
  "/locations/fountain-valley",
  "/testimonials",
  "/faq",
  "/holistic-dentistry-natural-remedies",
  "/$",
  "/*",
]);
