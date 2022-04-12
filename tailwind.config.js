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
        black: "#000",
        white: "#fff",
        gray: {
          60: '#818181',
          50: '#A6A6A6',
          40: '#C4C4C4',
          30: '#E5E5E5',
          20: '#F0F0F0',
          10: '#F8F6F4'
        },
        brown: {
          20: '#483434',
          10: '#6B4F4F'
        },
        violet: '#5B289C',
        blue: '#2566C8',
        yellow: '#FFB800',
        success: '#63AB2A',
        error: '#E00000',
        beige: {
          30: '#D2AD9B',
          20: '#ECC6B4',
          10: '#EFE6DB'
        }
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/line-clamp')],
}