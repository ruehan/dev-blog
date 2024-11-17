import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	output: "export",
	assetPrefix: ".",
	trailingSlash: true,
};

export default nextConfig;
