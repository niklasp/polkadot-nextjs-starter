"use client";

import { ThemeProvider } from "./theme-provider";
import {
  type ContractDeployment,
  type NetworkInfo,
  paseo,
  paseoAssetHub,
  polkadot,
  TypinkProvider,
} from "typink";
import { ClientOnly } from "@/components/ui/client-only";

export const SUPPORTED_NETWORKS = [paseo, paseoAssetHub, polkadot];

export function Providers({
  children,
  appName = "Polkadot UI App",
  defaultCaller = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  supportedNetworks = SUPPORTED_NETWORKS,
}: {
  children: React.ReactNode;
  appName?: string;
  defaultCaller?: string;
  defaultNetworkId?: string;
  deployments?: ContractDeployment[];
  supportedNetworks?: NetworkInfo[];
}) {
  return (
    <ThemeProvider defaultTheme="dark">
      <ClientOnly>
        <TypinkProvider
          appName={appName}
          defaultCaller={defaultCaller}
          supportedNetworks={supportedNetworks}
          defaultNetworkIds={supportedNetworks.map((network) => network.id)}
        >
          {children}
        </TypinkProvider>
      </ClientOnly>
    </ThemeProvider>
  );
}
