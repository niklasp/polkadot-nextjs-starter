"use client";

import { useClient, useLazyLoadQuery } from "@reactive-dot/react";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { config } from "@/config";
import { createLightClientProvider } from "@reactive-dot/core/providers/light-client.js";
import { usePolkadotContext } from "./polkadot-provider";

export type ConnectionStatus = "connected" | "error" | "connecting" | "close";
export type ChainSpec = {
  tokenDecimals: number;
  tokenSymbol: string;
};
export type ConnectionContextType = {
  connectionStatus: ConnectionStatus;
  clientType: "lightclient" | "websocket";
  blockNumber: number | null;
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

  const [isClient, setIsClient] = useState(false);
  const chainClient = useClient();

  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const [clientType, setClientType] = useState<"lightclient" | "websocket">(
    "websocket",
  );
  const [chainSpec, setChainSpec] = useState<ChainSpec | null>(null);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);

  // Detect client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track subscription state to prevent multiple subscriptions
  const subscriptionRef = useRef<any>(null);
  const currentChainRef = useRef<string>(chainId);
  const subscriptionCountRef = useRef(0);

  // Determine client type based on chain configuration
  useEffect(() => {
    const provider = config.chains[chainId].provider;
    if (provider instanceof createLightClientProvider) {
      setClientType("lightclient");
    } else {
      setClientType("websocket");
    }
  }, [chainId]);

  // Handle subscription with proper cleanup and debugging
  useEffect(() => {
    // CRITICAL: Only run on client side with valid client
    if (!isClient || !chainClient) {
      console.log("🚫 Preventing subscription - SSR or no client");
      setConnectionStatus("close");
      return;
    }

    subscriptionCountRef.current += 1;
    console.log(
      `🔌 ConnectionProvider effect #${subscriptionCountRef.current} triggered. Chain: ${chainId}, Client changed: ${currentChainRef.current !== chainId ? "YES" : "NO"}`,
    );

    // Clean up existing subscription if chain changed
    if (currentChainRef.current !== chainId && subscriptionRef.current) {
      console.log(
        `🧹 Cleaning up subscription for old chain: ${currentChainRef.current}`,
      );
      setConnectionStatus("connecting");
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    // Update chain reference
    currentChainRef.current = chainId;

    // Reset state for new chain
    console.log(`🔄 Setting connection status to connecting for ${chainId}`);
    setConnectionStatus("connecting");
    setBlockNumber(null);
    setChainSpec(null);

    let isActive = true;

    if (!chainClient?.finalizedBlock$) {
      console.log("⚠️ Client not ready, skipping subscription");
      setConnectionStatus("error");
      return;
    }

    console.log(`🔄 Creating subscription for ${chainId}`);
    setConnectionStatus("connecting");

    const blockNumberSubscription = chainClient.finalizedBlock$.subscribe({
      next: (block) => {
        if (!isActive) {
          console.log(
            `⚠️ Received block for inactive subscription: ${chainId}`,
          );
          return;
        }
        console.log(`📦 Block #${block.number} received for ${chainId}`);
        setBlockNumber(block.number);
        setConnectionStatus("connected");
      },
      error: (error) => {
        if (!isActive) return;
        console.log(`❌ Subscription error for ${chainId}:`, error);
        setConnectionStatus("error");
        setBlockNumber(null);
      },
    });

    subscriptionRef.current = blockNumberSubscription;

    // Get chain spec data
    chainClient
      .getChainSpecData()
      .then((chainSpecData) => {
        if (!isActive) return;
        console.log(`⚙️ Chain spec loaded for ${chainId}`);
        setChainSpec({
          tokenDecimals: chainSpecData.properties.tokenDecimals,
          tokenSymbol: chainSpecData.properties.tokenSymbol,
        });
      })
      .catch((error) => {
        if (!isActive) return;
        console.error(`❌ Failed to get chain spec for ${chainId}:`, error);
        // Don't change connection status for chain spec errors - blocks are more important
      });

    return () => {
      console.log(`🧽 Cleanup function called for chain: ${chainId}`);
      isActive = false;
      setConnectionStatus("close");
      setBlockNumber(null);
      if (subscriptionRef.current) {
        console.log(`🧹 Unsubscribing subscription for: ${chainId}`);
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [chainId, isClient]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ConnectionContext.Provider
      value={{
        connectionStatus,
        clientType,
        chainSpec,
        blockNumber,
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

// Export useBlockNumber hook for backward compatibility
export function useBlockNumber() {
  const { blockNumber } = useConnectionStatus();
  return blockNumber;
}
