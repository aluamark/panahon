import React from "react";
import { useQueryContext } from "../../context/query";
import { useCoordsContext } from "../../context/coords";

const Result = ({ setToggleSearch, result }) => {
	const { setQuery } = useQueryContext();
	const { setCoords } = useCoordsContext();

	const handleClick = () => {
		setCoords({ latitude: result.lat, longitude: result.lon });
		setQuery("");
		setToggleSearch(false);
	};

	return (
		<p
			onClick={handleClick}
			className="px-5 py-1 hover:bg-neutral-200 dark:hover:bg-zinc-700"
		>
			{result.name} {result.state ? result.state : null} {result.country}
		</p>
	);
};

export default Result;
