/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')], // Add DaisyUI plugin if using it
  daisyui: {
    themes: ['light', 'dark'], // Include default themes or your custom themes
  },
};
