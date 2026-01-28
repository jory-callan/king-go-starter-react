import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist','dist*','node_modules','**/components/ui/*']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules:{
      //es
      '@typescript-eslint/no-explicit-any': "off",
      "@typescript-eslint/consistent-type-imports": "off",

      // react
      'react-refresh/only-export-components': 'off',

      // --- 基础规则 ---
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-var': 'error', // 禁止使用 var
      'prefer-const': 'error', // 优先使用 const
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],

      // --- 代码风格 ---
      // 'semi': ['error', 'never'], // 不使用分号
      // 'quotes': ['error', 'single'], // 单引号
      'quotes': ['error'], // 双引号
      // 'comma-dangle': ['error', 'always-multiline'], // 多行结构末尾加逗号
      'no-multi-spaces': 'error', // 禁止多个空格
      'space-in-parens': ['error', 'never'], // 括号内不留空格
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',   // function() {}
          named: 'never',       // function name() {}
          asyncArrow: 'always', // async () => {}
        },
      ],
      'keyword-spacing': ['error', { before: true, after: true }], // if (cond) { ... }
      'space-infix-ops': 'error', // a + b
      'object-curly-spacing': ['error', 'always'], // { a: 1 }
      'array-bracket-spacing': ['error', 'never'], // [1, 2, 3]
      'arrow-spacing': ['error', { before: true, after: true }], // => 空格
      'no-trailing-spaces': 'error', // 禁止行尾空格
      'eol-last': ['error', 'always'], // 文件末尾换行
      // 基础缩进：2 个空格
      'indent': ['error', 2],
    }
  },
])
