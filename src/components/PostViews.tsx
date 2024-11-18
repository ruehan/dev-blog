"use client";

import { useEffect, useState } from "react";
import { ref, onValue, increment, update } from 'firebase/database';
import { database } from '@/lib/firebase';

export default function PostViews({ slug }: { slug: string }) {
	const [views, setViews] = useState<string>("--");

	useEffect(() => {
		// Google Analytics 이벤트
		//@ts-ignore
		if (typeof window !== "undefined" && window.gtag) {
			//@ts-ignore
			window.gtag("event", "page_view", {
				page_path: `/blog/${slug}`,
			});
		}

		// 중복 조회 방지를 위한 세션 체크
		const sessionKey = `viewed_${slug}`;
		if (!sessionStorage.getItem(sessionKey)) {
			const postRef = ref(database, `views/${slug}`);
			
			// 조회수 증가
			update(postRef, {
				count: increment(1)
			});
			
			sessionStorage.setItem(sessionKey, 'true');
		}

		// 조회수 실시간 감지
		const postRef = ref(database, `views/${slug}`);
		const unsubscribe = onValue(postRef, (snapshot) => {
			const data = snapshot.val();
			setViews(data?.count?.toString() || "0");
		});

		// cleanup 함수
		return () => unsubscribe();
	}, [slug]);

	return <span className="text-sm text-gray-500 dark:text-gray-400">{views} views</span>;
}
