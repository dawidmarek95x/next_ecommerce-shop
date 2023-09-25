import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"gradient-multicolor":
					"linear-gradient(90deg, rgba(63,251,224,1) 0%, rgba(155,251,63,1) 25%, rgba(230,224,78,1) 50%, rgba(241,183,74,1) 75%, rgba(255,43,0,1) 100%);",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
export default config;
