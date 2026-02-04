import React from "react"
import { ThemeProvider } from "./theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getCookie } from "@/lib/cookies"

export function ShadcnProvider({ children }: { children: React.ReactNode }) {
  const defaultOpen = getCookie("sidebar_state") !== "false"
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <SidebarProvider defaultOpen={defaultOpen}>
          {children}
          <Toaster position="top-center" />
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}
