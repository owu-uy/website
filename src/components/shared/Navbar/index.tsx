"use client";

import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

import MobileNav from "./mobileNav";
import { navSections } from "./navSections";

export interface NavItemProps {
  title: string;
  link: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ title, link, isActive, onClick }: NavItemProps) {
  return (
    <Link
      className={classNames(
        "block border-[6px] border-transparent py-4 font-medium transition-colors ease-out hover:bg-yellow-400/5 lg:rounded-b-xl lg:pb-2 lg:pt-3",
        {
          "border-l-yellow-400 font-bold lg:border-l-transparent lg:border-t-yellow-400": isActive,
        }
      )}
      href={link}
      onClick={onClick}
    >
      {title}
    </Link>
  );
}

function Navbar() {
  const [pathname, setPathname] = useState<string>();

  // set the pathname to the current URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    setPathname(window.location.href.replace(window.location.origin, ""));
  }, []);

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};

    navSections.forEach((section) => {
      const targetElement = document.getElementById(section.id);

      if (!targetElement) return;

      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setPathname(section.link);
            }
          }),
        {
          root: null,
          rootMargin: "0% 0% -20%",
          threshold: 0.8,
        }
      );

      observer.observe(targetElement);
      observers[section.id] = observer;
    });

    return () => {
      Object.keys(observers).forEach((sectionId) => {
        const observer = observers[sectionId];

        observer.unobserve(document.getElementById(sectionId)!);
      });
    };
  }),
    [];

  return (
    <nav
      className="container sticky top-0 z-[60] mx-auto flex h-full max-h-[56px] items-center justify-between bg-opacity-25 bg-gradient-to-b from-black to-transparent py-4 backdrop-blur-lg backdrop-filter"
      id="site-menu"
    >
      <div className="flex h-full items-center">
        <Link className="flex h-full flex-col justify-center" href="/" onClick={() => setPathname("/")}>
          <h2 className="text-base font-semibold text-white hover:text-yellow-400">OWU URUGUAY</h2>
        </Link>
      </div>
      <ul className="hidden w-full max-w-[700px] md:text-base lg:flex lg:justify-center lg:self-center lg:py-0 xl:flex">
        {navSections.map(({ link, title }) => {
          return (
            <li key={link} className="text-base text-white lg:flex-1 lg:text-center">
              <NavItem isActive={pathname == link} link={link} title={title} onClick={() => setPathname(link)} />
            </li>
          );
        })}
      </ul>
      <div className="flex h-full items-center">
        <MobileNav pathname={pathname} setPathname={setPathname} />
      </div>
      <div
        className="group hidden h-full cursor-not-allowed flex-row justify-end gap-1.5 lg:inline-flex"
        title="¡Próximamente!"
      >
        <FaSignInAlt className="mt-1 text-[16px] text-gray-300 group-hover:text-gray-300" />
        <p className="text-base font-semibold text-gray-300 group-hover:text-gray-300">INICIAR SESIÓN</p>
      </div>
    </nav>
  );
}

export default Navbar;
