import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import RootLayout from "../components/RootLayout";
import { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "Ruehan Blog",
		template: "%s | Ruehan Blog",
	},
	description: "개발 관련 지식과 경험을 공유하는 블로그입니다.",
	openGraph: {
		type: "website",
		locale: "ko_KR",
		url: "https://ruehan.org",
		siteName: "Ruehan Blog",
		title: "Ruehan Blog",
		description: "개발 관련 지식과 경험을 공유하는 블로그입니다.",
		images: [
			{
				url: "https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/6446a53f-3893-4008-ebb7-e565c6dc9200/public", // 여기에 OG 이미지 경로를 지정
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
		images: ["https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/6446a53f-3893-4008-ebb7-e565c6dc9200/public"], // 트위터용 이미지
	},
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				{process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} />}
				<Providers attribute="class" defaultTheme="system" enableSystem>
					<RootLayout>{children}</RootLayout>
				</Providers>
			</body>
		</html>
	);
}
