/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
              "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}

