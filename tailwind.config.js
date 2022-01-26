module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      animation: { press: "press 200ms ease-in-out" },
      keyframes: {
        press: {
          "0%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(5px)" },
          "100": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
