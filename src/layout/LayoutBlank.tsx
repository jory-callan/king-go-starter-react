import React from "react"
import { Outlet } from "react-router"

// 定义 props 类型（可抽离为接口，更清晰）
interface LayoutProps {
  children?: React.ReactNode
  title?: string // 可选标题
  className?: string // 可选自定义 class
}

const Layout: React.FC<LayoutProps> = ({ children, title, className }) => {
  return (
    <div className={`layout-default ${className}`}>
      {title && <h1>{title}</h1>}
      {children}
      <hr />
      <Outlet />
    </div>
  )
}

export default Layout
