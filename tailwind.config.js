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
          light: '#4fd1c5',
          DEFAULT: '#38b2ac',
          dark: '#319795',
        },
        secondary: {
          light: '#9f7aea',
          DEFAULT: '#805ad5',
          dark: '#6b46c1',
        }
      },
    },
  },
  plugins: [],
}