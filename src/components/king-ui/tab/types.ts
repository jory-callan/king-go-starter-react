/**
 * Tab 系统核心类型定义
 */

// Tab 基础类型枚举
export type TabType = "table" | "query" | string;

// Tab 元数据类型 - 开放对象结构
export interface TabMetadata {
  [key: string]: any;
}

// 单个 Tab 项的数据结构
export interface TabItem {
  /** Tab 唯一标识符 */
  id: string;
  /** Tab 类型标识 */
  type: TabType;
  /** Tab 显示标题 */
  title: string;
  /** Tab 图标（可选） */
  icon?: string;
  /** Tab 自定义元数据 */
  metadata: TabMetadata;
  /** 创建时间戳 */
  createdAt: number;
  /** 最后活跃时间戳 */
  lastActiveAt: number;
}

// 组件注册表类型
export type ComponentRegistry = Record<TabType, React.ComponentType<TabComponentProps>>;

// Tab 组件 Props 接口
export interface TabComponentProps {
  /** 当前 Tab 的完整数据 */
  tab: TabItem;
  /** Tab ID */
  tabId: string;
  /** 是否是激活状态 */
  isActive: boolean;
}

// Tab 操作参数接口
export interface OpenTabParams {
  /** Tab 类型 */
  type: TabType;
  /** Tab 标题 */
  title: string;
  /** Tab 图标（可选） */
  icon?: string;
  /** 初始化元数据 */
  metadata?: TabMetadata;
  /** 是否激活新打开的 Tab */
  activate?: boolean;
}

// Tab 系统配置接口
export interface TabSystemConfig {
  /** 最大 Tab 数量限制 */
  maxTabs?: number;
  /** 是否允许重复 Tab */
  allowDuplicate?: boolean;
  /** 默认激活的 Tab ID */
  defaultActiveTabId?: string;
}
