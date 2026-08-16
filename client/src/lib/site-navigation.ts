/**
 * Uplift Dental — Shared information architecture
 *
 * Keep public navigation labels and destinations in one place so header,
 * footer, mobile navigation, and non-JavaScript fallbacks never drift.
 */

export interface SiteLink {
  name: string;
  href: string;
}

export const SERVICE_NAV_LINKS: readonly SiteLink[] = [
  { name: "General Dentistry", href: "/services" },
  { name: "Cosmetic Dentistry", href: "/services" },
  { name: "Teeth Whitening", href: "/teeth-whitening" },
  { name: "Veneers", href: "/veneers" },
  { name: "Dental Crowns", href: "/dental-crowns" },
  { name: "Dental Bonding", href: "/dental-bonding" },
  { name: "Invisalign", href: "/invisalign" },
  { name: "Braces & Orthodontics", href: "/orthodontics" },
  { name: "Dental Implants", href: "/dental-implants" },
  { name: "Wisdom Teeth Removal", href: "/wisdom-teeth-removal" },
  { name: "Periodontics & Gum Care", href: "/periodontics" },
  { name: "Endodontics", href: "/endodontics" },
  { name: "Emergency Dentistry", href: "/emergency-dentist" },
  { name: "Teeth Cleaning", href: "/teeth-cleaning" },
  { name: "Dental Fillings", href: "/dental-fillings" },
  { name: "Dentures", href: "/dentures" },
] as const;

export const FOOTER_SERVICE_LINKS = [
  ...SERVICE_NAV_LINKS.filter((link) => link.href !== "/dentures"),
  { name: "Insurance & Financing", href: "/insurance-financing" },
] as const;

export const PATIENT_NAV_LINKS: readonly SiteLink[] = [
  { name: "Insurance & Financing", href: "/insurance-financing" },
  { name: "Membership Plan", href: "/membership-plan" },
  { name: "Patient Portal", href: "/patient-portal" },
  { name: "Special Offers", href: "/special-offers" },
  { name: "Community Outreach", href: "/community-outreach" },
  { name: "Meet Our Specialists", href: "/our-specialists" },
] as const;

export const PRIMARY_NAV_LINKS: readonly SiteLink[] = [
  { name: "About Us", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
] as const;

export const LOCAL_SERVICE_AREAS = [
  "Garden Grove",
  "West Garden Grove",
  "Seal Beach",
  "Los Alamitos",
  "Westminster",
  "Cypress",
  "Huntington Beach",
  "Anaheim",
  "Long Beach",
  "Stanton",
  "Buena Park",
  "Rossmoor",
] as const;
