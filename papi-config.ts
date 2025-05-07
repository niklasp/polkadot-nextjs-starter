"use client";

import {
  polkadot,
  polkadot_asset_hub,
  paseo,
  paseo_asset_hub,
} from "@polkadot-api/descriptors";
import type { TypedApi } from "polkadot-api";
import { logos } from "@/icons/logos";
import { chainSpec as polkadotChainSpec } from "polkadot-api/chains/polkadot";
import { chainSpec as polkadotAssetHubChainSpec } from "polkadot-api/chains/polkadot_asset_hub";
import { chainSpec as paseoChainSpec } from "polkadot-api/chains/paseo";
import { chainSpec as paseoAssetHubChainSpec } from "polkadot-api/chains/paseo_asset_hub";
import { DedotClient } from "dedot";
import { PolkadotApi, PaseoApi, PolkadotAssetHubApi } from "@dedot/chaintypes";

export interface ChainSpec {
  name: string;
  id: string;
  chainType: string;
  bootNodes: string[];
  telemetryEndpoints: string[];
  protocolId: string;
  properties: {
    tokenDecimals: number;
    tokenSymbol: string;
  };
  relay_chain: string;
  para_id: number;
  codeSubstitutes: Record<string, string>;
  genesis: {
    stateRootHash: string;
  };
}
export interface ChainConfig {
  key: string;
  name: string;
  endpoints: string[];
  explorerUrl?: string;
  icon?: React.ReactNode;
  chainSpec: ChainSpec;
  relayChainSpec?: ChainSpec;
}

export type AvailableApis =
  | TypedApi<typeof polkadot>
  | TypedApi<typeof polkadot_asset_hub>
  | TypedApi<typeof paseo>
  | TypedApi<typeof paseo_asset_hub>;

export type AvailableDedotApis =
  | DedotClient<PolkadotApi>
  | DedotClient<PolkadotAssetHubApi>
  | DedotClient<PaseoApi>;

// TODO: add all chains your dapp supports here
export const chainConfig: ChainConfig[] = [
  {
    key: "polkadot",
    name: "Polkadot",
    endpoints: ["wss://rpc.polkadot.io"],
    icon: logos.polkadot,
    chainSpec: JSON.parse(polkadotChainSpec),
  },
  {
    key: "polkadot_asset_hub",
    name: "Polkadot Asset Hub",
    endpoints: [
      "wss://polkadot-asset-hub-rpc.polkadot.io",
      "wss://statemint.api.onfinality.io/public-ws",
    ],
    icon: logos.assetHub,
    chainSpec: JSON.parse(polkadotAssetHubChainSpec),
    relayChainSpec: JSON.parse(polkadotChainSpec),
  },
  {
    key: "paseo",
    name: "Paseo",
    endpoints: ["wss://rpc.ibp.network/paseo"],
    icon: logos.paseo,
    chainSpec: JSON.parse(paseoChainSpec),
  },
];
