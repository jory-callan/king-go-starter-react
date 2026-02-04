import React from "react"
import { ThemeProvider } from "../theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getCookie } from "@/lib/cookies"
import { useSidebarStore } from "@/store/sidebar"

export function ShadcnProvider({ children }: { children: React.ReactNode }) {
  const defaultOpen = getCookie("sidebar_state") !== "false"
  const { expanded, toggleExpanded } = useSidebarStore()

  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <SidebarProvider
          // defaultOpen={defaultOpen}
          defaultOpen={expanded}
          open={expanded}
          onOpenChange={toggleExpanded}
        >
          {children}
          <Toaster position="top-center" />
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}
