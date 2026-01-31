import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface SidebarConfig {
  variant: "sidebar" | "floating" | "inset"
  collapsible: "offcanvas" | "icon" | "none"
  side: "left" | "right"
  collapsed: boolean
}

interface AppearanceConfig {
  radius: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
  theme: "light" | "dark" | "system"
}

interface AppConfig {
  sidebar: SidebarConfig
  appearance: AppearanceConfig
}

interface SettingState {
  config: AppConfig
  updateSidebarConfig: (config: Partial<SidebarConfig>) => void
  updateAppearanceConfig: (config: Partial<AppearanceConfig>) => void
  resetConfig: () => void
}

const defaultConfig: AppConfig = {
  sidebar: {
    variant: "sidebar",
    collapsible: "icon",
    side: "left",
    collapsed: false,
  },
  appearance: {
    radius: "md",
    theme: "system",
  },
}

export const useSettingStore = create<SettingState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      updateSidebarConfig: (config) =>
        set((state) => ({
          config: {
            ...state.config,
            sidebar: { ...state.config.sidebar, ...config },
          },
        })),
      updateAppearanceConfig: (config) =>
        set((state) => ({
          config: {
            ...state.config,
            appearance: { ...state.config.appearance, ...config },
          },
        })),
      resetConfig: () => set({ config: defaultConfig }),
    }),
    {
      name: "app-setting-storage", // localStorage 中的键名
      storage: createJSONStorage(() => localStorage), // 使用 localStorage 持久化
    }
  )
)

