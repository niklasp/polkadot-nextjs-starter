"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { WalletAccount } from "@reactive-dot/core/wallets.js";
import { useAccounts } from "@reactive-dot/react";

interface SelectedAccountContext {
  selectedAccount: WalletAccount | null;
  setSelectedAccount: (account: WalletAccount | null) => void;
}

const SelectedAccountContext = createContext<SelectedAccountContext>({
  selectedAccount: null,
  setSelectedAccount: () => {},
});

const SELECTED_ACCOUNT_KEY = "polkadot:selected-account";

export function SelectedAccountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedAccount, setSelectedAccountState] =
    useState<WalletAccount | null>(null);

  const accounts = useAccounts();

  // Load selected account from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SELECTED_ACCOUNT_KEY);
    if (stored) {
      setSelectedAccountState(
        accounts.find((account) => account.address === stored) || null,
      );
    }
  }, [accounts]);

  const setSelectedAccount = (account: WalletAccount | null) => {
    setSelectedAccountState(account);
    if (account) {
      localStorage.setItem(SELECTED_ACCOUNT_KEY, account.address);
    } else {
      localStorage.removeItem(SELECTED_ACCOUNT_KEY);
    }
  };

  return (
    <SelectedAccountContext.Provider
      value={{
        selectedAccount,
        setSelectedAccount,
      }}
    >
      {children}
    </SelectedAccountContext.Provider>
  );
}

export const useSelectedAccount = () => {
  const context = useContext(SelectedAccountContext);
  if (!context) {
    throw new Error(
      "useSelectedAccount must be used within a SelectedAccountProvider",
    );
  }
  return context;
};
