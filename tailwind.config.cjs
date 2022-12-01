/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,tsx}",
  ],
  theme: {
    extend: {
      themes: false
    },
  },
  plugins: [require("daisyui")],
}
