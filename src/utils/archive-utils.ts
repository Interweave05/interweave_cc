export type ArchiveMode = "year" | "category" | "tag";

export interface ArchivePost {
	slug: string;
	data: {
		title: string;
		tags: string[];
		category?: string | null;
		published: Date;
	};
}

export interface ArchiveGroup {
	key: string;
	label: string;
	posts: ArchivePost[];
}

// 同一篇文章可以归入多个标签；空分类和空标签分别汇总到兜底分组。
export function groupArchivePosts(
	posts: ArchivePost[],
	mode: ArchiveMode,
	labels: { uncategorized: string; untagged: string },
): ArchiveGroup[] {
	const groups = new Map<string, ArchiveGroup>();
	for (const post of posts) {
		let names: string[];
		if (mode === "year") {
			names = [String(post.data.published.getFullYear())];
		} else if (mode === "category") {
			names = [post.data.category?.trim() || ""];
		} else {
			names = [...new Set(post.data.tags.map((tag) => tag.trim()).filter(Boolean))];
			if (names.length === 0) names = [""];
		}
		for (const name of names) {
			const key = `${mode}:${name}`;
			let group = groups.get(key);
			if (!group) {
				group = {
					key,
					label: name || (mode === "category" ? labels.uncategorized : labels.untagged),
					posts: [],
				};
				groups.set(key, group);
			}
			group.posts.push(post);
		}
	}
	return [...groups.values()].sort((a, b) => {
		if (mode === "year") return Number(b.label) - Number(a.label);
		// 未分类、无标签的文章放在最后，其他分组按名称排序。
		if (a.key === `${mode}:`) return 1;
		if (b.key === `${mode}:`) return -1;
		return a.label.localeCompare(b.label, "zh-CN");
	});
}
