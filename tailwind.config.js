/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        "200%": "200%",
      },
      animation: {
        "gradient-animation": "gradient-animation 3s ease infinite",
      },
      keyframes: {
        "gradient-animation": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
