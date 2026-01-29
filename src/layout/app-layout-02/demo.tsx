import { AppLayout } from "."
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AppLayoutDemo() {
  return (
    <AppLayout
      title="仪表盘概览"
      breadcrumbs={[
        { label: "首页", href: "/" },
        { label: "仪表盘", href: "/dashboard" },
        { label: "概览" },
      ]}
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                总收入
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% 较上月
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                用户数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% 较上月
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                销售额
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% 较上月
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                活跃用户
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 较上小时
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>欢迎使用 King Admin</CardTitle>
            <CardDescription>
              这是一个现代化的管理后台布局，使用 shadcn/ui 构建。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">布局特点</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>响应式设计，支持移动端和桌面端</li>
                  <li>可折叠侧边栏，点击图标即可折叠</li>
                  <li>优雅的动画效果</li>
                  <li>基于 shadcn/ui 组件库</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <Button>了解更多</Button>
                <Button variant="outline">查看文档</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
