# CMD（命令提示符）命令大全

## 以下是 Windows 系统中最常用、最实用的 CMD（命令提示符）命令大全，按类别整理，附带简要说明和常用参数，方便你快速查找和使用

### 1. 基本操作类

- `dir` 查看当前目录文件和文件夹（最常用）
  - `dir /a` 显示隐藏文件
  - `dir /s` 递归显示子目录
  - `dir /b` 仅显示文件名
  - `dir *.txt` 只显示 txt 文件
- `cd` 切换目录
  - `cd ..` 返回上级
  - `cd \` 返回根目录
  - `cd D:\soft` 切换到 D 盘 soft 目录
- `md` 或 `mkdir` 创建文件夹
- `rd` 或 `rmdir` 删除空文件夹（加 `/s /q` 可删除非空文件夹）
- `tree` 以树状图显示目录结构（加 `/f` 显示文件）
- `cls` 清屏
- `exit` 退出 CMD

### 2. 文件操作类

- `copy` `xcopy` 复制文件
  - `xcopy D:\src E:\dst /s /e /h /i /y` 复制整个文件夹（推荐）
- `move` 移动文件或文件夹
- `del` 删除文件
  - `del *.tmp /f /s /q` 强制删除所有 tmp 文件
- `ren` 或 `rename` 重命名
- `type` 显示文本文件内容（类似 cat）
- `fc` 比较两个文件差异

### 3. 网络相关命令（超级实用）

- `ipconfig` 查看本机 IP 信息
  - `ipconfig /all` 详细信息
  - `ipconfig /release` & `ipconfig /renew` 释放并重新获取 IP
  - `ipconfig /flushdns` 清除 DNS 缓存
- `ping` 测试网络连通性（ping 8.8.8.8 / baidu.com）
- `tracert` 路由追踪
- `nslookup` DNS 查询
- `netstat -ano` 查看所有网络连接和占用端口
  - `netstat -ano | findstr 8080` 查找占用 8080 端口的进程
- `arp -a` 查看 ARP 缓存
- `route print` 查看路由表

### 4. 系统管理类

- `tasklist` 查看所有进程
- `taskkill` 结束进程
  - `taskkill /f /im chrome.exe` 强制结束所有 Chrome
  - `taskkill /f /pid 1234` 按 PID 结束
- `systeminfo` 查看电脑详细信息
- `wmic cpu get name` 查看 CPU 型号
- `shutdown` 关机/重启
  - `shutdown /s /t 0` 立即关机
  - `shutdown /r /t 0` 立即重启
  - `shutdown /a` 取消定时关机
- `sfc /scannow` 系统文件修复
- `chkdsk C: /f /r` 检查并修复磁盘错误（需重启）

### 5. 磁盘与分区类

- `diskpart` 强大的磁盘分区工具（交互式）
- `fsutil fsinfo drives` 查看所有盘符
- `vol` 查看盘符卷标
- `label` 修改盘符卷标
- `defrag C: /U /V` 磁盘碎片整理（Win10/11 已自动）

### 6. 实用小技巧组合命令

```cmd
:: 一键清理临时文件
del /f /s /q %temp%\* & del /f /s /q C:\Windows\Temp\*

:: 查看本机所有账号
net user

:: 创建本地管理员账号（慎用）
net user admin 123456 /add && net localgroup administrators admin /add

:: 快速打开常用目录
start %appdata%
start %userprofile%\Desktop

:: 强制删除顽固文件夹
rd /s /q "文件夹路径"
takeown /f "文件夹路径" /r /d y && icacls "文件夹路径" /grant administrators:F /t

:: 一键开启远程桌面（Win10/11专业版）
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f
```

### 7. 快速打开系统工具

```cmd
control              控制面板
msconfig             系统配置
services.msc         服务
compmgmt.msc         计算机管理
eventvwr             事件查看器
regedit              注册表编辑器
gpedit.msc           本地组策略编辑器（专业版以上）
```

这些命令基本能覆盖日常 90%的需求。如果你有具体场景（比如批量处理文件、网络排查、系统清理等），可以告诉我，我再给你更针对性的命令组合！
