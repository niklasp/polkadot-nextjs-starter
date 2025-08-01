import { polkadot, polkadot_asset_hub } from "@polkadot-api/descriptors";
import { getWsProvider } from "@polkadot-api/ws-provider/web";
import { defineConfig } from "@reactive-dot/core";
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js";

export const config = defineConfig({
  chains: {
    polkadot: {
      descriptor: polkadot,
      provider: getWsProvider("wss://polkadot-rpc.publicnode.com"),
    },
    polkadot_asset_hub: {
      descriptor: polkadot_asset_hub,
      provider: getWsProvider("wss://polkadot-asset-hub-rpc.polkadot.io"),
    },
  },
  wallets: [new InjectedWalletProvider()],
  ssr: true,
});
