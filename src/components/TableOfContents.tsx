// src/components/TableOfContents.tsx
"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { generateId } from "@/utils/text";

interface Heading {
	id: string;
	text: string;
	level: number;
}

export default function TableOfContents() {
	const [headings, setHeadings] = useState<Heading[]>([]);
	const [activeId, setActiveId] = useState<string>("");

	const extractHeadings = useCallback((): Heading[] => {
		return Array.from(document.querySelectorAll("h1, h2, h3")).map((element) => {
			const text = element.textContent || "";
			if (!element.id) {
				element.id = generateId(text);
			}

			return {
				id: element.id,
				text: text,
				level: Number(element.tagName.charAt(1)),
			};
		});
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			const elements = extractHeadings();
			setHeadings(elements);

			const observer = new IntersectionObserver(
				(entries) => {
					const visibleHeadings = entries
						.filter((entry) => entry.isIntersecting)
						.map((entry) => ({
							id: entry.target.id,
							top: entry.boundingClientRect.top,
						}));

					if (visibleHeadings.length > 0) {
						const topHeading = visibleHeadings.reduce((prev, current) => (prev.top < current.top ? prev : current));
						setActiveId(topHeading.id);
					}
				},
				{
					rootMargin: "-5% 0% -80% 0%",
					threshold: [0.1, 0.5, 0.9], // 여러 임계값으로 더 정확한 활성화
				}
			);
			elements.forEach((heading) => {
				const element = document.getElementById(heading.id);
				if (element) {
					observer.observe(element);
				}
			});

			// 컴포넌트가 언마운트될 때 정리
			return () => {
				observer.disconnect();
			};
		}, 150); // 컨텐츠 로드 후 헤딩이 DOM에 완전히 렌더링될 시간 확보

		return () => clearTimeout(timer);
	}, [extractHeadings]);

	const scrollToHeading = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault();

		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});

			setActiveId(id);

			history.pushState(null, "", `#${id}`);
		}
	}, []);

	if (headings.length === 0) return null;

	return (
		<nav className="sticky top-8 h-[calc(100vh-4rem)] overflow-auto" aria-label="Table of contents">
			<h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">목차</h2>
			<ul className="space-y-2">
				{headings.map((heading) => (
					<li key={heading.id} style={{ paddingLeft: `${heading.level - 1}rem` }}>
						<a
							href={`#${heading.id}`}
							onClick={(e) => scrollToHeading(e, heading.id)}
							className={`block py-1 text-sm transition-colors duration-200 ${
								activeId === heading.id ? "text-blue-600 dark:text-blue-400 font-medium" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
							}`}
							aria-current={activeId === heading.id ? "location" : undefined}
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
