import { ModeToggle } from "@/components/mode-toggle"
import { Outlet } from "react-router"

const LayoutDefault = () => {
  return (
    <>
      <h1>LayoutDefault</h1>
      <ModeToggle></ModeToggle>
      <hr />
      <Outlet />
    </>
  )
}

export default LayoutDefault
