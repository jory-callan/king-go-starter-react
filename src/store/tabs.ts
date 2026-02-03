import { create } from "zustand";
import type {
  TabItem,
  TabMetadata,
  OpenTabParams,
  TabSystemConfig
} from "@/components/king-ui/tab/types";

interface TabState {
  // Tab 列表
  tabs: TabItem[];
  // 当前激活的 Tab ID
  activeTabId: string | null;
  // 系统配置
  config: TabSystemConfig;
}

interface TabActions {
  // 打开 Tab
  openTab: (params: OpenTabParams) => string;
  // 关闭 Tab
  closeTab: (tabId: string) => void;
  // 激活 Tab
  activateTab: (tabId: string) => void;
  // 更新 Tab 元数据
  updateTabMetadata: (tabId: string, metadata: Partial<TabMetadata>) => void;
  // 获取 Tab 信息
  getTab: (tabId: string) => TabItem | undefined;
  // 关闭其他 Tab
  closeOtherTabs: (tabId: string) => void;
  // 关闭所有 Tab
  closeAllTabs: () => void;
  // 更新系统配置
  updateConfig: (config: Partial<TabSystemConfig>) => void;
  // 重置状态
  reset: () => void;
}

type TabStore = TabState & TabActions;

// 默认配置
const DEFAULT_CONFIG: TabSystemConfig = {
  maxTabs: 20,
  allowDuplicate: true,
  defaultActiveTabId: undefined,
};

// 生成 Tab ID
const generateTabId = (): string => `tab_${Math.random().toString(36).substring(2, 10)}`;

// 检查是否已存在相同类型的 Tab（基于标题和类型）
const findExistingTab = (tabs: TabItem[], params: OpenTabParams): TabItem | undefined => {
  return tabs.find(tab =>
    tab.type === params.type &&
    tab.title === params.title
  );
};

const useTabStore = create<TabStore>((set, get) => ({
  // 初始状态
  tabs: [],
  activeTabId: null,
  config: DEFAULT_CONFIG,

  // 打开 Tab
  openTab: (params: OpenTabParams): string => {
    const { tabs, config } = get();

    // 检查最大 Tab 数量限制
    if (config.maxTabs && tabs.length >= config.maxTabs) {
      console.warn(`Maximum tabs limit (${config.maxTabs}) reached`);
      return "";
    }

    // 检查重复 Tab
    if (!config.allowDuplicate) {
      const existingTab = findExistingTab(tabs, params);
      if (existingTab) {
        // 如果不允许重复且找到相同 Tab，则激活它
        get().activateTab(existingTab.id);
        return existingTab.id;
      }
    }

    // 创建新 Tab
    const newTabId = generateTabId();
    const now = Date.now();

    const newTab: TabItem = {
      id: newTabId,
      type: params.type,
      title: params.title,
      icon: params.icon,
      metadata: params.metadata || {},
      createdAt: now,
      lastActiveAt: now,
    };

    set(state => ({
      tabs: [...state.tabs, newTab],
      activeTabId: params.activate !== false ? newTabId : state.activeTabId,
    }));

    return newTabId;
  },

  // 关闭 Tab
  closeTab: (tabId: string) => {
    set(state => {
      const newTabs = state.tabs.filter(tab => tab.id !== tabId);

      // 如果关闭的是当前激活的 Tab，需要重新设置激活 Tab
      let newActiveTabId = state.activeTabId;
      if (state.activeTabId === tabId) {
        if (newTabs.length > 0) {
          // 优先选择相邻的 Tab
          const closedTabIndex = state.tabs.findIndex(tab => tab.id === tabId);
          if (closedTabIndex > 0) {
            newActiveTabId = newTabs[Math.min(closedTabIndex - 1, newTabs.length - 1)].id;
          } else {
            newActiveTabId = newTabs[0].id;
          }
        } else {
          newActiveTabId = null;
        }
      }

      return {
        tabs: newTabs,
        activeTabId: newActiveTabId,
      };
    });
  },

  // 激活 Tab
  activateTab: (tabId: string) => {
    const tabExists = get().tabs.some(tab => tab.id === tabId);
    if (tabExists) {
      set({
        activeTabId: tabId,
      });
    }
  },

  // 更新 Tab 元数据
  updateTabMetadata: (tabId: string, metadata: Partial<TabMetadata>) => {
    set(state => ({
      tabs: state.tabs.map(tab =>
        tab.id === tabId
          ? { ...tab, metadata: { ...tab.metadata, ...metadata }, lastActiveAt: Date.now() }
          : tab
      ),
    }));
  },

  // 获取 Tab 信息
  getTab: (tabId: string) => {
    return get().tabs.find(tab => tab.id === tabId);
  },

  // 关闭其他 Tab
  closeOtherTabs: (tabId: string) => {
    set(state => ({
      tabs: state.tabs.filter(tab => tab.id === tabId),
      activeTabId: tabId,
    }));
  },

  // 关闭所有 Tab
  closeAllTabs: () => {
    set({
      tabs: [],
      activeTabId: null,
    });
  },

  // 更新系统配置
  updateConfig: (newConfig: Partial<TabSystemConfig>) => {
    set(state => ({
      config: { ...state.config, ...newConfig },
    }));
  },

  // 重置状态
  reset: () => {
    set({
      tabs: [],
      activeTabId: null,
      config: DEFAULT_CONFIG,
    });
  },
}));

export { useTabStore };
export type { TabItem, TabMetadata, OpenTabParams, TabSystemConfig };

