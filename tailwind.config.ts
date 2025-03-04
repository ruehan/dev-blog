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
				foreground: "var(--foreground)",
				"background-start": "var(--background-start)",
				"background-end": "var(--background-end)",
				"dark-background-start": "var(--dark-background-start)",
				"dark-background-end": "var(--dark-background-end)",
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
				accent: {
					light: "var(--accent-light)",
					medium: "var(--accent-medium)",
					dark: "var(--accent-dark)",
				},
			},
			animation: {
				float: "float 3s ease-in-out infinite",
				"pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"bounce-slow": "bounce 3s infinite",
				shimmer: "shimmer 2s linear infinite",
			},
			keyframes: {
				shimmer: {
					"0%": { backgroundPosition: "-200% 0" },
					"100%": { backgroundPosition: "200% 0" },
				},
			},
			boxShadow: {
				glow: "0 0 15px rgba(139, 92, 246, 0.5)",
				"glow-accent": "0 0 15px rgba(6, 182, 212, 0.5)",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
} satisfies Config;
