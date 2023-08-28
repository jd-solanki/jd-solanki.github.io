import { defineConfig, presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons(),
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