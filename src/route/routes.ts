// routes.ts
import type { AppRoutes } from "./types";
import { LazyElement } from "./utils";

// 路由配置，必须扁平化声明，不要走树形结构
export const routesConfig: AppRoutes[] = [
  {
    path: "/login",
    element: LazyElement(() => import("@/page/login")),
    meta: { layout:"LayoutDefault", title: "用户登录", whitePage: true }
  },
  {
    path: "/",
    element: LazyElement(() => import("@/page/home")),
    meta: { layout:"LayoutDefault", title: "首页" }
  },
  {
    path: "/dashboard",
    element: LazyElement(() => import("@/page/dashboard")),
    meta: { layout:"LayoutDefault", title: "仪表盘",needLogin: true, roles: ["admin"] }
  },
  {
    path: "/dashboard-2",
    element: LazyElement(() => import("@/page/dashboard-2")),
    meta: { layout:"LayoutDefault", title: "仪表盘",needLogin: true, roles: ["admin"] }
  },
  {
    path: "/system/setting",
    element: LazyElement(() => import("@/page/system/setting")),
    meta: { layout:"LayoutDefault", title: "设置",needLogin: true, roles: ["admin"] }
  },
  {
    path:"/vtable",
    element: LazyElement(() => import("@/page/vtable")),
    meta: { layout:"LayoutDefault", title: "虚拟表格", needLogin: true }
  }
];
