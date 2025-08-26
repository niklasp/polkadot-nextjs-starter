"use client";

import { ViewNavigationProps } from "../ui/multi-view-dialog";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { trimAddress } from "@/lib/utils";
import Identicon from "@polkadot/react-identicon";
import { ArrowLeft } from "lucide-react";
import { useTypink } from "typink";
import { WalletAccount } from "@reactive-dot/core/wallets.js";

export function ViewSelectAccount({ previous }: ViewNavigationProps) {
  const {
    accounts,
    wallets,
    connectedWallets,
    connectedAccount,
    setConnectedAccount,
  } = useTypink();

  return (
    <>
      <div className="flex flex-col gap-2 overflow-y-scroll scroll-shadows max-h-[60vh] min-h-[100px]">
        {connectedWallets.map((connectedWallet) => {
          const walletAccounts = accounts.filter(
            (account) => account.source === connectedWallet.id,
          );

          return (
            <div key={connectedWallet?.id}>
              {walletAccounts.map((account) => (
                <DialogClose asChild key={account.address}>
                  <Button
                    variant={
                      connectedAccount?.address === account.address
                        ? "secondary"
                        : "ghost"
                    }
                    className="w-full flex flex-row h-auto justify-start items-center gap-2 px-2"
                    onClick={() => {
                      setConnectedAccount(account);
                    }}
                  >
                    <div className="relative inline-block">
                      {connectedWallet?.logo &&
                        connectedWallet.logo.startsWith("http") && (
                          <div className="rounded-full overflow-hidden border-2 border-background h-6 w-6 absolute bottom-0 right-0 shadow-md z-10 bg-background">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={connectedWallet.logo}
                              alt={connectedWallet.id}
                              width={32}
                              height={32}
                            />
                          </div>
                        )}
                      <div className="rounded-full overflow-hidden border-background w-12 h-12 relative">
                        <Identicon
                          value={account.address}
                          size={64}
                          theme="polkadot"
                          className="w-12 h-12 [&>svg]:!h-full [&>svg]:!w-full [&>svg>circle:first-child]:fill-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <span className="font-bold">{account.name}</span>
                      {account.address && (
                        <div>{trimAddress(account.address)}</div>
                      )}
                    </div>
                  </Button>
                </DialogClose>
              ))}
            </div>
          );
        })}
      </div>
      <DialogFooter className="pt-4">
        <Button
          variant="outline"
          onClick={previous}
          className="flex flex-row items-center gap-2"
        >
          <ArrowLeft className="w-3 h-3" /> Back to wallet selection
        </Button>
      </DialogFooter>
    </>
  );
}
