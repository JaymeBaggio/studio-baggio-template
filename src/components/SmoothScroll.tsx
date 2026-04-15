import { ReactNode } from "react";

// Lenis and scroll-based approach removed.
// The deck now uses event-driven pagination — each scroll gesture
// moves exactly one slide. No free scrolling, no in-between positions.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
