import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.accountAddress) {
    redirect("/?error=Not authorized");
  }

  return {
    isAuth: true,
    userName: session.userName,
    accountAddress: session.accountAddress,
    subscriptionValidUntil: session.subscriptionValidUntil,
  };
});

export const verifySubscription = cache(async () => {
  const session = await verifySession();
  if (
    !session.subscriptionValidUntil ||
    session.subscriptionValidUntil < Date.now()
  ) {
    redirect("/subscribe?error=Please subscribe to the service");
  }

  return session;
});
