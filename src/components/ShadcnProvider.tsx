import React from "react"
import { ThemeProvider } from "./theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "./ui/sidebar"

export function ShadcnProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <SidebarProvider>
          {children}
        </SidebarProvider>
        <Toaster position="top-center" />
      </ThemeProvider>
    </>
  )
}
