import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// @ts-expect-error 这个已经定义过了，可以直接使用
console.log("lastBuildTime: ", __APP_INFO__.lastBuildTime)
