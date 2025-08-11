import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Link({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <NextLink
      href={href}
      className={cn(
        "flex items-center gap-0.5 text-muted-foreground hover:text-foreground group transition-colors",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </NextLink>
  );
}
