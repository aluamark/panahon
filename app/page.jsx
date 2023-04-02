"use client";
import Provider from "./Provider";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";
import Weather from "./components/content/Weather";

export default function Home() {
	return (
		<Provider>
			<Navbar />
			<main className="py-20 max-w-screen-md mx-auto">
				<div className="flex flex-col items-center">
					<h1 className="text-xl">Hello, how&apos;s your panahon?</h1>
					<Search />
					<Weather />
				</div>
			</main>
		</Provider>
	);
}
