import { fontUnbounded } from "@/fonts";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";

export default async function Home() {
  const repoUrl = "https://github.com/niklasp/polkadot-nextjs-starter";
  const vercelButton = "https://vercel.com/button";
  const deployMain = `https://vercel.com/new/clone?repository-url=${encodeURIComponent(`${repoUrl}/tree/main`)}`;
  const deployTypink = `https://vercel.com/new/clone?repository-url=${encodeURIComponent(`${repoUrl}/tree/typink`)}`;

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
        Choose a template to start. Each card links to a specific branch for
        one-click deploy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-2">
        <Card>
          <CardHeader>
            <CardTitle>papi + reactive-dot</CardTitle>
            <CardDescription>
              Lightweight papi stack using reactive-dot primitives.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/polkadot-nextjs-starter.png"
                alt="papi template screenshot"
                className="object-cover w-full h-full"
              />
            </div>
            <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Next.js 15 App Router + RSC</li>
              <li>papi integration with reactive-dot hooks</li>
              <li>Shadcn UI, Radix, Tailwind</li>
            </ul>
          </CardContent>
          <CardFooter className="flex items-center gap-3">
            <Link href="/papi" className="inline-flex">
              <Button>View template</Button>
            </Link>
            <Link
              href="https://github.com/niklasp/polkadot-nextjs-starter/tree/main"
              className="inline-flex"
            >
              <Button variant="outline">
                <Github className="w-4 h-4" /> View on github
              </Button>
            </Link>
            <a
              href={deployMain}
              className="hidden sm:inline-flex"
              target="_blank"
              rel="noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={vercelButton}
                alt="Deploy with Vercel"
                width={110}
                height={44}
              />
            </a>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>dedot + typink</CardTitle>
            <CardDescription>
              Dedot SDK with Typink provider and hooks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/polkadot-nextjs-starter.png"
                alt="typink template screenshot"
                className="object-cover w-full h-full"
              />
            </div>
            <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Next.js 15 App Router + RSC</li>
              <li>Typink provider, fees, tx hooks</li>
              <li>Shadcn UI, Radix, Tailwind</li>
              <li>Multi-chain support</li>
            </ul>
          </CardContent>
          <CardFooter className="flex items-center gap-3">
            <Link href="/typink" className="inline-flex">
              <Button>View template</Button>
            </Link>
            <Link
              href="https://github.com/niklasp/polkadot-nextjs-starter/tree/typink"
              className="inline-flex"
            >
              <Button variant="outline">
                <Github className="w-4 h-4" /> View on github
              </Button>
            </Link>
            <a
              href={deployTypink}
              className="hidden sm:inline-flex"
              target="_blank"
              rel="noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={vercelButton}
                alt="Deploy with Vercel"
                width={110}
                height={44}
              />
            </a>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
