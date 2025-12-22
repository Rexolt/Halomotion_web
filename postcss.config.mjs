/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // A régi 'tailwindcss' helyett most már ez kell:
    '@tailwindcss/postcss': {}, 
    autoprefixer: {},
  },
};

export default config;