/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#fffcf9',
          100: '#f7f3ed',
          200: '#eeebe5',
        },
        gold: {
          accent: '#c5a059',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}