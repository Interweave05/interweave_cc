---
title: '一个长期维护的 PVZ 源码仓库'
published: 2026-10-24
description: '基于已有逆向工程项目，记录植物大战僵尸源码的本地构建、代码阅读与功能改造，持续探索这款经典游戏的实现。'
image: ''
tags: ['C++']
category: '开源'
draft: false
lang: 'zh-CN'
---

::github{repo="Interweave05/re-plants-vs-zombies"}

---

## 项目结构

这个项目基于已有的《植物大战僵尸》逆向工程项目，包含游戏逻辑、底层框架，以及动画和特效系统。主要代码分布如下：

```text
re-plants-vs-zombies/
├── main.cpp                  # 程序入口
├── LawnApp.cpp / LawnApp.h    # 游戏应用总控
├── ConstEnums.h              # 游戏类型与状态枚举
├── GameConstants.h           # 游戏常量
├── Resources.cpp / .h        # 资源对象及绑定
├── Lawn/                     # 游戏逻辑与界面
│   ├── Board.*               # 战场管理
│   ├── Plant.*               # 植物行为
│   ├── Zombie.*              # 僵尸行为
│   ├── Projectile.*          # 子弹逻辑
│   ├── SeedPacket.*          # 种子卡片
│   ├── Challenge.*           # 挑战模式与特殊规则
│   ├── System/               # 存档、玩家资料、音乐等
│   └── Widget/               # 菜单、商店、图鉴等界面
├── Sexy.TodLib/              # 动画、粒子与特效
├── SexyAppFramework/         # 窗口、渲染、音频等底层能力
├── CMake/                    # 公共构建配置
├── tools/                    # 资源处理与调试辅助工具
└── CMakeLists.txt            # 顶层构建入口
```

### 游戏逻辑：Lawn

`Lawn/` 包含与玩法直接相关的代码。其中，`Board` 负责组织战场对象的更新、绘制和交互；`Plant`、`Zombie` 和 `Projectile` 分别实现植物、僵尸与子弹的行为。

种子卡片、掉落物、小推车和禅境花园等内容也位于这一目录。`System/` 主要处理存档、玩家资料和音乐等系统，`Widget/` 则包含主菜单、选卡、商店、图鉴和设置等具体界面。

### 动画与特效：Sexy.TodLib

`Sexy.TodLib/` 为游戏提供动画与特效支持，包括 Reanimation 动画播放、动画图集、粒子、拖尾，以及特效与游戏对象之间的挂接。

植物和僵尸的行为由玩法代码控制，相关的动画与表现则会调用这一层提供的功能。

### 底层框架：SexyAppFramework

`SexyAppFramework/` 负责窗口、消息循环、绘图、音频、资源加载和通用控件等基础能力。

它与 `Lawn/Widget/` 的区别是：前者提供按钮、对话框和事件处理等通用设施，后者利用这些设施组成游戏中的具体界面。

### 程序入口与总控

`main.cpp` 是程序入口，负责创建并启动 `LawnApp`。`LawnApp` 管理应用生命周期、资源加载和界面切换，进入对局后，再由 `Board` 组织战场中的游戏对象。

阅读代码时，可以先沿着下面这条路径了解整体关系，再进入感兴趣的模块：

```text
main.cpp
  └── LawnApp
        └── Board
              ├── Plant
              ├── Zombie
              └── Projectile
```

仓库中仍有未完成的实现，某个模块存在对应代码，并不代表其功能已经完整可用。