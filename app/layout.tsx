import type { Metadata } from "next";
import { Cormorant_Garamond, Syncopate } from "next/font/google";
import { ReactLenis } from 'lenis/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/ui/Navbar';
import { WebGLPreloader } from '@/components/ui/WebGLPreloader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CookieConsent } from '@/components/ui/CookieConsent';
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});




const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HALOMOTION | Cinematic Production",
  description: "Beyond Reality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className="bg-[#050505]">
      <body
        className={`${cormorant.variable} ${syncopate.variable} font-sans antialiased overflow-x-hidden selection:bg-red-900 selection:text-white`}
        suppressHydrationWarning={true}
      >
        <ReactLenis root>
          <WebGLPreloader />
          <CustomCursor />
          <ProgressBar />
          <CookieConsent />
          {children}
          <Navbar />
          <div id="portal-root" className="relative z-[9999999]"></div>
        </ReactLenis>
        <GoogleAnalytics gaId="G-DEMO123" />
      </body>
    </html>
  );
}