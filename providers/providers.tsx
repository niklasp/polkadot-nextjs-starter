"use client";
import { PolkadotProvider } from "./polkadot-provider";
import { ChainProvider, ReactiveDotProvider } from "@reactive-dot/react";
import { config } from "@/config";
import { ThemeProvider } from "./theme-provider";
import { ConnectionProvider } from "./connection-provider";
import { SelectedAccountProvider } from "./selected-account-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <ReactiveDotProvider config={config}>
        <ChainProvider chainId="paseo">
          <PolkadotProvider>
            <ConnectionProvider>
              <SelectedAccountProvider>{children}</SelectedAccountProvider>
            </ConnectionProvider>
          </PolkadotProvider>
        </ChainProvider>
      </ReactiveDotProvider>
    </ThemeProvider>
  );
}
