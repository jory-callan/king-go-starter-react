import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 使用 Vite 的 import.meta.glob 动态导入所有子目录下的 example.tsx 文件
const components = import.meta.glob("./*/example.tsx", { eager: true });

// 提取文件夹名称作为 Tab 标识符
const tabEntries = Object.entries(components) as Array<[string, { default: React.ComponentType }]>;

const DynamicTabsPage = () => {
  if (tabEntries.length === 0) {
    return (
      <div className=" w-full h-full container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>No Examples Found</CardTitle>
            <CardDescription>
              No example components were found in subdirectories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create folders with example.tsx files to populate the tabs.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 默认选择第一个 tab
  const defaultValue = tabEntries[0][0].split("/")[1]; // 获取第一个文件夹名

  return (
    <div className="w-full h-full container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Tabs Example</CardTitle>
          <CardDescription>
            Automatically generated tabs from subdirectory components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultValue} className="w-full h-full">
            <TabsList variant="line" >
              {tabEntries.map(([path, module], index) => {
                // 从路径中提取文件夹名称，并将首字母大写
                const folderName = path.split("/")[1];
                const capitalizedFolderName = folderName.charAt(0).toUpperCase() + folderName.slice(1);
                return (
                  <TabsTrigger key={index} value={folderName}>
                    {capitalizedFolderName}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {tabEntries.map(([path, module], index) => {
              const folderName = path.split("/")[1];
              const Component = module.default;
              return (
                <TabsContent key={index} value={folderName} className="space-y-4">
                  <Suspense fallback={<div>Loading {folderName}...</div>}>
                    <Component />
                  </Suspense>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicTabsPage;
