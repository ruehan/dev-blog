import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const title = searchParams.get("title") || "Dev Blog";

		return new ImageResponse(
			(
				<div
					style={{
						height: "100%",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "white",
						padding: "40px 80px",
					}}
				>
					<div
						style={{
							fontSize: 60,
							fontWeight: 700,
							textAlign: "center",
							color: "black",
						}}
					>
						{title}
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
			}
		);
	} catch (e) {
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
}
