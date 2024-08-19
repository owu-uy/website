"use client";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { type SetStateAction, type Dispatch } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

import { Separator } from "components/shared/Separator";
import { Sheet, SheetContent, SheetTrigger } from "components/shared/Sheet";

import { navSections } from "./navSections";

type NavItemsProps = {
  pathname?: string;
  setPathname?: Dispatch<SetStateAction<string | undefined>>;
};

function NavItems({ pathname, setPathname }: NavItemsProps) {
  return (
    <ul className="lg:flex-between my-2 flex w-full flex-col items-start gap-5 lg:flex-row">
      {navSections.map(({ link, title }) => {
        const isActive = pathname == link;

        return (
          <li
            key={link}
            className="p-medium-16 flex w-full flex-row items-center whitespace-nowrap text-base font-semibold text-white"
          >
            <div
              className={classNames("border-t-6 border-b-6 border-l-12 h-4 w-1.5 border-l-yellow-400", {
                "bg-yellow-400": isActive,
              })}
            />
            <SheetPrimitive.Close asChild>
              <Link
                className="ml-3"
                href={link}
                onClick={() => {
                  setPathname && setPathname(link);
                }}
              >
                {title}
              </Link>
            </SheetPrimitive.Close>
          </li>
        );
      })}
    </ul>
  );
}
type MobileNavProps = {
  pathname?: string;
  setPathname?: Dispatch<SetStateAction<string | undefined>>;
};

export default function MobileNav({ pathname, setPathname }: MobileNavProps) {
  return (
    <nav className="lg:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image alt="menu" className="cursor-pointer" height={24} src="/menu.svg" width={24} />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-opacity-5 lg:hidden">
          <div className="flex w-full flex-row items-center justify-start gap-4">
            <Image alt="logo" height={34} src="/carpincho.png" width={34} />
            <h2 className="text-xl font-semibold text-white">OWU Uruguay</h2>
          </div>
          <NavItems pathname={pathname} setPathname={setPathname} />
          <Separator />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
