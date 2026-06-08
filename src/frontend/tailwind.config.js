import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
        italic: ['Cormorant Garamond', 'Fraunces', 'serif'],
      },
      colors: {
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))',
        },
        // ESTOQI brand tokens — RGB-with-alpha so Tailwind /N works.
        // Hex equivalents live in CSS vars (--bone, etc.) for non-utility use.
        bone:         'rgb(255 255 255 / <alpha-value>)',
        paper:        'rgb(246 246 244 / <alpha-value>)',
        ink:          'rgb(13 13 13 / <alpha-value>)',
        graphite:     'rgb(82 82 82 / <alpha-value>)',
        stone:        'rgb(212 212 212 / <alpha-value>)',
        'stone-soft': 'rgb(236 236 236 / <alpha-value>)',
        vermillion:   'rgb(2 40 89 / <alpha-value>)',
        leaf:         'rgb(20 61 117 / <alpha-value>)',
        oxide:        'rgb(46 58 63 / <alpha-value>)',
        'gold-leaf':  'rgb(184 145 72 / <alpha-value>)',
        forest:        'rgb(2 40 89 / <alpha-value>)',
        'forest-deep': 'rgb(1 26 61 / <alpha-value>)',
        'forest-line': 'rgb(26 58 110 / <alpha-value>)',
        'amber-runoff':'rgb(138 90 29 / <alpha-value>)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
