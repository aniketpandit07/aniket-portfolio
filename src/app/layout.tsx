import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import {
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";
import "lenis/dist/lenis.css";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll-provider";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aniket-pandit-portfolio.vercel.app"),
  title: {
    default: "Aniket Pandit - Full Stack Developer",
    template: "%s | Aniket Pandit",
  },
  description:
    "Aniket Pandit, Full Stack Developer working remotely at Sapthora. Explore Sapthora and OnePlatify, built with React, TypeScript, Next.js, Spring Boot, and AWS.",
  authors: [{ name: "Aniket Pandit" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Aniket Pandit",
    title: "Aniket Pandit - Full Stack Developer",
    description: "Full Stack Developer at Sapthora. Explore my work on EdTech and multi-tenant business applications.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('portfolio-theme');var theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </body>
    </html>
  );
}
