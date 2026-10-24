import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

// 网站基本设置：修改标题、语言、主题色、横幅和文章目录。
export const siteConfig: SiteConfig = {
	title: "Interweave's Site", // 网站标题
	subtitle: "喵", // 网站副标题
	lang: "zh_CN", // 界面语言，例如：简体中文 'zh_CN'、英文 'en'、日文 'ja'
	themeColor: {
		hue: 250, // 默认主题色色相，取值范围为 0～360
		fixed: false, // 是否固定主题色；设为 true 后，访客无法使用主题色选择器
	},
	banner: {
		enable: false, // 是否显示网站顶部横幅
		src: "assets/images/demo-banner.png", // 图片路径相对于 src 目录；以 '/' 开头时，相对于 public 目录
		position: "center", // 横幅图片的显示位置，仅支持 'top'、'center'、'bottom'，默认为居中
		credit: {
			enable: false, // 是否显示横幅图片的署名信息
			text: "", // 显示的署名文字
			url: "", // 可选：原始作品或作者页面的链接
		},
	},
	toc: {
		enable: true, // 是否在文章右侧显示目录
		depth: 2, // 目录显示的最大标题层级，取值为 1、2 或 3
	},
	favicon: [
		// 留空时使用默认的网站图标；如需自定义，可取消下面示例的注释
		// {
		//   src: '/favicon/icon.png',    // 图标路径，相对于 public 目录
		//   theme: 'light',              // 可选：'light' 或 'dark'，仅在深浅色模式使用不同图标时设置
		//   sizes: '32x32',              // 可选：图标尺寸，仅在提供多种尺寸的图标时设置
		// }
	],
};

// 顶部导航栏：可使用预设页面，也可以添加自定义链接。
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home, // 首页
		LinkPreset.Archive, // 文章归档
		LinkPreset.About, // 关于页面
		{
			name: "GitHub", // 导航栏显示的名称
			url: "https://github.com/Interweave05/interweave_cc", // 站内链接无需填写部署子路径，程序会自动添加
			external: true, // 是否为外部链接；设为 true 时显示外链图标，并在新标签页打开
		},
	],
};

// 个人资料卡片：修改头像、昵称、简介和社交链接。
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.png", // 头像路径相对于 src 目录；以 '/' 开头时，相对于 public 目录
	name: "Interweave", // 昵称，也会显示在页脚版权信息中
	bio: "どきどきキラキラ", // 个人简介
	links: [ // 社交链接列表，不需要的项目可以删除
		// {
		// 	name: "Twitter",
		// 	icon: "fa6-brands:twitter", // 图标名称，可在 https://icones.js.org/ 查询
		// 	// 如果项目尚未包含所需图标集，需要先运行下面的命令安装对应图标集
		// 	// `pnpm add @iconify-json/<icon-set-name>`
		// 	url: "https://twitter.com",
		// },
		// {
		// 	name: "Steam",
		// 	icon: "fa6-brands:steam",
		// 	url: "https://store.steampowered.com",
		// },
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Interweave05",
		},
	],
};

// 文章许可信息：控制文章底部显示的许可协议。
export const licenseConfig: LicenseConfig = {
	enable: true, // 是否显示文章许可信息
	name: "CC BY-NC-SA 4.0", // 许可协议名称
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/", // 许可协议详情链接
};

// 文章代码块的语法高亮设置。
export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 部分样式（例如背景颜色）会被 astro.config.mjs 中的设置覆盖。
	// 目前博客的代码块样式仅支持深色背景，请选择深色语法高亮主题。
	theme: "github-dark",
};
