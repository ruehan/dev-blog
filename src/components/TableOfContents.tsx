// src/components/TableOfContents.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('h1, h2, h3')).map((element, index) => {
            if (!element.id) {
                element.id = `heading-${index}`;
            }
            return {
                id: element.id,
                text: element.textContent || '',
                level: Number(element.tagName.charAt(1))
            };
        });

        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-10% 0% -85% 0%',
                threshold: 0.5
            }
        );

        elements.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav className="sticky top-8 h-[calc(100vh-4rem)] overflow-auto">
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
                        onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(heading.id)?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }}
                        className={`block py-1 text-sm transition-colors duration-200 ${
                        activeId === heading.id
                            ? 'text-blue-600 dark:text-blue-400 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                        >
                        {heading.text}
                        </a>
                    </li>
                    ))}
            </ul>
        </nav>
    );
}