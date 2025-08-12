"use client";

import { ThemeProvider } from "./theme-provider";
import {
  type ContractDeployment,
  type NetworkInfo,
  popTestnet,
  shibuyaTestnet,
  TypinkProvider,
} from "typink";
import { ClientOnly } from "@/components/ui/client-only";

export const SUPPORTED_NETWORKS = [popTestnet, shibuyaTestnet];

export function Providers({
  children,
  appName = "Polkadot UI App",
  defaultCaller = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  defaultNetworkId = popTestnet.id,
  deployments = [],
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
          deployments={deployments}
          defaultCaller={defaultCaller}
          defaultNetworkId={defaultNetworkId}
          supportedNetworks={supportedNetworks || SUPPORTED_NETWORKS}
        >
          {children}
        </TypinkProvider>
      </ClientOnly>
    </ThemeProvider>
  );
}
