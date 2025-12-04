# XXX 科技有限公司 TypeScript 编码规范（2025 版）—— 大厂同款，可直接落地

## 生效范围

所有前端项目（React / Vue3 / Node.js / 小程序）新代码 100% TS，老项目 1 年内完成迁移

## 核心原则（五条铁律，违反直接 PR 打回）

1. 禁止任何形式的 any、as any、@ts-ignore、@ts-nocheck
2. tsconfig.json 必须 strict 全开（见模板）
3. 类型覆盖率 ≥ 95%（CI 自动校验）
4. 所有第三方库必须有类型（无 @types 自己写 .d.ts）
5. 能用 interface 必须用 interface（详见下表）

## type vs interface 终极决策表（背下来，面试+代码审查必杀）

- | 场景 | 强制使用 | 示例 |
- | -------------------------------------------- | --------- | ------------------------------------------------------ |
- | 对象、Props、DTO、Config | interface | interface UserProps { } |
- | React 组件 Props | interface | interface ButtonProps { } |
- | class implements | interface | class A implements UserInfo { } |
- | 声明合并 / 扩展第三方库（express、react 等） | interface | interface Request { user?: User } |
- | 联合类型、元组、原始类型别名 | type | type ID = string \| number |
- | 工具类型、映射类型、条件类型、infer | type | `type DeepPartial<T> = ...` |
- | 函数重载（复杂情况） | type | type Fn = { (a: string): string; (a: number): number } |

金句：**“先问自己能不能用 interface，能用就用，不能用才用 type”**

## 完整 tsconfig.json（直接替换，大厂标配）

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },

    /* 严格模式全开 - 强制执行 */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src", "typings", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## ESLint + Prettier 配置（可选）

```javascript
// .eslintrc.cjs
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: { project: "./tsconfig.json" },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "no-console": "warn",
  },
};
```

## 配套模板文件

### typings/global.d.ts

```typescript
declare global {
  interface Window {
    __DEV__: boolean;
  }
}
export {};
```

### src/types/index.d.ts

```typescript
// 公司统一工具类型
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
```

## PPT 宣讲大纲（15 页）

1. 标题页：2025 TypeScript 编码规范发布
2. 为什么必须用 TS？（运行时错误下降 93%）
3. 五条铁律（背下来）
4. type vs interface 决策树（流程图）
5. 大厂真实案例：字节/阿里/腾讯怎么写的
6. tsconfig 严格模式全开详解
7. 禁止 React.FC 的原因（官方已废弃）
8. 20 个最佳实践代码示例
9. ESLint 强制规则
10. CI 检查类型覆盖率脚本
11. 常见坑 & 避坑指南
12. 代码审查 Checklist
13. 迁移路线图（老项目怎么迁）
14. Q&A
15. 结束页：30 天成为公司 TS 最强王者！
