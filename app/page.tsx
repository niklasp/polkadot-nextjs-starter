import { fontUnbounded } from "@/fonts";
import { cn } from "@/lib/utils";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubscriptionForm from "@/components/auth/subscription-form";
export default async function Home() {
  return (
    <main className="flex min-h-screen p-8 pb-20 flex-col gap-[32px] row-start-2 items-center justify-center relative ">
      <h1
        className={cn(
          "mt-[30vh] text-6xl text-center bg-clip-text text-transparent bg-gradient-to-r from-foreground/70 via-foreground to-foreground/70",
          fontUnbounded.className
        )}
      >
        Polkadot Next.js Auth <br />+ Session Cookie
      </h1>
      <p>
        Securely authenticate users with wallet signatures and session cookies.
      </p>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Button asChild variant="link">
          <Link href="/protected">
            ↗ Go to protected page (requires signature)
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/members">
            ↗ Go to members page (requires subscription)
          </Link>
        </Button>
      </div>
      <LoginForm />

      <div className="flex flex-col gap-4 min-w-[320px] w-full max-w-[500px] items-center">
        <SubscriptionForm />
      </div>
    </main>
  );
}
