import React from "react"
import { Outlet } from "react-router"

// 定义 props 类型（可抽离为接口，更清晰）
interface LayoutProps {
  children?: React.ReactNode
  className?: string // 可选自定义 class
}

// 空白布局, 支持 children 和 outlet
const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={`layout-default ${className}`}>
      {children || <Outlet />}
    </div>
  )
}

export default Layout
