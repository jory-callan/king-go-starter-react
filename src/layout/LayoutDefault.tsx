import { Outlet } from "react-router"
import { AppSidebar } from "./app-layout/app-sidebar"

const LayoutDefault = () => {
  return (
    <>
      <AppSidebar></AppSidebar>
      <Outlet />
    </>
  )
}

export default LayoutDefault
