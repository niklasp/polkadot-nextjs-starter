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
import { Eye, Github, Triangle } from "lucide-react";
import Image from "next/image";
import { GithubStars } from "@/components/github-stars";

export default async function Home() {
  const repoUrl = "https://github.com/niklasp/polkadot-nextjs-starter";
  const deployPapi = `https://vercel.com/new/clone?repository-url=${encodeURIComponent(`${repoUrl}/tree/papi`)}`;
  const deployTypink = `https://vercel.com/new/clone?repository-url=${encodeURIComponent(`${repoUrl}/tree/typink`)}`;

  return (
    <main className="flex min-h-screen p-6 sm:p-8 pb-20 flex-col gap-[32px] row-start-2 items-center relative">
      <GithubStars />
      <h1
        className={cn(
          "text-5xl lg:text-6xl font-light pt-30",
          fontUnbounded.className,
        )}
      >
        Polkadot Next.js Starter
      </h1>
      <p className="text-center text-md max-w-prose">
        Choose a template to start. Each card links to a specific branch for
        one-click deploy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-2">
        <Card>
          <CardHeader>
            <CardTitle>papi + reactive-dot</CardTitle>
            <CardDescription>
              <Link href="https://papi.how" className="underline">
                Polkadot-Api (papi)
              </Link>{" "}
              stack using{" "}
              <Link href="reactivedot.dev/" className="underline">
                reactive-dot
              </Link>{" "}
              primitives.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 flex-1">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md border">
              <Link href="https://papi-reactive-dot.polkadot-nextjs.com">
                <Image
                  src="/polkadot-nextjs-starter.png"
                  alt="papi template screenshot"
                  width={1000}
                  height={1000}
                />
              </Link>
            </div>
            <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Next.js 15 App Router + RSC</li>
              <li>Wallet integration with signers</li>
              <li>papi integration with reactive-dot hooks</li>
              <li>Shadcn UI, Radix, Tailwind</li>
            </ul>
          </CardContent>
          <CardFooter className="flex items-center gap-2 flex-wrap">
            <Link
              href="https://papi-reactive-dot.polkadot-nextjs.com"
              className="inline-flex"
            >
              <Button>
                <Eye className="w-4 h-4" /> View template
              </Button>
            </Link>
            <Link
              href="https://github.com/niklasp/polkadot-nextjs-starter/tree/papi"
              className="inline-flex"
            >
              <Button>
                <Github className="w-4 h-4" /> View on github
              </Button>
            </Link>
            <Link href={deployPapi} className="hidden sm:inline-flex">
              <Button>
                <Triangle className="w-4 h-4 fill-black" /> Deploy
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>dedot + typink</CardTitle>
            <CardDescription>
              <Link href="https://dedot.dev" className="underline">
                Dedot
              </Link>{" "}
              SDK with{" "}
              <Link href="https://docs.dedot.dev/typink" className="underline">
                Typink
              </Link>{" "}
              provider and hooks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-[16/9]">
              <Link href="https://dedot-typink.polkadot-nextjs.com">
                <Image
                  src="/polkadot-nextjs-starter-dedot-typink.png"
                  alt="typink template screenshot"
                  width={1000}
                  height={1000}
                />
              </Link>
            </div>
            <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Next.js 15 App Router + RSC</li>
              <li>Typink provider, fees, tx hooks</li>
              <li>Shadcn UI, Radix, Tailwind</li>
              <li>Multi-chain support</li>
            </ul>
          </CardContent>
          <CardFooter className="flex items-center gap-2 flex-wrap">
            <Link
              href="https://dedot-typink.polkadot-nextjs.com"
              className="inline-flex"
            >
              <Button>
                <Eye className="w-4 h-4" /> View template
              </Button>
            </Link>
            <Link
              href="https://github.com/niklasp/polkadot-nextjs-starter/tree/typink"
              className="inline-flex"
            >
              <Button>
                <Github className="w-4 h-4" /> View on github
              </Button>
            </Link>
            <Link href={deployTypink} className="hidden sm:inline-flex">
              <Button>
                <Triangle className="w-4 h-4 fill-black" /> Deploy
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
