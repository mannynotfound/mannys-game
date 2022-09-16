const yellow = '#F0C925';
const grayLight = '#424242';
const grayCode = 'rgb(30, 30, 30)';
const border = `1px solid ${grayLight}`;

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            color: 'white',
            a: { color: yellow },
            strong: { color: 'white' },
            table: { border, borderRight: '1px solid transparent' },
            th: {
              color: 'white',
              borderRight: border,
              borderBottom: border,
              fontWeight: 'bold',
              paddingTop: '0.5714286em',
            },
            'thead th:first-child': { paddingLeft: '0.5714286em' },
            'tbody td:first-child': { paddingLeft: '0.5714286em' },
            'tbody tr': { borderBottom: border },
            td: { borderRight: border },
            h1: { color: 'white', marginBottom: '0.4em' },
            h2: {
              color: 'white',
              borderBottom: `1px solid ${grayCode}`,
              marginBottom: '0.6em',
              marginTop: '1.5em',
            },
            h3: { color: 'white' },
            h4: { color: 'white' },
            h5: { color: 'white' },
            h6: { color: 'white' },
            code: {
              backgroundColor: grayCode,
              color: 'white',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: { color: 'white' },
          },
        },
      }),
    },
    colors: {
      green: '#70bf44',
      yellow,
      white: '#fff',
      black: '#000',
      'gray-dark': '#0e0e0e',
      'gray-light': grayLight,
      'gray-lightest': '#B1B1B1',
      gray: '#1d1d1d',
      'gray-blue': 'rgba(138, 208, 255, 0.1)',
      'gray-code': grayCode,
      transparent: 'rgba(0, 0, 0, 0)',
      cyan: 'rgb(0, 255, 255)',
      red: 'crimson',
      magenta: 'rgb(243, 106, 233)',
    },
    fontFamily: {
      sans: ['PP Mono'],
      serif: ['PP Mono'],
      body: ['Roboto'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1800px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
