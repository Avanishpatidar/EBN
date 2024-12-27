export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000', // Pure black
        primary: {
          DEFAULT: '#111111',
          hover: '#222222',
        },
        secondary: {
          DEFAULT: '#666666',
          hover: '#888888',
        },
        accent: {
          DEFAULT: '#ffffff',
          hover: '#eeeeee',
        },
        text: {
          primary: '#ffffff',
          secondary: '#999999',
          muted: '#666666',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      spacing: {
        container: '2rem',
        'container-lg': '4rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'glow-line': 'rotate-glow 3s linear infinite',
        'snake-border': 'snake 6s ease-in-out infinite',
        'border-line': 'border-line 4s linear infinite',
      },
    },
  },
  plugins: [
  ],
}