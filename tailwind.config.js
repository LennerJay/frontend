/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
              "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Times New Roman", "sans-serif"],
        "poppins": ['Poppins', 'sans-serif']
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
          overflow: 'hidden'
        },
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
        "marquee": "marquee 8s linear infinite",
      },
      screens:{
        'xs': '475px',
        'md': '768px',
      }
    },
  },
  plugins: [],
}

