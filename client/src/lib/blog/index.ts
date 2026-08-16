/**
 * Blog data index — aggregates all category modules into a single
 * blogPosts array and provides helper functions.
 *
 * Each category lives in its own file for maintainability.
 */
export type { BlogPost } from "./types";
import type { BlogPost } from "./types";

import { cosmeticDentistryPosts } from "./cosmetic-dentistry";
import { emergencyDentalCarePosts } from "./emergency-dental-care";
import { oralHealthPosts } from "./oral-health";
import { orthodonticsPosts } from "./orthodontics";
import { patientResourcesPosts } from "./patient-resources";
import { preventiveCarePosts } from "./preventive-care";
import { restorativeDentistryPosts } from "./restorative-dentistry";
import { specialtyCarePosts } from "./specialty-care";

const LEGACY_UPLOAD_URL = "https?:\\/\\/(?:i0\\.wp\\.com\\/)?upliftdental\\.com\\/wp-content\\/uploads\\/[^\"'\\s<>]+";
const LEGACY_UPLOAD_PATTERN = new RegExp(LEGACY_UPLOAD_URL, "i");
const LEGACY_FIGURE_PATTERN = /<figure\b[^>]*>[\s\S]*?<\/figure>/gi;
const LEGACY_IMAGE_PATTERN = new RegExp(
  `(?:<a\\b[^>]*>\\s*)?<img\\b[^>]*\\bsrc=(?:[\"'])${LEGACY_UPLOAD_URL}(?:[\"'])[^>]*>(?:\\s*<\\/a>)?`,
  "gi",
);
const LEGACY_HREF_REPLACEMENTS: Array<[RegExp, string]> = [
  [/href=(["'])\/dental-cleaning\/?\1/gi, "/teeth-cleaning"],
  [/href=(["'])\/root-canal-treatment\/?\1/gi, "/endodontics"],
  [/href=(["'])\/dental-financing\/?\1/gi, "/insurance-financing"],
  [/href=(["'])\/membership-plans\/?\1/gi, "/membership-plan"],
  [/href=(["'])\/dental-bridges\/?\1/gi, "/dental-crowns"],
  [/href=(["'])\/night-guards\/?\1/gi, "/services"],
  [/href=(["'])http:\/\/upliftdental\.com\/?\1/gi, "/"],
];

function normalizeBlogContent(content: string) {
  const withoutRetiredMedia = content
    .replace(LEGACY_FIGURE_PATTERN, (figure) => LEGACY_UPLOAD_PATTERN.test(figure) ? "" : figure)
    .replace(LEGACY_IMAGE_PATTERN, "");

  return LEGACY_HREF_REPLACEMENTS.reduce(
    (normalizedContent, [pattern, canonicalPath]) => normalizedContent.replace(
      pattern,
      (_match, quote: string) => `href=${quote}${canonicalPath}${quote}`,
    ),
    withoutRetiredMedia,
  );
}

function normalizeBlogPost(post: BlogPost): BlogPost {
  return { ...post, content: normalizeBlogContent(post.content) };
}

/** All blog posts from every category, combined into a single array. */
export const blogPosts: BlogPost[] = [
  ...cosmeticDentistryPosts,
  ...emergencyDentalCarePosts,
  ...oralHealthPosts,
  ...orthodonticsPosts,
  ...patientResourcesPosts,
  ...preventiveCarePosts,
  ...restorativeDentistryPosts,
  ...specialtyCarePosts,
].map(normalizeBlogPost);

export const publishedPosts = blogPosts.filter(p => p.isPublished);
export const scheduledPosts = blogPosts.filter(p => p.isScheduled);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getVisiblePosts(): BlogPost[] {
  // A static deployment cannot safely promote a scheduled record unless its
  // matching canonical document is intentionally generated. Public hubs must
  // therefore link only to explicit published records.
  return publishedPosts
    .slice()
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
}
