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
export type ConnectionContextType = {
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (status: ConnectionStatus) => void;
  clientType: "lightclient" | "ws";
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

  useEffect(() => {
    console.log("connection provider changed", chainId, client);
    if (config.chains[chainId].provider instanceof createLightClientProvider) {
      setClientType("lightclient");
    } else if (config.chains[chainId].provider instanceof getWsProvider) {
      setClientType("ws");
    }

    setConnectionStatus("connecting");
    let hasConnected = false;

    const subscription = client.finalizedBlock$.subscribe({
      next: () => {
        if (!hasConnected) {
          setConnectionStatus("connected");
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
  }, [chainId, client]); // Include client to avoid stale closures

  return (
    <ConnectionContext.Provider
      value={{
        connectionStatus,
        setConnectionStatus,
        clientType,
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
