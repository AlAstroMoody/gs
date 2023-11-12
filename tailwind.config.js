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
        blue: 'blue',
      },
      animation: {
        filter: 'opacity 1s 0.3s ease-out forwards',
        topToBottom: 'topToBottom 0.8s ease-in forwards',
        footer: 'footer 0.4s ease-in forwards',
        bottomToTop: 'bottomToTop 0.8s ease-in forwards',
        show: 'show 0.5s ease-in forwards',
        opacity: 'opacity 0.5s ease-out forwards',
        leftToRight: 'leftToRight 1s ease-out forwards',
        increase: 'increase 1s ease-out forwards',
        goblin: 'goblin 10s ease-out infinite',
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
        bottomToTop: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        footer: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
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
        goblin: {
          '0%': { transform: 'skewY(4deg)' },
          '25%': { transform: '' },
          '50%': { transform: 'scale(1.1) skewY(2deg)' },
          '75%': { transform: 'skewY(2deg)' },
          '100%': { transform: 'skewY(4deg)' },
        },
      },
      spacing: {
        one: '1px',
        13: '3.25rem',
        15: '3.75rem',
        92: '23rem',
        128: '32rem',
        256: '64rem',
      },
    },
    zIndex: {
      1: 1,
      10: 10,
      20: 20,
      30: 30,
    },
  },
  plugins: [
    require('tailwindcss-animation-delay'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
