# TUN 虚拟网卡模式启动断网与驱动冲突：Wintun 崩溃与网卡跃点优先级彻底修复指南

> [!IMPORTANT]
> **【Direct Answer / TUN 模式 30 秒急救法则】**
> TUN 模式（TUN Interface）直接在操作系统的 **第 3 层（网络层）** 创建虚拟网络适配器，从内核协议栈直接接管整机所有 TCP/UDP 流量。开启后突发全局断网，**核心根因通常是因为【Wintun 驱动权限不足未安装成功】、【默认路由跃点数（Metric）抢占了真实物理网卡导致环回死锁】或【DNS 栈未正确配置导致无法解析】**，或者由于系统代理与 TUN 模式产生路由互斥、以及与 WSL2/VMware 虚拟网卡发生网段重叠冲突。
> 遇到开启 TUN 模式断网，请立即按 **3 步速通指令** 执行排障急救：
> 1. **右键以管理员权限重启客户端并安装服务模式**：确保客户端获得注册系统服务（Service Mode）与调用 `wintun.dll` 底层驱动的最高权限；
> 2. **命令重置 Interface Metric 跃点数**：运行 `Set-NetIPInterface -InterfaceAlias "*wintun*" -InterfaceMetric 1`，将物理网卡跃点修改为 `20` 以上，杜绝路由环回死锁；
> 3. **排查虚拟适配器 IP 分配与清理残留旧驱动**：进入设备管理器卸载失效的旧版 TAP/Wintun 虚拟网卡，执行 `netsh winsock reset` 重置网络栈后重启系统。

---

## 01 TUN 模式断网常见报错代码与排查矩阵大表

当 TUN 虚拟网卡在操作系统底层遭遇驱动缺失、路由死锁或系统权限冲突时，客户端核心日志中会抛出明确的技术错误码。请对照下表快速锁定根因并应用一键修复方案：

| 报错日志特征 / 现象代码 | 适用操作系统 | 底层冲突根因 | 一键修复命令 / 解决方案 | 解决复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| `Wintun create adapter failed: Access is denied` | Windows 10/11 | 客户端未获取 UAC 管理员提权，无权限向 Windows 内核注册适配器句柄。 | 退出客户端，右键选择「以管理员身份运行」，并安装 **Service Mode（服务模式）**。 | ★☆☆☆☆ |
| `failed to start TUN: wintun.dll missing or broken` | 精简版 Windows / Ghost Win | 操作系统精简了微软官方数字签名证书链，或杀毒软件将 `wintun.dll` 误杀拦截。 | 手动导入微软官方根证书；将客户端主目录加入 Windows Defender 信任白名单。 | ★★☆☆☆ |
| `TUN 开启后微信 QQ 掉线 / 网页正常即时通讯全断` | Windows / macOS | TUN 启用了全量路由接管，但未放行局域网私有网段（Bypass LAN 规则失效导致直连失败）。 | 配置文件中声明 `auto-detect-interface: true`，并将局域网网段加入直连路由。 | ★★☆☆☆ |
| `configure tun interface: file exists / metric conflict` | Windows / Linux | 虚拟网卡接口跃点（Metric）与物理 Wi-Fi/以太网卡冲突，引发**默认网关环回死锁**。 | 使用 PowerShell 将 TUN 网卡跃点设为 `1`，并将物理网卡跃点手动提升至 `20` 以上。 | ★★★☆☆ |
| `WSL2 与 TUN 虚拟网卡网段冲突 / 全局断网` | Windows 11 | WSL2 虚拟交换机与 TUN 适配器默认下发了相同的 `172.x.x.x` 或 `198.18.x.x` 私有网段。 | 在 `.wslconfig` 中将 WSL2 运行模式修改为 `networkingMode=mirrored`（镜像网络模式）。 | ★★★☆☆ |
| `TUN 模式局域网打印机无法连接 / NAS 搜不到` | Windows / macOS | 客户端启用了 `strict-route: true`（严格路由），操作系统的物理私有路由被全部抹除。 | 配置文件中关闭严格路由：修改为 `strict-route: false`，并放行本地多播与广播。 | ★★☆☆☆ |
| `关闭 TUN 后网络无法恢复 / DNS 报 127.0.0.1` | 全平台 | 客户端异常退出未能卸载 TUN 虚拟网卡，遗留了错误的默认路由与本地回环死锁 DNS。 | 运行 `netsh int ip reset` 与 `ipconfig /flushdns`，将系统适配器 DNS 复位为 DHCP。 | ★☆☆☆☆ |

---

## 02 核心技术机制深度剖析：系统内核与网络协议栈竞争

要彻底根治 TUN 模式开启断网、Wintun 驱动报错与虚拟网卡冲突，必须深入理解其在操作系统网络栈中的底层工作机制。

```mermaid
graph TD
    A[应用程序发起网络请求 Socket] --> B{流量接管层级}
    B -->|普通系统代理 (第7层)| C[仅接管浏览器/主动读取环境变量的应用]
    B -->|TUN 模式 (第3层)| D[内核级虚拟网卡 Adapter: Meta/Wintun]
    D --> E[IP 协议栈封包与路由裁决]
    E -->|目标为局域网 IP / 多播广播| F[直连物理以太网/Wi-Fi 网卡放行]
    E -->|目标为海外公网 IP| G[本地客户端核心分流引擎 (Mihomo/Sing-Box)]
    G --> H[加密代理隧道发往远程节点]
    C -.->|终端Git/联机游戏/UWP绕过| I[裸连出站被墙阻断或高延迟超时]
```

### 1. Wintun 驱动的工作逻辑与崩溃原因剖析
在早期的代理工具时代，Windows 普遍依赖 OpenVPN 项目开发的 **TAP-Windows** 虚拟网卡驱动。
- **TAP 驱动的二层瓶颈**：TAP 驱动工作在数据链路层（OSI 第 2 层），必须模拟以太网帧、虚拟 MAC 地址与 ARP 广播响应。这导致每一批数据包都要经过内核层与用户层之间的两次内存拷贝，不仅 CPU 占用极高，而且在大并发、千兆吞吐下频繁出现丢包死锁。
- **Wintun 驱动的三层革新**：现代客户端（如 Clash Verge Rev、Mihomo、Sing-Box）全面采用由 WireGuard 团队研发的高性能 **Wintun 驱动**。Wintun 直接运行在网络层（OSI 第 3 层），专为原生处理纯 IP 数据包（Raw IP Packets）而设计，吞吐性能相比 TAP 驱动提升了 400% 以上，内存常驻开销缩减到微秒级别。

> [!WARNING]
> **精简版 Windows 系统的“Code 52 驱动崩溃”陷阱**：
> 许多在第三方网站下载的“精简版 Win10/Win11”移除了微软的 **加密驱动程序强制签名证书链（Windows Driver Signature Verification）与 Windows 基础服务**。
> 当代理客户端尝试调用 `wintun.dll` 向内核动态注册虚拟网卡句柄时，内核安全子系统因校验失败直接抛出：
> `Wintun create adapter failed: 驱动程序数字签名无法验证 (Code 52)`
> 此时系统拒绝加载网卡，导致 TUN 模式开启失败或直接瘫痪整机网络。此外，部分国产杀毒软件会粗暴地将 `wintun.dll` 识别为“驱动级后门”并静默移入隔离区，这也是许多用户排查许久无果的深层暗礁。

### 2. 默认路由与网卡跃点数（Interface Metric）竞争机制
当你的电脑插着物理网线、连接着无线 Wi-Fi，又同时开启了 TUN 虚拟网卡时，操作系统内部实际上同时存在多个网络适配器。**操作系统依靠“路由跃点数（Metric）”来裁决每个数据包从哪块网卡发出：Metric 数值越小，优先级越高！**

- **健康状态的标准跃点拓扑**：
  * TUN 虚拟网卡（Wintun）的 Metric 被客户端自动设为 **`1`**（最高出站优先级）；
  * 物理网卡（以太网/Wi-Fi）的 Metric 保持在 **`20`** 至 **`35`** 之间；
  * 操作系统的默认路由 `0.0.0.0/0` 会优先将所有出站流量导向 TUN 虚拟网卡进行规则分流。
- **故障状态（环回死锁与直连迷路）**：
  * **场景 A（物理网卡抢占）**：物理网卡驱动开启了“强制自动跃点”，将其锁定为 `1`，而 TUN 适配器未能成功抢占（被系统默认分配为 `50`）。此时数据包完全不进 TUN 网卡，导致代理规则彻底失效，出现“Clash TUN 模式没网”的表象；
  * **场景 B（路由环回死锁 Routing Loop）**：代理客户端将流量打包加密后，必须通过物理网卡发往远程节点服务器。如果 TUN 网卡错误地将发往远程节点的流量再次接管并倒灌进自己体内，就会在本地形成致命的 **死循环环回**，导致整机 CPU 占用瞬间飙升至 100%，网络在 3 秒内全局中断。

### 3. 局域网隔离与多虚拟网卡互斥（NAS / 打印机 / 虚拟机碰撞）
很多技术人员发现：只要开启 TUN 模式，局域网内的群晖 NAS 网页打不开、办公室网络打印机搜不到，或者 WSL2 / VMware 虚拟机彻底断网。这是由于底层多网卡互斥导致的：
- **严格路由策略（Strict Route）引发的局域网失联**：部分客户端默认启用了 `strict-route: true`。该参数为了防止 DNS 泄漏，会强行向 Windows 路由表注入黑洞路由或清空物理网卡的多播路由。副作用是，局域网私有网段（`192.168.0.0/16`、`10.0.0.0/8`）与局域网设备发现（mDNS/SSDP）被无差别绞杀。
- **虚拟机网段碰撞（WSL2 / Hyper-V / Docker / VMware）**：Windows 11 上的 WSL2 虚拟交换机与 Docker 通常会默认下发 `172.17.0.0/16` 至 `172.31.0.0/16` 的子网。如果 TUN 虚拟网卡分配的内部虚拟网段（或 Fake-IP 地址池）恰好与 WSL2 虚拟网卡重叠，两张网卡在内核层抢夺相同的 IP 路由前缀，会导致内核路由表冲突崩溃。更多 DNS 抢占与 Fake-IP 冲突排查，可阅读 [DNS 污染劫持与真实 IP 泄漏排查](/troubleshooting/dns-leak/)。

---

## 03 手把手排障实操：4 步彻底根治 TUN 驱动与跃点故障

遇到 TUN 模式开启即断网时，请按照以下工业级标准化网络工程流程执行系统级修复：

### 第一步：彻底卸载残留旧版网卡驱动并以服务模式安装
当多次安装、卸载不同代理工具（如旧版 Clash for Windows、v2rayN、OpenVPN、WireGuard）后，Windows 设备管理器中往往残留了多个失效的虚拟网卡句柄，导致新驱动无法创建网卡（报错 `Wintun create adapter failed`）。

#### 1. 设备管理器彻底清理残留网卡
1. 按快捷键 `Win + X`，在弹出的高级菜单中点击打开 **「设备管理器」**；
2. 展开 **「网络适配器 (Network adapters)」** 目录；
3. 查找并定位带有以下名称的失效/冲突虚拟网卡：
   - `Wintun Userspace Tunnel`
   - `TAP-Windows Adapter V9`
   - `Clash Core Tunnel` / `Meta Core Adapter`
4. 右键点击这些网卡，选择 **「卸载设备」**，并**务必勾选“尝试为此设备删除驱动程序软件”**；
5. 卸载完毕后，点击顶部菜单栏的「操作」->「扫描检测硬件改动」。

#### 2. 安装 Service Mode（服务模式）
客户端必须以系统原生服务（Windows Service）的形式常驻，才能在受限账户下获得最高权限动态创建驱动：
- 在 **Clash Verge Rev** 中：进入「设置 (Settings)」-> 找到「服务模式 (Service Mode)」-> 点击「安装 (Install)」，UAC 提示选择「是」。安装成功后图标转为绿色小盾牌。
- 在 PowerShell 管理员窗口中验证守护服务是否健康运行：
  ```powershell
  # 查看 Clash Verge / Mihomo 底层系统服务状态
  Get-Service -Name "clash_verge_service" | Select-Object Name, Status, StartType
  ```
  > 若输出显示 `Status: Running` 且 `StartType: Automatic`，说明内核底层已就绪。

---

### 第二步：PowerShell 批量查看与修改网络适配器接口跃点（解决路由抢占）
若开启 TUN 后只有浏览器能联网，或者微信、游戏频繁掉线，说明 Windows 网卡接口跃点优先级发生错乱。

以管理员身份启动 **PowerShell**，执行接口排查与批量跃点注入：

```powershell
# =========================================================
# 1. 查询当前系统所有活动的 IPv4 网络适配器与跃点优先级
# =========================================================
Get-NetIPInterface -AddressFamily IPv4 | Select-Object ifIndex, InterfaceAlias, InterfaceMetric, ConnectionState | Sort-Object InterfaceMetric
```

在返回的表格中，定位你的物理网卡（名称通常为 `WLAN` 或 `以太网`）以及 TUN 虚拟网卡（名称通常为 `Meta`、`wintun` 或 `Clash`）。

```powershell
# =========================================================
# 2. 强制将 TUN 虚拟网卡跃点数设置为 1 (抢占最高流量接管权)
# =========================================================
Set-NetIPInterface -InterfaceAlias "*Meta*" -InterfaceMetric 1 -ErrorAction SilentlyContinue
Set-NetIPInterface -InterfaceAlias "*wintun*" -InterfaceMetric 1 -ErrorAction SilentlyContinue
Set-NetIPInterface -InterfaceAlias "*Clash*" -InterfaceMetric 1 -ErrorAction SilentlyContinue

# =========================================================
# 3. 将物理 Wi-Fi 与以太网卡跃点手动提升至 20 以上
# (避免物理网卡与虚拟网卡抢夺 0.0.0.0/0 默认路由导致环回死锁)
# =========================================================
Set-NetIPInterface -InterfaceAlias "WLAN" -InterfaceMetric 20 -ErrorAction SilentlyContinue
Set-NetIPInterface -InterfaceAlias "以太网" -InterfaceMetric 20 -ErrorAction SilentlyContinue
```

> [!TIP]
> 上述 PowerShell 命令即时生效，无需重启计算机。通过赋予 TUN 网卡极高优先级（Metric 1），操作系统的网络流量将稳定流向虚拟网卡分流引擎。

---

### 第三步：客户端 TUN 配置文件核心参数最佳实践

在多数情况下，TUN 模式开启断网是由于配置文件中指定的协议栈模型（Stack）与当前操作系统的网络内核不兼容。

#### 1. Mihomo / Clash Verge Rev 正确 YAML 配置参数
打开客户端的扩展配置或运行时配置，确保 `tun` 与 `dns` 模块满足工业级规范：

```yaml
# =========================================================
# 标杆级高性能 TUN 虚拟网卡调优配置 (Mihomo / Clash Verge Rev)
# =========================================================
tun:
  enable: true
  stack: mixed                  # 选型推荐: mixed (兼顾高吞吐与多并发防死锁)
  device: Meta                  # 统一命名虚拟适配器设备
  auto-route: true              # 自动配置系统全局默认路由
  auto-detect-interface: true   # 自动探测主物理网卡，防止多网卡发生环回死锁
  dns-hijack:
    - "tcp://any:53"            # 强制拦截所有本地进程发往 53 端口的明文 DNS
    - "udp://any:53"
  strict-route: false           # 务必设为 false，确保局域网打印机、NAS 与本地共享完全互通
  endpoint-independent-nat: true# 开启全锥型 NAT (Full Cone)，极大幅度优化联机游戏与 P2P 体验

# 必须搭配健康的 DNS 模块避免解析黑洞
dns:
  enable: true
  enhanced-mode: fake-ip        # 配合 fake-ip 模式以实现 0 毫秒首包解析
  fake-ip-range: 198.18.0.1/16
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
```

#### 2. Sing-Box 核心 JSON 配置参数
对于使用 Sing-Box 核心的进阶用户，其 Inbound TUN 模块推荐配置如下：

```json
{
  "inbounds": [
    {
      "type": "tun",
      "tag": "tun-in",
      "interface_name": "sing-box-tun",
      "inet4_address": "172.19.0.1/30",
      "auto_route": true,
      "strict_route": false,
      "stack": "mixed",
      "sniff": true,
      "sniff_override_destination": false
    }
  ],
  "route": {
    "auto_detect_interface": true
  }
}
```

#### 协议栈模式（Stack: system / gvisor / mixed）深度选型指南：
- **`system`（系统原生网络栈）**：调用 Windows/Linux 内核的原生协议栈处理 IP 数据包。性能最高、内存占用极低（几乎为零额外开销），千兆满速跑满下载首选；但在精简版 Windows 或网络栈受损的机器上容易崩溃。
- **`gvisor`（用户态沙盒网络栈）**：基于 Google 开发的用户态网络栈。完全在应用层处理封包，安全性极高，完全免疫操作系统底层驱动故障，但在高并发大流量下载时单核 CPU 占用率偏高。
- **`mixed`（混合协议栈 - 强烈推荐首选）**：TCP 流量走系统栈享受原生吞吐，UDP 流量走 gVisor 保证绝对防断流与防泄漏，完美平衡性能与稳定性。

若修改配置后仍有异常，请结合 [节点全红 Timeout 与 0ms 诊断](/troubleshooting/timeout/) 排查节点网络入口；若关闭 TUN 改用普通代理后依然打不开网页，请参考 [连通成功但网页打不开](/troubleshooting/connected-no-internet/) 复位系统注册表。

---

### 第四步：WSL2 虚拟机网络网段冲突终极解决方案

针对使用 WSL2、Hyper-V 或 Docker Desktop 的开发者，TUN 模式开启后往往导致虚拟机无法联网或宿主机断网。

在用户根目录（`C:\Users\<你的用户名>\.wslconfig`）中创建或修改配置文件，启用 Windows 11 最新的 **镜像网络模式（Mirrored Networking）**：

```ini
# C:\Users\<你的用户名>\.wslconfig
[wsl2]
networkingMode=mirrored       # 开启镜像网络模式，WSL2 与宿主机完全共享同一网卡与代理环境
dnsTunneling=true             # 开启 DNS 隧道，防止 WSL2 内 DNS 污染
autoProxy=true                # 自动将宿主机代理同步给 Linux 子系统
```

配置保存后，在 PowerShell 管理员窗口中重启 WSL2 虚拟机即可完美解决冲突：
```powershell
wsl --shutdown
```

---

## 04 常见问题 FAQ（高频疑难技术问答）

### Q1：TUN 模式和普通的“系统代理”有什么本质区别，为什么游戏和命令行必须开 TUN？
> **核心解答**：
> 它们的接管层级存在根本性的代差：
> 1. **系统代理（System Proxy）** 属于 **应用层（OSI 第 7 层）代理**：它仅仅在系统注册表中写入一个代理端口（如 `127.0.0.1:7890`）。只有主动读取该注册表项的软件（如 Edge、Chrome 浏览器）才会走代理。**PowerShell、CMD 终端命令行、Git、Steam 客户端、Telegram 桌面版以及所有外服网络游戏完全无视系统代理**，流量直接裸连出站。
> 2. **TUN 模式** 属于 **网络层（OSI 第 3 层）虚拟网卡代理**：它在操作系统安装了一张真实的虚拟网卡，从底层驱动直接捕获网卡的所有原始 IP 数据包。不论软件是否支持代理协议，所有流量无差别被接管分流。

### Q2：为什么开启 TUN 之后，远程桌面（RDP）或者 TeamViewer / 向日葵会直接断开？
> **核心解答**：
> **这是由于默认的 TUN 全局路由接管了远程控制的入站连接，打破了 TCP 握手的对称性（Asymmetric Routing）**。
> 当外界通过公网 IP 或局域网向你的电脑发起 RDP 远程桌面连接时，握手包通过物理网卡进入；而当你的电脑回推响应包时，被 TUN 虚拟网卡的全局默认路由强行捕获并转发到了海外代理节点。外界客户端收到了来自海外节点的异常响应，触发安全重置，导致远程连接秒断。
> **解决办法**：在 TUN 配置中确保开启 `auto-detect-interface: true`，并将远程连接客户端的进程加入分流规则中的 `DIRECT`（直连名单）。

### Q3：使用 gVisor 模式和 System 模式哪个性能更好更稳定？
> **核心解答**：
> 两者各有利弊，取决于你的硬件配置与系统环境：
> 1. **性能对比**：`System` 模式由操作系统内核处理数据包，吞吐极限明显优于 `gVisor`，在跑满千兆带宽或高速下载时 CPU 占用更低；
> 2. **稳定性对比**：`gVisor` 模式在用户态沙盒中运行独立协议栈，即使系统网络驱动破损或遭到第三方软件篡改，也不会发生蓝屏崩溃或内核死锁，稳定性极佳。
> **生产级推荐**：日常使用首选 **`mixed`（混合模式）**，兼收两者之长。

### Q4：关闭 TUN 模式后电脑彻底无法上网该怎么一行命令还原？
> **核心解答**：
> 许多用户在强制结束客户端或电脑非正常关机后，发现虚拟网卡残留导致断网。按 `Win + X` 打开终端运行以下自救指令：
> ```cmd
> netsh winsock reset && netsh int ip reset && ipconfig /flushdns
> ```
> 执行完毕后重启系统，Windows 会自动清空所有未销毁的虚拟网卡路由并复位物理网络。系统代理冲突排查可进一步查阅 [网络分流急救综合手册](/troubleshooting/guide/)。

### Q5：为什么配合某些廉价机场开启 TUN 模式后，瞬间并发剧增导致直接断流？
> **核心解答**：
> TUN 模式接管了操作系统的全量网络交互（包括大量系统后台遥测、NTP 对时、微服务握手与 UDP 高并发查询）。这对于服务商节点的带宽吞吐和并发连接数承载力提出了极高的工程要求。
> 许多廉价的“月抛超售机场”为了节省成本限制了单用户并发连接数（如只允许 50 个并发连接），甚至对 UDP 协议实施了粗暴的丢包限速。一旦开启 TUN 模式，瞬间并发的大量数据包会直接挤爆连接池，导致节点限速卡死。选购避坑请参阅 [新手选购 8 大避坑法则](/buying/traps/)，追求极致稳定性建议选型 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。

---

## 05 拓扑内链导航与故障急救全景索引

- 返回排障决策全景树按现象定位问题 -> [排障总览与故障诊断树](/troubleshooting/)
- 本地系统代理与虚拟网卡死锁综合急救 -> [网络分流急救综合手册](/troubleshooting/guide/)
- 开启 TUN 后节点列表全红 Timeout 或 0ms 排查 -> [节点全红 Timeout 与 0ms 诊断](/troubleshooting/timeout/)
- 关闭 TUN 改用系统代理依然无法加载网页 -> [连通成功但网页打不开](/troubleshooting/connected-no-internet/)
- TUN 虚拟网卡环境下的 DNS 污染防范 -> [DNS 污染劫持与真实 IP 泄漏排查](/troubleshooting/dns-leak/)
- 节点带宽被黑心商家限速导致卡死避坑 -> [新手选购 8 大避坑法则](/buying/traps/)
- 挑选具备原生高吞吐支持、适合配合 TUN 模式全局代理的顶级专线 -> [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)
