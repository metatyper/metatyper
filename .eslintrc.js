module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        project: 'tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc', 'import', 'unused-imports'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    root: true,
    env: {
        node: true,
        commonjs: true,
        es2020: true,
        jest: true
    },
    ignorePatterns: ['.eslintrc.js', 'jest.config.js', 'rollup.config.mjs', 'lib', 'index.d.ts'],
    rules: {
        'import/order': 0,
        'import/no-unresolved': 0,
        'import/no-duplicates': 1,

        'no-unused-vars': 'off',
        "no-case-declarations": "off",
        "no-empty": "off",
        "no-useless-escape": "off",
        "no-control-regex": "off",
    
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
        ],
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-empty-interface": "off",
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto'
            }
        ],
        'padding-line-between-statements': [
            'warn',
            { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
            { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
            { blankLine: 'always', prev: ['const', 'let', 'export'], next: '*' },
            {
                blankLine: 'always',
                prev: '*',
                next: ['if', 'class', 'for', 'do', 'while', 'switch', 'try']
            },
            {
                blankLine: 'always',
                prev: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'],
                next: '*'
            },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'export'],
                next: ['const', 'let', 'export']
            },
            { blankLine: 'always', prev: '*', next: 'return' }
        ]
    }
}
