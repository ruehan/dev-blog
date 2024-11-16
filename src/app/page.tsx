import { getAllPosts, getAllCategories, getAllTags } from '@/utils/mdx';
import BlogPageClient from '@/components/BlogPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dev Blog | Home',
    description: 'A blog about software development and technology',
};

export const revalidate = 60

export default async function HomePage() {
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