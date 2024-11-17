// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			fontFamily: {
				suit: ["SUIT Variable", "sans-serif"],
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: {
					50: "var(--primary-50)",
					100: "var(--primary-100)",
					200: "var(--primary-200)",
					300: "var(--primary-300)",
					400: "var(--primary-400)",
					500: "var(--primary-500)",
					600: "var(--primary-600)",
					700: "var(--primary-700)",
					800: "var(--primary-800)",
					900: "var(--primary-900)",
					950: "var(--primary-950)",
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
} satisfies Config;
