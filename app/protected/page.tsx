import { verifySession } from "@/lib/data-access-layer";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { Identicon } from "@/components/account/identicon";
import Link from "next/link";
export default async function ProtectedPage() {
  const session = await verifySession();
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
      <em className="text-sm text-muted-foreground">
        You are successfully logged in and your session is securely stored in a
        secure browser cookie. Try refreshing the page or opening another
        browser tab.
      </em>
      <div className="flex flex-col md:flex-row gap-4">
        <Button asChild variant="outline">
          <Link href="/members">Go to members page</Link>
        </Button>
        <Button onClick={logout}>Logout</Button>
      </div>
    </main>
  );
}
