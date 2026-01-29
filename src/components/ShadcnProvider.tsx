import React from "react"
import { ThemeProvider } from "./theme-provider"

export function ShadcnProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </>
  )
}
