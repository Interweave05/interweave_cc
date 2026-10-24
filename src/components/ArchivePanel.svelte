<script lang="ts">
import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";
import {
	type ArchiveMode,
	type ArchivePost,
	groupArchivePosts,
} from "../utils/archive-utils";
import { getPostUrlBySlug, url } from "../utils/url-utils";

export let tags: string[] = [];
export let categories: string[] = [];
export let sortedPosts: ArchivePost[] = [];

const params = new URLSearchParams(window.location.search);
tags = params.getAll("tag");
categories = params.getAll("category");
const uncategorized = params.has("uncategorized");

const modes: { value: ArchiveMode; label: string }[] = [
	{ value: "year", label: "按时间" },
	{ value: "category", label: "按分类" },
	{ value: "tag", label: "按标签" },
];
let mode: ArchiveMode = tags.length > 0 ? "tag" : "category";

// 沿用侧栏分类和标签链接的筛选条件，再按所选方式分组。
$: filteredPosts = sortedPosts.filter((post) => {
	if (tags.length > 0 && !post.data.tags.some((tag) => tags.includes(tag))) return false;
	if (categories.length > 0 && !categories.includes(post.data.category ?? "")) return false;
	if (uncategorized && post.data.category?.trim()) return false;
	return true;
});
$: groups = groupArchivePosts(filteredPosts, mode, {
	uncategorized: i18n(I18nKey.uncategorized),
	untagged: i18n(I18nKey.noTags),
});

function formatDate(date: Date) {
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return mode === "year" ? `${month}-${day}` : `${date.getFullYear()}-${month}-${day}`;
}
</script>

<div class="card-base px-4 py-6 md:px-8">
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 class="text-2xl font-bold text-90">{i18n(I18nKey.archive)}</h1>
        <div class="flex flex-wrap gap-1" role="group" aria-label="归档方式">
            {#each modes as item}
                <button
                    type="button"
                    class={`btn-regular rounded-lg px-3 py-2 text-sm font-medium ${mode === item.value ? "!bg-[var(--btn-regular-bg-active)] !text-[var(--primary)] ring-1 ring-inset ring-[var(--primary)]" : ""}`}
                    aria-pressed={mode === item.value}
                    on:click={() => mode = item.value}
                >
                    {item.label}
                </button>
            {/each}
        </div>
    </div>

    {#if tags.length > 0 || categories.length > 0 || uncategorized}
        <div class="flex flex-wrap items-center gap-2 text-sm text-50 mb-5">
            <span>筛选：{[...categories, ...tags.map((tag) => `#${tag}`), ...(uncategorized ? [i18n(I18nKey.uncategorized)] : [])].join("、")}</span>
            <a class="link text-[var(--primary)]" href={url("/archive/")}>查看全部</a>
        </div>
    {/if}

    {#each groups as group (group.key)}
        <section class="mb-6 last:mb-0" aria-label={group.label}>
            <div class="flex items-center gap-3 py-3 mb-2 border-b border-black/10 dark:border-white/10">
                <h2 class="text-xl font-bold text-75 break-words min-w-0">{group.label}</h2>
                <span class="text-sm text-50 shrink-0">
                    {group.posts.length} {i18n(group.posts.length === 1 ? I18nKey.postCount : I18nKey.postsCount)}
                </span>
            </div>

            {#each group.posts as post (post.slug)}
                <a
                    href={getPostUrlBySlug(post.slug)}
                    aria-label={post.data.title}
                    class="group btn-plain !flex gap-3 min-h-11 w-full rounded-lg py-2 px-2"
                >
                    <span class="text-xs md:text-sm text-50 shrink-0 w-20 md:w-24 text-left">
                        {formatDate(post.data.published)}
                    </span>
                    <span class="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" aria-hidden="true"></span>
                    <span class="flex-1 min-w-0 text-left font-bold text-75 truncate group-hover:text-[var(--primary)] transition">
                        {post.data.title}
                    </span>
                    <span class="hidden md:block max-w-[25%] truncate text-sm text-30">
                        {post.data.tags.map((tag) => `#${tag}`).join(" ")}
                    </span>
                </a>
            {/each}
        </section>
    {:else}
        <p class="text-50 py-6 text-center">暂无符合条件的文章。</p>
    {/each}
</div>
