/* =============================================================
   UPLIFT DENTAL — Related Services Component
   Purpose: Reduce bounce rate by cross-linking service pages
   Design: Clean card grid with teal accents
   ============================================================= */
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface ServiceLink {
  title: string;
  description: string;
  href: string;
  emoji: string;
}

const ALL_SERVICES: ServiceLink[] = [
  { title: "Invisalign", description: "Clear aligners from a Platinum Provider", href: "/invisalign", emoji: "😁" },
  { title: "Dental Implants", description: "Permanent tooth replacement with 3D imaging", href: "/dental-implants", emoji: "🦷" },
  { title: "Veneers", description: "Porcelain & composite smile transformations", href: "/veneers", emoji: "✨" },
  { title: "Teeth Whitening", description: "Up to 8 shades whiter in one visit", href: "/teeth-whitening", emoji: "⚡" },
  { title: "Orthodontics", description: "Braces & clear aligners for all ages", href: "/orthodontics", emoji: "🔧" },
  { title: "Emergency Dentist", description: "Same-day care for pain & trauma", href: "/emergency-dentist", emoji: "🚨" },
  { title: "Periodontics", description: "LANAP laser gum disease treatment", href: "/periodontics", emoji: "💚" },
  { title: "Endodontics", description: "Microscopic root canal therapy", href: "/endodontics", emoji: "🔬" },
  { title: "Oral Surgery", description: "Wisdom teeth & jaw surgery by OMFS", href: "/oral-surgery", emoji: "⚕️" },
  { title: "Teeth Cleaning", description: "Professional cleaning & prevention", href: "/teeth-cleaning", emoji: "🪥" },
  { title: "Dental Crowns", description: "Same-day crowns & full restoration", href: "/dental-crowns", emoji: "👑" },
  { title: "Dentures", description: "Traditional, 3D-printed & implant-supported", href: "/dentures", emoji: "😊" },
];

interface RelatedServicesProps {
  exclude?: string[]; // hrefs to exclude (current page)
  limit?: number;
  title?: string;
}

export default function RelatedServices({ exclude = [], limit = 4, title = "Explore Our Other Services" }: RelatedServicesProps) {
  const services = ALL_SERVICES.filter(s => !exclude.includes(s.href)).slice(0, limit);

  return (
    <section className="py-16 bg-[oklch(0.97_0.008_192)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-[oklch(0.14_0.02_220)] mb-2">{title}</h2>
          <p className="font-body text-[oklch(0.45_0.02_220)] text-sm">Uplift Dental & Orthodontics — comprehensive multi-specialty care under one roof</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(service => (
            <Link
              key={service.href}
              href={service.href}
              className="group bg-white rounded-2xl p-5 border border-[oklch(0.92_0.01_192)] hover:border-[oklch(0.42_0.09_192)] hover:shadow-md transition-all duration-200 flex flex-col gap-2"
            >
              <span className="text-2xl">{service.emoji}</span>
              <h3 className="font-display font-bold text-sm text-[oklch(0.14_0.02_220)] group-hover:text-[oklch(0.42_0.09_192)] transition-colors leading-snug">{service.title}</h3>
              <p className="font-body text-xs text-[oklch(0.55_0.02_220)] leading-relaxed flex-1">{service.description}</p>
              <span className="flex items-center gap-1 text-xs font-body font-semibold text-[oklch(0.42_0.09_192)] mt-1 group-hover:gap-2 transition-all">
                Learn more <ChevronRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-body font-semibold text-[oklch(0.42_0.09_192)] hover:text-[oklch(0.28_0.08_192)] transition-colors">
            View all services <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
