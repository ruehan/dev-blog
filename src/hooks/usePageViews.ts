"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function usePageViews() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (pathname) {
			const url = `${pathname}${searchParams?.toString() ? "?" + searchParams.toString() : ""}`;
			// @ts-ignore
			window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
				page_path: url,
			});
		}
	}, [pathname, searchParams]);
}
