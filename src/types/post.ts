export type Post = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    tags: string[];
    category: string;
};

export type PostMeta = Omit<Post, 'content'>;