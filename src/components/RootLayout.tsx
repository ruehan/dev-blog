"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu } from "lucide-react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const { theme, setTheme } = useTheme();

	const navLinks = [
		{ href: "/", label: "Blog" },
		{ href: "/about", label: "About" },
	];

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-950">
			<nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<Link href="/" className="flex items-center">
								<span className="text-xl font-bold text-primary-600 dark:text-primary-400">Ruehan</span>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden sm:flex sm:items-center sm:space-x-8">
							<Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
								Post
							</Link>
							<Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
								About
							</Link>
							<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
								{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
							</button>
						</div>

						{/* Mobile menu button */}
						<div className="sm:hidden flex items-center">
							<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
								<Menu size={24} />
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="sm:hidden bg-white dark:bg-gray-900">
						<div className="pt-2 pb-3 space-y-1">
							<Link href="/" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
								Blog
							</Link>
							<Link href="/about" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
								About
							</Link>
						</div>
					</div>
				)}
			</nav>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

			<footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<p className="text-center text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Ruehan. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
};

export default RootLayout;
