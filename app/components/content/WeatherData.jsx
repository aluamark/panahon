import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./weather.css";
import date from "date-and-time";
import { CSSTransition } from "react-transition-group";
import { CircleLoader } from "react-spinners";
import { useCoordsContext } from "../../context/coords";
import { useWeatherDataContext } from "../../context/weather";
import fetchWeather from "../../../lib/fetchWeather";
import {
	BsWind,
	BsWater,
	BsSpeedometer2,
	BsSunrise,
	BsSunset,
} from "react-icons/bs";
import { MdOutlineVisibility } from "react-icons/md";
import Detail from "./Detail";

import directions from "../../../lib/directions";
import toBase64 from "../../../lib/toBase64";
import shimmer from "../../../lib/shimmer";

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
			let celsius = Math.floor(response.main.feels_like - 273.15);
			if (celsius >= 45) {
				setTempColor("to-red-950");
			} else if (celsius >= 40) {
				setTempColor("to-red-900");
			} else if (celsius >= 35) {
				setTempColor("to-red-800");
			} else if (celsius >= 30) {
				setTempColor("to-orange-700");
			} else if (celsius >= 25) {
				setTempColor("to-orange-600");
			} else if (celsius >= 20) {
				setTempColor("to-orange-500");
			} else if (celsius >= 15) {
				setTempColor("to-amber-400");
			} else if (celsius >= 10) {
				setTempColor("to-amber-300");
			} else if (celsius >= 5) {
				setTempColor("to-yellow-200");
			} else if (celsius >= 0) {
				setTempColor("to-indigo-500");
			} else if (celsius >= -10) {
				setTempColor("to-indigo-600");
			} else if (celsius >= -20) {
				setTempColor("to-indigo-700");
			} else {
				setTempColor("to-indigo-800");
			}

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
			<div className="flex flex-col gap-3 text-center">
				<p>Please turn on location services</p>
				<CircleLoader color="#eab308" className="mx-auto" />
			</div>
		);
	}

	if (error) {
		return (
			<p className="text-center text-red-500">System error: {error.message}</p>
		);
	}

	return (
		<>
			{weatherData && (
				<div>
					<section className="text-center">
						<h5 className="text-xl font-semibold">
							<span className="text-yellow-500">
								{weatherData.name}, {weatherData.sys.country}
							</span>
						</h5>

						<h6>{dateAndTime}</h6>
						<Image
							src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
							alt={`${weatherData.weather[0].main} image`}
							className="mx-auto hover:scale-110 duration-500"
							width={100}
							height={100}
							quality={100}
							placeholder="blur"
							blurDataURL={`data:image/svg+xml;base64,${toBase64(
								shimmer(100, 100)
							)}`}
						/>
						<h4>{`${weatherData.weather[0].main} / ${weatherData.weather[0].description}`}</h4>
					</section>

					<CSSTransition
						in={true}
						appear={true}
						timeout={3000}
						classNames="my-node"
					>
						<section className="flex justify-center">
							<div className="relative flex p-5">
								<div
									className={`relative font-bold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 ${tempColor}`}
								>
									{Math.floor(weatherData.main.feels_like - 273.15)}
									<div className="absolute text-black dark:text-white top-0 -right-8 text-3xl pt-3">
										&#8451;
									</div>
								</div>
							</div>
						</section>
					</CSSTransition>

					<section className="xs:w-[301.75px] mx-auto">
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
					</section>

					<section className="xs:w-[301.75px] mx-auto pt-5">
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
					</section>
				</div>
			)}
		</>
	);
};

export default WeatherData;
