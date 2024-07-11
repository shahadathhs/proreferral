/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      // white
      "light",
      "cupcake",
      "corporate",
      // black
      "dark",
      "synthwave",
      "black",
      "luxury",
      "dracula",
      "night",
      "dim",
    ],
  },
}

