"use client";

import { useLightClientApi } from "@/providers/lightclient-api-provider";
import { Unsub } from "dedot/types";
import { useEffect, useRef, useState } from "react";

export function useBlockNumber() {
  const { provider, connectionStatus, api } = useLightClientApi();
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const unsubRef = useRef<Unsub | null>(null);

  useEffect(() => {
    (async () => {
      if (!api) return;
      try {
        const unsub = await api.query.system.number((blockNumber) => {
          setBlockNumber(Number(blockNumber));
        });
        unsubRef.current = unsub;
      } catch (error) {
        setBlockNumber(null);
      }
    })();

    return () => {
      if (typeof unsubRef.current === "function") unsubRef.current();
      setBlockNumber(null);
    };
  }, [provider, connectionStatus?.type, api]);

  return blockNumber;
}
