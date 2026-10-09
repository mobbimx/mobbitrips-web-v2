import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
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
        caveat: ['var(--font-caveat)', 'cursive'],
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
      // Entrada de una sola vez (docs/MOTION.md: ≤ 800 ms, nada infinito). Úsese con `motion-safe:`
      // para que «reducir movimiento» la quite; el retraso se pone con `[animation-delay:120ms]`.
      keyframes: {
        entra: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        entra: 'entra 600ms cubic-bezier(0.19, 1, 0.22, 1) backwards',
      },
    },
  },
  plugins: [],
};

export default config;
