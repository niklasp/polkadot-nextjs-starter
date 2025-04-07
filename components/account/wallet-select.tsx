"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, LogOut, Wallet, XIcon } from "lucide-react";
import { usePolkadotExtension } from "@/providers/polkadot-extension-provider";
import { cn, trimAddress } from "@/lib/utils";
import { Identicon } from "@polkadot/react-identicon";
import { allSubstrateWallets, SubstrateWalletPlatform } from "./wallets";
import { isMobile } from "@/lib/is-mobile";
import Image from "next/image";

export function WalletSelect({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: string;
}) {
  const {
    accounts,
    installedExtensions,
    selectedExtensionName,
    selectedAccount,
    setSelectedExtensionName,
    setSelectedAccount,
    initiateConnection,
    disconnect,
    isAccountsLoading,
  } = usePolkadotExtension();

  const systemWallets = allSubstrateWallets
    .filter((wallet) =>
      isMobile()
        ? wallet.platforms.includes(SubstrateWalletPlatform.Android) ||
          wallet.platforms.includes(SubstrateWalletPlatform.iOS)
        : wallet.platforms.includes(SubstrateWalletPlatform.Browser),
    )
    .sort((a, b) =>
      installedExtensions.includes(a.id)
        ? -1
        : installedExtensions.includes(b.id)
          ? 1
          : 0,
    );

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        <Button
          variant="outline"
          onClick={initiateConnection}
          className="transition-[min-width] duration-300"
        >
          <Wallet className="w-4 h-4" /> {placeholder}
          {selectedAccount?.name && (
            <span className="hidden sm:block max-w-[100px] truncate">
              {selectedAccount?.name}
            </span>
          )}
          {selectedAccount?.address && (
            <Identicon
              value={selectedAccount?.address}
              size={30}
              theme="polkadot"
              className="[&>svg>circle:first-child]:fill-none"
            />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className="p-4 flex flex-row items-center justify-start">
          {selectedExtensionName !== undefined && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedExtensionName(undefined)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <DialogTitle
            className={cn(
              "leading-snug !pl-4 text-left",
              selectedExtensionName !== undefined && "!pl-0",
            )}
          >
            {selectedExtensionName !== undefined
              ? "Select Account"
              : "Select a wallet to connect to Polkadot"}
          </DialogTitle>
          {selectedExtensionName !== undefined && (
            <Button variant="ghost" size="icon" onClick={disconnect}>
              <LogOut className="w-4 h-4" />
            </Button>
          )}
          <DialogClose asChild className="ml-auto">
            <Button variant="ghost" size="icon">
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="p-4 pt-0 overflow-auto max-h-[500px] min-h-[100px] transition-[max-height,opacity] duration-500">
          <div
            className={cn(
              "flex flex-col items-start gap-2 transition-[max-height,opacity]",
              selectedExtensionName === undefined
                ? "opacity-100 max-h-[9999px] duration-500 delay-200"
                : "opacity-0 max-h-0 overflow-hidden duration-0",
            )}
          >
            {systemWallets.map((wallet, index) => (
              <Button
                variant="ghost"
                className="w-full flex flex-row items-center justify-between h-auto [&_svg]:size-auto"
                key={index}
                onClick={() => {
                  if (installedExtensions.includes(wallet.id)) {
                    setSelectedExtensionName(wallet.id);
                  } else {
                    window.open(wallet.urls.website, "_blank");
                  }
                }}
              >
                <div className="flex flex-row items-center justify-start gap-4">
                  <Image
                    src={wallet.logoUrls[0]}
                    alt={wallet.name}
                    className="w-[32px] h-[32px]"
                    width={32}
                    height={32}
                  />
                  <span className="font-bold">{wallet.name}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {installedExtensions.includes(wallet.id)
                    ? "Detected"
                    : "Install"}
                </span>
              </Button>
            ))}
          </div>
          <div
            className={cn(
              "flex flex-col items-start gap-2 transition-[max-height,opacity]",
              selectedExtensionName === undefined
                ? "opacity-0 max-h-0 overflow-hidden duration-0"
                : "opacity-100 max-h-[9999px] duration-500 delay-200",
            )}
          >
            {accounts.length > 0 ? (
              accounts.map((account, index) => (
                <DialogClose asChild key={index}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full flex flex-row h-auto justify-start items-center gap-0 [&_svg]:size-auto",
                      selectedAccount?.address === account.address
                        ? "bg-accent"
                        : "",
                    )}
                    onClick={() => setSelectedAccount(account)}
                  >
                    <Identicon
                      className="w-[32px] h-[32px] mr-3 [&>svg]:!h-full [&>svg]:!w-full [&>svg>circle:first-child]:fill-none"
                      value={account.address}
                      size={32}
                      theme="polkadot"
                    />
                    <div className="flex flex-col justify-start items-start gap-0">
                      <span className="font-bold">{account.name}</span>
                      {account.address && (
                        <div>{trimAddress(account.address)}</div>
                      )}
                    </div>
                  </Button>
                </DialogClose>
              ))
            ) : (
              <div>
                {isAccountsLoading
                  ? "Loading accounts..."
                  : "Please allow the site to access your extension accounts"}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
