"use client";

import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Post, PostMeta } from "@/types/post";
import components from "@/components/mdx/MDXComponents";
import TableOfContents from "@/components/TableOfContents";
import RelatedPosts from "@/components/RelatedPosts";
import Comments from "@/components/Comments";
import { Share2 } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";
import ReadingTime from "@/components/ReadingTime";
import FontSizeControl from "@/components/FontSizeControl";
import PostViews from "./PostViews";
import {motion} from "framer-motion"

interface BlogPostClientProps {
	post: Post;
	allPosts: PostMeta[];
}

export default function BlogPostClient({ post, allPosts }: BlogPostClientProps) {
	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: post.title,
					text: post.excerpt,
					url: window.location.href,
				});
			} catch (err) {
				console.error("Error sharing:", err);
			}
		} else {
			navigator.clipboard.writeText(window.location.href);
			alert("Link copied to clipboard!");
		}
	};

	return (
		<>
			<ScrollProgress />
			<motion.div 
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="grid grid-cols-1 lg:grid-cols-4 gap-8"
			>
				{/* Main Content */}
				<article className="lg:col-span-3">
					<motion.header 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="mb-8"
					>
						<div className="flex justify-between items-start mb-4">
							<h1 className="text-4xl font-bold text-gray-900 dark:text-white">{post.title}</h1>
							<motion.button 
								onClick={handleShare} 
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" 
								aria-label="Share post"
							>
								<Share2 className="h-5 w-5" />
							</motion.button>
						</div>
						<div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
							<time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
							<span>•</span>
							<ReadingTime content={post.content} />
							<span>•</span>
							<span>{post.category}</span>
							<span>•</span>
							<PostViews slug={post.slug} />
						</div>
					</motion.header>

					<motion.div 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="flex flex-wrap gap-2 mb-8"
					>
						{post.tags.map((tag, index) => (
							<motion.span
								key={tag}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.1 * index }}
								whileHover={{ scale: 1.05 }}
								className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
							>
								{tag}
							</motion.span>
						))}
					</motion.div>

					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="prose dark:prose-invert prose-lg max-w-none"
					>
						<MDXRemote source={post.content} components={components} />
					</motion.div>

					<RelatedPosts currentPost={post} allPosts={allPosts} />

					<Comments />
				</article>

				{/* Sidebar */}
				<motion.aside 
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.5 }}
					className="lg:col-span-1"
				>
					<TableOfContents />
				</motion.aside>
			</motion.div>
			<FontSizeControl />
		</>
	);
}
