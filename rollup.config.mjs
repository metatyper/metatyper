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
                format: 'cjs'
            },
            {
                file: 'lib/metatyper.min.mjs',
                format: 'es'
            },
            {
                file: 'lib/metatyper.min.js',
                format: 'iife',
                name: 'MetaTyper'
            }
        ],
        plugins: [
            typescript({
                tsconfig: 'tsconfig.build.json',
                sourceMap: true,

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
                format: 'cjs'
            },
            {
                file: 'lib/index.mjs',
                format: 'es'
            }
        ],
        plugins: [
            typescript({
                tsconfig: 'tsconfig.build.json',
                sourceMap: true
            }),
            filesize()
        ]
    }
]
