"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Search, X } from "lucide-react";
import { PostMeta } from "@/types/post";
import debounce from "lodash.debounce";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
	posts: PostMeta[];
	onSearch: (results: PostMeta[]) => void;
}

export default function SearchBar({ posts, onSearch }: SearchBarProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	// 모든 포스트에 대한 검색 인덱스를 미리 계산하여 성능 개선
	const searchableContent = useMemo(() => {
		return posts.map((post) => ({
			...post,
			searchContent: `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(" ")}`.toLowerCase(),
		}));
	}, [posts]);

	// 실제 검색 함수는 메모이제이션하여 불필요한 재계산 방지
	const performSearch = useCallback(
		(term: string) => {
			if (!term.trim()) {
				onSearch(posts);
				return;
			}

			const searchQuery = term.toLowerCase();
			const searchResults = searchableContent.filter((post) => post.searchContent.includes(searchQuery));

			onSearch(searchResults);
		},
		[posts, searchableContent, onSearch]
	);

	// 디바운스된 검색 로직으로 타이핑 중의 과도한 렌더링 방지
	const debouncedSearch = useMemo(
		() =>
			debounce((term: string) => {
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

	// 검색어 초기화 핸들러
	const clearSearch = () => {
		setInputValue("");
		setSearchTerm("");
		performSearch("");
	};

	// 컴포넌트 언마운트 시 디바운스 취소
	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	return (
		<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-2xl mx-auto mb-8">
			<div
				className={`relative transition-all duration-300 ${isFocused ? "shadow-glow" : isHovered ? "shadow-md" : "shadow-sm"}`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<motion.input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholder="포스트 검색..."
					aria-label="Search blog posts"
					className="w-full px-4 py-3 pl-12 pr-10 text-gray-900 dark:text-white placeholder-gray-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-300/70 dark:border-gray-700/70 hover:border-primary-400/70 dark:hover:border-primary-600/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 glass"
					whileFocus={{ scale: 1.01 }}
				/>
				<motion.div
					className="absolute left-4 top-3.5 text-primary-500 dark:text-primary-400 transition-all duration-300"
					animate={{
						scale: isFocused || isHovered ? 1.1 : 1,
						rotate: isFocused ? [0, -10, 10, -5, 5, 0] : 0,
					}}
					transition={{
						duration: 0.5,
						rotate: { duration: 0.5, ease: "easeInOut" },
					}}
				>
					<Search size={20} />
				</motion.div>

				<AnimatePresence>
					{inputValue && (
						<motion.button
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							whileTap={{ scale: 0.9 }}
							onClick={clearSearch}
							className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
							aria-label="Clear search"
						>
							<X size={18} />
						</motion.button>
					)}
				</AnimatePresence>
			</div>

			{searchTerm && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
					<span>"{searchTerm}" 검색 결과</span>
				</motion.div>
			)}
		</motion.div>
	);
}
