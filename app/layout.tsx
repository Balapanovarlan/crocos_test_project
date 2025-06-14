"use client";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { useState } from "react";
import SidebarMain from "./components/SidebarMain/SidebarMain";

const beatrice = localFont({
  src: "../public/fonts/beatrice-deck-trial/BeatriceDeckTRIAL.otf",
  variable: "--font-beatriceDeckTrial",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <html lang="en">
      <body
        className={`${beatrice.variable} antialiased bg-[url(../public/images/noisy_background.png)]`}
      >
        <Header setIsOpen={setIsOpen} />
        <SidebarMain isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="pb-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
