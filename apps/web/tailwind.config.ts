import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ED6864',
          dark: '#D4504C',
          light: '#F4A09E',
          soft: '#FDF0EF',
        },
        brand: {
          charcoal: '#3D3D3D',
          gray: '#706F6F',
          light: '#A8A8A8',
          cream: '#FAF8F5',
          white: '#FFFFFF',
          border: '#EDE9E4',
        },
        status: {
          success: '#4CAF82',
          warning: '#F5A623',
          error: '#E05555',
          info: '#5B9BD5',
        },
      },
      fontFamily: {
        comfortaa: ['var(--font-comfortaa)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 2px 8px rgba(237,104,100,0.06)',
        DEFAULT: '0 4px 16px rgba(237,104,100,0.10)',
        md: '0 4px 16px rgba(237,104,100,0.10)',
        lg: '0 12px 32px rgba(237,104,100,0.14)',
        xl: '0 24px 48px rgba(237,104,100,0.18)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ED6864 0%, #F4A09E 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
