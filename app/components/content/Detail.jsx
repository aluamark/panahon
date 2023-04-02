import React from "react";

const Detail = ({ icon, detail, data }) => {
	return (
		<p className="flex items-center gap-1">
			{icon}
			{detail}: <span className="ml-auto text-yellow-500">{data}</span>
		</p>
	);
};

export default Detail;
