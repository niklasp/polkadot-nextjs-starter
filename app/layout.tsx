import { ChainInfo } from "@/components/chain/chain-info";
import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav-bar";
import { Toaster } from "@/components/ui/sonner";
import { fontMono, fontSans } from "@/fonts";
import { Providers } from "@/providers/providers";
import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Polkadot Next.js Starter",
  description: "dedot + typink template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      </body>
    </html>
  );
}
