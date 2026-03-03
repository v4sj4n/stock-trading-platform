import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "TradeIntel | Premium Stock Trading Platform Comparison",
	description:
		"Independent comparison of top US stock trading platforms including Charles Schwab, Fidelity, E*TRADE, Robinhood, TD Ameritrade, and Interactive Brokers.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${figtree.variable} scroll-smooth transition-colors duration-300`}
		>
			<body className="font-sans antialiased text-slate-900 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
