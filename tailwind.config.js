/** @type {import('tailwindcss').Config} */
const yellow = '#F0C925';
const grayLight = '#424242';
const grayCode = 'rgb(30, 30, 30)';
const border = `1px solid ${grayLight}`;

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './views/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        'nav-height': '80px',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'white',
            '--tw-prose-headings': 'white',
            '--tw-prose-code': 'white',
            a: { color: yellow },
            table: { border, borderRight: '1px solid transparent' },
            th: {
              borderRight: border,
              borderBottom: border,
              fontWeight: 'bold',
              paddingTop: '0.5714286em',
            },
            'thead th:first-child': { paddingLeft: '0.5714286em' },
            'tbody td:first-child': { paddingLeft: '0.5714286em' },
            'tbody tr': { borderBottom: border },
            td: { borderRight: border },
            h1: { marginBottom: '0.4em' },
            h2: {
              borderBottom: `1px solid ${grayCode}`,
              marginBottom: '0.6em',
              marginTop: '1.5em',
            },
            code: {
              backgroundColor: grayCode,
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
    colors: {
      current: 'currentColor',
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
  plugins: [require('@tailwindcss/typography')],
};
