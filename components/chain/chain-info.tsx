"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBlockNumber } from "@/hooks/use-block-number";
import { useActiveChain, useIsConnected } from "@/hooks/polkadot-hooks";
import { useMemo, useState } from "react";

export function ChainInfo() {
  const activeChain = useActiveChain();
  const isConnected = useIsConnected();
  const blockNumber = useBlockNumber();
  const [isOpen, setIsOpen] = useState(false);

  const Trigger = useMemo(() => {
    return (
      <div className="tabular-nums font-light h-6 border-foreground/20 border rounded-md px-2 text-[12px] cursor-default">
        {isConnected && blockNumber ? (
          <>
            <span className="block rounded-full w-2 h-2 bg-green-400 animate-pulse mr-1" />
            {blockNumber && (
              <span className="text-[10px]">{`#${blockNumber}`}</span>
            )}
          </>
        ) : (
          <>
            <span className="block rounded-full w-2 h-2 bg-yellow-400 animate-pulse" />
            &nbsp; connecting to {activeChain?.name} via{" "}
            {activeChain?.providers[0]}
          </>
        )}
      </div>
    );
  }, [isConnected, activeChain, blockNumber]);

  const Content = useMemo(() => {
    return (
      <>
        {isConnected ? (
          <>
            connected to <b>{activeChain?.name}</b> via{" "}
            {activeChain?.providers[0]}
          </>
        ) : (
          <>
            connecting to {activeChain?.name} via {activeChain?.providers[0]}
          </>
        )}
      </>
    );
  }, [activeChain, isConnected]);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100} open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger
          asChild
          className="flex items-center fixed bottom-4 right-4"
        >
          {Trigger}
        </TooltipTrigger>
        <TooltipContent side="right" className="">
          {Content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
