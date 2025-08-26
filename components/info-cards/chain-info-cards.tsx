"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useActiveChain, useClient } from "@/hooks/polkadot-hooks";
import {
  ClientConnectionStatus,
  useBlockInfo,
  usePolkadotClient,
  useTypink,
} from "typink";
import { Info } from "../ui/info";
import { Skeleton } from "../ui/skeleton";

export function ClientConnectionStatusIcon({
  status,
}: {
  status: ClientConnectionStatus;
}) {
  return (
    <div>
      {status === ClientConnectionStatus.Connected && (
        <span className="block bg-green-500 text-white rounded-full w-2 h-2 animate-pulse"></span>
      )}
      {status === ClientConnectionStatus.Error && (
        <span className="block bg-red-500 text-white rounded-full w-2 h-2 animate-pulse"></span>
      )}
      {status === ClientConnectionStatus.Connecting && (
        <span className="block bg-yellow-500 text-white rounded-full w-2 h-2 animate-pulse"></span>
      )}
      {status === ClientConnectionStatus.NotConnected && (
        <span className="block bg-red-500 text-white rounded-full w-2 h-2 animate-pulse"></span>
      )}
    </div>
  );
}

export function ClientBlockNumber({
  networkId,
  status,
}: {
  networkId: string;
  status: ClientConnectionStatus;
}) {
  const blockInfo = useBlockInfo({ networkId });
  return (
    <div>
      {status === ClientConnectionStatus.Connected ? (
        <div>{blockInfo.best?.number.toString()}</div>
      ) : (
        <Skeleton className="w-20 h-7" />
      )}
    </div>
  );
}

export function ChainInfoCards() {
  const { networkConnections, connectionStatus, networks } = useTypink();

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl">
      <h2 className="font-bold tabular-nums text-md">Chain Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {networkConnections.map((connection) => {
          const network = networks.find(
            (network) => network.id === connection.networkId,
          );
          const networkName = network?.name;
          const networkLogo = network?.logo;
          const status = connectionStatus.get(connection.networkId);
          return (
            <Card key={connection.networkId}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {networkLogo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={networkLogo}
                      width={24}
                      height={24}
                      alt={networkName ?? ""}
                    />
                  )}
                  {networkName}
                </CardTitle>
                <CardContent className="flex gap-2 px-0 py-4 text-sm flex-col">
                  <Info label={"network id"} element={connection.networkId} />
                  <Info
                    label={"connection status"}
                    element={
                      <div className="tabular-nums flex items-center gap-2">
                        <ClientConnectionStatusIcon
                          status={status ?? ClientConnectionStatus.NotConnected}
                        />
                        {status?.toLowerCase() ?? ""}
                      </div>
                    }
                  />
                  <Info
                    label={"best block"}
                    element={
                      <ClientBlockNumber
                        networkId={connection.networkId}
                        status={status ?? ClientConnectionStatus.NotConnected}
                      />
                    }
                  />
                  <Info
                    label={"token symbol"}
                    element={
                      network?.symbol ?? <Skeleton className="w-16 h-4" />
                    }
                  />
                  <Info
                    label={"token decimals"}
                    element={
                      network?.decimals ?? <Skeleton className="w-16 h-4" />
                    }
                  />
                </CardContent>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
