'use client';

import React from 'react';
import { useTheme } from 'next-themes';

export default function Comments() {
    const { theme } = useTheme();

    React.useEffect(() => {
        // Load Giscus
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', 'ruehan/dev-blog'); //
        script.setAttribute('data-repo-id', 'R_kgDONQWOQQ'); //
        script.setAttribute('data-category', 'General'); //
        script.setAttribute('data-category-id', 'DIC_kwDONQWOQc4CkVBf');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'bottom');
        script.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
        script.setAttribute('data-lang', 'en');
        script.crossOrigin = 'anonymous';
        script.async = true;

        const comments = document.getElementById('comments-container');
        if (comments) {
            comments.innerHTML = '';
            comments.appendChild(script);
        }

        return () => {
            if (comments) {
                comments.innerHTML = '';
            }
        };
    }, [theme]);

    return (
        <section className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Comments</h2>
            <div id="comments-container" />
        </section>
    );
}