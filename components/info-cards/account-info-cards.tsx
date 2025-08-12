"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  useActiveChain,
  useIsConnected,
  useSelectedAccount,
} from "@/hooks/polkadot-hooks";
import { useAccountBalance } from "@/hooks/use-account-balance";
import { formatBalance } from "@/lib/format-balance";
import { trimAddress } from "@/lib/utils";
import { useMemo } from "react";
import { type InjectedAccount } from "typink";

function AccountBalanceCard({
  selectedAccount,
}: {
  selectedAccount?: InjectedAccount;
}) {
  const accountBalance = useAccountBalance();
  const activeChain = useActiveChain();
  const isConnected = useIsConnected();

  const formattedBalance = useMemo(() => {
    if (!selectedAccount?.address) {
      return "No account selected";
    }

    if (!isConnected) {
      return <Skeleton className="h-6 w-32" />;
    }

    return formatBalance({
      value: BigInt(accountBalance?.free ?? "0"),
      decimals: activeChain.decimals,
      unit: activeChain.symbol,
      nDecimals: 4,
    });
  }, [accountBalance, activeChain, selectedAccount, isConnected]);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Account Balance</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums text-md">
          {formattedBalance}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export function AccountInfoCards() {
  const selectedAccount = useSelectedAccount();

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
          <AccountBalanceCard selectedAccount={selectedAccount} />
        </div>
      </div>
    </div>
  );
}
