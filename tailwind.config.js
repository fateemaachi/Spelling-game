/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'grey': ['Grey Qo', 'sans-serif'],
        'dancing': ['Dancing Script', 'system-ui'],
        'montserrat': ['Montserrat', 'system-ui'],
      },
    },
  },
  plugins: [],
}
