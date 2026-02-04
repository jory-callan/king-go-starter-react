"use client"

import * as React from "react"
import { Link } from "react-router"
import { Logo } from "@/components/mine/logo"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// 导入路由配置
import { routesConfig } from "@/route/routes"

// 从路由配置中提取导航组
const getNavGroups = () => {
  // 过滤出需要在菜单中显示的路由（未设置 hiddenInMenu 或 hiddenInMenu 为 false）
  const visibleRoutes = routesConfig.filter(
    route => route.meta && !route.meta.hiddenInMenu
  );

  // 按组对路由进行分类
  const groupedRoutes: Record<string, typeof visibleRoutes> = {};

  visibleRoutes.forEach(route => {
    const group = route.meta?.group || "other"; // 默认分组为 other
    if (!groupedRoutes[group]) {
      groupedRoutes[group] = [];
    }
    groupedRoutes[group].push(route);
  });

  // 构建导航组数据
  const navGroups = Object.entries(groupedRoutes).map(([groupName, routes]) => {
    // 获取该组的路由信息
    return {
      label: groupName.charAt(0).toUpperCase() + groupName.slice(1), // 首字母大写
      items: routes.map(route => {
        // 优先从 meta.icon 获取图标，或者根据分组名字确定图标
        const icon = route.meta?.icon || groupName;
        return {
          title: route.meta?.title || route.path,
          url: route.path,
          icon, // 类型转换以匹配 NavMain 组件的期望类型
        };
      }),
    };
  });

  return navGroups;
};

// 添加静态导航组数据
const staticNavGroups = [
  {
    label: "Static Group",
    items: [
      { title: "Static Item 1", url: "/static/1" },
      { title: "Static Item 2", url: "/static/2" },
    ],
  },
];

const data = {
  user: {
    name: "KingStarter",
    email: "kingstarter@example.com",
    avatar: "",
  },
  navGroups: [...getNavGroups(), ...staticNavGroups],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Logo size={24} className="text-current" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">KingStarter</span>
                  <span className="truncate text-xs">react v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
