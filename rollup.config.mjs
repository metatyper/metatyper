import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import filesize from 'rollup-plugin-filesize'

export default [
    {
        input: 'src/index.ts',
        output: [
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
            nodeResolve({ extensions: ['.js', '.ts'], browser: true }),
            typescript({
                tsconfig: 'tsconfig.build.json',
                sourceMap: false
            }),
            terser(),
            filesize()
        ]
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'lib/index.mjs',
                format: 'es'
            }
        ],
        plugins: [
            nodeResolve({ extensions: ['.js', '.ts'], browser: true }),
            typescript({
                tsconfig: 'tsconfig.build.json',
                sourceMap: false
            }),
            filesize()
        ]
    }
]
