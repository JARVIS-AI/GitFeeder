/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        background: {
          light: '#ffffff',
          dark: '#000000',
        },
        foreground: {
          light: '#171717',
          dark: '#ededed',
        },
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
    },
  },
  plugins: [],
};