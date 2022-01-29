module.exports = {
  content: ['./src/**/*.{html,js,jsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        press: 'press 200ms ease-in-out',
        error: 'shake 200ms ease-in-out',
      },
      keyframes: {
        press: {
          '0%': { transform: 'translateY(0)' },
          '75%': { transform: 'translateY(5px)' },
          100: { transform: 'translateY(0)' },
        },
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(0)' },
          '75%': { transform: 'translateX(+5px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
