/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D08C8A",
        secondary: "#F6F1E6",
      },
    },
  },
  plugins: [require("daisyui")],
};
