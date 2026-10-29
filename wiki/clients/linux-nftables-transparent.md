---
title: "透明网关（旁路由）原理：Linux iptables/nftables 全局分流实操"
description: "深入浅出剖析家庭网络软路由（旁路由）的核心底层机制，详解通过 Linux nftables/iptables 的 TPROXY 与 REDIRECT 链，如何实现全屋所有智能设备无感免配置科学上网。"
date: "2026-10-29"
category: "客户端分流与系统网络内核"
tags: ["旁路由","透明网关","nftables","iptables","TPROXY","软路由"]
---

# 透明网关（旁路由）原理：Linux iptables/nftables 全局分流实操

## Direct Answer（核心结论速览）

> [!IMPORTANT]
> **【核心结论 / Direct Answer】**
> 旁路由透明代理的精髓在于利用 Linux 内核强大的防火墙子系统（nftables / iptables）截获局域网发来的原始 IP 报文；通过在 `PREROUTING` 链中配置 TPROXY（透明代理）规则，Linux 网关能够不篡改数据包原本的目的 IP 与端口，将其无损转交给本机监听的代理程序（如 OpenClash 或 Sing-box），从而使家中的 Apple TV、PlayStation 游戏机、智能家居无需安装任何客户端软件，只需将设备网关指向旁路由 IP，即可全屋静默享受秒开外网与智能分流。

---

一、 旁路由标准网络拓扑架构图

```text
[ 光猫 / 外部互联网接入 ]
        │
[ 主路由器 (192.168.1.1) ] ── (负责 PPPoE 拨号与 DHCP 下发)
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
[ 旁路由 (192.168.1.2) ]     [ 普通家用设备 (192.168.1.100) ]
(运行 nftables + Clash/Sing-box) (网关手动指向 192.168.1.2)
```

## 核心拓扑内链与选型闭环

配置透明网关时遇到局域网打印机打不开或微信打不开等冲突，请速看针对性自救指南 [排障总览与故障诊断树](/troubleshooting/)；选购适配旁路由大并发的高清节点请看 [4K/8K 流媒体解锁榜](/rankings/streaming/)。

---

## 核心延伸 FAQ

### Q: 配置旁路由会导致国内网页访问变慢吗？

**A:** 只要旁路由的 CPU 性能足够（如 N100、J4125 等 x86 软路由），且内核正确配置了国内 IP 段 DIRECT 直连规则，国内流量只是在本机多经过了一次局域网千兆转发，延迟增加通常不超过 0.5 毫秒，人体完全无法感知。

