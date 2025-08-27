"use client";

import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { formatBalance } from "@/lib/format-balance";
import { trimAddress } from "@/lib/utils";
import { useMemo } from "react";
import {
  useTypink,
  type InjectedAccount,
  useBalance,
  type NetworkConnection,
  usePolkadotClient,
  ClientConnectionStatus,
} from "typink";
import { Info } from "../ui/info";

function AccountBalanceInfo({
  connectedAccount,
  networkId,
}: {
  connectedAccount?: InjectedAccount;
  networkId?: string;
}) {
  const { networks, clients } = useTypink();

  // Get connected networks
  const connectedNetworks = useMemo(
    () => networks.filter((network) => clients.has(network.id)),
    [networks, clients],
  );

  const balance = useBalance(connectedAccount?.address ?? "", {
    networkId: networkId ?? connectedNetworks[0].id,
  });

  const { status } = usePolkadotClient(networkId);

  const network = networks.find((network) => network.id === networkId);

  const formattedBalance = useMemo(() => {
    if (!connectedAccount?.address) {
      return "No account selected";
    }

    if (status === ClientConnectionStatus.Connecting) {
      return <Skeleton className="h-6 w-32" />;
    }

    return formatBalance({
      value: BigInt(balance?.free ?? "0"),
      decimals: network?.decimals ?? 18,
      unit: network?.symbol ?? "DOT",
      nDecimals: 4,
    });
  }, [balance, connectedAccount, status, network]);

  return (
    <Info
      label={
        <div className="flex flex-row gap-2 items-center">
          {network?.name ?? "Account Balance"}
          {network?.logo && (
            <img src={network.logo} alt={network.name} className="w-4 h-4" />
          )}
        </div>
      }
      element={formattedBalance}
    />
  );
}

export function AccountInfoCards() {
  const { connectedAccount, networkConnections } = useTypink();

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl">
      <h2 className="font-bold tabular-nums text-md">Account Info</h2>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-4">
            <Card>
              <CardContent>
                <Info
                  label="Account Address"
                  element={
                    connectedAccount?.address
                      ? trimAddress(connectedAccount?.address)
                      : "No account selected"
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Info
                  label="Account Name"
                  element={connectedAccount?.name ?? "No account selected"}
                />
              </CardContent>
            </Card>
          </div>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Account Balances</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row gap-2 w-full justify-between">
              {networkConnections?.map((networkConnection, index) => (
                <AccountBalanceInfo
                  connectedAccount={connectedAccount}
                  networkId={networkConnection.networkId}
                  key={index}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
