import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'gold-crayola':    'hsl(38, 61%, 73%)',       // #D4A96A — PRIMARY accent
        'quick-silver':    'hsla(0, 0%, 65%, 1)',      // #A6A6A6
        'davys-grey':      'hsla(30, 3%, 34%, 1)',     // #574F4A
        'smoky-black-1':   'hsla(40, 12%, 5%, 1)',     // #0D0B08 — darkest bg
        'smoky-black-2':   'hsla(30, 8%, 5%, 1)',      // #0C0A08
        'smoky-black-3':   'hsla(0, 3%, 7%, 1)',       // #121111
        'eerie-black-1':   'hsla(210, 4%, 9%, 1)',     // #151618
        'eerie-black-2':   'hsla(210, 4%, 11%, 1)',    // #1A1B1D
        'eerie-black-3':   'hsla(180, 2%, 8%, 1)',     // #131414
        'eerie-black-4':   'hsla(0, 0%, 13%, 1)',      // #212121
        'white-alpha-20':  'hsla(0, 0%, 100%, 0.2)',
        'white-alpha-10':  'hsla(0, 0%, 100%, 0.1)',
        'black-alpha-80':  'hsla(0, 0%, 0%, 0.8)',
        'black-alpha-15':  'hsla(0, 0%, 0%, 0.15)',
      },
      fontFamily: {
        forum:  ['var(--font-forum)', 'cursive'],
        dmSans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      fontSize: {
        'display-1':  'clamp(2rem, 1.3rem + 6.7vw, 8rem)',
        'headline-1': 'clamp(3rem, 2rem + 2.5vw, 5.5rem)',
        'headline-2': 'clamp(2.4rem, 1.3rem + 2.4vw, 5rem)',
        'title-1':    'clamp(2.2rem, 1.6rem + 1.2vw, 3.4rem)',
        'title-2':    '2.2rem',
        'title-3':    '2.1rem',
        'title-4':    'clamp(2.2rem, 1.6rem + 1.2vw, 3.4rem)',
        'body-1':     '2.4rem',
        'body-2':     '1.6rem',
        'body-3':     '1.8rem',
        'body-4':     '1.6rem',
        'label-1':    '1.4rem',
        'label-2':    '1.2rem',
      },
      letterSpacing: {
        'ls-1': '0.15em',
        'ls-2': '0.4em',
        'ls-3': '0.2em',
        'ls-4': '0.3em',
        'ls-5': '3px',
      },
      spacing: {
        'section': '70px',
        'section-lg': '100px',
      },
      boxShadow: {
        '1': '0px 0px 25px 0px hsla(0, 0%, 0%, 0.25)',
      },
      borderRadius: {
        '24': '24px',
      },
      transitionDuration: {
        '1': '250ms',
        '2': '500ms',
        '3': '1000ms',
      },
      keyframes: {
        rotate360: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        smoothScale: {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        },
        sliderReveal: {
          '0%':   { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        move: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(30px)' },
        },
        menuBtn: {
          '0%':   { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0.5)' },
        },
        loadingText: {
          '0%':   { backgroundPosition: '100%' },
          '100%': { backgroundPosition: '0%' },
        },
        shine: {
          '0%':   { transform: 'skewX(-0.08turn) translateX(-180%)' },
          '100%': { transform: 'skewX(-0.08turn) translateX(275%)' },
        },
      },
      animation: {
        'rotate-slow':   'rotate360 15s linear infinite',
        'rotate-fast':   'rotate360 1s linear infinite',
        'smooth-scale':  'smoothScale 7s linear forwards',
        'slider-reveal': 'sliderReveal 1s ease forwards',
        'float':         'move 5s linear infinite',
        'menu-btn':      'menuBtn 400ms ease-in-out alternate infinite',
        'loading-text':  'loadingText 2s linear infinite',
        'shine':         'shine 1s ease forwards',
      },
      backgroundImage: {
        'gradient-1':        'linear-gradient(to top, hsla(0,0%,0%,0.9), hsla(0,0%,0%,0.7), transparent)',
        'loading-gradient':  'linear-gradient(90deg, transparent 0% 16.66%, hsla(0,3%,7%,1) 33.33% 50%, transparent 66.66% 75%)',
      },
    },
  },
  plugins: [],
}
export default config
