import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from "vite"

import pkg from "./package.json";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  lastBuildTime: new Date().toLocaleString(),
  pkg: { dependencies, devDependencies, name, version },
};


// https://vite.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const IsProd = mode === "production";
  return defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_PORT) || 5000,
      open: false,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(new RegExp("^/api"), ""),
          // https is require secure=false
          ...(/^https:\/\//.test(env.VITE_API_URL) ? { secure: false } : {}),
        },
      },
    },
    build: {
      outDir: IsProd ? "dist" : `dist-${mode}`,
      sourcemap: IsProd ? false : true, // 生产环境必须禁用sourcemap
    },
  })
}
