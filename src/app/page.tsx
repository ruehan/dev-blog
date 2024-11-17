import { Metadata } from "next";
import BlogPageClient from "@/components/BlogPageClient";
import { getAllPosts, getAllCategories, getAllTags } from "@/utils/mdx";

export const metadata: Metadata = {
	title: "Ruehan Blog",
	description: "개발 관련 지식과 경험을 공유하는 블로그입니다.",
};

export default async function HomePage() {
	const posts = await getAllPosts();
	const categories = await getAllCategories();
	const tags = await getAllTags();

	return <BlogPageClient initialPosts={posts} categories={categories} tags={tags} />;
}
