/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        buy: "#10b981",
        sell: "#ef4444",
        bid: "#059669",
        ask: "#dc2626",
      },
    },
  },
  plugins: [],
};
