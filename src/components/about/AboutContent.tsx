'use client';

import { useEffect, useState } from 'react';
import { Github, Mail, } from 'lucide-react';

const skills = {
    'Frontend': ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    'Backend': ['Python', 'Flask', 'FastAPI'],
    'Database': ['MySQL', 'SQL'],
    'DevOps': ['Git', 'GitHub'],
    'Tools': ['VSCode', 'WebStorm']
};

const projects = [
    {
        title: 'Calmiary - 고민 기록 다이어리 🦋',
        description: '몰아치는 고민에 지친 현대인들을 위한 서비스',
        techStack: ['Python', 'OpenAI', 'FastAPI', 'React', 'Next.js', 'TypeScript'],
        link: 'https://calmiary.org'
    },
    {
        title: '실시간 덤벨 운동 동작 인식 시스템',
        description: '가속도 센서를 기반으로 한 실시간 덤벨 운동 동작 인식 시스템 개발',
        techStack: ['Python', 'Flask'],
        link: '#'
    },
    {
        title: '보행자 분석 알고리즘 연구',
        description: '손목 착용형 관성 센서의 적용을 통한 보행자의 보폭 및 보행속도 측정 연구',
        techStack: ['Python', 'Data Analysis'],
        link: '#'
    }
];

export default function AboutContent() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Profile Section */}
            <section className="mb-16 text-center">
                <div className="mb-6">
                    <img
                        src="https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/61a2ec50-cd96-4b23-27e3-b3e9f13c6800/public"
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                       한규
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        SW Developer
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                    {[
                        { icon: <Github className="w-6 h-6" />, href: 'https://github.com/ruehan', label: 'GitHub' },
                        { icon: <Mail className="w-6 h-6" />, href: 'mailto:ruehan98@gmail.com', label: 'Email' }
                    ].map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    About Me
                </h2>
                <div className="prose dark:prose-invert">
                    <p>
                        웹/앱 서비스 기반의 시각화 시스템을 구현 경험이 있으며, Python을 통한 데이터 전처리 및 분석을 통한 알고리즘 설계, 개발 경험이 있습니다.
                    </p>
                    <p>
                        프론트엔드로 전향을 위해 React, Next.js를 학습 하고있고 관심이 많습니다.
                    </p>
                </div>
            </section>

            {/* Skills Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Skills & Technologies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className="space-y-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.title}
                            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                View Project →
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Get in Touch
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    프로젝트 협업이나 채용 관련 문의는 언제든 환영합니다. 이메일로 연락해주세요!
                </p>
                <a
                    href="mailto:ruehan98@gmail.com"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Mail className="w-5 h-5 mr-2" />
                    Send me an email
                </a>
            </section>
        </div>
    );
}