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

  // IMMEDIATE cleanup and UI updates on chain change - NO WAITING
  useEffect(() => {
    if (!isClient) return;

    // IMMEDIATE subscription cleanup - don't wait for anything
    if (subscriptionRef.current) {
      console.log(
        `🚫 IMMEDIATE cleanup of subscription for chain switch to: ${chainId}`,
      );
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    // IMMEDIATE UI updates
    setConnectionStatus("connecting");
    setBlockNumber(null);
    setChainSpec(null);

    // Update chain reference immediately
    currentChainRef.current = chainId;
  }, [chainId, isClient]);

  // Handle subscription creation when client is ready (separate from cleanup)
  useEffect(() => {
    // CRITICAL: Only run on client side
    if (!isClient) {
      console.log("🚫 Preventing subscription - SSR");
      setConnectionStatus("close");
      return;
    }

    // Wait for client, but cleanup already happened immediately above
    if (!chainClient) {
      console.log("⏳ Waiting for chainClient to initialize...");
      return;
    }

    // Prevent duplicate subscriptions if already subscribed to same chain
    if (subscriptionRef.current && currentChainRef.current === chainId) {
      console.log(`⏭️ Already subscribed to ${chainId}, skipping duplicate`);
      return;
    }

    subscriptionCountRef.current += 1;
    console.log(
      `🔌 Creating new subscription for ${chainId} (attempt #${subscriptionCountRef.current})`,
    );

    if (!chainClient?.finalizedBlock$) {
      console.log("⚠️ Client not ready, skipping subscription");
      return;
    }

    console.log(`🔄 Creating subscription for ${chainId}`);

    const blockNumberSubscription = chainClient.finalizedBlock$.subscribe({
      next: (block) => {
        // Check if this is still the current chain
        if (currentChainRef.current !== chainId) {
          console.log(`⚠️ Received block for old chain ${chainId}, ignoring`);
          return;
        }
        console.log(`📦 Block #${block.number} received for ${chainId}`);
        setBlockNumber(block.number);
        setConnectionStatus("connected");
      },
      error: (error) => {
        // Check if this is still the current chain
        if (currentChainRef.current !== chainId) return;
        console.log(`❌ Subscription error for ${chainId}:`, error);
        setConnectionStatus("error");
        setBlockNumber(null);
      },
    });

    subscriptionRef.current = blockNumberSubscription;

    // Get chain spec data in parallel (non-blocking)
    chainClient
      .getChainSpecData()
      .then((chainSpecData) => {
        // Check if this is still the current chain
        if (currentChainRef.current !== chainId) return;
        console.log(`⚙️ Chain spec loaded for ${chainId}`);
        setChainSpec({
          tokenDecimals: chainSpecData.properties.tokenDecimals,
          tokenSymbol: chainSpecData.properties.tokenSymbol,
        });
      })
      .catch((error) => {
        if (currentChainRef.current !== chainId) return;
        console.error(`❌ Failed to get chain spec for ${chainId}:`, error);
      });

    return () => {
      console.log(`🧽 Subscription creation cleanup for: ${chainId}`);
      // Cleanup is handled by the immediate effect above, not here
    };
  }, [chainId, isClient, chainClient]); // Include chainClient to re-run when it becomes available

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
