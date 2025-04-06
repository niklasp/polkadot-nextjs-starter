"use client";

import { Button } from "@/components/ui/button";
import { trimAddress } from "@/lib/utils";
import { usePolkadotExtension } from "@/providers/new-extension-provider";
import { connectInjectedExtension } from "polkadot-api/pjs-signer";

export default function Test() {
  const {
    onToggleExtension,
    selectedExtensions,
    availableExtensions,
    selectedAccount,
    setSelectedAccount,
  } = usePolkadotExtension();

  return (
    <div>
      available extensions:
      {availableExtensions.map((extension) => (
        <Button
          key={extension}
          onClick={() => {
            onToggleExtension(extension);
          }}
        >
          {extension}
        </Button>
      ))}
      connected extensions:
      {selectedExtensions.map((extension) => (
        <div key={extension.name}>
          {extension.name}
          {extension.getAccounts().map((account) => (
            <Button
              key={account.address}
              onClick={() => {
                setSelectedAccount(extension, account);
              }}
            >
              {trimAddress(account.address)}
            </Button>
          ))}
        </div>
      ))}
      selected account:
      {selectedAccount?.extension?.name} -{selectedAccount?.address} -{" "}
      {selectedAccount?.name}
    </div>
  );
}
