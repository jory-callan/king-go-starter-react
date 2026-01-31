// routes.ts
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
    meta: { layout:"LayoutDefault", title: "错误401", whitePage: true, hiddenInMenu: true }
  },
  {
    path: "/error/404",
    element: LazyElement(() => import("@/page/error/404/page")),
    meta: { layout:"LayoutDefault", title: "错误404", whitePage: true, hiddenInMenu: true }
  },
  {
    path: "/error/500",
    element: LazyElement(() => import("@/page/error/500/page")),
    meta: { layout:"LayoutDefault", title: "错误500", whitePage: true, hiddenInMenu: true }
  },
  {
    path: "/error/503",
    element: LazyElement(() => import("@/page/error/503/page")),
    meta: { layout:"LayoutDefault", title: "错误503", whitePage: true, hiddenInMenu: true }
  },
  // 业务路由
  {
    path: "/",
    element: LazyElement(() => import("@/page/home")),
    meta: { layout:"LayoutDefault", title: "首页", hiddenInMenu: true }
  },
  {
    path: "/landing",
    element: LazyElement(() => import("@/page/landing/page.tsx")),
    meta: { layout:"", title: "介绍页", whitePage: true, hiddenInMenu: true }
  },
  {
    path: "/dashboard",
    element: LazyElement(() => import("@/page/dashboard")),
    meta: { layout:"LayoutDefault", title: "仪表盘",needLogin: true, roles: ["admin"], group: "dashboard" }
  },
  {
    path: "/dashboard-2",
    element: LazyElement(() => import("@/page/dashboard-2")),
    meta: { layout:"LayoutDefault", title: "仪表盘2",needLogin: true, roles: ["admin"], group: "dashboard" }
  },
  {
    path: "/system/setting",
    element: LazyElement(() => import("@/page/system/setting")),
    meta: { layout:"LayoutDefault", title: "设置",needLogin: true, roles: ["admin"], group: "system" }
  },
  {
    path: "/example",
    element: LazyElement(() => import("@/page/example/page.tsx")),
    meta: { layout:"LayoutDefault", title: "示例",needLogin: true, group: "example" }
  },
  {
    path: "/example/vtable",
    element: LazyElement(() => import("@/page/example/vtable")),
    meta: { layout:"LayoutDefault", title: "虚拟表格", needLogin: true, group: "example" }
  },
  {
    path: "/database",
    element: LazyElement(() => import("@/page/database/page.tsx")),
    meta: { layout:"LayoutDefault", title: "数据库", needLogin: true, group: "database" }
  },
];
