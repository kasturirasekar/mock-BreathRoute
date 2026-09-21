/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F8F6', // warm off-white
        text: '#111827', // deep navy / charcoal
        primary: '#164E36', // deep forest green
        secondary: '#4A6FA5', // muted blue
        warning: '#F59E0B', // amber
        danger: '#991B1B', // restrained red
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
