import { useTheme } from "next-themes";

const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();

	return (
		<select
			value={theme}
			onChange={(e) => setTheme(e.target.value)}
			className="text-center py-3 dark:bg-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-700"
		>
			<option value="system">⚙️</option>
			<option value="dark">🌙</option>
			<option value="light">☀️</option>
		</select>
	);
};

export default ThemeSwitch;
