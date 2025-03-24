"use server";

import { createSession, deleteSession } from "@/lib/session";
import { getTransactionsFromAddress } from "@/lib/get-transactions";
import { SignupFormSchema, FormState } from "@/schema/login";
import { signatureVerify, cryptoWaitReady } from "@polkadot/util-crypto";
import { redirect } from "next/navigation";
import { calculateSubscriptionLength } from "@/lib/calculate-subscription-length";
import { ErrorSubscriptionExpired } from "@/lib/errors";

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  console.log("received formData", formData);

  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    signer: formData.get("signer"),
    signature: formData.get("signature"),
    signedMessage: JSON.parse(formData.get("signedMessage") as string),
    userName: formData.get("userName"),
  });

  console.log(
    validatedFields.data,
    validatedFields.success,
    validatedFields?.error?.flatten().fieldErrors
  );

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log("returning errors");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { signer, signature, userName } = validatedFields.data;

  // 2. Verify signature

  // First, ensure WASM crypto is ready
  await cryptoWaitReady();

  const verifyResult = signatureVerify(
    formData.get("signedMessage") as string,
    signature,
    signer
  );

  if (!verifyResult.isValid) {
    return {
      errors: {
        signature: ["Invalid signature"],
      },
    };
  }

  // Here you can add your own logic to verify the user,
  // e.g. check if the user has transferred a certain amount of funds
  // or has a certain role.

  const transactions = await getTransactionsFromAddress(signer);
  console.log("transactions", transactions);

  const subscriptionValidUntil = calculateSubscriptionLength(transactions);

  // 4. create user Session (JWT cookie)
  await createSession(signer, userName, subscriptionValidUntil);

  // 5. redirect to some protected page
  redirect("/protected");
}

export async function logout() {
  deleteSession();
  redirect("/");
}
