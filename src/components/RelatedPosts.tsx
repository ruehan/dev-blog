import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { PostMeta } from '@/types/post';

interface RelatedPostsProps {
    currentPost: PostMeta;
    allPosts: PostMeta[];
}

export default function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
    const relatedPosts = allPosts
        .filter((post) => post.slug !== currentPost.slug) // 현재 포스트 제외
        .filter((post) => {
            // 같은 카테고리나 태그를 가진 포스트 찾기
            return (
                post.category === currentPost.category ||
                post.tags.some((tag) => currentPost.tags.includes(tag))
            );
        })
        .slice(0, 3); // 최대 3개만 표시

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block"
                    >
                        <article className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400">
                                {post.title}
                            </h3>
                            <time className="text-sm text-gray-600 dark:text-gray-400">
                                {format(new Date(post.date), 'MMMM d, yyyy')}
                            </time>
                            <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                                {post.excerpt}
                            </p>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}