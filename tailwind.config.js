/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        Lobster: ["Lobster", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"]
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
