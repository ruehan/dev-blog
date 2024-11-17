"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PostMeta } from "@/types/post";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { CATEGORY_MAP, getCategoryInEnglish, getTagInEnglish } from "@/mapping";

type SortOrder = "newest" | "oldest";

interface BlogPageClientProps {
	initialPosts: PostMeta[];
	categories: string[];
	tags: string[];
}

export default function BlogPageClient({ initialPosts, categories, tags }: BlogPageClientProps) {
	const [searchResults, setSearchResults] = useState<PostMeta[]>(initialPosts);
	const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

	const filteredAndSortedPosts = useMemo(() => {
		let results = [...searchResults];

		return results.sort((a, b) => {
			const dateA = new Date(a.date).getTime();
			const dateB = new Date(b.date).getTime();
			return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
		});
	}, [searchResults, sortOrder]);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<SearchBar posts={initialPosts} onSearch={setSearchResults} />

			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				{/* Sidebar */}
				<aside className="space-y-6 md:col-span-1">
					{/* Categories */}
					<div>
						<h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">카테고리</h2>
						<ul className="space-y-2">
							{categories.map((category) => {
								const categorySlug = getCategoryInEnglish(category);
								return (
									<li key={categorySlug}>
										<Link href={`/category/${categorySlug}`} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
											{category}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>

					{/* Tags */}
					<div>
						<h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">태그</h2>
						<div className="flex flex-wrap gap-2">
							{tags.map((tag) => {
								const tagSlug = getTagInEnglish(tag);
								return (
									<Link
										key={tagSlug}
										href={`/tag/${tagSlug}`}
										className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
									>
										{tag}
									</Link>
								);
							})}
						</div>
					</div>
				</aside>

				{/* Main Content */}
				<div className="md:col-span-3">
					<div className="flex justify-between items-center mb-8">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">포스트</h1>
						<div className="flex gap-2">
							<button
								onClick={() => setSortOrder("newest")}
								className={`px-4 py-2 rounded-lg text-sm transition-colors ${
									sortOrder === "newest" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
								}`}
							>
								최신순
							</button>
							<button
								onClick={() => setSortOrder("oldest")}
								className={`px-4 py-2 rounded-lg text-sm transition-colors ${
									sortOrder === "oldest" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
								}`}
							>
								오래된순
							</button>
						</div>
					</div>
					<SearchResults results={filteredAndSortedPosts} />
				</div>
			</div>
		</div>
	);
}
