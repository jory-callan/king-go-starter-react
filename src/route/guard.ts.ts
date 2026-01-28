// guard.ts
import type { RouteMeta } from "./types";
import { redirect } from "react-router";

// 定义 handler 的返回类型，方便后续使用
export interface RouterLoader {
  meta: RouteMeta;
  loader: () => Promise<null>;
}

// 生成统一 Handler 的工厂函数
// React Router 7 的 loader 可以是一个 async 函数，非常适合做服务端/客户端跳转
export const createGlobalLoader = (meta: RouteMeta): RouterLoader => {
  // 直接返回一个对象给 handle，但这只是数据。
  // 如果你想在这里做“统一拦截”，通常推荐用 loader。
  // 既然你想“集中化处理路由拦截”，我们可以把 loader 的逻辑也封装在这里返回
  return {
    meta,
    // loader 是执行顺序：路由匹配 -> loader执行 -> 组件渲染
    // 所以在这里做副作用（改标题）和阻断（鉴权）是最完美的
    loader: async () => {
      // 1. 统一设置标题
      if (meta.title) {
        document.title = meta.title;
      }

      // 2. 统一拦截逻辑
      const isProtected = !meta.whitePage && meta.needLogin !== false;

      if (isProtected) {
        const token = localStorage.getItem("token");
        if (!token) {
          const currentPath = new URL(window.location.href).pathname;
          throw redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
        }
      }

      // 3. 甚至可以在这里做权限预校验、数据预加载等增强操作
      // if (meta.roles) { ... }

      return null; // 验证通过，允许渲染组件
    }
  };
};
