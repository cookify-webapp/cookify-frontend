const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    './core/pages/**/*.{js,ts,jsx,tsx}',
    './core/components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
    },
  },
  plugins: [],
}