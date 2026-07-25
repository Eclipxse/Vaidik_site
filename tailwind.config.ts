import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#E61E26',
          dark:    '#9b0d13',
          glow:    'rgba(230,30,38,0.4)',
        },
        black: {
          DEFAULT: '#000000',
          soft:    '#0d0d0d',
          card:    '#111111',
        },
        gray: {
          muted: '#666666',
          mid:   '#999999',
          light: '#cccccc',
        },
      },
      fontFamily: {
        display: ['"Inter Tight"', '"Inter"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
} satisfies Config
