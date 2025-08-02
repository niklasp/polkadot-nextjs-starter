"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { useSelectedAccount } from "@/providers/selected-account-provider";
import { trimAddress } from "@/lib/utils";
import { useAccountBalance } from "@/hooks/use-account-balance";
import { useMemo, Suspense } from "react";
import { formatBalance } from "@/lib/format-balance";
import { usePolkadotContext } from "@/providers/polkadot-provider";

function AccountBalanceCard() {
  const accountBalance = useAccountBalance();
  const { chainSpec } = usePolkadotContext();

  const formattedBalance = useMemo(() => {
    if (!accountBalance || !chainSpec) {
      return <Skeleton className="h-6 w-32" />;
    }

    return formatBalance({
      value: accountBalance.free,
      decimals: chainSpec.tokenDecimals,
      unit: chainSpec.tokenSymbol,
      nDecimals: 4,
    });
  }, [accountBalance, chainSpec]);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Account Balance</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums text-md">
          {formattedBalance ?? "Loading..."}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

function BalanceCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Account Balance</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums text-md">
          <Skeleton className="h-6 w-32" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export function AccountInfoCards() {
  const { selectedAccount } = useSelectedAccount();

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl">
      <h2 className="font-bold tabular-nums text-md">Account Info</h2>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Account Address</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                {selectedAccount?.address
                  ? trimAddress(selectedAccount?.address)
                  : "No account selected"}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Account Name</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                {selectedAccount?.name ?? "No account selected"}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Wallet</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                {selectedAccount?.wallet?.name ?? "No wallet selected"}
              </CardTitle>
            </CardHeader>
          </Card>
          <Suspense fallback={<BalanceCardSkeleton />}>
            <AccountBalanceCard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
