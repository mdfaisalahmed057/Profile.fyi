/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'base': '16px',
        'sm-screen': '12px',
        'md-screen': '18px',
        'lg-screen': '16px',
      },
    },
  },
  plugins: [],
}