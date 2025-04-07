"use client";

import { Button } from "@/components/ui/button";
import { trimAddress } from "@/lib/utils";
import { usePolkadotExtension } from "@/providers/polkadot-extension-provider";
import { connectInjectedExtension } from "polkadot-api/pjs-signer";

export default function Test() {
  const {
    onToggleExtension,
    selectedExtensions,
    availableExtensions,
    selectedAccount,
    setSelectedAccount,
  } = usePolkadotExtension();

  return <div>test</div>;
}
