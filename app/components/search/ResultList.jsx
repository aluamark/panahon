import React from "react";
import Result from "./Result";

const SearchResults = ({ setToggleSearch, data }) => {
	if (data.cod) {
		return <p className="px-5 py-1 text-red-500">{data.message}</p>;
	}

	if (data.length === 0) {
		return <p className="px-5 py-1">no available location</p>;
	}

	return (
		<>
			{data.map((result, index) => (
				<Result key={index} result={result} setToggleSearch={setToggleSearch} />
			))}
		</>
	);
};

export default SearchResults;
