/**
 * UPLIFT DENTAL — Elevated Warmth interaction primitive.
 * Calm teal control language, precise clinical-image presentation, and no color alteration.
 *
 * BeforeAfterSlider — Interactive drag-to-compare image component.
 * Renders two images overlaid with a draggable divider that reveals
 * the "before" image on the left and the "after" image on the right.
 */
import { useState, useRef, useCallback, useEffect, type KeyboardEvent, type PointerEvent } from "react";
import { COLORS } from "@/lib/constants";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  objectPosition?: string;
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt = "Before treatment",
  afterAlt = "After treatment",
  className = "",
  objectPosition = "center",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeVisibility = Math.round(position);
  const afterVisibility = 100 - beforeVisibility;
  const comparisonState = position >= 60 ? "Viewing Before" : position <= 40 ? "Viewing After" : "Comparing Both";
  const beforeIsPrimary = position >= 60;
  const afterIsPrimary = position <= 40;

  const getPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    return Math.max(0, Math.min(100, percent));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => setContainerWidth(container.clientWidth);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setPosition(getPosition(e.clientX));
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, [getPosition]);

  const handlePointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    setPosition(getPosition(e.clientX));
  }, [getPosition, isDragging]);

  const handlePointerEnd = useCallback((e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 2));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 2));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl select-none cursor-col-resize bg-[oklch(0.93_0.012_45)] outline-none transition-shadow focus-visible:ring-4 focus-visible:ring-[oklch(0.62_0.10_190)]/60 focus-visible:ring-offset-2 ${isDragging ? "ring-2 ring-[oklch(0.47_0.09_190)] ring-offset-2" : ""} ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-valuetext={`${beforeVisibility}% before and ${afterVisibility}% after visible; ${comparisonState.toLowerCase()}.`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ touchAction: "none" }}
    >
      {/* After image (full width, underneath) */}
      <img
        src={after}
        alt={afterAlt}
        className="w-full h-auto block"
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      {/* Before image (clipped to slider position) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          className="h-full max-w-none object-cover"
          style={{ width: containerWidth ? `${containerWidth}px` : "100vw", objectPosition }}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[3px] -translate-x-1/2 pointer-events-none"
        style={{ left: `${position}%`, backgroundColor: "white", boxShadow: "0 0 8px rgba(0,0,0,0.4)" }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-[3px] border-white flex items-center justify-center pointer-events-none shadow-lg"
        style={{ left: `${position}%`, backgroundColor: COLORS.teal }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white">
          <path d="M5 9L2 9M2 9L4 7M2 9L4 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 9L16 9M16 9L14 7M16 9L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Dynamic visibility labels make the active treatment stage immediately clear. */}
      <div
        className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-xs font-bold text-white shadow-sm transition-all duration-150 pointer-events-none ${beforeIsPrimary ? "scale-105 ring-2 ring-white/80" : ""}`}
        style={{ backgroundColor: beforeIsPrimary ? "oklch(0.20 0.03 185 / 0.96)" : "oklch(0.20 0.02 185 / 0.76)" }}
      >
        <span>Before</span>
        <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] leading-none">{beforeVisibility}%</span>
      </div>
      <div
        className={`absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-xs font-bold text-white shadow-sm transition-all duration-150 pointer-events-none ${afterIsPrimary ? "scale-105 ring-2 ring-white/80" : ""}`}
        style={{ backgroundColor: afterIsPrimary ? COLORS.teal : `${COLORS.teal}cc` }}
      >
        <span>After</span>
        <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] leading-none">{afterVisibility}%</span>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/35 bg-[oklch(0.18_0.04_185_/_0.82)] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.13em] text-white shadow-sm pointer-events-none">
        {comparisonState}
      </div>
    </div>
  );
}
