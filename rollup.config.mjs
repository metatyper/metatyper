import filesize from 'rollup-plugin-filesize'

import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default [
    {
        input: 'src/index.ts',
        output: [
            // for browsers
            {
                file: 'lib/metatyper.min.cjs',
                format: 'cjs',
                sourcemap: !!process.env.ROLLUP_WATCH
            },
            {
                file: 'lib/metatyper.min.mjs',
                format: 'es',
                sourcemap: !!process.env.ROLLUP_WATCH
            },
            {
                file: 'lib/metatyper.min.js',
                format: 'iife',
                name: 'MetaTyper',
                sourcemap: !!process.env.ROLLUP_WATCH
            }
        ],
        plugins: [
            typescript({
                tsconfig: 'tsconfig.build.json',
                sourceMap: !!process.env.ROLLUP_WATCH,

                downlevelIteration: true
            }),
            terser(),
            filesize()
        ]
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'lib/index.js',
                format: 'cjs',
                sourcemap: !!process.env.ROLLUP_WATCH
            },
            {
                file: 'lib/index.mjs',
                format: 'es',
                sourcemap: !!process.env.ROLLUP_WATCH
            }
        ],
        plugins: [
            typescript({
                tsconfig: 'tsconfig.build.json',
                sourceMap: !!process.env.ROLLUP_WATCH
            }),
            filesize()
        ]
    }
]
