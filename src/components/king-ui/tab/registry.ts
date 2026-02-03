import type { ComponentRegistry } from "./types";

// 组件注册表实例
let componentRegistry: ComponentRegistry = {} as ComponentRegistry;

/**
 * 注册 Tab 组件到注册表
 * @param type Tab 类型标识
 * @param component React 组件
 */
export const registerTabComponent = (
  type: string,
  component: React.ComponentType<any>
): void => {
  componentRegistry[type] = component;
};

/**
 * 获取注册的组件
 * @param type Tab 类型标识
 * @returns 对应的 React 组件或 undefined
 */
export const getRegisteredComponent = (type: string): React.ComponentType<any> | undefined => {
  return componentRegistry[type];
};

/**
 * 检查组件是否已注册
 * @param type Tab 类型标识
 * @returns boolean
 */
export const isComponentRegistered = (type: string): boolean => {
  return !!componentRegistry[type];
};

/**
 * 获取所有已注册的组件类型
 * @returns 已注册的类型数组
 */
export const getRegisteredTypes = (): string[] => {
  return Object.keys(componentRegistry);
};

/**
 * 批量注册组件
 * @param components 组件映射对象
 */
export const registerMultipleComponents = (
  components: Record<string, React.ComponentType<any>>
): void => {
  Object.entries(components).forEach(([type, component]) => {
    registerTabComponent(type, component);
  });
};

/**
 * 清空注册表
 */
export const clearRegistry = (): void => {
  componentRegistry = {} as ComponentRegistry;
};

// 默认导出注册表实例（用于直接访问）
export { componentRegistry };
