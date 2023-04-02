/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "openweathermap.org",
			},
			{
				protocol: "http",
				hostname: "openweathermap.org",
			},
		],
	},
};

module.exports = nextConfig;
