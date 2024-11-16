'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PostMeta } from '@/types/post';

interface SearchBarProps {
    posts: PostMeta[];
    onSearch: (results: PostMeta[]) => void;
}

export default function SearchBar({ posts, onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term: string) => {
        setSearchTerm(term);

        if (!term.trim()) {
            onSearch(posts);
            return;
        }

        const searchResults = posts.filter((post) => {
            const searchContent = `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(' ')}`.toLowerCase();
            return searchContent.includes(term.toLowerCase());
        });

        onSearch(searchResults);
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto mb-8">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full px-4 py-2 pl-10 text-gray-900 dark:text-white placeholder-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
        </div>
    );
}