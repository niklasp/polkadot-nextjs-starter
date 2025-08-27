"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTypink, useTx, ClientConnectionStatus } from "typink";
import { RemarkButton } from "../chain-ui/remark-button";
import { cn } from "@/lib/utils";

export function ExtrinsicCards() {
  const { supportedNetworks, connectionStatus } = useTypink();

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl">
      <h2 className="font-bold tabular-nums text-md">
        Calling Extrinsics (mutating chain state)
      </h2>
      <div>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-4",
            supportedNetworks.length > 3 && "grid-cols-2",
          )}
        >
          {supportedNetworks.map((network) => {
            const status = connectionStatus.get(network.id);
            const isConnected = status === ClientConnectionStatus.Connected;
            return (
              <Card key={network.id}>
                <CardHeader>
                  <CardTitle>{network.name}</CardTitle>
                  <CardDescription>
                    Send a remark to {network.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isConnected ? (
                    <RemarkButton networkId={network.id} />
                  ) : (
                    <div className="flex items-center justify-center">
                      <p className="text-sm text-gray-500">
                        Not connected to {network.name}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
