import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarConfigState {
  /** 侧边栏配置 */
  variant: "sidebar" | "floating" | "inset";
  /** 侧边栏可折叠方式 */
  collapsible: "offcanvas" | "icon" | "none";
  /** 侧边栏位置 */
  side: "left" | "right";
  /** 侧边栏是否展开 */
  expanded: boolean;
  /** 设置侧边栏可折叠方式 */
  setVariant: (_variant: "sidebar" | "floating" | "inset") => void;
  /** 设置侧边栏位置 */
  setSide: (_side: "left" | "right") => void;
  /** 设置侧边栏可折叠方式 */
  setCollapsible: (_collapsible: "offcanvas" | "icon" | "none") => void;
  /** 切换侧边栏展开状态 */
  toggleExpanded: () => void
}

export const useSidebarStore = create<SidebarConfigState>()(
  persist(
    (set) => ({
      variant: "sidebar",
      collapsible: "icon",
      side: "left",
      expanded: false,
      setVariant: (variant) => set({ variant }),
      setCollapsible: (collapsible) => set({ collapsible }),
      setSide: (side) => set({ side }),
      toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
    }),
    {
      name: "sidebar-storage", // localStorage 中的键名
      storage: createJSONStorage(() => localStorage),
    }
  )
);
