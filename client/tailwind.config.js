/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#011638",
        secondary: "#EFF6E0",
        text: "#DDFFF7",
        secondary2: "#50808E",
        secondary3: "#A1869E",
      },
    },
  },
  plugins: [],
};
