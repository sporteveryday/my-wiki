import{_ as a,c as n,o as i,ag as p}from"./chunks/framework.CQuhCYrb.js";const d=JSON.parse('{"title":"Git 高级使用指南","description":"","frontmatter":{},"headers":[],"relativePath":"notes/技术/gitcode.md","filePath":"notes/技术/gitcode.md","lastUpdated":1764827213000}'),t={name:"notes/技术/gitcode.md"};function e(l,s,o,h,c,r){return i(),n("div",null,[...s[0]||(s[0]=[p(`<h1 id="git-高级使用指南" tabindex="-1">Git 高级使用指南 <a class="header-anchor" href="#git-高级使用指南" aria-label="Permalink to &quot;Git 高级使用指南&quot;">​</a></h1><h2 id="安全合并远程分支的三步法" tabindex="-1">安全合并远程分支的三步法 <a class="header-anchor" href="#安全合并远程分支的三步法" aria-label="Permalink to &quot;安全合并远程分支的三步法&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 先取回来看看（永不翻车）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fetch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> origin</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --prune</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 看要合并多少东西</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> log</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HEAD..origin/main</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --oneline</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --decorate</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 选择你喜欢的姿势合并</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> merge</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> origin/main</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          # 保守派</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rebase</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> origin/main</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">         # 干净派（推荐）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --rebase</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              # 一键懒人版（接受一定风险）</span></span></code></pre></div><h2 id="git-别名配置" tabindex="-1">Git 别名配置 <a class="header-anchor" href="#git-别名配置" aria-label="Permalink to &quot;Git 别名配置&quot;">​</a></h2><p>直接把下面内容追加到 <code>~/.gitconfig</code> 里即可<br> Windows 用户路径是 <code>C:\\Users\\你的用户名\\.gitconfig</code></p><div class="language-gitconfig vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gitconfig</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[alias]</span></span>
<span class="line"><span>    # 【核心神技】一键取回来 + 自动看要合并多少东西</span></span>
<span class="line"><span>    please = &quot;pull --rebase --autostash&quot;          # 懒人终极神器（后面解释）</span></span>
<span class="line"><span>    sync   = &quot;fetch --all --prune&quot;                # 每天第一条命令</span></span>
<span class="line"><span>    incoming = &quot;!git remote update --prune; git log HEAD..@{u} --oneline --decorate --color | cat&quot;  # 看别人提交了啥</span></span>
<span class="line"><span>    outgoing = log @{u}..HEAD --oneline --decorate  # 看你本地多了啥还没推</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 【最常用组合】比 git pull 安全 100 倍的日常流程</span></span>
<span class="line"><span>    up     = &quot;!git sync &amp;&amp; git incoming&quot;          # 取回来 + 看要合并多少</span></span>
<span class="line"><span>    save   = &quot;!git add -A &amp;&amp; git commit -m&quot;       # 快速保存：git save &quot;fix bug&quot;</span></span>
<span class="line"><span>    undo   = reset --soft HEAD~1                  # 撤销最后一次 commit（保留代码）</span></span>
<span class="line"><span>    amend  = commit --amend --no-edit             # 修改最后一次提交</span></span>
<span class="line"><span>    wipe   = &quot;!git add -A &amp;&amp; git commit -qf --amend --no-edit&quot;  # 强制把当前改动塞进上一次提交</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 【视觉党最爱】</span></span>
<span class="line"><span>    graph = log --all --decorate --oneline --graph</span></span>
<span class="line"><span>    lol    = log --graph --pretty=format:&#39;%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset&#39; --abbrev-commit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 【冲突救星】</span></span>
<span class="line"><span>    ours   = &quot;!f() { git checkout --ours   \\&quot;\${@:-.}\\&quot;; }; f&quot;  # 保留本地版本</span></span>
<span class="line"><span>    theirs = &quot;!f() { git checkout --theirs \\&quot;\${@:-.}\\&quot;; }; f&quot;  # 保留远程版本</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 懒到极致的终极命令（大厂标配）</span></span>
<span class="line"><span>    fuck   = &quot;!git add -A &amp;&amp; git commit -m &#39;fuck&#39; &amp;&amp; git push&quot;   # 别笑，真的有人天天用</span></span>
<span class="line"><span>    yolo   = &quot;!git add -A &amp;&amp; git commit --amend --no-edit &amp;&amp; git push -f&quot;  # 更狠</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 2025 年最新神器（需要 Git 2.23+）</span></span>
<span class="line"><span>    switch-main = switch main</span></span>
<span class="line"><span>    switch-master = switch master</span></span>
<span class="line"><span>    restore-all = restore --staged --worktree .</span></span></code></pre></div>`,6)])])}const k=a(t,[["render",e]]);export{d as __pageData,k as default};
