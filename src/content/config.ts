import { defineCollection, z } from "astro:content";

// 文章集合：校验 Markdown 文件顶部 --- 之间的元数据，并为可选字段设置默认值。
const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(), // 必填：文章标题
		published: z.date(), // 必填：发布日期，例如 2026-10-24
		updated: z.date().optional(), // 可选：最后更新日期
		draft: z.boolean().optional().default(false), // 是否为草稿，默认为 false；草稿只在开发模式显示
		description: z.string().optional().default(""), // 文章摘要，默认为空
		image: z.string().optional().default(""), // 封面图片路径，默认为空
		tags: z.array(z.string()).optional().default([]), // 标签列表，默认为空数组
		category: z.string().optional().nullable().default(""), // 文章分类，可留空或设为 null
		lang: z.string().optional().default(""), // 文章语言，留空时使用网站默认语言

		/* 以下字段由程序生成，用于文章之间的导航，无需在文章中手动填写。 */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});
// 独立内容集合，例如关于页面；无需填写特定的元数据字段。
const specCollection = defineCollection({
	schema: z.object({}),
});
// 注册内容集合，分别对应 src/content/posts 和 src/content/spec 目录。
export const collections = {
	posts: postsCollection,
	spec: specCollection,
};
