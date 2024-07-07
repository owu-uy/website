import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Únete a nuestra comunidad de desarrolladores.",
  title: "OWU | Comunidad TI de Uruguay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <meta charSet="utf-8" />
      <meta content="website" property="og:type" />
      <meta content="/la_meetup.png" property="og:image" />
      <meta content="summary_large_image" property="twitter:card" />
      <meta content="/la_meetup.png" property="twitter:image" />

      <body className={inter.className}>{children}</body>
    </html>
  );
}
