/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#ff7506',
			},
			fontFamily: {
				Mulish: ['Mulish', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
