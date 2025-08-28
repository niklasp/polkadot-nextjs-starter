import Link from "next/link";
import { Link as AnimatedLink } from "@/components/ui/link";
import { PolkadotLogo } from "@/components/ui/polkadot-logo";

export function Footer() {
  return (
    <footer className="border-t bg-black/50">
      <div className="container mx-auto px-6 sm:px-8 py-8">
        <div className="text-center w-full flex flex-col items-center justify-center gap-4">
          <div className="text-xs text-muted-foreground">
            made with <span aria-hidden>🩷</span> by{" "}
            <a
              href="https://x.com/niftesty"
              target="_blank"
              className="underline"
            >
              niftesty
            </a>
          </div>

          <Link
            href="https://polkadot.network"
            target="_blank"
            className="items-center inline-block"
          >
            <PolkadotLogo withPoweredBy={true} />
          </Link>
          <div className="flex gap-4 text-sm">
            <AnimatedLink href="https://nextjs.org" className="font-mono">
              next.js
            </AnimatedLink>

            <AnimatedLink href="https://papi.how" className="font-mono">
              papi
            </AnimatedLink>

            <AnimatedLink href="https://reactivedot.dev" className="font-mono">
              reactive-dot
            </AnimatedLink>

            <AnimatedLink href="https://dedot.dev" className="font-mono">
              dedot
            </AnimatedLink>

            <AnimatedLink
              href="https://docs.dedot.dev/typink"
              className="font-mono"
            >
              typink
            </AnimatedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
