# Node.js 全栈开发完全指南

本文档旨在为 Node.js 开发者提供一条清晰的学习路线，涵盖基础语法、核心模块、Web 开发、数据库集成及高阶性能调优。

---

## 目录

1. [环境搭建与工具](#1-环境搭建与工具)
2. [Node.js 基础核心](#2-nodejs-基础核心)
3. [异步编程 (重难点)](#3-异步编程-重难点)
4. [内置核心模块](#4-内置核心模块)
5. [Web 开发框架 (Express/Koa)](#5-web-开发框架-expresskoa)
6. [数据库集成](#6-数据库集成)
7. [认证与安全](#7-认证与安全)
8. [工程化与部署](#8-工程化与部署)
9. [进阶主题](#9-进阶主题)

---

## 1. 环境搭建与工具

### 1.1 安装 Node.js

推荐使用 **NVM (Node Version Manager)** 管理版本，避免权限问题和多版本切换困难。

* **Windows**: 使用 `nvm-windows`
* **Mac/Linux**: 使用 `nvm`

```bash
# 安装最新长期支持版 (LTS)
nvm install --lts
nvm use --lts

# 验证安装
node -v
npm -v
```

### 1.2 包管理器 (NPM/Yarn/PNPM)

理解 `package.json` 的核心作用。

* `dependencies`: 生产环境依赖 (如 `express`, `mongoose`)。
* `devDependencies`: 开发环境依赖 (如 `nodemon`, `eslint`, `typescript`)。
* `scripts`: 自定义脚本命令。

**常用命令：**

```bash
npm init -y                 # 初始化项目
npm install <package>       # 安装依赖
npm install -g nodemon      # 全局安装工具
npm run <script-name>       # 运行脚本
```

---

## 2. Node.js 基础核心

### 2.1 运行时环境

Node.js 不是语言，是基于 Chrome V8 引擎的 JavaScript **运行时**。

* **单线程 + 事件循环**：适合 I/O 密集型，不适合 CPU 密集型。
* **Globals**: `process`, `__dirname`, `__filename`, `module`, `require` (CommonJS).

### 2.2 模块系统 (Module System)

Node.js 目前并存两种模块规范，务必掌握区别。

**A. CommonJS (默认, 传统)**

```javascript
// math.js
const add = (a, b) => a + b;
module.exports = { add };

// index.js
const { add } = require('./math');
console.log(add(1, 2));
```

**B. ES Modules (现代, 推荐)**
需要在 `package.json` 中设置 `"type": "module"`。

```javascript
// math.js
export const add = (a, b) => a + b;

// index.js
import { add } from './math.js'; // 注意：必须带后缀
```

---

## 3. 异步编程 (重难点)

这是 Node.js 的灵魂。必须理解代码执行顺序。

### 3.1 演进路线

1. **Callbacks (回调函数)**: 容易导致“回调地狱 (Callback Hell)”。
2. **Promise**: 链式调用，解决嵌套问题。
3. **Async/Await**: 同步写法写异步代码 (最佳实践)。

### 3.2 示例对比

**读取文件的三种方式：**

```javascript
const fs = require('fs');
const fsPromises = require('fs').promises;

// 1. 回调风格 (错误优先)
fs.readFile('./data.txt', 'utf8', (err, data) => {
    if (err) return console.error(err);
    console.log(data);
});

// 2. Promise 风格
fsPromises.readFile('./data.txt', 'utf8')
    .then(data => console.log(data))
    .catch(err => console.error(err));

// 3. Async/Await (现代标准)
async function readFile() {
    try {
        const data = await fsPromises.readFile('./data.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
```

### 3.3 事件循环 (Event Loop) 简述

* **宏任务 (MacroTask)**: `setTimeout`, `setInterval`, `setImmediate`, I/O 操作。
* **微任务 (MicroTask)**: `process.nextTick`, `Promise.then` (优先级高于宏任务)。
* **顺序**: 同步代码 -> 微任务 -> 宏任务。

---

## 4. 内置核心模块

无需安装，直接引入。

### 4.1 Path (路径处理)

处理不同操作系统的路径分隔符问题。

```javascript
const path = require('path');

// 拼接路径 (自动处理 / 或 \)
const fullPath = path.join(__dirname, 'files', 'image.png');
// 获取扩展名
const ext = path.extname(fullPath); // .png
```

### 4.2 FS (文件系统)

见 3.2 节。注意区分 `readFile` (一次性读取到内存) 和 `createReadStream` (流式读取)。

### 4.3 HTTP (创建服务器)

通常生产环境使用框架，但了解底层原理很重要。

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }
});
server.listen(3000);
```

### 4.4 Events (事件触发器)

Node.js 架构的核心模式（发布-订阅）。

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// 订阅
myEmitter.on('order', (id) => {
    console.log(`Order ${id} received`);
});

// 发布
myEmitter.emit('order', 101);
```

---

## 5. Web 开发框架 (Express/Koa)

以 **Express** 为例，它是最流行的 Node 框架。

### 5.1 初始化与基础路由

```javascript
const express = require('express');
const app = express();

// 解析 JSON 请求体
app.use(express.json());

// GET 路由
app.get('/api/users', (req, res) => {
    res.json({ users: ['Alice', 'Bob'] });
});

// POST 路由
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    // 保存逻辑...
    res.status(201).json(newUser);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 5.2 中间件 (Middleware)

中间件是 Express 的核心，主要用于处理请求流程（日志、鉴权、错误处理）。

```javascript
// 自定义中间件
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // 必须调用 next() 进入下一环节，否则请求挂起
};

app.use(logger);

// 全局错误处理中间件 (必须带4个参数)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

---

## 6. 数据库集成

Node.js 通常搭配 MongoDB (NoSQL) 或 SQL 数据库。

### 6.1 MongoDB + Mongoose (推荐入门)

Mongoose 是 ODM (Object Data Modeling) 库。

```javascript
const mongoose = require('mongoose');

// 连接
mongoose.connect('mongodb://localhost:27017/mydb');

// 定义 Schema 和 Model
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});
const User = mongoose.model('User', UserSchema);

// 增删改查
await User.create({ name: 'Tom', age: 20 });
const users = await User.find({ age: { $gt: 18 } });
```

### 6.2 SQL (MySQL/PostgreSQL) + Prisma/Sequelize

Prisma 是现代 Node.js ORM 的首选。

```javascript
// Prisma 示例
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const users = await prisma.user.findMany();
```

---

## 7. 认证与安全

### 7.1 JWT (JSON Web Token)

用于无状态的 API 认证。

* 库: `jsonwebtoken`
* 流程: 用户登录 -> 服务器签发 Token -> 客户端保存 -> 每次请求 Header 携带 Token。

### 7.2 密码加密

永远不要明文存储密码。

* 库: `bcryptjs` 或 `bcrypt`
* 流程: 注册时 `hash` 密码，登录时 `compare` 密码。

---

## 8. 工程化与部署

### 8.1 环境变量

使用 `dotenv` 库管理敏感信息（数据库密码、API Key）。

```javascript
require('dotenv').config();
const dbPassword = process.env.DB_PASS;
```

### 8.2 进程管理 (PM2)

生产环境必用。

* **守护进程**: 崩溃自动重启。
* **负载均衡**: 利用多核 CPU (`-i max`)。

```bash
npm install pm2 -g
pm2 start app.js --name "my-api" -i max
pm2 monit
```

### 8.3 跨域处理 (CORS)

后端安装 `cors` 中间件解决浏览器同源策略限制。

```javascript
const cors = require('cors');
app.use(cors());
```

---

## 9. 进阶主题

当掌握了上述内容后，可以深入研究以下领域：

1. **Streams (流)**: 处理大文件（视频、大日志），避免内存溢出 (`pipe` 操作)。
2. **Buffer**: 处理二进制数据流。
3. **Cluster / Worker Threads**: 解决 Node.js 单线程处理 CPU 密集型任务的短板。
4. **NestJS**: 企业级、高度模块化、TypeScript 优先的框架（类似 Spring Boot / Angular）。
5. **TypeScript**: 给 Node.js 加上类型系统，大型项目标配。
6. **Redis**: 缓存策略，Session 存储，消息队列。

---

## 学习资源推荐

* **官方文档**: [nodejs.org/en/docs](https://nodejs.org/en/docs/)
* **书籍**: 《深入浅出 Node.js》(朴灵) - 原理进阶必读。
* **实践**: 尝试写一个 博客 API 或 实时聊天室 (Socket.io)。

```
