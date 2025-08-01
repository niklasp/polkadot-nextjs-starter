"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StatusChange, WsEvent } from "polkadot-api/ws-provider/web";
import { AlertCircle, Loader2 } from "lucide-react";
import { useMemo } from "react";
import { usePolkadotContext } from "@/providers/polkadot-provider";
import { config } from "@/config";
import { ChainId } from "@reactive-dot/core";

export function ChainSelect() {
  const { chainId, setChainId, activeChain } = usePolkadotContext();

  const Trigger = useMemo(() => {
    // if (connectionStatus?.type === WsEvent.ERROR) {
    //   return (
    //     <Button variant="ghost" size="icon">
    //       <AlertCircle className="w-4 h-4 text-red-500" />
    //     </Button>
    //   );
    // }

    // if (connectionStatus?.type === WsEvent.CONNECTING) {
    //   return (
    //     <TooltipProvider>
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Button variant="ghost" size="icon">
    //             <Loader2 className="w-4 h-4 animate-spin" />
    //           </Button>
    //         </TooltipTrigger>
    //         <TooltipContent>Connecting to the network...</TooltipContent>
    //       </Tooltip>
    //     </TooltipProvider>
    //   );
    // }

    return (
      <Button variant="ghost" size="icon">
        {activeChain?.icon}
      </Button>
    );
  }, [activeChain]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{Trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Chain</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={chainId}
          onValueChange={(value) => {
            if (value) {
              setChainId(value as ChainId);
            }
          }}
        >
          {Object.keys(config.chains).map((chainId) => {
            const chain = config.chains[chainId as keyof typeof config.chains];
            return (
              <DropdownMenuRadioItem key={chainId} value={chainId}>
                {chain.icon}
                {chain.name}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
