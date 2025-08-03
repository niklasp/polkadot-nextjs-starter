import { fontUnbounded } from "@/fonts";
import { cn } from "@/lib/utils";
import { Link } from "@/components/ui/link";
import { ChainInfoCards } from "@/components/info-cards/chain-info-cards";
import { AccountInfoCards } from "@/components/info-cards/account-info-cards";
import { ExtrinsicInfoCards } from "@/components/info-cards/extrinsic-info-cards";

export default async function Home() {
  return (
    <main className="flex min-h-screen p-6 sm:p-8 pb-20 flex-col gap-[32px] row-start-2 items-center relative">
      <h1
        className={cn(
          "text-5xl lg:text-6xl font-light pt-10",
          fontUnbounded.className,
        )}
      >
        Polkadot Next.js Starter
      </h1>
      <p className="text-center text-muted-foreground text-lg">
        A starter project for your next Polkadot dApp.
      </p>

      <ChainInfoCards />
      <AccountInfoCards />
      <ExtrinsicInfoCards />
    </main>
  );
}
