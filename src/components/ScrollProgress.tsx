'use client';

import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const windowHeight = scrollHeight - clientHeight;
            const progress = (scrollTop / windowHeight) * 100;
            setProgress(progress);
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
            <div
                className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-150"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}