/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',   // Blue
        secondary: '#FACC15', // Yellow
      },
    },
  },
  plugins: [],
}
