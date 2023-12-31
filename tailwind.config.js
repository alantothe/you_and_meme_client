/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "480px" },
      },
      colors: {
        "meme-gray": "#565656",
        "meme-teal": "#04d1bd",
        "meme-yellow": "#d1bd04",
        "meme-light-gray": "#8d8d8d",
        "meme-dark-gray": "#2d2d2d",
      },
    },
  },
  plugins: [],
});
