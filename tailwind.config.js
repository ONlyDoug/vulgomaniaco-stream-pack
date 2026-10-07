/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivexi: {
          purple: '#732EB8',
          dark: '#140A1F',
          surface: '#241037',
          neon: '#D6D65C',
          light: '#FAFAFA',
          muted: '#A19DA8',
        },
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      dropShadow: {
        'neon-yellow': '0 0 10px rgba(214, 214, 92, 0.6)',
        'neon-purple': '0 0 14px rgba(115, 46, 184, 0.7)',
      },
      boxShadow: {
        'card-glow': '0 8px 32px 0 rgba(115, 46, 184, 0.37)',
        'neon-border': '0 0 15px rgba(214, 214, 92, 0.4)',
      },
    },
  },
  plugins: [],
}
