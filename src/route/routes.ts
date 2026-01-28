// routes.ts
import { lazy } from "react";
import type { AppRoutes } from "./types";
import { LazyElement } from "./utils";
import { createBrowserRouter } from "react-router";

// 页面组件
const Home = lazy(() => import("@/page/home/index.tsx"));
const Login = lazy(() => import("../page/login"));
const Dashboard = lazy(() => import("../page/dashboard"));

// 路由配置，必须扁平化声明，不要走树形结构
export const routesConfig: AppRoutes[] = [
  {
    path: "/login",
    element: LazyElement(() => import("../page/login")),
    meta: { layout:"LayoutDefault", title: "用户登录", whitePage: true }
  },
  {
    path: "/",
    element: LazyElement(() => import("../page/home")),
    meta: { layout:"LayoutDefault", title: "首页" }
  },
  {
    path: "/dashboard",
    element: LazyElement(() => import("../page/dashboard")),
    meta: { layout:"LayoutDefault", title: "仪表盘",needLogin: true, roles: ["admin"] }
  },
];
