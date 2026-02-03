import React from "react";
import { getRegisteredComponent } from "./registry";
import type { TabItem, TabComponentProps } from "./types";

export interface TabRendererProps {
  /**
   * Tab 数据
   */
  tab: TabItem;
  /**
   * 是否是激活状态
   */
  isActive: boolean;
  /**
   * 自定义包装器类名
   */
  wrapperClassName?: string;
  /**
   * 当组件未注册时的回退内容
   */
  fallback?: React.ReactNode;
}

export const TabRenderer: React.FC<TabRendererProps> = ({
  tab,
  isActive,
  wrapperClassName = "",
  fallback = (
    <div className="flex items-center justify-center h-full w-full text-muted-foreground">
      未知的 Tab 类型: {tab.type}
    </div>
  ),
}) => {
  const Component = getRegisteredComponent(tab.type);

  if (!Component) {
    return <div className={wrapperClassName}>{fallback}</div>;
  }

  // 为组件传递标准 props
  const componentProps: TabComponentProps = {
    tab,
    tabId: tab.id,
    isActive,
  };

  return (
    <div className={`h-full w-full ${wrapperClassName}`}>
      <Component {...componentProps} />
    </div>
  );
};
