import { paseo, polkadot, polkadot_asset_hub } from "@polkadot-api/descriptors";
import { getWsProvider } from "@polkadot-api/ws-provider/web";
import { defineConfig } from "@reactive-dot/core";
import { createLightClientProvider } from "@reactive-dot/core/providers/light-client.js";
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js";
import { logos } from "@/icons/logos";

const lightClientProvider = createLightClientProvider();

export const config = defineConfig({
  chains: {
    polkadot: {
      descriptor: polkadot,
      provider: getWsProvider("wss://polkadot-rpc.publicnode.com"),
      // provider: lightClientProvider.addRelayChain({ id: "polkadot" }),
      name: "Polkadot",
      icon: logos.polkadot,
    },
    polkadot_asset_hub: {
      descriptor: polkadot_asset_hub,
      provider: getWsProvider("wss://polkadot-asset-hub-rpc.polkadot.io"),
      // provider: lightClientProvider
      //   .addRelayChain({ id: "polkadot" })
      //   .addParachain({ id: "polkadot_asset_hub" }),
      name: "Polkadot Asset Hub",
      icon: logos.assetHub,
    },
    paseo: {
      descriptor: paseo,
      provider: getWsProvider("wss://rpc.ibp.network/paseo"),
      // provider: lightClientProvider.addRelayChain({ id: "paseo" }),
      name: "Paseo",
      icon: logos.paseo,
    },
  },
  wallets: [new InjectedWalletProvider()],
  ssr: true,
});
