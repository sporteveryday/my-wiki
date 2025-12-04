2025年React前端开发面试的考察重点已经从“单纯的API熟练度”转向了**全栈化思维、性能极致优化、架构设计能力**以及**对React 19新特性的理解**。

以下是为你整理的2025年备战指南，分为 **核心技术、工程化与架构、系统设计、算法与基础** 四个模块：

### 1. 核心技术：React 19 & Next.js (重中之重)

React 19 的发布带来了范式转移，面试官会重点考察你是否理解“为什么”要变，而不仅仅是“怎么用”。

* **React 19 新特性**
  * **React Compiler (React Forget):** 必须理解它如何自动优化渲染，消灭 `useMemo` 和 `useCallback` 的手动心智负担。
  * **Server Components (RSC):** 深刻理解服务端组件 vs 客户端组件的区别、边界、以及数据流向（服务端直出HTML，无水合成本）。
  * **Actions API:** 掌握 `useActionState`、`useFormStatus`、`useOptimistic`，以及如何用 Server Actions 替代传统的 `useEffect` + `fetch` 模式进行表单提交。
  * **新 Hook `use`:** 如何在组件中直接读取 Promise 和 Context。
* **Next.js (App Router)**
  * **路由架构:** Pages Router vs App Router 的区别，Layouts、Templates 的生命周期。
  * **渲染模式:** SSR (服务端渲染)、SSG (静态生成)、ISR (增量静态再生)、CSR (客户端渲染) 的适用场景及优缺点。
  * **数据获取:** 在服务端组件中直接 async/await 读取数据库/API，与传统 `getServerSideProps` 的区别。

### 2. 状态管理与生态圈的变化

2025年的趋势是 **“服务端状态与客户端状态分离”**。

* **服务端状态 (Server State):**
  * **TanStack Query (React Query):** 几乎是标配。考察重点：缓存失效策略 (`staleTime` vs `gcTime`)、乐观更新 (Optimistic Updates)、预加载 (Prefetching)。
* **客户端状态 (Client State):**
  * **Zustand:** 目前最受青睐的轻量级方案。考察它与 Redux 的区别（去中心化、Hooks风格、无Provider包裹）。
  * **Redux Toolkit (RTK):** 依然在大型/老项目中占据地位。重点看 RTK Query 和 Slice 的标准写法。
  * **Context API:** 知道何时**不该**用它（高频更新导致的性能问题）。

### 3. 工程化与构建工具

面试官希望你懂“底层原理”，而不仅仅是配置 Webpack。

* **构建工具之战:**
  * **Vite:** 为什么快？(基于 ES Modules 的按需编译 vs Webpack 的全量打包)。
  * **Turbopack:** Vercel 出品的 Rust 编写的工具，Next.js 的默认构建引擎，了解其对大型项目的增量编译优势。
  * **Rspack:** 字节跳动的 Rust 打包工具，兼容 Webpack 生态但速度极快。
* **TypeScript (高级):**
  * 不再只是写 Interface。考察 **泛型 (Generics)**、**工具类型 (Pick, Omit, Partial, Record)**、**类型推断 (infer)**、**联合类型 (Discriminated Unions)** 以及如何处理 `unknown` vs `any`。

### 4. 前端系统设计 (Senior/专家岗必考)

这是区分初中级与高级工程师的分水岭。不要只以此堆砌组件，要展示架构思维。

* **常见考题:**
  * 设计一个 **无限滚动 Feed 流** (虚拟列表 Virtualization, 内存管理)。
  * 设计一个 **高并发抢票页面** (防抖节流, 乐观UI, 队头阻塞处理)。
  * 设计 **图片懒加载组件** (Intersection Observer, 占位图策略)。
  * 设计 **复杂表单配置平台** (JSON Schema 驱动渲染, 联动校验)。
* **回答框架 (RADIO):**
  * **R**equirements (明确需求)
  * **A**rchitecture (整体架构、技术选型)
  * **D**ata Model (数据结构设计)
  * **I**nterface (API 定义)
  * **O**ptimization (性能优化、无障碍访问 a11y、错误处理)

### 5. 性能优化 (硬核加分项)

不要只说“代码压缩”。

* **指标 (Core Web Vitals):** LCP (最大内容绘制), INP (交互延迟), CLS (布局偏移)。
* **手段:**
  * **代码分割:** `React.lazy`, 动态 import, 路由懒加载。
  * **资源加载:** 图片 WebP/AVIF, 预加载 (`<link rel="preload">`), HTTP/2 多路复用。
  * **渲染优化:** 避免重排重绘, 使用 CSS `content-visibility`, Web Worker 处理重计算。

### 6. 软技能与行为面试

* **沟通协作:** 如何向后端争取 API 格式？如何处理产品经理的不合理需求？
* **技术决策:** 为什么选 A 技术而不选 B？(例如：为什么选 Tailwind CSS 而不是 Styled Components?)

**一句话总结：**
2025年，不要再背诵 `useEffect` 的依赖数组怎么写了，要把精力放在 **“如何用 React 19 + Next.js 构建高性能、SSR 优先的现代化应用”** 上。祝面试顺利！
