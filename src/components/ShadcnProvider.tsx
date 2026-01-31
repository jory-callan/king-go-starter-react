import React from "react"
import { ThemeProvider } from "./theme-provider"
import { Toaster } from "@/components/ui/sonner"

export function ShadcnProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {children}
        <Toaster position="top-center" />
      </ThemeProvider>
    </>
  )
}
