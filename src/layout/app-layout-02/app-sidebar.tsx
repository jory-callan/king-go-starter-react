"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart3,
  FolderKanban,
  Megaphone,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
} from "@/components/ui/sidebar"

// 模拟数据
const data = {
  user: {
    name: "管理员",
    email: "admin@example.com",
    avatar: "/avatars/default.jpg",
  },
  navMain: [
    {
      title: "仪表盘",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [
        {
          title: "概览",
          url: "/dashboard/overview",
        },
        {
          title: "分析",
          url: "/dashboard/analytics",
        },
        {
          title: "报表",
          url: "/dashboard/reports",
        },
      ],
    },
    {
      title: "用户管理",
      url: "/users",
      icon: Users,
      items: [
        {
          title: "用户列表",
          url: "/users/list",
        },
        {
          title: "角色管理",
          url: "/users/roles",
        },
        {
          title: "权限管理",
          url: "/users/permissions",
        },
      ],
    },
    {
      title: "项目管理",
      url: "/projects",
      icon: FolderKanban,
      items: [
        {
          title: "所有项目",
          url: "/projects/all",
        },
        {
          title: "我的项目",
          url: "/projects/my",
        },
        {
          title: "归档项目",
          url: "/projects/archived",
        },
      ],
    },
    {
      title: "内容管理",
      url: "/content",
      icon: FileText,
      items: [
        {
          title: "文章管理",
          url: "/content/articles",
        },
        {
          title: "分类管理",
          url: "/content/categories",
        },
        {
          title: "标签管理",
          url: "/content/tags",
        },
      ],
    },
    {
      title: "数据统计",
      url: "/statistics",
      icon: BarChart3,
      items: [
        {
          title: "访问统计",
          url: "/statistics/visits",
        },
        {
          title: "转化统计",
          url: "/statistics/conversion",
        },
        {
          title: "用户统计",
          url: "/statistics/users",
        },
      ],
    },
    {
      title: "公告管理",
      url: "/announcements",
      icon: Megaphone,
      items: [
        {
          title: "发布公告",
          url: "/announcements/create",
        },
        {
          title: "公告列表",
          url: "/announcements/list",
        },
      ],
    },
    {
      title: "系统设置",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "基本设置",
          url: "/settings/basic",
        },
        {
          title: "安全设置",
          url: "/settings/security",
        },
        {
          title: "系统日志",
          url: "/settings/logs",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <LayoutDashboard className="size-4" />
          </div>
          <span className="font-semibold text-sm">King Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
