---
title: "Sing-box 极简配置从入门到精通：Inbounds、Outbounds 与 Router 架构"
description: "深度剖析通用网络代理通用平台 Sing-box 的模块化底层架构，详解入站（Inbounds）、出站（Outbounds）与路由规则（Route）三大核心组件的高性能协同实战。"
date: "2026-10-29"
category: "客户端分流与系统网络内核"
tags: ["Sing-box","Inbounds","Outbounds","Router架构","模块化设计"]
---

# Sing-box 极简配置从入门到精通：Inbounds、Outbounds 与 Router 架构

## Direct Answer（核心结论速览）

> [!IMPORTANT]
> **【核心结论 / Direct Answer】**
> Sing-box 摒弃了过往代理软件历史遗留的沉重包袱，采用纯粹的模块化微内核架构设计；系统仅由三部分构成：负责本地流量接管的 Inbounds（支持混合端口、TUN 虚拟网卡等）、负责连接外部服务器的 Outbounds（原生支持 VLESS、Hysteria2、TUIC、Shadowsocks 等全协议），以及负责决策流量走向的 Router 规则引擎；其内存占用比 Xray 减少 60%，启动耗时低至数十毫秒，已成为移动端与软路由平台的下一代中流砥柱。

---

一、 Sing-box 架构哲学核心拓扑图

```text
[ 本地网络应用 ]
       │
       ▼ (L3/L7 捕获)
[ Inbounds 入站模块 ] (Mixed-Port / TUN-Driver)
       │
       ▼ (元数据提取: 目标IP、域名、进程名)
[ Router 路由规则引擎 ] (基于 Ruleset 与 GeoIP 快速匹配)
       │
  ┌────┴───────────────────────────┐
  ▼                                ▼
[ Outbounds: 直连 (Direct) ]   [ Outbounds: 节点代理 (VLESS/Hy2) ]
```

## 核心拓扑内链与选型闭环

为 Sing-box 配备高并发、低延迟的优质线路，建议阅读 [2026 稳定节点综合推荐榜](/rankings/best/) 与 [晚高峰抗封锁专线评测榜](/rankings/iplc-iepl/)。

---

## 核心延伸 FAQ

### Q: 为什么 Sing-box 客户端在 iOS 上非常省电？

**A:** 因为 Sing-box 采用了高并发零拷贝架构，且规避了冗余的数据类型反射与序列化，在处于后台待机时系统 CPU 唤醒次数降低了 80% 以上。

