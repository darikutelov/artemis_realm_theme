/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/*.liquid",
    "./templates/*.liquid",
    "./templates/**/*.liquid",
    "./sections/*.liquid",
    "./sections/**/*.liquid",
    "./snippets/*.liquid",
    "./snippets/**/*.liquid",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
