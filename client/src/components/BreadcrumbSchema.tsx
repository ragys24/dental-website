/**
 * Phase 2 technical SEO compatibility export.
 * Breadcrumb JSON-LD is emitted in the route-specific initial HTML document.
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema(_: BreadcrumbSchemaProps) {
  return null;
}
