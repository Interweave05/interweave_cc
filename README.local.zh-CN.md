# 本地使用说明

此目录以你的仓库 https://github.com/Interweave05/interweave_cc 的 main 分支为起点，
使用 Fuwari 模板（Astro），界面语言已设为简体中文。
保留了模板的示例文章、图片和作者资料，可在熟悉后自行替换。

## 环境和启动

- Node.js 24（与 `.node-version` 一致）
- 使用 pnpm；项目会通过 `.npmrc` 和 `package.json` 自动选用 pnpm 9.14.4。
- 首次安装或拉取依赖变更后：`pnpm install --frozen-lockfile`。

在此目录打开 PowerShell：

```powershell
pnpm dev
```

打开终端显示的本地地址，通常是 http://localhost:4321/。
修改文章或配置后会自动更新；按 Ctrl+C 停止。

## 写文章和修改资料

```powershell
pnpm new-post my-first-post
```

编辑生成的 `src/content/posts/my-first-post.md`，将 `title` 改为文章标题，
在第二个 `---` 后面写 Markdown 正文。`draft: true` 的文章只在开发模式显示，
不会发布到正式网站。文件名建议使用英文短横线，标题可以用中文。

常用位置：

| 位置 | 用途 |
| --- | --- |
| `src/config.ts` | 网站标题、副标题、语言、主题色、横幅、头像、昵称、简介和社交链接 |
| `src/content/posts/` | 文章和官方示例，可直接修改或删除示例文章 |
| `src/content/spec/about.md` | 关于页面 |
| `src/assets/images/` | 需要由 Astro 处理的图片 |
| `public/` | 原样发布的静态文件 |
| `astro.config.mjs` | Astro 构建配置，读取 SITE_URL 和 BASE_PATH |

模板中的 Fuwari、Lorem Ipsum 和社交链接仍是示例，发布前请替换为自己的资料。

## 构建、搜索和预览

```powershell
pnpm check
pnpm build
pnpm preview
```

`pnpm build` 会同时生成网站和 Pagefind 搜索索引，输出到 `dist/`。
开发模式 `pnpm dev` 的搜索使用模板的演示结果；测试真实搜索请先构建再预览。
文章更新后需要重新构建，正式预览才能显示更新内容。

## 部署到 GitHub Pages

部署配置随源码提交到 GitHub，推送到 main 后由 GitHub Actions 构建和发布。
`origin` 已指向 `https://github.com/Interweave05/interweave_cc.git`，
本地 main 已跟踪 origin/main，官方模板保留为 `upstream`。
切换仓库之前的本地配置另保留在 Git stash 中，可用 `git stash list` 查看。
GitHub Actions 配置已放在 `.github/workflows/pages.yml`。

1. 打开 https://github.com/Interweave05/interweave_cc/settings/pages ，
   在 Build and deployment 中将 Source 设为 GitHub Actions。
2. 提交并推送本地改动：

```powershell
git add .
git commit -m "Set up personal Fuwari blog"
git push -u origin main
```

工作流会从 GitHub Pages 设置自动读取网站域名和仓库子路径，然后运行检查、
构建、搜索索引生成和部署。只需使用默认的 GITHUB_TOKEN，无需手动创建个人令牌。
GitHub 仓库 Actions 中可查看部署结果。后续推送到 main 会自动更新网站。
默认网站地址为 https://interweave05.github.io/interweave_cc/。

开发模式 `pnpm dev` 使用本地地址和根路径 `/`，方便编辑。
正式构建默认使用 `https://interweave05.github.io` 和 `/interweave_cc`，
因此运行 `pnpm preview` 后请打开终端显示的带 `/interweave_cc/` 的地址。
如果迁移仓库或使用自定义域名，可复制 `.env.example` 为 `.env` 后修改：

```dotenv
SITE_URL=https://YOUR_USERNAME.github.io
BASE_PATH=/YOUR_REPO
```

对于 `YOUR_USERNAME.github.io` 个人主页仓库，BASE_PATH 使用 `/`。
`.env` 仅用于本机，不会提交；GitHub Actions 的设置优先于它。

模板与许可说明见原始 `README.md`、`LICENSE` 和 `docs/README.zh-CN.md`。
