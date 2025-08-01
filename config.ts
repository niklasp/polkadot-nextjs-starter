import { polkadot, polkadot_asset_hub } from "@polkadot-api/descriptors";
import { getWsProvider } from "@polkadot-api/ws-provider/web";
import { defineConfig } from "@reactive-dot/core";
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js";
import { logos } from "@/icons/logos";

export const config = defineConfig({
  chains: {
    polkadot: {
      descriptor: polkadot,
      provider: getWsProvider("wss://polkadot-rpc.publicnode.com"),
      name: "Polkadot",
      icon: logos.polkadot,
    },
    polkadot_asset_hub: {
      descriptor: polkadot_asset_hub,
      provider: getWsProvider("wss://polkadot-asset-hub-rpc.polkadot.io"),
      name: "Polkadot Asset Hub",
      icon: logos.assetHub,
    },
  },
  wallets: [new InjectedWalletProvider()],
  ssr: true,
});
