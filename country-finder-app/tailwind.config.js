/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

export default {
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        dark: { DEFAULT: '#202c37', tint: '#2b3945', shade: '#111517' },
        light: { DEFAULT: colors.neutral[50], shade: '#858585' },
      },
      screens: {
        min: '320px',
        max: '1280px',
      },
    },
  },

  plugins: [
    plugin(({ addBase, theme }) => {
      const minWidth = theme('screens.min').replace('px', '')
      const maxWidth = theme('screens.max').replace('px', '')

      addBase({
        ':root': {
          '--fluid-min-width': minWidth,
          '--fluid-max-width': maxWidth,
          '--fluid-screen': '100vw',
          '--fluid-bp':
            'calc( (var(--fluid-screen) - var(--fluid-min-width) / 16 * 1rem) / (var(--fluid-max-width) - var(--fluid-min-width)) )',
        },
        [`@media screen and (min-width: ${maxWidth}px)`]: {
          ':root': {
            '--fluid-screen': 'calc(var(--fluid-max-width) * 1px)',
          },
        },
      })
    }),
  ],
}

