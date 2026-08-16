import { useEffect } from "react";
import { generateSitemapXML } from "@/lib/generateSitemap";

/**
 * Sitemap component that serves the XML sitemap.
 * For SPA, this renders the sitemap as downloadable XML content.
 * The actual sitemap.xml is generated at build time via the build script.
 */
export default function Sitemap() {
  useEffect(() => {
    const xml = generateSitemapXML();
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    window.location.replace(url);
    return () => URL.revokeObjectURL(url);
  }, []);

  return null;
}
