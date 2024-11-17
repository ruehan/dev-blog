"use client";

import { useState } from "react";
import Link from "next/link";
import { PostMeta } from "@/types/post";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";

interface BlogPageClientProps {
	initialPosts: PostMeta[];
	categories: string[];
	tags: string[];
}

export default function BlogPageClient({ initialPosts, categories, tags }: BlogPageClientProps) {
	const [searchResults, setSearchResults] = useState<PostMeta[]>(initialPosts);

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
							{categories.map((category) => (
								<li key={category}>
									<Link href={`/category/${category}`} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
										{category}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Tags */}
					<div>
						<h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">태그</h2>
						<div className="flex flex-wrap gap-2">
							{tags.map((tag) => (
								<Link href={`/tag/${tag}`} key={tag} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">
									{tag}
								</Link>
							))}
						</div>
					</div>
				</aside>

				{/* Main Content */}
				<div className="md:col-span-3">
					<h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">포스트</h1>
					<SearchResults results={searchResults} />
				</div>
			</div>
		</div>
	);
}
