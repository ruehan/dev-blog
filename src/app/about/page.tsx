import { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';

export const metadata: Metadata = {
    title: 'About Me | Dev Blog',
    description: 'Learn more about me, my skills, and my journey in software development',
};

export default function AboutPage() {
    return <AboutContent />;
}