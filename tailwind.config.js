/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-font-color)",
        secondary: "var(--secondary-font-color)",
        tertiary: "var(--tertiary-font-color)",

        "primary-background": "var(--primary-background-color)",
        "secundary-background": "var(--secundary-background-color)",
        "tertiary-background": "var(--tertiary-background-color:)",
      },
    },
  },
  plugins: [],
};
