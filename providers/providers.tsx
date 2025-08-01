"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ReactiveDotProvider } from "@reactive-dot/react"
import { ThemeProvider } from "./theme-provider"

interface SelectedAccountContext {
  selectedAccount: string | null
  setSelectedAccount: (account: string | null) => void
}

const SelectedAccountContext = createContext<SelectedAccountContext>({
  selectedAccount: null,
  setSelectedAccount: () => {},
})

const SELECTED_ACCOUNT_KEY = "polkadot:selected-account"

function SelectedAccountProvider({ children }: { children: React.ReactNode }) {
  const [selectedAccount, setSelectedAccountState] = useState<string | null>(null)

  // Load selected account from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SELECTED_ACCOUNT_KEY)
    if (stored) {
      setSelectedAccountState(stored)
    }
  }, [])

  const setSelectedAccount = (account: string | null) => {
    setSelectedAccountState(account)
    if (account) {
      localStorage.setItem(SELECTED_ACCOUNT_KEY, account)
    } else {
      localStorage.removeItem(SELECTED_ACCOUNT_KEY)
    }
  }

  return (
    <SelectedAccountContext.Provider
      value={{
        selectedAccount,
        setSelectedAccount,
      }}
    >
      {children}
    </SelectedAccountContext.Provider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <ReactiveDotProvider>
        <SelectedAccountProvider>{children}</SelectedAccountProvider>
      </ReactiveDotProvider>
    </ThemeProvider>
  )
}

export const useSelectedAccount = () => {
  const context = useContext(SelectedAccountContext)
  if (!context) {
    throw new Error("useSelectedAccount must be used within a SelectedAccountProvider")
  }
  return context
}
