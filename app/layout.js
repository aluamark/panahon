import "./globals.css";
import Script from "next/script";

export const metadata = {
	title: "panahon",
	description: "Weather App",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Script
				id="Adsense-id"
				data-ad-client="ca-pub-9001845428597860"
				async="true"
				strategy="beforeInteractive"
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
			/>
			<body className="font-mono dark:bg-zinc-800">{children}</body>
		</html>
	);
}
