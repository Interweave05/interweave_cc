# Interweave 的个人网站

基于 [Fuwari](https://github.com/saicaca/fuwari) 和 Astro，用 Markdown 写文章，通过 GitHub Actions 自动部署到 GitHub Pages。

- 网站：https://www.interweave.cc/
- 仓库：https://github.com/Interweave05/interweave_cc

## 环境与启动

使用 Node.js 24。项目的 `.npmrc` 和 `package.json` 会自动选用 pnpm 9.14.4。

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

打开终端显示的本地地址，通常为 http://localhost:4321/。保存文件后会自动更新，按 Ctrl+C 停止预览。

## 写文章

在项目根目录运行：

```powershell
pnpm new-post my-first-post
```

编辑生成的 `src/content/posts/my-first-post.md`：

```markdown
---
title: 我的第一篇文章
published: 2026-10-24
description: 文章简介
image: ''
tags: [生活, 随笔]
category: 随笔
draft: false
lang: ''
---

这里开始写正文。

## 一个小标题

普通段落、**加粗文字**、列表都可以用 Markdown 编写。
```

- 文件名建议使用英文和短横线，标题可以使用中文。
- `draft: true` 为草稿，只在本地开发模式显示，不会发布。
- `lang` 留空时沿用网站默认语言。
- 文章可以直接放在 `posts` 下，也可以放进独立文件夹，例如 `posts/travel/index.md`，同时存放封面图片。
- `image: './cover.jpg'` 表示图片与文章在同一目录；`image: '/images/cover.jpg'` 对应 `public/images/cover.jpg`。
- 删除文章时，删除对应的 Markdown 文件即可；其专用文件夹和图片也可以一起删除。

## 更新到 GitHub

确认文章和修改内容后执行：

```powershell
git status
git add .
git commit -m "更新文章"
git push origin main
```

在仓库 Actions 中等待 **Deploy to GitHub Pages** 成功，网站就会更新。构建产物和依赖会被 Git 自动忽略，只提交源码。

## 常用文件

| 路径 | 用途 |
| --- | --- |
| `src/config.ts` | 网站标题、语言、主题色、头像、简介和导航，已添加中文注释 |
| `src/types/config.ts` | 配置与文章数据的 TypeScript 类型定义，已添加中文注释 |
| `src/content/config.ts` | 文章元数据校验与默认值，已添加中文注释 |
| `src/content/posts/` | 自己的文章和文章专用图片 |
| `src/content/spec/about.md` | 关于页面 |
| `src/assets/images/` | 由 Astro 处理的图片，目前头像和横幅仍使用这里的默认素材 |
| `public/` | 原样发布的图片、网站图标等静态文件 |
| `scripts/new-post.js` | 新建文章脚本 |
| `.github/workflows/pages.yml` | GitHub Pages 的检查、构建、搜索索引生成和部署 |
| `astro.config.mjs` | Astro 及正式网站地址配置 |
| `frontmatter.json` | 可选的 VS Code Front Matter 写作扩展配置 |

模板的示例文章已清理；关于页面中仍有原模板介绍和图片来源，可按需改写并保留仍使用素材的署名。

## 检查与正式预览

```powershell
pnpm check
pnpm build
pnpm preview
```

- `pnpm check` 检查类型和组件。
- `pnpm build` 生成网站和 Pagefind 搜索索引，输出到 `dist/`。
- `pnpm preview` 预览上次构建结果，地址以终端输出为准。
- 开发模式的搜索是模板提供的演示结果；测试真实搜索需要先构建再预览。
- `dist/` 和 `.astro/` 均为自动生成的文件夹，需要时会重新生成。

## 域名与部署配置

GitHub 仓库 Settings → Pages → Source 使用 **GitHub Actions**，Custom domain 为 `www.interweave.cc`。
部署工作流会从 GitHub Pages 设置自动读取正式域名和部署子路径，使用默认的 `GITHUB_TOKEN`，无需单独添加个人令牌。

本地开发默认使用根路径 `/`；未覆盖配置时，正式构建使用 `https://interweave05.github.io/interweave_cc/`。
如需在本地模拟自定义域名的构建，可复制 `.env.example` 为 `.env`，并设置：

```dotenv
SITE_URL=https://www.interweave.cc
BASE_PATH=/
```

`.env` 不会提交到 Git；GitHub Actions 提供的环境变量优先于它。

## 模板与许可

Fuwari 模板的原始许可保留在 `LICENSE` 中，模板文档见 [Fuwari 官方仓库](https://github.com/saicaca/fuwari)。
网站文章显示的许可协议在 `src/config.ts` 的 `licenseConfig` 中设置。
