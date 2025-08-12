import { useEffect, useRef, useState } from "react";
import { Unsub, useTypink } from "typink";

export function useBlockNumber() {
  const { client } = useTypink();
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const unsubscribe = useRef<Unsub | undefined>(undefined);

  useEffect(() => {
    const subscribe = async () => {
      if (client) {
        unsubscribe.current = await client.query.system.number(
          (blockNumber: number) => {
            setBlockNumber(blockNumber);
          },
        );
      }
    };
    subscribe();
    return () => {
      unsubscribe.current?.();
      unsubscribe.current = undefined;
    };
  }, [client]);

  return blockNumber;
}
