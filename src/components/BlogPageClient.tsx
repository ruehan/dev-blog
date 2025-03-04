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
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
			<div className="sticky top-20 z-10 py-4">
				<SearchBar posts={initialPosts} onSearch={setSearchResults} />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
				<motion.aside
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="lg:col-span-2 md:sticky md:top-36 h-fit space-y-8 glass p-7 rounded-xl"
				>
					{/* 모바일 필터 토글 */}
					<div className="lg:hidden">
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
						{(showFilters || window.innerWidth >= 1024) && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.3 }}
								className="space-y-6 overflow-hidden lg:h-auto"
							>
								{/* Categories */}
								<div>
									<h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-accent-medium bg-clip-text text-transparent">카테고리</h2>
									<ul className="space-y-3">
										{categories.map((category) => {
											const categorySlug = getCategoryInEnglish(category);
											const isSelected = selectedCategory === category;
											return (
												<motion.li
													key={categorySlug}
													whileHover={{ x: 5 }}
													transition={{ type: "spring", stiffness: 300 }}
													className="border-b border-gray-100 dark:border-gray-800 pb-2 last:border-0"
												>
													<button
														onClick={() => setSelectedCategory(isSelected ? null : category)}
														className={`text-left w-full flex items-center justify-between ${
															isSelected ? "text-primary-600 dark:text-primary-400 font-medium" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
														}`}
													>
														<span className="text-base">{category}</span>
														{isSelected && (
															<span className="text-primary-500 dark:text-primary-400">
																<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
																	<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
																</svg>
															</span>
														)}
													</button>
												</motion.li>
											);
										})}
									</ul>
								</div>

								{/* Tags */}
								<div>
									<h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-accent-medium bg-clip-text text-transparent">태그</h2>
									<div className="flex flex-wrap gap-2.5">
										{tags.map((tag) => {
											const tagSlug = getTagInEnglish(tag);
											const isSelected = selectedTags.includes(tag);
											return (
												<motion.button
													key={tagSlug}
													onClick={() => toggleTag(tag)}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													className={`px-3.5 py-1.5 rounded-full text-sm transition-all duration-300 ${
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
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="lg:col-span-5 lg:col-start-3">
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

				{/* Right empty space for balance */}
				<div className="hidden lg:block lg:col-span-1"></div>
			</div>
		</motion.div>
	);
}
