import type { ComponentType } from "react";
import { lazy, Suspense } from "react";
import type { RouteMeta } from "./types"; // 确保你的 AppRoutes 包含 meta 和 loader
import { redirect } from "react-router";

const isLogin = true

// 1. 优化后的懒加载封装
// 注意：这里只负责加载，不负责渲染 JSX。渲染交给 Router 配置。
export function lazyLoad(importFn: () => Promise<{ default: ComponentType<any> }>) {
  return lazy(importFn);
};

// 允许传入自定义的 fallback UI
export function LazyElement(
  importFn: () => Promise<{ default: ComponentType<any> }>,
  fallback: React.ReactNode = "Loading..."
) {
  const LazyComp = lazy(importFn);
  return (
    <Suspense fallback={fallback}>
      <LazyComp />
    </Suspense>
  );
}

export const globalLoader = (meta: RouteMeta) => {
  return async ({ request }: { request: Request }) => {
    // 设置页面标题 (副作用)
    if (meta.title) {
      document.title = meta.title;
    }

    // 权限判断逻辑
    // 只有显式标记 whitePage 为 true 才放行，其他默认拦截
    const isProtected = meta.whitePage !== true;

    if (!isProtected) {
      console.log(">>> Page is not protected, allowing access");
      return null;
    }

    console.log(">>> Page is protected, checking authentication");
    // 检查是否登录
    if (!isLogin) {
      // 未登录：获取当前请求的 URL 用于回跳
      const url = new URL(request.url);
      const pathname = url.pathname + url.search;
      // 抛出 redirect 是 React Router Loader 中跳转的唯一正确方式
      throw redirect(`/login?redirect=${encodeURIComponent(pathname)}`);
    }

    // // 角色权限判断 (可选增强)
    // if (meta.roles && meta.roles.length > 0) {
    //   // 假设你有获取用户角色的方法
    //   const userRole = localStorage.getItem("userRole");
    //   if (userRole && !meta.roles.includes(userRole)) {
    //     // 角色不匹配，跳转到 403 或无权限页
    //     throw redirect("/403");
    //   }
    // }
  };
};
