'use client';

import React, { useEffect, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';

const FONT_SIZE_KEY = 'blog-font-size';
const DEFAULT_SIZE = 16;
const MIN_SIZE = 14;
const MAX_SIZE = 20;
const STEP = 1;

export default function FontSizeControl() {
    const [fontSize, setFontSize] = useState(DEFAULT_SIZE);

    useEffect(() => {
        // 저장된 설정 불러오기
        const savedSize = localStorage.getItem(FONT_SIZE_KEY);
        if (savedSize) {
            const size = Number(savedSize);
            setFontSize(size);
            applyFontSize(size);
        }
    }, []);

    const applyFontSize = (size: number) => {
        const article = document.querySelector('.prose') as HTMLElement;
        if (article) {
            article.style.fontSize = `${size}px`;
        }
    };

    const updateFontSize = (newSize: number) => {
        const clampedSize = Math.min(Math.max(newSize, MIN_SIZE), MAX_SIZE);
        setFontSize(clampedSize);
        localStorage.setItem(FONT_SIZE_KEY, String(clampedSize));
        applyFontSize(clampedSize);
    };

    return (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg z-50">
            <button
                onClick={() => updateFontSize(fontSize - STEP)}
                disabled={fontSize <= MIN_SIZE}
                className={`p-2 rounded-full transition-colors
          ${fontSize <= MIN_SIZE
                    ? 'text-gray-400 dark:text-gray-600'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                aria-label="글자 크기 줄이기"
            >
                <Minus className="w-4 h-4" />
            </button>

            <button
                onClick={() => updateFontSize(DEFAULT_SIZE)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                aria-label="글자 크기 초기화"
            >
                <RotateCcw className="w-4 h-4" />
            </button>

            <button
                onClick={() => updateFontSize(fontSize + STEP)}
                disabled={fontSize >= MAX_SIZE}
                className={`p-2 rounded-full transition-colors
          ${fontSize >= MAX_SIZE
                    ? 'text-gray-400 dark:text-gray-600'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                aria-label="글자 크기 키우기"
            >
                <Plus className="w-4 h-4" />
            </button>

            <span className="min-w-[3ch] text-center text-sm text-gray-600 dark:text-gray-400">
        {fontSize}px
      </span>
        </div>
    );
}