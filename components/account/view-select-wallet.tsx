import { Button } from "../ui/button";
import { ViewNavigationProps } from "../ui/multi-view-dialog";

import Image from "next/image";
import { DialogFooter } from "../ui/dialog";
import { ArrowRight, Plus, Zap, ZapOff } from "lucide-react";
import { cn } from "@/lib/utils";

import { ExtensionWallet, useTypink } from "typink";
import { ClientOnly } from "@/components/ui/client-only";

export const ViewSelectWallet = ({ next }: ViewNavigationProps) => {
  const { wallets, accounts, connectedWallet, connectWallet, disconnect } =
    useTypink();

  const sortedWallets = wallets.sort((a, b) => {
    if (a.installed && !b.installed) return -1;
    if (!a.installed && b.installed) return 1;
    return 0;
  });

  return (
    <div className="flex flex-col gap-2">
      {sortedWallets.map((wallet, index) => {
        console.log(wallet);

        const isConnected = connectedWallet?.id === wallet.id;

        console.log(wallet.name);

        // Get accounts for this specific wallet
        // const walletAccounts = accounts.filter((account) => {
        //   // Match accounts to their specific wallet by checking account.wallet property
        //   return account === wallet;
        // });
        const accountCount = accounts.length;

        return (
          <Button
            key={index}
            variant="ghost"
            className="relative w-full flex flex-row items-center justify-between [&_svg]:size-auto gap-2 h-14"
            onClick={() => {
              if (wallet.installed) {
                if (isConnected) {
                  disconnect();
                } else {
                  connectWallet(wallet.id);
                  console.log("Wallet connected");
                }
              } else {
                if (wallet instanceof ExtensionWallet) {
                  window.open(wallet.installUrl, "_blank");
                }
              }
            }}
          >
            <div className="flex flex-row items-center justify-start gap-0">
              <div
                className={cn(
                  "w-0 h-0 rounded-full bg-green-500 animate-pulse transition-all duration-300 ease-in-out",
                  isConnected && "w-2 h-2 mr-2",
                )}
              />
              <div className="flex flex-row items-center justify-start gap-2">
                <Image
                  src={wallet.logo ?? ""}
                  alt={wallet.name}
                  className="w-[32px] h-[32px]"
                  width={32}
                  height={32}
                />
                <div className="flex flex-col items-start">
                  <span className="font-bold">{wallet.name}</span>
                  <span
                    className={cn(
                      "text-xs text-muted-foreground overflow-hidden transition-all duration-300 ease-in-out",
                      isConnected && accountCount > 0 ? "h-4" : "h-0",
                    )}
                  >
                    {accountCount} account
                    {accountCount !== 1 ? "s" : ""} available
                  </span>
                </div>
              </div>
            </div>
            <>
              {!wallet.installed ? (
                <>
                  <span className="flex flex-row items-center gap-2">
                    <Plus className="w-4 h-4" /> Install
                  </span>
                </>
              ) : isConnected ? (
                <span className="text-red-600 dark:text-red-400 flex flex-row items-center gap-2">
                  <ZapOff className="w-4 h-4" /> Disconnect
                </span>
              ) : (
                <span className="text-green-600 dark:text-green-400 flex flex-row items-center gap-2">
                  <Zap className="w-4 h-4" /> Connect
                </span>
              )}
            </>
          </Button>
        );
      })}
      <DialogFooter className="pt-4">
        <Button
          variant="default"
          onClick={next}
          size="lg"
          disabled={!wallets.length}
          className="flex flex-row items-center gap-2"
        >
          Go to accounts <ArrowRight className="w-3 h-3" />
        </Button>
      </DialogFooter>
    </div>
  );
};
