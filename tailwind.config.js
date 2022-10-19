/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'konit': ['Kanit', 'sans-serif']
      },
      backgroundColor: {
        main: '#c0ec4e',
        graylight: '#f9f9f9',
        mainBlack: '#262626',
        mainBlackLight: '#343332',
        blackLight: '#000000c4'
      },
      textColor: {
        black: '#030318',
        main: '#c0ec4e',
      },
      boxShadow: {
        custom: '0 0px 18px 0 #c0ec4e'
      },
    },
  },
  plugins: [],
}
