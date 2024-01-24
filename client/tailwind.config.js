/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,js}" ,"./src/*.jsx" , "./src/components/*.jsx"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor:{
        'chatHighlight':'hsla(0, 42%, 100%, 0.67)',
      }
    },
  },
  plugins: [
    import ('@tailwindcss/typography'),
    import ('@tailwindcss/forms'),
  ],
}

  