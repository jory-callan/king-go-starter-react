// src/env.d.ts 或 src/vite-env.d.ts
declare const __APP_INFO__: {
  pkg: {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    name: string;
    version: string;
  };
  lastBuildTime: string;
};
