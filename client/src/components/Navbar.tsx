/* =============================================================
   UPLIFT DENTAL — Navbar
   Uses real logo (Logo-01 = dark teal on white, white version on dark bg)
   Brand: Deep teal oklch(0.42 0.09 192), elegant serif typography
   ============================================================= */
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown, Calendar, MessageSquare } from "lucide-react";
import { PRACTICE, SITE_IMAGES } from "@/lib/constants";
import { SMS } from "@/lib/sms";

const serviceLinks = [
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
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = useCallback(() => setServicesOpen(v => !v), []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!servicesOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [servicesOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isHome = location === "/";
  const solidNav = scrolled || !isHome;
  // On homepage before scroll: use a dark semi-transparent bg so nav text is always visible
  // even if the hero image hasn't loaded yet
  const heroNav = isHome && !scrolled;

  return (
    <>
      {/* Sticky wrapper — keeps info bar + main nav together when scrolling */}
      <div className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="hidden md:block" style={{ backgroundColor: "oklch(0.28 0.08 192)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4 text-white/80 text-xs font-body">
            <span className="font-semibold text-white text-sm tracking-wide">{PRACTICE.name} &mdash; {PRACTICE.address.city}, {PRACTICE.address.state}</span>
            <span className="text-white/40">·</span>
            <span>Mon–Fri: 9am–5pm &nbsp;·&nbsp; 3rd Sat: 9am–2pm</span>
            <span className="text-white/40">·</span>
            <span className="text-white/60">{PRACTICE.address.full}</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-body">
              <span className="text-white/70">Denti-Cal · PPO · Military · Same-Day Emergency</span>
            <a href={SMS.general} className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <MessageSquare className="w-3 h-3" />
              Text {PRACTICE.sms.display}
            </a>
            <a href={PRACTICE.phone.tel} className="flex items-center gap-1.5 font-semibold text-white hover:text-white/80 transition-colors">
              <Phone className="w-3 h-3" />
              {PRACTICE.phone.display}
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`left-0 right-0 transition-all duration-400 ${
          solidNav
            ? "bg-white/97 backdrop-blur-md shadow-sm border-b border-[oklch(0.90_0.02_205)]"
            : isHome
            ? "bg-[oklch(0.20_0.06_192)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <img
                src={solidNav ? SITE_IMAGES.logoPrimary : SITE_IMAGES.logoLight}
                alt="Uplift Dental & Orthodontics"
                className="h-16 w-auto object-contain transition-all duration-300"
                style={{ filter: !solidNav && !isHome ? "brightness(0) invert(1)" : "none" }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center gap-1 font-body font-medium text-sm transition-colors ${solidNav ? "text-[oklch(0.14_0.02_220)] hover:text-[oklch(0.42_0.09_192)]" : "text-white/90 hover:text-white"}`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                {servicesOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-60 bg-white rounded-2xl shadow-2xl border border-[oklch(0.90_0.02_205)] py-2 z-50 overflow-hidden"
                    style={{ marginTop: "8px" }}
                  >
                    <div className="px-4 py-2.5 border-b border-[oklch(0.90_0.02_205)]" style={{ backgroundColor: "oklch(0.97 0.015 205)" }}>
                      <p className="text-[10px] font-body font-bold uppercase tracking-widest" style={{ color: "oklch(0.42 0.09 192)" }}>Our Services</p>
                    </div>
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.name}
                        href={s.href}
                        className="block px-4 py-2.5 text-sm font-body text-[oklch(0.14_0.02_220)] transition-colors hover:bg-[oklch(0.97_0.015_205)] hover:text-[oklch(0.42_0.09_192)]"
                        onClick={() => setServicesOpen(false)}
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {[
                { label: "About", href: "/about" },
                { label: "Insurance", href: "/insurance-financing" },
                { label: "Gallery", href: "/gallery" },
                { label: "Special Offers", href: "/special-offers" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-body font-medium text-sm transition-colors link-underline ${solidNav ? "text-[oklch(0.14_0.02_220)] hover:text-[oklch(0.42_0.09_192)]" : "text-white/90 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={PRACTICE.phone.tel}
                className={`flex items-center gap-2 text-sm font-body font-semibold transition-colors ${solidNav ? "text-[oklch(0.42_0.09_192)]" : "text-white"}`}
              >
                <Phone className="w-4 h-4" />
                {PRACTICE.phone.display}
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm font-body font-semibold transition-all hover:shadow-lg active:scale-95"
                style={{ backgroundColor: "oklch(0.42 0.09 192)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.35 0.09 192)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.42 0.09 192)"}
              >
                <Calendar className="w-4 h-4" />
                Book Free Consult
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${solidNav ? "text-[oklch(0.14_0.02_220)]" : "text-white"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
      </div>{/* end sticky wrapper */}

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ paddingTop: "80px" }}
      >
        <div className="px-6 py-6 space-y-6 overflow-y-auto h-full">
          <div className="flex justify-center pb-2">
            <img src={SITE_IMAGES.logoPrimary} alt={PRACTICE.nameShort} className="h-14 w-auto object-contain" />
          </div>
          <div>
            <p className="text-[10px] font-body font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.42 0.09 192)" }}>Services</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {serviceLinks.map((s) => (
                <Link key={s.name} href={s.href} className="text-sm font-body text-[oklch(0.14_0.02_220)] hover:text-[oklch(0.42_0.09_192)] py-1 transition-colors">
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
          <hr className="border-[oklch(0.90_0.02_205)]" />
          {[
            { label: "About Us", href: "/about" },
            { label: "Insurance & Financing", href: "/insurance-financing" },
            { label: "Gallery", href: "/gallery" },
            { label: "Special Offers", href: "/special-offers" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="block text-xl font-display font-medium text-[oklch(0.14_0.02_220)] hover:text-[oklch(0.42_0.09_192)] transition-colors">
              {item.label}
            </Link>
          ))}
          <hr className="border-[oklch(0.90_0.02_205)]" />
          <div className="space-y-3 pb-8">
            <a href={PRACTICE.phone.tel} className="flex items-center gap-2 font-body font-semibold text-lg" style={{ color: "oklch(0.42 0.09 192)" }}>
              <Phone className="w-5 h-5" />
              Call {PRACTICE.phone.display}
            </a>
            <a href={SMS.general} className="flex items-center gap-2 font-body font-semibold text-lg" style={{ color: "oklch(0.42 0.09 192)" }}>
              <MessageSquare className="w-5 h-5" />
              Text {PRACTICE.sms.display} — Faster Service
            </a>
            <Link href="/contact" className="flex items-center justify-center gap-2 w-full text-white px-6 py-3.5 rounded-full font-body font-semibold text-base transition-colors" style={{ backgroundColor: "oklch(0.42 0.09 192)" }}>
              <Calendar className="w-5 h-5" />
              Book Free Consultation Online
            </Link>
            <p className="text-xs font-body text-center text-[oklch(0.52_0.04_205)]">Denti-Cal · PPO · Military Insurance Accepted</p>
          </div>
        </div>
      </div>
    </>
  );
}
