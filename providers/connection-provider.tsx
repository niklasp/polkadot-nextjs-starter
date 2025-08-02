"use client";

import { useClient, useConnectedWallets } from "@reactive-dot/react";
import { usePolkadotContext } from "./polkadot-provider";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { config } from "@/config";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createLightClientProvider } from "@reactive-dot/core/providers/light-client.js";

type ConnectionStatus = "connected" | "error" | "connecting" | "close";
export type ChainSpec = {
  tokenDecimals: number;
  tokenSymbol: string;
};

export type ConnectionContextType = {
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (status: ConnectionStatus) => void;
  clientType: "lightclient" | "ws";
  chainSpec: ChainSpec | null;
};

export const ConnectionContext = createContext<
  ConnectionContextType | undefined
>(undefined);

export function ConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chainId } = usePolkadotContext();
  const client = useClient();
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("close");
  const [clientType, setClientType] = useState<"lightclient" | "ws">(
    typeof config.chains[chainId].provider === typeof getWsProvider
      ? "ws"
      : "lightclient",
  );
  const [chainSpec, setChainSpec] = useState<ChainSpec | null>(null);

  useEffect(() => {
    console.log("connection provider changed", chainId, client);
    if (config.chains[chainId].provider instanceof createLightClientProvider) {
      setClientType("lightclient");
    } else if (config.chains[chainId].provider instanceof getWsProvider) {
      setClientType("ws");
    }

    setConnectionStatus("connecting");
    let hasConnected = false;

    const getChainInfo = async () => {
      try {
        // you can add more chain info here if you want e.g
        // const nodeVersion = await client._request("system_version", []);
        const chainSpec = await client.getChainSpecData();
        setChainSpec({
          tokenDecimals: chainSpec.properties.tokenDecimals,
          tokenSymbol: chainSpec.properties.tokenSymbol,
        });
      } catch (error) {
        console.log("Failed to get chain info:", error);
      }
    };

    const subscription = client.finalizedBlock$.subscribe({
      next: () => {
        if (!hasConnected) {
          setConnectionStatus("connected");
          getChainInfo();
          hasConnected = true;
          console.log("Connected to chain:", chainId);
        }
      },
      error: (error) => {
        setConnectionStatus("error");
        hasConnected = false;
        console.log("Connection error for chain:", chainId, error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [chainId, client]);

  return (
    <ConnectionContext.Provider
      value={{
        connectionStatus,
        setConnectionStatus,
        clientType,
        chainSpec,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnectionStatus() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error(
      "useConnectionStatus must be used within a ConnectionProvider",
    );
  }
  return context;
}
