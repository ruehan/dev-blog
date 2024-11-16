'use client';

import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { PostMeta } from '@/types/post';

interface SearchResultsProps {
    results: PostMeta[];
}

export default function SearchResults({ results }: SearchResultsProps) {
    if (results.length === 0) {
        return (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                No posts found. Try a different search term.
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {results.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-8">
                    <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
                            {post.title}
                        </h2>
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
                        <span>•</span>
                        <span>{post.category}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400"
                            >
                {tag}
              </span>
                        ))}
                    </div>
                </article>
            ))}
        </div>
    );
}