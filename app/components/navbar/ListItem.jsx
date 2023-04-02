import React from "react";

const ListItem = ({ children }) => {
	return (
		<li className="flex items-center hover:bg-neutral-200 dark:hover:bg-zinc-700">
			{children}
		</li>
	);
};

export default ListItem;
