/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#dc2626', // Red - keep original button color
        secondary: '#2563eb', // Blue - keep original
        accent: '#fbbf24', // Yellow - keep original
        dark: {
          900: '#000000', // Pure Black 
          800: '#111111', // Near Black
          700: '#1f1f1f', // Dark Gray
        }
      },
      fontFamily: {
        heading: ['"Chakra Petch"', 'sans-serif'],
        sans: ['"Rajdhani"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
