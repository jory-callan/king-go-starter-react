import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTabMetadata } from "../use-tab-metadata";
import type { TabComponentProps } from "../types";

export const TableView: React.FC<TabComponentProps> = ({ tab, tabId, isActive }) => {
  const {
    getMetadataValue,
    setMetadataValue,
    updateMetadata,
  } = useTabMetadata(tabId);

  // 本地状态
  const [searchTerm, setSearchTerm] = useState("");
  const [rowCount, setRowCount] = useState(10);

  // 从 metadata 恢复状态
  useEffect(() => {
    if (isActive) {
      const savedSearch = getMetadataValue("searchTerm", "");
      const savedCount = getMetadataValue("rowCount", 10);
      // 使用 setTimeout 避免同步 setState 警告
      setTimeout(() => {
        setSearchTerm(savedSearch as string);
        setRowCount(savedCount as number);
      }, 0);
    }
  }, [isActive, getMetadataValue]);

  // 保存状态到 metadata
  const saveState = () => {
    updateMetadata({
      searchTerm,
      rowCount,
      lastSaved: Date.now(),
    });
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-4 space-y-3">
        <h3 className="text-lg font-semibold">Table View - {tab.title}</h3>

        <div className="flex gap-2 items-center">
          <Input
            placeholder="搜索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Input
            type="number"
            placeholder="行数"
            value={rowCount}
            onChange={(e) => setRowCount(Number(e.target.value))}
            className="max-w-20"
          />
          <Button onClick={saveState} variant="outline" size="sm">
            保存状态
          </Button>
        </div>

        {/* 状态显示 */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Search Term: {searchTerm || "Empty"}</div>
          <div>Row Count: {rowCount}</div>
          <div>
            Last Saved: {
              getMetadataValue("lastSaved")
                ? new Date(getMetadataValue("lastSaved") as number).toLocaleTimeString()
                : "Never"
            }
          </div>
        </div>
      </div>

      <div className="flex-1 border rounded-md overflow-auto">
        <div className="p-4">
          <div className="text-muted-foreground mb-2">
            这是一个表格视图示例组件
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: rowCount }).map((_, i) => (
              <div
                key={i}
                className="p-2 border rounded text-center bg-muted/20"
              >
                Row {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

