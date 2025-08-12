"use client";

import { useEffect, useRef, useState } from "react";
import { Unsub, useTypink } from "typink";
import { useSelectedAccount } from "./polkadot-hooks";

export interface AccountBalanceResult {
  free: string | null;
  reserved: string | null;
  miscFrozen: string | null;
  feeFrozen: string | null;
}

export function useAccountBalance() {
  const { client } = useTypink();
  const selectedAccount = useSelectedAccount();
  const [balance, setBalance] = useState<AccountBalanceResult | null>(null);
  const unsubscribe = useRef<Unsub | undefined>(undefined);

  useEffect(() => {
    const subscribe = async () => {
      if (!client || !selectedAccount?.address) return;
      // Clear previous
      unsubscribe.current?.();
      unsubscribe.current = await client.query.system.account(
        selectedAccount.address,
        (info: any) => {
          // info.data: { free, reserved, miscFrozen, feeFrozen }
          const data = info?.data;
          setBalance({
            free: data?.free?.toString?.() ?? null,
            reserved: data?.reserved?.toString?.() ?? null,
            miscFrozen: data?.miscFrozen?.toString?.() ?? null,
            feeFrozen: data?.feeFrozen?.toString?.() ?? null,
          });
        },
      );
    };
    subscribe();
    return () => {
      unsubscribe.current?.();
      unsubscribe.current = undefined;
    };
  }, [client, selectedAccount?.address]);

  return balance;
}
