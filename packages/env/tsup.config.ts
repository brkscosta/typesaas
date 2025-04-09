import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm'],
  dts: true,
  minify: false,
  bundle: true,
  sourcemap: false,
  target: 'esnext',
  splitting: false,
  clean: true,
})
