import { Button } from "../ui/button";
import { ViewNavigationProps } from "../ui/multi-view-dialog";
import { usePolkadotExtension } from "@/providers/polkadot-extension-provider";
import { SubstrateWalletPlatform } from "./wallets";
import { isMobile } from "@/lib/is-mobile";
import { allSubstrateWallets } from "./wallets";
import Image from "next/image";
import { DialogFooter } from "../ui/dialog";
import { Zap, ZapOff } from "lucide-react";
import { cn } from "@/lib/utils";

export const ViewSelectWallet = ({ next }: ViewNavigationProps) => {
  const { onToggleExtension, availableExtensions, selectedExtensions } =
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

  return (
    <div className="flex flex-col gap-2">
      {systemWallets.map((wallet, index) => {
        const connectedExtension = selectedExtensions.find(
          (ext) => ext.name === wallet.id,
        );
        const isConnected = !!connectedExtension;
        const accountCount =
          connectedExtension
            ?.getAccounts()
            .filter((acc) => acc.type === "sr25519").length ?? 0;

        return (
          <Button
            key={index}
            variant="ghost"
            className="relative w-full flex flex-row items-center justify-between [&_svg]:size-auto gap-2 h-14"
            onClick={() => {
              if (availableExtensions.includes(wallet.id)) {
                onToggleExtension(wallet.id);
              } else {
                window.open(wallet.urls.website, "_blank");
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
                  src={wallet.logoUrls[0]}
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
              {!availableExtensions.includes(wallet.id) ? (
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
          disabled={!selectedExtensions.length}
        >
          Go to accounts →
        </Button>
      </DialogFooter>
    </div>
  );
};
