import ReactMarkdown from "react-markdown";
import { Bot, Loader2, X } from "lucide-react";

interface AiModalProps {
	isOpen: boolean;
	onClose: () => void;
	isLoading: boolean;
	completion: string | undefined;
	error?: Error | null;
}

export function AiModal({
	isOpen,
	onClose,
	isLoading,
	completion,
	error,
}: AiModalProps) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
			onClick={onClose}
		>
			<div
				className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
					<div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
						<Bot className="w-5 h-5" />
						<h3 className="font-bold text-slate-900 dark:text-white">
							AI Comparison Analysis
						</h3>
					</div>
					<button
						onClick={onClose}
						className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
						aria-label="Close modal"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="p-6 overflow-y-auto no-scrollbar grow bg-white dark:bg-slate-900">
					{isLoading && !completion ? (
						<div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 dark:text-slate-400 space-y-4">
							<Loader2 className="w-8 h-8 text-emerald-600 dark:text-emerald-500 animate-spin" />
							<p className="text-sm font-medium animate-pulse">
								Analyzing specialized metrics and fees...
							</p>
						</div>
					) : error ? (
						<div className="text-red-500 dark:text-red-400 text-center py-8">
							{error.message}
						</div>
					) : (
						<div className="prose prose-slate dark:prose-invert prose-sm sm:prose-base max-w-none text-slate-700 dark:text-slate-300 [&>h1]:text-xl [&>h1]:font-bold [&>h1]:text-slate-900 dark:[&>h1]:text-white [&>h1]:mt-6 [&>h1]:mb-2 [&>h2]:text-lg [&>h2]:font-bold [&>h2]:text-slate-900 dark:[&>h2]:text-white [&>h2]:mt-5 [&>h2]:mb-2 [&>h3]:font-semibold [&>h3]:text-slate-800 dark:[&>h3]:text-slate-200 [&>h3]:mt-4 [&>h3]:mb-1.5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-5 [&>p]:mb-3 [&>p]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-slate-900 dark:[&_strong]:text-white">
							<ReactMarkdown>{completion ?? ""}</ReactMarkdown>
						</div>
					)}
				</div>

				{!isLoading && (
					<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
						<button
							onClick={onClose}
							className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium rounded-xl text-sm transition-colors"
						>
							Close Analysis
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
