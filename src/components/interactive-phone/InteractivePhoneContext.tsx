import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface InteractivePhoneContextValue {
  isExpanded: boolean;
  expand: (sourceEl: HTMLElement | null) => void;
  close: () => void;
  sourceRect: DOMRect | null;
}

const InteractivePhoneContext = createContext<InteractivePhoneContextValue | null>(null);

export function InteractivePhoneProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);

  const expand = useCallback((sourceEl: HTMLElement | null) => {
    if (sourceEl) {
      setSourceRect(sourceEl.getBoundingClientRect());
    }
    setIsExpanded(true);
  }, []);

  const close = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const value = useMemo<InteractivePhoneContextValue>(
    () => ({ isExpanded, expand, close, sourceRect }),
    [isExpanded, expand, close, sourceRect],
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
