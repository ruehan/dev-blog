"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { PostMeta } from "@/types/post";

interface SearchResultsProps {
	results: PostMeta[];
}

export default function SearchResults({ results }: SearchResultsProps) {
	if (results.length === 0) {
		return <div className="text-center py-8 text-gray-600 dark:text-gray-400">No posts found. Try a different search term.</div>;
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
		<motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
			{results.map((post) => (
				<motion.article
					key={post.slug}
					variants={item}
					whileHover={{
						scale: 1.02,
						transition: { duration: 0.2 },
					}}
					className="border-b border-gray-200 dark:border-gray-700 pb-8 p-4 rounded-lg hover:shadow-lg transition-all"
				>
					<Link href={`/blog/${post.slug}`}>
						<motion.h2
							className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
							whileHover={{ x: 10 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							{post.title}
						</motion.h2>
					</Link>
					<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
						<time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
						<span>•</span>
						<span>{post.category}</span>
					</div>
					<motion.p initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }} className="text-gray-600 dark:text-gray-300 mb-4">
						{post.excerpt}
					</motion.p>
					<div className="flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<motion.span
								key={tag}
								whileHover={{
									scale: 1.1,
									backgroundColor: "rgb(209 213 219)",
									transition: { duration: 0.2 },
								}}
								className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400"
							>
								{tag}
							</motion.span>
						))}
					</div>
				</motion.article>
			))}
		</motion.div>
	);
}
