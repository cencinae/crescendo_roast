/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F4F9F5', 100: '#E3F0E6', 500: '#2F6B4A',
          600: '#245A3D', 700: '#1B4A31', 800: '#133624',
          900: '#0B2418', 950: '#051A10'
        },
        coffee: {
          100: '#F5E6D3', 200: '#E8D5B7', 500: '#8B6F47',
          600: '#6B4423', 700: '#5C3A21', 800: '#3D2817',
          900: '#2C1810', 950: '#1A0F08'
        },
        ember: {
          400: '#FB923C', 500: '#F97316', 600: '#EA580C'
        }
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        script: ['Great Vibes', 'cursive'],
        handwritten: ['Homemade Apple', 'cursive'],
        serif: ['Playfair Display', 'serif']
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    }
  }
}