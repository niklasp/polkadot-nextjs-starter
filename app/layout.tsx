import { ChainInfo } from "@/components/chain/chain-info";
import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav-bar";
import { Toaster } from "@/components/ui/sonner";
import { fontMono, fontSans } from "@/fonts";
import { Providers } from "@/providers/providers";
import { Analytics } from "@vercel/analytics/react";
import { Loader } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

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
        <Providers>
          <NavBar />
          <Suspense fallback={<div>Loading...</div>}>
            <main className="min-h-screen">{children}</main>
          </Suspense>
          <Footer />
          <Suspense fallback={<div>Loading...</div>}>
            <ChainInfo />
          </Suspense>
          <Toaster position="bottom-center" icons={{ loading: <Loader /> }} />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
