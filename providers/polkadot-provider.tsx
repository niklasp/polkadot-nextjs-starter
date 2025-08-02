"use client";

import { useClient } from "@reactive-dot/react";
import { useEffect, useState } from "react";
import { ChainId } from "@reactive-dot/core";
import { config } from "@/config";
import { createContext } from "react";
import { useContext } from "react";

export type ChainSpec = {
  tokenDecimals: number;
  tokenSymbol: string;
};

interface PolkadotContextType {
  chainId: ChainId;
  activeChain: (typeof config.chains)[ChainId];
  setChainId: (chainId: ChainId) => void;
  chainSpec: ChainSpec | null;
}

const PolkadotContext = createContext<PolkadotContextType>({
  chainId: "polkadot",
  activeChain: config.chains["polkadot"],
  setChainId: () => {},
  chainSpec: null,
});

/**
 * Polkadot Provider is a wrapper around the needed reactive-dot providers <ReactiveDotProvider> and <ChainProvider>
 * That also stores the selected account in the local storage and allows to switch between chains
 * @param param0
 * @returns
 */
export function PolkadotProvider({
  children,
  defaultChainId = "polkadot",
}: {
  children: React.ReactNode;
  defaultChainId?: ChainId;
  chainSpec?: ChainSpec;
}) {
  const [currentChainId, setCurrentChainId] = useState<ChainId>(defaultChainId);
  const [chainSpec, setChainSpec] = useState<ChainSpec | null>(null);
  const client = useClient({
    chainId: currentChainId,
  });

  useEffect(() => {
    const getChainInfo = async () => {
      const chainSpec = await client.getChainSpecData();
      setChainSpec({
        tokenDecimals: chainSpec.properties.tokenDecimals,
        tokenSymbol: chainSpec.properties.tokenSymbol,
      });
    };
    getChainInfo();
  }, [currentChainId]);

  return (
    <PolkadotContext.Provider
      value={{
        chainId: currentChainId,
        activeChain: config.chains[currentChainId],
        setChainId: setCurrentChainId,
        chainSpec,
      }}
    >
      {children}
    </PolkadotContext.Provider>
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
