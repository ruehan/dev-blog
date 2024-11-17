import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Ruehan Blog",
		template: "%s | Ruehan Blog",
	},
	description: "개발 관련 지식과 경험을 공유하는 블로그입니다.",
	keywords: ["Next.js", "React", "Web Development", "Programming"],
	authors: [{ name: "Ruehan" }],
	creator: "Ruehan",
	metadataBase: new URL("https://ruehan.org"),
	openGraph: {
		type: "website",
		locale: "ko_KR",
		url: "https://ruehan.org",
		siteName: "Ruehan Blog",
		title: "Ruehan Blog",
		description: "개발 관련 지식과 경험을 공유하는 블로그입니다.",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Ruehan Blog",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Ruehan Blog",
		description: "개발 관련 지식과 경험을 공유하는 블로그입니다.",
		images: ["/og-image.jpg"],
		creator: "@ruehan",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
};
