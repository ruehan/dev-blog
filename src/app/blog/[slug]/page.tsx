import { getPostBySlug, getAllPosts } from "@/utils/mdx";
import BlogPostClient from "@/components/BlogPostClient";
import { Metadata } from "next";

interface PageProps {
	params: {
		slug: string;
	};
	searchParams?: { [key: string]: string | string[] | undefined };
}

// Generate static parameters for dynamic routes
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const post = await getPostBySlug(params.slug);

	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: "article",
			publishedTime: post.date,
			authors: ["Ruehan"],
			tags: post.tags,
			images: [
				{
					url: "https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/6446a53f-3893-4008-ebb7-e565c6dc9200/public",
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.excerpt,
			images: ["https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/6446a53f-3893-4008-ebb7-e565c6dc9200/public"],
		},
	};
}

// Main page component for rendering the blog post
export default async function BlogPost({ params }: PageProps) {
	const post = await getPostBySlug(params.slug);
	const allPosts = await getAllPosts();

	return <BlogPostClient post={post} allPosts={allPosts} />;
}
