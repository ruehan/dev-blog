'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu } from 'lucide-react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { theme, setTheme } = useTheme();

    const navLinks = [
        { href: '/', label: 'Blog' },
        { href: '/about', label: 'About' }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <nav className="border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  Dev Blog
                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:flex sm:items-center sm:space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="sm:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            <footer className="border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Dev Blog. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default RootLayout;