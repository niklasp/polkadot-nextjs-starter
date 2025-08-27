import { ChainInfo } from "@/components/chain/chain-info";
import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav-bar";
import { Toaster } from "@/components/ui/sonner";
import { fontMono, fontSans } from "@/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Loader } from "lucide-react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/providers";

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
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChainInfo />
          <Toaster position="bottom-right" />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
