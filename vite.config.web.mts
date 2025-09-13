import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// import svgr from "vite-plugin-svgr"
// import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./index.html"],
            name: "@woby/toast",
            formats: [/*'cjs', '*/'es'/*, 'umd'*/],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        outDir: './build',
        sourcemap: false,
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        // svgr({ exportAsDefault: true })
        // dts({ entryRoot: './src', outputDir: './dist/types' })
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            'woby/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime.ts') : 'woby',
            'woby/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime.ts') : 'woby',
            'woby': process.argv.includes('dev') ? path.resolve('../woby/src') : 'woby',
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', 'svg']
    },
})



export default config
