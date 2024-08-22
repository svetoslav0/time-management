import tailwindScrollbar from 'tailwind-scrollbar';
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                mavenPro: ['Maven Pro', 'sans-serif'],
            },
            colors: {
                topHalfColor: '#DEE5EC',
                inputFieldBorderColor: '#008CFF',
                welcomeMsgColor: '#163851',
                loginBtnColor: '#008CFF',
                customBlue: '#008CFF',
                customLightBlue: '#95CFFF',
                customVeryLightBlue: '#E8F5FF',
                customDarkBlue: '#163851',
                customGreen: '#3EDD24',
                customGrey: '#DEE5EC',
                customDarkGray: '#7d7d7d',
                customDarkWhite: '#efefef',
                customRed: '#ff6363',
            },
            boxShadow: {
                loginFormShadow: '0px 0px 18.5px -2px #0000001C',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        tailwindScrollbar,
        function ({ addUtilities }) {
            const newUtilities = {
                '.placeholder-custom::placeholder': {
                    'text-align': 'left', // Change to 'left', 'right', or 'center' as needed
                    'padding-top': '0px', // Adjust the vertical position
                    'padding-bottom': '0px', // Adjust the vertical position
                },
            };
            addUtilities(newUtilities, ['responsive', 'hover']);
        },
    ],
};
