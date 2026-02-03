import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabContainer, registerTabComponent } from "@/components/king-ui/tab";
import { useTabStore } from "@/store/tabs";
import { TableView } from "@/components/king-ui/tab/examples/table-view";
import { QueryEditor } from "@/components/king-ui/tab/examples/query-editor";

// 注册组件到系统
const useRegisterComponents = () => {
  useEffect(() => {
    registerTabComponent("table", TableView);
    registerTabComponent("query", QueryEditor);
  }, []);
};

export const TabDemoPage: React.FC = () => {
  useRegisterComponents();
  const { openTab, closeAllTabs, tabs } = useTabStore();

  const handleOpenTableTab = () => {
    openTab({
      type: "table",
      title: `Table ${tabs.filter(t => t.type === "table").length + 1}`,
      icon: "📊",
      metadata: {
        searchTerm: "",
        rowCount: 10,
      },
    });
  };

  const handleOpenQueryTab = () => {
    openTab({
      type: "query",
      title: `Query ${tabs.filter(t => t.type === "query").length + 1}`,
      icon: "🔍",
      metadata: {
        queryText: "SELECT * FROM users;",
        executionTime: null,
      },
    });
  };

  const handleOpenCustomTab = () => {
    openTab({
      type: "table",
      title: "Custom Metadata Tab",
      icon: "⭐",
      metadata: {
        searchTerm: "custom search",
        rowCount: 25,
        customField: "This is custom metadata",
        nested: {
          level1: {
            level2: "deep nested value"
          }
        }
      },
    });
  };

  return (
    <div className="h-screen flex flex-col p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tab 系统演示</CardTitle>
          <CardDescription>
            展示基于 React 和 Zustand 的轻量级多类型动态 Tab 系统
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleOpenTableTab}>
              打开表格 Tab
            </Button>
            <Button onClick={handleOpenQueryTab} variant="secondary">
              打开查询 Tab
            </Button>
            <Button onClick={handleOpenCustomTab} variant="outline">
              打开自定义元数据 Tab
            </Button>
            <Button
              onClick={closeAllTabs}
              variant="destructive"
              disabled={tabs.length === 0}
            >
              关闭所有 Tab
            </Button>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <div>当前 Tab 数量: {tabs.length}</div>
            <div>功能特性:</div>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>支持多种 Tab 类型（表格、查询编辑器）</li>
              <li>Tab 切换时保持组件状态（keep-alive）</li>
              <li>每个 Tab 可携带自定义元数据</li>
              <li>通过组件注册表轻松扩展新类型</li>
              <li>提供便捷的 metadata 操作 Hook</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 border rounded-lg overflow-hidden">
        <TabContainer
          className="h-full"
          contentClassName="bg-background"
          headerClassName="bg-muted/50"
        />
      </div>
    </div>
  );
};
