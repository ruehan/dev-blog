"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Home, User, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		setMounted(true);

		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ href: "/", label: "Blog", icon: <Home size={18} /> },
		{ href: "/about", label: "About", icon: <User size={18} /> },
	];

	const navVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: -10 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background-start to-background-end dark:from-dark-background-start dark:to-dark-background-end transition-colors duration-300">
			<motion.nav
				initial="hidden"
				animate="visible"
				variants={navVariants}
				className={`${scrolled ? "glass shadow-md" : "bg-transparent"} border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 backdrop-blur-sm transition-all duration-300`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<Link href="/" className="flex items-center group">
								<motion.span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-medium bg-clip-text text-transparent transition-all duration-300" whileHover={{ scale: 1.05 }}>
									Ruehan
								</motion.span>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden sm:flex sm:items-center sm:space-x-8">
							{navLinks.map((link) => (
								<motion.div key={link.href} variants={itemVariants}>
									<Link href={link.href} className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
										{link.icon}
										<span>{link.label}</span>
									</Link>
								</motion.div>
							))}
							<motion.button
								onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
								className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
								whileHover={{ rotate: 15, scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								variants={itemVariants}
							>
								{mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
							</motion.button>
						</div>

						{/* Mobile menu button */}
						<div className="sm:hidden flex items-center">
							<motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400" whileTap={{ scale: 0.9 }}>
								{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
							</motion.button>
						</div>
					</div>
				</div>

				{/* Mobile Navigation */}
				<AnimatePresence>
					{isMenuOpen && (
						<motion.div className="sm:hidden glass" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
							<div className="pt-2 pb-3 space-y-1 px-3">
								{navLinks.map((link) => (
									<motion.div key={link.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
										<Link
											href={link.href}
											className="flex items-center space-x-2 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
											onClick={() => setIsMenuOpen(false)}
										>
											{link.icon}
											<span>{link.label}</span>
											<ChevronRight size={16} className="ml-auto" />
										</Link>
									</motion.div>
								))}
								<motion.div
									className="flex items-center justify-between py-2 mt-4 border-t border-gray-200 dark:border-gray-700"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.2 }}
								>
									<span className="text-sm text-gray-500 dark:text-gray-400">테마 변경</span>
									<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
										{mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
									</button>
								</motion.div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.nav>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

			<footer className="border-t border-gray-200/50 dark:border-gray-800/50 glass mt-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<motion.p className="text-center text-gray-500 dark:text-gray-400 mb-4 md:mb-0" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
							© {new Date().getFullYear()} Ruehan. All rights reserved.
						</motion.p>
						<motion.div className="flex space-x-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
							<a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-300">
								<span className="sr-only">Twitter</span>
								<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
								</svg>
							</a>
							<a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-300">
								<span className="sr-only">GitHub</span>
								<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
										clipRule="evenodd"
									/>
								</svg>
							</a>
						</motion.div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default RootLayout;
