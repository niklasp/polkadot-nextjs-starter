import Link from "next/link";
import { PolkadotLogo } from "../ui/polkadot-logo";
import { Github } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6 sm:px-8 py-8">
        <div className="text-center w-full flex flex-col items-center justify-center gap-4">
          <Link
            href="https://polkadot.network"
            target="_blank"
            className="items-center inline-block"
          >
            <PolkadotLogo withPoweredBy={true} />
          </Link>
          <Link
            href="https://github.com/niklasp/polkadot-nextjs-starter"
            target="_blank"
            className="flex text-smitems-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Github className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
