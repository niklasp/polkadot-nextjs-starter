"use client";
import { TxButton } from "@/components/chain-ui/tx-button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useClient, useTypink } from "typink";

export function ExtrinsicInfoCards() {
  const { client } = useTypink();

  const tx = client?.tx.system.remarkWithEvent(
    "Hello, World from Polkadot Next.js Starter!",
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
                <TxButton tx={tx}>Create On Chain Remark</TxButton>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
