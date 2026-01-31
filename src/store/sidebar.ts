import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarConfigState {
  variant: "sidebar" | "floating" | "inset";
  collapsible: "offcanvas" | "icon" | "none";
  side: "left" | "right";
  setVariant: (variant: "sidebar" | "floating" | "inset") => void;
  setCollapsible: (collapsible: "offcanvas" | "icon" | "none") => void;
  setSide: (side: "left" | "right") => void;
}

export const useSidebarConfig = create<SidebarConfigState>()(
  persist(
    (set) => ({
      variant: "sidebar",
      collapsible: "icon",
      side: "left",
      setVariant: (variant) => set({ variant }),
      setCollapsible: (collapsible) => set({ collapsible }),
      setSide: (side) => set({ side }),
    }),
    {
      name: "sidebar-config-storage", // localStorage 中的键名
    }
  )
);
