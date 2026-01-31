import React, { useState } from "react";
import { MonacoEditorComponent } from "@/components/ui/monaco-editor";

interface MonacoProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  title?: string
}

export default function MonacoPage({
  className,
  style,
  children,
  title
}: MonacoProps) {
  const [code, setCode] = useState<string>(`function helloWorld() {
  console.log("Hello, Monaco Editor!");
}

helloWorld();`);

  return (
    <div className={className} style={style} title={title}>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Monaco Editor 示例</h1>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">JavaScript 编辑器</h2>
          <div className="border rounded-lg overflow-hidden">
            <MonacoEditorComponent
              value={code}
              onChange={(value) => setCode(value || "")}
              language="javascript"
              height="400px"
              autoCompletion={true}
              bracketPairColorization={true}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">TypeScript 编辑器</h2>
          <div className="border rounded-lg overflow-hidden">
            <MonacoEditorComponent
              value={`interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John",
  age: 30
};`}
              language="typescript"
              height="300px"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">JSON 编辑器</h2>
          <div className="border rounded-lg overflow-hidden">
            <MonacoEditorComponent
              value={`{
  "name": "Monaco Editor",
  "version": "4.7.0",
  "features": [
    "syntax highlighting",
    "intelliSense",
    "code completion"
  ]
}`}
              language="json"
              height="300px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
