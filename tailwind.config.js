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
    extend: {
      colors: {
        primary: '#181818',
        second: 'rgba(235, 235, 235, 0.64)',
        silver: '#d4cece',
        red: 'rgba(255, 3, 3, 0.82)',
        gray: '#222222',
        purple: '#800080',
        yellow: '#FFFF00',
        green: '#00FF00',
        orange: 'orange',
      },
      animation: {
        filter: 'opacity 1s 0.3s ease-out forwards',
        topToBottom: 'topToBottom 0.5s ease-in forwards',
        show: 'show 0.5s ease-in forwards',
        opacity: 'opacity 0.5s ease-out forwards',
        leftToRight: 'leftToRight 1s ease-out forwards',
        increase: 'increase 1s ease-out forwards',
      },
      backgroundImage: {
        slot: "url('/images/slot.png')",
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
        increase: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      spacing: {
        one: '1px',
        15: '60px',
      },
    },
    zIndex: {
      1: 1,
      10: 10,
    },
  },
  plugins: [require('tailwindcss-animation-delay')],
}
