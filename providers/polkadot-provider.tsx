"use client";
import { ChainProvider, ReactiveDotProvider } from "@reactive-dot/react";
import { ConnectionProvider } from "./connection-provider";
import { SelectedAccountProvider } from "./selected-account-provider";
import { config } from "@/config";
import { ThemeProvider } from "./theme-provider";
import { createContext, useContext, useState } from "react";
import { ChainId } from "@reactive-dot/core";

export interface PolkadotContextType {
  chainId: ChainId;
  activeChain: (typeof config.chains)[ChainId];
  setChainId: (chainId: ChainId) => void;
}
export interface PolkadotProviderProps {
  children: React.ReactNode;
  defaultChainId?: ChainId;
}

export const PolkadotContext = createContext<PolkadotContextType>({
  chainId: "paseo",
  activeChain: config.chains["paseo"],
  setChainId: () => {},
});

export function PolkadotProvider({
  children,
  defaultChainId = "paseo",
}: PolkadotProviderProps) {
  const [currentChainId, setCurrentChainId] = useState<ChainId>(defaultChainId);

  return (
    <ThemeProvider defaultTheme="dark">
      <PolkadotContext.Provider
        value={{
          chainId: currentChainId,
          activeChain: config.chains[currentChainId],
          setChainId: setCurrentChainId,
        }}
      >
        <ReactiveDotProvider config={config}>
          <ChainProvider chainId={currentChainId}>
            <ConnectionProvider>
              <SelectedAccountProvider>{children}</SelectedAccountProvider>
            </ConnectionProvider>
          </ChainProvider>
        </ReactiveDotProvider>
      </PolkadotContext.Provider>
    </ThemeProvider>
  );
}

export function usePolkadotContext() {
  const context = useContext(PolkadotContext);
  if (!context) {
    throw new Error(
      "usePolkadotContext must be used within a PolkadotProvider",
    );
  }
  return context;
}
