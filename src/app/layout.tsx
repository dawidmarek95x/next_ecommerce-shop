import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.scss";
import { Header } from "@/ui/organisms/Header";
import { Footer } from "@/ui/organisms/Footer";

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
} // modal,
: {
	children: React.ReactNode;
	// modal: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<Header />
				<main className="mb-6">{children}</main>
				<Footer />
				{/* {modal} */}
			</body>
		</html>
	);
}
