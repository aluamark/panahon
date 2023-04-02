import React from "react";
import { ThemeProvider } from "next-themes";
import { QueryContextProvider } from "./context/query";
import { CoordsContextProvider } from "./context/coords";
import { WeatherDataContextProvider } from "./context/weather";

const Provider = ({ children }) => {
	return (
		<ThemeProvider attribute="class">
			<QueryContextProvider>
				<CoordsContextProvider>
					<WeatherDataContextProvider>{children}</WeatherDataContextProvider>
				</CoordsContextProvider>
			</QueryContextProvider>
		</ThemeProvider>
	);
};

export default Provider;
