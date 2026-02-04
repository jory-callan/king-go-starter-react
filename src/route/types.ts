import type React from "react";
import type { LoaderFunction } from "react-router";

// types/router.ts
export interface RouteMeta {
  layout?: string; // 页面布局
  title?: string; // 页面标题
  icon?: string; // 菜单图标
  sortNo?: number; // 排序号，数字越大越靠前
  needLogin?: boolean; // 是否需要登录
  whitePage?: boolean; // 白名单
  roles?: string[];
  permissionCode?: string[]; // 对应的权限码 (menu:xxx:xxx)
  description?: string; // 页面描述
  hiddenInMenu?: boolean; // 是否隐藏菜单
  openInNewTab?: boolean; // 新窗口打开
  group?: string; // 分组，用于菜单分组
}

export interface AppRoutes {
  path: string;
  label?: string;
  description?: string; // 页面描述
  element?: React.ReactNode | null; // 页面组件，二选一
  errorElement?: React.ReactNode | null; // 错误边界， 二选一
  Component?: React.ComponentType | null; // 页面组件，二选一
  ErrorBoundary?: React.ComponentType | null; // 错误边界， 二选一
  loader?: LoaderFunction;
  handle?: any;
  meta: RouteMeta;
  redirect?: string; // 重定向路径
}
