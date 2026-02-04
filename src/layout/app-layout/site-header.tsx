"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mine/mode-toggle"
import { getAppUrl } from "@/lib/utils"
// const SITE_HEADER_HEIGHT = "3rem"
export function SiteHeader() {
  return (
    <>
      <header className="flex shrink-0 items-center gap-2 border-b ease-linear">
        <div className="flex w-full justify-center items-center gap-1 px-4 py-3 lg:gap-2 lg:px-6">
          <SidebarTrigger size="icon-lg" className="h-6 w-6" />
          <Separator
            orientation="vertical"
            className="mx-2 h-8"
          />
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
              <a
                href={getAppUrl("/landing")}
                rel="noopener noreferrer" // for security
                target="_blank"
                className="dark:text-foreground"
              >
                Landing Page
              </a>
            </Button>
            <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
              <a
                href="https://github.com/jory-callan/king-go-starter-react"
                rel="noopener noreferrer" // for security
                target="_blank"
                className="dark:text-foreground"
              >
                GitHub
              </a>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  )
}
