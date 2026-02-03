import React from "react";
import { useTabStore } from "@/store/tabs";
import { TabRenderer } from "./tab-renderer";
import { cn } from "@/lib/utils";

export interface TabContainerProps {
  /**
   * 容器类名
   */
  className?: string;
  /**
   * 内容区域类名
   */
  contentClassName?: string;
  /**
   * 是否显示标签页头部
   */
  showHeader?: boolean;
  /**
   * 头部类名
   */
  headerClassName?: string;
  /**
   * 当没有 Tab 时显示的内容
   */
  emptyContent?: React.ReactNode;
  /**
   * 自定义 Tab 头部渲染函数
   */
  renderTabHeader?: (tab: any, isActive: boolean, onClose: () => void) => React.ReactNode;
}

export const TabContainer: React.FC<TabContainerProps> = ({
  className = "",
  contentClassName = "",
  showHeader = true,
  headerClassName = "",
  emptyContent = (
    <div className="flex items-center justify-center h-full text-muted-foreground">
      暂无打开的标签页
    </div>
  ),
  renderTabHeader,
}) => {
  const { tabs, activeTabId, closeTab, activateTab } = useTabStore();

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    closeTab(tabId);
  };

  const handleActivateTab = (tabId: string) => {
    activateTab(tabId);
  };

  if (tabs.length === 0) {
    return (
      <div className={cn("h-full w-full flex flex-col", className)}>
        {showHeader && (
          <div className={cn("border-b bg-background", headerClassName)} />
        )}
        <div className="flex-1">{emptyContent}</div>
      </div>
    );
  }

  return (
    <div className={cn("h-full w-full flex flex-col", className)}>
      <div>tab: {tabs.map((tab) => tab).join(", ")}</div>
      {/* Tab 头部 */}
      {showHeader && (
        <div className={cn("border-b bg-background flex items-center", headerClassName)}>
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={cn(
                  "flex items-center px-4 py-2 border-r cursor-pointer transition-colors min-w-30",
                  "hover:bg-muted/50",
                  activeTabId === tab.id
                    ? "bg-background border-b-2 border-b-primary text-foreground"
                    : "text-muted-foreground border-b-2 border-b-transparent"
                )}
                onClick={() => handleActivateTab(tab.id)}
              >
                {renderTabHeader ? (
                  renderTabHeader(
                    tab,
                    activeTabId === tab.id,
                    () => handleCloseTab(tab.id, {} as React.MouseEvent)
                  )
                ) : (
                  <>
                    {tab.icon && (
                      <span className="mr-2 text-sm">
                        {typeof tab.icon === "string" ? tab.icon : "📄"}
                      </span>
                    )}
                    <span className="truncate flex-1 text-sm font-medium">
                      {tab.title}
                    </span>
                    <button
                      className="ml-2 text-muted-foreground hover:text-foreground rounded-sm p-0.5"
                      onClick={(e) => handleCloseTab(tab.id, e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 内容区域 */}
      <div className={cn("flex-1 relative overflow-hidden", contentClassName)}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "absolute inset-0 w-full h-full overflow-auto",
              activeTabId === tab.id ? "block" : "hidden"
            )}
          >
            <TabRenderer tab={tab} isActive={activeTabId === tab.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
