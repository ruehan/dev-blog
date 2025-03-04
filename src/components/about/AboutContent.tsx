"use client";

import { useEffect, useState } from "react";
import { Github, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const skills = {
	Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
	Backend: ["Python", "Flask", "FastAPI"],
	Database: ["MySQL", "SQL"],
	DevOps: ["Git", "GitHub"],
	Tools: ["VSCode", "WebStorm"],
};

const projects = [
	{
		title: "Calmiary - 고민 기록 다이어리 🦋",
		description: "몰아치는 고민에 지친 현대인들을 위한 서비스",
		techStack: ["Python", "OpenAI", "FastAPI", "React", "Next.js", "TypeScript"],
		link: "https://calmiary.org",
		image: "https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/f694aaf4-7ff7-45bb-c115-f39523916400/public",
	},
	{
		title: "실시간 덤벨 운동 동작 인식 시스템",
		description: "가속도 센서를 기반으로 한 실시간 덤벨 운동 동작 인식 시스템 개발",
		techStack: ["Python", "Flask"],
		link: "#",
		image: "https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/f694aaf4-7ff7-45bb-c115-f39523916400/public",
	},
	{
		title: "보행자 분석 알고리즘 연구",
		description: "손목 착용형 관성 센서의 적용을 통한 보행자의 보폭 및 보행속도 측정 연구",
		techStack: ["Python", "Data Analysis"],
		link: "#",
		image: "https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/f694aaf4-7ff7-45bb-c115-f39523916400/public",
	},
];

const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export default function AboutContent() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-12">
			{/* Profile Section */}
			<motion.section className="mb-20 text-center" initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.5 }}>
				<div className="mb-8">
					<motion.img
						src="https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/61a2ec50-cd96-4b23-27e3-b3e9f13c6800/public"
						alt="Profile"
						className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-gray-100 dark:border-gray-800 shadow-lg"
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.2 }}
					/>
					<motion.h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3" variants={fadeIn}>
						한규
					</motion.h1>
					<motion.p className="text-2xl text-gray-600 dark:text-gray-300" variants={fadeIn}>
						SW Developer
					</motion.p>
				</div>

				{/* Social Links */}
				<motion.div className="flex justify-center space-x-6" variants={staggerContainer} initial="hidden" animate="visible">
					{[
						{ icon: <Github className="w-7 h-7" />, href: "https://github.com/ruehan", label: "GitHub" },
						{ icon: <Mail className="w-7 h-7" />, href: "mailto:ruehan98@gmail.com", label: "Email" },
					].map((social) => (
						<motion.a
							key={social.label}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
							aria-label={social.label}
							variants={fadeIn}
							whileHover={{ scale: 1.1 }}
						>
							{social.icon}
						</motion.a>
					))}
				</motion.div>
			</motion.section>

			{/* About Section */}
			<motion.section
				className="mb-20 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeIn}
				transition={{ duration: 0.6 }}
			>
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">About Me</h2>
				<div className="prose dark:prose-invert max-w-none text-lg">
					<p>웹/앱 서비스 기반의 시각화 시스템을 구현 경험이 있으며, Python을 통한 데이터 전처리 및 분석을 통한 알고리즘 설계, 개발 경험이 있습니다.</p>
					<p>프론트엔드로 전향을 위해 React, Next.js를 학습 하고있고 관심이 많습니다.</p>
				</div>
			</motion.section>

			{/* Skills Section */}
			<motion.section
				className="mb-20 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeIn}
				transition={{ duration: 0.6 }}
			>
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">Skills & Technologies</h2>
				<motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
					{Object.entries(skills).map(([category, items]) => (
						<motion.div key={category} className="space-y-3" variants={fadeIn}>
							<h3 className="font-semibold text-xl text-gray-900 dark:text-white">{category}</h3>
							<div className="flex flex-wrap gap-2">
								{items.map((skill) => (
									<motion.span
										key={skill}
										className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300"
										whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
										transition={{ duration: 0.2 }}
									>
										{skill}
									</motion.span>
								))}
							</div>
						</motion.div>
					))}
				</motion.div>
			</motion.section>

			{/* Projects Section */}
			<motion.section className="mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }}>
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">Featured Projects</h2>
				<motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={staggerContainer}>
					{projects.map((project) => (
						<motion.div key={project.title} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow" variants={fadeIn} whileHover={{ y: -5 }}>
							<div className="h-48 overflow-hidden">
								<img src={project.image} alt={project.title} className="w-full h-full object-cover" />
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
								<div className="flex flex-wrap gap-2 mb-4">
									{project.techStack.map((tech) => (
										<span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
											{tech}
										</span>
									))}
								</div>
								<a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium">
									프로젝트 보기
									<ExternalLink className="w-4 h-4 ml-1" />
								</a>
							</div>
						</motion.div>
					))}
				</motion.div>
			</motion.section>

			{/* Contact Section */}
			<motion.section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }}>
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">Get in Touch</h2>
				<p className="text-lg text-gray-600 dark:text-gray-300 mb-6">프로젝트 협업이나 채용 관련 문의는 언제든 환영합니다. 이메일로 연락해주세요!</p>
				<motion.a
					href="mailto:ruehan98@gmail.com"
					className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Mail className="w-5 h-5 mr-2" />
					이메일 보내기
				</motion.a>
			</motion.section>
		</div>
	);
}
