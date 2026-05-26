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
          light: '#fff9f6', // Soft Warm Sand / Peach
          DEFAULT: '#c15029', // Terracotta Orange
          dark: '#7f2b0f', // Deep Burnt Copper
        },
        secondary: {
          light: '#fef7e6', // Soft Warm Amber Tint
          DEFAULT: '#d97706', // Warm Amber / Gold
          dark: '#b45309', // Dark Amber
        }
      },
    },
  },
  plugins: [],
}