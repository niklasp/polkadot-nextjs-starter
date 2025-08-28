import { ChainInfoCards } from "@/components/info-cards/chain-info-cards";
import { AccountInfoCards } from "@/components/info-cards/account-info-cards";
import { ExtrinsicCards } from "@/components/info-cards/extrinsic-cards";

export default function TypinkHome() {
  return (
    <main className="flex min-h-screen p-6 sm:p-8 pb-20 flex-col gap-[32px] row-start-2 items-center relative">
      <ChainInfoCards />
      <AccountInfoCards />
      <ExtrinsicCards />
    </main>
  );
}
