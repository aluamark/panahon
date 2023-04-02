import React from "react";
import WeatherData from "./WeatherData";

const Weather = () => {
	return (
		<div className="border border-yellow-500 rounded-b-lg w-11/12 md:w-2/3 p-5">
			<WeatherData />
		</div>
	);
};

export default Weather;
