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
          50: { value: '#eaf4ff' },
          100: { value: '#d3e8ff' },
          200: { value: '#a9d0ff' },
          300: { value: '#7eb8ff' },
          400: { value: '#5098f0' },
          500: { value: '#1f74cf' },
          600: { value: '#145ca8' },
          700: { value: '#0e477f' },
          800: { value: '#08345d' },
          900: { value: '#052642' },
        },
        sky: {
          50: { value: '#f3f9ff' },
          100: { value: '#e0f0ff' },
          200: { value: '#beddff' },
          300: { value: '#91c8ff' },
          400: { value: '#67b1ff' },
          500: { value: '#3f92f2' },
          600: { value: '#2f73c4' },
          700: { value: '#23599a' },
          800: { value: '#173d68' },
          900: { value: '#0d2742' },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: {
            value: { base: '#eaf4ff', _dark: '#eaf4ff' },
          },
          contrast: {
            value: { base: '#062b4f', _dark: '#062b4f' },
          },
        },
        accent: {
          solid: {
            value: { base: '{colors.sky.400}', _dark: '{colors.sky.300}' },
          },
          contrast: {
            value: { base: '#062642', _dark: '#062642' },
          },
        },
        surface: {
          value: { base: '#0b3b6c', _dark: '#071d35' },
        },
        'surface.muted': {
          value: { base: '#104478', _dark: '#0b2947' },
        },
        'surface.sunken': {
          value: { base: '#082d52', _dark: '#061629' },
        },
        'surface.panel': {
          value: { base: 'rgba(8, 42, 78, 0.82)', _dark: 'rgba(5, 20, 38, 0.88)' },
        },
        'border.soft': {
          value: { base: 'rgba(255, 255, 255, 0.18)', _dark: 'rgba(160, 205, 255, 0.14)' },
        },
        'hero.glow': {
          value: { base: 'rgba(127, 179, 255, 0.26)', _dark: 'rgba(127, 179, 255, 0.18)' },
        },
      },
    },
  },
  globalCss: {
    'html, body': {
      bg: 'surface',
      color: '#f5f9ff',
    },
    '::selection': {
      bg: 'brand.solid',
      color: 'brand.contrast',
    },
  },
})

export const system = createSystem(defaultConfig, config)
