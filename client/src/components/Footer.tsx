/* =============================================================
   UPLIFT DENTAL — Footer
   Dark teal background with U-arch pattern overlay, white text
   ============================================================= */
import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, MessageSquare } from "lucide-react";
import { PRACTICE, SITE_IMAGES } from "@/lib/constants";
import { SMS } from "@/lib/sms";

const services = [
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
  { name: "Insurance & Financing", href: "/insurance-financing" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "oklch(0.28 0.08 192)" }} className="text-white relative overflow-hidden">
      {/* Pattern background overlay */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${SITE_IMAGES.patternDark})`, backgroundSize: "600px auto" }}
        aria-hidden="true"
      />

      {/* Emergency Banner */}
      <div className="relative z-10" style={{ backgroundColor: "oklch(0.42 0.09 192)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body font-semibold text-white text-sm">
            ⚡ Dental Emergency? Same-day appointments available in Garden Grove.
          </p>
          <a
            href={PRACTICE.phone.tel}
            className="flex items-center gap-2 bg-white px-5 py-2 rounded-full font-body font-bold text-sm hover:bg-white/90 transition-colors"
            style={{ color: "oklch(0.42 0.09 192)" }}
          >
            <Phone className="w-4 h-4" />
            Call {PRACTICE.phone.display}
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={SITE_IMAGES.logoLight}
              alt="Uplift Dental & Orthodontics"
              className="h-14 w-auto object-contain mb-5"
              style={{ filter: "brightness(0) invert(1) opacity(0.9)" }}
            />
            <p className="font-body text-sm text-white/70 leading-relaxed mb-5">
              Garden Grove's multi-specialty dental practice. Platinum Invisalign® Provider with advanced iTero 3D imaging. Proudly serving Garden Grove, Seal Beach, and Huntington Beach.
            </p>
            {/* Platinum badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 platinum-badge">
              <span className="text-xs font-body font-bold tracking-wide">✦ PLATINUM INVISALIGN® PROVIDER</span>
            </div>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook", href: "https://facebook.com/upliftdental" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com/upliftdental" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/uplift-dental-and-orthodontics" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "oklch(0.42 0.09 192 / 0.5)" }}
                  aria-label={label}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.42 0.09 192)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.42 0.09 192 / 0.5)"}
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
              <a
                href="https://www.google.com/maps/place/Uplift+Dental"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: "oklch(0.42 0.09 192 / 0.5)" }}
                aria-label="Google Reviews"
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.42 0.09 192)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.42 0.09 192 / 0.5)"}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-base mb-5 text-white">Our Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="font-body text-sm text-white/65 hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display font-semibold text-base mb-5 text-white">Office Hours</h3>
            <ul className="space-y-3 mb-5">
              {[
                { day: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
                { day: "3rd Saturday", time: "9:00 AM – 2:00 PM" },
                { day: "Sunday", time: "Closed" },
              ].map((h) => (
                <li key={h.day}>
                  <span className="block font-body text-xs text-white/45 uppercase tracking-wide">{h.day}</span>
                  <span className="font-body text-sm text-white/80">{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="p-3 rounded-xl border" style={{ backgroundColor: "oklch(0.42 0.09 192 / 0.25)", borderColor: "oklch(0.42 0.09 192 / 0.4)" }}>
              <p className="text-xs font-body text-white/80 leading-relaxed">
                <span className="font-bold text-white">Emergency Care Available</span><br />
                Same-day appointments for urgent dental needs.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-base mb-5 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href={PRACTICE.phone.tel} className="flex items-start gap-3 group">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.07 205)" }} />
                  <div>
                    <p className="text-xs font-body text-white/45 uppercase tracking-wide">Phone</p>
                    <p className="font-body text-sm text-white/80 group-hover:text-white transition-colors">{PRACTICE.phone.display}</p>
                  </div>
                </a>
              </li>
              <li>
                <a href={SMS.general} className="flex items-start gap-3 group">
                  <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.07 205)" }} />
                  <div>
                    <p className="text-xs font-body text-white/45 uppercase tracking-wide">Text Us</p>
                    <p className="font-body text-sm text-white/80 group-hover:text-white transition-colors">{PRACTICE.sms.display}</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:Info@UpliftDental.com" className="flex items-start gap-3 group">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.07 205)" }} />
                  <div>
                    <p className="text-xs font-body text-white/45 uppercase tracking-wide">Email</p>
                    <p className="font-body text-sm text-white/80 group-hover:text-white transition-colors">Info@UpliftDental.com</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.07 205)" }} />
                <div>
                  <p className="text-xs font-body text-white/45 uppercase tracking-wide">Address</p>
                  <p className="font-body text-sm text-white/80">{PRACTICE.address.street}<br />{PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}</p>
                  <a
                    href={PRACTICE.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-body mt-1 inline-block hover:text-white transition-colors"
                    style={{ color: "oklch(0.72 0.07 205)" }}
                  >
                    Get Directions →
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.07 205)" }} />
                <div>
                  <p className="text-xs font-body text-white/45 uppercase tracking-wide">Insurance</p>
                  <p className="font-body text-sm text-white/80">Denti-Cal · Most PPOs<br />Military Insurance · Cherry</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t" style={{ borderColor: "oklch(1 0 0 / 0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/40" itemScope itemType="https://schema.org/Dentist">
            © {new Date().getFullYear()}{" "}
            <span itemProp="name">{PRACTICE.name}</span>. All rights reserved. |{" "}
            <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">{PRACTICE.address.street}</span>,{" "}
              <span itemProp="addressLocality">{PRACTICE.address.city}</span>,{" "}
              <span itemProp="addressRegion">{PRACTICE.address.state}</span>{" "}
              <span itemProp="postalCode">{PRACTICE.address.zip}</span>
            </span>{" "}|{" "}
            <a href={PRACTICE.phone.tel} itemProp="telephone" className="hover:text-white/70 transition-colors">{PRACTICE.phone.display}</a>
          </p>
          <div className="flex gap-5">
            <a href="/privacy-policy" className="font-body text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="font-body text-xs text-white/40 hover:text-white/70 transition-colors">
              Terms of Service
            </a>
            <a href="/accessibility" className="font-body text-xs text-white/40 hover:text-white/70 transition-colors">
              Accessibility
            </a>
            <a href="/sitemap.xml" className="font-body text-xs text-white/40 hover:text-white/70 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
