import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockConnections, mockDatabases, mockTables, mockHistory, mockFavorites, mockPendingApprovals, type TableInfo, type PendingApprovalSql, type FavoriteSql } from "@/lib/mock-db-data";

interface PageProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  title?: string
}

export default function Page({
  className,
  style,
  children,
  title
}: PageProps) {
  // 面板宽度状态
  const [leftPanelWidth, setLeftPanelWidth] = useState<number>(250);
  const [rightPanelWidth, setRightPanelWidth] = useState<number>(300);

  // 拖拽状态
  const [dragging, setDragging] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 当前选中的表
  const [selectedTable, setSelectedTable] = useState<TableInfo | null>(null);
  // 当前选中的待审批项
  const [selectedApproval, setSelectedApproval] = useState<PendingApprovalSql | null>(null);

  // SQL编辑器内容
  const [sqlCode, setSqlCode] = useState<string>("SELECT * FROM users LIMIT 1000;");
  // 执行结果
  const [results, setResults] = useState<any[]>([]);

  // 处理拖拽开始
  const handleDragStart = (panel: string) => {
    setDragging(panel);
  };

  // 处理拖拽移动
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const xPosition = e.clientX - containerRect.left;

    if (dragging === "left") {
      // 最小宽度150px，最大宽度400px
      const newWidth = Math.max(150, Math.min(400, xPosition));
      setLeftPanelWidth(newWidth);
    } else if (dragging === "right") {
      // 计算右侧面板宽度（从右边到鼠标位置的距离）
      const rightWidth = Math.max(200, Math.min(500, containerRect.width - xPosition));
      setRightPanelWidth(rightWidth);
    }
  };

  // 处理拖拽结束
  const handleMouseUp = () => {
    setDragging(null);
  };

  // 执行SQL
  const executeSQL = () => {
    // 这里只是模拟执行，实际应该调用API
    console.log("Executing SQL:", sqlCode);
    // 添加到历史记录
    // TODO: 实际执行逻辑
  };

  return (
    <div
      ref={containerRef}
      className={`flex h-full w-full ${className || ""}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      title={title}
    >
      {/* 左侧面板 - 数据库树、历史记录、收藏、待审批 */}
      <div
        className="bg-background border-r flex flex-col"
        style={{ width: `${leftPanelWidth}px` }}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">数据库管理</h2>
        </div>

        <Tabs defaultValue="tree" orientation="vertical" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tree">数据库</TabsTrigger>
            <TabsTrigger value="history">历史</TabsTrigger>
            <TabsTrigger value="favorites">收藏</TabsTrigger>
            <TabsTrigger value="approvals">审批</TabsTrigger>
          </TabsList>

          {/* 数据库树 */}
          <TabsContent value="tree" className="flex-1 flex flex-col p-0 m-0">
            <div className="p-2">
              <Input placeholder="搜索数据库/表..." />
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2 space-y-2">
                {mockConnections.map(connection => (
                  <div key={connection.id} className="space-y-1">
                    <div className="font-medium text-sm">{connection.name}</div>
                    {mockDatabases
                      .filter(db => db.connectionId === connection.id)
                      .map(database => (
                        <div key={database.id} className="ml-2 space-y-1">
                          <div className="font-medium text-xs">{database.name}</div>
                          <div className="ml-2 space-y-1">
                            {mockTables
                              .filter(table => table.databaseId === database.id)
                              .map(table => (
                                <div
                                  key={table.id}
                                  className={`p-1 text-xs cursor-pointer hover:bg-accent rounded ${
                                    selectedTable?.id === table.id ? "bg-muted" : ""
                                  }`}
                                  onClick={() => {
                                    setSelectedTable(table);
                                    setSelectedApproval(null);
                                  }}
                                >
                                  {table.name}
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 历史记录 */}
          <TabsContent value="history" className="flex-1 flex flex-col p-0 m-0">
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-2">
                {mockHistory.map(history => (
                  <div
                    key={history.id}
                    className="p-2 border rounded text-xs cursor-pointer hover:bg-accent"
                    onClick={() => setSqlCode(history.sql)}
                  >
                    <div className="font-medium truncate">{history.sql.substring(0, 50)}...</div>
                    <div className="text-muted-foreground">
                      {new Date(history.executedAt).toLocaleString()} | {history.executionTime}ms
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 收藏SQL */}
          <TabsContent value="favorites" className="flex-1 flex flex-col p-0 m-0">
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-2">
                {mockFavorites.map(favorite => (
                  <div
                    key={favorite.id}
                    className="p-2 border rounded text-xs cursor-pointer hover:bg-accent"
                    onClick={() => setSqlCode(favorite.sql)}
                  >
                    <div className="font-medium">{favorite.name}</div>
                    <div className="truncate">{favorite.sql.substring(0, 60)}...</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 待审批SQL */}
          <TabsContent value="approvals" className="flex-1 flex flex-col p-0 m-0">
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-2">
                {mockPendingApprovals.map(approval => (
                  <div
                    key={approval.id}
                    className={`p-2 border rounded text-xs cursor-pointer hover:bg-accent ${
                      selectedApproval?.id === approval.id ? "bg-muted" : ""
                    }`}
                    onClick={() => {
                      setSelectedApproval(approval);
                      setSelectedTable(null);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{approval.title}</div>
                      <Badge variant={approval.priority === "high" || approval.priority === "urgent" ? "destructive" : "secondary"}>
                        {approval.priority}
                      </Badge>
                    </div>
                    <div className="truncate mt-1">{approval.sql.substring(0, 60)}...</div>
                    <div className="text-muted-foreground text-xs mt-1">
                      提交者: {approval.submitter} | {new Date(approval.submittedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* 左侧拖拽分割线 */}
      <div
        className={`w-1 bg-border cursor-col-resize hover:bg-primary transition-colors ${
          dragging === "left" ? "bg-primary" : ""
        }`}
        onMouseDown={() => handleDragStart("left")}
      ></div>

      {/* 中间主区域 - 查询窗口和结果 */}
      <div className="flex-1 flex flex-col bg-background">
        {/* 查询窗口 */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">SQL查询编辑器</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-2">
              <Button
                onClick={executeSQL}
                disabled={!sqlCode.trim()}
              >
                执行 (LIMIT 1000条)
              </Button>
              <Button variant="outline">格式化</Button>
              <Button variant="outline">保存查询</Button>
            </div>
            <div className="border rounded">
              <textarea
                value={sqlCode}
                onChange={(e) => setSqlCode(e.target.value)}
                className="w-full h-32 p-2 font-mono text-sm resize-none"
                placeholder="在此输入SQL查询..."
              />
            </div>
          </CardContent>
        </Card>

        {/* 结果区域 */}
        <div className="flex-1 flex flex-col">
          <div className="border-b px-4 py-2">
            <h3 className="text-sm font-medium">查询结果</h3>
          </div>
          <div className="flex-1 bg-white p-4 overflow-auto">
            <div className="text-center text-muted-foreground py-10">
              执行SQL后将在此显示结果
            </div>
          </div>
        </div>
      </div>

      {/* 右侧拖拽分割线 */}
      <div
        className={`w-1 bg-border cursor-col-resize hover:bg-primary transition-colors ${
          dragging === "right" ? "bg-primary" : ""
        }`}
        onMouseDown={() => handleDragStart("right")}
      ></div>

      {/* 右侧面板 - 表结构或审批详情 */}
      <div
        className="bg-background border-l flex flex-col"
        style={{ width: `${rightPanelWidth}px` }}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            {selectedTable ? selectedTable.name : selectedApproval ? selectedApproval.title : "详细信息"}
          </h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {selectedTable ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">表结构</h3>
                  <div className="space-y-2">
                    {selectedTable.columns.map((column, idx) => (
                      <div key={idx} className="p-2 border rounded text-xs">
                        <div className="font-medium">{column.name}</div>
                        <div className="text-muted-foreground">
                          {column.type} | {column.nullable ? "NULL" : "NOT NULL"}
                          {column.primaryKey && " | PK"}
                          {column.unique && " | UNIQUE"}
                        </div>
                        {column.description && (
                          <div className="text-xs mt-1">{column.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">索引信息</h3>
                  <div className="space-y-2">
                    {selectedTable.indexes.map((index, idx) => (
                      <div key={idx} className="p-2 border rounded text-xs">
                        <div className="font-medium">{index.name}</div>
                        <div className="text-muted-foreground">
                          {index.type} | {index.columns.join(", ")}
                          {index.unique && " | UNIQUE"}
                        </div>
                        {index.description && (
                          <div className="text-xs mt-1">{index.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : selectedApproval ? (
              <div className="space-y-4">
                <div>
                  <Label>SQL语句</Label>
                  <pre className="mt-1 p-2 bg-muted rounded text-xs whitespace-pre-wrap break-all">
                    {selectedApproval.sql}
                  </pre>
                </div>

                <div>
                  <Label>描述</Label>
                  <p className="mt-1 text-sm">{selectedApproval.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>提交者</Label>
                    <p className="mt-1 text-sm">{selectedApproval.submitter}</p>
                  </div>

                  <div>
                    <Label>提交时间</Label>
                    <p className="mt-1 text-sm">
                      {new Date(selectedApproval.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <Label>审批人</Label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedApproval.approvers.map((approver, idx) => (
                      <Badge key={idx} variant="secondary">{approver}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>状态</Label>
                  <Badge
                    variant={
                      selectedApproval.status === "approved" ? "default" :
                        selectedApproval.status === "rejected" ? "destructive" : "outline"
                    }
                    className="mt-1"
                  >
                    {selectedApproval.status === "pending" ? "待审批" :
                      selectedApproval.status === "approved" ? "已批准" : "已拒绝"}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-10">
                选择左侧的表或审批项以查看详情
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
