/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f0f7ff', // Soft Ice Blue background
          DEFAULT: '#0f2d59', // Deep Navy Blue
          dark: '#0a1e3b',
        },
        secondary: {
          light: '#e6fffa', // Soft Mint/Teal background
          DEFAULT: '#0d9488', // Medical Teal
          dark: '#0f766e',
        }
      },
    },
  },
  plugins: [],
}