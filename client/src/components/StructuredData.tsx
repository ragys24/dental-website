/**
 * Phase 2 technical SEO compatibility exports.
 *
 * JSON-LD is generated into each canonical document at build time by
 * scripts/generate-static-routes.mjs. These components stay as no-ops so page
 * modules retain their existing API without adding duplicate, hydration-time
 * schema to a crawler's initial response.
 */
import type { ReactElement } from "react";

interface JsonLdProps { id: string; data: Record<string, unknown>; }
interface FAQItem { question: string; answer: string; }
interface FAQSchemaProps { faqs: FAQItem[]; id?: string; }
interface MedicalPageSchemaProps { name: string; url: string; description: string; medicalSpecialty: string; keywords?: string; }
interface BreadcrumbItem { name: string; url: string; }
interface BreadcrumbSchemaProps { items: BreadcrumbItem[]; }
interface HowToStep { name: string; text: string; url?: string; }
interface HowToSchemaProps { name: string; description: string; totalTime?: string; estimatedCost?: { currency: string; value: string }; steps: HowToStep[]; id?: string; }
interface ServiceSchemaProps { name: string; description: string; url: string; serviceType: string; areaServed?: string[]; priceRange?: string; }

const StaticSchemaCompatibility = (): ReactElement | null => null;

export function JsonLd(_: JsonLdProps) { return <StaticSchemaCompatibility />; }
export function LocalBusinessSchema() { return <StaticSchemaCompatibility />; }
export function WebSiteSchema() { return <StaticSchemaCompatibility />; }
export function FAQSchema(_: FAQSchemaProps) { return <StaticSchemaCompatibility />; }
export function MedicalPageSchema(_: MedicalPageSchemaProps) { return <StaticSchemaCompatibility />; }
export function BreadcrumbSchema(_: BreadcrumbSchemaProps) { return <StaticSchemaCompatibility />; }
export function HowToSchema(_: HowToSchemaProps) { return <StaticSchemaCompatibility />; }
export function ServiceSchema(_: ServiceSchemaProps) { return <StaticSchemaCompatibility />; }
