/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './*.html',
        './js/**/*.js'
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    500: '#6366f1',
                    600: '#4f46e5',
                    900: '#1e1b4b'
                }
            },
            fontFamily: {
                sans: ['Pixelify Sans', 'Silkscreen', 'DotGothic16', 'monospace']
            },
            screens: {
                xs: '480px'
            }
        }
    },
    plugins: []
};
