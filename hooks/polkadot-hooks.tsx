import { useCallback } from "react";
import { useTypink, type NetworkInfo, type InjectedAccount } from "typink";
import { useBlockNumber } from "./use-block-number";

export interface PolkadotHooks {
  useClient: () => ReturnType<typeof useTypink>["client"] | undefined;
  useChainId: () => { chainId: string; setChainId: (id: string) => void };
  useActiveChain: () => NetworkInfo | undefined;
  useSupportedNetworks: () => NetworkInfo[];
  useIsConnected: () => boolean;
  useSelectedAccount: () => InjectedAccount | undefined;
  useBlockNumber: () => number | null;
}

// Selector hooks that read directly from Typink
export function useClient() {
  const { client } = useTypink();
  return client;
}

export function useChainId() {
  const { networkId, setNetworkId } = useTypink();
  const setChainId = useCallback(
    (id: string) => setNetworkId(id),
    [setNetworkId],
  );
  return { chainId: networkId, setChainId };
}

export function useActiveChain() {
  const { network } = useTypink();
  return network;
}

export function useSupportedNetworks() {
  const { supportedNetworks } = useTypink();
  return supportedNetworks;
}

export function useIsConnected() {
  const { ready } = useTypink();
  return ready;
}

export function useConnectionStatus() {
  const { client } = useTypink();
  return client?.status || "disconnected";
}

export function useSelectedAccount() {
  const { connectedAccount } = useTypink();
  return connectedAccount;
}

export const polkadotHooks: PolkadotHooks = {
  useClient,
  useChainId,
  useActiveChain,
  useSupportedNetworks,
  useIsConnected,
  useSelectedAccount,
  useBlockNumber,
};
