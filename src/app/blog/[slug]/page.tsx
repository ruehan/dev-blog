import { getPostBySlug, getAllPosts } from '@/utils/mdx';
import BlogPostClient from '@/components/BlogPostClient';
import { Metadata } from 'next';

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: { slug: string };
}): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    return {
        title: `${post.title} | Dev Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            authors: ['Your Name'],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        },
    };
}

export default async function BlogPost({
                                           params,
                                       }: {
    params: { slug: string };
}) {
    const post = await getPostBySlug(params.slug);
    const allPosts = await getAllPosts();

    return <BlogPostClient post={post} allPosts={allPosts} />;
}