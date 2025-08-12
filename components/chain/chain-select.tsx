"use client";

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

import { useChainId, useSupportedNetworks } from "@/hooks/polkadot-hooks";
import Image from "next/image";
import { useCallback, useMemo } from "react";

export function ChainSelect() {
  const { chainId: activeChainId, setChainId } = useChainId();
  const supportedNetworks = useSupportedNetworks();

  const ChainLogo = useCallback(
    (networkId: string) => {
      const network = supportedNetworks.find(
        (network) => network.id === networkId,
      );
      if (network?.logo && network?.name !== "" && network?.logo !== "") {
        return (
          <Image src={network.logo} alt={network.name} width={20} height={20} />
        );
      } else {
        return "N/A";
      }
    },
    [supportedNetworks],
  );

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
        {ChainLogo(activeChainId)}
      </Button>
    );
  }, [ChainLogo, activeChainId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{Trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Chain</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={activeChainId}
          onValueChange={(value) => {
            if (value) {
              setChainId(value as string);
            }
          }}
        >
          {supportedNetworks.map((network) => {
            return (
              <DropdownMenuRadioItem key={network.id} value={network.id}>
                {ChainLogo(network.id)}
                {network.name}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
