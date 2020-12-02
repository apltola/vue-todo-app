module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        avenir: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        queenBlue: '#507091',
        'queenBlue-2': '#486684',
        charcoal: '#2c3e50',
        gunmetal: '#282C34',
        snow: '#FCFCFC',
        aquamarine: '#3DDC97',
        'aquamarine-2': '#26CF86',
        'aquamarine-3': '#23BE7B',
        'aquamarine-4': '#20AC6F',
        salsa: '#F93943',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'active'],
    },
  },
  plugins: [],
};
