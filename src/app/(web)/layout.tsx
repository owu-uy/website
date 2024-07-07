import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description:
    "Un espacio donde personas apasionadas por la tecnología se reúnen, comparten y convierten sus ideas en realidad.",
  title: "OWU Uruguay | Comunidad TI de Uruguay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`flex min-h-screen w-full flex-col items-center ${inter.className}`}>
        <div className="absolute left-1/2 -z-10 h-3/5 w-7/12 -translate-x-1/2 -translate-y-1/3 rounded-[50%] bg-gradient-to-b from-[#3e4713] via-[#3e4713] to-transparent opacity-70 blur-4xl" />
        {children}
      </body>
    </html>
  );
}
