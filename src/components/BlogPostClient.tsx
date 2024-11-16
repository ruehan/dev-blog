'use client';

import { format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Post, PostMeta } from '@/types/post';
import components from '@/components/mdx/MDXComponents';
import TableOfContents from '@/components/TableOfContents';
import RelatedPosts from '@/components/RelatedPosts';
import Comments from '@/components/Comments';
import { Share2 } from 'lucide-react';
import ScrollProgress from "@/components/ScrollProgress";
import ReadingTime from "@/components/ReadingTime";
import FontSizeControl from "@/components/FontSizeControl";

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
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <>
            <ScrollProgress />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <article className="lg:col-span-3">
                    <header className="mb-8">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                                {post.title}
                            </h1>
                            <button
                                onClick={handleShare}
                                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                aria-label="Share post"
                            >
                                <Share2 className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                            <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
                            <span>•</span>
                            <ReadingTime content={post.content}/>
                            <span>•</span>
                            <span>{post.category}</span>
                        </div>
                    </header>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
                            >
              {tag}
            </span>
                        ))}
                    </div>

                    <div className="prose dark:prose-invert prose-lg max-w-none">
                        <MDXRemote source={post.content} components={components} />
                    </div>

                    <RelatedPosts currentPost={post} allPosts={allPosts} />

                    <Comments />
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <TableOfContents />
                </aside>
            </div>
            <FontSizeControl />
        </>
    );
}