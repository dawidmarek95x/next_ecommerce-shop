import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.scss";
import { Header } from "@/ui/organisms/Header";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
	subsets: ["latin", "latin-ext"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "E-commerse shop",
	description:
		"On our store's website you will find an unconventional range of clothes and accessories made by hand with the greatest care and attention to quality! Check for yourself what interesting we can offer you.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<Header />
				<main className="sm:py-18 mx-auto flex w-full max-w-2xl flex-grow flex-col px-8 py-12 sm:px-6 lg:max-w-7xl">
					{children}
				</main>
				<footer>
					<p className="text-center text-sm text-gray-500">© 2023</p>
				</footer>
			</body>
		</html>
	);
}
