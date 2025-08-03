import Link from "next/link";
import { Link as AnimatedLink } from "@/components/ui/link";
import { PolkadotLogo } from "../ui/polkadot-logo";
import { Github } from "lucide-react";
import { Button } from "../ui/button";
export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black mt-24">
      <div className="container mx-auto px-6 sm:px-8 py-8">
        <div className="text-center w-full flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/niklasp/polkadot-nextjs-starter"
              target="_blank"
              className="flex text-smitems-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Button size="sm">
                <Github className="w-4 h-4" />
                <span>View on Github</span>
              </Button>
            </Link>
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
              polkadot-api (papi)
            </AnimatedLink>

            <AnimatedLink href="https://dedot.dev" className="font-mono">
              reactive-dot
            </AnimatedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
