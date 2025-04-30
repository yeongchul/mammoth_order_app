/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nanum: ['"Nanum Gothic"', "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
