/* ============================================================
   UPLIFT DENTAL — TikTok Videos Section
   Shows exactly 3 curated videos from @uplift.dental
   with a "Watch More on TikTok" link to the profile.
   Design: Clean white section with teal accents
   ============================================================ */
import { useState } from "react";
import { ExternalLink } from "lucide-react";

const videos = [
  {
    id: "7509511789751586064",
    caption: "At Uplift Dental",
    description: "See what we're all about at Uplift Dental & Orthodontics.",
  },
  {
    id: "7509162600911981842",
    caption: "Dental Myths Debunked",
    description: "Separating fact from fiction — especially #3!",
  },
  {
    id: "7509519017778973969",
    caption: "Patient Testimonial",
    description: "\"Dr. Stefan is very personable, and his staff is just as kind.\"",
  },
];

export default function TikTokSection() {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="font-body text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.42 0.09 192)" }}
          >
            Follow Along
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.04_185)] mb-4">
            See Us on TikTok
          </h2>
          <p className="font-body text-[oklch(0.45_0.04_185)] max-w-xl mx-auto">
            Behind-the-scenes, patient stories, dental tips, and more from the Uplift Dental team.
          </p>
        </div>

        {/* Video Grid — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {videos.map((v) => (
            <div
              key={v.id}
              className="flex flex-col rounded-2xl overflow-hidden border border-[oklch(0.90_0.02_205)] shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* TikTok Embed */}
              <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
                {!loaded[v.id] && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: "oklch(0.97 0.008 185)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: "oklch(0.42 0.09 192)", borderTopColor: "transparent" }}
                    />
                  </div>
                )}
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${v.id}`}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title={v.caption}
                  onLoad={() => setLoaded((prev) => ({ ...prev, [v.id]: true }))}
                />
              </div>

              {/* Caption */}
              <div className="p-3 bg-white">
                <p className="font-body font-semibold text-sm text-[oklch(0.18_0.04_185)] mb-0.5">{v.caption}</p>
                <p className="font-body text-xs text-[oklch(0.52_0.04_205)] leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Watch More CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://www.tiktok.com/@uplift.dental"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-body font-semibold text-sm text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: "oklch(0.18 0.04 185)" }}
          >
            {/* TikTok logo SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
            </svg>
            Watch More on TikTok
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <p className="mt-3 font-body text-xs text-[oklch(0.55_0.04_205)]">@uplift.dental</p>
        </div>
      </div>
    </section>
  );
}
