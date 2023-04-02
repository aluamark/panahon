import axios from "axios";

const fetchWeather = async (latitude, longitude) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export default fetchWeather;
