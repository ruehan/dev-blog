// src/components/TableOfContents.tsx
'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // 헤딩 추출 로직을 메모이제이션하여 불필요한 계산 방지
    const extractHeadings = useCallback((): Heading[] => {
        return Array.from(document.querySelectorAll('h1, h2, h3')).map((element, index) => {
            if (!element.id) {
                element.id = `heading-${index}`;
            }
            return {
                id: element.id,
                text: element.textContent || '',
                level: Number(element.tagName.charAt(1))
            };
        });
    }, []);

    useEffect(() => {
        const elements = extractHeadings();
        setHeadings(elements);

        // IntersectionObserver는 한 번만 생성
        const observer = new IntersectionObserver(
            (entries) => {
                // 화면에 보이는 헤딩 중 가장 위에 있는 것을 활성화
                const visibleHeadings = entries
                    .filter(entry => entry.isIntersecting)
                    .map(entry => ({ id: entry.target.id, top: entry.boundingClientRect.top }));
                
                if (visibleHeadings.length > 0) {
                    // 가장 위에 있는 헤딩을 찾아 활성화
                    const topHeading = visibleHeadings.reduce((prev, current) => 
                        prev.top < current.top ? prev : current
                    );
                    setActiveId(topHeading.id);
                }
            },
            {
                rootMargin: '-10% 0% -85% 0%',
                threshold: 0.2
            }
        );

        // 모든 헤딩 요소를 관찰
        elements.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        // 컴포넌트가 언마운트될 때 관찰자 연결 해제
        return () => {
            observer.disconnect();
        };
    }, [extractHeadings]);

    // 스크롤 처리 함수를 메모이제이션
    const scrollToHeading = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, []);

    // 헤딩이 없으면 렌더링하지 않음
    if (headings.length === 0) return null;

    return (
        <nav className="sticky top-8 h-[calc(100vh-4rem)] overflow-auto" aria-label="Table of contents">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                목차
            </h2>
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 1)}rem` }}
                    >
                        <a
                            href={`#${heading.id}`}
                            onClick={(e) => scrollToHeading(e, heading.id)}
                            className={`block py-1 text-sm transition-colors duration-200 ${
                                activeId === heading.id
                                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                            aria-current={activeId === heading.id ? 'location' : undefined}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}