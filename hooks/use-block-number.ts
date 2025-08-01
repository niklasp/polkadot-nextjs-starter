"use client";

import { WsEvent } from "polkadot-api/ws-provider/web";
import type { Subscription } from "rxjs";
import { useEffect, useRef, useState } from "react";
import { useClient } from "@reactive-dot/react";

export function useBlockNumber() {
  const client = useClient();
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const subscription = useRef<Subscription | null>(null);

  useEffect(() => {
    if (client) {
      subscription.current = client.finalizedBlock$.subscribe((value) => {
        setBlockNumber(value.number);
      });
    }

    return () => {
      subscription.current?.unsubscribe();
      subscription.current = null;
      setBlockNumber(null);
    };
  }, [client]);

  return blockNumber;
}
