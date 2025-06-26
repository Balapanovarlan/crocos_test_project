"use client";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { useState } from "react";
import SidebarMain from "./components/SidebarMain/SidebarMain";
import { AuthProvider } from "./context/AuthContext";
import { Providers } from "./providers";
import Head from "next/head";

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
        <Head>
          <link 
            rel="preload"
            href="/images/noisy_background.png"
            as="image"
            />
        </Head>
        <body
          className={`${beatrice.variable} antialiased bg-[url(/images/noisy_background.png)] flex flex-col min-h-screen`}
        >
          <Providers>
            <Header setIsOpen={setIsOpen} />
            <SidebarMain isOpen={isOpen} setIsOpen={setIsOpen} />
            <main className="flex-grow pb-20">{children}</main>
            <Footer />
          </Providers>
        </body>
      </html>
  );
}
