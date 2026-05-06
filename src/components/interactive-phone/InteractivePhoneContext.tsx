import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface InteractivePhoneContextValue {
  // Which InteractivePhone instance is currently expanded (null = none).
  // Each instance generates its own useId() and passes it to expand().
  // Without per-instance scoping, ALL InteractivePhone instances would render
  // their expanded portal at body when any one is clicked — fighting each
  // other. Surfaced when the OutputWallSlide was lifted from the FanClub
  // deck into the template, which already had a phone on DeviceMockupSlide.
  expandedId: string | null;
  isExpanded: boolean; // true if ANY phone is expanded — kept for back-compat
  expand: (instanceId: string, sourceEl: HTMLElement | null) => void;
  close: () => void;
  sourceRect: DOMRect | null;
}

const InteractivePhoneContext = createContext<InteractivePhoneContextValue | null>(null);

export function InteractivePhoneProvider({ children }: { children: ReactNode }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);

  const expand = useCallback((instanceId: string, sourceEl: HTMLElement | null) => {
    if (sourceEl) {
      setSourceRect(sourceEl.getBoundingClientRect());
    }
    setExpandedId(instanceId);
  }, []);

  const close = useCallback(() => {
    setExpandedId(null);
  }, []);

  const value = useMemo<InteractivePhoneContextValue>(
    () => ({ expandedId, isExpanded: expandedId !== null, expand, close, sourceRect }),
    [expandedId, expand, close, sourceRect],
  );

  return (
    <InteractivePhoneContext.Provider value={value}>
      {children}
    </InteractivePhoneContext.Provider>
  );
}

export function useInteractivePhone(): InteractivePhoneContextValue {
  const ctx = useContext(InteractivePhoneContext);
  if (!ctx) {
    throw new Error("useInteractivePhone must be used inside InteractivePhoneProvider");
  }
  return ctx;
}
