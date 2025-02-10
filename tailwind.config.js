/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#ff7506',
				orange4: '#FF7506',
				orange5: '#cc5c00',
			},
			fontFamily: {
				Mulish: ['Mulish', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
