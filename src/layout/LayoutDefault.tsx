import { Outlet } from "react-router"
import { AppSidebar } from "./app-layout/site-sidebar/app-sidebar"
import { SiteHeader } from "./app-layout/site-header"
import { SiteFooter } from "./app-layout/site-footer"

const LayoutDefault = () => {
  return (
    <>
      <aside>
        <AppSidebar collapsible="icon" />
      </aside>
      <main className="flex flex-col flex-1">
        <SiteHeader />
        <div className="flex-1 overflow-y-auto p-4 pb-10">
          <Outlet />
        </div>
        <SiteFooter />
      </main>
    </>
  )
}

export default LayoutDefault
