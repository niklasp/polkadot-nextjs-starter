"use client";

import { ThemeProvider } from "./theme-provider";
import { ReactiveDotProvider } from "@reactive-dot/react";
import { config } from "@/config";
import { PolkadotProvider } from "./polkadot-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <ReactiveDotProvider config={config}>
        <PolkadotProvider>{children}</PolkadotProvider>
      </ReactiveDotProvider>
    </ThemeProvider>
  );
}
