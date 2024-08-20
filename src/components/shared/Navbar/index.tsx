"use client";

import classNames from "classnames";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";

import { navLinks } from "./navLinks";
import MobileNav from "./mobileNav";

export interface NavItemProps {
  title: string;
  link: string;
  isActive?: boolean;
}

function NavItem({ title, link, isActive }: NavItemProps) {
  return (
    <Link
      className={classNames(
        "block border-[6px] border-transparent py-4 font-medium transition-colors ease-out hover:bg-yellow-400/5 lg:rounded-b-xl lg:pb-2 lg:pt-3",
        {
          "border-l-yellow-400 font-bold lg:border-l-transparent lg:border-t-yellow-400": isActive,
        }
      )}
      href={link}
    >
      {title}
    </Link>
  );
}

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="container mx-auto flex h-full max-h-[56px] items-center justify-between py-4" id="site-menu">
      <div className="flex h-full items-center">
        <Link className="flex h-full flex-col justify-center" href="/">
          <h2 className="text-base font-semibold text-white hover:text-yellow-400">OWU URUGUAY</h2>
        </Link>
      </div>
      <ul className="hidden w-full max-w-[700px] md:text-base lg:flex lg:justify-center lg:self-center lg:py-0 xl:flex">
        {navLinks.map(({ link, title }) => {
          return (
            <li key={link} className="text-base text-white lg:flex-1 lg:text-center">
              <NavItem isActive={pathname === link} link={link} title={title} />
            </li>
          );
        })}
      </ul>
      <div className="flex h-full items-center">
        <MobileNav pathname={pathname} />
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
