"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemo, useState } from "react";
import { useConnectionStatus } from "@/providers/connection-provider";
import { usePolkadotContext } from "@/providers/polkadot-provider";

export function ChainInfo() {
  const { activeChain } = usePolkadotContext();
  const { connectionStatus, clientType, blockNumber } = useConnectionStatus();
  const [isOpen, setIsOpen] = useState(false);

  const Trigger = useMemo(() => {
    return (
      <div className="tabular-nums font-light h-6 border-foreground/20 border rounded-md px-2 text-[12px] cursor-default">
        {connectionStatus === "connected" ? (
          <>
            <span className="block rounded-full w-2 h-2 bg-green-400 animate-pulse mr-1" />
          </>
        ) : connectionStatus === "error" ? (
          <>
            <span className="block rounded-full w-2.5 h-2.5 bg-red-400" />
          </>
        ) : (
          <>
            <span className="block rounded-full w-2 h-2 bg-yellow-400 animate-pulse" />
            &nbsp; connecting to {activeChain?.name} via {clientType}
          </>
        )}
        {connectionStatus === "connected" && blockNumber && (
          <span className="text-[10px]">{`#${blockNumber}`}</span>
        )}
      </div>
    );
  }, [connectionStatus, blockNumber, activeChain, clientType]);

  const Content = useMemo(() => {
    return (
      <>
        {connectionStatus === "connected" ? (
          <>
            connected to <b>{activeChain?.name}</b> via {clientType}
          </>
        ) : connectionStatus === "error" ? (
          <>error: Connection error</>
        ) : (
          <>
            connecting to {activeChain?.name} via {clientType}
          </>
        )}
      </>
    );
  }, [activeChain, connectionStatus, clientType]);

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
