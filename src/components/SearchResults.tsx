"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { PostMeta } from "@/types/post";
import { Calendar, Tag, Folder, ArrowRight } from "lucide-react";

interface SearchResultsProps {
	results: PostMeta[];
}

export default function SearchResults({ results }: SearchResultsProps) {
	if (results.length === 0) {
		return (
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center py-16 px-4">
				<div className="max-w-md mx-auto">
					<motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-6xl mb-4">
						🔍
					</motion.div>
					<h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">검색 결과가 없습니다</h3>
					<p className="text-gray-600 dark:text-gray-400">다른 검색어로 시도해보세요.</p>
				</div>
			</motion.div>
		);
	}

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<motion.div variants={container} initial="hidden" animate="show" className="space-y-8 max-w-3xl mx-auto">
			{results.map((post) => (
				<motion.article
					key={post.slug}
					variants={item}
					whileHover={{
						scale: 1.02,
						transition: { duration: 0.2 },
					}}
					className="glass p-6 rounded-xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-lg dark:hover:shadow-glow transition-all duration-300"
				>
					<Link href={`/blog/${post.slug}`} className="block">
						<motion.h2
							className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-accent-medium bg-clip-text text-transparent hover:from-primary-500 hover:to-accent-light transition-all duration-300"
							whileHover={{ x: 5 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							{post.title}
						</motion.h2>
					</Link>
					<div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
						<div className="flex items-center gap-1">
							<Calendar size={16} className="text-primary-500" />
							<time>{format(new Date(post.date), "yyyy년 MM월 dd일")}</time>
						</div>
						<div className="flex items-center gap-1">
							<Folder size={16} className="text-accent-medium" />
							<span>{post.category}</span>
						</div>
					</div>
					<motion.p initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }} className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
						{post.excerpt}
					</motion.p>
					<div className="flex flex-wrap justify-between items-center">
						<div className="flex flex-wrap gap-2 mb-4 md:mb-0">
							{post.tags.map((tag) => (
								<motion.span
									key={tag}
									whileHover={{
										scale: 1.1,
										backgroundColor: "rgb(139, 92, 246, 0.1)",
										color: "rgb(139, 92, 246)",
										transition: { duration: 0.2 },
									}}
									className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400 transition-all duration-300"
								>
									<Tag size={12} />
									{tag}
								</motion.span>
							))}
						</div>
						<motion.div whileHover={{ x: 5 }} className="hidden md:block">
							<Link href={`/blog/${post.slug}`} className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
								자세히 보기
								<ArrowRight size={16} className="ml-1" />
							</Link>
						</motion.div>
					</div>
				</motion.article>
			))}
		</motion.div>
	);
}
