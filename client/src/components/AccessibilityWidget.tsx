// Accessibility Widget — floating button with controls for font size, high contrast, and link highlights
// Positioned bottom-left to avoid conflict with LiveChat (bottom-right)
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Accessibility, X, ZoomIn, ZoomOut, Sun, Underline, RotateCcw } from "lucide-react";

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100); // percentage
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

  // Apply font size to root
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Apply high contrast class to body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);

  // Apply link highlight class to body
  useEffect(() => {
    if (highlightLinks) {
      document.body.classList.add("highlight-links");
    } else {
      document.body.classList.remove("highlight-links");
    }
  }, [highlightLinks]);

  const reset = () => {
    setFontSize(100);
    setHighContrast(false);
    setHighlightLinks(false);
  };

  const increaseFontSize = () => setFontSize((f) => Math.min(f + 10, 150));
  const decreaseFontSize = () => setFontSize((f) => Math.max(f - 10, 80));

  return (
    <>
      {/* Global CSS for accessibility modes */}
      <style>{`
        body.high-contrast {
          filter: contrast(1.5) brightness(1.05);
        }
        body.highlight-links a {
          text-decoration: underline !important;
          outline: 2px solid oklch(0.52 0.09 185);
          outline-offset: 2px;
          border-radius: 2px;
        }
      `}</style>

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open accessibility options"
        aria-expanded={open}
        className="fixed bottom-6 left-4 z-50 flex items-center gap-2 rounded-full shadow-lg px-4 py-3 text-white text-sm font-body font-semibold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ backgroundColor: "oklch(0.52 0.09 185)", focusRingColor: "oklch(0.52 0.09 185)" } as React.CSSProperties}
      >
        <Accessibility className="w-5 h-5" />
        <span className="hidden sm:inline">Accessibility</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility options"
          className="fixed bottom-20 left-4 z-50 w-64 rounded-2xl shadow-2xl border bg-white overflow-hidden"
          style={{ borderColor: "oklch(0.90 0.015 185)" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: "oklch(0.28 0.06 185)" }}
          >
            <span className="font-display text-sm font-bold text-white flex items-center gap-2">
              <Accessibility className="w-4 h-4" />
              Accessibility Options
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close accessibility panel"
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Font Size */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Text Size
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 80}
                  aria-label="Decrease text size"
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border text-sm font-body font-medium transition-colors disabled:opacity-40"
                  style={{ borderColor: "oklch(0.85 0.02 185)", color: "oklch(0.28 0.06 185)" }}
                >
                  <ZoomOut className="w-4 h-4" /> Smaller
                </button>
                <span className="text-xs font-body text-gray-500 w-10 text-center">{fontSize}%</span>
                <button
                  onClick={increaseFontSize}
                  disabled={fontSize >= 150}
                  aria-label="Increase text size"
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border text-sm font-body font-medium transition-colors disabled:opacity-40"
                  style={{ borderColor: "oklch(0.85 0.02 185)", color: "oklch(0.28 0.06 185)" }}
                >
                  <ZoomIn className="w-4 h-4" /> Larger
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <div>
              <button
                onClick={() => setHighContrast((c) => !c)}
                aria-pressed={highContrast}
                className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg border text-sm font-body font-medium transition-colors"
                style={{
                  borderColor: highContrast ? "oklch(0.52 0.09 185)" : "oklch(0.85 0.02 185)",
                  backgroundColor: highContrast ? "oklch(0.97 0.01 185)" : "transparent",
                  color: "oklch(0.28 0.06 185)",
                }}
              >
                <Sun className="w-4 h-4" />
                High Contrast
                {highContrast && (
                  <span className="ml-auto text-xs font-semibold" style={{ color: "oklch(0.52 0.09 185)" }}>
                    ON
                  </span>
                )}
              </button>
            </div>

            {/* Highlight Links */}
            <div>
              <button
                onClick={() => setHighlightLinks((l) => !l)}
                aria-pressed={highlightLinks}
                className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg border text-sm font-body font-medium transition-colors"
                style={{
                  borderColor: highlightLinks ? "oklch(0.52 0.09 185)" : "oklch(0.85 0.02 185)",
                  backgroundColor: highlightLinks ? "oklch(0.97 0.01 185)" : "transparent",
                  color: "oklch(0.28 0.06 185)",
                }}
              >
                <Underline className="w-4 h-4" />
                Highlight Links
                {highlightLinks && (
                  <span className="ml-auto text-xs font-semibold" style={{ color: "oklch(0.52 0.09 185)" }}>
                    ON
                  </span>
                )}
              </button>
            </div>

            {/* Reset */}
            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-body text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Default
            </button>

            {/* Statement link */}
            <div className="pt-1 border-t" style={{ borderColor: "oklch(0.93 0.01 185)" }}>
              <Link
                href="/accessibility"
                onClick={() => setOpen(false)}
                className="block text-center text-xs font-body underline pt-2"
                style={{ color: "oklch(0.52 0.09 185)" }}
              >
                View Accessibility Statement
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
