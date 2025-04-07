"use client";

import { ThemeProvider } from "./theme-provider";
import { ChainProvider } from "./chain-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TxProvider } from "./tx-provider";
import { ExtensionProvider } from "./polkadot-extension-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <ExtensionProvider>
          <ChainProvider>
            <TxProvider>{children}</TxProvider>
          </ChainProvider>
        </ExtensionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
