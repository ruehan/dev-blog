import { type MDXComponents } from 'mdx/types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyButton from "@/components/CopyButton";

const components: MDXComponents = {
    h1: ({ children }) => (
        <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-900 dark:text-white">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-xl font-bold mt-4 mb-3 text-gray-900 dark:text-white">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="mb-4 ml-4 list-disc list-inside text-gray-700 dark:text-gray-300">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="mb-4 ml-4 list-decimal list-inside text-gray-700 dark:text-gray-300">
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="mb-2">{children}</li>
    ),
    a: ({ children, href }) => (
        <a
            href={href}
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic text-gray-600 dark:text-gray-400">
            {children}
        </blockquote>
    ),
    code: ({ children, className }) => {
        const language = className ? className.replace('language-', '') : 'javascript';
        const codeString = String(children).trim();

        return (
            <div className="relative group">
                <CopyButton text={codeString} />
                <SyntaxHighlighter
                    language={language}
                    style={dracula}
                    className="rounded-lg my-4"
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>
        );
    },
    inlineCode: ({ children }) => (
        <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono">
            {children}
        </code>
    ),
    hr: () => (
        <hr className="my-8 border-gray-200 dark:border-gray-800" />
    ),
    table: ({ children }) => (
        <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                {children}
            </table>
        </div>
    ),
    th: ({ children }) => (
        <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left text-gray-900 dark:text-white">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            {children}
        </td>
    ),
};

export default components;