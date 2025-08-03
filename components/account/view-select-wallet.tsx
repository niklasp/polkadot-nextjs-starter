import { Button } from "../ui/button";
import { ViewNavigationProps } from "../ui/multi-view-dialog";
import {
  useWallets,
  useAccounts,
  useConnectedWallets,
  useWalletDisconnector,
  useWalletConnector,
} from "@reactive-dot/react";

import { allSubstrateWallets } from "./wallets";
import Image from "next/image";
import { DialogFooter } from "../ui/dialog";
import { ArrowRight, Zap, ZapOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelectedAccount } from "@/providers/selected-account-provider";

export const ViewSelectWallet = ({ next }: ViewNavigationProps) => {
  const wallets = useWallets();
  const accounts = useAccounts();
  const connectedWallets = useConnectedWallets();
  const { selectedAccount, setSelectedAccount } = useSelectedAccount();

  const [_, connectWallet] = useWalletConnector();
  const [__, disconnectWallet] = useWalletDisconnector();

  return (
    <div className="flex flex-col gap-2">
      {wallets.map((wallet, index) => {
        console.log(wallet);
        const walletMetadata = allSubstrateWallets.find(
          (w) => w.id === wallet.name,
        );

        console.log(wallet.name, walletMetadata);
        const isConnected = connectedWallets.some(
          (w) => w.name === wallet.name,
        );
        // Get accounts for this specific wallet
        const walletAccounts = accounts.filter((account) => {
          // Match accounts to their specific wallet by checking account.wallet property
          return account.wallet === wallet;
        });
        const accountCount = walletAccounts.length;

        return (
          <Button
            key={index}
            variant="ghost"
            className="relative w-full flex flex-row items-center justify-between [&_svg]:size-auto gap-2 h-14"
            onClick={() => {
              if (wallet) {
                if (isConnected) {
                  disconnectWallet(wallet);
                } else {
                  connectWallet(wallet);
                  console.log("Wallet connected");
                }
              } else {
                window.open(walletMetadata?.urls.website, "_blank");
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
                  src={walletMetadata?.logoUrls[0] ?? ""}
                  alt={wallet.name}
                  className="w-[32px] h-[32px]"
                  width={32}
                  height={32}
                />
                <div className="flex flex-col items-start">
                  <span className="font-bold">{walletMetadata?.name}</span>
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
              {!wallet ? (
                "Install"
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
