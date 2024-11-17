import { getAllPosts, getAllTags } from "@/utils/mdx";
import { PostMeta } from "@/types/post";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
	const tags = await getAllTags();
	return tags.map((tag) => ({
		tag: encodeURIComponent(tag),
	}));
}

interface Props {
	params: { tag: string };
	searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	return {
		title: `#${decodeURIComponent(params.tag)} | Dev Blog`,
		description: `Posts tagged with #${decodeURIComponent(params.tag)}`,
	};
}

export default async function TagPage({ params }: { params: { tag: string } }) {
	const decodedTag = decodeURIComponent(params.tag);
	console.log(decodedTag);
	const posts = await getAllPosts();
	const tagPosts = posts.filter((post) => post.tags.includes(decodedTag));

	if (tagPosts.length === 0) {
		notFound();
	}

	return (
		<div className="max-w-4xl mx-auto">
			<header className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">#{decodedTag}</h1>
				<p className="text-gray-600 dark:text-gray-400">{tagPosts.length} posts</p>
			</header>

			<div className="space-y-8">
				{tagPosts.map((post: PostMeta) => (
					<article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-8">
						<Link href={`/blog/${post.slug}`}>
							<h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">{post.title}</h2>
						</Link>
						<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
							<time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
							<span>•</span>
							<Link href={`/category/${encodeURIComponent(post.category)}`} className="hover:text-gray-900 dark:hover:text-gray-200">
								{post.category}
							</Link>
						</div>
						<p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
						<div className="flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<Link
									key={tag}
									href={`/tag/${encodeURIComponent(tag)}`}
									className={`px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm
                    ${tag === decodedTag ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
								>
									{tag}
								</Link>
							))}
						</div>
					</article>
				))}
			</div>

			{/* 관련 태그 섹션 추가 */}
			<div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
				<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Tags</h2>
				<div className="flex flex-wrap gap-2">
					{Array.from(new Set(tagPosts.flatMap((post) => post.tags).filter((tag) => tag !== decodedTag))).map((tag) => (
						<Link
							key={tag}
							href={`/tag/${encodeURIComponent(tag)}`}
							className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
						>
							{tag}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
