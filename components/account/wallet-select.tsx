"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Identicon } from "@polkadot/react-identicon";
import { allSubstrateWallets, SubstrateWalletPlatform } from "./wallets";
import { isMobile } from "@/lib/is-mobile";
import { usePolkadotExtension } from "@/providers/polkadot-extension-provider";
import { MultiViewDialog, DialogView } from "../ui/multi-view-dialog";
import { ViewSelectWallet } from "./view-select-wallet";
import { ViewSelectAccount } from "./view-select-account";

export function WalletSelect({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: string;
}) {
  const { selectedAccount, availableExtensions, selectedExtensions } =
    usePolkadotExtension();

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

  const hasConnectedAccounts = selectedExtensions.some((extension) =>
    extension.getAccounts().some((account) => account.address),
  );

  const views: DialogView[] = [
    {
      title: `Connect Wallets (${selectedExtensions.length} connected)`,
      description:
        "Select a wallet to connect to your account. If you don't have a wallet installed, you can install one from the list.",
      content: ({ next, previous }) => (
        <ViewSelectWallet next={next} previous={previous} />
      ),
    },
    {
      title: "Select Account",
      description: "Select an account to use for app interactions",
      content: ({ previous }) => <ViewSelectAccount previous={previous} />,
    },
  ];

  return (
    <MultiViewDialog
      initialView={hasConnectedAccounts ? 1 : 0}
      trigger={
        <Button
          variant="outline"
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
      }
      views={views}
    />
  );
}
