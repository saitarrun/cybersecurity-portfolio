/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['JetBrains Mono', 'monospace'],
        body: ['JetBrains Mono', 'monospace'],
        label: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#ffb4a8',
          fixed: '#ffdad4',
          container: '#ff5540',
          dim: '#ffb4a8',
        },
        surface: {
          DEFAULT: '#0e0e0e',
          variant: 'rgba(32, 31, 31, 0.6)',
          container: {
            lowest: '#000000',
            low: '#131313',
            DEFAULT: '#1a1a1a',
            high: '#201f1f',
            highest: '#2a2828',
          },
        },
        'on-surface': {
          DEFAULT: '#ffffff',
          variant: '#adaaaa',
        },
        'outline-variant': 'rgba(119, 117, 115, 0.1)',
        error: '#ff7351',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        card: '2rem',
        'card-lg': '2.5rem',
      },
      boxShadow: {
        'card-hover': '0 0 50px rgba(255, 146, 73, 0.1)',
        'button-hover': '0 0 20px var(--primary-dim)',
        subtle: '0 4px 6px rgba(0, 0, 0, 0.1)',
        medium: '0 10px 15px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite reverse',
        shimmer: 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
