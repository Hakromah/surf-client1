import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "127.0.0.1",
				port: "1337",
				pathname: "/uploads/**/*",
			},
			{
				// 🚀 Deployed Strapi Media Hostname (Crucial fix!)
				protocol: "https", // Use 'https' for your deployed environment
				hostname: "elegant-laughter-b5758ad86e.media.strapiapp.com",
				// The port and pathname can often be omitted for a simple wildcard match on the host
			},
		],
	},
};

export default nextConfig;
