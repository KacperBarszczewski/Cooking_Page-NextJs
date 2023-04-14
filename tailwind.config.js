/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#E58A2F',
        'secondary': '#FFD49B',
        'bright':'#FCF1E6',
        'error': '#c44569',
        'foreground': '#484748',
        'background': {
          DEFAULT: '#ffffff',
          dark: '#282728',
        },
        'typography': {
          DEFAULT: '#000000',
          dark: '#c8d6e5',
        },
      },
    },
  },
  plugins: [],
}
