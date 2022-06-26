module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '320px',
      xs: '460px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1440px',
    },
    extend: {
      colors: {
        gray: {
          200: '#e3e3e3', // бг
          300: '#222222', // второй бг
          400: '#e1d7d7', // текст
          500: '#2c3e50', // текст второй
        },
        white: {
          200: '#181818', // бг
          300: '#d4cece', // второй бг
          400: 'rgba(235, 235, 235, 0.64)', // text
        },
        red: {
          100: 'rgba(255, 3, 3, 0.82)',
          200: 'rgba(143, 2, 2, 0.82)',
        },
      },
      animation: {
        filter: 'opacity 3s 1s ease-out forwards',
        side: 'sidebar 1s ease-in forwards',
        string: 'opacity 1s ease-out forwards',
      },
      keyframes: {
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        sidebar: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        show: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        hidden: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(00%)' },
        },
      },
    },
  },
  plugins: [],
}
