# Git 高级使用指南

## 安全合并远程分支的三步法

```bash
# 1. 先取回来看看（永不翻车）
git fetch origin --prune

# 2. 看要合并多少东西
git log HEAD..origin/main --oneline --decorate
git status

# 3. 选择你喜欢的姿势合并
git merge origin/main          # 保守派
git rebase origin/main         # 干净派（推荐）
git pull --rebase              # 一键懒人版（接受一定风险）
```

## Git 别名配置

直接把下面内容追加到 `~/.gitconfig` 里即可  
Windows 用户路径是 `C:\Users\你的用户名\.gitconfig`

```gitconfig
[alias]
    # 【核心神技】一键取回来 + 自动看要合并多少东西
    please = "pull --rebase --autostash"          # 懒人终极神器（后面解释）
    sync   = "fetch --all --prune"                # 每天第一条命令
    incoming = "!git remote update --prune; git log HEAD..@{u} --oneline --decorate --color | cat"  # 看别人提交了啥
    outgoing = log @{u}..HEAD --oneline --decorate  # 看你本地多了啥还没推

    # 【最常用组合】比 git pull 安全 100 倍的日常流程
    up     = "!git sync && git incoming"          # 取回来 + 看要合并多少
    save   = "!git add -A && git commit -m"       # 快速保存：git save "fix bug"
    undo   = reset --soft HEAD~1                  # 撤销最后一次 commit（保留代码）
    amend  = commit --amend --no-edit             # 修改最后一次提交
    wipe   = "!git add -A && git commit -qf --amend --no-edit"  # 强制把当前改动塞进上一次提交

    # 【视觉党最爱】
    graph = log --all --decorate --oneline --graph
    lol    = log --graph --pretty=format:'%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

    # 【冲突救星】
    ours   = "!f() { git checkout --ours   \"${@:-.}\"; }; f"  # 保留本地版本
    theirs = "!f() { git checkout --theirs \"${@:-.}\"; }; f"  # 保留远程版本

    # 懒到极致的终极命令（大厂标配）
    fuck   = "!git add -A && git commit -m 'fuck' && git push"   # 别笑，真的有人天天用
    yolo   = "!git add -A && git commit --amend --no-edit && git push -f"  # 更狠

    # 2025 年最新神器（需要 Git 2.23+）
    switch-main = switch main
    switch-master = switch master
    restore-all = restore --staged --worktree .
```
