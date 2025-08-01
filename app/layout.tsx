import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { Loader } from "lucide-react";

import { Providers } from "@/providers/providers";

import { fontSans, fontMono } from "@/fonts";
import Footer from "@/components/layout/footer";

import "./globals.css";
import { NavBar } from "@/components/layout/nav-bar";
import { PolkadotProvider } from "@/providers/polkadot-provider";
import { ChainInfo } from "@/components/chain/chain-info";
import { Suspense } from "react";

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
        className={`${fontSans.variable} ${fontMono.variable} font-[family-name:var(--font-sans)] antialiased`}
      >
        <PolkadotProvider>
          <NavBar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Suspense fallback={<div>Loading...</div>}>
            <ChainInfo />
          </Suspense>
          <Toaster position="bottom-center" icons={{ loading: <Loader /> }} />
        </PolkadotProvider>
        <Analytics />
      </body>
    </html>
  );
}
