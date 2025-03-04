"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { PostMeta } from "@/types/post";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { CATEGORY_MAP, getCategoryInEnglish, getTagInEnglish } from "@/mapping";
import AllPageViews from "./AllPageViews";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ArrowUp, ArrowDown } from "lucide-react";

type SortOrder = "newest" | "oldest";

interface BlogPageClientProps {
	initialPosts: PostMeta[];
	categories: string[];
	tags: string[];
}

export default function BlogPageClient({ initialPosts, categories, tags }: BlogPageClientProps) {
	const [searchResults, setSearchResults] = useState<PostMeta[]>(initialPosts);
	const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
	const [showFilters, setShowFilters] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	const filteredAndSortedPosts = useMemo(() => {
		let results = [...searchResults];

		// 카테고리 필터링
		if (selectedCategory) {
			results = results.filter((post) => post.category === selectedCategory);
		}

		// 태그 필터링
		if (selectedTags.length > 0) {
			results = results.filter((post) => selectedTags.every((tag) => post.tags.includes(tag)));
		}

		// 정렬
		return results.sort((a, b) => {
			const dateA = new Date(a.date).getTime();
			const dateB = new Date(b.date).getTime();
			return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
		});
	}, [searchResults, sortOrder, selectedCategory, selectedTags]);

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
	};

	const resetFilters = () => {
		setSelectedCategory(null);
		setSelectedTags([]);
	};

	if (!isLoaded) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="sticky top-20 z-10 py-4">
				<SearchBar posts={initialPosts} onSearch={setSearchResults} />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<motion.aside
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="md:sticky md:top-36 h-fit space-y-6 md:col-span-1 glass p-6 rounded-xl"
				>
					{/* 모바일 필터 토글 */}
					<div className="md:hidden">
						<button
							onClick={() => setShowFilters(!showFilters)}
							className="flex items-center justify-between w-full p-3 bg-primary-100 dark:bg-gray-800 rounded-lg text-primary-700 dark:text-primary-300"
						>
							<span className="flex items-center gap-2">
								<Filter size={18} />
								필터 {showFilters ? "숨기기" : "보기"}
							</span>
						</button>
					</div>

					<AnimatePresence>
						{(showFilters || window.innerWidth >= 768) && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.3 }}
								className="space-y-6 overflow-hidden md:h-auto"
							>
								{/* Categories */}
								<div>
									<h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-accent-medium bg-clip-text text-transparent">카테고리</h2>
									<ul className="space-y-2">
										{categories.map((category) => {
											const categorySlug = getCategoryInEnglish(category);
											const isSelected = selectedCategory === category;
											return (
												<motion.li key={categorySlug} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
													<button
														onClick={() => setSelectedCategory(isSelected ? null : category)}
														className={`text-left w-full ${
															isSelected ? "text-primary-600 dark:text-primary-400 font-medium" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
														}`}
													>
														{category}
														{isSelected && <span className="ml-2">✓</span>}
													</button>
												</motion.li>
											);
										})}
									</ul>
								</div>

								{/* Tags */}
								<div>
									<h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-accent-medium bg-clip-text text-transparent">태그</h2>
									<div className="flex flex-wrap gap-2">
										{tags.map((tag) => {
											const tagSlug = getTagInEnglish(tag);
											const isSelected = selectedTags.includes(tag);
											return (
												<motion.button
													key={tagSlug}
													onClick={() => toggleTag(tag)}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
														isSelected ? "bg-primary-500 text-white dark:bg-primary-600" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
													}`}
												>
													{tag}
												</motion.button>
											);
										})}
									</div>
								</div>

								{/* Reset Filters */}
								{(selectedCategory || selectedTags.length > 0) && (
									<motion.button
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										onClick={resetFilters}
										className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-sm transition-colors duration-300"
									>
										필터 초기화
									</motion.button>
								)}

								<AllPageViews />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.aside>

				{/* Main Content */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="md:col-span-3">
					<div className="flex justify-between items-center mb-8">
						<motion.h1
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-medium bg-clip-text text-transparent"
						>
							포스트
							{filteredAndSortedPosts.length > 0 && <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">({filteredAndSortedPosts.length})</span>}
						</motion.h1>
						<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex gap-2">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setSortOrder("newest")}
								className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 flex items-center gap-1 ${
									sortOrder === "newest" ? "bg-primary-600 text-white shadow-glow" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
								}`}
							>
								<ArrowUp size={16} />
								최신순
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setSortOrder("oldest")}
								className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 flex items-center gap-1 ${
									sortOrder === "oldest" ? "bg-primary-600 text-white shadow-glow" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
								}`}
							>
								<ArrowDown size={16} />
								오래된순
							</motion.button>
						</motion.div>
					</div>
					<SearchResults results={filteredAndSortedPosts} />
				</motion.div>
			</div>
		</motion.div>
	);
}
