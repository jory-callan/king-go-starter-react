import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configuration and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-muted rounded">
            <span>Enable notifications</span>
            <div className="relative inline-block w-12 h-6">
              <input type="checkbox" className="sr-only" id="toggle1" defaultChecked />
              <label htmlFor="toggle1" className="block w-12 h-6 bg-blue-500 rounded-full"></label>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted rounded">
            <span>Dark mode</span>
            <div className="relative inline-block w-12 h-6">
              <input type="checkbox" className="sr-only" id="toggle2" />
              <label htmlFor="toggle2" className="block w-12 h-6 bg-gray-400 rounded-full"></label>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted rounded">
            <span>Auto-update</span>
            <div className="relative inline-block w-12 h-6">
              <input type="checkbox" className="sr-only" id="toggle3" defaultChecked />
              <label htmlFor="toggle3" className="block w-12 h-6 bg-blue-500 rounded-full"></label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p>Settings saved: Never</p>
      </CardFooter>
    </Card>
  );
}

// 可选导出描述信息
export const description = "Configuration and preferences";
