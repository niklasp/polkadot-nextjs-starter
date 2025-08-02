import { logos } from "@/icons/logos";
import { paseo, polkadot, polkadot_asset_hub } from "@polkadot-api/descriptors";
import { defineConfig } from "@reactive-dot/core";
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js";
import { getWsProvider } from "polkadot-api/ws-provider/web";

// if you want to use light client, you can use the following code
// import { createLightClientProvider } from "@reactive-dot/core/providers/light-client.js";
// const lightClientProvider = createLightClientProvider();
// and replace the provider with e.g.
// lightClientProvider.addRelayChain({ id: "polkadot" }).addParachain({ id: "polkadot_asset_hub" })
// or lightClientProvider.addRelayChain({ id: "paseo" })

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
    paseo: {
      descriptor: paseo,
      provider: getWsProvider("wss://rpc.ibp.network/paseo"),
      name: "Paseo",
      icon: logos.paseo,
    },
  },
  wallets: [new InjectedWalletProvider()],
  ssr: true,
});
