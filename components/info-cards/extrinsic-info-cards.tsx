"use client";
import { TxButton } from "@/components/chain-ui/tx-button";
import { useSelectedAccount } from "@/providers/selected-account-provider";
import { useMutation, useTypedApi } from "@reactive-dot/react";
import { Binary } from "polkadot-api";
import { useCallback } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useFees } from "@/hooks/use-fees";

export function ExtrinsicInfoCards() {
  const typedApi = useTypedApi();
  const { selectedAccount } = useSelectedAccount();

  // Extract transaction builder to reuse for both mutation and fees
  const remarkTxBuilder = useCallback(
    (tx: typeof typedApi.tx) =>
      tx.System.remark({
        remark: Binary.fromText("Hello from polkadot-next-js-starter!"),
      }),
    [typedApi], // Include typedApi in dependencies for proper typing
  );

  const remarkTx = useMutation(remarkTxBuilder, {
    signer: selectedAccount?.polkadotSigner,
  });
  const remarkTxFees = useFees(remarkTxBuilder, {
    signer: selectedAccount?.polkadotSigner,
  });

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
                <TxButton tx={remarkTx} fees={remarkTxFees}>
                  Create On Chain Remark
                </TxButton>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
