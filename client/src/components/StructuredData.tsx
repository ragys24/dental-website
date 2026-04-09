/**
 * StructuredData — injects JSON-LD structured data into <head> for SEO.
 * Supports: LocalBusiness/Dentist, FAQPage, BreadcrumbList, MedicalBusiness, WebSite
 */
import { useEffect } from "react";
import { PRACTICE, SITE_IMAGES } from "@/lib/constants";

// ── Core LocalBusiness / Dentist schema ──────────────────────────────────────
export function LocalBusinessSchema() {
  useEffect(() => {
    const id = "ld-local-business";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
      "@id": "https://upliftdental.com/#organization",
      "name": PRACTICE.name,
      "alternateName": PRACTICE.nameShort,
      "url": PRACTICE.website,
      "logo": "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/logo-og_e9a52b9b.webp",
      "image": SITE_IMAGES.hero,
      "description": "Uplift Dental & Orthodontics is a top-rated dental practice in Garden Grove, CA 92845 offering general dentistry, Invisalign, dental implants, orthodontics, oral surgery, periodontics, endodontics, and cosmetic dentistry. Platinum Invisalign Provider. Denti-Cal, PPO, and military insurance accepted.",
      "telephone": PRACTICE.phone.digits,
      "email": PRACTICE.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": PRACTICE.address.street,
        "addressLocality": PRACTICE.address.city,
        "addressRegion": PRACTICE.address.state,
        "postalCode": PRACTICE.address.zip,
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 33.7783,
        "longitude": -117.9601
      },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "17:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "14:00" }
      ],
      "priceRange": "$$",
      "currenciesAccepted": "USD",
      "paymentAccepted": "Cash, Credit Card, Denti-Cal, PPO Insurance, Military Insurance",
      "acceptedInsurance": ["Denti-Cal", "PPO Insurance", "Military Insurance (TRICARE)", "Delta Dental", "MetLife", "Cigna", "Aetna", "Anthem Blue Cross", "Ameritas", "United Healthcare", "United Concordia"],
      "areaServed": [
        { "@type": "City", "name": "Garden Grove", "sameAs": "https://en.wikipedia.org/wiki/Garden_Grove,_California" },
        { "@type": "PostalAddress", "addressLocality": "Garden Grove", "addressRegion": "CA", "postalCode": "92840", "addressCountry": "US" },
        { "@type": "PostalAddress", "addressLocality": "Garden Grove", "addressRegion": "CA", "postalCode": "92841", "addressCountry": "US" },
        { "@type": "PostalAddress", "addressLocality": "Garden Grove", "addressRegion": "CA", "postalCode": "92843", "addressCountry": "US" },
        { "@type": "PostalAddress", "addressLocality": "Garden Grove", "addressRegion": "CA", "postalCode": "92844", "addressCountry": "US" },
        { "@type": "PostalAddress", "addressLocality": "Garden Grove", "addressRegion": "CA", "postalCode": "92845", "addressCountry": "US" },
        { "@type": "City", "name": "Seal Beach", "sameAs": "https://en.wikipedia.org/wiki/Seal_Beach,_California" },
        { "@type": "PostalAddress", "addressLocality": "Seal Beach", "addressRegion": "CA", "postalCode": "90740", "addressCountry": "US" },
        { "@type": "City", "name": "Los Alamitos", "sameAs": "https://en.wikipedia.org/wiki/Los_Alamitos,_California" },
        { "@type": "PostalAddress", "addressLocality": "Los Alamitos", "addressRegion": "CA", "postalCode": "90720", "addressCountry": "US" },
        { "@type": "City", "name": "Westminster", "sameAs": "https://en.wikipedia.org/wiki/Westminster,_California" },
        { "@type": "PostalAddress", "addressLocality": "Westminster", "addressRegion": "CA", "postalCode": "92683", "addressCountry": "US" },
        { "@type": "City", "name": "Cypress", "sameAs": "https://en.wikipedia.org/wiki/Cypress,_California" },
        { "@type": "PostalAddress", "addressLocality": "Cypress", "addressRegion": "CA", "postalCode": "90630", "addressCountry": "US" },
        { "@type": "City", "name": "Huntington Beach", "sameAs": "https://en.wikipedia.org/wiki/Huntington_Beach,_California" },
        { "@type": "PostalAddress", "addressLocality": "Huntington Beach", "addressRegion": "CA", "postalCode": "92647", "addressCountry": "US" },
        { "@type": "PostalAddress", "addressLocality": "Huntington Beach", "addressRegion": "CA", "postalCode": "92648", "addressCountry": "US" },
        { "@type": "City", "name": "Anaheim", "sameAs": "https://en.wikipedia.org/wiki/Anaheim,_California" },
        { "@type": "PostalAddress", "addressLocality": "Anaheim", "addressRegion": "CA", "postalCode": "92801", "addressCountry": "US" },
        { "@type": "PostalAddress", "addressLocality": "Anaheim", "addressRegion": "CA", "postalCode": "92804", "addressCountry": "US" },
        { "@type": "City", "name": "Long Beach", "sameAs": "https://en.wikipedia.org/wiki/Long_Beach,_California" },
        { "@type": "PostalAddress", "addressLocality": "Long Beach", "addressRegion": "CA", "postalCode": "90803", "addressCountry": "US" },
        { "@type": "City", "name": "Buena Park", "sameAs": "https://en.wikipedia.org/wiki/Buena_Park,_California" },
        { "@type": "PostalAddress", "addressLocality": "Buena Park", "addressRegion": "CA", "postalCode": "90620", "addressCountry": "US" },
        { "@type": "City", "name": "Stanton", "sameAs": "https://en.wikipedia.org/wiki/Stanton,_California" },
        { "@type": "PostalAddress", "addressLocality": "Stanton", "addressRegion": "CA", "postalCode": "90680", "addressCountry": "US" },
        { "@type": "City", "name": "Rossmoor" },
        { "@type": "PostalAddress", "addressLocality": "Rossmoor", "addressRegion": "CA", "postalCode": "90720", "addressCountry": "US" }
      ],
      "hasMap": PRACTICE.googleMapsUrl,
      "sameAs": [
        "https://www.facebook.com/upliftdental",
        "https://www.instagram.com/upliftdental",
        "https://www.yelp.com/biz/uplift-dental-and-orthodontics-garden-grove"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": String(PRACTICE.googleReviews.rating),
        "reviewCount": String(PRACTICE.googleReviews.count),
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Sunday Heppner" },
          "datePublished": "2024-06-15",
          "reviewBody": "Dr. Clark has been a blessing to me by fixing my crooked teeth and transforming them into a beautiful smile so I can feel confident when taking pictures. He is so reasonably priced in times when money is an issue. If you want perfect teeth and a great smile, you need to come to Dr. Clark Schneekluth."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Andrew Hanna" },
          "datePublished": "2024-05-22",
          "reviewBody": "Dr. Stefan has been great since I started seeing him for my 6-month checkups and teeth cleanings. He goes over my X-rays and explains what he sees, whether good or bad. I appreciate that he takes his time with the cleanings as well. I would highly recommend him if you are looking for a caring dentist."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Patricia Robbins" },
          "datePublished": "2024-04-10",
          "reviewBody": "Great dental office & dentist. Takes time to listen & make sure you are comfortable before beginning. No surprises with costs either. If you need a dentist, this is the place to go."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Maria G." },
          "datePublished": "2024-03-28",
          "reviewBody": "The staff is incredibly welcoming and professional. I was nervous about my first visit but they made me feel at ease immediately. The office is modern and clean, and Dr. Stefan is thorough and kind. Highly recommend!"
        }
      ],

      "medicalSpecialty": ["Dentistry", "Orthodontics", "Oral Surgery", "Periodontics", "Endodontics"],
      "knowsAbout": ["Invisalign", "Dental Implants", "Cosmetic Dentistry", "Emergency Dentistry", "Orthodontics", "Periodontics", "Endodontics", "Oral Surgery"],
      "award": [
        "Platinum Invisalign Provider",
        "Top-Rated Dental Practice - Google Reviews",
        "Best Dentist in Garden Grove - Patient Choice"
      ],
      "founder": { "@type": "Person", "name": "Dr. Ragy Stefan", "url": "https://upliftdental.com/about#dr-stefan" },
      "staff": [
        { "@type": "Person", "name": "Dr. Ragy Stefan", "jobTitle": "General Dentist", "url": "https://upliftdental.com/about#dr-stefan" },
        { "@type": "Person", "name": "Dr. Clark Schneekluth", "jobTitle": "Orthodontist", "url": "https://upliftdental.com/about#dr-schneekluth" },
        { "@type": "Person", "name": "Dr. Joseph Youssef", "jobTitle": "Oral Surgeon", "url": "https://upliftdental.com/about#dr-youssef" },
        { "@type": "Person", "name": "Dr. Erene Saad", "jobTitle": "Periodontist", "url": "https://upliftdental.com/about#dr-saad" },
        { "@type": "Person", "name": "Dr. Daniel Ghobrial", "jobTitle": "Endodontist", "url": "https://upliftdental.com/about#dr-ghobrial" }
      ],
      "availableService": [
        { "@type": "MedicalProcedure", "name": "Teeth Cleaning", "procedureType": "Preventive" },
        { "@type": "MedicalProcedure", "name": "Invisalign Clear Aligners", "procedureType": "Therapeutic" },
        { "@type": "MedicalProcedure", "name": "Dental Implants", "procedureType": "Surgical" },
        { "@type": "MedicalProcedure", "name": "Root Canal Therapy", "procedureType": "Therapeutic" },
        { "@type": "MedicalProcedure", "name": "Teeth Whitening", "procedureType": "Cosmetic" },
        { "@type": "MedicalProcedure", "name": "Porcelain Veneers", "procedureType": "Cosmetic" },
        { "@type": "MedicalProcedure", "name": "Wisdom Teeth Removal", "procedureType": "Surgical" },
        { "@type": "MedicalProcedure", "name": "LANAP Laser Gum Therapy", "procedureType": "Therapeutic" },
        { "@type": "MedicalProcedure", "name": "Dental Crowns", "procedureType": "Restorative" },
        { "@type": "MedicalProcedure", "name": "Emergency Dental Care", "procedureType": "Emergency" }
      ]
    });
    document.head.appendChild(script);
    return () => { document.getElementById(id)?.remove(); };
  }, []);
  return null;
}

// ── WebSite schema with sitelinks searchbox ──────────────────────────────────
export function WebSiteSchema() {
  useEffect(() => {
    const id = "ld-website";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://upliftdental.com/#website",
      "url": "https://upliftdental.com",
      "name": PRACTICE.name,
      "description": "Top-rated dentist in Garden Grove, CA. Platinum Invisalign Provider. General, cosmetic, and specialty dentistry. Denti-Cal accepted.",
      "publisher": { "@id": "https://upliftdental.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://upliftdental.com/blog?q={search_term_string}" },
        "query-input": "required name=search_term_string"
      }
    });
    document.head.appendChild(script);
    return () => { document.getElementById(id)?.remove(); };
  }, []);
  return null;
}

// ── FAQPage schema ────────────────────────────────────────────────────────────
interface FAQItem { question: string; answer: string; }
interface FAQSchemaProps { faqs: FAQItem[]; id?: string; }

export function FAQSchema({ faqs, id = "ld-faq" }: FAQSchemaProps) {
  useEffect(() => {
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    });
    document.head.appendChild(script);
    return () => { document.getElementById(id)?.remove(); };
  }, [faqs, id]);
  return null;
}

// ── MedicalWebPage schema for specialty pages ─────────────────────────────────
interface MedicalPageSchemaProps {
  name: string;
  url: string;
  description: string;
  medicalSpecialty: string;
  keywords?: string;
}

export function MedicalPageSchema({ name, url, description, medicalSpecialty, keywords }: MedicalPageSchemaProps) {
  useEffect(() => {
    const id = "ld-medical-page";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": name,
      "url": url,
      "description": description,
      "keywords": keywords,
      "medicalAudience": { "@type": "Patient" },
      "about": { "@type": "MedicalCondition", "name": medicalSpecialty },
      "provider": { "@id": "https://upliftdental.com/#organization" },
      "isPartOf": { "@id": "https://upliftdental.com/#website" }
    });
    document.head.appendChild(script);
    return () => { document.getElementById(id)?.remove(); };
  }, [name, url, description, medicalSpecialty, keywords]);
  return null;
}
