import Link from "next/link";
import { WalletSelect } from "../account/wallet-select";
import { ThemeToggle } from "./theme-toggle";
import { PolkadotLogo } from "../ui/polkadot-logo";

export default function Nav() {
  return (
    <nav className="fixed top-0 px-8 py-4 z-20 w-full flex items-center justify-between gap-2">
      <Link href="/" className="flex items-end flex-col">
        <PolkadotLogo withPoweredBy={false} />
        <span className="text-[13px] font-light mr-1 -mt-1.5">App Starter</span>
      </Link>

      <div className="flex items-center gap-2 h-12">
        <ThemeToggle />
        <WalletSelect />
      </div>
    </nav>
  );
}
