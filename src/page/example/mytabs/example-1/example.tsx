import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TabContainer,
  registerTabComponent,
  registerMultipleComponents
} from "@/components/king-ui/tab";
import { useTabStore } from "@/store/tabs";
import { TableView } from "@/components/king-ui/tab/examples/table-view";
import { QueryEditor } from "@/components/king-ui/tab/examples/query-editor";

// 注册组件到系统
const useRegisterComponents = () => {
  useEffect(() => {
    // 方式1: 单个注册
    registerTabComponent("table", TableView);
    registerTabComponent("query", QueryEditor);

    // 方式2: 批量注册（注释掉的方式）
    // registerMultipleComponents({
    //   "table": TableView,
    //   "query": QueryEditor
    // });
  }, []);
};

export default function Example1() {
  useRegisterComponents();
  const { openTab, closeAllTabs, tabs, activeTabId } = useTabStore();

  const handleOpenTableTab = () => {
    const tabIndex = tabs.filter(t => t.type === "table").length + 1;
    openTab({
      type: "table",
      title: `数据表 ${tabIndex}`,
      icon: "📊",
      metadata: {
        searchTerm: "",
        rowCount: 15,
        columns: ["ID", "姓名", "邮箱", "创建时间"],
        lastViewed: new Date().toISOString()
      },
    });
  };

  const handleOpenQueryTab = () => {
    const queryIndex = tabs.filter(t => t.type === "query").length + 1;
    openTab({
      type: "query",
      title: `查询 ${queryIndex}`,
      icon: "🔍",
      metadata: {
        queryText: "SELECT * FROM users WHERE active = 1;",
        executionTime: null,
        database: "production_db",
        lastExecuted: null
      },
    });
  };

  const handleOpenAdvancedTab = () => {
    openTab({
      type: "table",
      title: "高级配置表",
      icon: "⚙️",
      metadata: {
        searchTerm: "重要数据",
        rowCount: 30,
        filters: {
          status: "active",
          priority: "high"
        },
        sorting: {
          column: "created_at",
          direction: "desc"
        },
        customSettings: {
          autoRefresh: true,
          refreshInterval: 30000,
          notifications: true
        }
      },
    });
  };

  const handleTestMetadataOperations = () => {
    if (activeTabId) {
      // 这里可以测试 metadata 操作
      console.log("当前激活的 Tab ID:", activeTabId);
      const activeTab = tabs.find(t => t.id === activeTabId);
      console.log("当前 Tab 数据:", activeTab);
    }
  };

  return (
    <div className="h-500px flex flex-col p-6 bg-background">
      <Card className="mb-6 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl">🚀 动态 Tab 系统演示</CardTitle>
          <CardDescription className="text-base">
            基于 React 和 Zustand 的轻量级多类型动态 Tab 系统 - 完整功能展示
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Button
              onClick={handleOpenTableTab}
              className="h-12 text-base"
            >
              📊 新建数据表
            </Button>
            <Button
              onClick={handleOpenQueryTab}
              variant="secondary"
              className="h-12 text-base"
            >
              🔍 新建查询
            </Button>
            <Button
              onClick={handleOpenAdvancedTab}
              variant="outline"
              className="h-12 text-base"
            >
              ⚙️ 高级配置
            </Button>
            <Button
              onClick={closeAllTabs}
              variant="destructive"
              disabled={tabs.length === 0}
              className="h-12 text-base"
            >
              🗑️ 关闭全部
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-lg">📊 系统状态</h3>
              <div className="space-y-1 text-sm">
                <div>总 Tab 数: <span className="font-medium text-primary">{tabs.length}</span></div>
                <div>激活 Tab: <span className="font-medium text-primary">{activeTabId ? "1个" : "无"}</span></div>
                <div>表格 Tab: <span className="font-medium text-blue-500">{tabs.filter(t => t.type === "table").length}个</span></div>
                <div>查询 Tab: <span className="font-medium text-green-500">{tabs.filter(t => t.type === "query").length}个</span></div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-lg">✨ 核心特性</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> 多类型 Tab 支持</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> 状态保持 (keep-alive)</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> 自定义元数据</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> 组件注册机制</li>
              </ul>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-lg">🔧 技术栈</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center"><span className="mr-2">⚛️</span> React 18</div>
                <div className="flex items-center"><span className="mr-2"> Zustand</span> 状态管理</div>
                <div className="flex items-center"><span className="mr-2"> TailwindCSS</span> 样式</div>
                <div className="flex items-center"><span className="mr-2"> TypeScript</span> 类型安全</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <h3 className="font-semibold mb-3 text-lg">💡 使用说明</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium mb-2">📌 基本操作:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>点击按钮创建不同类型 Tab</li>
                  <li>点击 Tab 标题切换激活状态</li>
                  <li>点击 × 按钮关闭单个 Tab</li>
                  <li>组件状态在切换时自动保持</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">🎯 特色功能:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>每个 Tab 携带独立元数据</li>
                  <li>支持深度嵌套的 metadata 结构</li>
                  <li>通过 useTabMetadata Hook 操作状态</li>
                  <li>组件注册表便于扩展新类型</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="h-200 flex flex-col border rounded-xl shadow-lg bg-background">
        <TabContainer
          className="h-full flex flex-col"
          contentClassName="flex-1 bg-background"
          headerClassName="bg-muted/50 border-b flex-shrink-0"
          showHeader={true}
          emptyContent={
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
              <div className="text-6xl mb-4">👋</div>
              <h3 className="text-xl font-semibold mb-2">欢迎使用 Tab 系统</h3>
              <p className="text-center max-w-md mb-6">
                点击上方按钮创建新的 Tab，体验多类型动态标签页的强大功能。
                支持表格视图、查询编辑器等多种组件类型。
              </p>
              <div className="flex gap-3">
                <Button onClick={handleOpenTableTab}>
                  创建第一个表格 Tab
                </Button>
                <Button onClick={handleOpenQueryTab} variant="secondary">
                  创建第一个查询 Tab
                </Button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
