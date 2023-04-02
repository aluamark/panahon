import React, { useState, useEffect, useRef } from "react";
import { useQueryContext } from "../../context/query";
import fetchLocation from "../../../lib/fetchLocation";
import SearchResults from "./ResultList";
import { MdSearch } from "react-icons/md";

const Search = () => {
	const { query, setQuery } = useQueryContext();
	const [data, setData] = useState(null);
	const searchRef = useRef();
	const [toggleSearch, setToggleSearch] = useState(false);

	const handleFetchLocation = async (searchValue) => {
		const response = await fetchLocation(searchValue);
		setData(response);
		setToggleSearch(true);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setQuery(query);

			if (query.trim() !== "") {
				handleFetchLocation(query);
			} else {
				setQuery("");
				setData(null);
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [query]);

	useEffect(() => {
		const closeDropdown = (e) => {
			if (!searchRef.current.contains(e.target)) {
				setToggleSearch(false);
			}
		};

		document.addEventListener("mousedown", closeDropdown);

		return () => document.removeEventListener("mousedown", closeDropdown);
	}, []);

	return (
		<div
			ref={searchRef}
			className="border border-yellow-500 rounded-t-lg w-11/12 md:w-2/3 my-5"
		>
			<div className="flex items-center">
				<div className="p-3">
					<MdSearch className="w-5 h-5" />
				</div>
				<input
					className="w-full py-5 mr-5 focus:outline-none dark:bg-zinc-800 rounded-lg cursor-pointer"
					type="text"
					placeholder="City, State"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setToggleSearch(true)}
				/>
			</div>
			{data && (
				<div className={`${toggleSearch ? "relative" : "hidden"}`}>
					<div className="w-full absolute bg-white dark:bg-zinc-800 dark:text-neutral-300 border border-yellow-500 shadow-xl">
						<SearchResults setToggleSearch={setToggleSearch} data={data} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Search;
