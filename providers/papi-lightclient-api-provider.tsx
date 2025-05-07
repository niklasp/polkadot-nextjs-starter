"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { createClient, PolkadotClient } from "polkadot-api";
import { getSmProvider } from "polkadot-api/sm-provider";
import * as smoldot from "smoldot/no-auto-bytecode";

import { start, type Client, type SmoldotBytecode } from "polkadot-api/smoldot";
import { type ChainConfig, type AvailableApis } from "@/papi-config";
import { StatusChange, WsEvent } from "polkadot-api/ws-provider/web";
import { chainConfig } from "../papi-config";

interface LightClientApiProviderType {
  connectionStatus: StatusChange | undefined;
  activeChain: ChainConfig;
  setActiveChain: (chain: ChainConfig) => void;
  client: PolkadotClient | null;
  api: AvailableApis | null;
}

const LightClientApiContext = createContext<
  LightClientApiProviderType | undefined
>(undefined);

export function LightClientApiProvider({
  children,
  defaultChain = chainConfig[0],
}: {
  children: React.ReactNode;
  defaultChain?: ChainConfig;
}) {
  const smoldotRef = useRef<Client | null>(null);
  const [activeChain, setActiveChain] = useState<ChainConfig>(defaultChain);
  const [activeApi, setActiveApi] = useState<AvailableApis | null>(null);
  const [client, setClient] = useState<PolkadotClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    StatusChange | undefined
  >(undefined);

  function startSmoldotWorker() {
    return import("polkadot-api/smoldot/from-worker").then(
      ({ startFromWorker }) =>
        startFromWorker(
          new Worker(new URL("polkadot-api/smoldot/worker", import.meta.url), {
            type: "module",
          }),
          { forbidWs: true },
        ),
    );
  }

  const initializeClient = useCallback(
    async (chainConfig: ChainConfig) => {
      try {
        setConnectionStatus({
          type: WsEvent.CONNECTING,
          uri: `via lightclient`,
        });

        smoldotRef.current = await startSmoldotWorker();

        if (!chainConfig.chainSpec || !chainConfig.chainSpec.name) {
          throw new Error(
            `Invalid chain spec provided for ${chainConfig.name}`,
          );
        }

        let chain;
        if (chainConfig.relayChainSpec) {
          const relayChain = await smoldotRef.current.addChain({
            chainSpec: JSON.stringify(chainConfig.relayChainSpec),
          });
          if (!relayChain) {
            throw new Error("Failed to add relay chain to light client");
          }
          chain = await smoldotRef.current.addChain({
            chainSpec: JSON.stringify(chainConfig.chainSpec),
            potentialRelayChains: [relayChain],
          });
        } else {
          chain = await smoldotRef.current.addChain({
            chainSpec: JSON.stringify(chainConfig.chainSpec),
          });
        }

        if (!chain) {
          throw new Error("Failed to add chain to light client");
        }

        const lightClient = createClient(getSmProvider(chain));
        setClient(lightClient);
        const typedApi = lightClient.getTypedApi(chainConfig.descriptors);
        setActiveApi(typedApi);
        setActiveChain(chainConfig);

        setConnectionStatus({
          type: WsEvent.CONNECTED,
          uri: `via lightclient`,
        });
      } catch (error) {
        setConnectionStatus({
          type: WsEvent.ERROR,
          event: error,
        });
      }
    },
    [setClient, setActiveApi, setActiveChain, setConnectionStatus],
  );

  useEffect(() => {
    initializeClient(defaultChain);

    return () => {
      smoldotRef.current?.terminate();
      smoldotRef.current = null;
      setClient(null);
    };
  }, [defaultChain, initializeClient]);

  return (
    <LightClientApiContext.Provider
      value={{
        connectionStatus,
        api: activeApi,
        client,
        activeChain,
        setActiveChain: initializeClient,
      }}
    >
      {children}
    </LightClientApiContext.Provider>
  );
}

export function useLightClientApi() {
  const context = useContext(LightClientApiContext);
  if (!context) {
    throw new Error(
      "useLightClientApi must be used within a LightClientApiProvider",
    );
  }
  return context;
}
