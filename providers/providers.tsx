"use client";

import { ThemeProvider } from "./theme-provider";
import { SelectedAccountProvider } from "./selected-account-provider";
import { ChainProvider, ReactiveDotProvider } from "@reactive-dot/react";
import { config } from "@/config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <ReactiveDotProvider config={config}>
        <ChainProvider chainId="polkadot">
          <SelectedAccountProvider>{children}</SelectedAccountProvider>
        </ChainProvider>
      </ReactiveDotProvider>
    </ThemeProvider>
  );
}
