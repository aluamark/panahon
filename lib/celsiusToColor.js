const celsiusToColor = (celsius) => {
	if (celsius >= 45) {
		return "to-red-950";
	} else if (celsius >= 40) {
		return "to-red-900";
	} else if (celsius >= 35) {
		return "to-red-800";
	} else if (celsius >= 30) {
		return "to-orange-700";
	} else if (celsius >= 25) {
		return "to-orange-600";
	} else if (celsius >= 20) {
		return "to-orange-500";
	} else if (celsius >= 15) {
		return "to-amber-400";
	} else if (celsius >= 10) {
		return "to-amber-300";
	} else if (celsius >= 5) {
		return "to-yellow-200";
	} else if (celsius >= 0) {
		return "to-indigo-500";
	} else if (celsius >= -10) {
		return "to-indigo-600";
	} else if (celsius >= -20) {
		return "to-indigo-700";
	} else {
		return "to-indigo-800";
	}
};

export default celsiusToColor;
