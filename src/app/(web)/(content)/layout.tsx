import Starfield from "react-starfield";

import Navbar from "components/shared/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Starfield speedFactor={0.05} starColor={[255, 255, 255]} starCount={1000} />
      <Navbar />
      <section className="relative z-50 flex flex-col">{children}</section>
    </>
  );
}
