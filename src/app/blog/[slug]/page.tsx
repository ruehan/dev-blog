import { getPostBySlug, getAllPosts } from '@/utils/mdx';
import BlogPostClient from '@/components/BlogPostClient';
import { Metadata } from 'next';

interface PageProps {
    params: {
        slug: string;
    };
}

// Generate static parameters for dynamic routes
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const posts = await getAllPosts();
    return posts.map(post => ({
        slug: post.slug,
    }));
}

// Generate metadata dynamically for each page
export async function generateMetadata({
                                           params,
                                       }: PageProps): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);
    return {
        title: `${post.title} | Dev Blog`,
        description: post.excerpt,
    };
}

// Main page component for rendering the blog post
export default async function BlogPost({ params }: PageProps) {
    const post = await getPostBySlug(params.slug);
    const allPosts = await getAllPosts();

    return <BlogPostClient post={post} allPosts={allPosts} />;
}