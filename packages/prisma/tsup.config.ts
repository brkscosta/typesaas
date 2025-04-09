import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm'],
  dts: true,
  minify: true,
  bundle: true,
  sourcemap: true,
  target: 'esnext',
  splitting: false,
  clean: true,
})
