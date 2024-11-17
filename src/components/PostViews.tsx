"use client";

import { useEffect, useState } from "react";

export default function PostViews({ slug }: { slug: string }) {
	const [views, setViews] = useState<string>("--");

	useEffect(() => {
		//@ts-ignore
		if (typeof window !== "undefined" && window.gtag) {
			//@ts-ignore
			window.gtag("event", "page_view", {
				page_path: `/blog/${slug}`,
			});
		}
	}, [slug]);

	return <span className="text-sm text-gray-500 dark:text-gray-400">{views} views</span>;
}
