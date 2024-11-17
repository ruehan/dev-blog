import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	output: "export", // 정적 내보내기 설정
	basePath: "", // 기본 경로 설정
	images: {
		unoptimized: true, // 이미지 최적화 비활성화
	},
	assetPrefix: "/", // 애셋 접두사 설정
	trailingSlash: true, // URL 끝에 슬래시 추가
};

export default nextConfig;
