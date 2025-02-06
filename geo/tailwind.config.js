module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        scrollLeft: {
          to: { left: '-200px' },
        },
        scrollRight: {
          to: { right: '-200px' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'scroll-left': 'scrollLeft 30s linear infinite',
        'scroll-right': 'scrollRight 30s linear infinite',
        'scroll': 'scroll 20s linear infinite',
      },
      backgroundImage: {
        'corner-blur': `
          radial-gradient(circle at top left, transparent 0%, black 100%) top left,
          radial-gradient(circle at top right, transparent 0%, black 100%) top right,
          radial-gradient(circle at bottom left, transparent 0%, black 100%) bottom left,
          radial-gradient(circle at bottom right, transparent 0%, black 100%) bottom right
        `,
      },
      utilities: {
        '.corner-blur': {
          '-webkit-mask-image': 'var(--tw-bg-corner-blur)',
          'mask-image': 'var(--tw-bg-corner-blur)',
          '-webkit-mask-size': '25% 25%',
          'mask-size': '25% 25%',
          '-webkit-mask-repeat': 'no-repeat',
          'mask-repeat': 'no-repeat',
        },
      },
    },
  },
  plugins: [],
}