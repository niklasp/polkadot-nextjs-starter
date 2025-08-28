import { fontMono, fontSans } from "@/fonts";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
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
        <main className="min-h-screen">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
