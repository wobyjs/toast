import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'
import { svgrPlugin } from 'esbuild-svgr-plugin'

// import svgr from "vite-plugin-svgr"

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.ts"],
            name: "woby-toast",
            formats: ['cjs', 'es', 'umd'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        sourcemap: true,
        rollupOptions: {
            external: ['woby', 'woby/jsx-runtime', 'oby'],
            output: {
                globals: {
                    'woby': 'woby',
                    'woby/jsx-runtime': 'woby/jsx-runtime',
                }
            }
        }
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        // svgr({ exportAsDefault: true }),
        dts({ entryRoot: './src', outputDir: './dist/types' })
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            // 'woby/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime.ts') : 'woby/jsx-dev-runtime',
            // 'woby/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime.ts') : 'woby/jsx-runtime',
            // 'woby': process.argv.includes('dev') ? path.resolve('../woby/src') : 'woby',
        },
    },

})



export default config
