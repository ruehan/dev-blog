// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getAllPosts();
	const baseUrl = "https://ruehan.org";

	const postUrls = posts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		...postUrls,
	];
}
