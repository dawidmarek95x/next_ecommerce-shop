/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],
	experimental: {
		typedRoutes: true,
		mdxRs: true,
		serverActions: true,
	},
	images: {
		domains: ["media.graphassets.com"],
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
