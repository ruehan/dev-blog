"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Search } from "lucide-react";
import { PostMeta } from "@/types/post";
import debounce from "lodash.debounce";

interface SearchBarProps {
  posts: PostMeta[];
  onSearch: (results: PostMeta[]) => void;
}

export default function SearchBar({ posts, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");

  // 모든 포스트에 대한 검색 인덱스를 미리 계산하여 성능 개선
  const searchableContent = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      searchContent: `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(" ")}`.toLowerCase()
    }));
  }, [posts]);

  // 실제 검색 함수는 메모이제이션하여 불필요한 재계산 방지
  const performSearch = useCallback((term: string) => {
    if (!term.trim()) {
      onSearch(posts);
      return;
    }

    const searchQuery = term.toLowerCase();
    const searchResults = searchableContent.filter((post) => 
      post.searchContent.includes(searchQuery)
    );

    onSearch(searchResults);
  }, [posts, searchableContent, onSearch]);

  // 디바운스된 검색 로직으로 타이핑 중의 과도한 렌더링 방지
  const debouncedSearch = useMemo(
    () => debounce((term: string) => {
      setSearchTerm(term);
      performSearch(term);
    }, 300),
    [performSearch]
  );

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  // 컴포넌트 언마운트 시 디바운스 취소
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search posts..."
          aria-label="Search blog posts"
          className="w-full px-4 py-2 pl-10 text-gray-900 dark:text-white placeholder-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  );
}
