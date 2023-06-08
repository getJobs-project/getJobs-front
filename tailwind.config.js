import tw from "tw-elements/dist/plugin.cjs";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      title: ["Josefin Sans", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    safelist: ["animate-[tada]"],
    extend: {},
  },
  plugins: [tw],
};
