import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const title = searchParams.get("title") || "Ruehan Blog";

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
						background: "linear-gradient(to bottom, #fff, #f5f5f5)",
						padding: "40px 80px",
					}}
				>
					<div
						style={{
							fontSize: 60,
							fontWeight: 700,
							textAlign: "center",
							color: "#1a1a1a",
							marginBottom: 20,
						}}
					>
						{title}
					</div>
					<div
						style={{
							fontSize: 30,
							color: "#666",
						}}
					>
						ruehan.org
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
			}
		);
	} catch (e) {
		console.error(e);
		return new Response("Failed to generate OG image", { status: 500 });
	}
}
