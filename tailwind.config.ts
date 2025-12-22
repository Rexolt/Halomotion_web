// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'halo-red': '#dc2626',
        'halo-black': '#050505',
        'halo-dark': '#0a0a0a',
      },
      fontFamily: {
        // Itt hivatkozunk vissza a layout.tsx-ben megadott nevekre
        sans: ['var(--font-cormorant)', 'serif'], 
        display: ['var(--font-syncopate)', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
      }
    },
  },
  plugins: [],
};
export default config;