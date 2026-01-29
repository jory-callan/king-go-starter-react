import { Moon, Sun, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    const currentTheme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(currentTheme);
  }

  return (
    <Button variant="outline" onClick={toggleTheme}>
      <p className={`
          scale-150 transition-all duration-700 ease-in-out
          ${theme === "system" ? "rotate-90" : ""}
          ${theme === "light" ? "rotate-270" : ""}
          ${theme === "dark" ? "-rotate-90" : ""}
        `}>
        {theme === "system" ? <Settings /> : theme === "light" ? <Sun /> : <Moon />}
      </p>
    </Button>
  )
}
