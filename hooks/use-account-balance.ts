"use client";

import { useLightClientApi } from "@/providers/lightclient-api-provider";
import { usePolkadotExtension } from "@/providers/polkadot-extension-provider";
import { Unsub } from "dedot/types";
import { useEffect, useRef, useState } from "react";

export type AccountBalance = {
  free: bigint;
  reserved: bigint;
  frozen: bigint;
  flags: bigint;
  lastUpdated?: Date;
};

export function useAccountBalance() {
  const { api } = useLightClientApi();
  const { selectedAccount } = usePolkadotExtension();
  const [accountBalance, setAccountBalance] = useState<AccountBalance | null>(
    null,
  );
  const unsubRef = useRef<Unsub | null>(null);

  useEffect(() => {
    (async () => {
      if (!selectedAccount?.address || !api) return;
      try {
        const unsub = await api.query.system.account(
          selectedAccount.address,
          (value: any) => {
            if (
              !value?.data ||
              value.data.free == null ||
              value.data.reserved == null ||
              value.data.frozen == null ||
              value.data.flags == null
            ) {
              console.error("Invalid account data", value);
              setAccountBalance(null);
              return;
            }
            setAccountBalance({
              free: BigInt(value.data.free),
              reserved: BigInt(value.data.reserved),
              frozen: BigInt(value.data.frozen),
              flags: BigInt(value.data.flags),
              lastUpdated: new Date(),
            });
          },
        );
        unsubRef.current = unsub;
      } catch (error) {
        console.error("Failed to subscribe to account balance", error);
        setAccountBalance(null);
      }
    })();
    return () => {
      if (typeof unsubRef.current === "function") unsubRef.current();
      setAccountBalance(null);
    };
  }, [selectedAccount?.address, api]);

  return accountBalance;
}
