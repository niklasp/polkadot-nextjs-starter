"use client";

import { useLazyLoadQuery } from "@reactive-dot/react";
import { useSelectedAccount } from "@/providers/selected-account-provider";

export type AccountBalance = {
  free: bigint;
  reserved: bigint;
  frozen: bigint;
  flags: bigint;
  lastUpdated?: Date;
};

export function useAccountBalance() {
  const { selectedAccount } = useSelectedAccount();

  const accountInfo = useLazyLoadQuery((builder) =>
    selectedAccount?.address
      ? builder.storage("System", "Account", [selectedAccount.address], {
          at: "best",
        })
      : null,
  );

  // Transform the account info to match our expected format
  if (!accountInfo || !selectedAccount) {
    return null;
  }

  return {
    free: accountInfo.data.free,
    reserved: accountInfo.data.reserved,
    frozen: accountInfo.data.frozen,
    flags: accountInfo.data.flags,
    lastUpdated: new Date(),
  };
}
