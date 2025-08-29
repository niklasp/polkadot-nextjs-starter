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
import { CopyButton } from "@/components/ui/copy-button";

export default async function Home() {
  const repoUrl = "https://github.com/niklasp/polkadot-nextjs-starter";
  const deployPapi = `https://vercel.com/new/clone?repository-url=${encodeURIComponent(`${repoUrl}/tree/papi`)}`;
  const deployTypink = `https://vercel.com/new/clone?repository-url=${encodeURIComponent(`${repoUrl}/tree/typink`)}`;
  const clonePapi = `git clone --branch papi ${repoUrl}.git && cd polkadot-nextjs-starter`;
  const cloneTypink = `git clone --branch typink ${repoUrl}.git && cd polkadot-nextjs-starter`;

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl mt-2">
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
          <CardContent className="flex flex-col gap-4 flex-1 justify-between">
            <div className="relative w-full aspect-[16/9] ">
              <Link href="https://papi-reactive-dot.polkadot-nextjs.com?_vercel_share=yQzTrBhxXxJAkNKqEpZ1jza6phuStQ1O">
                <Image
                  src="/polkadot-nextjs-starter.png"
                  alt="papi template screenshot"
                  width={1000}
                  height={800}
                />
              </Link>
            </div>
            <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Next.js 15 App Router + RSC</li>
              <li>Wallet integration with signers</li>
              <li>papi integration with reactive-dot hooks</li>
              <li>Shadcn UI, Radix, Tailwind</li>
            </ul>
            <div className="mt-2 rounded-md border bg-muted/20 p-2 text-xs font-mono flex items-center justify-between gap-2">
              <div className="truncate">
                <span className="opacity-70">$ </span>
                <span className="truncate">{clonePapi}</span>
              </div>
              <CopyButton value={clonePapi} />
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-2 flex-wrap">
            <Link
              href="https://papi-reactive-dot.polkadot-nextjs.com?_vercel_share=yQzTrBhxXxJAkNKqEpZ1jza6phuStQ1O"
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
              <Link href="https://dedot-typink.polkadot-nextjs.com?_vercel_share=Tp9LVl5G6C0Df0lU3tAQAum278zHP1kW">
                <Image
                  src="/polkadot-nextjs-starter-dedot-typink.png"
                  alt="typink template screenshot"
                  width={1000}
                  height={800}
                />
              </Link>
            </div>
            <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Next.js 15 App Router + RSC</li>
              <li>Typink provider, fees, tx hooks</li>
              <li>Shadcn UI, Radix, Tailwind</li>
              <li>Multi-chain support</li>
              <li>TxButton component</li>
              <li>TxNotification component</li>
            </ul>
            <div className="mt-2 rounded-md border bg-muted/20 p-2 text-xs font-mono flex items-center justify-between gap-2">
              <div className="truncate">
                <span className="opacity-70">$ </span>
                <span className="truncate">{cloneTypink}</span>
              </div>
              <CopyButton value={cloneTypink} />
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-2 flex-wrap">
            <Link
              href="https://dedot-typink.polkadot-nextjs.com?_vercel_share=Tp9LVl5G6C0Df0lU3tAQAum278zHP1kW"
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
