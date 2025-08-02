"use client";
import { SuspendingTxButton } from "@/components/chain-ui/tx-button";
import { Binary } from "polkadot-api";
import { useCallback } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useTypedApi } from "@reactive-dot/react";

export function ExtrinsicInfoCards() {
  // Transaction builder - typed to match SuspendingTxButton's expected type
  const remarkTxBuilder = useCallback(
    (tx: ReturnType<typeof useTypedApi>["tx"]) =>
      tx.System.remark({
        remark: Binary.fromText("Hello from polkadot-next-js-starter!"),
      }),
    [],
  );

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl">
      <h2 className="font-bold tabular-nums text-md">
        Calling Extrinsics (mutating chain state)
      </h2>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Remark</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums text-md">
                <SuspendingTxButton txBuilder={remarkTxBuilder}>
                  Create On Chain Remark
                </SuspendingTxButton>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
