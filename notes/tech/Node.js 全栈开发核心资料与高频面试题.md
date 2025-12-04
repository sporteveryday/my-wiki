# Node.js 全栈开发核心资料与高频面试题

## 第一部分：Node.js 学习资料与路线图

### 1. 核心基础 (Foundations)

在深入框架之前，必须掌握 Node.js 的原生能力。

* **运行时原理**：V8 引擎、Libuv 库、单线程模型、非阻塞 I/O。
* **模块系统**：CommonJS (`require/module.exports`) 与 ES Modules (`import/export`) 的区别与互操作。
* **内置模块**：
  * `fs` (文件系统)：读写文件、流式操作。
  * `http/https`：创建服务器、发起请求。
  * `path`：路径处理。
  * `events`：发布订阅模式核心。
  * `stream`：流的处理（四种流类型）。
  * `buffer`：二进制数据处理。

### 2. 异步编程 (Asynchronous Programming)

* **回调函数 (Callbacks)**：错误优先风格 (Error-first)。
* **Promise**：状态机、链式调用、`Promise.all/race/allSettled`。
* **Async/Await**：同步写法的异步代码，错误捕获 (`try-catch`)。
* **事件循环 (Event Loop)**：宏任务 (MacroTask) vs 微任务 (MicroTask)，`process.nextTick` vs `setImmediate`。

### 3. Web 框架 (Frameworks)

* **Express**：老牌、生态丰富、中间件线性模型。
* **Koa2**：轻量级、基于 async/await、洋葱圈模型 (Onion Model)。
* **NestJS**：Angular 风格、TypeScript 支持、依赖注入 (IoC)、适合大型企业级应用。
* **Fastify**：主打高性能、低开销。

### 4. 数据库与缓存 (Database & Cache)

* **NoSQL**: MongoDB (配合 Mongoose)。
* **SQL**: MySQL/PostgreSQL (配合 Sequelize, TypeORM 或 Prisma)。
* **Cache**: Redis (缓存策略、Session 存储、消息队列)。

### 5. 进阶与运维 (Advanced & DevOps)

* **多进程**: `child_process`, `cluster` 模块。
* **性能调优**: 内存泄漏排查 (Heap dump), CPU Profiling。
* **进程管理**: PM2 (负载均衡、日志管理、自动重启)。
* **部署**: Docker, CI/CD, Nginx 反向代理。

### 6. 推荐书籍与资源

* **入门**: 《Node.js 实战 (Node.js in Action)》
* **进阶**: 《深入浅出 Node.js》 (朴灵 著) —— 经典中的经典，必读。
* **设计模式**: 《Node.js Design Patterns》
* **文档**: [Node.js 官方文档](https://nodejs.org/en/docs/)

---

## 第二部分：Node.js 高频面试题 (附简要答案)

### 一、 基础概念与原理

#### 1. 什么是 Node.js？它有什么特点？

* **定义**: Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境。
* **特点**:
    1. **事件驱动 (Event-driven)**。
    2. **非阻塞 I/O (Non-blocking I/O)**。
    3. **单线程 (Single Threaded)**：主线程是单线程，但底层 Libuv 线程池处理耗时 I/O。
    4. **轻量高效**：适合 I/O 密集型应用，不适合 CPU 密集型。

#### 2. Node.js 的 Event Loop (事件循环) 运行机制是怎样的？(★重点)

Node.js 的事件循环与浏览器不同，分为 6 个阶段，循环执行：

1. **Timers**: 执行 `setTimeout` 和 `setInterval` 的回调。
2. **Pending Callbacks**: 执行系统操作的回调（如 TCP 错误）。
3. **Idle, Prepare**: 内部使用。
4. **Poll**: 获取新的 I/O 事件，执行 I/O 回调（核心阶段）。
5. **Check**: 执行 `setImmediate` 的回调。
6. **Close Callbacks**: 执行关闭事件的回调（如 `socket.on('close')`）。

* **微任务**: `process.nextTick` 优先级最高，在当前阶段结束前立即执行；Promise 的 `then` 在 nextTick 之后。

#### 3. `process.nextTick` 和 `setImmediate` 的区别？

* `process.nextTick`: 属于微任务，在当前操作完成后、事件循环的下一个阶段开始前**立即**执行。优先级极高，如果递归调用会导致 IO 饥饿。
* `setImmediate`: 属于宏任务，在事件循环的 **Check** 阶段执行。

#### 4. CommonJS 和 ES Modules (ESM) 的区别？

* **CommonJS**:
  * 语法: `require`, `module.exports`。
  * 加载: **运行时加载**，同步加载。
  * 输出: 输出的是值的**拷贝** (基本类型) 或引用 (对象)。
* **ESM**:
  * 语法: `import`, `export`。
  * 加载: **编译时输出接口**，异步加载。
  * 输出: 输出的是值的**引用** (Live Binding)。

---

### 二、 核心模块与 API

#### 5. Buffer 是什么？为什么要使用它？

* **定义**: Buffer 是用于处理二进制数据的类。因为 JS 早期只有字符串，没有二进制数据类型。
* **场景**: 文件流操作、TCP 流、网络通信、加密算法。
* **内存**: Buffer 内存是在 V8 堆外分配的 (C++层面)，不由 V8 GC 直接管理。

#### 6. Stream (流) 有哪几种类型？有什么优势？

* **类型**:
    1. `Readable`: 可读流 (如 `fs.createReadStream`).
    2. `Writable`: 可写流 (如 `fs.createWriteStream`).
    3. `Duplex`: 双工流 (可读可写，如 TCP Socket).
    4. `Transform`: 转换流 (读入数据，转换后输出，如 `zlib`, `crypto`).
* **优势**: 内存效率高（不需要一次性把大文件加载到内存）、时间效率高（边读边写）。

#### 7. EventEmitter 是同步还是异步的？

* 默认是 **同步** 的。当触发事件 (`emit`) 时，监听器 (`on`) 会按照注册顺序依次同步执行。
* 如果在监听器中包含异步操作（如 `setImmediate`），则该操作是异步的。

#### 8. require 的加载机制是怎样的？

1. **缓存检查**: 先检查 `Module._cache`，有缓存直接返回。
2. **路径分析**: 是核心模块？相对路径？绝对路径？还是第三方模块 (node_modules)?
3. **文件定位**: 尝试补全扩展名 `.js` -> `.json` -> `.node`。
4. **编译执行**: 根据文件类型载入，包装成一个函数执行 (注入 `exports`, `require`, `module`, `__filename`, `__dirname`)。
5. **缓存**: 将结果缓存。

---

### 三、 Web 框架与工程化

#### 9. Express 和 Koa 的中间件机制有什么区别？

* **Express**: 线性模型。中间件依次执行，`next()` 调用下一个，主要用于逻辑分离。如果中间件中有异步操作，Express 默认不会等待异步完成就返回响应（除非特殊处理）。
* **Koa**: 洋葱圈模型 (Onion Model)。基于 `async/await`。
  * **入**: 请求经过中间件，`await next()` 暂停当前中间件，进入下一个。
  * **出**: 最内层执行完后，逆序返回，执行 `await next()` 之后的代码。适合处理响应时间的统计、日志记录等。

#### 10. 什么是 NestJS？它解决了什么问题？

* 基于 TypeScript，引入了 OOP (面向对象)、FP (函数式) 和 FRP (函数响应式) 的理念。
* **核心**: 依赖注入 (Dependency Injection)，模块化 (Modules)，装饰器 (Decorators)。
* **解决**: Express/Koa 架构过于自由导致的“千人千面”难以维护的问题，提供了标准的架构规范，适合大型企业级应用。

---

### 四、 性能与运维

#### 11. Node.js 如何利用多核 CPU？(Cluster 模块)

* Node.js 是单线程的，默认只用一个 CPU 核心。
* 可以使用 `cluster` 模块或 `pm2` 工具开启多个子进程 (Worker)。
* **原理**: Master 进程负责监听端口和分发请求（通常使用 Round-Robin 算法），Worker 进程负责处理业务逻辑。Worker 之间通过 IPC (进程间通信) 通信。

#### 12. 常见的内存泄漏场景有哪些？如何排查？

* **场景**:
    1. 全局变量无限制增加。
    2. 闭包引用未释放。
    3. 事件监听器 (`on`) 只注册不移除 (`off`)。
    4. 缓存 (如用对象当缓存) 无过期策略。
* **排查**:
  * 使用 `chrome://inspect` 连接 Node 进程。
  * 使用 `heapdump` 导出内存快照。
  * 对比不同时间段的 Heap Snapshot，查找 Retained Size 异常的对象。

#### 13. 如何处理高并发？

1. **负载均衡**: Nginx 前置反向代理。
2. **集群模式**: PM2 开启 Cluster 模式。
3. **缓存**: Redis 缓存热点数据。
4. **异步非阻塞**: 充分利用 Node.js 特性，避免在主线程进行 CPU 密集型计算（如图像处理、大循环）。
5. **分离计算**: CPU 密集任务交给 Worker Threads 或 独立的微服务（Go/Java/C++）。

#### 14. 什么是守护进程？PM2 的作用？

* **守护进程**: 在后台运行，不与终端交互，系统关闭时才停止的进程。
* **PM2**:
  * 进程守护（崩溃自动重启）。
  * 负载均衡（Cluster Mode）。
  * 日志管理。
  * 监控（CPU/内存使用率）。

---

### 五、 代码题 (Live Coding 常见)

#### 15. 手写一个简单的 Event Emitter

```javascript
class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(listener);
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(fn => fn.apply(this, args));
    }
  }

  off(type, listener) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter(fn => fn !== listener);
    }
  }

  once(type, listener) {
    const wrapper = (...args) => {
      listener.apply(this, args);
      this.off(type, wrapper);
    };
    this.on(type, wrapper);
  }
}
```

#### 16. 手写实现一个简单的 sleep 函数

```javascript
// Promise 版本
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 使用
(async () => {
    console.log('Start');
    await sleep(1000);
    console.log('End');
})();
```
