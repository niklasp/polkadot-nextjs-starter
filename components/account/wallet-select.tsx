"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Identicon } from "@polkadot/react-identicon";
import { MultiViewDialog, DialogView } from "../ui/multi-view-dialog";
import { ViewSelectWallet } from "./view-select-wallet";
import { ViewSelectAccount } from "./view-select-account";
import { useSelectedAccount } from "@/providers/selected-account-provider";
import { useConnectedWallets, useWallets } from "@reactive-dot/react";

export function WalletSelect({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: string;
}) {
  const { selectedAccount } = useSelectedAccount();
  const wallets = useWallets();
  const connectedWallets = useConnectedWallets();

  const views: DialogView[] = [
    {
      title: `Connect Wallets (${wallets.length} connected)`,
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
      initialView={connectedWallets.length > 0 ? 1 : 0}
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
