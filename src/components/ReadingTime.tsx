export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
}

interface ReadingTimeProps {
    content: string;
}

export default function ReadingTime({ content }: ReadingTimeProps) {
    const minutes = calculateReadingTime(content);

    return (
        <span className="text-sm text-gray-600 dark:text-gray-400">
      {minutes} min read
    </span>
    );
}