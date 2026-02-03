import { useCallback } from "react";
import { useTabStore } from "@/store/tabs";
import type { TabMetadata } from "./types";

/**
 * 自定义 Hook 用于在 Tab 组件中访问和更新 metadata
 * @param tabId Tab ID
 * @returns 包含 metadata 读取和更新方法的对象
 */
export const useTabMetadata = (tabId: string) => {
  const { getTab, updateTabMetadata } = useTabStore();

  // 获取当前 Tab 的完整数据
  const tab = getTab(tabId);

  // 获取完整的 metadata 对象
  const metadata = tab?.metadata || {};

  // 获取特定 metadata 字段的值
  const getMetadataValue = useCallback(
    <T = any>(key: string, defaultValue?: T): T | undefined => {
      return metadata[key] ?? defaultValue;
    },
    [metadata]
  );

  // 设置单个 metadata 字段
  const setMetadataValue = useCallback(
    (key: string, value: any) => {
      updateTabMetadata(tabId, { [key]: value });
    },
    [tabId, updateTabMetadata]
  );

  // 批量更新多个 metadata 字段
  const updateMetadata = useCallback(
    (updates: Partial<TabMetadata>) => {
      updateTabMetadata(tabId, updates);
    },
    [tabId, updateTabMetadata]
  );

  // 删除特定 metadata 字段
  const removeMetadataValue = useCallback(
    (key: string) => {
      const newMetadata = { ...metadata };
      delete newMetadata[key];
      updateTabMetadata(tabId, newMetadata);
    },
    [tabId, metadata, updateTabMetadata]
  );

  // 重置 metadata 为初始值
  const resetMetadata = useCallback(
    (initialMetadata: TabMetadata = {}) => {
      updateTabMetadata(tabId, initialMetadata);
    },
    [tabId, updateTabMetadata]
  );

  return {
    // 当前 Tab 数据
    tab,
    // 完整 metadata 对象
    metadata,
    // 方法
    getMetadataValue,
    setMetadataValue,
    updateMetadata,
    removeMetadataValue,
    resetMetadata,
  };
};


/**
 * Hook 用于获取当前激活 Tab 的 metadata
 * @returns 与 useTabMetadata 相同的返回值
 */
export const useActiveTabMetadata = () => {
  const { activeTabId } = useTabStore();

  if (!activeTabId) {
    throw new Error("No active tab found");
  }

  return useTabMetadata(activeTabId);
};

/**
 * Hook 用于监听特定 metadata 字段的变化
 * @param tabId Tab ID
 * @param key metadata 字段名
 * @param callback 变化回调函数
 */
export const useWatchMetadata = (
  tabId: string,
  key: string,
  callback: (newValue: any, oldValue: any) => void
) => {
  const { metadata } = useTabMetadata(tabId);
  const currentValue = metadata[key];

  // 这里可以使用 useEffect 来监听变化
  // 但由于这是一个简单的实现，我们返回当前值供外部处理
  return {
    value: currentValue,
    // 提供更新方法
    setValue: (newValue: any) => {
      const oldValue = currentValue;
      // 调用回调
      callback(newValue, oldValue);
    },
  };
};
