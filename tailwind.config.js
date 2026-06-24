/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sunflower: '#FFC93C',
        sunflowerDark: '#E6A800',
        coral: '#FF6B6B',
        sky: '#74C0FC',
        cream: '#FFFBF0',
        warmOrange: '#FF8C42',
      },
      fontFamily: {
        display: ['Pacifico', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
