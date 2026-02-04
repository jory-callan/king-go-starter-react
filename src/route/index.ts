import { createBrowserRouter, type RouteObject } from "react-router";
import type { AppRoutes } from "./types";
import { globalLoader, LazyElement } from "./utils";
import { routesConfig } from "./routes";

// layout 映射表
const LayoutMap: Record<string, React.ReactNode> = {
  LayoutDefault: LazyElement(() => import("@/layout/LayoutDefault")),
  LayoutBlank: LazyElement(() => import("@/layout/LayoutBlank")),
};

// 将 routesConfig 转换为扁平的路由配置，第一层包含一个Layout，Component里面是页面组件和loader
function transformRoutes(routes: AppRoutes[]): RouteObject[] {
  return routes.map((route) => {
    const { element, meta, ...rest } = route;
    const layoutStr = meta.layout || "LayoutDefault";
    const resultRoute: RouteObject = {
      ...rest,
      element: LayoutMap[layoutStr],
      loader: globalLoader(meta),
      children: [{ ...rest, element }]
    };
    // @ts-expect-error 不允许出现 children
    if (route.children != undefined) {
      throw new Error("请注意 routes 必须是扁平的, 因此 children 不应该存在");
    }
    return resultRoute;
  });
}
const finalRoutes = transformRoutes(routesConfig);

export const router = createBrowserRouter(finalRoutes);
