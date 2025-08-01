"use client";

import { ReactiveDotProvider, ChainProvider } from "@reactive-dot/react";
import { SelectedAccountProvider } from "./selected-account-provider";
import { useState } from "react";
import { ChainId } from "@reactive-dot/core";
import { config } from "@/config";
import { WalletAccount } from "@reactive-dot/core/wallets.js";
import { createContext } from "react";
import { ThemeProvider } from "./theme-provider";
import { useContext } from "react";

interface PolkadotContextType {
  chainId: ChainId;
  activeChain: (typeof config.chains)[ChainId];
  setChainId: (chainId: ChainId) => void;
  selectedAccount: WalletAccount | null;
  setSelectedAccount: (account: WalletAccount | null) => void;
}

const PolkadotContext = createContext<PolkadotContextType>({
  chainId: "polkadot",
  activeChain: config.chains["polkadot"],
  setChainId: () => {},
  selectedAccount: null,
  setSelectedAccount: () => {},
});

/**
 * Polkadot Provider is a wrapper around the needed reactive-dot providers <ReactiveDotProvider> and <ChainProvider>
 * That also stores the selected account and chain in the local storage
 * @param param0
 * @returns
 */
export function PolkadotProvider({
  children,
  defaultChainId = "polkadot",
}: {
  children: React.ReactNode;
  defaultChainId?: ChainId;
}) {
  const [currentChainId, setCurrentChainId] = useState<ChainId>(defaultChainId);
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount | null>(
    null,
  );

  return (
    <ThemeProvider defaultTheme="dark">
      <PolkadotContext.Provider
        value={{
          chainId: currentChainId,
          activeChain: config.chains[currentChainId],
          setChainId: setCurrentChainId,
          selectedAccount,
          setSelectedAccount,
        }}
      >
        <ReactiveDotProvider config={config}>
          <ChainProvider chainId={currentChainId}>
            <SelectedAccountProvider>{children}</SelectedAccountProvider>
          </ChainProvider>
        </ReactiveDotProvider>
      </PolkadotContext.Provider>
    </ThemeProvider>
  );
}

export const usePolkadotContext = () => {
  const context = useContext(PolkadotContext);
  if (!context) {
    throw new Error(
      "usePolkadotContext must be used within a PolkadotProvider",
    );
  }
  return context;
};
