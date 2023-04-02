import React, { useEffect, useState } from "react";
import date from "date-and-time";
import { useCoordsContext } from "../../context/coords";
import { useWeatherDataContext } from "../../context/weather";
import fetchWeather from "../../../lib/fetchWeather";
import getTempColor from "../../../lib/getTempColor";
import Detail from "./Detail";
import {
	BsWind,
	BsWater,
	BsSpeedometer2,
	BsSunrise,
	BsSunset,
} from "react-icons/bs";
import { MdOutlineVisibility } from "react-icons/md";
import "./weather.css";
import { CSSTransition } from "react-transition-group";
import { CircleLoader } from "react-spinners";

const directions = [
	"N",
	"NNE",
	"NE",
	"ENE",
	"E",
	"ESE",
	"SE",
	"SSE",
	"S",
	"SSW",
	"SW",
	"WSW",
	"W",
	"WNW",
	"NW",
	"NNW",
];

const WeatherData = () => {
	const { coords, setCoords } = useCoordsContext(null);
	const { weatherData, setWeatherData } = useWeatherDataContext(null);
	const [tempColor, setTempColor] = useState("");
	const [sunrise, setSunrise] = useState(null);
	const [sunset, setSunset] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const now = new Date();
	const dateAndTime = date.format(now, "ddd, MMM DD, hh:mm A");
	const [direction, setDirection] = useState(null);

	const handleFetchWeather = async (latitude, longitude) => {
		const response = await fetchWeather(latitude, longitude);

		if (response.cod === 200) {
			setWeatherData(response);

			// calculate compass wind direction
			let section = parseInt(response.wind.deg / 22.5 + 0.5);
			section = section % 16;
			setDirection(directions[section]);

			// set temperature gradient color
			const celsius = Math.floor(response.main.feels_like - 273.15);
			const color = getTempColor(celsius);
			setTempColor(color);

			// convert sunrise & sunset time
			setSunrise(date.format(new Date(response.sys.sunrise * 1000), "hh:mm A"));
			setSunset(date.format(new Date(response.sys.sunset * 1000), "hh:mm A"));
		} else {
			setError(response);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		// get user location
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(({ coords }) => {
				const { latitude, longitude } = coords;
				setCoords({ latitude, longitude });
			});
		}
	}, []);

	useEffect(() => {
		if (coords) {
			handleFetchWeather(coords.latitude, coords.longitude);
		}
	}, [coords]);

	if (isLoading) {
		return (
			<CircleLoader color="#eab308" className="mx-auto my-3 animate-pulse" />
		);
	}

	if (error) {
		return <p className="text-center">System error: {error.message}</p>;
	}

	return (
		<>
			{weatherData && (
				<div>
					<div className="text-center">
						<h5 className="text-xl font-semibold">
							<span className="text-yellow-500">
								{weatherData.name}, {weatherData.sys.country}
							</span>
						</h5>

						<h6>{dateAndTime}</h6>
						<img
							src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
							width={100}
							height={100}
							alt={`${weatherData.weather[0].main} image`}
							className="mx-auto hover:scale-110 duration-300"
						/>
						<h4>{`${weatherData.weather[0].main} / ${weatherData.weather[0].description}`}</h4>
					</div>

					<CSSTransition
						in={true}
						appear={true}
						timeout={3000}
						classNames="my-node"
					>
						<div className="flex justify-center">
							<div className="relative flex p-5 hover:animate-pulse">
								<div
									className={`relative font-bold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 ${tempColor}`}
								>
									{Math.floor(weatherData.main.feels_like - 273.15)}
									<div className="absolute text-black dark:text-white top-0 -right-8 text-3xl pt-3">
										&#8451;
									</div>
								</div>
							</div>
						</div>
					</CSSTransition>

					<div className="xs:w-[301.75px] mx-auto">
						<Detail
							icon={<BsWind />}
							detail="Wind"
							data={`${weatherData.wind.speed}m/s ${direction}`}
						/>
						<Detail
							icon={<BsWater />}
							detail="Humidity"
							data={`${weatherData.main.humidity}%`}
						/>
						<Detail
							icon={<BsSpeedometer2 />}
							detail="Pressure"
							data={`${weatherData.main.pressure}hPa`}
						/>
						<Detail
							icon={<MdOutlineVisibility />}
							detail="Visibility"
							data={`${weatherData.visibility / 1000}km`}
						/>
					</div>
					<div className="xs:w-[301.75px] mx-auto pt-5">
						<div className="flex justify-between">
							<div>
								<BsSunrise className="fill-yellow-400 w-10 h-10 mx-auto hover:-translate-y-1 duration-300" />
								{sunrise}
							</div>

							<div className="text-center">
								<BsSunset className="fill-yellow-600 w-10 h-10 mx-auto hover:translate-y-1 duration-300" />
								{sunset}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default WeatherData;
