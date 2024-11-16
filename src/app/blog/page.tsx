import BlogPageClient from '@/components/BlogPageClient';
import { getAllPosts, getAllCategories, getAllTags } from '@/utils/mdx';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Dev Blog',
    description: 'Articles about web development, programming, and software engineering',
    openGraph: {
        title: 'Dev Blog',
        description: 'Articles about web development, programming, and software engineering',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dev Blog',
        description: 'Articles about web development, programming, and software engineering',
    },
};

export default async function BlogPage() {
    const posts = await getAllPosts();
    const categories = await getAllCategories();
    const tags = await getAllTags();

    return (
        <BlogPageClient
            initialPosts={posts}
            categories={categories}
            tags={tags}
        />
    );
}