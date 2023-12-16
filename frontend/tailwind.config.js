/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./app/**/*.{ts,tsx}",
        "./comp/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                main: "#ff4060",
                mainDisabled: "#dda6af",
                textColor: "#162437",
                backgroundGray: "#f5f5f5",
                borderGray: "#e5e5e5",
            }
        },
    },
    plugins: [],
};
