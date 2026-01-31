import { Outlet } from "react-router"
import { AppSidebar } from "./app-layout/site-sidebar/app-sidebar"
import { SiteHeader } from "./app-layout/site-header"
import { SiteFooter } from "./app-layout/site-footer"
import { useSidebarConfig } from "@/store/sidebar"


const LayoutDefault = () => {
  const { variant, collapsible, side } = useSidebarConfig();
  return (
    <>
      <div className="h-screen w-screen flex">
        <aside className="overflow-y-auto">
          <AppSidebar
            variant={variant}
            collapsible={collapsible}
            side={side}
          />
        </aside>
        <main className="flex-1 flex flex-col min-h-0">
          <SiteHeader />
          <div className="flex-1 overflow-y-auto p-4 pb-10 min-h-0">
            <Outlet />
          </div>
          <SiteFooter />
        </main>
      </div>
    </>
  )
}

export default LayoutDefault
