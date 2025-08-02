import { fontUnbounded } from "@/fonts";
import { cn } from "@/lib/utils";
import { Link } from "@/components/ui/link";
import { ChainInfoCards } from "@/components/info-cards/chain-info-cards";
import { AccountInfoCards } from "@/components/info-cards/account-info-cards";
import { Suspense } from "react";
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

      <Suspense fallback={<div>Loading...</div>}>
        <ChainInfoCards />
      </Suspense>
      <AccountInfoCards />
      <Suspense fallback={<div>Loading...</div>}>
        <ExtrinsicInfoCards />
      </Suspense>

      <div className="flex flex-col gap-4 text-sm">
        <p className="text-center mb-0 pb-0">Built with</p>
        <div className="flex gap-4 text-sm">
          <Link href="https://nextjs.org" className="font-mono">
            next.js
          </Link>

          <Link href="https://polkadot.js.org" className="font-mono">
            polkadot-api (papi)
          </Link>

          <Link href="https://reactive-dot.com" className="font-mono">
            reactive-dot
          </Link>
        </div>
      </div>
      <a
        className="hidden sm:block"
        href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fniklasp%2Fpolkadot-nextjs-starter"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://vercel.com/button"
          alt="Deploy with Vercel"
          width={103}
          height={32}
        />
      </a>
    </main>
  );
}
