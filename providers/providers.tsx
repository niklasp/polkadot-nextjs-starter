"use client"

import { ReactiveDotProvider } from "@reactive-dot/react"
import { ThemeProvider } from "./theme-provider"
import { SelectedAccountProvider } from "./selected-account-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <ReactiveDotProvider>
        <SelectedAccountProvider>{children}</SelectedAccountProvider>
      </ReactiveDotProvider>
    </ThemeProvider>
  )
}
