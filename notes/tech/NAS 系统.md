利用闲置 Windows 电脑通过虚拟机搭建 NAS 系统是一个非常经济且实用的方案，适合入门体验、数据备份和家庭媒体中心。

以下是一套完整的实施方案，采用目前**兼容性最好、操作相对简单且功能强大**的组合：**VMware Workstation Pro (宿主软件) + 黑群晖 DSM 7.x (NAS系统)**。

---

### 方案概览

* **宿主系统**：Windows 10/11 (建议专业版，但也支持家庭版)
* **虚拟化软件**：VMware Workstation Pro (目前对个人用户已免费)
* **NAS 系统**：群晖 DSM 7.2 (使用 RR 或 ARPL 引导)
* **核心优势**：无需重装电脑系统，Windows 可继续做主力机或跑其他服务，硬盘直通可保证数据独立性。

---

### 第一阶段：硬件与环境准备

1. **BIOS 设置 (必须)**：
    * 重启电脑进入 BIOS，开启 **虚拟化技术 (Intel VT-x 或 AMD-V)**。
2. **硬盘规划 (关键)**：
    * **系统盘**：Windows 和 虚拟机软件安装在电脑原本的 SSD 上。
    * **数据盘**：强烈建议准备**一块独立的物理硬盘**（机械或固态均可）专门用于 NAS 存储。
        * *注意：如果只有一块硬盘，只能用虚拟磁盘文件，但数据安全性较差，重装 Windows 容易丢失数据。*
3. **网络环境**：
    * 建议使用**网线**连接路由器，Wi-Fi 不稳定且速度慢，不适合 NAS 传输。

---

### 第二阶段：软件安装

#### 1. 下载并安装 VMware Workstation Pro

* 去博通 (Broadcom) 官网或可靠资源站下载 VMware Workstation Pro 17.x 版本。
* 选择“个人用途”安装，现已免费。

#### 2. 准备群晖引导文件 (Bootloader)

* **推荐工具**：使用 `RR (RedPill-RR)` 或 `ARC` 引导。
* **下载地址**：去 GitHub 搜索 `RR` 或 `AuxXxilium/arc` 下载最新镜像（通常是 `.img` 格式）。
* **转换格式**：使用 StarWind V2V Converter 将 `.img` 文件转换为 VMware 支持的 `.vmdk` 格式。

---

### 第三阶段：虚拟机搭建 (核心步骤)

#### 1. 创建虚拟机

1. 打开 VMware，点击 **"创建新的虚拟机"** -> **"自定义 (高级)"**。
2. **兼容性**：默认即可 (Workstation 17.x)。
3. **安装来源**：选择 **"稍后安装操作系统"**。
4. **操作系统**：选择 **Linux**，版本选择 **Linux 5.x kernel 64-bit** (或其他 Linux 64位)。
5. **命名**：例如 "NAS-DSM"。
6. **处理器/内存**：建议分配 2核 CPU，4GB 内存 (根据你电脑配置调整，至少 2GB)。
7. **网络类型**：**非常重要**，选择 **"使用桥接网络" (Bridged)**。这样 NAS 会有独立的局域网 IP，和路由器下的其他设备平级。

#### 2. 配置引导盘

1. 创建完成后，**不要启动**。
2. 编辑虚拟机设置，**删除**默认创建的那个 SCSI 硬盘和 CD/DVD 光驱（可选）。
3. 点击 **"添加"** -> **"硬盘"** -> **"SATA"** (选 SATA 兼容性好) -> **"使用现有虚拟磁盘"**。
4. 浏览选择你刚才转换好的 **引导文件 (.vmdk)**。

#### 3. 配置数据盘 (推荐：物理硬盘直通)

*这是为了保证数据安全，如果 Windows 挂了，这块硬盘拔下来插到别的 Linux 机器上也能读数据。*

1. 在 Windows 磁盘管理中，确认你要直通的硬盘编号 (例如 `磁盘 1`)，并将其设为“脱机”状态。
2. VMware 虚拟机设置 -> **"添加"** -> **"硬盘"** -> **SATA/NVMe**。
3. 选择 **"使用物理磁盘" (Use a physical disk)**。
4. 在下拉菜单中选择对应的 `PhysicalDrive1` (根据你的磁盘管理编号)。
5. 完成添加。

#### 4. 修改网络适配器

* 进入虚拟机安装目录，找到 `.vmx` 文件，用记事本打开。
* 确认 `ethernet0.virtualDev = "e1000e"` (如果不是，建议改为这个，兼容性好)。
* 在最后一行添加 `disk.EnableUUID = "TRUE"` (这对群晖识别硬盘很重要)。

---

### 第四阶段：系统安装与初始化

1. **启动虚拟机**：在 VMware 中开启虚拟机。
2. **编译引导**：
    * 看到的将会是一个类似 DOS 的界面 (RR/ARC 菜单)。
    * 选择 `Build the loader` (或者自动模式)，选择型号 (建议 **DS918+** 或 **DS920+**)，系统会自动识别并编译驱动。
    * 编译完成后，选择 `Boot the loader`。
3. **安装 DSM**：
    * 等待 2-5 分钟。
    * 在浏览器输入 `http://find.synology.com` 或者去路由器后台查看新设备的 IP 地址。
    * 进入安装向导，选择 **"从计算机手动上传 .pat 文件"** (去群晖官网下载对应型号 DS918+ 的 7.2 系统包)。
    * **注意**：不要开启自动更新系统。

---

### 第五阶段：必做配置与优化

1. **固定 IP**：在群晖控制面板 -> 网络 -> 网络界面，将 IP 设置为静态 (例如 192.168.1.200)，防止重启后 IP 变动。
2. **防止 Windows 休眠**：
    * 宿主 Windows 必须设置为 **"从不睡眠"**。
    * 建议开启 BIOS 中的 **"AC Power Recovery"** (来电自启)，并设置 Windows 自动登录 + 启动组里放入 VMware 自动启动脚本。
3. **内网穿透 (实现外网访问)**：
    * 由于是虚拟机，最简单的方案是安装 **Tailscale** 或 **ZeroTier** 套件 (群晖套件中心或 Docker 安装)。
    * 如果有公网 IP，在路由器做端口映射 (5000/5001) 指向 NAS 的 IP。

---

### 替代方案：如果不喜欢群晖

如果你担心黑群晖的稳定性，或者想要更轻量/正版的方案：

**方案 B：CasaOS (基于 Linux)**

1. VMware 安装 Ubuntu Server 22.04/24.04 (LTS)。
2. 在 Ubuntu 里运行一行命令安装 CasaOS。
3. **优点**：界面极简，Docker 管理方便，纯正 Linux 环境，轻量，稳定。

**方案 C：TrueNAS Scale**

1. VMware 直接安装 TrueNAS Scale ISO。
2. **优点**：ZFS 文件系统数据最安全，开源免费。
3. **缺点**：对内存要求高 (建议 8G+)，操作界面比较专业，不适合小白。

---

### 总结与风险提示

1. **性能损耗**：Windows 本身占用资源，虚拟机 NAS 的磁盘读写速度大约是物理机安装的 80%-90%，但千兆局域网内基本跑满，无感知。
2. **稳定性**：Windows Update 自动重启是最大的敌人。**务必暂停或配置组策略禁止 Windows 自动重启更新**。
3. **数据备份**：虽然是 NAS，但建议重要数据定期冷备份到移动硬盘 (RAID 不是备份)。

这套方案实施下来，你将拥有一台功能完整的 NAS，同时不影响原电脑的正常使用（上网、办公、看视频）。

这是一个非常明智的决定。**Rocky Linux 9** 和 **AlmaLinux 9** 都是 RHEL 9 (Red Hat Enterprise Linux 9) 的 1:1 下游发行版。

相比 CentOS 7，它们的优势在于：

* **内核更新**：Linux Kernel 5.14+（更好的硬件兼容性和性能）。
* **软件源**：DNF 包管理器（比 Yum 更快更现代）。
* **安全性**：更现代的加密标准和 SELinux 策略。
* **生命周期**：支持到 2032 年，长期无忧。

以下是基于 **Rocky Linux 9 / AlmaLinux 9** 的 Windows 虚拟机 NAS 实施方案。

---

### 第一阶段：准备工作

1. **下载镜像**：
    * 访问 [Rocky Linux 官网](https://rockylinux.org/download) 或 [AlmaLinux 官网](https://almalinux.org/isos/)。
    * **推荐版本**：**Minimal ISO** (x86_64)。同样不需要图形界面，体积小（约 1.5GB），开销低。

2. **VMware 虚拟机配置**：
    * **创建**：选“典型” -> “稍后安装操作系统”。
    * **版本**：选择 **Red Hat Enterprise Linux 9 (64-bit)** 或 **Other Linux 5.x kernel 64-bit**。
    * **配置**：
        * **CPU**：2核。
        * **内存**：建议 **2GB - 4GB**（EL9 比 CentOS 7 稍微吃一点内存，2GB 起步比较稳妥）。
        * **网络**：务必选择 **“桥接模式” (Bridged)**。

---

### 第二阶段：系统安装 (EL9 与 C7 的细微差别)

1. **启动安装**：
    * 选择 `Install Rocky Linux 9` (或 AlmaLinux 9)。
2. **语言**：建议 English 或 中文。
3. **Installation Destination (磁盘)**：
    * 选择系统盘，Storage Configuration 选 Automatic 即可。
4. **Software Selection (软件)**：
    * 确认是 **Minimal Install**。
    * 右侧可以勾选 **Guest Agents** (优化 VMware 体验) 和 **Standard**。
5. **Network & Host Name (网络)**：
    * **重要**：点击 Configure，设置 IPv4 为 Manual (静态 IP)，例如 `192.168.1.200`，网关 `192.168.1.1`。
    * **打开网卡开关**，确保 Connected。
6. **User Settings (用户)**：
    * **Root Password**：设置 Root 密码（如果不勾选 "Allow root SSH login with password"，后面 SSH 会连不上 Root，建议勾选方便局域网管理）。
    * **User Creation**：创建一个普通用户。

---

### 第三阶段：基础环境配置

Rocky/Alma 9 使用 `dnf` 命令代替了 `yum`（虽然输入 yum 也能用，但在 9 里它是 dnf 的别名）。

1. **SSH 登录**：
    使用 Windows 终端或 Putty/Xshell 登录你的 IP。

2. **更新系统**：

    ```bash
    dnf update -y
    ```

3. **安装基础工具**：
    *注意：EL9 默认不再安装 `ifconfig`，改用 `ip addr`。如果想要旧命令，需安装 `net-tools`。*

    ```bash
    dnf install -y vim wget net-tools tar epel-release
    ```

4. **检查网络** (如果在安装时没设好静态 IP)：
    EL9 推荐使用 `nmtui` (图形化终端界面) 修改网络，比改文件方便得多。

    ```bash
    nmtui
    ```

    * `Edit a connection` -> 选中网卡 -> IPv4 `Manual` -> 填写 -> OK -> Back -> `Activate a connection` (停用再启用以生效)。

---

### 第四阶段：挂载数据盘 (存储核心)

和 CentOS 7 逻辑一致，但文件系统依然推荐 **XFS**。

1. **查看磁盘**：

    ```bash
    lsblk
    ```

    假设新加入的数据盘是 `/dev/sdb`。

2. **格式化与挂载**：

    ```bash
    mkdir -p /data
    mkfs.xfs -f /dev/sdb
    mount /dev/sdb /data
    ```

3. **开机自动挂载**：

    ```bash
    # 获取 UUID
    blkid /dev/sdb 
    
    # 编辑 fstab
    vim /etc/fstab
    ```

    添加：

    ```text
    UUID=你的UUID值  /data  xfs  defaults  0  0
    ```

    测试：`mount -a` (如果没报错说明成功)。

---

### 第五阶段：部署 Samba 服务 (文件共享)

**注意：EL9 的安全性较高，SELinux 默认开启且严格。** 这是新手最容易翻车的地方（能连上但无权限访问）。

1. **安装 Samba**：

    ```bash
    dnf install -y samba samba-common samba-client
    ```

2. **配置共享文件夹**：

    ```bash
    mkdir -p /data/share
    chmod -R 777 /data/share
    ```

3. **配置 smb.conf**：
    `vim /etc/samba/smb.conf`
    在文件末尾添加：

    ```ini
    [NAS_Share]
            path = /data/share
            browsable = yes
            writable = yes
            guest ok = no
            valid users = nasuser
            create mask = 0775
            directory mask = 0775
    ```

4. **添加用户**：

    ```bash
    useradd nasuser
    smbpasswd -a nasuser
    ```

5. **关键步骤：处理 SELinux 和 防火墙**

    * **方法一（推荐）：设置正确的 SELinux 上下文**
        如果你想保持安全，告诉 SELinux 这个目录是用来共享的：

        ```bash
        # 设置上下文
        chcon -t samba_share_t /data/share
        
        # 放行防火墙
        firewall-cmd --permanent --add-service=samba
        firewall-cmd --reload
        ```

    * **方法二（偷懒）：将 SELinux 设为宽容模式**
        如果你不想折腾权限问题：

        ```bash
        setenforce 0
        sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
        
        # 关闭防火墙 (仅限内网安全环境)
        systemctl stop firewalld
        systemctl disable firewalld
        ```

6. **启动服务**：

    ```bash
    systemctl enable --now smb nmb
    ```

此时，Windows 应该可以访问 `\\192.168.x.x` 了。

---

### 第六阶段：现代化管理面板 (Cockpit)

**Cockpit 是 Rocky/Alma 9 自带的官方 Web 管理界面，极其好用。**

1. **启用 Cockpit**：
    EL9 通常预装了 Cockpit 核心，只需启用：

    ```bash
    systemctl enable --now cockpit.socket
    
    # 确保防火墙放行 (如果防火墙开着)
    firewall-cmd --permanent --add-service=cockpit
    firewall-cmd --reload
    ```

2. **安装文件共享插件** (可选，用于图形化管理 Samba)：
    45Drives 开发了一个很好的 Cockpit 插件，可以图形化管理 Samba 和 NFS。

    ```bash
    wget https://github.com/45Drives/cockpit-file-sharing/releases/download/v3.3.4/cockpit-file-sharing-3.3.4-1.el8.noarch.rpm
    dnf install -y ./cockpit-file-sharing-3.3.4-1.el8.noarch.rpm
    ```

    *(注：虽然文件名写着 el8，但在 el9 上通常兼容，或者直接去该项目 GitHub 找最新版)*

3. **访问**：
    浏览器打开 `https://<NAS-IP>:9090`。
    使用系统的 `root` 或 `nasuser` 账号登录。
    你可以看到 CPU、内存、磁盘、网络流量图，甚至网页版的 Terminal。

---

### 第七阶段：安装 Docker (可选，用于跑 Jellyfin 等)

Rocky/Alma 9 默认推崇 `Podman`，但如果你习惯 Docker，安装步骤如下：

1. **添加 Docker 源**：

    ```bash
    dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    ```

2. **安装 Docker**：

    ```bash
    dnf install -y docker-ce docker-ce-cli containerd.io
    ```

3. **启动**：

    ```bash
    systemctl enable --now docker
    ```

4. **安装 CasaOS (可选)**：
    如果你想要群晖那样的应用界面：

    ```bash
    curl -fsSL https://get.casaos.io | sudo bash
    ```

### 总结方案优势

1. **稳定性**：Rocky/Alma 9 是企业级系统，极其稳定。
2. **可视化**：利用 **Cockpit**，你拥有了原生的、消耗资源极低的可视化监控。
3. **扩展性**：基于 Docker，可以安装 Nextcloud (私有云盘)、Jellyfin (影音库)、Transmission (下载)。
4. **维护**：`dnf update` 即可保持系统安全更新。

这个方案比 CentOS 7 更面向未来，且比黑群晖更透明、可控。
