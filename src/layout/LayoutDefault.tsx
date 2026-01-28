import { Outlet } from "react-router"

const LayoutDefault = () => {
  return (
    <>
      <h1>LayoutDefault</h1>
      <hr />
      <Outlet />
    </>
  )
}

export default LayoutDefault
