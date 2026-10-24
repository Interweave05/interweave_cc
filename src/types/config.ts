import type { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";

// 网站配置的类型定义，具体配置值在 src/config.ts 中修改。
export type SiteConfig = {
	title: string; // 网站标题
	subtitle: string; // 网站副标题

	// 支持的界面语言代码
	lang:
		| "en"
		| "zh_CN"
		| "zh_TW"
		| "ja"
		| "ko"
		| "es"
		| "th"
		| "vi"
		| "tr"
		| "id";

	themeColor: {
		hue: number; // 默认主题色色相，范围为 0～360
		fixed: boolean; // 是否固定主题色并隐藏访客的主题色选择器
	};
	banner: {
		enable: boolean; // 是否显示顶部横幅
		src: string; // 横幅图片路径
		position?: "top" | "center" | "bottom"; // 可选：图片显示位置
		credit: {
			enable: boolean; // 是否显示图片署名
			text: string; // 署名文字
			url?: string; // 可选：作品或作者页面链接
		};
	};
	toc: {
		enable: boolean; // 是否显示文章目录
		depth: 1 | 2 | 3; // 目录显示的最大标题层级
	};

	favicon: Favicon[]; // 网站图标列表，留空时使用默认图标
};

// 网站图标配置。
export type Favicon = {
	src: string; // 图标路径
	theme?: "light" | "dark"; // 可选：图标适用的深浅色模式
	sizes?: string; // 可选：图标尺寸，例如 '32x32'
};

// 导航栏可直接使用的预设页面。
export enum LinkPreset {
	Home = 0, // 首页
	Archive = 1, // 文章归档
	About = 2, // 关于页面
}

// 自定义导航链接。
export type NavBarLink = {
	name: string; // 显示名称
	url: string; // 目标地址，站内链接不包含部署子路径
	external?: boolean; // 可选：是否作为外部链接在新标签页打开
};

// 导航栏配置，可混合使用自定义链接和预设页面。
export type NavBarConfig = {
	links: (NavBarLink | LinkPreset)[]; // 按数组顺序显示导航项
};

// 个人资料卡片配置。
export type ProfileConfig = {
	avatar?: string; // 可选：头像路径
	name: string; // 昵称
	bio?: string; // 可选：个人简介
	links: {
		name: string; // 社交平台名称
		url: string; // 社交主页链接
		icon: string; // 图标名称，例如 'fa6-brands:github'
	}[];
};

// 文章许可信息配置。
export type LicenseConfig = {
	enable: boolean; // 是否显示许可信息
	name: string; // 许可协议名称
	url: string; // 许可协议详情链接
};

// 显示模式：浅色、深色或跟随系统。
export type LIGHT_DARK_MODE =
	| typeof LIGHT_MODE
	| typeof DARK_MODE
	| typeof AUTO_MODE;

// 文章数据的类型定义。
export type BlogPostData = {
	body: string; // 文章正文
	title: string; // 文章标题
	published: Date; // 发布日期
	description: string; // 文章摘要
	tags: string[]; // 标签列表
	draft?: boolean; // 可选：是否为草稿，草稿不会发布到正式网站
	image?: string; // 可选：文章封面图片路径
	category?: string; // 可选：文章分类
	prevTitle?: string; // 自动生成：上一篇文章的标题
	prevSlug?: string; // 自动生成：上一篇文章的 URL 路径标识
	nextTitle?: string; // 自动生成：下一篇文章的标题
	nextSlug?: string; // 自动生成：下一篇文章的 URL 路径标识
};

// 代码块语法高亮配置。
export type ExpressiveCodeConfig = {
	theme: string; // 语法高亮主题名称，请使用深色主题
};
