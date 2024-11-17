import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/private/", "/api/"],
			},
		],
		sitemap: "https://ruehan.org/sitemap.xml",
		host: "https://ruehan.org",
	};
}
