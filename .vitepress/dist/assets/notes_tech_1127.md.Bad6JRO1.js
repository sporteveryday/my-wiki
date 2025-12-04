import{_ as n,c as t,o as r,ag as a}from"./chunks/framework.CQuhCYrb.js";const d=JSON.parse('{"title":"2025 年统计长任务的终极答案就是","description":"","frontmatter":{},"headers":[],"relativePath":"notes/tech/1127.md","filePath":"notes/tech/1127.md","lastUpdated":null}'),o={name:"notes/tech/1127.md"};function i(s,e,l,p,c,m){return r(),t("div",null,[...e[0]||(e[0]=[a(`<h1 id="_2025-年统计长任务的终极答案就是" tabindex="-1">2025 年统计长任务的终极答案就是 <a class="header-anchor" href="#_2025-年统计长任务的终极答案就是" aria-label="Permalink to &quot;2025 年统计长任务的终极答案就是&quot;">​</a></h1><p>new PerformanceObserver(list =&gt; {...}).observe({entryTypes: [&#39;longtask&#39;]})</p><h1 id="v8-jit" tabindex="-1">V8 JIT <a class="header-anchor" href="#v8-jit" aria-label="Permalink to &quot;V8 JIT&quot;">​</a></h1><pre><code>JavaScript 源码
      ↓
┌─────────────┐
│   Parser    │ → 生成 AST
┌─────────────┐
│ Ignition    │ ← 解释器（超级快启动）
└─────┬───────┘
      ↓ 监控执行次数、类型等（Profiling）
┌─────────────┐       ┌─────────────┐
│   Maglev     │← 中间层 JIT（2023 年加入，专治短命函数）
└─────┬───────┘       └─────────────┬───┘
      ↓                           ↓
┌─────────────┐             ┌─────────────┐
│  SparkPlug  │← 轻量 JIT（2022 年加入，不看类型，直接编译）
└─────┬───────┘             └───────┬─────┘
      ↓                             ↓
┌─────────────┐               ┌─────────────┐
│  TurboFan   │← 重型优化编译器（看类型、做激进优化）
└─────────────┘               └─────────────┘
      ↓                             ↓
    超级快的机器码                超级快的机器码
</code></pre><h1 id="_2025-年最强、最全、最稳健-的-javascript-cookie-解析函数" tabindex="-1">2025 年最强、最全、最稳健 的 JavaScript Cookie 解析函数 <a class="header-anchor" href="#_2025-年最强、最全、最稳健-的-javascript-cookie-解析函数" aria-label="Permalink to &quot;2025 年最强、最全、最稳健 的 JavaScript Cookie 解析函数&quot;">​</a></h1><pre><code>    function parseCookie(str = document.cookie) {
      const cookies = {};

      if (!str?.trim()) return cookies;

      const pairs = str
        .replace(/;\\s*(?=[^;]+=)/g, &#39;; &#39;)
        .split(/;\\s+/);

      for (let pair of pairs) { 
        pair = pair.trim();
        if (!pair) continue;

        const eqIndex = pair.indexOf(&#39;=&#39;);
        if (eqIndex === -1) continue;

        let key = pair.slice(0, eqIndex).trim();
        let value = pair.slice(eqIndex + 1).trim();

        if (value[0] === &#39;&quot;&#39; &amp;&amp; value[value.length - 1] === &#39;&quot;&#39;) {
          value = value.slice(1, -1);
        }

        try {
          key = decodeURIComponent(key);
          value = decodeURIComponent(value.replace(/\\+/g, &#39; &#39;)); // + 号要特殊处理（老服务器常见）
        } catch (e) {}

        cookies[key] = value;
      }

      return cookies;
    }
    const getCookies = () =&gt; 
      Object.fromEntries(
        document.cookie
          .split(&#39;;&#39;)
          .map(v =&gt; v.trim())
          .filter(v =&gt; v.includes(&#39;=&#39;))
          .map(v =&gt; {
            const [keyRaw, ...valParts] = v.split(&#39;=&#39;);
            let key = decodeURIComponent(keyRaw.trim());
            let value = decodeURIComponent(valParts.join(&#39;=&#39;).trim().replace(/^&quot;(.*)&quot;$/, &#39;$1&#39;));
            return [key, value];
          })
      );

    // 用法
    console.log(getCookies().token);
</code></pre><h1 id="_2025-年最强组合-大厂真实在用-能防-99-9-爬虫" tabindex="-1">2025 年最强组合（大厂真实在用，能防 99.9% 爬虫） <a class="header-anchor" href="#_2025-年最强组合-大厂真实在用-能防-99-9-爬虫" aria-label="Permalink to &quot;2025 年最强组合（大厂真实在用，能防 99.9% 爬虫）&quot;">​</a></h1><pre><code>    第1层：前端指纹（必上！性价比最高）
    └── Canvas + WebGL + AudioContext + Fonts + WebRTC + Screen
        → 生成唯一 browser fingerprint（精度 &gt; 99.99%）

    第2层：行为检测（必上！能直接秒杀）
    └── 鼠标移动轨迹贝塞尔曲线熵
    └── 触摸事件（移动端）
    └── 键盘输入节奏
    └── 页面停留时间 + 滚动行为

    第3层：TLS + HTTP/2 指纹
    └── JA3/JA3S + HTTP/2 SETTINGS 顺序 + ALPN

    第4层：动态限流 + 封禁
    └── 同一指纹 1 分钟内 &gt; 30 次请求 → 直接 5~60 分钟封禁
    └── 触发行为异常 → 永久封禁指纹 + IP

    第5层：核武器（最后上）
    └── 极验 v4 / reCAPTCHA v3 / Cloudflare Turnstile
</code></pre><h1 id="requestanimationframe常用写法" tabindex="-1">requestAnimationFrame常用写法 <a class="header-anchor" href="#requestanimationframe常用写法" aria-label="Permalink to &quot;requestAnimationFrame常用写法&quot;">​</a></h1><pre><code>    // 1. 最简单用法
    requestAnimationFrame(() =&gt; {
      console.log(&#39;下一帧执行，我和浏览器刷新率同步！&#39;);
    });

    // 2. 递归动画（标准写法）
    function animate() {
      // 这里写你的动画逻辑
      box.style.transform = \`translateX(\${Date.now() / 10 % 500}px)\`;

      requestAnimationFrame(animate);  // 关键：自己再请求下一帧
    }
    requestAnimationFrame(animate);      // 启动

    // 3. 带时间戳（推荐！更精准）
    function animate(timestamp) {
      if (!animate.start) animate.start = timestamp;
      const progress = timestamp - animate.start;  // 从开始到现在过去了多久

      // 用 progress 做平滑动画
      box.style.transform = \`translateX(\${progress / 5 % 500}px)\`;

      if (progress &lt; 10000) {  // 跑10秒
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);

    // 4. 取消动画（必须记住返回值！）
    const id = requestAnimationFrame(doSomething);
    cancelAnimationFrame(id);  // 取消
</code></pre><h1 id="浏览器对队头阻塞有什么优化" tabindex="-1">浏览器对队头阻塞有什么优化 <a class="header-anchor" href="#浏览器对队头阻塞有什么优化" aria-label="Permalink to &quot;浏览器对队头阻塞有什么优化&quot;">​</a></h1><p>队头阻塞(Head-of-Line Blocking,缩写HoLB)问题主要发生在网络通信中,特别是在使用<br> HTTP/1.1和以前版本时,在一个TCP连接中同一时间只能处理一个请求。即使后续的请求已经准备好<br> 在客户端,它们也必须等待当前处理中的请求完成后才能被发送。这会延迟整个页面或应用的网络请<br> 求,降低性能。</p><p>现代浏览器和协议已经实施了多种优化措施来减少或解决队头阻塞问题:</p><ol><li><p>HTTP/2:<br> 为了解决HTTP/1.x的诸多问题,包括队头阻塞问题,HTTP/2引入了多路复用(multiplexing)功<br> 能。这允许在同一TCP连接上同时传输多个独立的请求-响应消息。与HTTP/1.1相比,HTTP/2在<br> 同一个连接上可以并行处理多个请求,大大减少了队头阻塞的问题。</p></li><li><p>服务器推送:<br> HTTP/2还引入了服务器推送(server push)功能,允许服务器主动发送多个响应到客户端,而不<br> 需要客户端明确地为每个资源提出请求。这提高了页面加载的速度,因为相关资源可以被预先发送<br> 而无需等待浏览器请求。</p></li><li><p>域名分散(Domain Sharding):<br> 这种技术常用于HTTP/1.1中,通过创建多个子域,使得浏览器可以同时开启更多的TCP连接来加<br> 载资源。虽然这种方法可以在一定程度上减轻队头阻塞,但它增加了复杂性,并且在HTTP/2中由<br> 于多路复用功能变得不再必要。</p></li><li><p>连接重用(Connection Reuse):<br> 这是HTTP/1.1中的一个特性,即持久连接(Persistent Connections),允许在一次TCP连接中<br> 发送和接收多个HTTP请求和响应,而无需开启新的连接,从而减少了TCP握手的开销并提升了效<br> 率。</p></li><li><p>资源优化:<br> 减少资源的大小通过压缩(如GZIP),优化图片,减少CSS和JavaScript文件的大小等,可以减<br> 少队头阻塞的影响,因为小资源文件传输更快。</p></li><li><p>优先级设置:<br> HTTP/2允许设置资源的加载优先级,使得关键资源(如HTML,CSS,JavaScript)可以比不那么<br> 重要的资源(如图片,广告)更早加载。</p></li><li><p>预加载:<br> 浏览器可以通过使用<link rel="preload">标签预加载关键资源,例如字体文件和关键脚<br> 本,这样可以确保它们在主要内容加载之前已经准备好。</p></li><li><p>HTTP/3和QUIC协议:<br> HTTP/3是未来的推进方向,它基于QUIC协议,一个在UDP之上的新传输层协议,旨在进一步减<br> 少延迟,解决TCP/IP协议的队头阻塞问题。</p></li></ol><p>总的来说,HTTP/2的特性如多路复用、服务器推送和优先级设置都有助于减少队头阻塞。而HTTP/3<br> 的引入可能会在未来为网络通信带来根本性的变化。在使用HTTP/2、HTTP/3和浏览器级别的优化<br> 时,网页开发者也需注意资源加载优化的最佳实践,以更全面地应对队头阻塞问题。</p><h1 id="_2025-年大厂最推荐的web保存用户登录态方法" tabindex="-1">2025 年大厂最推荐的web保存用户登录态方法 <a class="header-anchor" href="#_2025-年大厂最推荐的web保存用户登录态方法" aria-label="Permalink to &quot;2025 年大厂最推荐的web保存用户登录态方法&quot;">​</a></h1><p>核心流程：</p><p>登录成功 → 后端下发两个 HttpOnly Cookie<br> access_token：短命（5~15 分钟），用于接口鉴权<br> refresh_token：长命（7~30 天），只在 /api/auth/refresh 接口<br> 使用</p><p>access_token 过期 → 前端静默请求 /api/auth/refresh<br> 后端校验 refresh_token + 设备指纹（Canvas + IP + UA）<br> 成功 → 旋转 refresh_token（旧的立即失效）+ 下发新的 access_token</p><p>任一异常（指纹变、IP 跳省、并发刷新）→ 强制重新登录<br> 措施,作用,实现方式<br> Token 绑定设备指纹,防止 Cookie 被偷了还能用,登录时生成 fingerprint，存 Redis，和 refresh_token 绑定<br> Refresh Token 单设备登录,顶号机制,新登录使旧 refresh_token 失效<br> SameSite=Strict,彻底防 CSRF,所有现代浏览器都支持<br> __Host- 前缀,更严格的 Cookie 安全,Set-Cookie:__Host-access_token=...; Path=/; Secure; HttpOnly<br> Token 版本号 + 黑名单,实现即时登出,Redis 存 jti + exp + version<br> HSTS + HTTPS Only,防止中间人劫持 Cookie,响应头加 Strict-Transport-Security</p>`,20)])])}const u=n(o,[["render",i]]);export{d as __pageData,u as default};
