// tailwind.config.js
module.exports = {
  darkMode: 'class', // <--- AÑADE ESTA LÍNEA
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}