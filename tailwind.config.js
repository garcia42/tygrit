module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    "postcss-import",
    "tailwindcss",
    "autoprefixer",
    require('tailwindcss-textshadow')
  ],
}
