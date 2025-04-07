"use client";

import { usePolkadotExtension } from "@/providers/polkadot-extension-provider";
import { ViewNavigationProps } from "../ui/multi-view-dialog";
import { allSubstrateWallets } from "./wallets";
import { isMobile } from "@/lib/is-mobile";
import { SubstrateWalletPlatform } from "./wallets";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { trimAddress } from "@/lib/utils";
import Identicon from "@polkadot/react-identicon";

export function ViewSelectAccount({ previous }: ViewNavigationProps) {
  const {
    selectedExtensions,
    setSelectedAccount,
    availableExtensions,
    selectedAccount,
  } = usePolkadotExtension();

  // only show wallets that are available on the current platform (mobile or browser)
  const systemWallets = allSubstrateWallets
    .filter((wallet) =>
      isMobile()
        ? wallet.platforms.includes(SubstrateWalletPlatform.Android) ||
          wallet.platforms.includes(SubstrateWalletPlatform.iOS)
        : wallet.platforms.includes(SubstrateWalletPlatform.Browser),
    )
    .sort((a, b) =>
      availableExtensions.includes(a.id)
        ? -1
        : availableExtensions.includes(b.id)
          ? 1
          : 0,
    );

  return (
    <>
      <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-thin max-h-[60vh] min-h-[100px]">
        {selectedExtensions.map((extension) => {
          const logoUrl = systemWallets.find(
            (wallet) => wallet.id === extension.name,
          )?.logoUrls[0];

          return (
            <div key={extension.name}>
              {extension
                .getAccounts()
                .filter((account) => account.type === "sr25519")
                .map((account) => (
                  <DialogClose asChild key={account.address}>
                    <Button
                      variant={
                        selectedAccount?.address === account.address &&
                        selectedAccount?.extension.name === extension.name
                          ? "secondary"
                          : "ghost"
                      }
                      className="w-full flex flex-row h-auto justify-start items-center gap-2 px-2"
                      onClick={() => {
                        setSelectedAccount(extension, account);
                      }}
                    >
                      <div className="relative inline-block">
                        {logoUrl && (
                          <div className="rounded-full overflow-hidden border-2 border-background h-6 w-6 absolute bottom-0 right-0 shadow-md z-10 bg-background">
                            <Image
                              src={logoUrl}
                              alt={extension.name}
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
          className="flex items-center gap-2"
        >
          ← Back to wallet selection
        </Button>
      </DialogFooter>
    </>
  );
}
