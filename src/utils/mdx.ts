import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export async function getPostBySlug(slug: string): Promise<Post> {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content: content,
        tags: data.tags || [],
        category: data.category || 'Uncategorized',
    };
}

export async function getAllPosts(): Promise<PostMeta[]> {const files = fs.readdirSync(postsDirectory);
   return files
       .map((fileName) => {
           const slug = fileName.replace(/\.mdx$/, '');
           const filePath = path.join(postsDirectory, fileName);
           const fileContents = fs.readFileSync(filePath, 'utf8');
           const { data } = matter(fileContents);

           return {
               slug,
               title: data.title,
               date: data.date,
               excerpt: data.excerpt,
               tags: data.tags || [],
               category: data.category || 'Uncategorized',
           };
       })
       .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export function getAllCategories(): string[] {
    const files = fs.readdirSync(postsDirectory);
    const categories = new Set<string>();

    files.forEach((fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        categories.add(data.category || 'Uncategorized');
    });

    return Array.from(categories);
}

export function getAllTags(): string[] {
    const files = fs.readdirSync(postsDirectory);
    const tags = new Set<string>();

    files.forEach((fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        if (data.tags) {
            data.tags.forEach((tag: string) => tags.add(tag));
        }
    });

    return Array.from(tags);
}