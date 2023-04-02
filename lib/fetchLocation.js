import axios from "axios";

const fetchLocation = async (query) => {
	const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=3&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export default fetchLocation;
