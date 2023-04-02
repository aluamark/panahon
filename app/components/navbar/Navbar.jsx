import React from "react";
import ListItem from "./ListItem";
import ThemeSwitch from "./ThemeSwitch";
import LetterAnimator from "./LetterAnimator";

const Navbar = () => {
	const brand = "panahon".split("");

	return (
		<nav className="fixed w-full bg-white dark:bg-zinc-800 shadow-xl z-50">
			<div className="max-w-screen-md mx-auto flex justify-between">
				<div className="flex p-3 text-yellow-500 tracking-widest">
					{brand.map((letter, index) => {
						return <LetterAnimator key={index}>{letter}</LetterAnimator>;
					})}
				</div>
				<ul className="flex mr-3">
					<ListItem>
						<ThemeSwitch />
					</ListItem>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
