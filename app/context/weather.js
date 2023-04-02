import { createContext, useContext, useState } from "react";

const WeatherDataContext = createContext({});

export const WeatherDataContextProvider = ({ children }) => {
	const [weatherData, setWeatherData] = useState("");

	return (
		<WeatherDataContext.Provider value={{ weatherData, setWeatherData }}>
			{children}
		</WeatherDataContext.Provider>
	);
};

export const useWeatherDataContext = () => useContext(WeatherDataContext);
