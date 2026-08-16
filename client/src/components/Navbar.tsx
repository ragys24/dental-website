/* =============================================================
   UPLIFT DENTAL — Navbar (Redesigned)
   Clean, minimal two-row header: slim utility bar + spacious main nav
   Reduced clutter: grouped secondary links under "Patients" dropdown
   Brand: Deep teal oklch(0.42 0.09 192), elegant serif typography
   ============================================================= */
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown, Calendar, MapPin, Clock } from "lucide-react";
import { PRACTICE, SITE_IMAGES } from "@/lib/constants";
import { PATIENT_NAV_LINKS, PRIMARY_NAV_LINKS, SERVICE_NAV_LINKS } from "@/lib/site-navigation";
import { SMS } from "@/lib/sms";
import { trackSchedule } from "@/lib/tracking";

const serviceLinks = SERVICE_NAV_LINKS;
const patientLinks = PATIENT_NAV_LINKS;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [patientsOpen, setPatientsOpen] = useState(false);
  const [location] = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);
  const patientsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const wasMobileOpen = useRef(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!servicesOpen && !patientsOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (servicesOpen && servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (patientsOpen && patientsRef.current && !patientsRef.current.contains(e.target as Node)) {
        setPatientsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [servicesOpen, patientsOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setPatientsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const dialog = mobileMenuRef.current;
    if (!dialog) return;

    if (!mobileOpen) {
      if (wasMobileOpen.current) {
        requestAnimationFrame(() => mobileTriggerRef.current?.focus());
        wasMobileOpen.current = false;
      }
      return;
    }

    wasMobileOpen.current = true;
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
    const focusable = getFocusable();
    (focusable[0] || dialog).focus();

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const elements = getFocusable();
      if (!elements.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("keydown", trapFocus);
    return () => dialog.removeEventListener("keydown", trapFocus);
  }, [mobileOpen]);

  useEffect(() => {
    const closeMenus = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setPatientsOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", closeMenus);
    return () => document.removeEventListener("keydown", closeMenus);
  }, []);

  const isHome = location === "/";
  const solidNav = scrolled || !isHome;

  return (
    <>
      {/* Sticky wrapper */}
      <div className="sticky top-0 z-50">
        {/* Slim utility bar — desktop only */}
        <div className="hidden lg:block" style={{ backgroundColor: "oklch(0.22 0.06 192)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center">
            <div className="flex items-center gap-5 text-white/75 text-xs font-body">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-white/50" />
                Mon–Fri: 9am–5pm &nbsp;·&nbsp; 3rd Sat: 9am–2pm
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-white/50" />
                {PRACTICE.address.full}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-body">
              <span className="text-white/60">PPO · Military · Denti-Cal</span>
              <span className="text-white/40">|</span>
              <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="text-white font-semibold hover:text-white/80 transition-colors">
                {PRACTICE.phone.display}
              </a>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <header
          className={`left-0 right-0 transition-all duration-400 ${
            solidNav
              ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-[oklch(0.92_0.01_205)]"
              : isHome
              ? "bg-[oklch(0.20_0.06_192)]/90 backdrop-blur-sm"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[72px]">
              {/* Logo */}
              <Link href="/" className="shrink-0 flex items-center">
                <img
                  src={solidNav ? SITE_IMAGES.logoPrimary : SITE_IMAGES.logoLight}
                  alt="Uplift Dental & Orthodontics"
                  className="h-16 md:h-[4.5rem] w-auto object-contain transition-all duration-300"
                  style={{ filter: !solidNav && !isHome ? "brightness(0) invert(1)" : "none" }}
                />
              </Link>

              {/* Desktop Nav — reduced to 5 core items */}
              <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
                {/* Services Dropdown */}
                <div className="relative" ref={servicesRef}>
                  <button
                    onClick={() => { setServicesOpen(v => !v); setPatientsOpen(false); }}
                    className={`flex items-center gap-1 font-body font-medium text-[13px] px-3 py-2 rounded-lg transition-colors ${
                      solidNav
                        ? "text-[oklch(0.25_0.02_220)] hover:text-[oklch(0.42_0.09_192)] hover:bg-[oklch(0.97_0.01_192)]"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                    aria-expanded={servicesOpen}
                    aria-haspopup="menu"
                    aria-controls="services-navigation-menu"
                  >
                    Services
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {servicesOpen && (
                    <div
                      id="services-navigation-menu"
                      role="menu"
                      className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-[oklch(0.93_0.01_205)] py-1.5 z-50 overflow-hidden"
                      style={{ marginTop: "4px" }}
                    >
                      <div className="px-4 py-2 border-b border-[oklch(0.94_0.01_205)]">
                        <p className="text-[10px] font-body font-bold uppercase tracking-widest" style={{ color: "oklch(0.42 0.09 192)" }}>Our Services</p>
                      </div>
                      <div className="max-h-[320px] overflow-y-auto">
                        {serviceLinks.map((s) => (
                          <Link
                            key={s.name}
                            href={s.href}
                            role="menuitem"
                            className="block px-4 py-2 text-[13px] font-body text-[oklch(0.25_0.02_220)] transition-colors hover:bg-[oklch(0.97_0.01_192)] hover:text-[oklch(0.42_0.09_192)]"
                            onClick={() => setServicesOpen(false)}
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Core links */}
                <Link
                  href="/about"
                  className={`font-body font-medium text-[13px] px-3 py-2 rounded-lg transition-colors ${
                    solidNav
                      ? "text-[oklch(0.25_0.02_220)] hover:text-[oklch(0.42_0.09_192)] hover:bg-[oklch(0.97_0.01_192)]"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  About
                </Link>

                {/* Patients Dropdown (Insurance, Membership, Offers, Community) */}
                <div className="relative" ref={patientsRef}>
                  <button
                    onClick={() => { setPatientsOpen(v => !v); setServicesOpen(false); }}
                    className={`flex items-center gap-1 font-body font-medium text-[13px] px-3 py-2 rounded-lg transition-colors ${
                      solidNav
                        ? "text-[oklch(0.25_0.02_220)] hover:text-[oklch(0.42_0.09_192)] hover:bg-[oklch(0.97_0.01_192)]"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                    aria-expanded={patientsOpen}
                    aria-haspopup="menu"
                    aria-controls="patient-navigation-menu"
                  >
                    Patients
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${patientsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {patientsOpen && (
                    <div
                      id="patient-navigation-menu"
                      role="menu"
                      className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-[oklch(0.93_0.01_205)] py-1.5 z-50 overflow-hidden"
                      style={{ marginTop: "4px" }}
                    >
                      <div className="px-4 py-2 border-b border-[oklch(0.94_0.01_205)]">
                        <p className="text-[10px] font-body font-bold uppercase tracking-widest" style={{ color: "oklch(0.42 0.09 192)" }}>Patient Resources</p>
                      </div>
                      {patientLinks.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          role="menuitem"
                          className="block px-4 py-2.5 text-[13px] font-body text-[oklch(0.25_0.02_220)] transition-colors hover:bg-[oklch(0.97_0.01_192)] hover:text-[oklch(0.42_0.09_192)]"
                          onClick={() => setPatientsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/gallery"
                  className={`font-body font-medium text-[13px] px-3 py-2 rounded-lg transition-colors ${
                    solidNav
                      ? "text-[oklch(0.25_0.02_220)] hover:text-[oklch(0.42_0.09_192)] hover:bg-[oklch(0.97_0.01_192)]"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Gallery
                </Link>

                <Link
                  href="/blog"
                  className={`font-body font-medium text-[13px] px-3 py-2 rounded-lg transition-colors ${
                    solidNav
                      ? "text-[oklch(0.25_0.02_220)] hover:text-[oklch(0.42_0.09_192)] hover:bg-[oklch(0.97_0.01_192)]"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Blog
                </Link>

                <Link
                  href="/contact"
                  className={`font-body font-medium text-[13px] px-3 py-2 rounded-lg transition-colors ${
                    solidNav
                      ? "text-[oklch(0.25_0.02_220)] hover:text-[oklch(0.42_0.09_192)] hover:bg-[oklch(0.97_0.01_192)]"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Contact
                </Link>
              </nav>

              {/* CTA area */}
              <div className="hidden lg:flex items-center gap-2">
                <a href={PRACTICE.phone.tel} onClick={trackSchedule}
                  className={`flex items-center gap-1.5 text-[13px] font-body font-semibold px-3 py-2 rounded-lg transition-colors ${
                    solidNav
                      ? "text-[oklch(0.42_0.09_192)] hover:bg-[oklch(0.97_0.01_192)]"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  {PRACTICE.phone.display}
                </a>
                <Link
                  href="/contact" onClick={trackSchedule}
                  className="flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-[13px] font-body font-semibold transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: "oklch(0.42 0.09 192)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.35 0.09 192)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.42 0.09 192)"}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book Free Consult
                </Link>
              </div>

              {/* Mobile toggle */}
              <button
                ref={mobileTriggerRef}
                className={`lg:hidden p-2 rounded-lg transition-[background-color,color] duration-200 motion-reduce:transition-none ${solidNav ? "text-[oklch(0.14_0.02_220)]" : "text-white"} ${mobileOpen ? "bg-[oklch(0.42_0.09_192)]/10" : ""}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                <span className={`flex transition-transform duration-200 motion-reduce:transition-none ${mobileOpen ? "rotate-90" : "rotate-0"}`}>
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </span>
              </button>
            </div>
          </div>
        </header>
      </div>{/* end sticky wrapper */}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile site navigation"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        tabIndex={-1}
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-md transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${mobileOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"}`}
        style={{ paddingTop: "80px" }}
      >
        <div className={`px-6 py-6 space-y-5 overflow-y-auto h-full transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${mobileOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
          <div className="flex justify-center pb-2">
            <img src={SITE_IMAGES.logoPrimary} alt={PRACTICE.nameShort} className="h-12 w-auto object-contain" />
          </div>

          {/* Services section */}
          <div>
            <p className="text-[10px] font-body font-bold uppercase tracking-widest mb-2.5" style={{ color: "oklch(0.42 0.09 192)" }}>Services</p>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
              {serviceLinks.map((s) => (
                <Link key={s.name} href={s.href} className="text-sm font-body text-[oklch(0.25_0.02_220)] hover:text-[oklch(0.42_0.09_192)] py-2 transition-colors">
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          <hr className="border-[oklch(0.93_0.01_205)]" />

          {/* Main links */}
          {PRIMARY_NAV_LINKS.map((item) => (
            <Link key={item.name} href={item.href} className="block text-lg font-display font-medium text-[oklch(0.20_0.02_220)] hover:text-[oklch(0.42_0.09_192)] transition-colors">
              {item.name}
            </Link>
          ))}

          <hr className="border-[oklch(0.93_0.01_205)]" />

          {/* Patient resources */}
          <div>
            <p className="text-[10px] font-body font-bold uppercase tracking-widest mb-2.5" style={{ color: "oklch(0.42 0.09 192)" }}>Patient Resources</p>
            {patientLinks.map((item) => (
              <Link key={item.name} href={item.href} className="block text-sm font-body text-[oklch(0.25_0.02_220)] hover:text-[oklch(0.42_0.09_192)] py-2 transition-colors">
                {item.name}
              </Link>
            ))}
          </div>

          <hr className="border-[oklch(0.93_0.01_205)]" />

          {/* CTAs */}
          <div className="space-y-3 pb-8">
            <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center gap-2 font-body font-semibold text-base" style={{ color: "oklch(0.42 0.09 192)" }}>
              <Phone className="w-4.5 h-4.5" />
              Call {PRACTICE.phone.display}
            </a>
            <a href={SMS.general} onClick={trackSchedule} className="flex items-center gap-2 font-body font-medium text-base text-[oklch(0.35_0.06_192)]">
              Text {PRACTICE.sms.display}
            </a>
            <Link href="/contact" onClick={trackSchedule} className="flex items-center justify-center gap-2 w-full text-white px-6 py-3.5 rounded-full font-body font-semibold text-base transition-all active:scale-95" style={{ backgroundColor: "oklch(0.42 0.09 192)" }}>
              <Calendar className="w-5 h-5" />
              Book Free Consultation
            </Link>
            <p className="text-xs font-body text-center text-[oklch(0.55_0.03_205)]">Denti-Cal · PPO · Military Accepted</p>
          </div>
        </div>
      </div>
    </>
  );
}
