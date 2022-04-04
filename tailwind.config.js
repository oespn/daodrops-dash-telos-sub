module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
      },
      colors: {
        primary: '#536DFE',
        darky: '#475569',
        lightBlue: '#C7D2FD',
        lightGreen: '#EEFCEB',
      },
      outline: {
        blue: '2px solid rgba(0, 112, 244, 0.5)',
      },
      maxHeight: {
        150: '37.5rem', // 600px
      },
      minHeight: {
        '90vh': '90vh',
      },
      spacing: {
        0: '0px',
        10: '40px',
        15: '15rem',
        20: '80px'
      }
    },
    fontFamily: {
      display: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI'],
      body: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI'],
    },
  },
  plugins: [],
}