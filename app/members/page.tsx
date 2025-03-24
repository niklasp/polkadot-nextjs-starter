import { verifySubscription } from "@/lib/data-access-layer";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { Identicon } from "@/components/account/identicon";
import { SubscriptionTimer } from "@/components/auth/subscription-timer";
import Link from "next/link";

export default async function MembersPage() {
  const session = await verifySubscription();
  console.log("session", session);
  if (!session) {
    redirect("/");
  }
  return (
    <main className="flex min-h-screen p-8 pb-20 flex-col gap-[32px] row-start-2 items-center justify-center relative">
      <h1 className="text-4xl font-bold">🔒 Protected Page</h1>
      <div className="flex items-center gap-2">
        <p>Welcome {session.userName}</p>
        <Identicon address={session.accountAddress} />
      </div>
      {session.subscriptionValidUntil ? (
        <div className="flex items-center gap-2 flex-col text-sm">
          <p>
            Thank you for your subscription ! Your subscription will expire in
          </p>
          <SubscriptionTimer
            validUntilTimestamp={session.subscriptionValidUntil}
            onExpire={logout}
          />
        </div>
      ) : (
        <p>No subscription</p>
      )}
      <em className="text-sm text-muted-foreground">
        You are successfully logged in and your session is securely stored in a
        secure browser cookie. Try refreshing the page or opening another
        browser tab.
      </em>
      <Button onClick={logout}>Logout</Button>
    </main>
  );
}
