"use client";
import { useConnectionStatus } from "@/providers/connection-provider";
import { useSelectedAccount } from "@/providers/selected-account-provider";
import { useMutation } from "@reactive-dot/react";
import { Binary } from "polkadot-api";
import { useEffect } from "react";
import { TxButton } from "../chain-ui/tx-button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ExtrinsicInfoCards() {
  const { selectedAccount } = useSelectedAccount();
  const { chainSpec, clientType, connectionStatus } = useConnectionStatus();

  const remarkMutation = useMutation(
    (tx) =>
      tx.System.remark({
        remark: Binary.fromText("Hello from polkadot-next-js-starter!"),
      }),
    { signer: selectedAccount?.polkadotSigner },
  );

  useEffect(() => {
    console.log("remarkState:", remarkMutation[0]);
    console.log("remarkState type:", typeof remarkMutation[0]);
    console.log(
      "remarkState properties:",
      Object.getOwnPropertyNames(remarkMutation[0]),
    );
  }, [remarkMutation]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl">
      <h2 className="font-bold tabular-nums text-md">
        Calling Extrinsics (mutating chain state)
      </h2>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Remark</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                <TxButton tx={remarkMutation}>Create On Chain Remark</TxButton>
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
