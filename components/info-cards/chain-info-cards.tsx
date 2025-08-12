"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useActiveChain, useClient } from "@/hooks/polkadot-hooks";

export function ChainInfoCards() {
  const activeChain = useActiveChain();
  const client = useClient();

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl">
      <h2 className="font-bold tabular-nums text-md">Chain Info</h2>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <CardDescription>Client Status</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                {client?.provider.status ?? "Disconnected"}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Token Decimals</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                {activeChain?.decimals}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Token Symbol</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                {activeChain?.symbol}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
