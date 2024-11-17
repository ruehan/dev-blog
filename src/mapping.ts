export const CATEGORY_MAP: { [key: string]: string } = {
	develop: "개발",
	fe_develop: "프론트엔드",
};

export const TAG_MAP: { [key: string]: string } = {
	intro: "introduction",
	blog: "블로그",
	nextjs: "Next.js",
	cloudflare: "Cloudflare",
	dnssec: "DNSSEC",
	secure: "보안",
	googleanalytics: "Google Analytics",
};

export const getCategoryInKorean = (englishCategory: string): string => {
	return CATEGORY_MAP[englishCategory] || englishCategory;
};

export const getCategoryInEnglish = (koreanCategory: string): string => {
	const entries = Object.entries(CATEGORY_MAP);
	const matchedEntry = entries.find(([key, value]) => value === koreanCategory);
	return matchedEntry ? matchedEntry[0] : koreanCategory;
};

export const getTagInKorean = (englishTag: string): string => {
	return TAG_MAP[englishTag] || englishTag;
};

export const getTagInEnglish = (koreanTag: string): string => {
	const entries = Object.entries(TAG_MAP);
	const matchedEntry = entries.find(([key, value]) => value === koreanTag);
	return matchedEntry ? matchedEntry[0] : koreanTag;
};