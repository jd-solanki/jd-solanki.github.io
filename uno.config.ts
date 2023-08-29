import { defineConfig, presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'flex-shrink': '0',
        'display': 'inline-block',
      }
    }),
    presetUno(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: 'JetBrains Mono',
      },
    }),
  ]
})