"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { type IntersectionOptions, useInView } from "react-intersection-observer";

import { SectionKey } from "components/shared/Navbar/navSections";

type SectionObserversMap = Record<SectionKey, (node?: Element | null) => void>;
interface Context {
  sectionsRefs: SectionObserversMap;
  activeSection: SectionKey;
}

const NavigationContext = createContext<Context>({} as Context);

export const useNavigationContext = () => useContext(NavigationContext);

const observerOptions: IntersectionOptions = {
  root: null,
  rootMargin: "0% 0% 0% 0%",
  threshold: 0.86,
};

const useSectionObserver = (key: SectionKey, setActiveSection: (value: React.SetStateAction<SectionKey>) => void) => {
  const observer = useInView(observerOptions);

  useEffect(() => {
    if (!observer.entry?.isIntersecting) return;

    setActiveSection(key);
  }, [observer.entry?.isIntersecting, setActiveSection, key]);

  return observer;
};

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionKey>(SectionKey.Hero);

  const observerHero = useSectionObserver(SectionKey.Hero, setActiveSection);
  const observerEvents = useSectionObserver(SectionKey.Events, setActiveSection);
  const observerMeetupEvent = useSectionObserver(SectionKey.MeetupEvent, setActiveSection);
  const observerStats = useSectionObserver(SectionKey.Stats, setActiveSection);
  const observerHistory = useSectionObserver(SectionKey.Story, setActiveSection);

  const sectionsRefs: SectionObserversMap = {
    [SectionKey.Hero]: observerHero.ref,
    [SectionKey.Events]: observerEvents.ref,
    [SectionKey.MeetupEvent]: observerMeetupEvent.ref,
    [SectionKey.Stats]: observerStats.ref,
    [SectionKey.Story]: observerHistory.ref,
  };

  return (
    <NavigationContext.Provider value={{ activeSection: activeSection, sectionsRefs }}>
      {children}
    </NavigationContext.Provider>
  );
}
