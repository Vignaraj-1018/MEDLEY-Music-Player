/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#F5F4EC",
        secondary: "#C8E6C9",
        accent: "#EEEEEE",
        accent2: "#F8F8FF"
      }
    },
  },
  plugins: [],
}

