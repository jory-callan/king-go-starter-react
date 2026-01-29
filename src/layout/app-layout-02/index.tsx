import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./header"
import { AppFooter } from "./footer"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export function AppLayout({
  children,
  title,
  breadcrumbs
}: {
  children: React.ReactNode
  title?: string
  breadcrumbs?: { label: string; href?: string }[]
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <AppHeader title={title} breadcrumbs={breadcrumbs} />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </div>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}
