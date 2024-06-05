import tailwindScrollbar from 'tailwind-scrollbar';
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                mavenPro: ['Maven Pro', 'sans-serif'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [tailwindScrollbar],
};
