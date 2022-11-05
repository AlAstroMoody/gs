module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '320px',
      xs: '460px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      xxl: '1440px',
    },
    colors: {
      primary: '#181818', // bg
      second: 'rgba(235, 235, 235, 0.64)', // text
      silver: '#d4cece', // второй бг
      red: 'rgba(255, 3, 3, 0.82)',
      gray: '#222222',
    },
    extend: {
      animation: {
        filter: 'opacity 3s 0.8s ease-out forwards',
        topToBottom: 'topToBottom 1s ease-in forwards',
        show: 'show 0.5s ease-in forwards',
        opacity: 'opacity 1s ease-out forwards',
        leftToRight: 'leftToRight 1s ease-out forwards',
      },
      backgroundImage: {
        slot: "url('/src/assets/images/slot.png')",
      },
      keyframes: {
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        topToBottom: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        show: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        hidden: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        leftToRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      spacing: {
        one: '1px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animation-delay'),
    // ...
  ],
}
