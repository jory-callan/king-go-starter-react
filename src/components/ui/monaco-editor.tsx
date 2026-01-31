import React, { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import { useTheme } from '../theme-provider';

// 动态导入 Monaco Editor 以避免 SSR 问题
const MonacoEditorLazy = lazy(() => import('@monaco-editor/react'));

interface MonacoEditorProps {
  /**
   * 编辑器的内容
   */
  value?: string;
  
  /**
   * 内容变化回调函数
   */
  onChange?: (value: string | undefined) => void;
  
  /**
   * 语言类型，默认为 'javascript'
   */
  language?: string;
  
  /**
   * 编辑器高度，默认为 '300px'
   */
  height?: string;
  
  /**
   * 编辑器宽度，默认为 '100%'
   */
  width?: string;

  /**
   * 是否只读
   */
  readOnly?: boolean;
  
  /**
   * 自动完成选项
   */
  autoCompletion?: boolean;
  
  /**
   * 括号自动闭合
   */
  bracketPairColorization?: boolean;
  
  /**
   * 编辑器配置项
   */
  options?: any;
  
  /**
   * 类名
   */
  className?: string;
}

const MonacoEditorComponent: React.FC<MonacoEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  height = '300px',
  width = '100%',
  readOnly = false,
  autoCompletion = true,
  bracketPairColorization = true,
  options = {},
  className = ''
}) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [vscodeTheme, setVscodeTheme] = useState('vs-dark');
  const { theme, setTheme } = useTheme()
  // 把 theme 转为 vscode 的theme
  useEffect(() => {
    setVscodeTheme(theme === 'dark' ? 'vs-dark' : 'light')
  }, [theme])
  const handleEditorDidMount = useCallback(() => {
    setIsEditorReady(true);
  }, []);

  // 合并默认选项和自定义选项
  const mergedOptions = {
    automaticLayout: true,
    minimap: { enabled: true },
    fontSize: 14,
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    tabSize: 2,
    readOnly: readOnly,
    quickSuggestions: autoCompletion,
    suggestOnTriggerCharacters: autoCompletion,
    acceptSuggestionOnCommitCharacter: autoCompletion,
    acceptSuggestionOnEnter: autoCompletion ? 'on' : 'off',
    bracketPairColorization: { enabled: bracketPairColorization },
    ...options
  };

  const LoadingComponent = () => (
    <div className="flex items-center justify-center h-full w-full">
      Loading editor...
    </div>
  );

  return (
    <div className={`rounded-md border ${className}`} style={{ width, height }}>
      <Suspense fallback={<LoadingComponent />}>
        <MonacoEditorLazy
          height={height}
          language={language}
          value={value}
          theme={vscodeTheme}
          onChange={onChange}
          onMount={handleEditorDidMount}
          options={mergedOptions}
        />
      </Suspense>
    </div>
  );
};

export { MonacoEditorComponent };