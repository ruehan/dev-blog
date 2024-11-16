'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
    text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute right-2 top-2 p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
            aria-label="Copy code"
        >
            {copied ? (
                <Check className="h-4 w-4 text-green-400" />
            ) : (
                <Copy className="h-4 w-4 text-gray-400" />
            )}
        </button>
    );
}