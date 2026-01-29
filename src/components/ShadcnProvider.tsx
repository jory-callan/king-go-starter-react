import React from "react"
import { ThemeProvider } from "./theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "./ui/sidebar"

export function ShadcnProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster position="top-center" />
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}
