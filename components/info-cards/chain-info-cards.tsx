"use client";
import { useConnectionStatus } from "@/providers/connection-provider";
import { usePolkadotContext } from "@/providers/polkadot-provider";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ChainInfoCards() {
  const { activeChain } = usePolkadotContext();
  const { chainSpec, clientType, connectionStatus } = useConnectionStatus();

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl">
      <h2 className="font-bold tabular-nums text-md">Chain Info</h2>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Chain Name</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                {activeChain?.name}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Client Type</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                {clientType}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Token Decimals</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                {connectionStatus === "connected" ? (
                  chainSpec?.tokenDecimals
                ) : (
                  <Skeleton className="w-8 h-6" />
                )}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Token Symbol</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                {connectionStatus === "connected" ? (
                  chainSpec?.tokenSymbol
                ) : (
                  <Skeleton className="w-10 h-6" />
                )}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
