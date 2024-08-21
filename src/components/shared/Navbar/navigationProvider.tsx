"use client";
import React, { createContext, type RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";

import { SectionKey } from "components/shared/Navbar/navSections";

interface Context {
  sectionsRefs: Record<SectionKey, RefObject<HTMLDivElement>>;
  activeSection: SectionKey;
}

const NavigationContext = createContext<Context>({} as Context);

export const useNavigationContext = () => useContext(NavigationContext);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const refHero = useRef<HTMLDivElement>(null);
  const refHistory = useRef<HTMLDivElement>(null);
  const refStats = useRef<HTMLDivElement>(null);
  const refEvents = useRef<HTMLDivElement>(null);
  const refMeetupEvent = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>(SectionKey.Hero);

  const sectionsRefs: Record<SectionKey, RefObject<HTMLDivElement>> = useMemo(
    () => ({
      [SectionKey.Hero]: refHero,
      [SectionKey.Events]: refEvents,
      [SectionKey.MeetupEvent]: refMeetupEvent,
      [SectionKey.Stats]: refStats,
      [SectionKey.Story]: refHistory,
    }),
    []
  );

  useEffect(() => {
    console.log("## ENTRO");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          setActiveSection(entry.target.id as SectionKey);
        });
      },
      {
        root: null,
        rootMargin: "0% 0% 0% 0%",
        threshold: 0.86,
      }
    );

    Object.values(sectionsRefs).forEach((ref) => {
      if (!ref.current) return;

      observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionsRefs).forEach((ref) => {
        if (!ref.current) return;

        observer.unobserve(ref.current);
      });
    };
  }, [sectionsRefs]);

  return (
    <NavigationContext.Provider value={{ activeSection: activeSection, sectionsRefs }}>
      {children}
    </NavigationContext.Provider>
  );
}
