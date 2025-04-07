"use client";

import { useChain } from "@/providers/chain-provider";
import { usePolkadotExtension } from "@/providers/polkadot-extension-provider";
import { useEffect, useState } from "react";

export type AccountBalance = {
  free: bigint;
  reserved: bigint;
  frozen: bigint;
  flags: bigint;
  lastUpdated?: Date;
};

export function useAccountBalance() {
  const { api } = useChain();
  const { selectedAccount } = usePolkadotExtension();
  const [accountBalance, setAccountBalance] = useState<AccountBalance | null>(
    null,
  );

  useEffect(() => {
    if (!selectedAccount || !api) return;
    const subscription = api?.query.System.Account.watchValue(
      selectedAccount?.address,
      "best",
    ).subscribe((value) => {
      console.log("value", value);
      setAccountBalance({
        ...value.data,
        lastUpdated: new Date(),
      });
    });

    return () => {
      setAccountBalance(null);
      subscription?.unsubscribe();
    };
  }, [selectedAccount, api]);

  return accountBalance;
}
