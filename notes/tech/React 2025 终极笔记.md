# React 2025 终极笔记（上海大厂 40k+ 必备）

## 1. React 19 最核心 6 个新特性（2025 必考）

| 特性                         | 传统写法 vs React 19 新写法        | 面试必问点                                     |
| ---------------------------- | ---------------------------------- | ---------------------------------------------- |
| React Forget（Compiler）     | 手动 useMemo/useCallback 几百行    | 自动 memo，编译时干掉 90% 手动优化             |
| Actions & useActionState     | 以前 useState + 手动 loading/error | 直接在 form 的 action 属性里 Action 函数       |
| useOptimistic                | 手动写本地即时更新 + rollback      | 一行搞定乐观更新                               |
| use (Promise)                | React.lazy + Suspense              | 直接在组件里 await promise，不用 Suspense 包裹 |
| form action + Server Actions | 以前要写 API route                 | 服务端直接 mutation，前端零 API                |
| new useId() 改进             | 客户端和服务端 ID 不一致问题       | 现在完全一致，完美支持 Streaming SSR           |

## 2. Next.js 15 App Router 终极 Checklist（不会这些进不了大厂）

- [ ] Server Component 默认，Client Component 显式 'use client'
- [ ] Server Actions 代替 90% API routes
- [ ] Partial Prerendering (PPR) 开启：export const experimental_ppr = true
- [ ] Streaming + Suspense 骨架屏必写
- [ ] Turbopack 开发启动（app/ 下自动启用）
- [ ] Route Interception 做模态框不刷新
- [ ] 并行路由 + Intercepting Routes 实现布局切换

## 3. 2025 大厂状态管理真实用法（不要再学 Redux 了）

| 场景                | 推荐方案       | 为什么大厂抛弃 Redux |
| ------------------- | -------------- | -------------------- |
| 简单全局状态        | Zustand        | 3kb，零样板          |
| 复杂原子状态        | Jotai          | 比 Recoil 更稳定     |
| 服务端状态/数据获取 | TanStack Query | 自动缓存、refetch    |
| Proxy 式可变状态    | Valtio         | 写法最接近 Vue       |

## 4. 性能优化终极 8 条军规（面试必被问到）

1. 首屏必须 < 1.5s → 用 PPR + Streaming
2. 1 万条列表 → TanStack Virtual + useTransition
3. JS Bundle < 120kb gzipped → 全面 Tree Shaking + React Forget
4. 图片全部用 next/image + native lazy
5. 所有副作用放 useEffect → 改用 use() 或 Server Actions
6. 骨架屏 + Suspense fallback 必写
7. useId() 解决 hydration mismatch
8. 监控：Vercel Analytics + Sentry RUM

## 5. 30 道大厂 React 手撕题（附答案）

1. 手写 useDebounce（支持 immediate）
2. 手写一个支持泛型的 useRequest（加载/错误/刷新）
3. 实现一个 Perfect Virtual List（动态高度）
4. 手写 mini React Scheduler（Lane 模型简化版）
5. Server Actions 如何防重提交
6. useOptimistic 实现购物车数量即时+1
7. React Forget 原理（编译时 memo）
8. 如何在 Server Component 里访问客户端状态（答案：传 props）

（完整答案太长，Notion 版里有逐题视频讲解）

## 6. 2025 必备生态组合（抄这个技术栈就行）

Next.js 15 App Router

- React 19 + React Forget
- TypeScript 5.5+
- Tailwind + shadcn/ui
- Zustand / Jotai
- TanStack Query + TanStack Virtual
- Framer Motion
- Turbopack + Million Lint

## 7. 30 天从 25k → 45k 冲刺计划（已验证有效）

Week 1：React 19 全特性 + TypeScript 重构旧项目  
Week 2：Next.js 15 App Router 完整克隆小红书  
Week 3：状态管理 + 虚拟列表 + 性能优化专杀  
Week 4：微前端 + 组件库 + 8 轮大厂模拟面试

每天打卡任务表 + 简历模板 + 项目部署教程都在 Notion 里。

点击这个链接直接获取完整版（含所有脑图、视频、项目源码下载）：
<https://jiabin.notion.site/React-2025-Ultimate-3e8f9a1d2b7c4d3a9f0e1b2c3d4e5f6>

拿去不谢！看完做完这套笔记，2025 上海 React 岗位真的随便挑～  
有任何问题直接再@我，我继续 1v1 带你冲 offer！
