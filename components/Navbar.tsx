"use client";

import Link from "next/link";
import { TrendingUp, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [theme, setTheme] = useState<"dark" | "light" | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		handleScroll();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "dark";
		setTheme(savedTheme as "dark" | "light");
		if (savedTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, []);

	const toggleTheme = () => {
		if (!theme) return;
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	if (!theme) return null;

	return (
		<nav
			className={`sticky z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full flex justify-center ${
				isScrolled ? "top-4 px-4" : "top-0"
			}`}
		>
			<div
				className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center w-full justify-between ${
					isScrolled
						? "max-w-3xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/60 dark:border-slate-800/40 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)] rounded-full px-6 py-2.5"
						: "max-w-7xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 px-4 sm:px-6 lg:px-8 py-4"
				}`}
			>
				<div className="flex-none flex justify-center">
					<Link href="/" className="flex items-center gap-2.5 group">
						<div className="bg-emerald-600 p-2 rounded-xl text-white shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] group-hover:bg-emerald-500 transition-colors">
							<TrendingUp
								className={`transition-all duration-500 ${isScrolled ? "w-4 h-4" : "w-5 h-5"}`}
							/>
						</div>
						<span
							className={`font-bold tracking-tight text-slate-900 dark:text-slate-100 transition-all duration-500 ${isScrolled ? "text-lg" : "text-xl"}`}
						>
							TradeIntel
						</span>
					</Link>
				</div>

				<div className="flex-1 flex justify-end">
					<button
						onClick={toggleTheme}
						className="p-2 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border border-slate-200 dark:border-slate-700/50"
						aria-label="Toggle theme"
						title={
							theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
						}
					>
						{theme === "dark" ? (
							<Sun className="w-4 h-4" />
						) : (
							<Moon className="w-4 h-4" />
						)}
					</button>
				</div>
			</div>
		</nav>
	);
}
