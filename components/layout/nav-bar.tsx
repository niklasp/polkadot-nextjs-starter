import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { NavMobileControl } from "./nav-mobile-control";
import { PolkadotLogo } from "../ui/polkadot-logo";
import { ThemeToggle } from "./theme-toggle";
import { ChainSelect } from "../chain/chain-select";
import { WalletSelect } from "../account/wallet-select";

export interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Products",
    href: "/products",
    items: [
      { title: "Product 1", href: "#" },
      { title: "Product 2", href: "#" },
      { title: "Product 3", href: "#" },
    ],
  },
  {
    title: "Solutions",
    href: "/solutions",
    items: [
      { title: "Solution 1", href: "#" },
      { title: "Solution 2", href: "#" },
      { title: "Solution 3", href: "#" },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    items: [],
  },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 h-16 bg-gradient-to-b from-background via-background/50 to-background/0 backdrop-blur-sm -z-10" />
      <div className="px-6 sm:px-8 flex h-16 items-center justify-between">
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-end flex-col">
            <PolkadotLogo withPoweredBy={false} />
            <span className="text-[10px] sm:text-[13px] font-light mr-1 -mt-1.5">
              App Starter
            </span>
          </Link>

          {/* Mobile menu control - includes both toggle button and menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <ChainSelect />
            <WalletSelect />
            <NavMobileControl items={navItems} />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:flex-1 absolute left-1/2 -translate-x-1/2">
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.title} className="group relative">
                  {item.items && item.items.length > 0 ? (
                    <div className="flex cursor-pointer items-center gap-1 py-2 text-sm">
                      {item.title}
                      <ChevronDown className="size-4 transition-transform duration-200 group-hover:rotate-180" />
                    </div>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className="flex cursor-pointer items-center gap-1 py-2 text-sm"
                    >
                      {item.title}
                    </Link>
                  )}

                  {/* Dropdown menu that appears on hover */}
                  {item.items && item.items.length > 0 && (
                    <div className="invisible absolute left-1/2 top-full z-50 min-w-[180px] -translate-x-1/2 rounded-md border bg-background p-2 opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100">
                      <div className="flex flex-col space-y-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href || "#"}
                            className="rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex gap-1 items-center">
            <ThemeToggle />
            <ChainSelect />
            <WalletSelect />
          </div>
        </div>
      </div>
    </header>
  );
}
