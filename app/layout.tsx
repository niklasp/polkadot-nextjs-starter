import { fontMono, fontSans } from "@/fonts";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";
import Aurora from "@/backgrounds/Aurora/Aurora";

export const metadata: Metadata = {
  title: "Polkadot Next.js Starter",
  description: "A starter project for building Polkadot dApps with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-[family-name:var(--font-sans)] antialiased dark`}
      >
        <div className="relative z-10 overflow-hidden pb-24">
          <div className="absolute inset-0 h-[200vh] overflow-hidden">
            <Aurora
              colorStops={["#7916F3", "#7916F3", "#7916F3", "#000000"]}
              blend={5.0}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
