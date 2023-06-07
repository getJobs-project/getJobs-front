/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      title: ["Josefin Sans", "sans-serif"],
      roboto: ["Roboto", "sans-serif"]
    },
    extend: {},
  },
  plugins: [],
};
