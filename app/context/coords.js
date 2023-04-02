import { createContext, useContext, useState } from "react";

const CoordsContext = createContext({});

export const CoordsContextProvider = ({ children }) => {
	const [coords, setCoords] = useState("");

	return (
		<CoordsContext.Provider value={{ coords, setCoords }}>
			{children}
		</CoordsContext.Provider>
	);
};

export const useCoordsContext = () => useContext(CoordsContext);
