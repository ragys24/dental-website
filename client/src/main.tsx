/**
 * UPLIFT DENTAL — React application entry
 * Restores the established React-rendered homepage presentation while retaining
 * the optimized shared app, consent, analytics, and conversion configuration.
 */
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

if (window.location.pathname === "/") {
  const removeCriticalShell = () => {
    document.getElementById("home-critical")?.remove();
    document.getElementById("home-critical-style")?.remove();
    window.removeEventListener("scroll", removeCriticalShell);
    window.removeEventListener("pointerdown", removeCriticalShell);
    window.removeEventListener("keydown", removeCriticalShell);
  };

  if (window.matchMedia("(min-width: 768px)").matches) {
    removeCriticalShell();
  } else {
    window.addEventListener("scroll", removeCriticalShell, { passive: true, once: true });
    window.addEventListener("pointerdown", removeCriticalShell, { passive: true, once: true });
    window.addEventListener("keydown", removeCriticalShell, { once: true });
  }
}
