/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,astro,html}",
    "./docs/**/*.{md,mdx}",
    "./wiki/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Emerald primary
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"微软雅黑"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Cascadia Code',
          'Consolas',
          'monospace'
        ]
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'inherit',
            fontSize: '15px',
            lineHeight: '1.75',
            p: {
              marginTop: '1.1em',
              marginBottom: '1.1em',
            },
            strong: {
              fontWeight: '700',
              color: 'inherit',
            },
            a: {
              color: '#10b981',
              textDecoration: 'none',
              fontWeight: '600',
              '&:hover': {
                color: '#059669',
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

