/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Minecraft-inspired dark theme
        'dark': '#0a0e27',
        'dark-secondary': '#1a1f3a',
        'dark-tertiary': '#2d3250',
        'accent-purple': '#9d4edd',
        'accent-cyan': '#00d9ff',
        'accent-emerald': '#00d084',
        'accent-gray': '#404854',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #9d4edd 0%, #00d9ff 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(157, 78, 221, 0.5)',
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
