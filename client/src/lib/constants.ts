/**
 * UPLIFT DENTAL — Central Constants
 * Single source of truth for practice config, design tokens, and CDN assets.
 * Import from here instead of hardcoding values in individual files.
 */

// ─── Practice Info ────────────────────────────────────────────────────────────

export const PRACTICE = {
  name: "Uplift Dental & Orthodontics",
  nameShort: "Uplift Dental",
  tagline: "Going the Extra Smile!",
  address: {
    street: "5253 Lampson Ave",
    city: "Garden Grove",
    state: "CA",
    zip: "92845",
    full: "5253 Lampson Ave, Garden Grove, CA 92845",
  },
  phone: {
    display: "(714) 898-3308",
    tel: "tel:+17148983308",
    digits: "+17148983308",
  },
  sms: {
    display: "(888) 895-5908",
    digits: "+18888955908",
  },
  website: "https://upliftdental.com",
  email: "info@upliftdental.com",
  hours: {
    weekdays: "Mon–Fri: 9am–5pm",
    saturday: "3rd Sat: 9am–2pm",
  },
  googleMapsUrl: "https://maps.google.com/?q=5253+Lampson+Ave+Garden+Grove+CA+92845",
  googleReviews: {
    count: 124,
    rating: 5.0,
  },
} as const;

// ─── Design Tokens ────────────────────────────────────────────────────────────

/** Primary teal palette — use these instead of hardcoding oklch values */
export const COLORS = {
  teal: "oklch(0.42 0.09 192)",
  tealDark: "oklch(0.28 0.08 192)",
  tealDeep: "oklch(0.22 0.06 192)",
  tealMid: "oklch(0.32 0.09 192)",
  tealPale: "oklch(0.95 0.02 192)",
  tealLight: "oklch(0.73 0.07 200)",
  gold: "oklch(0.78 0.12 85)",
} as const;

// ─── CDN Image Assets ─────────────────────────────────────────────────────────

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN";

/** Doctor headshots */
export const DOCTOR_IMAGES = {
  stefan: `${CDN}/dr-stefan-clean_5bc74027.png`,
  schneekluth: `${CDN}/dr-schneekluth-labcoat-clean_5cfb4098.png`,
  schneekluthClean: `${CDN}/dr-schneekluth-clean_de46bddf.png`,
  youssef: `${CDN}/dr-youssef-clean_da346e41.png`,
  saad: `${CDN}/dr-saad-periodontist_45f9c7c5.jpg`,
  ghobrial: `${CDN}/dr-ghobrial-hq_89525d81.jpeg`,
} as const;

/** Staff headshots */
export const STAFF_IMAGES = {
  angeliki: `${CDN}/angeliki_blanco_91783479.jpg`,
  sinath: `${CDN}/sinath_oum_f502fa41.jpg`,
  geneyah: `${CDN}/geneyah_warren_faf8fe8e.jpg`,
} as const;

/** Site-wide images */
export const SITE_IMAGES = {
  hero: `${CDN}/hero-smile_47b15f85.jpg`,
  logoPrimary: `${CDN}/Logo-01_0c8b669d.png`,
  logoLight: `${CDN}/Logo-10_73bf64d6.png`,
  team: `${CDN}/uplift-team-real_7d2676d0.jpg`,
  teamAlt: `${CDN}/uplift-team-real_80532d53.jpg`,
  about: `${CDN}/uplift-about-real_a6815637.jpg`,
  patternDark: `${CDN}/PATTERN-02_5ffa36bf.jpg`,
  patternDarkAlt: `${CDN}/uplift-pattern-dark_02e4726d.jpg`,
} as const;

// ─── Doctor / Staff Data Types ────────────────────────────────────────────────

export interface Doctor {
  img: string;
  name: string;
  slug: string;  // URL-safe anchor id, e.g. "dr-stefan"
  role: string;
  education: string[];
  memberships: string[];
  bio: string[];
  specialties: string[];
  quote: string;
  funFact?: string;
}

export interface StaffMember {
  img: string;
  name: string;
  role: string;
  bio: string;
  funFact: string;
}
