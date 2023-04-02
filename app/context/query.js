import { createContext, useContext, useState } from "react";

const QueryContext = createContext({});

export const QueryContextProvider = ({ children }) => {
	const [query, setQuery] = useState("");

	return (
		<QueryContext.Provider value={{ query, setQuery }}>
			{children}
		</QueryContext.Provider>
	);
};

export const useQueryContext = () => useContext(QueryContext);
