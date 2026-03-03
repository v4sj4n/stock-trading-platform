"use client";

import { useState } from "react";
import { readStreamableValue } from "@ai-sdk/rsc";
import platformsData from "@/data/platforms.json";
import { comparePlatformsAction } from "./actions";
import { AiModal } from "@/components/AiModal";
import {
	ShieldCheck,
	Star,
	CheckCircle2,
	ArrowRight,
	BarChart3,
	TrendingUp,
	Bot,
	Activity,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

export default function Home() {
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [completion, setCompletion] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [aiError, setAiError] = useState<Error | null>(null);

	const platforms = platformsData.platforms;

	const toggleSelection = (id: string) => {
		setSelectedPlatforms((prev) => {
			if (prev.includes(id)) return prev.filter((p) => p !== id);
			if (prev.length < 3) return [...prev, id];
			return prev;
		});
	};

	const handleCompare = async () => {
		if (selectedPlatforms.length < 2) return;

		setIsModalOpen(true);
		setIsLoading(true);
		setCompletion("");
		setAiError(null);

		try {
			const platformNames = selectedPlatforms.map(
				(id) => platforms.find((p) => p.id === id)?.name,
			);

			const stream = await comparePlatformsAction(platformNames.join(", "));
			for await (const delta of readStreamableValue(stream)) {
				setCompletion((current) => current + (delta ?? ""));
			}
		} catch (err: any) {
			console.error(err);
			setAiError(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-slate-200 selection:text-slate-900 dark:selection:bg-slate-800 dark:selection:text-slate-100 pb-24 relative transition-colors duration-300">
			<section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60 pt-24 pb-32 transition-colors duration-300">
				<div className="absolute top-0 inset-x-0 h-40 bg-linear-to-b from-transparent dark:from-emerald-900/10 to-transparent pointer-events-none transition-colors duration-300" />
				<div className="absolute -top-24 -right-24 w-96 h-96 bg-transparent dark:bg-emerald-900/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300" />

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
					<div className="flex-1 text-center lg:text-left">
						<h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 max-w-2xl mx-auto lg:mx-0 transition-colors duration-300">
							Find the perfect broker for your{" "}
							<span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-800 to-emerald-600 dark:from-emerald-400 dark:to-emerald-200">
								investing style.
							</span>
						</h1>

						<p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl lg:max-w-xl mx-auto lg:mx-0 leading-relaxed transition-colors duration-300">
							Independent, data-driven evaluation of top US-regulated stock
							trading platforms. We analyze fees, features, and platform
							capabilities so you don't have to.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
							<a
								href="#reviews"
								className="inline-flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-7 py-3.5 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm group hover:shadow-md"
							>
								Compare Platforms
								<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
							</a>
							<a
								href="#reviews"
								className="inline-flex items-center justify-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-7 py-3.5 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
							>
								Read Detailed Reviews
							</a>
						</div>
					</div>

					<div className="flex-1 flex justify-center lg:justify-end w-full max-w-[500px] lg:max-w-none relative mt-12 lg:mt-0">
						<div className="absolute inset-0 bg-transparent dark:bg-linear-to-tr dark:from-emerald-500/20 dark:to-teal-500/20 blur-3xl rounded-[3rem] transform -rotate-6 scale-105 pointer-events-none transition-colors duration-300"></div>
						<img
							src="/hero-graphic.png"
							alt="Trading Dashboard Graphic"
							className="relative rounded-4xl shadow-2xl border border-slate-200/50 dark:border-slate-800/80 w-full object-cover aspect-square sm:aspect-video lg:aspect-square"
						/>
					</div>
				</div>
			</section>

			<section className="relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
				<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-sm p-8 grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200/60 dark:divide-slate-800/60 transition-colors duration-300">
					<div className="flex items-start gap-4 md:px-4">
						<div className="bg-emerald-50 p-2.5 rounded-lg text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 shrink-0">
							<ShieldCheck className="w-5 h-5" />
						</div>
						<div>
							<h3 className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">
								US-Regulated Only
							</h3>
							<p className="text-slate-600 dark:text-slate-400 text-sm mt-1 leading-relaxed transition-colors duration-300">
								Platforms strictly registered with the SEC and FINRA.
							</p>
						</div>
					</div>
					<div className="flex items-start gap-4 md:px-8 pt-6 md:pt-0">
						<div className="bg-emerald-50 p-2.5 rounded-lg text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 shrink-0">
							<TrendingUp className="w-5 h-5" />
						</div>
						<div>
							<h3 className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">
								Data-Driven Metrics
							</h3>
							<p className="text-slate-600 dark:text-slate-400 text-sm mt-1 leading-relaxed transition-colors duration-300">
								Evaluations built on hard data, not paid placements.
							</p>
						</div>
					</div>
					<div className="flex items-start gap-4 md:px-8 pt-6 md:pt-0">
						<div className="bg-emerald-50 p-2.5 rounded-lg text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 shrink-0">
							<BarChart3 className="w-5 h-5" />
						</div>
						<div>
							<h3 className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">
								Live Fee Tracking
							</h3>
							<p className="text-slate-600 dark:text-slate-400 text-sm mt-1 leading-relaxed transition-colors duration-300">
								Options & margin rates monitored systematically.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section
				id="reviews"
				className="py-12 bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
					<div className="flex items-end justify-between">
						<div>
							<h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
								Platform Highlights
							</h2>
							<p className="text-slate-600 dark:text-slate-400 mt-2 transition-colors duration-300">
								Swipe to explore specialized brokers. Select to compare.
							</p>
						</div>
						<div className="hidden md:flex items-center gap-2 text-sm font-medium">
							<button
								onClick={() => {
									const el = document.getElementById("explore-scroll");
									if (el) el.scrollBy({ left: -350, behavior: "smooth" });
								}}
								className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
								aria-label="Scroll left"
							>
								<ChevronLeft className="w-5 h-5" />
							</button>
							<button
								onClick={() => {
									const el = document.getElementById("explore-scroll");
									if (el) el.scrollBy({ left: 350, behavior: "smooth" });
								}}
								className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
								aria-label="Scroll right"
							>
								<ChevronRight className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>

				<div
					id="explore-scroll"
					className="w-full overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory scroll-smooth"
				>
					<div className="flex gap-6 w-max px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ml-auto mr-auto pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8">
						{platforms.map((platform) => {
							const isSelected = selectedPlatforms.includes(platform.id);
							return (
								<div
									key={platform.id}
									className={`group relative flex w-[320px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 cursor-pointer hover:shadow-xl dark:bg-slate-900/50 dark:hover:bg-slate-900/80 md:w-[380px] ${isSelected
										? "border-emerald-600 bg-emerald-50/30 shadow-lg ring-1 ring-emerald-600 dark:border-emerald-500/50 dark:bg-emerald-500/5 dark:ring-emerald-500/50"
										: "border-slate-200/60 shadow-sm hover:border-emerald-200 dark:border-slate-800/60 dark:hover:border-emerald-900/50 dark:shadow-none"
										}`}
									onClick={() => toggleSelection(platform.id)}
								>
									<div
										className={`absolute top-0 left-0 right-0 h-1 transition-colors duration-300 ${isSelected ? "bg-emerald-500" : "bg-transparent group-hover:bg-emerald-500/20"}`}
									/>

									<div className="mb-4 flex items-start justify-between mt-1">
										<div>
											<h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
												{platform.name}
											</h3>
											<div className="flex items-center gap-2 mt-1">
												<span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
													<Star className="h-3 w-3 fill-current" />{" "}
													{platform.rating}
												</span>
												<span className="text-xs font-medium text-slate-500 dark:text-slate-400">
													{platform.bestFor}
												</span>
											</div>
										</div>
										<div
											className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isSelected
												? "bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500/20 dark:border-emerald-400 dark:text-emerald-400"
												: "border-slate-200 bg-slate-50 text-transparent dark:border-slate-800 dark:bg-slate-800/50"
												}`}
										>
											<CheckCircle2
												className={`h-4 w-4 ${isSelected ? "opacity-100" : "opacity-0"}`}
											/>
										</div>
									</div>

									<p
										className="text-xs text-slate-500 dark:text-slate-400 mb-6 min-h-[32px] line-clamp-2"
										title={platform.targetInvestor}
									>
										{platform.targetInvestor}
									</p>

									<div className="mb-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4 border border-slate-100 dark:border-slate-800/60">
										<div className="flex justify-between items-center mb-3">
											<span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
												Stock Fees
											</span>
											<span className="text-sm font-bold text-slate-900 dark:text-slate-100">
												{platform.stockCommission}
											</span>
										</div>
										<div className="flex justify-between items-center mb-3">
											<span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
												Options
											</span>
											<span className="text-sm font-medium text-slate-700 dark:text-slate-300">
												{platform.optionsFees}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
												Min. Deposit
											</span>
											<span className="text-sm font-medium text-slate-700 dark:text-slate-300">
												{platform.minimumDeposit}
											</span>
										</div>
									</div>

									<div className="mt-auto pt-2">
										<p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
											Platform Strengths
										</p>
										<ul className="space-y-2.5">
											{platform.strengths.slice(0, 2).map((strength, idx) => (
												<li
													key={idx}
													className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400"
												>
													<span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/50 dark:bg-emerald-400/50" />
													<span className="leading-relaxed">{strength}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{selectedPlatforms.length > 0 && (
				<div className="fixed bottom-6 inset-x-0 z-40 mx-auto max-w-lg px-4 flex justify-center animate-in slide-in-from-bottom-5 fade-in duration-300">
					<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl dark:shadow-2xl rounded-2xl py-3 px-5 flex items-center gap-4 justify-between w-full border border-slate-200 dark:border-slate-800 transition-colors duration-300">
						<div className="flex flex-col">
							<span className="text-sm font-semibold">Compare Platforms</span>
							<span className="text-xs text-slate-500 dark:text-slate-400">
								{selectedPlatforms.length} of 3 selected (Min 2)
							</span>
						</div>

						<button
							onClick={handleCompare}
							disabled={selectedPlatforms.length < 2}
							className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${selectedPlatforms.length >= 2
								? "bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-sm hover:shadow active:scale-[0.98]"
								: "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
								}`}
						>
							<Bot className="w-4 h-4" />
							Generate AI Analysis
						</button>
					</div>
				</div>
			)}

			<AiModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				isLoading={isLoading}
				completion={completion}
				error={aiError}
			/>

			<footer className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 py-16 mt-20 transition-colors duration-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/60 pt-16 transition-colors duration-300">
					<div className="grid md:grid-cols-2 gap-12 mb-12">
						<div>
							<h3 className="text-slate-900 dark:text-white font-semibold text-lg mb-4 flex items-center gap-2 transition-colors duration-300">
								<Activity className="w-5 h-5 text-slate-700 dark:text-slate-300" />{" "}
								Independent Research
							</h3>
							<p className="text-sm leading-relaxed max-w-md">
								We provide data-driven evaluations of financial platforms. We
								are not investment advisors. All investing involves risk, and
								you should conduct your own research before making financial
								decisions.
							</p>
						</div>
						<div className="md:text-right">
							<h3 className="text-slate-900 dark:text-white font-semibold text-lg mb-4 transition-colors duration-300">
								Current Data
							</h3>
							<p className="text-sm leading-relaxed md:ml-auto max-w-sm">
								Information accurately updated as of{" "}
								{new Date().toLocaleDateString("en-US")}. Fees, terms, and
								features are subject to change by the respective platforms at
								any time.
							</p>
						</div>
					</div>
					<div className="border-t border-slate-200 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm transition-colors duration-300">
						<p>
							© {new Date().getFullYear()} Trading Platform Intelligence. All
							rights reserved.
						</p>
						<div className="flex gap-6">
							<a
								href="#"
								className="hover:text-slate-900 dark:hover:text-white transition-colors"
							>
								Methodology
							</a>
							<a
								href="#"
								className="hover:text-slate-900 dark:hover:text-white transition-colors"
							>
								Privacy
							</a>
							<a
								href="#"
								className="hover:text-slate-900 dark:hover:text-white transition-colors"
							>
								Terms
							</a>
						</div>
					</div>
				</div>
			</footer>

			<p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-20">
				P.S. THIS IS JUST A DEMO MVP WEBSITE NOTHING ON THIS SITE IS REAL VALID
				DATA THAT YOU SHOULD TRUST OR USE FOR ANY FINANCIAL DECISIONS. THIS IS
				PURELY FOR DEMONSTRATION PURPOSES ONLY.
			</p>
		</main>
	);
}
