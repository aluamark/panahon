import "./globals.css";

export const metadata = {
	title: "panahon",
	description: "Weather App",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="font-mono dark:bg-zinc-800">{children}</body>
		</html>
	);
}
