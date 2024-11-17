import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-[70vh] flex items-center justify-center">
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
				<h2 className="text-2xl text-gray-700 dark:text-gray-300">페이지를 찾을 수 없습니다</h2>
				<p className="text-gray-600 dark:text-gray-400">요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.</p>
				<div className="mt-8">
					<Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
						홈으로 돌아가기
					</Link>
				</div>
			</div>
		</div>
	);
}
