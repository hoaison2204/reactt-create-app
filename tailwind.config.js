// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  important: '#app',
  theme: {
    extend: {
      colors: {
        'primary': '#da291c',
        'blue': '#0d76bf',
        'yellow-light': '#fff5e2',
        'yellow': '#b4b1aa',
        'orange': '#f6a82c',
        'brown': '#c3bbab',
        'grey-800': '#1f2021',
        'grey-700': '#434547',
        'grey-600': '#63666a',
        'grey-500': '#a8aaad',
        'grey-400': '#e5e5e5',
        'grey-300': '#edeef0',
        'grey-200': '#f4f5f6',
        'grey-100': '#f9f9f9',
      },
      width: {
        '27%': '27%',
      },
    },
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  variants: {
    extend: {
      borderWidth: ['first', 'last'],
      borderRadius: ['first', 'last'],
    },
  },
  plugins: [],
};
