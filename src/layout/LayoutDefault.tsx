import { Outlet } from "react-router"
import { AppSidebar } from "./app-layout/site-sidebar/app-sidebar"
import { SiteHeader } from "./app-layout/site-header"
import { SiteFooter } from "./app-layout/site-footer"
import { useSidebarConfig } from "@/store/sidebar"

const LayoutDefault = () => {
  const { variant, side } = useSidebarConfig();
  return (
    <>
      <div className="h-screen w-screen flex">
        <aside>
          <AppSidebar
            variant={variant}
            collapsible="icon"
            side={side}
          />
        </aside>
        <main className="flex-1 flex flex-col min-h-0 min-w-0">
          <SiteHeader />
          <div className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </div>
          <SiteFooter />
        </main>
      </div>
    </>
  )
}

export default LayoutDefault
