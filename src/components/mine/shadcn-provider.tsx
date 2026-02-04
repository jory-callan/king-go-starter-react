import React from "react"
import { ThemeProvider } from "../theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "@/components/ui/sidebar"
// import { getCookie } from "@/lib/cookies"
import { useSidebarStore } from "@/store/sidebar"

export function ShadcnProvider({ children }: { children: React.ReactNode }) {
  // 源码采用 cookie 存储 sidebar 状态
  // const defaultOpen = getCookie("sidebar_state") !== "false"
  // 不再使用 cookie 改用 store 存储状态
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
