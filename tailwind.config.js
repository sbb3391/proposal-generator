module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/5': '20%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
