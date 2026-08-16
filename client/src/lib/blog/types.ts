/**
 * BlogPost type definition — shared across all blog category modules.
 */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  status: string;
  isPublished: boolean;
  isScheduled: boolean;
  featured?: boolean;
  category: string;
  tags: string[];
  excerpt: string;
  metaDescription: string;
  readTime: string;
  image: string;
  content: string;
  faqs?: { question: string; answer: string }[];
}
