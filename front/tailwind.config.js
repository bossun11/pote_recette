/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D08C8A",
        secondary: "#F6F1E6",
        reddishBrown: "#8a1f4a",
      },
    },
  },
  daisyui: {
    themes: ["light", "valentine"],
  },
  plugins: [require("daisyui")],
};
