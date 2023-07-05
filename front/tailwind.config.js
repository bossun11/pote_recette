/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deepRed: "#BA4B4D",
        reddishBrown: "#8a1f4a",
      },
    },
  },
  daisyui: {
    themes: ["light", "valentine"],
  },
  plugins: [require("daisyui")],
};
