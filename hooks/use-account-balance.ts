"use client";

import { idle } from "@reactive-dot/core";
import { useLazyLoadQuery } from "@reactive-dot/react";
import { useSelectedAccount } from "@/providers/selected-account-provider";

export function useAccountBalance() {
  const { selectedAccount } = useSelectedAccount();

  const accountInfo = useLazyLoadQuery((builder) =>
    selectedAccount?.address
      ? builder.storage("System", "Account", [selectedAccount.address], {
          at: "best",
        })
      : undefined,
  );

  if (accountInfo === idle) {
    return;
  }

  return accountInfo?.data;
}
