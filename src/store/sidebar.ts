import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarConfigState {
  variant: "sidebar" | "floating" | "inset";
  collapsible: "offcanvas" | "icon" | "none";
  side: "left" | "right";
  expanded: boolean;
  setVariant: (variant: "sidebar" | "floating" | "inset") => void;
  setCollapsible: (collapsible: "offcanvas" | "icon" | "none") => void;
  setSide: (side: "left" | "right") => void;
  toggleExpanded: () => void
}

export const useSidebarConfig = create<SidebarConfigState>()(
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
      name: "sidebar-config-storage", // localStorage 中的键名
      storage: createJSONStorage(() => localStorage),
    }
  )
);
