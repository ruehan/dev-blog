import { getAllPosts, getAllCategories } from "@/utils/mdx";
import { PostMeta } from "@/types/post";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
	const categories = await getAllCategories();
	return categories.map((category) => ({
		category: encodeURIComponent(category),
	}));
}

interface Props {
	params: { category: string };
	searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	return {
		title: `${decodeURIComponent(params.category)} | Dev Blog`,
		description: `Posts in category ${decodeURIComponent(params.category)}`,
	};
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
	const decodedCategory = decodeURIComponent(params.category);
	console.log(decodedCategory);
	const posts = await getAllPosts();
	const categoryPosts = posts.filter((post) => post.category === decodedCategory);

	if (categoryPosts.length === 0) {
		notFound();
	}

	return (
		<div className="max-w-4xl mx-auto">
			<header className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Category: {decodedCategory}</h1>
				<p className="text-gray-600 dark:text-gray-400">{categoryPosts.length} posts</p>
			</header>

			<div className="space-y-8">
				{categoryPosts.map((post: PostMeta) => (
					<article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-8">
						<Link href={`/blog/${post.slug}`}>
							<h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">{post.title}</h2>
						</Link>
						<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
							<time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
						</div>
						<p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
						<div className="flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<Link
									key={tag}
									href={`/tag/${encodeURIComponent(tag)}`}
									className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
								>
									{tag}
								</Link>
							))}
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
