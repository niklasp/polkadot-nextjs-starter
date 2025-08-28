import { ChainInfoCards } from "@/components/info-cards/chain-info-cards";
import { AccountInfoCards } from "@/components/info-cards/account-info-cards";
import { ExtrinsicCards } from "@/components/info-cards/extrinsic-cards";
import { fontUnbounded } from "@/fonts";
import { cn } from "@/lib/utils";

export default function TypinkHome() {
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
      <p className="text-center text-muted-foreground text-lg max-w-prose">
        dedot + typink template
      </p>
      <ChainInfoCards />
      <AccountInfoCards />
      <ExtrinsicCards />
    </main>
  );
}
