import { Copyright } from "lucide-react"

export function AppFooter() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 py-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Copyright className="size-4" />
          <span>2024 King Admin. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground">隐私政策</a>
          <a href="#" className="hover:text-foreground">服务条款</a>
          <a href="#" className="hover:text-foreground">帮助中心</a>
        </div>
      </div>
    </footer>
  )
}
