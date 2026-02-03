import React from "react"
import { ThemeProvider } from "./theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { ScrollArea } from "./ui/scroll-area"

export function ShadcnProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ScrollArea className="h-screen w-screen overflow-hidden rounded-md border">
          {children}
        </ScrollArea>
        <Toaster position="top-center" />
      </ThemeProvider>
    </>
  )
}
