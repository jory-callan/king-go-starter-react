import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTabMetadata } from "../use-tab-metadata";
import type { TabComponentProps } from "../types";

export const QueryEditor: React.FC<TabComponentProps> = ({ tab, tabId, isActive }) => {
  const {
    getMetadataValue,
    setMetadataValue,
    updateMetadata,
  } = useTabMetadata(tabId);

  // 本地状态
  const [queryText, setQueryText] = useState("");
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  // 从 metadata 恢复状态
  useEffect(() => {
    if (isActive) {
      const savedQuery = getMetadataValue("queryText", "");
      const savedTime = getMetadataValue("executionTime", null);
      // 使用 setTimeout 避免同步 setState 警告
      setTimeout(() => {
        setQueryText(savedQuery as string);
        setExecutionTime(savedTime as number | null);
      }, 0);
    }
  }, [isActive, getMetadataValue]);

  // 保存状态到 metadata
  const saveState = () => {
    updateMetadata({
      queryText,
      executionTime,
      lastSaved: Date.now(),
    });
  };

  // 模拟查询执行
  const executeQuery = () => {
    const startTime = Date.now();
    // 模拟异步执行
    setTimeout(() => {
      const endTime = Date.now();
      const execTime = endTime - startTime;
      setExecutionTime(execTime);
      setMetadataValue("executionTime", execTime);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Query Editor - {tab.title}</h3>
          <div className="flex gap-2">
            <Button onClick={executeQuery} variant="default" size="sm">
              执行查询
            </Button>
            <Button onClick={saveState} variant="outline" size="sm">
              保存状态
            </Button>
          </div>
        </div>

        {/* 状态显示 */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Query Length: {queryText.length} characters</div>
          <div>
            Execution Time: {executionTime ? `${executionTime}ms` : "Not executed"}
          </div>
          <div>
            Last Saved: {
              getMetadataValue("lastSaved")
                ? new Date(getMetadataValue("lastSaved") as number).toLocaleTimeString()
                : "Never"
            }
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">
            SQL Query
          </label>
          <Textarea
            placeholder="Enter your SQL query here..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            className="h-full min-h-50 font-mono text-sm"
          />
        </div>

        <div className="border rounded-md p-4 bg-muted/10">
          <h4 className="font-medium mb-2">Query Results</h4>
          <div className="text-muted-foreground text-sm">
            {executionTime ? (
              <div>
                <div>✅ Query executed successfully!</div>
                <div className="mt-1">Returned 0 rows in {executionTime}ms</div>
                <div className="mt-2 text-xs">
                  SELECT * FROM example_table WHERE condition = 'value'
                </div>
              </div>
            ) : (
              <div>💡 Click "Execute Query" to run your SQL</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
