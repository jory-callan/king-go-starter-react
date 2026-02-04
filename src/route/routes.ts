import type { AppRoutes } from "./types";
import { LazyElement } from "./utils";

// 路由配置，必须扁平化声明，不要走树形结构
export const routesConfig: AppRoutes[] = [
  // 必备路由
  {
    path: "/login",
    element: LazyElement(() => import("@/page/login")),
    meta: { layout:"none", title: "用户登录", whitePage: true, hiddenInMenu: true }
  },
  {
    path: "/error/401",
    element: LazyElement(() => import("@/page/error/401/page")),
    meta: { layout:"LayoutBlank", title: "错误401", whitePage: true, hiddenInMenu: true }
  },
  {
    path: "/error/404",
    element: LazyElement(() => import("@/page/error/404/page")),
    meta: { layout:"LayoutBlank", title: "错误404", whitePage: true, hiddenInMenu: true }
  },
  {
    path: "/error/500",
    element: LazyElement(() => import("@/page/error/500/page")),
    meta: { layout:"LayoutBlank", title: "错误500", whitePage: true, hiddenInMenu: true }
  },
  {
    path: "/error/503",
    element: LazyElement(() => import("@/page/error/503/page")),
    meta: { layout:"LayoutBlank", title: "错误503", whitePage: true, hiddenInMenu: true }
  },
  // 处理 404 的关键配置：path 为 "*"
  {
    path: "*",
    element: LazyElement(() => import("@/page/error/404/page")),
    meta: { layout:"LayoutBlank", title: "错误404", whitePage: true, hiddenInMenu: true }
  },
  // 业务路由
  {
    path: "/",
    element: LazyElement(() => import("@/page/home")),
    meta: { layout:"LayoutDefault", title: "首页", icon: "home", hiddenInMenu: true }
  },
  {
    path: "/landing",
    element: LazyElement(() => import("@/page/landing/page.tsx")),
    meta: { layout:"", title: "介绍页", whitePage: true, icon: "presentation", hiddenInMenu: true }
  },
  {
    path: "/dashboard",
    element: LazyElement(() => import("@/page/dashboard")),
    meta: { layout:"LayoutDefault", title: "仪表盘",needLogin: true, roles: ["admin"], group: "dashboard", icon: "layout-dashboard" }
  },
  {
    path: "/dashboard-2",
    element: LazyElement(() => import("@/page/dashboard-2")),
    meta: { layout:"LayoutDefault", title: "仪表盘2",needLogin: true, roles: ["admin"], group: "dashboard", icon: "gauge" }
  },
  {
    path: "/dashboard-3",
    element: LazyElement(() => import("@/page/dashboard-3")),
    meta: { layout:"LayoutDefault", title: "仪表盘3",needLogin: true, roles: ["admin"], group: "dashboard", icon: "gauge" }
  },
  {
    path: "/system/setting",
    element: LazyElement(() => import("@/page/system/setting")),
    meta: { layout:"LayoutDefault", title: "设置",needLogin: true, roles: ["admin"], group: "system", icon: "setting" }
  },
  {
    path: "/example",
    element: LazyElement(() => import("@/page/example/page.tsx")),
    meta: { layout:"LayoutDefault", title: "示例",needLogin: true, group: "example", icon: "view" }
  },
  {
    path: "/example/vtable",
    element: LazyElement(() => import("@/page/example/vtable")),
    meta: { layout:"LayoutDefault", title: "虚拟表格", needLogin: true, group: "example", icon: "table" }
  },
  {
    path: "/example/monaco",
    element: LazyElement(() => import("@/page/example/monaco/page.tsx")),
    meta: { layout:"LayoutDefault", title: "Monaco", needLogin: true, group: "example", icon: "code" }
  },
  {
    path: "/example/shadcnui",
    element: LazyElement(() => import("@/page/example/shadcnui/page")),
    meta: { layout:"LayoutDefault", title: "ShadcnUI", needLogin: true, group: "example", icon: "ui" }
  },
  {
    path: "/example/mytabs",
    element: LazyElement(() => import("@/page/example/mytabs/page.tsx")),
    meta: { layout:"LayoutDefault", title: "MyTabs", needLogin: true, group: "example", icon: "tabs" }
  },
  {
    path: "/database",
    element: LazyElement(() => import("@/page/database/page.tsx")),
    meta: { layout:"LayoutDefault", title: "数据库", needLogin: true, group: "database", icon: "database" }
  },

];
