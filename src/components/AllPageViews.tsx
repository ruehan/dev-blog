"use client";

import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase";
import { FaEye } from "react-icons/fa"; // react-icons 설치 필요

export default function AllPageViews() {
	const [totalViews, setTotalViews] = useState<number>(0);

	useEffect(() => {
		const fetchViews = async () => {
			try {
				const viewsRef = ref(database, "views");
				const snapshot = await get(viewsRef);
				const data = snapshot.val();

				if (data) {
					let total = 0;
					Object.values(data).forEach((posts: any) => {
						if (posts && typeof posts === "object") {
							if ("count" in posts) {
								total += posts.count || 0;
							}
							Object.values(posts).forEach((postData: any) => {
								if (postData && typeof postData === "object" && "count" in postData) {
									total += postData.count || 0;
								}
							});
						}
					});
					setTotalViews(total);
				}
			} catch (error) {
				console.error("Error fetching views:", error);
			}
		};

		fetchViews();
	}, []);

	if (totalViews === 0) return null;

	return (
		<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 mt-4">
			<FaEye className="text-gray-400 dark:text-gray-500" />
			<span>
				총 <strong className="font-medium text-gray-700 dark:text-gray-300">{totalViews.toLocaleString()}</strong>회의 조회
			</span>
		</div>
	);
}
