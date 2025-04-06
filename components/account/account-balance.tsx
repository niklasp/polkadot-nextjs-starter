"use client";

import { useAccountBalance } from "@/hooks/use-account-balance";
import { useChain } from "@/providers/chain-provider";
import { formatBalance } from "@polkadot/util";
import { useMemo } from "react";
import { Identicon } from "@polkadot/react-identicon";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatLastUpdated } from "../../lib/utils";
import { WalletSelect } from "./wallet-select";
import { usePolkadotExtension } from "@/providers/new-extension-provider";

export function AccountBalance() {
  const accountBalance = useAccountBalance();
  const { activeChain } = useChain();
  const { selectedAccount, isInitializing } = usePolkadotExtension();

  // Memoize chain properties to prevent unnecessary recalculations
  const { tokenDecimals, tokenSymbol } = useMemo(
    () =>
      activeChain?.properties || {
        tokenDecimals: 10,
        tokenSymbol: "PAS",
      },
    [activeChain?.properties]
  );

  // Format the balance for display
  const formattedBalance = useMemo(() => {
    if (accountBalance?.free === undefined) return null;

    return formatBalance(accountBalance.free, {
      decimals: tokenDecimals,
      // withSi: false,
      withUnit: false,
    });
  }, [accountBalance?.free, tokenDecimals]);

  // Format the last updated time
  const lastUpdatedText = useMemo(
    () => formatLastUpdated(accountBalance?.lastUpdated),
    [accountBalance?.lastUpdated]
  );

  return (
    <Card
      className={cn(
        "w-full max-w-sm relative flex flex-col",
        "border-2 rounded-xl"
      )}
    >
      {/* Show loading state during initialization OR while getting balance for connected account */}
      {isInitializing || (selectedAccount && !accountBalance) ? (
        <>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Free Balance on {activeChain?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[40px] flex items-center">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-28" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>Last updated:</span>
              <Skeleton className="h-3 w-12 ml-1" />
            </div>
          </CardFooter>
        </>
      ) : !selectedAccount ? (
        <>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Free Balance on {activeChain?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center flex-1">
            <WalletSelect
              className="w-full max-w-sm"
              placeholder="Select an Account"
            />
          </CardContent>
          <CardFooter className="pt-1">
            <div className="text-xs text-muted-foreground">
              Please select an account to view the balance.
            </div>
          </CardFooter>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Free Balance on {activeChain?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[40px] flex items-center">
              <div className="w-full flex items-center justify-between">
                <div className="rounded-full flex items-center justify-center gap-2">
                  <Identicon
                    value={selectedAccount.address}
                    size={36}
                    theme="polkadot"
                    className="[&>svg>circle:first-child]:fill-white"
                  />
                  <div className="font-medium">{selectedAccount.name}</div>
                </div>
                <div className="text-2xl font-bold">
                  {formattedBalance}{" "}
                  <span className="text-sm font-normal">{tokenSymbol}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>Last updated:</span>
              <span className="ml-1">{lastUpdatedText}</span>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
