import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Cormorant Garamond', serif" },
        body: { value: "'Manrope', sans-serif" },
      },
      colors: {
        brand: {
          50: { value: '#fff4ee' },
          100: { value: '#fde1d3' },
          200: { value: '#f8c3aa' },
          300: { value: '#ef9f7b' },
          400: { value: '#d98a66' },
          500: { value: '#c66f49' },
          600: { value: '#a95938' },
          700: { value: '#88452d' },
          800: { value: '#673320' },
          900: { value: '#412013' },
        },
        sage: {
          50: { value: '#f5f8f1' },
          100: { value: '#e5edd9' },
          200: { value: '#c8d7b6' },
          300: { value: '#a8bf8f' },
          400: { value: '#8ea47e' },
          500: { value: '#6f8560' },
          600: { value: '#596d4c' },
          700: { value: '#46563c' },
          800: { value: '#313a29' },
          900: { value: '#1d2218' },
        },
        sand: {
          50: { value: '#f8f3ee' },
          100: { value: '#efe7de' },
          200: { value: '#dfd0be' },
          300: { value: '#cfb696' },
          400: { value: '#b99571' },
          500: { value: '#9f7657' },
          600: { value: '#845d46' },
          700: { value: '#624434' },
          800: { value: '#422d20' },
          900: { value: '#281a12' },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: {
            value: { base: '{colors.brand.500}', _dark: '{colors.brand.300}' },
          },
          contrast: {
            value: { base: '#fff8f3', _dark: '#201511' },
          },
        },
        accent: {
          solid: {
            value: { base: '{colors.sage.500}', _dark: '{colors.sage.300}' },
          },
          contrast: {
            value: { base: '#f6faf2', _dark: '#162015' },
          },
        },
        surface: {
          value: { base: '#fffaf5', _dark: '#1b1714' },
        },
        'surface.muted': {
          value: { base: '#f2e7db', _dark: '#241e1a' },
        },
        'surface.sunken': {
          value: { base: '#ebdfd1', _dark: '#151311' },
        },
        'surface.panel': {
          value: { base: 'rgba(255, 250, 245, 0.82)', _dark: 'rgba(29, 24, 21, 0.82)' },
        },
        'border.soft': {
          value: { base: 'rgba(141, 116, 88, 0.22)', _dark: 'rgba(241, 222, 203, 0.12)' },
        },
        'hero.glow': {
          value: { base: 'rgba(217, 138, 102, 0.18)', _dark: 'rgba(168, 191, 143, 0.16)' },
        },
      },
    },
  },
  globalCss: {
    'html, body': {
      bg: 'surface',
      color: 'fg',
    },
    '::selection': {
      bg: 'brand.solid',
      color: 'brand.contrast',
    },
  },
})

export const system = createSystem(defaultConfig, config)
