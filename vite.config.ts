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
            name: "voby-toast",
            formats: ['cjs', 'es', 'umd'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        sourcemap: true,
        rollupOptions: {
            external: ['voby', 'oby', 'voby/jsx-runtime'],
            output: {
                globals: {
                    'voby': 'voby',
                    'voby/jsx-runtime': 'voby/jsx-runtime',
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
        },
    },

})



export default config
