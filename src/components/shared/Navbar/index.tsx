"use client";

import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

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

const LINKS = [
  { title: "Inicio", link: "/" },
  { title: "Historia", link: "/#historia" },
  { title: "Estadísticas", link: "/#estadisticas" },
  { title: "Eventos", link: "/#eventos" },
  { title: "La Meetup 2024", link: "/la-meetup" },
];

function Navbar() {
  const [pathname, setPathname] = useState<string>();

  // set the pathname to the current URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    setPathname(window.location.href);
  }, []);

  return (
    <nav
      className="container mx-auto grid h-full max-h-[56px] flex-1 grid-cols-2 items-center justify-items-center lg:grid-flow-col lg:grid-cols-[220px_1fr_220px]"
      id="site-menu"
    >
      <div className="flex h-full w-full flex-1 flex-row justify-end">
        <Link
          className="flex h-full flex-1 flex-col"
          href="/"
          onClick={() =>
            setPathname(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "localhost:3000"}/`)
          }
        >
          <h2 className="pt-[18px] text-base font-semibold text-white hover:text-yellow-400">OWU URUGUAY</h2>
        </Link>
      </div>

      <ul className="hidden w-full max-w-[700px] md:text-base lg:flex lg:justify-center lg:self-center lg:py-0 xl:flex">
        {LINKS.map(({ link, title }) => (
          <li key={link} className="text-base text-white lg:flex-1 lg:text-center">
            <NavItem
              isActive={
                pathname?.replace("http://", "").replace("https://", "") ===
                `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "localhost:3000"}${link}`
              }
              link={link}
              title={title}
              onClick={() =>
                setPathname(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "localhost:3000"}${link}`)
              }
            />
          </li>
        ))}
      </ul>
      <div
        className="group hidden h-full w-full flex-1 cursor-not-allowed flex-row justify-end gap-1.5 pt-[18px] lg:inline-flex"
        title="¡Próximamente!"
      >
        <FaSignInAlt className="mt-1 text-[16px] text-gray-300 group-hover:text-gray-300" />
        <p className="text-base font-semibold text-gray-300 group-hover:text-gray-300">INICIAR SESIÓN</p>
      </div>
    </nav>
  );
}

export default Navbar;
